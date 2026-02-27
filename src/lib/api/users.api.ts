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
    console.log("An error has occurred.");
    return [];
  }
}

export async function fetchUsers(): Promise<UserType[]> {
  try {
    const { data }: ServerResponse<UserType[]> = await apiClient.get("/users");
    return data;
  } catch (error) {
    console.log("An error has occurred.");
    return [];
  }
}

export async function fetchUserRole(): Promise<string | null> {
  try {
    const { data }: ServerResponse<string> = await apiClient.get("/users/role");
    return data;
  } catch (error) {
    console.log("An error has occurred.");
    return null;
  }
}

export async function updateUserRole(_id: string, role: string): Promise<UserType | null> {
  try {
    const { data, error }: ServerResponse<UserType> = await apiClient.patch("/users", { _id, role });
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

export async function updateUserName(_id: string, name: string): Promise<UserType | null> {
  try {
    const { data, error }: ServerResponse<UserType> = await apiClient.patch("/users/profile", { _id, name });
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

export async function updateUserPassword(_id: string, current: string, newPassword: string, confirm: string): Promise<UserType | null> {
  try {
    const { data, error }: ServerResponse<UserType> = await apiClient.patch("/users/profile", { _id, current, newPassword, confirm });
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

export async function toggleSuperUser(value: boolean): Promise<boolean> {
  try {
    const { data, error }: ServerResponse<boolean> = await apiClient.patch("/users/super", { value });
    if (error) {
      toast.error(error);
      return false;
    }
    return true;
  } catch (error) {
    console.log("An error has occurred.");
    return false;
  }
}

export async function checkSuperUser(): Promise<boolean> {
  try {
    const { data, error }: ServerResponse<boolean> = await apiClient.get("/users/super");
    if (error) {
      toast.error(error);
      return false;
    }
    return data;
  } catch (error) {
    console.log("An error has occurred.");
    return false;
  }
}

export async function deleteUserById(userId: string): Promise<UserType | null> {
  try {
    const { data, error }: ServerResponse<UserType> = await apiClient.delete("/users", { data: { _id: userId } });
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

export async function postUser(name: string, email: string, password: string, token: string | null): Promise<UserType | string> {
  try {
    const { data, error }: ServerResponse<UserType> = await apiClient.post("/register", { name, email, password, token });
    if (error) {
      return error;
    }
    return data;
  } catch (error) {
    console.log("An error has occurred.");
    return "Unknown error.";
  }
}

export async function verifyUserEmail(token: string): Promise<boolean> {
  try {
    const { data } = await apiClient.get(`/users/verify-email?token=${token}`);
    return data;
  } catch (error) {
    console.log("An error has occurred.");
    return false;

  }
}

export async function checkEmailVerification(email: string): Promise<boolean> {
  try {
    const { data } = await apiClient.get(`users/verify-login?email=${email}`);
    return data;
  } catch (error) {
    console.log("An error has occurred.");
    return false;

  }
}