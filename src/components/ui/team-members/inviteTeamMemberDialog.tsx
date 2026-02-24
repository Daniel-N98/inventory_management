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
import RolesDropdown from "./rolesDropdown"
import { useRef } from "react"
import toast from "react-hot-toast"
import { postInvitation } from "@/lib/api/invitations.api"


export function InviteTeamMemberDialog() {
  const roleRef = useRef<HTMLInputElement>(null);

  async function createCategory(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const role = formData.get("role") as string;
    console.log(name, email, role);
    const result: boolean = await postInvitation(name, email, role);
    if (result) {
      toast.success("An email invitation has been sent.");
      return;
    } else {
      toast.error("An email invitation could not be sent.");
      return;
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Add Member</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={createCategory} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
            <DialogDescription>
              Invite a new team member.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" />
            </Field>
            <Field>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" />
            </Field>
            <Field>
              <Label>Category</Label>
              {/* CategoriesDropdown updates this hidden input on selection */}
              <RolesDropdown
                selected={null}
                onSelect={(role) => {
                  if (roleRef.current) roleRef.current.value = role._id;
                }}
              />
              <input type="hidden" name="role" ref={roleRef} />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit">Create</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog >
  )
}
