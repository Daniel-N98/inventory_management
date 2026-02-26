"use client";

import { Role } from "@/types/role";
import { Button } from "../button";
import PermissionSection from "./permission-section";
import InventoryCard from "./card";
import { ServerResponseType, SiteRoles } from "@/types/site-settings";
import { updateSiteSettings } from "@/lib/api/site-settings.api";
import sendResultToast from "./utils";
import { useState } from "react";

export default function CategoriesSection({ roles, currentRoles }: { roles: Role[], currentRoles: SiteRoles }) {
  const [changeMade, setChangeMade] = useState<boolean>(false);

  async function updateCategoriesPermission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const createRole = formData.get("create-categories") as string;
    const editRole = formData.get("edit-categories") as string;
    try {
      const result: ServerResponseType = await updateSiteSettings("categories", editRole, createRole);
      sendResultToast(editRole, createRole, result);
      setChangeMade(false);
    } catch (error) { };
  }

  return (
    <InventoryCard title="Categories" onSubmit={updateCategoriesPermission}>
      <div className="space-y-4">
        <PermissionSection label="Create" description="Who can create Categories?" input_name="create-categories" preloadedRoles={roles} selectedRole={currentRoles.createRole} setChangeMade={setChangeMade} />
        <PermissionSection label="Edit" description="Who can edit Categories?" input_name="edit-categories" preloadedRoles={roles} selectedRole={currentRoles.editRole} setChangeMade={setChangeMade} />
      </div>
      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors" disabled={!changeMade}>
        Update Categories
      </Button>
    </InventoryCard>
  )
}