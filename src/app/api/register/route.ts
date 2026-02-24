import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";
import Roles from "@/models/Roles";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await dbConnect();

  // check if user exists
  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "User already exists" });
  }

  const allUsers = await User.find({}).lean();
  let roles = await Roles.find({}).lean();
  let roleToSet;

  // Ensure at least one role exists
  if (roles.length === 0) {
    roleToSet = await Roles.create({ name: "default", permission_level: 0 });
    roles = [roleToSet];
  }

  const existingUsers = allUsers.length > 0;

  if (!existingUsers) {
    // No users yet -> assign highest permission role
    roleToSet = roles.reduce((max, r) => r.permission_level > max.permission_level ? r : max, roles[0]);
  } else {
    // There are users -> assign lowest permission role
    roleToSet = roles.reduce((min, r) => r.permission_level < min.permission_level ? r : min, roles[0]);
  }

  // hash password with bcrypt
  const hashedPassword = await bcrypt.hash(password, 12);
  const result = await User.create({
    name,
    email,
    password: hashedPassword,
    superUser: !existingUsers, // Super user is for the first signed up user. Allows complete permissions over everything.
    role: roleToSet._id, // default role
  });

  return NextResponse.json({ message: "User registered", id: result.insertedId });
}