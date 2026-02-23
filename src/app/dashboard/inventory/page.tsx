"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InventoryTable from "@/components/ui/inventory/inventoryTable";
import { useState } from "react";

export interface InventoryItem {
  id: number,
  name: string,
  quantity: number,
  category: string
}

export interface SortedFields {
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

export default function Inventory() {
  const [filtered, setFiltered] = useState<InventoryItem[]>(inventoryItems);

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
      <InventoryTable filtered={filtered} />
    </main >
  )
}