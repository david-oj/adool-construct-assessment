export interface DashboardStats {
  pending: number;
  inProgress: number;
  completed: number;
  total: number;
}

export const dashboard = {
  async getDashboardStats(): Promise<DashboardStats> {
    const res = await fetch("/api/dashboard/stats", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Something went wrong");
    }

    return result.data;
  },
};
