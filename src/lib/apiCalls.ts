import apiClient from "./api";
import { CategoriesType } from "@/types/category";

type ServerResponse<T> = {
  success: boolean,
  data: T;
}

export async function fetchCategories(): Promise<CategoriesType[]> {
  try {
    const { data }: ServerResponse<CategoriesType[]> = await apiClient.get("/categories");
    return data;
  } catch (err) {
    console.error("Error fetching categories:", err);
    return [];
  }
}