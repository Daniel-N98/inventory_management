import { Role } from "@/types/role";
import apiClient from "../api";
import { ServerResponse } from "@/types/server";

export async function postRole(name: string, permission_level: number): Promise<Role | null> {
  try {
    const { data }: ServerResponse<Role> = await apiClient.post("/roles", { name, permission_level });
    return data;
  } catch (error) {
    console.log("An error has occurred.");
    return null;
  }
}