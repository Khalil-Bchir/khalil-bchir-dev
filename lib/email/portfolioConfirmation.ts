/**
 * Portfolio-aligned confirmation email (matches globals.css :root and .dark).
 * Uses table layout + color-scheme for clients that support dark mode in email.
 */

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Light theme (:root) */
const L = {
  bg: "#ffffff",
  fg: "#000000",
  card: "#f7f7f7",
  muted: "#333333",
  border: "#d4d4d4",
  primary: "#8f0c0a",
  primaryFg: "#ffffff",
  accent: "#11e8ac",
  accentFg: "#003326",
} as const;

/** Dark theme (.dark) */
const D = {
  bg: "#000000",
  fg: "#ffffff",
  card: "#111111",
  muted: "#cccccc",
  border: "#262626",
  primary: "#f57471",
  primaryFg: "#000000",
  accent: "#15eeaf",
  accentFg: "#002c22",
} as const;

export function buildConfirmationEmailHtml(
  visitorName: string,
  theirSubject: string,
  noreplyAddress: string
): string {
  const name = escapeHtml(visitorName);
  const subj = escapeHtml(theirSubject);
  const noreply = escapeHtml(noreplyAddress);

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>Message received</title>
  <style type="text/css">
    .pb-wrap { background-color: ${L.bg} !important; color: ${L.fg} !important; }
    .pb-card { background-color: ${L.card} !important; border-color: ${L.border} !important; }
    .pb-muted { color: ${L.muted} !important; }
    .pb-accent { color: ${L.accent} !important; }
    .pb-bar { background-color: ${L.primary} !important; color: ${L.primaryFg} !important; }
    .pb-footer { color: ${L.muted} !important; border-color: ${L.border} !important; }
    .pb-subject { color: ${L.fg} !important; }
    .pb-footer-lead { color: ${L.fg} !important; }
    @media (prefers-color-scheme: dark) {
      .pb-wrap { background-color: ${D.bg} !important; color: ${D.fg} !important; }
      .pb-card { background-color: ${D.card} !important; border-color: ${D.border} !important; }
      .pb-muted { color: ${D.muted} !important; }
      .pb-accent { color: ${D.accent} !important; }
      .pb-bar { background-color: ${D.primary} !important; color: ${D.primaryFg} !important; }
      .pb-footer { color: ${D.muted} !important; border-color: ${D.border} !important; }
      .pb-subject { color: ${D.fg} !important; }
      .pb-footer-lead { color: ${D.fg} !important; }
    }
  </style>
</head>
<body class="pb-wrap" style="margin:0;padding:0;background-color:${L.bg};color:${L.fg};font-family:system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="pb-wrap" style="background-color:${L.bg};color:${L.fg};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;">
          <tr>
            <td class="pb-bar" style="background-color:${L.primary};color:${L.primaryFg};border-radius:12px 12px 0 0;padding:20px 24px;font-size:15px;font-weight:600;letter-spacing:0.02em;">
              Portfolio · Message received
            </td>
          </tr>
          <tr>
            <td class="pb-card" style="background-color:${L.card};border:1px solid ${L.border};border-top:0;border-radius:0 0 12px 12px;padding:28px 24px 24px;">
              <p style="margin:0 0 16px;font-size:17px;line-height:1.45;font-weight:600;">
                Hi ${name},
              </p>
              <p class="pb-muted" style="margin:0 0 16px;font-size:15px;line-height:1.6;color:${L.muted};">
                Thanks for getting in touch. Your message about <strong class="pb-subject" style="font-weight:600;">${subj}</strong> was delivered successfully.
              </p>
              <p class="pb-muted" style="margin:0 0 20px;font-size:15px;line-height:1.6;color:${L.muted};">
                I&apos;ll read it and get back to you as soon as I can.
              </p>
              <p class="pb-accent" style="margin:0;font-size:13px;line-height:1.5;font-weight:600;color:${L.accent};">
                — Khalil
              </p>
            </td>
          </tr>
          <tr>
            <td class="pb-footer" style="padding:20px 8px 0;text-align:center;font-size:12px;line-height:1.55;color:${L.muted};border-top:0;">
              <strong class="pb-footer-lead" style="display:block;margin-bottom:8px;">Do not reply to this email.</strong>
              It was sent automatically from <span style="word-break:break-all;">${noreply}</span>, which is not monitored and cannot receive messages.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildConfirmationEmailText(
  visitorName: string,
  theirSubject: string,
  noreplyAddress: string
): string {
  return `Hi ${visitorName},

Thanks for getting in touch. Your message about "${theirSubject}" was delivered successfully.

I'll read it and get back to you as soon as I can.

— Khalil

---
IMPORTANT: Do not reply to this email.
This message was sent automatically from ${noreplyAddress}, which is not monitored and cannot receive replies. Your note was already delivered to my inbox.
`.trim();
}
