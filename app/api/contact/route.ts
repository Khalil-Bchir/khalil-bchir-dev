import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  buildConfirmationEmailHtml,
  buildConfirmationEmailText,
  escapeHtml,
} from "@/lib/email/portfolioConfirmation";

export const runtime = "nodejs";

const LIMITS = { name: 120, email: 254, subject: 200, message: 8000 } as const;

function trim(s: unknown, max: number): string {
  return String(s ?? "")
    .trim()
    .slice(0, max);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const name = trim(b.name, LIMITS.name);
  const email = trim(b.email, LIMITS.email);
  const subject = trim(b.subject, LIMITS.subject);
  const message = trim(b.message, LIMITS.message);

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const host = process.env.BREVO_SMTP_HOST ?? "smtp-relay.brevo.com";
  const port = Number(process.env.BREVO_SMTP_PORT ?? 587);
  const user = process.env.BREVO_SMTP_USER;
  const pass = process.env.BREVO_SMTP_PASS;
  const from = process.env.CONTACT_FROM_EMAIL ?? "portfolio@khalilbchir.pro";
  const noreplyFrom = process.env.CONTACT_NOREPLY_EMAIL ?? "noreply@khalilbchir.pro";
  const to = process.env.CONTACT_TO_EMAIL ?? "khalil.bchir@proton.me";

  if (!user || !pass) {
    console.error("contact: missing BREVO_SMTP_USER or BREVO_SMTP_PASS");
    return NextResponse.json({ error: "Email is not configured." }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const ownerHtml = `
<p><strong>Name:</strong> ${escapeHtml(name)}</p>
<p><strong>Reply-to:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
<hr />
<p style="white-space:pre-wrap">${escapeHtml(message)}</p>
`.trim();

  const ownerText = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`;

  try {
    await transporter.sendMail({
      from: `"Portfolio" <${from}>`,
      to,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: ownerText,
      html: ownerHtml,
    });
  } catch (err) {
    console.error("contact: sendMail (owner) failed", err);
    return NextResponse.json({ error: "Could not send message. Try again later." }, { status: 502 });
  }

  try {
    await transporter.sendMail({
      from: `"Khalil Bchir" <${noreplyFrom}>`,
      to: email,
      subject: "We received your message — I'll be in touch soon",
      text: buildConfirmationEmailText(name, subject, noreplyFrom),
      html: buildConfirmationEmailHtml(name, subject, noreplyFrom),
    });
  } catch (err) {
    console.error("contact: sendMail (confirmation to visitor) failed", err);
    // Inbox delivery already succeeded; don’t fail the form for autoreply issues
  }

  return NextResponse.json({ ok: true });
}
