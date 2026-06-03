import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { taskSchema, taskUpdateSchema } from "@/lib/schema/taskSchema";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { status: "error", message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      return NextResponse.json(
        { status: "error", message: "Task not found" },
        { status: 404 }
      );
    }

    // Ensure the task belongs to the current user
    if (task.userId !== session.user.id) {
      return NextResponse.json(
        { status: "error", message: "Forbidden" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { status: "success", message: "Task fetched", data: task },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { status: "error", message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { status: "error", message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    // Check task exists and belongs to user
    const existing = await prisma.task.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { status: "error", message: "Task not found" },
        { status: 404 }
      );
    }

    if (existing.userId !== session.user.id) {
      return NextResponse.json(
        { status: "error", message: "Forbidden" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const parsed = taskUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          status: "error",
          message: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const task = await prisma.task.update({
      where: { id },
      data: parsed.data,
    });

    return NextResponse.json(
      { status: "success", message: "Task updated", data: task },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { status: "error", message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { status: "error", message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const existing = await prisma.task.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { status: "error", message: "Task not found" },
        { status: 404 }
      );
    }

    if (existing.userId !== session.user.id) {
      return NextResponse.json(
        { status: "error", message: "Forbidden" },
        { status: 403 }
      );
    }

    await prisma.task.delete({
      where: { id },
    });

    return NextResponse.json(
      { status: "success", message: "Task deleted" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { status: "error", message: "Something went wrong" },
      { status: 500 }
    );
  }
}
