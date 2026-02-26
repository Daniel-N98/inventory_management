"use client";

import { Role } from "@/types/role";
import { Button } from "../button";
import PermissionSection from "./permission-section";
import InventoryCard from "./card";
import { updateSiteSettings } from "@/lib/api/site-settings.api";
import { ServerResponseType, SiteRoles } from "@/types/site-settings";
import sendResultToast from "./utils";
import { useState } from "react";

export default function InventorySection({ roles, currentRoles }: { roles: Role[], currentRoles: SiteRoles }) {
  const [changeMade, setChangeMade] = useState<boolean>(false);

  async function updateInventoryItemsPermission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const createRole = formData.get("create-inventory-items") as string;
    const editRole = formData.get("edit-inventory-items") as string;
    try {
      const result: ServerResponseType = await updateSiteSettings("inventory-items", editRole, createRole);
      sendResultToast(editRole, createRole, result);
      setChangeMade(false);
    } catch (error) { };
  }

  return (
    <InventoryCard title="Inventory Items" onSubmit={updateInventoryItemsPermission}>
      <div className="space-y-4">
        <PermissionSection label="Create" description="Who can create Inventory Items?" input_name="create-inventory-items" preloadedRoles={roles} selectedRole={currentRoles.createRole} setChangeMade={setChangeMade} />
        <PermissionSection label="Edit" description="Who can edit Inventory Items?" input_name="edit-inventory-items" preloadedRoles={roles} selectedRole={currentRoles.editRole} setChangeMade={setChangeMade} />
      </div>
      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors" disabled={!changeMade}>
        Update Inventory
      </Button>
    </InventoryCard>
  )
}