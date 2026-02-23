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
import { postCategory } from "@/lib/apiCalls"
import { CategoriesType } from "@/types/category";

interface CategoryDialogProps {
  setCategories: React.Dispatch<React.SetStateAction<CategoriesType[]>>
}

export function CategoryDialog({ setCategories }: CategoryDialogProps) {

  async function createCategory(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string

    const categoryResponse: CategoriesType | null = await postCategory(name);
    if (categoryResponse === null) return;

    const newCategory: CategoriesType = {
      _id: categoryResponse._id,
      name: categoryResponse.name,
    }

    setCategories((prev: CategoriesType[]) => [...prev, newCategory])
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Add Category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={createCategory} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>
              Create a new category.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" />
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
