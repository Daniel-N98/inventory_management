import { Role } from "@/types/role";
import { ServerResponse } from "@/types/server";
import apiClient from "../api";
import toast from "react-hot-toast";

export async function fetchRoles(): Promise<Role[]> {
  try {
    const { data }: ServerResponse<Role[]> = await apiClient.get("/roles");
    return data;
  } catch (error) {
    toast.error("An error has occurred.");
    return [];
  }
}