import { Role } from "@/types/role";
import apiClient from "../api";
import { ServerResponse } from "@/types/server";
import toast from "react-hot-toast";

export async function postRole(name: string, permission_level: number): Promise<Role | null> {
  try {
    const { data, error }: ServerResponse<Role> = await apiClient.post("/roles", { name, permission_level });
    if (error) {
      toast.error(error);
      return null;
    }
    return data;
  } catch (error) {
    console.log("An error has occurred.");
    return null;
  }
}

export async function updateRoleById(_id: string, name: string, permission_level: number): Promise<Role | null> {
  try {
    const { data, error }: ServerResponse<Role> = await apiClient.patch("/roles", { _id, name, permission_level });
    if (error) {
      toast.error(error);
      return null;
    }
    return data;
  } catch (error) {
    console.log("An error has occurred.");
    return null;
  }
}