import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { task } from "../services/task.service";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: task.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: task.updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: task.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: task.getAllTasks,
    select: (res) => res.data ?? [],
  });
};

export const useGetTask = (id: string) => {
  return useQuery({
    queryKey: ["task", id],
    queryFn: () => task.getTask(id),
    select: (res) => res.data,
  });
};
