"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { Home, Package, ListChecks, Settings, Users, Shield } from "lucide-react";

export default function SideNav() {
  const navItems = [
    { label: "Dashboard", icon: <Home className="h-4 w-4" />, href: "/dashboard" },
    { label: "Inventory", icon: <Package className="h-4 w-4" />, href: "/dashboard/inventory" },
    { label: "Categories", icon: <ListChecks className="h-4 w-4" />, href: "/dashboard/categories" },
    { label: "Roles", icon: <Shield className="h-4 w-4" />, href: "/dashboard/roles" },
    { label: "Team Members", icon: <Users className="h-4 w-4" />, href: "/dashboard/team-members" },
  ];

  return (
    <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-8 text-zinc-900 dark:text-zinc-50">InvManager</h2>
      <nav className="flex flex-col justify-between h-full">
        <div className="flex flex-row md:flex-col gap-2 md:gap-3 overflow-x-auto md:overflow-visible">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className="group flex items-center gap-2 justify-center md:justify-start text-zinc-800 dark:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-700 w-full"
              asChild
            >
              <a href={item.href} className="flex items-center gap-2 w-full">
                {item.icon}
                <span className="hidden md:inline">{item.label}</span>
              </a>
            </Button>
          ))}
        </div>
        <div className="space-y-4">
          <Button
            variant="ghost"
            className="group flex items-center gap-2 justify-center md:justify-start text-zinc-800 dark:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-700 w-full"
            asChild
          >
            <a href={"/dashboard/settings"} className="flex items-center gap-2 w-full">
              <Settings className="h-4 w-4" />
              <span className="hidden md:inline">Settings</span>
            </a>
          </Button>
          <Button onClick={() => signOut()} className="w-full">Sign out</Button>
        </div>
      </nav>
    </aside>
  );
}