import {useQueryClient} from "@tanstack/react-query"
import {toast} from 'react-hot-toast'
import {useMutation} from "@tanstack/react-query"

import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {

  const queryclient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success("Booking Successfully Deleted");
      queryclient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (error) => toast.error(error.message)
  });

  return {isDeleting, deleteBooking};
}
