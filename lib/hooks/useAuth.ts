import { useMutation } from "@tanstack/react-query";
import { auth } from "../services/auth.service";

export const useSignUp = () => {
  return useMutation({
    mutationFn: auth.signUp,
  });
};

export const useSignIn = () => {
  return useMutation({
    mutationFn: auth.signin,
  });
};
