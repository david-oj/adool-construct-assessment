import { prisma } from "@/lib/prisma";
import { signUpSchema } from "@/lib/schema/signUpSchema";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = signUpSchema.safeParse(body);

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

    const { firstName, lastName, email, phoneNumber, password } = parsed.data;

    // 1. Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { status: "error", message: "User already exists" },
        { status: 400 }
      );
    }

    // 2. Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // 3. Create user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashedPassword,
      },
    });

    const { password: _pswrd, ...userData } = user;

    // 4. Return safe response (NEVER return password)
    return Response.json(
      {
        status: "success",
        message: "User created successfully",
        data: userData,
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      {
        status: "error",
        message: "An error occurred while creating the user",
        debug: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
