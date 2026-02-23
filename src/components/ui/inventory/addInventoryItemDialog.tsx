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

interface InventoryItemDialogProps {
  setInventoryItems: React.Dispatch<React.SetStateAction<InventoryItem[]>>
}

export function InventoryItemsDialog({ setInventoryItems }: InventoryItemDialogProps) {

  async function createInventoryItem(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string;
    const quantityRaw = formData.get("quantity");
    const quantity = quantityRaw !== null ? Number(quantityRaw) : 0;
    const category = formData.get("category") as string;

    console.log(name, quantity, category);

    const res = await fetch("/api/inventory-item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, quantity, category }),
    });

    if (!res.ok) return;

    const json = await res.json()

    const newInventoryItem: InventoryItem = {
      _id: json.data._id,
      name: json.data.name,
      quantity: json.data.quantity,
      category: json.data.category,
    }

    setInventoryItems((prev: InventoryItem[]) => [...prev, newInventoryItem])
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
              {/* Below will be changed to a dropdown of categories populated with existing categories. */}
              <Label htmlFor="category">Category</Label>
              <Input id="category" name="category" />
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
