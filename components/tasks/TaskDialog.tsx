import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { ClipboardClock, ClipboardEdit } from "lucide-react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../ui/field";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskData, taskSchema } from "@/lib/schema/taskSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useCreateTask, useUpdateTask } from "@/lib/hooks/useTasks";
import { toast } from "sonner";
import { Task } from "@/lib/services/task.service";

interface TaskDialogProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  editData?: Task | null;
}

const TaskDialog = ({ open, setOpen, editData }: TaskDialogProps) => {
  const { mutate: createTask, isPending: isCreating } = useCreateTask();
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();
  const { control, handleSubmit, reset } = useForm<TaskData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: undefined,
    },
  });

  const isEdit = !!editData;

  useEffect(() => {
    if (editData) {
      console.log("Hydrating Task:", editData);
      reset({
        title: editData.title,
        description: editData.description || "",
        status: editData.status ?? "PENDING",
      });
    } else {
      reset({
        title: "",
        description: "",
        status: undefined,
      });
    }
  }, [editData, reset, open]);

  const onSubmit = (data: TaskData) => {
    console.log("Task", data);

    if (isEdit && editData)
      updateTask(
        { id: editData.id, data },
        {
          onSuccess: (res) => {
            toast.success(res.message || "Task updated successfully!");
            setOpen(false);
          },
        }
      );
    else {
      createTask(data, {
        onSuccess: (res) => {
          toast.success(res.message || "Task created successfully!");
          setOpen(false);
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="dialog min-h-0! flex flex-col items-center pt-15! pb-10!">
        <DialogTitle className="text-2xl font-bold leading-8">
          {isEdit ? "Edit Task" : "Create A Task"}
        </DialogTitle>

        {isEdit ? (
          <ClipboardEdit className="size-15 mt-2" />
        ) : (
          <ClipboardClock className="size-15 mt-2" />
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <FieldSet className="gap-0">
            <FieldGroup className="mt-8 gap-6">
              <Controller
                name="title"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="form-label">
                      Title
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="e,g Read a book"
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
                name="description"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="form-label">
                      Description
                    </FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Further details..."
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
                name="status"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor={field.name} className="form-label">
                      Select Delivery Type
                    </FieldLabel>

                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        className="form-input !h-14 relative"
                      >
                        <SelectValue
                          placeholder={field.value || "Choose Status"}
                        />
                      </SelectTrigger>

                      <SelectContent position="popper">
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                        {isEdit && (
                          <SelectItem value="COMPLETED">Completed</SelectItem>
                        )}
                      </SelectContent>
                    </Select>

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
          <div className="gap-4 mt-6 w-full">
            <Button
              disabled={isCreating || isUpdating}
              className="submit-button"
            >
              {isEdit ? "Edit Task" : "Create Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
