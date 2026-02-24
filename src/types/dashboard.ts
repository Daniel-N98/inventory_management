import { CategoriesType } from "@/types/category";
import { InventoryItem } from "@/types/inventory";
import { Role } from "@/types/role";
import { UserType } from "@/types/user";

export type DashboardData = {
  categories: CategoriesType[],
  inventoryItems: InventoryItem[],
  users: UserType[],
  roles: Role[]
}