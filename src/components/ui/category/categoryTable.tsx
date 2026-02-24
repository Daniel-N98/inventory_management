import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EditCategoryDialog } from "./editCategoryDialog";
import { CategoriesType } from "@/types/category";
import LoadingIcon from "../loadingIcon";

interface CategoryTableProps {
  filtered: CategoriesType[] | null,
  setCategories: React.Dispatch<React.SetStateAction<CategoriesType[]>>
}
export default function CategoriesTable({ filtered, setCategories }: CategoryTableProps) {

  {/* Categories Table */ }
  return (
    <Card className="bg-white dark:bg-zinc-800 w-full overflow-x-auto" >
      <CardHeader>
        <CardTitle className="text-zinc-900 dark:text-zinc-50">Categories</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <div className="overflow-x-auto">
            <Table className="min-w-162.5">
              <TableHeader>
                <TableRow className="bg-zinc-100 dark:bg-zinc-700">
                  <TableHead className="w-12">ID</TableHead>
                  <TableHead className="w-48">Name</TableHead>
                  <TableHead className="w-16 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered ?
                  filtered.map((item, idx) => (
                    <TableRow
                      key={item._id}
                      className={`${idx % 2 === 0
                        ? "bg-zinc-50 dark:bg-zinc-900"
                        : "bg-white dark:bg-zinc-800"
                        } hover:bg-zinc-200 dark:hover:bg-zinc-700`}
                    >
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="flex justify-center">
                        <EditCategoryDialog category={item} setCategories={setCategories} />
                      </TableCell>
                    </TableRow>
                  )) : <TableRow><TableCell><LoadingIcon /></TableCell></TableRow>}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}