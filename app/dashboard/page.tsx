"use client";

import { boxChecked } from "@/assets/images";
import {
  DeliveryTruckBolt,
  DeliveryTruckSpeed,
  Orders,
  PendingClipboard,
} from "@/components/icons";
import Loader from "@/components/Loader";
import ShowTaskDialog from "@/components/tasks/ShowTaskDialog ";
import TaskDialog from "@/components/tasks/TaskDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteTask, useTasks } from "@/lib/hooks/useTasks";
import { Task } from "@/lib/services/task.service";

import { formatDate } from "@/lib/utils";
import { ClipboardEdit, MoreVertical, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { MouseEvent, useState } from "react";
import { toast } from "sonner";

export const statusStyles = {
  PENDING: {
    bgcolor: "bg-amber-600",
    containerStyles: "border-amber-600 bg-amber-600/5 text-amber-600",
  },
  IN_PROGRESS: {
    bgcolor: "bg-blue-600",
    containerStyles: "border-blue-600 bg-blue-600/5 text-blue-600",
  },
  COMPLETED: {
    bgcolor: "bg-cargo-success",
    containerStyles:
      "border-cargo-success bg-cargo-success/5 text-cargo-success",
  },
};

export default function DashboardPage() {
  // const { data, isLoading: isLoadingStats } = useDashboardStats();
  const { data: tasks, isSuccess, isLoading, isError } = useTasks();
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();
  const { data: session } = useSession();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDialog, setSelectedDialog] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  console.log("Session:", session);

  const isLoadingStats = true;

  // console.log("DashboardStats", data);
  // console.log("session", session, isAuthenticated);

  // const getDashboardStats = () => {
  //   const dashboardStats = [
  //     {
  //       title: "Total Shipments",
  //       icon: Orders,
  //       figure: data?.totalShipments || 0,
  //     },
  //     {
  //       title: "Active Shipments",
  //       icon: DeliveryTruckSpeed,
  //       figure: data?.activeShipments || 0,
  //     },
  //     {
  //       title: "Pending Shipments",
  //       icon: PendingClipboard,
  //       figure: data?.pendingShipments || 0,
  //     },
  //     {
  //       title: "Delivered Shipments",
  //       icon: DeliveryTruckBolt,
  //       figure: data?.deliveredShipments || 0,
  //     },
  //   ];

  //   return dashboardStats;
  // };

  const handleShowDialog = (id: string) => {
    setSelectedDialog(id === selectedDialog ? null : id);
  };

  const handleDelete = (id: string, e: MouseEvent) => {
    if (!id) return;
    e.stopPropagation();
    deleteTask(id, {
      onSuccess: (res) => {
        toast.success(res.message || "Task deleted successfully");
      },
      onError: (res) => {
        toast.error(res.message || "Task deleted successfully");
      },
    });
  };

  const handleEdit = (task: Task, e: MouseEvent) => {
    e.stopPropagation();
    setEditingTask(task);
    setOpenDialog(true);
  };

  const dashboardStats = [
    {
      title: "Total Shipments",
      icon: Orders,
      figure: 200000,
    },
    {
      title: "Active Shipments",
      icon: DeliveryTruckSpeed,
      figure: 100000,
    },
    {
      title: "Pending Shipments",
      icon: PendingClipboard,
      figure: 10000,
    },
    {
      title: "Delivered Shipments",
      icon: DeliveryTruckBolt,
      figure: 340000,
    },
  ];

  const fullName = `${session?.user?.firstName || ""} ${
    session?.user?.lastName || ""
  }`;

  return (
    <div className="padding-x mt-16.5">
      <TaskDialog open={openDialog} setOpen={setOpenDialog} />

      <section className="">
        <h1 className="font-bold text-[32px] leading-10 ">
          Welcome, {fullName}
        </h1>
        <p className="text-base font-light leading-6">
          Manage your shipments easily with fast tracking and reliable delivery.
        </p>
      </section>
      <section className="mt-6 grid sm:grid-cols-2 md:grid-cols-4 gap-6 ">
        {dashboardStats.map((shipment, idx) => (
          <div className=" px-5.25 py-6.75 bg-white rounded-[16px]" key={idx}>
            <div className="flex items-center gap-3">
              <shipment.icon className="size-6 text-primary" />
              <p className="leading-5.5 text-neutral-500">{shipment.title}</p>
            </div>

            <p
              className={` ${
                isLoadingStats && "animate-pulse duration-300"
              } mt-5 text-xl font-semibold leading-7`}
            >
              {Number(shipment.figure).toLocaleString()}
            </p>
          </div>
        ))}
      </section>
      <section className="mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold leading-7">Recent Shipments</h2>
          <Button
            onClick={() => {
              setEditingTask(null);
              setOpenDialog(true);
            }}
            variant="outline"
            className="text-primary border-primary"
          >
            Create Task
          </Button>
        </div>

        {isLoading && (
          <div className="h-20 flex items-center justify-center">
            <Loader styles="size-9 sm:size-12 " />
          </div>
        )}

        {isError && (
          <p className="text-red-600 font-roboto ">Failed to fetch all Tasks</p>
        )}

        {isSuccess && tasks.length === 0 && (
          <div className="mt-3 min-h-[437px] md:min-h-[537px] flex flex-col rounded-lg bg-white">
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="size-40 relative">
                <Image
                  src={boxChecked}
                  alt="box package checked icon"
                  className="size-full object-cover"
                  fill
                />
              </div>

              <div className="mt-4 space-y-2 max-w-[370px] ">
                <h3 className="text-xl font-normal leading-6 font-roboto text-center">
                  No Recent Orders
                </h3>

                <p className="text-base font-light leading-6 text-center text-neutral-700">
                  Manage your shipments easily with fast tracking and reliable
                  delivery.
                </p>
              </div>
            </div>
          </div>
        )}

        {isSuccess && tasks.length > 0 && (
          <Table className="mt-3 bg-white rounded-lg">
            <TableHeader>
              <TableRow className="h-[53px]">
                <TableHead className="pl-6 text-sm font-normal leading-5.5 font-roboto text-neutral-600/90">
                  Task ID
                </TableHead>

                <TableHead className="text-sm font-normal leading-5.5 font-roboto text-neutral-600/90">
                  Shipping Type
                </TableHead>
                <TableHead className="text-sm font-normal leading-5.5 font-roboto text-neutral-600/90">
                  Price
                </TableHead>
                <TableHead className="text-sm font-normal leading-5.5 font-roboto text-neutral-600/90">
                  Date
                </TableHead>
                <TableHead className="pr-6 text-sm font-normal leading-5.5 font-roboto text-neutral-600/90">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {tasks.map((task, idx) => {
                const isSelected = task.id === selectedDialog;
                const containerStyles =
                  statusStyles[task.status].containerStyles;
                const bgColor = statusStyles[task.status].bgcolor;
                return (
                  <>
                    <TableRow
                      onClick={() => handleShowDialog(task.id)}
                      key={idx}
                      className={` 
                      ${isDeleting && "animate-pulse duration-300"}
                      h-15.5 hover:cursor-pointer`}
                    >
                      <TableCell className="pl-6 leading-5.5 max-w-35 overflow-hidden">
                        {task.id}
                      </TableCell>

                      <TableCell className="leading-5.5 capitalize">
                        {task.title}
                      </TableCell>
                      <TableCell className="leading-5.5">
                        {task.description}
                      </TableCell>
                      <TableCell className="leading-5.5">
                        {formatDate(task.createdAt)}
                      </TableCell>
                      <TableCell className="">
                        <div
                          className={`px-2 py-0.5 size-full ${containerStyles} flex items-center justify-center gap-1 border rounded-full text-center leading-5.5 capitalize`}
                        >
                          <div
                            className={` ${bgColor} size-1.5 rounded-full`}
                          />
                          {task.status.replace("_", " ").toLowerCase()}
                        </div>
                      </TableCell>
                      <TableCell className="pr-6">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="size-6 flex items-center justify-center border border-neutral-200 rounded-[4px]">
                              <MoreVertical className="size-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="space-y-1"
                          >
                            {/* Edit button */}
                            <DropdownMenuItem asChild>
                              <Button
                                variant="secondary"
                                onClick={(e) => handleEdit(task, e)}
                                className="gap-2 text-sm md:text-base font-roboto cursor-pointer justify-between pr-3 w-full bg-transparent"
                              >
                                Edit <ClipboardEdit className="size-4" />
                              </Button>
                            </DropdownMenuItem>
                            {/* Delete Button */}
                            <DropdownMenuItem asChild>
                              <Button
                                onClick={(e) => handleDelete(task.id, e)}
                                variant="destructive"
                                className="gap-2 text-sm md:text-base font-roboto cursor-pointer justify-between pr-3 w-full"
                              >
                                Delete{" "}
                                <Trash2 className="size-4 text-red-600" />
                              </Button>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>

                    <TaskDialog
                      open={openDialog}
                      setOpen={setOpenDialog}
                      editData={editingTask}
                    />

                    {isSelected && (
                      <ShowTaskDialog
                        id={task.id}
                        open={isSelected}
                        setSelected={handleShowDialog}
                      />
                    )}
                  </>
                );
              })}
            </TableBody>
          </Table>
        )}
      </section>
      {/* <section></section> */}
    </div>
  );
}
