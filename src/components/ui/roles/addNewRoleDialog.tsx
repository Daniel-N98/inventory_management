import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormDialog } from "../FormDialog"
import { Role } from "@/types/role";
import { postRole } from "@/lib/api/roles.api";

interface RolesDialogProps {
  setRoles: React.Dispatch<React.SetStateAction<Role[]>>
}

export function AddRoleDialog({ setRoles }: RolesDialogProps) {

  async function createRole(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const permission_level = Number(formData.get("permission_level") ?? 0);

    const role = await postRole(name, permission_level);
    if (!role) return;

    setRoles((prev) => [...prev, role]);
  }

  return (
    <FormDialog
      triggerLabel="Add Role"
      title="Add Role"
      description="Create a new Role."
      onSubmit={createRole}
    >
      <FieldGroup>
        <Field>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" />
        </Field>
        <Field>
          <Label htmlFor="permission_level">Permission level</Label>
          <Input id="permission_level" name="permission_level" type="number" />
        </Field>
      </FieldGroup>
    </FormDialog>
  );
}