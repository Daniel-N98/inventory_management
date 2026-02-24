import { DashboardData } from "@/types/dashboard";
import apiClient from "../api";
import toast from "react-hot-toast";

export async function fetchDashboardData(): Promise<DashboardData | null> {
  try {
    const [categoriesRes, inventoryItemsRes, usersRes, rolesRes] = await Promise.all([
      await apiClient.get("/categories"),
      await apiClient.get("/inventory-item"),
      await apiClient.get("/users"),
      await apiClient.get("/roles"),
    ]);

    const dashboardData: DashboardData = {
      categories: categoriesRes.data,
      inventoryItems: inventoryItemsRes.data,
      users: usersRes.data,
      roles: rolesRes.data,
    }
    return dashboardData;
  } catch (error) {
    toast.error("An error has occurred.");
    return null;
  }
}