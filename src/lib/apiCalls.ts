import { CreatedInventoryItem, InventoryItem } from "@/types/inventory";
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
  } catch (error) {
    toast.error("An error has occurred.");
    return [];
  }
}

export async function updateCategoryById(_id: string, name: string): Promise<CategoriesType | null> {
  try {
    const { data }: ServerResponse<CategoriesType> = await apiClient.patch("/categories", { _id, name });
    return data;
  } catch (error) {
    toast.error("An error has occurred.");
    return null;
  }
}

export async function deleteCategoryById(category_id: string): Promise<CategoriesType | null> {
  try {
    const { data }: ServerResponse<CategoriesType> = await apiClient.delete("/categories", { data: { _id: category_id } });
    return data;
  } catch (error) {
    toast.error("An error has occurred.");
    return null;
  }
}

export async function fetchInventoryItems(): Promise<InventoryItem[]> {
  try {
    const { data }: ServerResponse<InventoryItem[]> = await apiClient.get("/inventory-item");
    return data;
  } catch (error) {
    toast.error("An error has occurred.");
    return [];
  }
}

export async function postInventoryItem({ name, quantity, category }: CreatedInventoryItem): Promise<InventoryItem | null> {

  try {
    const { data }: ServerResponse<InventoryItem> = await apiClient.post("/inventory-item", { name, quantity, category });
    return data;
  } catch (error) {
    toast.error("An error has occurred.");
    return null;
  }
}