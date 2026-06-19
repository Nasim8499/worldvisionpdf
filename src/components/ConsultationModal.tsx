import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import { trackCta } from "@/lib/analytics";

const schema = z.object({
  full_name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  service_interest: z.string().trim().max(80).optional().or(z.literal("")),
  destination_country: z.string().trim().max(80).optional().or(z.literal("")),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "Consent required" }) }),
});

export function ConsultationModal({ open, onOpenChange, source = "consultation" }: { open: boolean; onOpenChange: (v: boolean) => void; source?: string }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      full_name: fd.get("full_name"),
      email: fd.get("email"),
      phone: fd.get("phone") || "",
      service_interest: fd.get("service_interest") || "",
      destination_country: fd.get("destination_country") || "",
      notes: fd.get("notes") || "",
      consent: fd.get("consent") === "on",
    });
    if (!parsed.success) {
      toast.error(parsed.error.errors[0]?.message ?? "Please check the form");
      return;
    }
    setLoading(true);
    const v = parsed.data;
    const { error } = await supabase.from("consultation_bookings").insert({
      full_name: v.full_name, email: v.email, phone: v.phone || null,
      service_interest: v.service_interest || null,
      destination_country: v.destination_country || null,
      notes: v.notes || null, consent_given: true,
    });
    if (!error) {
      await supabase.from("leads").insert({
        source, full_name: v.full_name, email: v.email, phone: v.phone || null,
        country: v.destination_country || null, message: v.notes || null, consent_given: true,
      });
      trackCta("consultation_submit");
      setDone(true);
      toast.success("Your consultation request has been received.");
    } else {
      toast.error("Could not submit. Please try again.");
    }
    setLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) setTimeout(() => setDone(false), 300); }}>
      <DialogContent className="max-w-xl bg-ivory border-gold/40 text-graphite">
        {!done ? (
          <>
            <DialogHeader>
              <div className="eyebrow">Request Consultation</div>
              <DialogTitle className="font-display text-3xl text-navy mt-1">Speak with our team</DialogTitle>
              <DialogDescription className="text-graphite/70">
                Share a few details and our advisors will get in touch. All information is confidential.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={onSubmit} className="space-y-4 mt-2">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="mono text-[0.65rem] tracking-widest uppercase text-graphite/70 block mb-1.5">Full Name</label>
                  <Input name="full_name" required maxLength={120} className="border-graphite/20 bg-transparent" />
                </div>
                <div>
                  <label className="mono text-[0.65rem] tracking-widest uppercase text-graphite/70 block mb-1.5">Email</label>
                  <Input name="email" type="email" required maxLength={255} className="border-graphite/20 bg-transparent" />
                </div>
                <div>
                  <label className="mono text-[0.65rem] tracking-widest uppercase text-graphite/70 block mb-1.5">Phone</label>
                  <Input name="phone" type="tel" maxLength={40} className="border-graphite/20 bg-transparent" />
                </div>
                <div>
                  <label className="mono text-[0.65rem] tracking-widest uppercase text-graphite/70 block mb-1.5">Destination Country</label>
                  <Input name="destination_country" maxLength={80} className="border-graphite/20 bg-transparent" />
                </div>
              </div>
              <div>
                <label className="mono text-[0.65rem] tracking-widest uppercase text-graphite/70 block mb-1.5">Service Interest</label>
                <Input name="service_interest" maxLength={80} placeholder="e.g. Work permit, PR, Student visa" className="border-graphite/20 bg-transparent" />
              </div>
              <div>
                <label className="mono text-[0.65rem] tracking-widest uppercase text-graphite/70 block mb-1.5">Notes</label>
                <Textarea name="notes" maxLength={1000} rows={3} className="border-graphite/20 bg-transparent resize-none" />
              </div>
              <label className="flex items-start gap-3 text-xs text-graphite/70 leading-relaxed">
                <Checkbox name="consent" required className="mt-0.5" />
                <span>I consent to World Vision Consultancy contacting me about my inquiry. I understand this is informational and not a guarantee of any visa outcome.</span>
              </label>
              <button type="submit" disabled={loading} className="btn-luxe w-full disabled:opacity-50">
                {loading ? "Sending…" : "Request Consultation"}
              </button>
            </form>
          </>
        ) : (
          <div className="py-8 text-center">
            <div className="ornament mx-auto mb-6" />
            <h3 className="font-display text-3xl text-navy">Thank you</h3>
            <p className="text-graphite/70 mt-3 max-w-sm mx-auto">An advisor will reach out within one business day to confirm your consultation.</p>
            <button onClick={() => onOpenChange(false)} className="btn-luxe mt-8">Close</button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
