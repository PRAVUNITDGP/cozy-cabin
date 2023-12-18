import {useMutation} from "@tanstack/react-query"
import {toast} from "react-hot-toast"
import {signup as signupApi} from "../../services/apiAuth"


export function useSignup() {
  const {mutate: signup, isLoading} = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success("Account Created Successfully...Please verify the new Account")
    }
  });

  return {signup, isLoading};

}