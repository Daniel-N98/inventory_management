import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Roles from "@/models/Roles";
import SiteSettings from "@/models/SiteSettings";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function requireAuth(
  siteSetting: string,
  type: string,
  forceRoleRequired?: string,
) {
  const session = await getServerSession(authOptions);
  /*
    - Get the corresponding site setting role
    - Compare
  */

  if (!session) {
    return NextResponse.json(
      { success: false, error: "Not authenticated" }
    );
  }
  const user = await User.findOne({ _id: session.user.id }).lean();
  if (!user) {
    return NextResponse.json(
      { success: false, error: "Not authenticated" }
    );
  }

  if (user.superUser) return session;
  const userRole = await Roles.findOne({ _id: user.role }).lean();

  const siteSettingRow = forceRoleRequired ? null : await SiteSettings.findOne({ name: siteSetting });
  let role;
  if (siteSettingRow) {
    role = await Roles.findById(siteSettingRow[type]);
  } else {
    role = await Roles.findOne({ name: forceRoleRequired });
  }

  if (!user || (role && userRole.permission_level < role.permission_level)) {
    return NextResponse.json(
      { success: false, error: "No access." }
    );
  }

  return session;
}