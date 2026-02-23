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
import { CategoriesType } from "@/types/category";
import { Pencil, Trash } from "lucide-react";

interface EditCategoryProps {
  category: CategoriesType,
  setCategories: React.Dispatch<React.SetStateAction<CategoriesType[]>>
}

export function EditCategoryDialog({ category, setCategories }: EditCategoryProps) {

  async function updateCategory(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string
    try {
      const categoryResponse: CategoriesType | null = await updateCategoryById(category._id, name);
      if (categoryResponse === null) return;
      setCategories((prev: CategoriesType[]) =>
        prev.map((category: CategoriesType) =>
          category._id === categoryResponse._id ? categoryResponse : category
        )
      )
    } catch (err) {
      console.error(err)
    }
  }

  async function deleteCategory() {
    try {
      const categoryRes: CategoriesType | null = await deleteCategoryById(category._id);
      if (!categoryRes) return;

      setCategories((prev: CategoriesType[]) =>
        prev.filter((category: CategoriesType) => category._id !== categoryRes._id)
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
        <form onSubmit={updateCategory} className="space-y-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">Edit Category</DialogTitle>
            <DialogDescription>
              Update the name of {category.name}
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" defaultValue={category.name} />
            </Field>
          </FieldGroup>
          <DialogFooter className="flex items-center w-full">
            <DialogClose asChild>
              <Button variant="destructive" className="hover:text-white" onClick={() => deleteCategory()}><Trash /></Button>
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
