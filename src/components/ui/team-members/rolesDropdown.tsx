"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent
} from "@/components/ui/dropdown-menu";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Role } from "@/types/role";
import { fetchRoles } from "@/lib/api/users.api";

interface RolesDropdownProps {
  selected?: null;
  onSelect(role: Role): void;
}

export default function RolesDropdown({ onSelect }: RolesDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selectedName, setSelectedName] = useState<string>("Select a role");
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    async function loadRoles() {
      const response = await fetchRoles();
      setRoles(response);
    }
    loadRoles();
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
          <CommandInput placeholder="Search roles..." />
          <CommandEmpty>No roles found.</CommandEmpty>
          <CommandGroup>
            {roles.map((role: Role) => (
              <CommandItem
                key={role._id}
                onSelect={() => {
                  setSelectedName(role.name); // update button text
                  onSelect(role);            // update hidden input in parent
                  setOpen(false);
                }}
              >
                {role.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}