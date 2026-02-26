import { Role } from "@/types/role";
import { Button } from "../button";
import PermissionSection from "./permission-section";
import InventoryCard from "./card";

export default function InventorySection({ roles }: { roles: Role[] }) {

  async function updateInventoryItemsPermission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const createRole = formData.get("create-inventory-items") as string;
    const editRole = formData.get("edit-inventory-items") as string;
    console.log(createRole, editRole, formData);
  }

  return (
    <InventoryCard title="Inventory Items" onSubmit={updateInventoryItemsPermission}>
      <div className="space-y-4">
        <PermissionSection label="Create" description="Who can create Inventory Items?" input_name="create-inventory-items" preloadedRoles={roles} />
        <PermissionSection label="Edit" description="Who can edit Inventory Items?" input_name="edit-inventory-items" preloadedRoles={roles} />
      </div>
      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors">
        Update Inventory
      </Button>
    </InventoryCard>
  )
}