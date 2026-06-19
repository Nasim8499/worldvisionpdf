import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, BookOpen, Globe2, Briefcase, GraduationCap, Building2, Heart, Phone, Mail, Share2 } from "lucide-react";
import coverSkyline from "@/assets/cover-skyline.jpg";
import worldMap from "@/assets/world-map.jpg";
import boardroom from "@/assets/boardroom.jpg";
import handshake from "@/assets/handshake.jpg";
import { BrandLogo } from "@/components/BrandLogo";
import { ConsultationModal } from "@/components/ConsultationModal";
import { ShareMenu } from "@/components/ShareMenu";
import { startReaderSession, trackCta } from "@/lib/analytics";

export default function Index() {
  const [consultOpen, setConsultOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => { startReaderSession(); }, []);

  return (
    <>
      <Helmet>
        <title>World Vision Consultancy — Global Mobility, Immigration & Recruitment</title>
        <meta name="description" content="An interactive digital publication from World Vision Consultancy. Explore our 32-page 2026 edition on visa, immigration, recruitment and global mobility." />
        <link rel="canonical" href="/" />
        <meta property="og:title" content="World Vision Consultancy — 2026 Edition" />
        <meta property="og:description" content="Explore the 2026 interactive publication." />
        <meta property="og:url" content="/" />
      </Helmet>

      <div className="min-h-screen bg-ivory text-graphite">
        {/* NAV */}
        <header className="absolute top-0 left-0 right-0 z-20 px-6 sm:px-10 py-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <BrandLogo variant="ivory" />
            <nav className="hidden md:flex items-center gap-8 text-ivory/85 mono text-[0.7rem] tracking-[0.25em] uppercase">
              <Link to="/read" className="hover:text-gold transition-colors">Read</Link>
              <Link to="/bookshelf" className="hover:text-gold transition-colors">Bookshelf</Link>
              <a href="#services" className="hover:text-gold transition-colors">Services</a>
              <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
              <Link to="/auth" className="hover:text-gold transition-colors">Admin</Link>
            </nav>
            <button onClick={() => { trackCta("hero_consult"); setConsultOpen(true); }} className="btn-gold hidden sm:inline-flex">Consult</button>
          </div>
        </header>

        {/* HERO */}
        <section className="relative h-[100svh] min-h-[640px] overflow-hidden">
          <img src={coverSkyline} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, hsl(213 60% 8% / 0.7) 0%, hsl(213 60% 8% / 0.3) 50%, hsl(213 60% 8% / 0.95) 100%)" }} />

          <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-10 flex flex-col justify-end pb-20 sm:pb-28">
            <div className="rise max-w-3xl">
              <div className="eyebrow eyebrow-ivory">The 2026 Edition · Volume One</div>
              <div className="hairline w-16 mt-4" />
              <h1 className="font-display text-ivory mt-6 leading-[0.9] tracking-tight" style={{ fontSize: "clamp(2.75rem, 8vw, 6.5rem)" }}>
                World Vision<br /><em className="text-gold not-italic font-light">Consultancy</em>
              </h1>
              <p className="mt-6 text-ivory/80 max-w-xl leading-relaxed text-lg">
                Global mobility, immigration and recruitment — set as a publication. Thirty-two pages of how we work, where we operate, and what we offer.
              </p>
            </div>
            <div className="rise rise-delay-2 mt-10 flex flex-wrap gap-4">
              <Link to="/read" onClick={() => trackCta("hero_open_book")} className="btn-gold inline-flex items-center gap-3">
                <BookOpen size={16} /> Open the Publication <ArrowRight size={16} />
              </Link>
              <button onClick={() => { trackCta("hero_share"); setShareOpen(true); }} className="btn-luxe-outline">
                <Share2 size={14} /> Share
              </button>
            </div>
            <div className="rise rise-delay-3 mt-10 sm:mt-16 flex items-end gap-8 text-ivory/55 mono text-[0.65rem] tracking-[0.3em] uppercase">
              <span>32 pages</span><span>·</span><span>Interactive</span><span>·</span><span>Print-ready</span>
            </div>
          </div>
        </section>

        {/* MANIFESTO */}
        <section className="bg-ivory text-graphite py-24 sm:py-32 border-y border-page-rule">
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <div className="eyebrow">Manifesto</div>
              <div className="hairline w-12 mt-3" />
            </div>
            <div className="md:col-span-8">
              <h2 className="font-display text-navy leading-tight text-balance" style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}>
                A workplace, a classroom or a new home should be accessible to anyone with the will to <em className="text-gold-deep">earn it.</em>
              </h2>
            </div>
          </div>
        </section>

        {/* SERVICES GRID */}
        <section id="services" className="bg-ivory py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-6 sm:px-10">
            <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
              <div>
                <div className="eyebrow">Services</div>
                <h2 className="font-display text-navy mt-3 text-balance" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}>The full practice.</h2>
              </div>
              <Link to="/read" className="mono text-[0.65rem] tracking-[0.3em] uppercase text-navy hover:text-gold-deep transition-colors inline-flex items-center gap-2">
                See all in the publication <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-page-rule">
              {[
                { Icon: Briefcase, t: "Work Permit & Overseas Employment", d: "Skilled trades to specialised technical roles, end-to-end." },
                { Icon: Globe2, t: "Immigration & Permanent Residency", d: "Points-based, employer-sponsored and family routes." },
                { Icon: GraduationCap, t: "Student Visa & Education", d: "Course mapping to visa issuance, treated as a craft." },
                { Icon: Building2, t: "Business & Investor", d: "Investor, entrepreneur and treaty-business routes." },
                { Icon: Heart, t: "Family & Sponsorship", d: "Spouse, parent and dependent reunification." },
                { Icon: Briefcase, t: "Employer Recruitment", d: "Workforce planning to mobilisation." },
              ].map((s, i) => (
                <div key={i} className="bg-ivory p-8 flex flex-col gap-4 hover:bg-page transition-colors">
                  <s.Icon className="text-gold-deep" size={28} strokeWidth={1.2} />
                  <h3 className="font-display text-2xl text-navy">{s.t}</h3>
                  <p className="text-sm text-graphite/70 leading-relaxed">{s.d}</p>
                  <div className="mt-auto mono text-[0.6rem] tracking-[0.3em] uppercase text-gold-deep">0{i + 1}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GLOBAL NETWORK BAND */}
        <section className="relative py-32 bg-navy overflow-hidden">
          <img src={worldMap} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-navy/50" />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-10 text-center">
            <div className="eyebrow eyebrow-ivory">Country Network</div>
            <h2 className="font-display ivory mt-4 leading-tight" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
              Four regions. <em className="text-gold">One desk.</em>
            </h2>
            <div className="hairline w-16 mx-auto mt-8" />
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {[{r:"Europe",n:"12"},{r:"Australia · NZ",n:"02"},{r:"Middle East",n:"08"},{r:"Asia · SG",n:"10"}].map((r) => (
                <div key={r.r}>
                  <div className="font-display text-5xl ivory">{r.n}</div>
                  <div className="mono text-[0.6rem] tracking-[0.25em] uppercase text-gold-soft mt-2">{r.r}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="bg-ivory py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <div className="eyebrow">Contact</div>
              <h2 className="font-display text-navy mt-3 leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                Start with a <em className="text-gold-deep">conversation.</em>
              </h2>
              <div className="hairline w-12 mt-6 mb-6" />
              <p className="text-graphite/75 leading-relaxed max-w-md">
                Share a few details. An advisor will be in touch within one business day. All inquiries are confidential and free of obligation.
              </p>
              <div className="mt-10 space-y-5 text-sm">
                <a href="tel:+10000000000" className="flex items-center gap-3 text-navy hover:text-gold-deep transition-colors"><Phone size={16}/> +1 000 000 0000</a>
                <a href="mailto:hello@worldvision.example" className="flex items-center gap-3 text-navy hover:text-gold-deep transition-colors"><Mail size={16}/> hello@worldvision.example</a>
              </div>
            </div>
            <div className="md:col-span-7 relative bg-navy text-ivory p-10 sm:p-14">
              <img src={boardroom} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
              <div className="relative">
                <div className="eyebrow eyebrow-ivory">Request Consultation</div>
                <h3 className="font-display text-ivory mt-3 text-3xl">Speak with our team.</h3>
                <div className="hairline w-12 mt-6 mb-6" />
                <p className="text-ivory/75 leading-relaxed max-w-md">
                  Tell us where you are, where you want to go, and how soon. We will guide you through what is possible — honestly.
                </p>
                <button onClick={() => { trackCta("footer_consult"); setConsultOpen(true); }} className="btn-gold mt-10">Request Consultation</button>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-navy text-ivory/70 py-12">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 grid sm:grid-cols-3 gap-8 items-start">
            <BrandLogo variant="ivory" />
            <div className="mono text-[0.6rem] tracking-[0.3em] uppercase">
              <div className="text-gold-soft mb-3">Practice</div>
              <div>Immigration · Recruitment · Education · Mobility</div>
            </div>
            <div className="mono text-[0.6rem] tracking-[0.3em] uppercase text-right">
              © 2026 World Vision Consultancy · All rights reserved
            </div>
          </div>
        </footer>
      </div>

      <ConsultationModal open={consultOpen} onOpenChange={setConsultOpen} />
      <ShareMenu open={shareOpen} onOpenChange={setShareOpen} />
    </>
  );
}
