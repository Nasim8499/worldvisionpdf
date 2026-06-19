import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "wvc_session_token";

function getSessionToken(): string {
  let t = localStorage.getItem(SESSION_KEY);
  if (!t) {
    t = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, t);
  }
  return t;
}

function detectDevice(): string {
  const ua = navigator.userAgent;
  if (/Mobi|Android|iPhone/i.test(ua)) return "mobile";
  if (/Tablet|iPad/i.test(ua)) return "tablet";
  return "desktop";
}

function detectBrowser(): string {
  const ua = navigator.userAgent;
  if (/Edg\//.test(ua)) return "Edge";
  if (/Chrome/.test(ua)) return "Chrome";
  if (/Safari/.test(ua)) return "Safari";
  if (/Firefox/.test(ua)) return "Firefox";
  return "Other";
}

export async function startReaderSession(publicationId?: string | null) {
  const session_token = getSessionToken();
  try {
    await supabase.from("reader_sessions").insert({
      session_token,
      publication_id: publicationId ?? null,
      device: detectDevice(),
      browser: detectBrowser(),
      referrer: document.referrer || null,
    });
  } catch {}
  return session_token;
}

export async function trackPageView(pageNumber: number, publicationId?: string | null) {
  try {
    await supabase.from("page_views").insert({
      session_token: getSessionToken(),
      publication_id: publicationId ?? null,
      page_number: pageNumber,
    });
  } catch {}
}

export async function trackCta(cta_key: string, page_number?: number, metadata?: Record<string, unknown>) {
  try {
    await supabase.from("cta_clicks").insert({
      session_token: getSessionToken(),
      cta_key,
      page_number: page_number ?? null,
      metadata: metadata ?? {},
    });
  } catch {}
}

export async function trackShare(channel: string) {
  try {
    await supabase.from("share_events").insert({
      session_token: getSessionToken(),
      channel,
    });
  } catch {}
}

export async function trackDownload(file_key: string) {
  try {
    await supabase.from("download_events").insert({
      session_token: getSessionToken(),
      file_key,
    });
  } catch {}
}
