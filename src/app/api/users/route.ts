import dbConnect from "@/lib/mongodb"
import Roles from "@/models/Roles";
import User from "@/models/User";
import { Role } from "@/types/role";
import { UserType } from "@/types/User"
import { NextResponse } from "next/server"

export async function GET() {
  await dbConnect();

  try {
    const users = await User.find({}).lean();
    const roles = await Roles.find({}).lean();
    
    const formatted: UserType[] = users.map((user: UserType) => ({
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: roles.find((role: Role) => role._id.toString() === user.role.toString()).name, // Map role._id to role name
    }));

    return NextResponse.json(
      { success: true, data: formatted },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error },
      { status: 500 }
    );
  }
}