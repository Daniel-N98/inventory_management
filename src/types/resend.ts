export type ResendEmail = {
  to: string,
  subject: string,
  content: string,
  html: string,
  replyTo?: string
}

export type ResendVerificationEmail = {
  to: string;
  name: string;
}