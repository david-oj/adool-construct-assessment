import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().min(1, "Description is required").max(2000),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]),
});

export const taskUpdateSchema = z.object({
  title: z.string().min(1, "Title is required").max(200).optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(2000)
    .optional(),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]).optional(),
});

export type TaskData = z.infer<typeof taskSchema>;
export type TaskUpdateData = z.infer<typeof taskUpdateSchema>;
