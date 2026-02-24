import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Roles from "@/models/Roles";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function requireAuth(
  requiredRole?: string
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { success: false, error: "Not authenticated" }
    );
  }
    const role = await Roles.findOne({ name: requiredRole }).lean();

  if (requiredRole && session.user?.role !== role._id.toString()) {
    return NextResponse.json(
      { success: false, error: "No access." }
    );
  }

  return session;
}