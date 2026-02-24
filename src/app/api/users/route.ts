import dbConnect from "@/lib/mongodb"
import { requireAuth } from "@/lib/requireAuth";
import Roles from "@/models/Roles";
import User from "@/models/User";
import { Role } from "@/types/role";
import { UserType } from "@/types/user"
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route";

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
      verified: user.verified,
      superUser: user.superUser,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
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
  // Check user authentication
  const auth = await requireAuth("Editor");
  if (!(auth && "user" in auth)) return auth as NextResponse;

  try {
    const body: { _id: string; role: string } = await request.json();
    const session = await getServerSession(authOptions);
    const currentUser = await User.findById(session?.user.id).lean();
    if (session?.user.id === body._id && currentUser.superUser === false) {
      return NextResponse.json(
        { success: false, error: "You cannot edit your own role." }
      );
    }
    const roleFound = await Roles.findOne({ name: body.role }).lean();
    const auth = await requireAuth(body.role); // User cannot update a user's role beyond their current role.
    if (!(auth && "user" in auth)) return auth as NextResponse;

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

export async function DELETE(request: Request) {
  await dbConnect()
  // Check user authentication
  const auth = await requireAuth("Admin");
  if (!(auth && "user" in auth)) return auth as NextResponse;

  try {
    const { _id }: { _id: string } = await request.json()
    const session = await getServerSession(authOptions);
    if (session?.user.id === _id) {
      return NextResponse.json(
        { success: false, error: "You cannot delete your own account." }
      );
    }
    const deleted = await User.findByIdAndDelete(_id)

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: true, data: { _id } },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error },
      { status: 400 }
    )
  }
}