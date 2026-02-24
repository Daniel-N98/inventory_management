import { UserType } from "@/types/user";
import { Card, CardContent, CardHeader, CardTitle } from "../card";

interface SystemOverviewProps {
  users: UserType[],
}

export function SystemOverview({ users }: SystemOverviewProps) {

  const adminUsers: UserType[] = users.filter((user: UserType) => user.role === "Admin");
  const employeeUsers: UserType[] = users.filter((user: UserType) => user.role === "Employee");
  // TODO: Find latest user update.

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
        <p>• Admin users: <strong>{adminUsers.length}</strong></p>
        <p>• Employees: <strong>{employeeUsers.length}</strong></p>
        <p>• Last user added: <strong>Today</strong></p>
      </CardContent>
    </Card>
  )
}
