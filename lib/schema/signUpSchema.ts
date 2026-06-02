import z from "zod";

const password = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(20, "Password must not be more than 20 characters")
  .regex(/(?=.*[a-z])/, "Password must contain at least one lowercase letter")
  .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
  .regex(/(?=.*\d)/, "Password must contain at least one number")
  .regex(
    /(?=.*[!@#$%^&*])/,
    "Password must contain at least one special character"
  );

export const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(3, "First name must be at least 3 characters long")
      .max(100, "First name must be less than 100 characters long")
      .regex(
        /^[a-zA-Z\s'-]+$/,
        "First name can only contain letters, spaces, hyphens, and apostrophes"
      ),
    lastName: z
      .string()
      .min(3, "Last name must be at least 3 characters long")
      .max(100, "Last name must be less than 100 characters long")
      .regex(
        /^[a-zA-Z\s'-]+$/,
        "last name can only contain letters, spaces, hyphens, and apostrophes"
      ),
    email: z
      .email("Enter a valid email address")
      .max(100, "email must be less than 100 characters long"),

    phoneNumber: z
      .string()
      .min(7, "Phone number is too short")
      .max(15, "Phone number is too long")
      .regex(/^\+?\d+$/, "Phone number must contain only digits"),
    password: password,
    confirmPassword: z.string(),
    termsAndCondition: z
      .boolean()
      .refine(
        (val) => val === true,
        "Please accept the terms and conditions to proceed"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpData = z.infer<typeof signUpSchema>;

const loginSchema = z.object({
  email: z
    .email("Enter a valid email address")
    .max(100, "email must be less than 100 characters long"),
  password: password,
});

export type LoginData = z.infer<typeof loginSchema>;
