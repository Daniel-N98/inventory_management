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
import { InventoryItem } from "@/types/inventory"
import CategoriesDropdown from "../category/categoriesDropdown"
import { useRef } from "react"
import { postInventoryItem } from "@/lib/apiCalls"

interface InventoryItemDialogProps {
  setInventoryItems: React.Dispatch<React.SetStateAction<InventoryItem[]>>
}

export function InventoryItemsDialog({ setInventoryItems }: InventoryItemDialogProps) {
  // TODO: If the form is invalid on create, use a toast at the top of the screen to tell the user about this.
  const categoryRef = useRef<HTMLInputElement>(null);

  async function createInventoryItem(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string;
    const quantityRaw = formData.get("quantity");
    const quantity = quantityRaw !== null ? Number(quantityRaw) : 0;
    const category = formData.get("category") as string;

    console.log(name, quantity, category);

    const resultItem = await postInventoryItem({ name, quantity, category });

    if (resultItem === null) {
      // Toast.
      return;
    }

    setInventoryItems((prev: InventoryItem[]) => [...prev, resultItem]);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Add Item</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={createInventoryItem} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add Item</DialogTitle>
            <DialogDescription>
              Create a new inventory item.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" />
            </Field>
            <Field>
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" name="quantity" type="number" />
            </Field>
            <Field>
              <Label>Category</Label>
              {/* CategoriesDropdown updates this hidden input on selection */}
              <CategoriesDropdown
                selected={null}
                onSelect={(cat) => {
                  if (categoryRef.current) categoryRef.current.value = cat._id;
                }}
              />
              <input type="hidden" name="category" ref={categoryRef} />
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
