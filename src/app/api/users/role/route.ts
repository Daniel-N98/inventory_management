import dbConnect from "@/lib/mongodb"
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "@/models/User";
import { NextResponse } from "next/server";
import Roles from "@/models/Roles";

export async function GET() {
  await dbConnect()
  try {
    const session = await getServerSession(authOptions);
    const user = await User.findById(session?.user.id);
    if (!user) {
      return NextResponse.json(
        { success: false },
        { status: 500 }
      )
    }

    const role = await Roles.findById(user.role).lean()

    return NextResponse.json(
      { success: true, data: role.name },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error },
      { status: 500 }
    )
  }
}