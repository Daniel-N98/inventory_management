import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InventoryItem } from "@/types/inventory"
import CategoriesDropdown from "../category/categoriesDropdown"
import { useRef } from "react"
import { postInventoryItem } from "@/lib/api/inventory.api"
import toast from "react-hot-toast"
import { FormDialog } from "../FormDialog"

interface InventoryItemDialogProps {
  setInventoryItems: React.Dispatch<React.SetStateAction<InventoryItem[]>>
}

export function InventoryItemsDialog({ setInventoryItems }: InventoryItemDialogProps) {
  const categoryRef = useRef<HTMLInputElement>(null);

  async function createInventoryItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const quantity = Number(formData.get("quantity") ?? 0);
    const category = formData.get("category") as string;

    if (!name || !category) {
      toast.error("Missing fields");
      return;
    }

    const item = await postInventoryItem({ name, quantity, category });
    if (!item) return;

    setInventoryItems((prev) => [...prev, item]);
  }

  return (
    <FormDialog
      triggerLabel="Add Item"
      title="Add Item"
      description="Create a new inventory item."
      onSubmit={createInventoryItem}
    >
      <FieldGroup>
        <Field>
          <Label>Name</Label>
          <Input name="name" />
        </Field>

        <Field>
          <Label>Quantity</Label>
          <Input name="quantity" type="number" defaultValue={0} />
        </Field>

        <Field>
          <Label>Category</Label>
          <CategoriesDropdown
            selected={null}
            onSelect={(cat) => {
              if (categoryRef.current) categoryRef.current.value = cat._id;
            }}
          />
          <input type="hidden" name="category" ref={categoryRef} />
        </Field>
      </FieldGroup>
    </FormDialog>
  );
}