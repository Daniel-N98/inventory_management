import dbConnect from "@/lib/mongodb";
import Invitation from "@/models/Invitation";
import crypto from "crypto";
import { requireAuth } from "@/lib/requireAuth";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getInvitationEmailHTML, sendResendEmail } from "@/lib/resend";
import { ResendEmail } from "@/types/resend";

export async function POST(request: Request) {
  await dbConnect()
  // Check user authentication
  const auth = await requireAuth("Admin");
  if (!(auth && "user" in auth)) return auth as NextResponse;

  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.name) return NextResponse.json({ success: false, data: false });
    const body = await request.json();
    const { name, email, role } = body;

    const invitationToken: string = crypto.randomBytes(32).toString("hex");
    const invitationAcceptLink: string = `${process.env.NEXT_PUBLIC_APP_URL}/invited?token=${invitationToken}`;

    const result = await Invitation.create({ name, email, role, invitationToken, invitedBy: session?.user?.id });
    if (result) {
      // Send invite link.
      const html = getInvitationEmailHTML(name, session?.user?.name, invitationAcceptLink).trim();
      const subject = "You have been invited to join InvManager.".trim();
      const content = `Please accept the invitation by clicking this link: ${invitationAcceptLink}`.trim();
      const replyTo = "no_reply@danielmails.com".trim();

      const resendEmail: ResendEmail = { to: email, html, subject, content, replyTo };

      const data = await sendResendEmail(resendEmail);

      return NextResponse.json(
        { success: true, data: true },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { success: false, data: false },
      );

    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error },
      { status: 400 }
    )
  }
}