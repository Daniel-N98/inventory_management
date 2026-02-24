import { InventoryItem } from "@/types/inventory";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { CategoriesType } from "@/types/category";

interface InventoryItemProps {
  inventory_items: InventoryItem[],
  categories: CategoriesType[],
}

export function InventoryOverview({ inventory_items, categories }: InventoryItemProps) {

  const itemsLowInStock: InventoryItem[] = inventory_items.filter((inventory_item: InventoryItem) => inventory_item.quantity < 3);
  // TODO: Filter items by date to find recently added.
  // TODO: Find latest category.

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
        <p>• Items low in stock: <strong>{itemsLowInStock.length}</strong></p>
        <p>• Recently added items: <strong>14</strong></p>
        <p>• Largest category: <strong>{categories.length > 0 ? categories[categories.length - 1].name : 'No category'}</strong></p>
      </CardContent>
    </Card>
  )
}