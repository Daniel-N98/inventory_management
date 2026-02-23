import dbConnect from "@/lib/mongodb"
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