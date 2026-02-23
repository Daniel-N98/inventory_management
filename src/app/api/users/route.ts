import dbConnect from "@/lib/mongodb"
import User from "@/models/User";
import { UserType } from "@/types/User"
import { NextResponse } from "next/server"

export async function GET() {
  await dbConnect();

  try {
    const users = await User.find({}).lean();

    const formatted: UserType[] = users.map((user: UserType) => ({
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
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