import { useMutation } from "@tanstack/react-query";
import { signUp } from "../services/auth.service";

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
  });
};
