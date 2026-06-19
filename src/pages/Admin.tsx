import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { BrandLogo } from "@/components/BrandLogo";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { LogOut, Inbox, BarChart3, BookOpen, Palette, Bell, Shield } from "lucide-react";
import type { User } from "@supabase/supabase-js";

interface Lead {
  id: string; source: string; full_name: string | null; email: string | null; phone: string | null;
  country: string | null; message: string | null; status: string; created_at: string;
}
interface Booking { id: string; full_name: string; email: string; phone: string | null; destination_country: string | null; service_interest: string | null; status: string; created_at: string; }
interface Stats { sessions: number; views: number; ctas: number; shares: number; leads: number; }

export default function Admin() {
  const nav = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<Stats>({ sessions: 0, views: 0, ctas: 0, shares: 0, leads: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) nav("/auth");
      else setUser(session.user);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) { nav("/auth"); return; }
      setUser(data.session.user);
      loadAll(data.session.user.id);
    });
    return () => sub.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadAll(uid: string) {
    const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", uid);
    setRole(roles?.[0]?.role ?? null);
    const [l, b, s, v, c, sh] = await Promise.all([
      supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(50),
      supabase.from("consultation_bookings").select("*").order("created_at", { ascending: false }).limit(50),
      supabase.from("reader_sessions").select("id", { count: "exact", head: true }),
      supabase.from("page_views").select("id", { count: "exact", head: true }),
      supabase.from("cta_clicks").select("id", { count: "exact", head: true }),
      supabase.from("share_events").select("id", { count: "exact", head: true }),
    ]);
    setLeads((l.data as Lead[]) ?? []);
    setBookings((b.data as Booking[]) ?? []);
    setStats({
      sessions: s.count ?? 0,
      views: v.count ?? 0,
      ctas: c.count ?? 0,
      shares: sh.count ?? 0,
      leads: (l.data ?? []).length,
    });
    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    nav("/");
  }

  async function claimAdminIfFirst() {
    if (!user) return;
    const { count } = await supabase.from("user_roles").select("id", { count: "exact", head: true });
    if ((count ?? 0) === 0) {
      const { error } = await supabase.from("user_roles").insert({ user_id: user.id, role: "admin" });
      if (!error) { toast.success("You are now the admin."); loadAll(user.id); }
      else toast.error("Could not assign role — already taken.");
    } else {
      toast.info("An admin already exists for this workspace.");
    }
  }

  return (
    <>
      <Helmet>
        <title>Admin — World Vision Consultancy</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="min-h-screen bg-ivory text-graphite">
        <header className="px-6 sm:px-10 py-5 border-b border-page-rule bg-page flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <BrandLogo variant="navy" size="sm" />
            <span className="mono text-[0.65rem] tracking-[0.3em] uppercase text-gold-deep">Console</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="mono text-[0.65rem] tracking-[0.3em] uppercase text-navy hover:text-gold-deep transition-colors">View Site</Link>
            <span className="mono text-[0.65rem] tracking-widest uppercase text-graphite/50">{user?.email}</span>
            <span className="mono text-[0.6rem] tracking-widest uppercase text-gold-deep border border-gold/40 px-2 py-0.5">{role ?? "no role"}</span>
            <button onClick={logout} className="text-graphite/70 hover:text-gold-deep p-2" aria-label="Sign out"><LogOut size={16} /></button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
          {!role && (
            <div className="mb-8 p-6 border border-gold/40 bg-gold/5 flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="font-display text-xl text-navy">No role assigned</div>
                <p className="text-sm text-graphite/75 mt-1">If this is the first account on this workspace, claim admin to view leads and analytics.</p>
              </div>
              <button onClick={claimAdminIfFirst} className="btn-luxe">Claim admin (first user only)</button>
            </div>
          )}

          {/* STAT CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-px bg-page-rule mb-10">
            {[
              { l: "Reader sessions", v: stats.sessions },
              { l: "Page views", v: stats.views },
              { l: "CTA clicks", v: stats.ctas },
              { l: "Shares", v: stats.shares },
              { l: "Leads", v: stats.leads },
            ].map((s) => (
              <div key={s.l} className="bg-ivory p-6">
                <div className="mono text-[0.6rem] tracking-[0.3em] uppercase text-gold-deep">{s.l}</div>
                <div className="stat-numeral mt-3">{s.v}</div>
              </div>
            ))}
          </div>

          <Tabs defaultValue="leads">
            <TabsList className="bg-page mb-6 flex-wrap">
              <TabsTrigger value="leads"><Inbox size={14} className="mr-2" /> Leads</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="analytics"><BarChart3 size={14} className="mr-2" /> Analytics</TabsTrigger>
              <TabsTrigger value="publications"><BookOpen size={14} className="mr-2" /> Publications</TabsTrigger>
              <TabsTrigger value="branding"><Palette size={14} className="mr-2" /> Branding</TabsTrigger>
              <TabsTrigger value="security"><Shield size={14} className="mr-2" /> Security</TabsTrigger>
              <TabsTrigger value="notifications"><Bell size={14} className="mr-2" /> Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="leads">
              <div className="border border-page-rule bg-page">
                <table className="w-full text-sm">
                  <thead className="bg-navy text-ivory mono text-[0.6rem] tracking-[0.25em] uppercase">
                    <tr>
                      <th className="text-left p-3">Source</th><th className="text-left p-3">Name</th>
                      <th className="text-left p-3">Email</th><th className="text-left p-3">Country</th>
                      <th className="text-left p-3">Status</th><th className="text-left p-3">Received</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.length === 0 && (
                      <tr><td colSpan={6} className="p-6 text-center text-graphite/50">No leads yet.</td></tr>
                    )}
                    {leads.map((l) => (
                      <tr key={l.id} className="border-t border-page-rule hover:bg-ivory">
                        <td className="p-3 mono text-[0.65rem] tracking-widest uppercase text-gold-deep">{l.source}</td>
                        <td className="p-3 font-display">{l.full_name ?? "—"}</td>
                        <td className="p-3">{l.email ?? "—"}</td>
                        <td className="p-3">{l.country ?? "—"}</td>
                        <td className="p-3"><span className="border border-gold/40 px-2 py-0.5 text-[0.6rem] mono uppercase tracking-widest">{l.status}</span></td>
                        <td className="p-3 mono text-[0.65rem] text-graphite/60">{new Date(l.created_at).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="bookings">
              <div className="border border-page-rule bg-page">
                <table className="w-full text-sm">
                  <thead className="bg-navy text-ivory mono text-[0.6rem] tracking-[0.25em] uppercase">
                    <tr>
                      <th className="text-left p-3">Name</th><th className="text-left p-3">Email</th>
                      <th className="text-left p-3">Phone</th><th className="text-left p-3">Service</th>
                      <th className="text-left p-3">Destination</th><th className="text-left p-3">Status</th><th className="text-left p-3">Received</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.length === 0 && <tr><td colSpan={7} className="p-6 text-center text-graphite/50">No consultations yet.</td></tr>}
                    {bookings.map((b) => (
                      <tr key={b.id} className="border-t border-page-rule hover:bg-ivory">
                        <td className="p-3 font-display">{b.full_name}</td>
                        <td className="p-3">{b.email}</td>
                        <td className="p-3">{b.phone ?? "—"}</td>
                        <td className="p-3">{b.service_interest ?? "—"}</td>
                        <td className="p-3">{b.destination_country ?? "—"}</td>
                        <td className="p-3"><span className="border border-gold/40 px-2 py-0.5 text-[0.6rem] mono uppercase tracking-widest">{b.status}</span></td>
                        <td className="p-3 mono text-[0.65rem] text-graphite/60">{new Date(b.created_at).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <PlaceholderPanel
                title="Analytics dashboard"
                body="Real reader sessions, page views, CTA clicks and share events are already being tracked into the database. Detailed charts (most viewed pages, drop-off, country/device breakdown) will be wired in Wave 4."
              />
            </TabsContent>

            <TabsContent value="publications">
              <PlaceholderPanel title="Publication CMS" body="Page editor, reordering, image uploads, and bookshelf category management arrive in Wave 3. Database schema (publications · publication_pages · bookshelf_categories) is already provisioned." />
            </TabsContent>

            <TabsContent value="branding">
              <PlaceholderPanel title="Branding manager" body="Editable logo, palette, typography and contact details — schema is provisioned in `branding_settings`. UI ships in Wave 3." />
            </TabsContent>

            <TabsContent value="security">
              <PlaceholderPanel title="Document protection" body="Password, download/print restriction, domain restriction, expiry and watermark. Schema is provisioned per publication and globally in `security_settings`." />
            </TabsContent>

            <TabsContent value="notifications">
              <PlaceholderPanel title="Notification preferences" body="Email alerts for new lead, consultation, employer inquiry, view milestone, and share events. Preferences stored per user in `notification_preferences`." />
            </TabsContent>
          </Tabs>

          {loading && <p className="text-center text-graphite/50 mt-8 mono text-xs">Loading…</p>}
        </main>
      </div>
    </>
  );
}

function PlaceholderPanel({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-page-rule p-10 bg-page">
      <div className="eyebrow">Coming in next wave</div>
      <h3 className="font-display text-3xl text-navy mt-3">{title}</h3>
      <div className="hairline w-12 mt-5 mb-5" />
      <p className="text-graphite/75 leading-relaxed max-w-2xl">{body}</p>
    </div>
  );
}
