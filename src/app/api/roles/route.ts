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
  const auth = await requireAuth("roles", "createRole");
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

export async function PATCH(request: Request) {
  await dbConnect()
  // Check user authentication
  const auth = await requireAuth("roles", "editRole");
  if (!(auth && "user" in auth)) return auth as NextResponse;

  try {
    const body: { _id: string; name: string, permission_level: number } = await request.json();
    const updated = await Roles.findByIdAndUpdate(
      body._id,
      { name: body.name, permission_level: body.permission_level },
      { returnDocument: 'after' }
    )

    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Role not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      {
        success: true,
        data: {
          _id: updated._id.toString(),
          name: updated.name,
          permission_level: updated.permission_level,
        },
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