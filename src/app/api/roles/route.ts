import dbConnect from "@/lib/mongodb"
import { requireAuth } from "@/lib/requireAuth"
import Roles from "@/models/Roles"
import { Role } from "@/types/role"
import { NextResponse } from "next/server"

export async function GET() {
  await dbConnect()

  try {
    const roles = await Roles.find({}).lean()

    const formatted: Role[] = roles.map((role: Role) => ({
      _id: role._id.toString(),
      name: role.name,
      permission_level: role.permission_level
    }))

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

export async function POST(request: Request) {
  await dbConnect()
  // Check user authentication
  const auth = await requireAuth("Editor");
  if (!(auth && "user" in auth)) return auth as NextResponse;

  try {
    const body = await request.json();
    const { name, permission_level } = body;
    const role = await Roles.create({ name, permission_level });

    const formattedItem = {
      ...role.toObject()
    };

    return NextResponse.json(
      { success: true, data: formattedItem },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error },
      { status: 400 }
    )
  }
}