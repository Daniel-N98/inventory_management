"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TeamMemberTable from "@/components/ui/team-members/teamMemberTable";
import { fetchUsers, updateUserRole } from "@/lib/api/users.api";
import { UserType } from "@/types/user";
import { useEffect, useState } from "react";

export default function TeamMembers() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [search, setSearch] = useState('');

  const filtered = users.filter((user: UserType) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.role.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    async function loadUsers() {
      const usersRes: UserType[] = await fetchUsers();
      setUsers(usersRes);
    }
    loadUsers();
  }, []);

  return (
    <main className="flex-1 p-4 md:p-8 overflow-x-auto" >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
        <h1 className="text-2xl md:text-3xl font-semibold text-zinc-900 dark:text-zinc-50">Team Members</h1>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white" disabled>Add Member</Button>
      </div>

      {/* Search / Filter */}
      <div className="mb-4 md:mb-6">
        <Input
          placeholder="Search a member by (name, email, permission level)..."
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50"
        />
      </div>
      <TeamMemberTable filtered={filtered} setUsers={setUsers} />
    </main>
  )
}