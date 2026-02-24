"use client";

import { InventoryOverview } from "@/components/ui/dashboard/inventory-overview";
import { Stats } from "@/components/ui/dashboard/stats";
import { SystemOverview } from "@/components/ui/dashboard/system-overview";
import { fetchDashboardData } from "@/lib/api/dashboard.api";
import { DashboardData } from "@/types/dashboard";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData>({ users: [], inventoryItems: [], categories: [], roles: [] });

  useEffect(() => {
    async function loadDashboardData() {
      const dashboardResponse: DashboardData | null = await fetchDashboardData();
      if (dashboardResponse === null) return;
      setDashboardData(dashboardResponse);
    }
    loadDashboardData();
  }, []);

  return (
    <main className="flex-1 p-6 space-y-6">
      {/* Page title */}
      <div>
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
          Dashboard
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Overview of your inventory system
        </p>
      </div>

      {/* Stats */}
      <Stats dashboardData={dashboardData} />

      {/* Main sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Inventory summary */}
        <InventoryOverview inventory_items={dashboardData.inventoryItems} categories={dashboardData.categories}/>

        {/* Admin / system */}
        <SystemOverview users={dashboardData.users} />
      </div>
    </main>
  );
}