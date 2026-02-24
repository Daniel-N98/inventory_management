import { Card, CardContent } from "../card";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}
export function StatCard({ title, value, icon, }: StatCardProps) {

  return (
    <Card className="bg-white dark:bg-zinc-800">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{title}</p>
          <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            {value}
          </p>
        </div>
        <div className="text-zinc-400 dark:text-zinc-500">{icon}</div>
      </CardContent>
    </Card>
  )
}