"use client";

import { Role } from "@/types/role";
import { Button } from "../button";
import PermissionSection from "./permission-section";
import InventoryCard from "./card";
import { ServerResponseType, SiteRoles } from "@/types/site-settings";
import { updateSiteSettings } from "@/lib/api/site-settings.api";
import sendResultToast from "./utils";
import { useState } from "react";

export default function RolesSection({ roles, currentRoles }: { roles: Role[], currentRoles: SiteRoles  }) {
  const [changeMade, setChangeMade] = useState<boolean>(false);

  async function updateRolesPermission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const createRole = formData.get("create-roles") as string;
    const editRole = formData.get("edit-roles") as string;
    try {
      const result: ServerResponseType = await updateSiteSettings("roles", editRole, createRole);
      sendResultToast(editRole, createRole, result);
      setChangeMade(false);
    } catch (error) { };
  }

  return (
    <InventoryCard title="Roles" onSubmit={updateRolesPermission}>
      <div className="space-y-4">
        <PermissionSection label="Create" description="Who can create Roles?" input_name="create-roles" preloadedRoles={roles} selectedRole={currentRoles.createRole} setChangeMade={setChangeMade} />
        <PermissionSection label="Edit" description="Who can edit Roles?" input_name="edit-roles" preloadedRoles={roles} selectedRole={currentRoles.editRole} setChangeMade={setChangeMade} />
      </div>
      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors" disabled={!changeMade}>
        Update Roles
      </Button>
    </InventoryCard>
  )
}