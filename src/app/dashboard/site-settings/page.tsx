"use client";

import LoadingIcon from "@/components/ui/loadingIcon";
import CategoriesSection from "@/components/ui/site-settings/category-section";
import InventorySection from "@/components/ui/site-settings/inventory-section";
import RolesSection from "@/components/ui/site-settings/roles-section";
import SiteSettingsSection from "@/components/ui/site-settings/site-settings-section";
import TeamMemberSection from "@/components/ui/site-settings/team-member-section";
import { fetchSiteSettings } from "@/lib/api/site-settings.api";
import { fetchRoles } from "@/lib/api/users.api";
import { Role } from "@/types/role";
import { FormattedSiteSettings } from "@/types/site-settings";
import { useEffect, useState } from "react";

export default function SiteSettings() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [siteSettings, setSiteSettings] = useState<FormattedSiteSettings>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      const rolesResponse = await fetchRoles();
      const siteSettingResponse: FormattedSiteSettings | null = await fetchSiteSettings();
      setRoles(rolesResponse);
      if (siteSettingResponse) setSiteSettings(siteSettingResponse);
      console.log(siteSettingResponse);
      
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen w-full bg-zinc-50 p-6 dark:bg-zinc-950 md:p-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Site Settings
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Manage permissions and access levels across your organization.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {!loading ?
          <>
            {/* Categories */}
            <CategoriesSection roles={roles} currentRoles={siteSettings?.["Categories"]} />

            {/* Inventory Items */}
            <InventorySection roles={roles} currentRoles={siteSettings?.["Inventory Items"]} />

            {/* Team Members */}
            <TeamMemberSection roles={roles} currentRoles={siteSettings?.["Team Members"]} />

            {/* Roles */}
            <RolesSection roles={roles} currentRoles={siteSettings?.["Roles"]} />

            {/* Site Settings */}
            <SiteSettingsSection roles={roles} currentRoles={siteSettings?.["Site Settings"]} />
          </>
          : <LoadingIcon /> }
      </div>
    </div>
  );
}