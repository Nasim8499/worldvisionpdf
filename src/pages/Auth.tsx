import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BrandLogo } from "@/components/BrandLogo";
import { toast } from "sonner";

export default function Auth() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) nav("/admin");
    });
    supabase.auth.getSession().then(({ data }) => { if (data.session) nav("/admin"); });
    return () => sub.subscription.unsubscribe();
  }, [nav]);

  async function signIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const { error } = await supabase.auth.signInWithPassword({
      email: String(fd.get("email") || ""),
      password: String(fd.get("password") || ""),
    });
    if (error) toast.error(error.message);
    setLoading(false);
  }

  async function signUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const { error } = await supabase.auth.signUp({
      email: String(fd.get("email") || ""),
      password: String(fd.get("password") || ""),
      options: { emailRedirectTo: window.location.origin + "/admin", data: { full_name: String(fd.get("full_name") || "") } },
    });
    if (error) toast.error(error.message);
    else toast.success("Check your email to confirm your account.");
    setLoading(false);
  }

  return (
    <>
      <Helmet>
        <title>Admin Sign In — World Vision Consultancy</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="min-h-screen bg-navy text-ivory flex flex-col">
        <header className="px-6 sm:px-10 py-6 flex justify-between items-center">
          <BrandLogo variant="ivory" />
          <Link to="/" className="mono text-[0.65rem] tracking-[0.3em] uppercase text-ivory/60 hover:text-gold transition-colors">← Home</Link>
        </header>
        <main className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="eyebrow eyebrow-ivory">Administration</div>
            <h1 className="font-display ivory text-4xl mt-3">Sign in</h1>
            <p className="text-ivory/60 mt-3 text-sm">Access the publication, lead and analytics console.</p>
            <div className="hairline w-12 mt-6 mb-10" />

            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid grid-cols-2 mb-6 bg-ivory/5">
                <TabsTrigger value="signin">Sign in</TabsTrigger>
                <TabsTrigger value="signup">Create account</TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <form onSubmit={signIn} className="space-y-4">
                  <Input name="email" type="email" placeholder="Email" required className="bg-ivory/5 border-ivory/20 text-ivory" />
                  <Input name="password" type="password" placeholder="Password" required className="bg-ivory/5 border-ivory/20 text-ivory" />
                  <button type="submit" disabled={loading} className="btn-gold w-full disabled:opacity-50">{loading ? "Signing in…" : "Sign in"}</button>
                </form>
              </TabsContent>
              <TabsContent value="signup">
                <form onSubmit={signUp} className="space-y-4">
                  <Input name="full_name" placeholder="Full name" required maxLength={120} className="bg-ivory/5 border-ivory/20 text-ivory" />
                  <Input name="email" type="email" placeholder="Email" required className="bg-ivory/5 border-ivory/20 text-ivory" />
                  <Input name="password" type="password" placeholder="Password (min 6 chars)" required minLength={6} className="bg-ivory/5 border-ivory/20 text-ivory" />
                  <button type="submit" disabled={loading} className="btn-gold w-full disabled:opacity-50">{loading ? "Creating…" : "Create account"}</button>
                </form>
                <p className="mono text-[0.6rem] tracking-widest uppercase text-ivory/40 mt-6">After creating your account, contact a project owner to grant admin or editor role.</p>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
}
