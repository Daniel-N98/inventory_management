import { DashboardData } from "@/types/dashboard";
import apiClient from "../api";
import { CategoriesType } from "@/types/category";
import { ServerResponse } from "@/types/server";
import { InventoryItem } from "@/types/inventory";
import { UserType } from "@/types/user";
import { Role } from "@/types/role";
import toast from "react-hot-toast";
import axios from "axios";

export async function fetchDashboardData(): Promise<DashboardData | null> {
  try {
    const categoriesRes: ServerResponse<CategoriesType[]> = await apiClient.get("/categories");
    const inventoryItemsRes: ServerResponse<InventoryItem[]> = await apiClient.get("/inventory-item");
    const usersRes: ServerResponse<UserType[]> = await apiClient.get("/users");
    const rolesRes: ServerResponse<Role[]> = await apiClient.get("/roles");

    const dashboardData: DashboardData = {
      categories: categoriesRes.data,
      inventoryItems: inventoryItemsRes.data,
      users: usersRes.data,
      roles: rolesRes.data,
    }
    return dashboardData;
  } catch (error) {
    if (axios.isCancel(error)) return null;
    toast.error("An error has occurred.");
    return null;
  }
}