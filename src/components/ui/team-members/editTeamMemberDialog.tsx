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
import { Pencil, Trash } from "lucide-react";
import { useRef } from "react"
import { UserType } from "@/types/user"
import { updateUserRole } from "@/lib/api/users.api"
import { Role } from "@/types/role"
import RolesDropdown from "./rolesDropdown"

interface EditUserProps {
  user: UserType,
  setUsers: React.Dispatch<React.SetStateAction<UserType[]>>
}

export function EditTeamMemberDialog({ user, setUsers }: EditUserProps) {
  const roleRef = useRef<HTMLInputElement>(null);

  async function updateUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget)
    let role = formData.get("role") as string;
    if (role.length === 0) role = user.role;
    
    try {
      const userResponse: UserType | null = await updateUserRole(user._id, role);

      if (userResponse === null) return;
      setUsers((currentUsers: UserType[]) => currentUsers.map((user: UserType) => user._id === userResponse._id ? userResponse : user));

    } catch (err) {
      console.error(err)
    }
  }

  // async function deleteInventoryItem() {
  //   try {
  //     const inventoryItemRes: InventoryItem | null = await deleteInventoryItemById(inventoryItem._id);
  //     if (!inventoryItemRes) return;

  //     setInventoryItems((prev: InventoryItem[]) =>
  //       prev.filter((inventoryItem: InventoryItem) => inventoryItem._id !== inventoryItemRes._id)
  //     )
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil className="h-5 w-5 text-blue-600 hover:text-blue-700 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={updateUser} className="space-y-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">Edit User</DialogTitle>
            <DialogDescription>
              Update the user {user.name}
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" defaultValue={user.name} disabled />
            </Field>
            <Field>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" defaultValue={user.email} disabled />
            </Field>
            <Field>
              <Label>Role</Label>
              {/* RolesDropdown updates this hidden input on selection */}
              <RolesDropdown
                selected={null}
                onSelect={(role: Role) => {
                  if (roleRef.current) roleRef.current.value = role.name;
                }}
              />
              <input type="hidden" name="role" ref={roleRef} />
            </Field>
          </FieldGroup>
          <DialogFooter className="flex items-center w-full">
            <DialogClose asChild>
              {/* <Button variant="destructive" className="hover:text-white" onClick={() => deleteInventoryItem()}><Trash /></Button> */}
            </DialogClose>

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
