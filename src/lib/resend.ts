import { ResendEmail } from "@/types/resend";
import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
if (!RESEND_API_KEY) {
  throw new Error("Please set the RESEND_API_KEY.");
}

const resendClient = new Resend(process.env.RESEND_API_KEY);

export async function sendResendEmail({ to, subject, content, html, replyTo }: ResendEmail) {
  const { data, error } = await resendClient.emails.send({ from: "InvManager@danielmails.com", to, subject, text: content, html, replyTo: "NoReply@danielmails.com" });

  if (error) {
    console.error("Could not send email:", error.message);
    return;
  }
  console.log("Email sent to: ", to);
  
  console.log(data);
  return data;
}

export function getVerificationEmailHTML(name: string, verificationLink: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
  </head>
  <body style="margin:0; padding:0; font-family: 'Arial', sans-serif; background-color: #f9fafb;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
            
            <!-- Header -->
            <tr>
              <td style="background-color: #1d4ed8; color: #ffffff; text-align: center; padding: 24px;">
                <h1 style="margin: 0; font-size: 24px;">Verify Your Email</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 24px; color: #111827;">
                <p style="font-size: 16px; margin-bottom: 24px;">Hi ${name},</p>
                <p style="font-size: 16px; margin-bottom: 24px;">
                  Thank you for creating an account with InvManager! Please verify your email address by clicking the button below:
                </p>

                <p style="text-align: center; margin-bottom: 24px;">
                  <a href="${verificationLink}" 
                     style="background-color: #1d4ed8; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; display: inline-block;">
                     Verify Email
                  </a>
                </p>

                <p style="font-size: 14px; color: #6b7280;">
                  If you did not create an account, you can safely ignore this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #f3f4f6; padding: 16px; text-align: center; font-size: 12px; color: #6b7280;">
                &copy; 2026 InvManager. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}