import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PATCH(request: Request) {
  await dbConnect()

  try {
    const body: { _id: string; name?: string, current?: string, newPassword?: string, confirm?: string } = await request.json();
    const userRes = await User.findById(body._id);
    if (!userRes) return NextResponse.json({ success: false, error: "No user found." });
    const session = await getServerSession(authOptions);
    if (session?.user.id !== body._id) {
      return NextResponse.json(
        { success: false, error: "You cannot update another account." }
      );
    }
    if (body.name) {
      userRes.name = body.name;
    } else {
      const { current, newPassword, confirm } = body;
      if (!current || !newPassword || !confirm) {
        return NextResponse.json(
          { success: false, error: "Missing required fields." }
        );
      }
      if (current === newPassword) {
        return NextResponse.json(
          { success: false, error: "New password is the same as the current password." }
        );
      }
      if (newPassword !== confirm) {
        return NextResponse.json(
          { success: false, error: "New passwords do not match." }
        );
      }

      const currentFromDB = userRes.password;
      const comparedResult = await bcrypt.compare(current, currentFromDB);
      if (!comparedResult) {
        return NextResponse.json(
          { success: false, error: "Current password does not match." }
        );
      }

      const newPasswordHashed = await bcrypt.hash(newPassword, 12);
      userRes.password = newPasswordHashed;
    }

    await userRes.save();

    return NextResponse.json(
      {
        success: true,
        data: userRes
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