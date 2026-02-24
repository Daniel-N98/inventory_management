import { Role } from "@/types/role";
import { ServerResponse } from "@/types/server";
import apiClient from "../api";
import toast from "react-hot-toast";
import { UserType } from "@/types/user";

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
    const { data }: ServerResponse<UserType[]> = await apiClient.get("/users");
    return data;
  } catch (error) {
    toast.error("An error has occurred.");
    return [];
  }
}

export async function updateUserRole(_id: string, role: string): Promise<UserType | null> {
  try {
    const { data }: ServerResponse<UserType> = await apiClient.patch("/users", { _id, role });
    return data;
  } catch (error) {
    toast.error("An error has occurred.");
    return null;
  }
}

export async function deleteUserById(userId: string): Promise<UserType | null> {
  try {
    const { data }: ServerResponse<UserType> = await apiClient.delete("/users", { data: { _id: userId } });
    return data;
  } catch (error) {
    toast.error("An error has occurred.");
    return null;
  }
}