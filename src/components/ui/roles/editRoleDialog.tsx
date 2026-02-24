import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { deleteCategoryById, updateCategoryById } from "@/lib/api/category.api"
import { updateRoleById } from "@/lib/api/roles.api"
import { CategoriesType } from "@/types/category";
import { Role } from "@/types/role"
import { Pencil, Trash } from "lucide-react";

interface EditRoleProps {
  role: Role,
  setRoles: React.Dispatch<React.SetStateAction<Role[]>>
}

export function EditRoleDialog({ role, setRoles }: EditRoleProps) {

  async function updateRole(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string
    const permission_level = Number(formData.get("permission_level") ?? 0);
    try {
      const roleResponse: Role | null = await updateRoleById(role._id, name, permission_level);
      if (roleResponse === null) return;
      setRoles((prev: Role[]) =>
        prev.map((role: Role) =>
          role._id === roleResponse._id ? roleResponse : role
        )
      )
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil className="h-5 w-5 text-blue-600 hover:text-blue-700 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={updateRole} className="space-y-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">Edit Role</DialogTitle>
            <DialogDescription>
              Update the name of {role.name}
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" defaultValue={role.name} />
            </Field>
            <Field>
              <Label htmlFor="permission_level">Permission Level</Label>
              <Input id="permission_level" name="permission_level" type="number" defaultValue={role.permission_level} />
            </Field>
          </FieldGroup>
          <DialogFooter className="flex items-center w-full">

            <div className="ml-auto flex gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit">Save</Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog >
  )
}
