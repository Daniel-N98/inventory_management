import { CreatedInventoryItem, InventoryItem } from "@/types/inventory";
import { ServerResponse } from "@/types/server";
import apiClient from "../api";
import toast from "react-hot-toast";

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