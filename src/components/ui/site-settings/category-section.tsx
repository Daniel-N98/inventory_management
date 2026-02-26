import { Role } from "@/types/role";
import { Button } from "../button";
import PermissionSection from "./permission-section";
import InventoryCard from "./card";

export default function CategoriesSection({ roles }: { roles: Role[] }) {

  async function updateCategoriesPermission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const createRole = formData.get("create-categories") as string;
    const editRole = formData.get("edit-categories") as string;
    console.log(createRole, editRole, formData);
  }

  return (
    <InventoryCard title="Categories" onSubmit={updateCategoriesPermission}>
      <div className="space-y-4">
        <PermissionSection label="Create" description="Who can create Categories?" input_name="create-categories" preloadedRoles={roles} />
        <PermissionSection label="Edit" description="Who can edit Categories?" input_name="edit-categories" preloadedRoles={roles} />
      </div>
      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors">
        Update Categories
      </Button>
    </InventoryCard>
  )
}