import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { status: "error", message: "Unauthorized" },
        { status: 401 }
      );
    }

    const [pending, inProgress, completed, total] = await Promise.all([
      prisma.task.count({
        where: { userId: session.user.id, status: "PENDING" },
      }),
      prisma.task.count({
        where: { userId: session.user.id, status: "IN_PROGRESS" },
      }),
      prisma.task.count({
        where: { userId: session.user.id, status: "COMPLETED" },
      }),
      prisma.task.count({
        where: { userId: session.user.id },
      }),
    ]);

    return NextResponse.json(
      {
        status: "success",
        message: "Stats fetched",
        data: {
          pending,
          inProgress,
          completed,
          total,
        },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { status: "error", message: "Something went wrong" },
      { status: 500 }
    );
  }
}
