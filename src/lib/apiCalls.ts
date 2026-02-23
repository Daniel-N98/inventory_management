import { InventoryItem } from "@/types/inventory";
import apiClient from "./api";
import { CategoriesType } from "@/types/category";
import toast from "react-hot-toast";

type ServerResponse<T> = {
  success: boolean,
  data: T;
}

export async function fetchCategories(): Promise<CategoriesType[]> {
  try {
    const { data }: ServerResponse<CategoriesType[]> = await apiClient.get("/categories");
    return data;
  } catch (err) {
    toast.error("An error has occured.");
    return [];
  }
}

export async function fetchInventoryItems(): Promise<InventoryItem[]> {
  try {
    const { data }: ServerResponse<InventoryItem[]> = await apiClient.get("/inventory-item");
    return data;
  } catch (err) {
    toast.error("An error has occured.");
    return [];
  }
}

export async function postInventoryItem({ name, quantity, category }: any): Promise<InventoryItem | null> {

  try {
    const { data }: ServerResponse<InventoryItem> = await apiClient.post("/inventory-item", { name, quantity, category });
    return data;
  } catch (error) {
    toast.error("An error has occured.");
    return null;
  }
}