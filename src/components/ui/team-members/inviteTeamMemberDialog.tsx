import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import RolesDropdown from "./rolesDropdown"
import { useRef } from "react"
import toast from "react-hot-toast"
import { postInvitation } from "@/lib/api/invitations.api"
import { FormDialog } from "../FormDialog"


export function InviteTeamMemberDialog() {
  const roleRef = useRef<HTMLInputElement>(null);

  async function invite(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const role = formData.get("role") as string;

    const success = await postInvitation(name, email, role);
    if (success) toast.success("Invitation sent")
    if (!success) toast.error("Failed to send invitation");
  }

  return (
    <FormDialog
      triggerLabel="Add Member"
      title="Invite Team Member"
      description="Invite a new team member."
      submitLabel="Send Invite"
      onSubmit={invite}
    >
      <FieldGroup>
        <Field>
          <Label>Name</Label>
          <Input name="name" />
        </Field>

        <Field>
          <Label>Email</Label>
          <Input name="email" />
        </Field>

        <Field>
          <Label>Role</Label>
          <RolesDropdown
            selected={null}
            onSelect={(role) => {
              if (roleRef.current) roleRef.current.value = role._id;
            }}
          />
          <input type="hidden" name="role" ref={roleRef} />
        </Field>
      </FieldGroup>
    </FormDialog>
  );
}