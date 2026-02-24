import { getVerificationEmailHTML, sendResendEmail } from "@/lib/resend";
import { ResendEmail, ResendVerificationEmail } from "@/types/resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

  try {
    const body = await request.json();
    const { to, name, verificationLink }: ResendVerificationEmail = body;
    
    const html = getVerificationEmailHTML(name, verificationLink).trim();
    const subject = "Verify your email.".trim();
    const content = `Please verify your email by clicking this link: ${verificationLink}`.trim();
    const replyTo = "no_reply@danielmails.com".trim();

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