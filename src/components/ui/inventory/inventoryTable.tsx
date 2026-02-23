import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InventoryItem } from "@/types/inventory";
import { Pencil } from "lucide-react";
import { EditInventoryDialog } from "./editInventoryItemDialog";

interface InventoryTableProps {
  filtered: InventoryItem[],
  setInventoryItems: React.Dispatch<React.SetStateAction<InventoryItem[]>>
}

export default function InventoryTable({ filtered, setInventoryItems }: InventoryTableProps) {

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
                  <TableHead className="w-12">ID</TableHead>
                  <TableHead className="w-48">Name</TableHead>
                  <TableHead className="w-24">Quantity</TableHead>
                  <TableHead className="w-48">Category</TableHead>
                  <TableHead className="w-16 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered &&
                  filtered.map((item: InventoryItem, idx: number) => (
                    <TableRow
                      key={item._id}
                      className={`${idx % 2 === 0
                        ? "bg-zinc-50 dark:bg-zinc-900"
                        : "bg-white dark:bg-zinc-800"
                        } hover:bg-zinc-200 dark:hover:bg-zinc-700`}
                    >
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell className="flex justify-center">
                        <EditInventoryDialog inventoryItem={item} setInventoryItems={setInventoryItems} />
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