import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserType } from "@/types/user";
import { EditTeamMemberDialog } from "./editTeamMemberDialog";
import LoadingIcon from "../loadingIcon";
import { Check, X } from "lucide-react";

interface TeamMemberTablePropd {
  filtered: UserType[] | null,
  setUsers: React.Dispatch<React.SetStateAction<UserType[]>>
}
export default function TeamMemberTable({ filtered, setUsers }: TeamMemberTablePropd) {

  return (
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
                <TableHead className="w-48">Verified</TableHead>
                <TableHead className="w-16 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered ?
                filtered.map((item: UserType, idx: number) => (
                  <TableRow
                    key={item._id}
                    className={`${idx % 2 === 0 ? "bg-zinc-50 dark:bg-zinc-900" : "bg-white dark:bg-zinc-800"
                      } hover:bg-zinc-200 dark:hover:bg-zinc-700`}
                  >
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{item.name + " " + (item.superUser === true ? "*" : "")}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.role}</TableCell>
                    <TableCell>{item.verified === true ? <Check className="text-green-500"/> : <X className="text-red-500"/>}</TableCell>
                    {/* Only display edit symbol if this user is not the superUser. */}
                    <TableCell className="flex justify-center">
                      {!item.superUser &&
                        <EditTeamMemberDialog user={item} setUsers={setUsers} />
                      }
                    </TableCell>
                  </TableRow>
                )) : <TableRow><TableCell><LoadingIcon /></TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}