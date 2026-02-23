"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface TeamMember {
  id: number,
  name: string,
  email: string,
  permission_level: string
}

export default function TeamMembers() {
  const teamMembers: TeamMember[] = [
    { id: 1, name: "John Doe", email: "JohnDoe@gmail.com", permission_level: "Employee" },
    { id: 2, name: "Paul Mayer", email: "PaulMay12@hotmail.com", permission_level: "Employee" },
    { id: 3, name: "Susan Wischo", email: "SW99917@hotmail.com", permission_level: "Admin" },
    { id: 4, name: "Jackson Forth", email: "JackoFor@gmail.com", permission_level: "Editor" },
  ];

  const [filtered, setFiltered] = useState<TeamMember[] | null>(teamMembers);

  function updateFiltered(e: React.ChangeEvent<HTMLInputElement>) {
    setFiltered(
      e.target.value.length === 0
        ? teamMembers
        : teamMembers.filter(
          (item: TeamMember) =>
            item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            item.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
            item.permission_level.toLowerCase().includes(e.target.value.toLowerCase())
        )
    );
  }

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
          onChange={(e) => updateFiltered(e)}
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
                  <TableHead className="w-48">Permission Level</TableHead>
                  <TableHead className="w-16 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered &&
                  filtered.map((item, idx) => (
                    <TableRow
                      key={item.id}
                      className={`${idx % 2 === 0 ? "bg-zinc-50 dark:bg-zinc-900" : "bg-white dark:bg-zinc-800"
                        } hover:bg-zinc-200 dark:hover:bg-zinc-700`}
                    >
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.permission_level}</TableCell>
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