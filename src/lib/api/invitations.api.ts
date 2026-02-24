import apiClient from "../api";

export async function postInvitation(name: string, email: string, role: string): Promise<boolean> {
  try {
    const { data } = await apiClient.post("/users/invite", { name, email, role });
    return data;
  } catch (error) {
    console.log("An error has occurred.");
    return false;
  }
}