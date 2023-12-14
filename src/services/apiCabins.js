import supabase, { supabaseUrl } from "./supabase";

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}
  -${newCabin.image.name}`.replaceAll("/", "");
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

  let query = supabase.from("cabins");

  // URL : https://hkmffiofecpyvqcfiqfk.supabase.co/storage/v1/object/public/cabins/cabin-001.jpg
  // 1. Crete Cabin
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }
  // B . Edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  const { data, error } = await query.select().single();

  if (error) {
    console.log("Cabin Could not be Created");
    throw new Error("cabins could not be Created");
  }
  // 2. Upload image

  //const avatarFile = event.target.files[0]
  if(hasImagePath)
    return data;
  
  const { error: storageError } = await supabase.storage
    .from("cabins")
    .upload(imageName, newCabin.image);

  // Delete the cabin if there was an error uploading image

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Cabin image could not be created");
  }

  return data;
}

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log("cabins could not be loaded");
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function deleteCabins(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log("Cabin Could not be deleted");
    throw new Error("cabins could not be deleted");
  }
  return data;
}
