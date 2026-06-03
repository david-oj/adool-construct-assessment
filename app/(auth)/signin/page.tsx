"use client";

// import { EyeOff } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSignIn } from "@/lib/hooks/useAuth";
import { LoginData, loginSchema } from "@/lib/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SignPage() {
  const { mutate, isPending } = useSignIn();

  const router = useRouter();
  const [isVisible, setIsVisible] = useState({
    createPassword: false,
    confirmPassword: false,
  });

  const { control, handleSubmit } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // route user to dashboard if authenticated
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     router.push("/dashboard");
  //   }
  // }, [isAuthenticated, router]);

  const onSubmit = (data: LoginData) => {
    console.log(data);
    mutate(data, {
      onSuccess: (res) => {
        toast.success(res.message || "Login successful!");
        router.replace("/dashboard");
      },
      onError: (res) => {
        toast.error(res.message || "Login failed!");
      },
    });
  };

  return (
    <div className="margin-y padding-x">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 bg-white rounded-lg max-w-[747px] mx-auto "
      >
        <FieldSet className="gap-0">
          <div className="flex flex-col items-center">
            <FieldTitle className="font-heading text-2xl font-bold leading-8 text-center gap-0">
              <p className="font-heading text-2xl font-bold leading-8 text-center">
                Task
                <span className="font-heading text-2xl font-bold leading-8 text-center text-primary">
                  Flow
                </span>{" "}
                Login
              </p>
            </FieldTitle>
            <FieldLegend className="mt-2 font-roboto text-brand-gray text-base font-normal leading-6 text-center">
              Welcome back! Sign in to continue tracking and managing your
              Tasks.
            </FieldLegend>
          </div>

          <FieldGroup className="mt-8 gap-6">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="form-label">
                    Email Address
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Email Address"
                    className="form-input"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="form-error"
                    />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="form-label">
                    Password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id={field.name}
                      type={isVisible.createPassword ? "text" : "password"}
                      aria-invalid={fieldState.invalid}
                      placeholder="Create Password"
                      className="form-input"
                    />
                    <button
                      onClick={() =>
                        setIsVisible((prev) => ({
                          ...prev,
                          createPassword: !prev.createPassword,
                        }))
                      }
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      {isVisible.createPassword ? (
                        <Eye className="size-6 text-slate-600/85" />
                      ) : (
                        <EyeOff className="size-6 text-slate-600/85" />
                      )}
                    </button>
                  </div>
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="form-error"
                    />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </FieldSet>

        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center gap-3 ">
            <label
              htmlFor="rememberMe"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Input id="rememberMe" type="checkbox" className="peer hidden" />

              <div className="size-4.5 border-2 shrink-0 border-slate-600/90 rounded-[2px] peer-checked:bg-primary peer-checked:border-primary peer-checked:[&>svg]:block flex items-center justify-center">
                <svg
                  className="hidden text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </label>
            <span className="text-slate-500">Remember me</span>
          </div>
          <Link href="/signup" className="text-primary underline underline-offset-[1.5px]">
            Create an account{" "}
          </Link>
        </div>

        <Button
          disabled={isPending}
          type="submit"
          className="mt-6 submit-button"
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}
