import { ServerResponseType } from "@/types/site-settings";
import toast from "react-hot-toast";

export default function sendResultToast(editRole: string, createRole: string, result: ServerResponseType, inviteRole?: string,) {
  if (createRole && createRole.length > 0) {
    if (result.createSuccess) {
      toast.success("Create role updated.")
    } else {
      toast.error("Could not update Create role.");
    }
  }
  if (editRole && editRole.length > 0) {
    if (result.editSuccess) {
      toast.success("Edit role updated.")
    } else {
      toast.error("Could not update Edit role.");
    }
  }
    if (inviteRole && inviteRole.length > 0) {
    if (result.inviteSuccess) {
      toast.success("Invite role updated.")
    } else {
      toast.error("Could not update Invite role.");
    }
  }
}