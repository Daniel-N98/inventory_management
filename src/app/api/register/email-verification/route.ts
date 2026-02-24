import { getVerificationEmailHTML, sendResendEmail } from "@/lib/resend";
import { ResendEmail, ResendVerificationEmail } from "@/types/resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

  try {
    const body = await request.json();
    const { to, name }: ResendVerificationEmail = body;

    const html = getVerificationEmailHTML(name, "https://localhost:3000/verify?token=abcdefg")
    const subject = "Verify your email.";
    const content = "Please verify your email by clicking this link: https://localhost:3000/verify?token=abcdefg";
    const replyTo = "noReply@danielmails.com";

    const email: ResendEmail = { to, html, subject, content, replyTo };

    const data = await sendResendEmail(email);
    return NextResponse.json(
      { success: true, data },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error },
      { status: 400 }
    )
  }
}