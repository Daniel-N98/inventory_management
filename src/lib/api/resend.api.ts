import { ResendVerificationEmail } from "@/types/resend";
import apiClient from "../api";

export async function sendVerificationEmail({ to, name }: ResendVerificationEmail) {
  try {
    const data = await apiClient.post("/register/email-verification", { to, name });
    console.log(data);

  } catch (error) { }
}