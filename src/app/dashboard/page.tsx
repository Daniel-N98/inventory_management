"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Pencil } from "lucide-react";

interface InventoryItem {
  id: number,
  name: string,
  quantity: number,
  category: string
}

interface SortedFields {
  id: boolean,
  name: boolean,
  quantity: boolean
  category: boolean
}

const inventoryItems: InventoryItem[] = [
  { id: 1, name: "Laptop", quantity: 12, category: "Electronics" },
  { id: 2, name: "Monitor", quantity: 8, category: "Electronics" },
  { id: 3, name: "Keyboard", quantity: 25, category: "Accessories" },
  { id: 4, name: "Chair", quantity: 5, category: "Furniture" },
];

export default function Dashboard() {
  const [filtered, setFiltered] = useState<InventoryItem[] | null>(inventoryItems);
  const [sorted, setSorted] = useState<SortedFields>({ id: false, name: false, quantity: false, category: false });

  function updateFiltered(e: React.ChangeEvent<HTMLInputElement>) {
    setFiltered(
      e.target.value.length === 0
        ? inventoryItems
        : inventoryItems.filter(
          (item: InventoryItem) =>
            item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            item.category.toLowerCase().includes(e.target.value.toLowerCase())
        )
    );
  }

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
    <main className="flex-1 p-4 md:p-8 overflow-x-auto" >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
        <h1 className="text-2xl md:text-3xl font-semibold text-zinc-900 dark:text-zinc-50">Dashboard</h1>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Add Item</Button>
      </div>

      <div className="mb-4 md:mb-6">
        <Input
          placeholder="Search product name or category..."
          onChange={(e) => updateFiltered(e)}
          className="bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50"
        />
      </div>

      {/* Inventory Table */}
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
                    filtered.map((item, idx) => (
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
    </main >
  )
}