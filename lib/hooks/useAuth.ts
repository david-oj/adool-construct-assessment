import { useMutation } from "@tanstack/react-query";
import { auth } from "../services/auth.service";
import { useSession } from "next-auth/react";

export const useSignUp = () => {
  return useMutation({
    mutationFn: auth.signUp,
  });
};

export const useSignIn = () => {
  const { update } = useSession();
  return useMutation({
    mutationFn: auth.signin,
    onSuccess: async () => {
      await update();
    },
  });
};
