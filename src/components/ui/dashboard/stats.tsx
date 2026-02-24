import { Layers, Package, Shield, Users } from "lucide-react";
import { DashboardData } from "@/types/dashboard";
import { StatCard } from "./stat-card";

interface StatsProps {
  dashboardData: DashboardData,
}

export function Stats({ dashboardData }: StatsProps) {

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Inventory Items"
        value={dashboardData.inventoryItems.length + ""}
        icon={<Package className="h-5 w-5" />}
      />
      <StatCard
        title="Categories"
        value={dashboardData.categories.length + ""}
        icon={<Layers className="h-5 w-5" />}
      />
      <StatCard
        title="Users"
        value={dashboardData.users.length + ""}
        icon={<Users className="h-5 w-5" />}
      />
      <StatCard
        title="Roles"
        value={dashboardData.roles.length + ""}
        icon={<Shield className="h-5 w-5" />}
      />
    </div>
  )
}