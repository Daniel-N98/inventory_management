"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchUsers } from "@/lib/api/users.api";
import { UserType } from "@/types/User";
import { Pencil } from "lucide-react";
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
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Add Member</Button>
      </div>

      {/* Search / Filter */}
      <div className="mb-4 md:mb-6">
        <Input
          placeholder="Search a member by (name, email, permission level)..."
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50"
        />
      </div>
      <Card className="bg-white dark:bg-zinc-800 w-full overflow-x-auto" >
        {/* Inventory Table */}
        <CardHeader>
          <CardTitle className="text-zinc-900 dark:text-zinc-50">Inventory Items</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-175">
              <TableHeader>
                <TableRow className="bg-zinc-100 dark:bg-zinc-700">
                  <TableHead className="w-12">ID</TableHead>
                  <TableHead className="w-36">Name</TableHead>
                  <TableHead className="w-60">Email</TableHead>
                  <TableHead className="w-48">Role</TableHead>
                  <TableHead className="w-16 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered &&
                  filtered.map((item: UserType, idx: number) => (
                    <TableRow
                      key={item._id}
                      className={`${idx % 2 === 0 ? "bg-zinc-50 dark:bg-zinc-900" : "bg-white dark:bg-zinc-800"
                        } hover:bg-zinc-200 dark:hover:bg-zinc-700`}
                    >
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.role}</TableCell>
                      <TableCell className="flex justify-center">
                        <Pencil className="h-5 w-5 text-blue-600 hover:text-blue-700 cursor-pointer" />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}