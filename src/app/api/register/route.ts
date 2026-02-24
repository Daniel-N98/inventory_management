import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";
import Roles from "@/models/Roles";
import crypto from "crypto";
import apiClient from "@/lib/api";

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
    roleToSet = await Roles.create({ name: "Default", permission_level: 0 });
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
  const verificationToken: string = crypto.randomBytes(32).toString("hex");
  const verificationLink: string = `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${verificationToken}`;
  let superRole;
  try {
    superRole = await Roles.create({ name: "Super", permission_level: 100 }); // Create super role if not already exists.
  } catch (error) { };

  const result = await User.create({
    name,
    email,
    password: hashedPassword,
    verified: false,
    verificationToken,
    superUser: !existingUsers, // Super user is for the first signed up user. Allows complete permissions over everything.
    role: (!existingUsers && superRole) ? superRole._id : roleToSet._id, // SuperUser role if no users, otherwise default.
  });
  await apiClient.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/email-verification`, { to: email, name, verificationLink });
  return NextResponse.json({ message: "User registered", id: result.insertedId });
}