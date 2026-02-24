import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  const { name, email, password, role = "699cd39cb37779ad96ab9654" } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await dbConnect();

  // check if user exists
  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  // hash password with bcrypt
  const hashedPassword = await bcrypt.hash(password, 12);
  const result = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "699cd39cb37779ad96ab9654", // default role
  });

  return NextResponse.json({ message: "User registered", id: result.insertedId });
}