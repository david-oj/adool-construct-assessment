import { useQuery } from "@tanstack/react-query";
import { dashboard } from "../services/dashboard.service";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: dashboard.getDashboardStats,
  });
}
