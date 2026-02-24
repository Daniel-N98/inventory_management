import { sendResendEmail } from "@/lib/resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

  try {
    const body = await request.json();
    const { to, subject, content, html, replyTo } = body;

    const data = await sendResendEmail({ to, subject, content, html, replyTo });
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