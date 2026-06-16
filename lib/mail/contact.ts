import nodemailer from "nodemailer";
import type { ContactMessageInput } from "@/lib/validators/contact.validator";

export class EmailConfigurationError extends Error {
  constructor() {
    super("Email configuration is incomplete.");
    this.name = "EmailConfigurationError";
  }
}

function getSmtpConfig() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
  const to = process.env.CONTACT_TO_EMAIL || process.env.EMAIL_TO || user;
  const from = process.env.SMTP_FROM || user;
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  if (!host || !user || !pass || !to || !from) {
    return null;
  }

  return { host, port, user, pass, to, from, secure };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendContactMessage(payload: ContactMessageInput) {
  const config = getSmtpConfig();

  if (!config) {
    throw new EmailConfigurationError();
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  const safeName = escapeHtml(payload.name);
  const safePhone = escapeHtml(payload.phone);
  const safeEmail = escapeHtml(payload.email);
  const safeMessage = escapeHtml(payload.message).replace(/\n/g, "<br />");

  await transporter.sendMail({
    from: config.from,
    to: config.to,
    replyTo: payload.email,
    subject: `رسالة جديدة من ${payload.name} - عوالم البيان`,
    text: [
      `الاسم: ${payload.name}`,
      `الهاتف: ${payload.phone}`,
      `البريد: ${payload.email}`,
      "",
      payload.message,
    ].join("\n"),
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.8;">
        <h2>رسالة جديدة من موقع عوالم البيان</h2>
        <p><strong>الاسم:</strong> ${safeName}</p>
        <p><strong>الهاتف:</strong> ${safePhone}</p>
        <p><strong>البريد:</strong> ${safeEmail}</p>
        <hr />
        <p>${safeMessage}</p>
      </div>
    `,
  });
}
