import dbConnect from "@/lib/mongodb";
import { requireAuth } from "@/lib/requireAuth";
import Roles from "@/models/Roles";
import SiteSettings from "@/models/SiteSettings";
import { FormattedSiteSettings } from "@/types/site-settings";
import { NextResponse } from "next/server";

const SITE_SETTINGS_NAME_MAPPINGS: any = {
  "site-settings": "Site Settings",
  "inventory-items": "Inventory Items",
  "categories": "Categories",
  "roles": "Roles",
  "team-members": "Team Members"
}

export async function GET() {
  await dbConnect()

  try {
    const siteSettings = await SiteSettings.find({}).lean();
    const roles = await Roles.find({}).lean();
    
    const formatted: FormattedSiteSettings[] = siteSettings.reduce((acc, siteSetting) => {
      const name = SITE_SETTINGS_NAME_MAPPINGS[siteSetting.name];
      acc[name] = {
        editRole: roles.find(r => r._id.toString() === siteSetting.editRole?.toString())?.name || null,
        createRole: roles.find(r => r._id.toString() === siteSetting.createRole?.toString())?.name || null,
        inviteRole: roles.find(r => r._id.toString() === siteSetting.inviteRole?.toString())?.name || null,
      };
      return acc;
    }, {} as Record<string, { editRole: string | null, createRole: string | null, inviteRole: string | null }>);
    
    return NextResponse.json(
      { success: true, data: formatted },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  await dbConnect()
  // Check user authentication
  const auth = await requireAuth("site-settings", "editRole");
  if (!(auth && "user" in auth)) return auth as NextResponse;

  try {
    const body: { type: string, editRole: string, createRole: string, inviteRole?: string } = await request.json();

    const siteSettings = await SiteSettings.findOne({ name: body.type });

    let editSuccess = false;
    let createSuccess = false;
    let inviteSuccess = false;

    if (body.editRole && body.editRole.length > 0) {
      const editRoleFound = await Roles.findOne({ name: body.editRole });
      if (editRoleFound) {
        siteSettings.editRole = editRoleFound._id;
        editSuccess = true;
      }
    }
    if (body.createRole && body.createRole.length > 0) {
      const createRoleFound = await Roles.findOne({ name: body.createRole });
      if (createRoleFound) {
        siteSettings.createRole = createRoleFound._id;
        createSuccess = true;
      }
    }
    if (body.inviteRole && body.inviteRole.length > 0) {
      const inviteRoleFound = await Roles.findOne({ name: body.inviteRole });
      if (inviteRoleFound) {
        siteSettings.inviteRole = inviteRoleFound._id;
        inviteSuccess = true;
      }
    }
    await siteSettings.save();

    return NextResponse.json(
      {
        success: true,
        data: {
          editSuccess,
          createSuccess,
          inviteSuccess,
        }
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error },
      { status: 400 }
    )
  }
}