import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    if (!token) return NextResponse.json({ success: false, data: false }); // No token has been found.

    const user = await User.findOne({ verificationToken: token });
    if (!user) return NextResponse.json({ success: false, data: false }); // No user has been found.

    const verified = user.verified;
    if (verified === true) {
      return NextResponse.json(
        { success: true, data: "Verified." },
        { status: 200 }
      );
    }

    const verificationToken = user.verificationToken;
    if (!verificationToken || verificationToken !== token) return NextResponse.json({ success: false }); // No token has been found, or no match found.
    
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    return NextResponse.json(
      { success: true, data: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error, data: false },
      { status: 500 }
    );
  }
}
