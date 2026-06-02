"use client";

import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Calendar, Clock, FileText, Tag, User } from "lucide-react";
import { useGetTask } from "@/lib/hooks/useTasks";
import Loader from "../Loader";
import { statusStyles } from "@/app/dashboard/page";

interface ShowTaskDialogProps {
  open: boolean;
  setSelected: (val: string) => void;
  id: string;
}

const ShowTaskDialog = ({ open, setSelected, id }: ShowTaskDialogProps) => {
  const { data: task, isLoading, isError, isSuccess } = useGetTask(id);

  const containerStyles =
    isSuccess && statusStyles[task.status].containerStyles;
  const bgColor = isSuccess && statusStyles[task.status].bgcolor;

  return (
    <Dialog open={open} onOpenChange={() => setSelected(id)}>
      <DialogContent className="dialog min-h-[306px]! py-6! flex flex-col">
        {isLoading && (
          <div className="h-20 flex-1 flex flex-col items-center justify-center">
            <Loader styles="size-9 sm:size-12 " />
          </div>
        )}
        
        {isError && (
          <div className="h-20 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Failed to get Tasks</p>
          </div>
        )}

        {isSuccess && (
          <div className="">
            <DialogTitle className="text-2xl font-bold text-center">
              {task?.title || ""}
            </DialogTitle>

            <div className="mt-4 space-y-4">
              {/* Status */}
              <div className="flex items-center gap-2">
                <Tag className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Status: </span>
                {/* Badge */}
                <div
                  className={`px-2 py-0.5 size-fit ${containerStyles} flex items-center justify-center gap-1 border rounded-full text-center leading-5.5 capitalize`}
                >
                  <div className={` ${bgColor} size-1.5 rounded-full`} />
                  {task.status.replace("_", " ").toLowerCase()}
                </div>
              </div>

              {/* Description */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="size-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Description
                  </span>
                </div>
                <p className="text-sm leading-relaxed bg-muted/50 p-3 rounded-md">
                  {task.description}
                </p>
              </div>

              {/* Created At */}
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Created</span>
                <span className="text-sm">
                  {new Date(task.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              {/* Time */}
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Time</span>
                <span className="text-sm">
                  {new Date(task.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {/* Task ID (optional, subtle) */}
              <div className="flex items-center gap-2">
                <User className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Task ID</span>
                <span className="text-sm text-muted-foreground font-mono text-xs">
                  {task.id.slice(0, 8)}...
                </span>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ShowTaskDialog;
