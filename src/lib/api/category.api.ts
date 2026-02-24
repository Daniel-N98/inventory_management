import { CategoriesType } from "@/types/category";
import apiClient from "../api";
import { ServerResponse } from "@/types/server";
import toast from "react-hot-toast";

export async function fetchCategories(): Promise<CategoriesType[]> {
  try {
    const { data }: ServerResponse<CategoriesType[]> = await apiClient.get("/categories");
    return data;
  } catch (error) {
    toast.error("An error has occurred.");
    return [];
  }
}

export async function postCategory(name: string): Promise<CategoriesType | null> {
  try {
    const { data, error }: ServerResponse<CategoriesType> = await apiClient.post("/categories", { name });
    if (error) {
      toast.error(error);
      return null;
    }
    return data;
  } catch (error) {
    toast.error("An error has occurred.");
    return null;
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
    const { data, error }: ServerResponse<CategoriesType> = await apiClient.delete("/categories", { data: { _id: category_id } });
    if (error) {
      toast.error(error);
      return null;
    }
    return data;
  } catch (error) {
    toast.error("An error has occurred.");
    return null;
  }
}