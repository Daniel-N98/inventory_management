"use client";

import { Input } from "@/components/ui/input";
import { AddRoleDialog } from "@/components/ui/roles/addNewRoleDialog";
import RolesTable from "@/components/ui/roles/rolesTable";
import { fetchRoles } from "@/lib/api/users.api";
import { Role } from "@/types/role";
import { useEffect, useState } from "react";

export default function Roles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState('');

  const filtered = loading ? null : roles.filter((role: Role) => role.name.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    async function loadRoles() {
      const rolesRes: Role[] = await fetchRoles();
      setRoles(rolesRes.sort((a, b) => a.permission_level - b.permission_level));
      setLoading(false);
    }
    loadRoles();
  }, []);

  return (
    <main className="flex-1 p-4 md:p-8 overflow-x-auto" >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
        <h1 className="text-2xl md:text-3xl font-semibold text-zinc-900 dark:text-zinc-50">Roles</h1>
        <AddRoleDialog setRoles={setRoles} />
      </div>

      {/* Search / Filter */}
      <div className="mb-4 md:mb-6">
        <Input
          placeholder="Search a role name."
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50"
        />
      </div>
      <RolesTable filtered={filtered} setRoles={setRoles} />
    </main>
  )
}