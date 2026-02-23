import { Role } from "@/types/role";
import { ServerResponse } from "@/types/server";
import apiClient from "../api";
import toast from "react-hot-toast";
import { UserType } from "@/types/User";

export async function fetchRoles(): Promise<Role[]> {
  try {
    const { data }: ServerResponse<Role[]> = await apiClient.get("/roles");
    return data;
  } catch (error) {
    toast.error("An error has occurred.");
    return [];
  }
}

export async function fetchUsers(): Promise<UserType[]> {
  try {
    const {data}: ServerResponse<UserType[]> = await apiClient.get("/users");
    return data;
  } catch (error) {
    toast.error("An error has occurred.");
    return [];
  }
}