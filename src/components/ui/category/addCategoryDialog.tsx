import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { postCategory } from "@/lib/api/category.api"
import { CategoriesType } from "@/types/category";
import { FormDialog } from "../FormDialog"

interface CategoryDialogProps {
  setCategories: React.Dispatch<React.SetStateAction<CategoriesType[]>>
}

export function CategoryDialog({ setCategories }: CategoryDialogProps) {
  async function createCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    const category = await postCategory(name);
    if (!category) return;

    setCategories((prev) => [...prev, category]);
  }

  return (
    <FormDialog
      triggerLabel="Add Category"
      title="Add Category"
      description="Create a new category."
      onSubmit={createCategory}
    >
      <FieldGroup>
        <Field>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" />
        </Field>
      </FieldGroup>
    </FormDialog>
  );
}