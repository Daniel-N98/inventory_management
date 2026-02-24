import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const user = await User.findOne({ email }).lean();
    const verified: boolean = user.verified;

    return NextResponse.json(
      { success: true, data: verified },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error, data: false },
      { status: 500 }
    );
  }
}