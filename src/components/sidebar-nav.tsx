"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { Home, Package, ListChecks, Settings, Users, Shield, UserRoundPen } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchUserRole } from "@/lib/api/users.api";
import { useNavBar } from "@/app/context/NavBarHook";


export default function SideNav() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const { contextValue, setContextValue } = useNavBar();

  const navItems = [
    { label: "Dashboard", icon: <Home className="h-4 w-4" />, href: "/dashboard" },
    { label: "Inventory", icon: <Package className="h-4 w-4" />, href: "/dashboard/inventory" },
    { label: "Categories", icon: <ListChecks className="h-4 w-4" />, href: "/dashboard/categories" },
    { label: "Roles", icon: <Shield className="h-4 w-4" />, href: "/dashboard/roles" },
    { label: "Team Members", icon: <Users className="h-4 w-4" />, href: "/dashboard/team-members" },
  ];

  useEffect(() => {
    async function loadUser() {
      const userRes = await fetchUserRole();
      setUserRole(userRes ? userRes : "Unknown");
      setContextValue({ userRole: userRes ?? "Unknown" })
    }
    loadUser();
  }, []);

  return (
    <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-6 flex flex-col">
      <div className="flex flex-col mb-8 space-y-1 items-center md:items-start">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">InvManager</h2>
        <div className="mt-1.5 flex items-center">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <p className="px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 rounded-md shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            {contextValue?.userRole || "Unknown"}
          </p>
        </div>
      </div>
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
          <div className="flex md:flex-col justify-center md:justify-start md:items-start w-max md:w-full m-auto md:m-0 md:mb-4">
            <Button
              variant="ghost"
              className="group flex items-center gap-2 justify-center md:justify-start text-zinc-800 dark:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-700 w-full"
              asChild
            >
              <a href={"/dashboard/account-settings"} className="flex items-center gap-2 w-full">
                <UserRoundPen className="h-4 w-4" />
                <span className="hidden md:inline">Account settings</span>
              </a>
            </Button>
            <Button
              variant="ghost"
              className="group flex items-center gap-2 justify-center md:justify-start text-zinc-800 dark:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-700 w-full"
              asChild
            >
              <a href={"/dashboard/site-settings"} className="flex items-center gap-2 w-full">
                <Settings className="h-4 w-4" />
                <span className="hidden md:inline">Site settings</span>
              </a>
            </Button>
          </div>
          <Button onClick={() => signOut()} className="w-full">Sign out</Button>
        </div>
      </nav>
    </aside>
  );
}