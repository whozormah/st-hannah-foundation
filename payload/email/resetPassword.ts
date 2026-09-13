import type { PayloadRequest } from "payload";

/* The password-reset email for staff. Plain English, the Foundation's
   colours, and one clear button — HTML email is rendered by the oldest
   engines still in use, so this uses tables and inline styles only. */

/** How long a reset link works: one hour. */
export const RESET_LINK_LIFETIME_MS = 60 * 60 * 1000;

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

function siteURL(req?: PayloadRequest) {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

  if (configured) return configured;

  // Local development without a configured address: use the request's own.
  const host = req?.headers.get("host");

  return host ? `http://${host}` : "";
}

export const resetEmailSubject = () =>
  "Reset your St. Hannah Foundation admin password";

/* Payload passes these as optional, so they are typed that way here. */
type ResetEmailArgs = { req?: PayloadRequest; token?: string; user?: unknown };

export const resetEmailHTML = ({ req, token, user }: ResetEmailArgs = {}) => {
  // Payload always supplies a token; without one there is no link to send.
  if (!token) throw new Error("Password reset email requested without a token.");

  const link = `${siteURL(req)}/admin/reset/${encodeURIComponent(token)}`;
  const rawName = (user as { name?: unknown } | undefined)?.name;
  const name = typeof rawName === "string" ? rawName : "";
  const greeting = name ? `Hello ${escapeHtml(name)},` : "Hello,";

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#faf7f2;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf7f2;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:16px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;color:#1b1815;">
            <tr>
              <td style="background:#844204;padding:24px 32px;">
                <p style="margin:0;font-size:18px;font-weight:bold;color:#fffcf7;">St. Hannah Foundation</p>
                <p style="margin:4px 0 0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#f5d27a;">Foundation Admin</p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 16px;font-size:16px;line-height:1.6;">${greeting}</p>
                <p style="margin:0 0 24px;font-size:16px;line-height:1.6;">Someone asked to reset the password for your St. Hannah Foundation admin account. Use the button below to choose a new one.</p>
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="border-radius:10px;background:#844204;">
                      <a href="${link}" style="display:inline-block;padding:14px 28px;font-size:16px;font-weight:bold;color:#fffcf7;text-decoration:none;border-radius:10px;">Choose a new password</a>
                    </td>
                  </tr>
                </table>
                <p style="margin:24px 0 0;font-size:14px;line-height:1.6;color:#5f5444;">This link works for one hour. If the button does not work, copy this address into your browser:<br><a href="${link}" style="color:#844204;word-break:break-all;">${link}</a></p>
                <p style="margin:16px 0 0;font-size:14px;line-height:1.6;color:#5f5444;">If you did not ask for this, you can ignore this email — your password will not change.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};
