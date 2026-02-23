"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { CategoryDialog } from "@/components/ui/category/addCategoryDialog";
import { CategoriesType } from "@/types/category";
import CategoriesTable from "@/components/ui/category/categoryTable";

export default function Categories() {
  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const [search, setSearch] = useState('')

  const filtered = categories.filter(category =>
    category.name.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch('/api/categories')
      const json: {
        success: boolean
        data: CategoriesType[]
      } = await response.json()
      console.log(json);

      setCategories(json.data);
    }
    fetchCategories();
  }, []);

  return (
    <main className="flex-1 p-4 md:p-8 overflow-x-auto" >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
        <h1 className="text-2xl md:text-3xl font-semibold text-zinc-900 dark:text-zinc-50">Dashboard</h1>
        <CategoryDialog setCategories={setCategories} />
      </div>

      <div className="mb-4 md:mb-6">
        <Input
          placeholder="Search category name..."
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50"
        />
      </div>
      <CategoriesTable filtered={filtered} setCategories={setCategories} />
    </main >
  )
}