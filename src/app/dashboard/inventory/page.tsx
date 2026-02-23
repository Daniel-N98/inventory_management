"use client";

import { Input } from "@/components/ui/input";
import { InventoryItemsDialog } from "@/components/ui/inventory/addInventoryItemDialog";
import InventoryTable from "@/components/ui/inventory/inventoryTable";
import { fetchInventoryItems } from "@/lib/api/inventory.api";
import { InventoryItem } from "@/types/inventory";
import { useEffect, useState } from "react";

export default function Inventory() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [search, setSearch] = useState('');

  const filtered = inventoryItems.filter((inventoryItem: InventoryItem) =>
    inventoryItem.name.toLowerCase().includes(search.toLowerCase()) ||
    inventoryItem.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    async function loadInventoryItems() {
      const inventoryItemsRes: InventoryItem[] = await fetchInventoryItems();
      setInventoryItems(inventoryItemsRes);
    }
    loadInventoryItems();
  }, []);


  return (
    <main className="flex-1 p-4 md:p-8 overflow-x-auto" >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
        <h1 className="text-2xl md:text-3xl font-semibold text-zinc-900 dark:text-zinc-50">Inventory</h1>
        <InventoryItemsDialog setInventoryItems={setInventoryItems} />
      </div>

      <div className="mb-4 md:mb-6">
        <Input
          placeholder="Search product name or category..."
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50"
        />
      </div>

      {/* Inventory Table */}
      <InventoryTable filtered={filtered} setInventoryItems={setInventoryItems}/>
    </main >
  )
}