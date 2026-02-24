import { CreatedInventoryItem, InventoryItem } from "@/types/inventory";
import { ServerResponse } from "@/types/server";
import apiClient from "../api";
import toast from "react-hot-toast";

export async function fetchInventoryItems(): Promise<InventoryItem[]> {
  try {
    const { data }: ServerResponse<InventoryItem[]> = await apiClient.get("/inventory-item");
    return data;
  } catch (error) {
    console.log("An error has occurred.");
    return [];
  }
}

export async function postInventoryItem({ name, quantity, category }: CreatedInventoryItem): Promise<InventoryItem | null> {

  try {
    const { data, error }: ServerResponse<InventoryItem> = await apiClient.post("/inventory-item", { name, quantity, category });
    if (error) {
      toast.error(error);
      return null;
    }
    return data;
  } catch (error) {
    console.log("An error has occurred.");
    return null;
  }
}

export async function updateInventoryItemById(_id: string, name: string, quantity: number, category: string): Promise<InventoryItem | null> {
  try {
    const { data, error }: ServerResponse<InventoryItem> = await apiClient.patch("/inventory-item", { _id, name, quantity, category: category.length > 0 ? category : null });
    if (error) {
      toast.error(error);
      return null;
    }
    return data;
  } catch (error) {
    console.log("An error has occurred.");
    return null;
  }
}

export async function deleteInventoryItemById(inventoryItemId: string): Promise<InventoryItem | null> {
  try {
    const { data, error }: ServerResponse<InventoryItem> = await apiClient.delete("/inventory-item", { data: { _id: inventoryItemId } });
    if (error) {
      toast.error(error);
      return null;
    }
    return data;
  } catch (error) {
    console.log("An error has occurred.");
    return null;
  }
}