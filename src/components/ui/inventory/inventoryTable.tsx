import { InventoryItem, SortedFields } from "@/app/dashboard/inventory/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil } from "lucide-react";

interface InventoryTableProps {
  inventoryItems: InventoryItem[],
  filtered: InventoryItem[],
  setSorted: React.Dispatch<React.SetStateAction<SortedFields>>,
  setFiltered: React.Dispatch<React.SetStateAction<InventoryItem[]>>
}

export default function InventoryTable({inventoryItems, filtered, setSorted, setFiltered}: InventoryTableProps) {

    function sortProducts(field: "id" | "name" | "quantity" | "category") {
    setSorted((current: SortedFields) => {
      const nextSorted = { ...current, [field]: !current[field] };
      const sortedArray = [...inventoryItems];

      if (field === "id") sortedArray.sort((a, b) => nextSorted.id ? b.id - a.id : a.id - b.id);

      if (field === "quantity") sortedArray.sort((a, b) => nextSorted.quantity ? b.quantity - a.quantity : a.quantity - b.quantity);

      if (field === "name") sortedArray.sort((a, b) => nextSorted.name ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name));

      if (field === "category") sortedArray.sort((a, b) => nextSorted.category ? b.category.localeCompare(a.category) : a.category.localeCompare(b.category));

      setFiltered(sortedArray);
      return nextSorted;
    });
  }

  return (
    <Card className="bg-white dark:bg-zinc-800 w-full overflow-x-auto">
      <CardHeader>
        <CardTitle className="text-zinc-900 dark:text-zinc-50">Inventory Items</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <div className="overflow-x-auto">
            <Table className="min-w-162.5">
              <TableHeader>
                <TableRow className="bg-zinc-100 dark:bg-zinc-700">
                  <TableHead className="w-12" onClick={() => sortProducts("id")}>ID</TableHead>
                  <TableHead className="w-48" onClick={() => sortProducts("name")}>Name</TableHead>
                  <TableHead className="w-24" onClick={() => sortProducts("quantity")}>Quantity</TableHead>
                  <TableHead className="w-48" onClick={() => sortProducts("category")}>Category</TableHead>
                  <TableHead className="w-16 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered &&
                  filtered.map((item: InventoryItem, idx: number) => (
                    <TableRow
                      key={item.id}
                      className={`${idx % 2 === 0
                        ? "bg-zinc-50 dark:bg-zinc-900"
                        : "bg-white dark:bg-zinc-800"
                        } hover:bg-zinc-200 dark:hover:bg-zinc-700`}
                    >
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell className="flex justify-center">
                        <Pencil className="h-5 w-5 text-blue-600 hover:text-blue-700 cursor-pointer" />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}