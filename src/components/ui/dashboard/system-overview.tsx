import { UserType } from "@/types/user";
import { Card, CardContent, CardHeader, CardTitle } from "../card";

interface SystemOverviewProps {
  users: UserType[],
}

export function SystemOverview({ users }: SystemOverviewProps) {

  const adminUsers: UserType[] = users.filter((user: UserType) => user.role === "Admin");
  const employeeUsers: UserType[] = users.filter((user: UserType) => user.role === "Employee");
  const latestUser: UserType | null = users.length > 0 ? [...users].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0] : null;
  const latestUserEdited: UserType | null = users.length > 0 ? [...users].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0] : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
        <p>• Admin users: <strong>{adminUsers.length}</strong></p>
        <p>• Employees: <strong>{employeeUsers.length}</strong></p>
        <p>• Last user added: <strong>{latestUser ? latestUser.name : "No user found"}</strong></p>
        <p>• Last user edited: <strong>{latestUserEdited ? latestUserEdited.name : "No user found"}</strong></p>
      </CardContent>
    </Card>
  )
}
