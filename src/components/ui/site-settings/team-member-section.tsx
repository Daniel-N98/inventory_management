"use client";

import { Role } from "@/types/role";
import { Button } from "../button";
import PermissionSection from "./permission-section";
import InventoryCard from "./card";
import { ServerResponseType, SiteRoles } from "@/types/site-settings";
import { updateSiteSettings } from "@/lib/api/site-settings.api";
import sendResultToast from "./utils";
import { useState } from "react";

export default function TeamMemberSection({ roles, currentRoles }: { roles: Role[], currentRoles: SiteRoles  }) {
  const [changeMade, setChangeMade] = useState<boolean>(false);

  async function updateTeamMembersPermission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const inviteRole = formData.get("invite-team-members") as string;
    const editRole = formData.get("edit-team-members") as string;
    try {
      const result: ServerResponseType = await updateSiteSettings("team-members", editRole, "", inviteRole);
      sendResultToast(editRole, "", result, inviteRole);
      setChangeMade(false);
    } catch (error) { };
  }

  return (
    <InventoryCard title="Team Members" onSubmit={updateTeamMembersPermission}>
      <div className="space-y-4">
        <PermissionSection label="Invite" description="Who can invite Members?" input_name="invite-team-members" preloadedRoles={roles} selectedRole={currentRoles.inviteRole} setChangeMade={setChangeMade} />
        <PermissionSection label="Edit" description="Who can edit Member Roles?" input_name="edit-team-members" preloadedRoles={roles} selectedRole={currentRoles.editRole} setChangeMade={setChangeMade} />
      </div>
      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors" disabled={!changeMade}>
        Update Members
      </Button>
    </InventoryCard>
  )
}