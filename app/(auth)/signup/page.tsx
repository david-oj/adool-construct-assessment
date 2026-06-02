"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
// import { useSignUp } from "@/lib/hooks/mutation/useAuth";
// import { useSession } from "@/lib/hooks/useSession";

import { Check, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import IntlTelInput from "@intl-tel-input/react";
import "intl-tel-input/styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "@/lib/hooks/useAuth";
import { SignUpData, signUpSchema } from "@/lib/schema/authSchema";

export default function SignupPage() {
  const { mutate: signUp, isPending } = useSignUp();
  const router = useRouter();
  // const { isAuthenticated } = useSession();

  const [isVisible, setIsVisible] = useState({
    createPassword: false,
    confirmPassword: false,
  });

  const { handleSubmit, control } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      termsAndCondition: false,
    },
  });

  const password = useWatch({ control: control, name: "password" }) || "";

  const passwordReq = {
    letterAndNumber: /(?=.*[a-z])/.test(password) && /(?=.*\d)/.test(password),
    characterCount: password.length >= 8 && password.length <= 20,
    specialCharacter: /(?=.*[!@#$%^&*])/.test(password),
  };
  //   console.log("passwordRequirements: ", passwordReq);

  const onSubmit = (data: SignUpData) => {
    console.log("Signup Data: ", data);

    signUp(data, {
      onSuccess: () => {
        toast.success("Signup successful!");
        router.push("/signin");
      },
      onError: (res) => {
        toast.error(res.message || "Signup failed!");
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
            <FieldTitle className="font-heading text-2xl font-bold leading-8 text-center">
              Create Your CargoLand Account
            </FieldTitle>
            <FieldLegend className="mt-2 font-roboto text-brand-gray text-base font-normal leading-6 text-center">
              Sign up to start shipping smarter and track every delivery with
              ease.
            </FieldLegend>
          </div>

          <FieldGroup className="mt-8 gap-6">
            <div className="grid grid-cols-2 gap-4.5">
              <Controller
                name="firstName"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor={field.name} className="form-label">
                      First Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="First Name"
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
                name="lastName"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor={field.name} className="form-label">
                      Last Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Last Name"
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
            </div>

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

            <div className="flex gap-4.5">
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor={field.name} className="form-label">
                      Phone Number
                    </FieldLabel>
                    <IntlTelInput
                      // ref={phoneInputRef}
                      value={field.value}
                      onChangeNumber={field.onChange}
                      initialCountry={"ng"}
                      loadUtils={() => import("intl-tel-input/utils")}
                      inputProps={{
                        className: "form-input border",
                        inputMode: "tel",
                        id: field.name,
                      }}
                      aria-invalid={fieldState.invalid}
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
            </div>

            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="form-label">
                    Create Password
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

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="form-label">
                    Confirm Password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id={field.name}
                      type={isVisible.confirmPassword ? "text" : "password"}
                      aria-invalid={fieldState.invalid}
                      placeholder="Confirm Password"
                      className="form-input"
                    />
                    <button
                      onClick={() =>
                        setIsVisible((prev) => ({
                          ...prev,
                          confirmPassword: !prev.confirmPassword,
                        }))
                      }
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      {isVisible.confirmPassword ? (
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

        <div className="mt-6">
          <h3 className="font-roboto text-sm font-normal leading-5.25 uppercase text-slate-700 ">
            Requirements:
          </h3>

          <div className="flex flex-wrap gap-y-3 gap-x-4 max-w-[348px]">
            <div className="flex gap-2.5 items-center min-w-[148px]">
              <Check
                className={`${
                  passwordReq.characterCount
                    ? "text-green-600"
                    : "text-brand-gray"
                } size-4.5 `}
              />
              <p
                className={`${
                  passwordReq.characterCount ? "text-black" : "text-brand-gray"
                }`}
              >
                8 Characters (20 max)
              </p>
            </div>

            <div className="flex gap-2.5 items-center min-w-[148px]">
              <Check
                className={`${
                  passwordReq.letterAndNumber
                    ? "text-green-600"
                    : "text-brand-gray"
                } size-4.5 `}
              />
              <p
                className={`${
                  passwordReq.letterAndNumber ? "text-black" : "text-brand-gray"
                }`}
              >
                1 letter and 1 number
              </p>
            </div>

            <div className="flex gap-2.5 items-center min-w-[148px]">
              <Check
                className={`${
                  passwordReq.specialCharacter
                    ? "text-green-600"
                    : "text-brand-gray"
                } size-4.5 `}
              />
              <p
                className={`${
                  passwordReq.specialCharacter
                    ? "text-black"
                    : "text-brand-gray"
                }`}
              >
                1 special character (e.g #,*,%)
              </p>
            </div>
          </div>
        </div>

        <Controller
          name="termsAndCondition"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center gap-4 mt-6">
                <FieldLabel
                  htmlFor={field.name}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Input
                    id={field.name}
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    aria-invalid={fieldState.invalid}
                    className="peer hidden"
                  />

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
                </FieldLabel>
                <FieldDescription className="text-slate-600/85 block">
                  By signing up, you agree to our
                  <Link
                    href="#"
                    className="text-primary underline-offset-[1.5px]! "
                  >
                    {" "}
                    Terms of Service{" "}
                  </Link>
                  and
                  <Link
                    href="#"
                    className="text-primary underline-offset-[1.5px]!"
                  >
                    {" "}
                    Privacy Policy,{" "}
                  </Link>
                  and consent to receive important updates
                </FieldDescription>
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

        <Button
          disabled={isPending}
          type="submit"
          className="mt-6 submit-button"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
}
