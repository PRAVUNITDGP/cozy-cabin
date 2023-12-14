import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {  createEditCabin } from "../../services/apiCabins";
import {toast} from 'react-hot-toast'
import FormRow from "../../ui/FormRow";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {

  const {register, handleSubmit, reset, getValues, formState} = useForm();
  const queryClient = useQueryClient();

  const {errors} = formState;

  const {mutate: createCabin, isLoading: isCreating} = useMutation({
    mutationFn: createCabin,
    onSuccess : () => {
      toast.success("New Cabin Successfully Created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"]
      });
      reset();
    },
    onError : (error) => {
      toast.error(error.message);
    }
  })
  const {mutate: editCabin, isLoading: isEditing} = useMutation({
    mutationFn: (newCabinData, id) => createEditCabin(newCabinData, id),
    onSuccess : () => {
      toast.success("cabin Succesfully Edited");
      queryClient.invalidateQueries({
        queryKey: ["cabins"]
      });
      reset();
    },
    onError : (error) => {
      toast.error(error.message);
    }
  })

  const isWorking = isCreating || isEditing;
  function onSubmit(data) {
    
    createCabin({...data, image: data.image[0]});

  }
  function onError(error) {
    console.log(error);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>

      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input type="text" id="name" 
          disabled={isCreating}
          {...register("name", {
              required : "This Field is required.",
              
            }
          )}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" 
          disabled={isEditing}
        {...register("maxCapacity" , {
          required : "This Field is required.",
          min: {
            value: 1,
            message: "Capacity Should be at least 1",
          }
        })} 
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        
        <Input type="number" id="regularPrice" 
          disabled={isEditing}
        {...register("regularPrice", {
          required : "This Field is required.",
          min: {
            value: 1,
            message: "Capacity Should be at least 1",
          }
        })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" id="discount"
          disabled={isEditing}
          defaultValue={0} 
          {...register("discount", {
            required : "This Field is required.",
            validate: (value)=>  value >= getValues().regularPrice || "Discount Should be less than regular price"
          })} 
        />
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue=""
          disabled={isEditing}
          {...register("description", {
            required : "This Field is required."
          })}
        />
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput 
          id="image" accept="image/*" 
          {...register("image", {
            required : "This Field is required."
          })}
        />
      </FormRow>

      <StyledFormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isEditing}>Add cabin</Button>
      </StyledFormRow>
    </Form>
  );
}

export default CreateCabinForm;
