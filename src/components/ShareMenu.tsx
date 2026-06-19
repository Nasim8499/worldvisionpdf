import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Copy, Mail, Send, Link2, MessageCircle, Linkedin, Facebook } from "lucide-react";
import { toast } from "sonner";
import { trackShare } from "@/lib/analytics";

export function ShareMenu({ open, onOpenChange, url, title }: { open: boolean; onOpenChange: (v: boolean) => void; url?: string; title?: string }) {
  const shareUrl = url ?? (typeof window !== "undefined" ? window.location.href : "");
  const shareTitle = title ?? "World Vision Consultancy — 2026 Publication";
  const [copied, setCopied] = useState(false);

  const handle = (channel: string, href?: string) => {
    trackShare(channel);
    if (href) window.open(href, "_blank", "noopener,noreferrer");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied");
      trackShare("copy");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy");
    }
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: shareTitle, url: shareUrl }); trackShare("native"); } catch {}
    } else {
      copy();
    }
  };

  const enc = encodeURIComponent;
  const channels = [
    { key: "whatsapp", label: "WhatsApp", icon: MessageCircle, href: `https://wa.me/?text=${enc(shareTitle + " " + shareUrl)}` },
    { key: "linkedin", label: "LinkedIn", icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(shareUrl)}` },
    { key: "facebook", label: "Facebook", icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${enc(shareUrl)}` },
    { key: "telegram", label: "Telegram", icon: Send, href: `https://t.me/share/url?url=${enc(shareUrl)}&text=${enc(shareTitle)}` },
    { key: "email", label: "Email", icon: Mail, href: `mailto:?subject=${enc(shareTitle)}&body=${enc(shareUrl)}` },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-ivory border-gold/40 text-graphite">
        <DialogHeader>
          <div className="eyebrow">Share</div>
          <DialogTitle className="font-display text-2xl text-navy mt-1">Share this publication</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 mt-2">
          {channels.map((c) => (
            <button
              key={c.key}
              onClick={() => handle(c.key, c.href)}
              className="w-full flex items-center gap-4 px-4 py-3 border border-graphite/15 hover:border-gold hover:bg-gold/5 transition-all text-left"
            >
              <c.icon size={18} className="text-navy" />
              <span className="font-medium text-navy">{c.label}</span>
            </button>
          ))}
          <button
            onClick={copy}
            className="w-full flex items-center gap-4 px-4 py-3 border border-graphite/15 hover:border-gold hover:bg-gold/5 transition-all text-left"
          >
            {copied ? <Link2 size={18} className="text-gold-deep" /> : <Copy size={18} className="text-navy" />}
            <span className="font-medium text-navy">{copied ? "Copied!" : "Copy link"}</span>
          </button>
          {typeof navigator !== "undefined" && "share" in navigator && (
            <button onClick={nativeShare} className="btn-luxe w-full mt-2">Native share…</button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
