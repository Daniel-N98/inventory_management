import apiClient from "../api";
import toast from "react-hot-toast";
import { FormattedSiteSettings, ServerResponseType, SiteSettingsType } from "@/types/site-settings";

export async function fetchSiteSettings(): Promise<FormattedSiteSettings | null> {
  try {
    const { data } = await apiClient.get("/site-settings");
    return data;
  } catch (error) {
    console.log("An error has occurred.");
    return null;
  }
}

export async function updateSiteSettings(type: string, editRole: string, createRole: string, inviteRole?: string): Promise<ServerResponseType> {
  try {
    const { data, error }: { data: ServerResponseType, error: string } = await apiClient.patch("/site-settings", { type, editRole, createRole, inviteRole });
    if (error) {
      toast.error(error);
      return { editSuccess: false, createSuccess: false, inviteSuccess: false, };
    }
    return data;
  } catch (error) {
    console.log("An error has occurred.");
    return { editSuccess: false, createSuccess: false, inviteSuccess: false };
  }
}