"use server";

import { site } from "@/content/site";

export type ContactState = {
  status: "idle" | "sent" | "error";
  /** Shown to the visitor on error. */
  message?: string;
  /** What they typed, handed back on error so the form keeps it (React resets forms after an action). */
  values?: { name: string; email: string; message: string };
};

const LIMITS = { name: 120, email: 254, message: 4000 };

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Sends the contact form to my inbox through Resend's REST API (no SDK, so
 * the site stays dependency-light). Needs RESEND_API_KEY; CONTACT_TO and
 * CONTACT_FROM are optional. Without a key the visitor is told to email
 * directly instead of seeing a silent failure.
 */
export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real browsers leave this empty; bots fill every field.
  if (text(formData, "company")) return { status: "sent" };

  const name = text(formData, "name").slice(0, LIMITS.name);
  const email = text(formData, "email").slice(0, LIMITS.email);
  const message = text(formData, "message").slice(0, LIMITS.message);

  const values = { name, email, message };
  if (!name || !email || !message) return { status: "error", message: "Please fill in your name, email and a message.", values };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { status: "error", message: "That email address doesn’t look right.", values };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { status: "error", message: `The form isn’t connected yet. Email me directly at ${site.email}.`, values };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO ?? site.email],
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  }).catch(() => null);

  if (!response?.ok) {
    console.error("contact: Resend responded", response?.status, await response?.text().catch(() => ""));
    return { status: "error", message: `Something went wrong sending that. Email me directly at ${site.email}.`, values };
  }
  return { status: "sent" };
}
