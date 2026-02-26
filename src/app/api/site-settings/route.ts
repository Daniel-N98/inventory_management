import dbConnect from "@/lib/mongodb";
import { requireAuth } from "@/lib/requireAuth";
import Roles from "@/models/Roles";
import SiteSettings from "@/models/SiteSettings";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  await dbConnect()
  // Check user authentication
  const auth = await requireAuth("Editor");
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