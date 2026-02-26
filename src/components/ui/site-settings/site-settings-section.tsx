import { Role } from "@/types/role";
import { Button } from "../button";
import PermissionSection from "./permission-section";
import InventoryCard from "./card";
import { updateSiteSettings } from "@/lib/api/site-settings.api";
import { ServerResponseType } from "@/types/site-settings";
import sendResultToast from "./utils";

export default function SiteSettingsSection({ roles }: { roles: Role[] }) {

  async function updateSiteSettingsPermission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const editRole = formData.get("edit-site-settings") as string;
    try {
      const result: ServerResponseType = await updateSiteSettings("site-settings", editRole, "");
      sendResultToast(editRole, "", result);
    } catch (error) { };
  }

  return (
    <InventoryCard title="Site Settings" onSubmit={updateSiteSettingsPermission}>
      <div className="space-y-4">
        <PermissionSection label="Edit" description="Who can edit Site Settings?" input_name="edit-site-settings" preloadedRoles={roles} />
      </div>
      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors">
        Update Settings
      </Button>
    </InventoryCard>
  )
}