import { TaskData } from "../schema/taskSchema";

type Status = "PENDING" | "IN_PROGRESS" | "COMPLETED";

type APIResponse<T> = {
  status: string;
  message: string;
  data: T;
};

export interface Task {
  title: string;
  description: string;
  status: Status;
  id: string;
  createdAt: Date;
  userId: string;
}

interface UpdateData {
  id: string;
  data: TaskData;
}

type TasksRes = APIResponse<Task[]>;
type CreateOrGetTask = APIResponse<Task>;

export const task = {
  async createTask(data: TaskData): Promise<CreateOrGetTask> {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Something went wrong");
    }

    return result;
  },

  async getAllTasks(): Promise<TasksRes> {
    const res = await fetch("/api/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Something went wrong");
    }

    return result;
  },

  async getTask(id: string): Promise<CreateOrGetTask> {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Something went wrong");
    }

    return result;
  },

  async updateTask({ id, data }: UpdateData) {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Something went wrong");
    }

    return result;
  },

  async completeTask(id: string) {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "COMPLETED" }),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Something went wrong");
    }

    return result;
  },

  async deleteTask(id: string) {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Something went wrong");
    }

    return result;
  },
};
