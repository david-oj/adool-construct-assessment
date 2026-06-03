import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
  if (!date) return null;

  return `${format(date, "MMMM d, yyyy")}`;
}

export function formatTime(date: Date | string) {
return `${format(date, "h:m aaa")}`
}