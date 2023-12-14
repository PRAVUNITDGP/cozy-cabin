import {useQueryClient} from "@tanstack/react-query"
import {toast} from 'react-hot-toast'
import {useMutation} from "@tanstack/react-query"

import { deleteCabins as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {

  const queryclient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("Cabin Successfully Deleted");
      queryclient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return {isDeleting, deleteCabin};
}
