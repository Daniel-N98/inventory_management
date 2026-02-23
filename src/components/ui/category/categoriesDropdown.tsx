"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent
} from "@/components/ui/dropdown-menu";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { CategoriesType } from "@/types/category";
import { fetchCategories } from "@/lib/apiCalls";

interface CategoriesDropdownProps {
  selected?: null;
  onSelect(category: CategoriesType): void;
}

export default function CategoriesDropdown({ onSelect }: CategoriesDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selectedName, setSelectedName] = useState<string>("Select a category");
  const [categories, setCategories] = useState<CategoriesType[]>([]);

  useEffect(() => {
    async function loadCategories() {
      const response = await fetchCategories();
      setCategories(response);
    }
    loadCategories();
  }, [])

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} >
      <DropdownMenuTrigger asChild className="bg-white text-black hover:bg-white hover:border-zinc-950 hover:border">
        <Button className="w-full justify-between">
          {selectedName}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search categories..." />
          <CommandEmpty>No categories found.</CommandEmpty>
          <CommandGroup>
            {categories.map(cat => (
              <CommandItem
                key={cat._id}
                onSelect={() => {
                  setSelectedName(cat.name); // update button text
                  onSelect(cat);            // update hidden input in parent
                  setOpen(false);
                }}
              >
                {cat.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}