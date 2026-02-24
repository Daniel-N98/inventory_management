import dbConnect from "@/lib/mongodb"
import Roles from "@/models/Roles";
import User from "@/models/User";
import { Role } from "@/types/role";
import { UserType } from "@/types/user"
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

export async function PATCH(request: Request) {
  await dbConnect()

  try {
    const body: { _id: string; role: string } = await request.json();
    const roleFound = await Roles.findOne({ name: body.role }).lean();

    const updated = await User.findByIdAndUpdate(
      body._id,
      { role: roleFound._id },
      { returnDocument: 'after' }
    )

    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      )
    }
    updated.role = roleFound.name;

    return NextResponse.json(
      {
        success: true,
        data: {
          _id: updated._id.toString(),
          name: updated.name,
          email: updated.email,
          role: roleFound.name
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