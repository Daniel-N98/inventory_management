import { Card, CardContent, CardHeader, CardTitle } from "../card";

interface InventoryCardProps {
  title: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}
export default function InventoryCard({ title, onSubmit, children }: InventoryCardProps) {

  return (
    <Card className="flex flex-col bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <CardHeader>
        <CardTitle className="text-zinc-900 dark:text-zinc-50">{title}</CardTitle>
      </CardHeader>
      <form onSubmit={onSubmit} className="flex flex-1 flex-col">
        <CardContent className="flex flex-1 flex-col justify-between space-y-6">
          {children}
        </CardContent>
      </form>
    </Card>
  )
}