import {useMutation, useQueryClient} from '@tanstack/react-query'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

import { updateBooking } from '../../services/apiBookings';

export function useCheckIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {mutate: checkIn, isLoading: isCheckingIn} = useMutation({
    mutationFn: ({bookingId, breakfast}) => updateBooking(bookingId, {
      status: 'checked-in',
      isPaid: true,
      ...breakfast
    }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} is Successfully Checked In`);
      queryClient.invalidateQueries({active : true});
      navigate("/")
    },
    onError: () => toast.error("There was some error while checking in ")
  });

  return {checkIn, isCheckingIn};
}