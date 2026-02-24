import { InventoryItem } from "@/types/inventory";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { CategoriesType } from "@/types/category";
import Link from "next/link";

interface InventoryItemProps {
  inventory_items: InventoryItem[],
  categories: CategoriesType[],
}

export function InventoryOverview({ inventory_items, categories }: InventoryItemProps) {

  const itemsLowInStock: InventoryItem[] = inventory_items.filter((inventory_item: InventoryItem) => inventory_item.quantity < 3);
  // Recently added = last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentlyAddedItems = inventory_items.filter((item) => new Date(item.createdAt) >= sevenDaysAgo);

  // Latest category by createdAt
  const latestCategory = categories.length > 0 ? categories.reduce((latest, current) => new Date(current.createdAt) > new Date(latest.createdAt) ? current : latest) : null;

  // Largest category
  const categoryItemCounts = inventory_items.reduce<Record<string, number>>((acc, item) => {
    const category = item.category?.toString();
    if (!category) return acc;

    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  // Find category with the highest count
  const largestCategory = categories.length > 0 ? categories.reduce((largest, current) => {
    const currentCount =
      categoryItemCounts[current.name.toString()] || 0;
    const largestCount =
      categoryItemCounts[largest.name.toString()] || 0;

    return currentCount > largestCount ? current : largest;
  }) : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
        <p>• <Link href={"/dashboard/inventory"} className="text-blue-600 underline">Items</Link> low in stock: <strong>{itemsLowInStock.length}</strong></p>
        <p>• Recently added <Link href={"/dashboard/inventory"} className="text-blue-600 underline">items:</Link> <strong>{recentlyAddedItems.length}</strong></p>
        <p>• Latest <Link href={"/dashboard/categories"} className="text-blue-600 underline">category:</Link> <strong>{latestCategory ? latestCategory.name : 'No category'}</strong></p>
        <p>• Largest <Link href={"/dashboard/categories"} className="text-blue-600 underline">category:</Link> <strong>{largestCategory ? largestCategory.name : 'No category'}</strong></p>
      </CardContent>
    </Card>
  )
}