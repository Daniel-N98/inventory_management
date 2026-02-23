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
import { deleteInventoryItemById, updateInventoryItemById } from "@/lib/api/inventory.api"
import { InventoryItem } from "@/types/inventory"
import { Pencil, Trash } from "lucide-react";
import CategoriesDropdown from "../category/categoriesDropdown"
import { useRef } from "react"

interface EditInventoryProps {
  inventoryItem: InventoryItem,
  setInventoryItems: React.Dispatch<React.SetStateAction<InventoryItem[]>>
}

export function EditInventoryDialog({ inventoryItem, setInventoryItems }: EditInventoryProps) {
  const categoryRef = useRef<HTMLInputElement>(null);

  async function updateInventoryItem(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string
    const quantityRaw = formData.get("quantity");
    const quantity = quantityRaw !== null ? Number(quantityRaw) : 0;
    let category = formData.get("category") as string;
    if (category.length === 0) category = inventoryItem.category;

    try {
      const inventoryResponse: InventoryItem | null = await updateInventoryItemById(inventoryItem._id, name, quantity, category);

      if (inventoryResponse === null) return;
      setInventoryItems((prev: InventoryItem[]) =>
        prev.map((inventoryItem: InventoryItem) =>
          inventoryItem._id === inventoryResponse._id ? inventoryResponse : inventoryItem
        )
      )
    } catch (err) {
      console.error(err)
    }
  }

  async function deleteInventoryItem() {
    try {
      const inventoryItemRes: InventoryItem | null = await deleteInventoryItemById(inventoryItem._id);
      if (!inventoryItemRes) return;

      setInventoryItems((prev: InventoryItem[]) =>
        prev.filter((inventoryItem: InventoryItem) => inventoryItem._id !== inventoryItemRes._id)
      )
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil className="h-5 w-5 text-blue-600 hover:text-blue-700 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={updateInventoryItem} className="space-y-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">Edit Inventory</DialogTitle>
            <DialogDescription>
              Update the name of {inventoryItem.name}
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" defaultValue={inventoryItem.name} />
            </Field>
            <Field>
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" name="quantity" defaultValue={inventoryItem.quantity} />
            </Field>
            <Field>
              <Label>Category</Label>
              {/* CategoriesDropdown updates this hidden input on selection */}
              <CategoriesDropdown
                selected={null}
                onSelect={(cat) => {
                  if (categoryRef.current) categoryRef.current.value = cat.name;
                }}
              />
              <input type="hidden" name="category" ref={categoryRef} />
            </Field>
          </FieldGroup>
          <DialogFooter className="flex items-center w-full">
            <DialogClose asChild>
              <Button variant="destructive" className="hover:text-white" onClick={() => deleteInventoryItem()}><Trash /></Button>
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
