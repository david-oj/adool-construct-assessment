import { signIn } from "@/auth";
import { loginSchema } from "@/lib/schema/signUpSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          status: "error",
          message: "Validation failed",
          details: parsed.error.flatten().formErrors,
        },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result.error) {
      return NextResponse.json(
        { status: "error", message: result.error },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { status: "success", message: "Signin successful" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { status: "error", message: "Something went wrong" },
      { status: 500 }
    );
  }
}
