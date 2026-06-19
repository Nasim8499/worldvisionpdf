import { ReactNode } from "react";
import coverSkyline from "@/assets/cover-skyline.jpg";
import passportStill from "@/assets/passport-stilllife.jpg";
import portraitCandidate from "@/assets/portrait-candidate.jpg";
import jetbridge from "@/assets/jetbridge.jpg";
import boardroom from "@/assets/boardroom.jpg";
import worldMap from "@/assets/world-map.jpg";
import workers from "@/assets/workers.jpg";
import handshake from "@/assets/handshake.jpg";
import roadmap from "@/assets/roadmap.jpg";
import portraitDirector from "@/assets/portrait-director.jpg";
import student from "@/assets/student.jpg";
import backCoverImg from "@/assets/back-cover.jpg";

/* ============================================================
   World Vision Consultancy — 32 unique editorial spreads
   Every page = full size of parent (book page). No fixed colors
   except semantic tokens. Sample/demo data clearly labeled.
   ============================================================ */

const PageFrame = ({ children, dark = false, className = "" }: { children: ReactNode; dark?: boolean; className?: string }) => (
  <div className={`relative w-full h-full ${dark ? "page-surface-dark" : "page-surface"} ${className}`}>
    {children}
  </div>
);

const Eyebrow = ({ children, light = false }: { children: ReactNode; light?: boolean }) => (
  <div className={`eyebrow ${light ? "eyebrow-ivory" : ""}`}>{children}</div>
);

const Chapter = ({ n, title, light = false }: { n: string; title: string; light?: boolean }) => (
  <div className="flex items-baseline gap-4">
    <span className={`mono text-xs tracking-[0.3em] ${light ? "text-gold-soft" : "text-gold-deep"}`}>CH · {n}</span>
    <span className={`mono text-[0.65rem] tracking-[0.25em] uppercase ${light ? "text-ivory/60" : "text-graphite/60"}`}>{title}</span>
  </div>
);

/* ========== 01 · COVER ========== */
const P01_Cover = () => (
  <div className="relative w-full h-full overflow-hidden bg-navy">
    <img src={coverSkyline} alt="" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, hsl(213 60% 8% / 0.85) 0%, hsl(213 60% 8% / 0.4) 50%, hsl(213 60% 8% / 0.95) 100%)" }} />
    <div className="relative h-full flex flex-col justify-between p-8 sm:p-12">
      <div className="rise">
        <div className="eyebrow eyebrow-ivory">World Vision Consultancy · Est. 2026</div>
        <div className="hairline mt-4 w-16" />
      </div>
      <div className="rise rise-delay-1">
        <div className="font-display text-ivory leading-[0.9] tracking-tight" style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}>
          World<br />Vision<br /><em className="text-gold not-italic font-light">Consultancy</em>
        </div>
        <div className="hairline w-24 mt-6" />
        <div className="mt-6 max-w-md text-ivory/85 leading-relaxed text-sm sm:text-base">
          Global mobility, immigration and recruitment for a connected century.
        </div>
      </div>
      <div className="rise rise-delay-2 flex items-end justify-between">
        <div>
          <div className="mono text-[0.65rem] tracking-[0.3em] uppercase text-gold-soft">The 2026 Edition</div>
          <div className="mono text-[0.65rem] tracking-[0.3em] uppercase text-ivory/50 mt-2">Volume One · Company Profile</div>
        </div>
        <div className="ornament" />
      </div>
    </div>
  </div>
);

/* ========== 02 · OPENING MANIFESTO ========== */
const P02_Manifesto = () => (
  <PageFrame>
    <div className="h-full p-10 sm:p-14 flex flex-col justify-center">
      <Eyebrow>Opening</Eyebrow>
      <div className="hairline w-12 mt-3 mb-10" />
      <h1 className="font-display text-navy leading-[1.05] tracking-tight" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
        Borders are <em className="text-gold-deep">administrative</em>.<br />
        Ambition is <em className="text-gold-deep">universal</em>.
      </h1>
      <div className="mt-10 max-w-md text-graphite/80 leading-relaxed">
        <p>We believe a workplace, a classroom or a new home should be accessible to anyone with the will to earn it. Every page of this volume documents how that belief becomes a process — a paperwork, an interview, a flight, a first day.</p>
      </div>
      <div className="mt-12 flex items-center gap-4">
        <span className="ornament" />
        <span className="mono text-[0.65rem] tracking-[0.3em] uppercase text-gold-deep">A Note From The Editors</span>
      </div>
    </div>
  </PageFrame>
);

/* ========== 03 · ABOUT ========== */
const P03_About = () => (
  <PageFrame>
    <div className="h-full grid grid-cols-12 gap-0">
      <div className="col-span-5 relative overflow-hidden">
        <img src={boardroom} alt="Executive boardroom" loading="lazy" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-navy/15" />
      </div>
      <div className="col-span-7 p-10 sm:p-14 flex flex-col">
        <Chapter n="03" title="About" />
        <h2 className="display-2 text-navy mt-6">A consultancy <em className="text-gold-deep">built around movement.</em></h2>
        <div className="hairline w-12 mt-6 mb-6" />
        <p className="drop-cap text-graphite/85 leading-relaxed">
          World Vision Consultancy is an international advisory firm working at the intersection of immigration, overseas employment, education and global business mobility. We act as a single point of coordination between candidates, employers, institutions and the regulators they rely on.
        </p>
        <p className="text-graphite/75 leading-relaxed mt-5">
          Our practice combines case management, document compliance and recruitment infrastructure across multiple time zones — designed to be calm where the journey itself rarely is.
        </p>
        <div className="mt-auto pt-8 flex items-center gap-6 mono text-[0.6rem] tracking-[0.25em] uppercase text-gold-deep">
          <span>Practice</span><span className="text-graphite/40">·</span>
          <span>Global Mobility</span><span className="text-graphite/40">·</span>
          <span>Advisory</span>
        </div>
      </div>
    </div>
  </PageFrame>
);

/* ========== 04 · MISSION / VISION / VALUES ========== */
const P04_MVV = () => (
  <PageFrame dark>
    <div className="h-full p-10 sm:p-14 flex flex-col">
      <Chapter n="04" title="Mission · Vision · Values" light />
      <h2 className="display-2 ivory mt-6">First principles.</h2>
      <div className="hairline w-12 mt-6 mb-10" />
      <div className="grid sm:grid-cols-3 gap-8 flex-1">
        {[
          { tag: "Mission", body: "To make qualified, ethical international relocation accessible — for individuals, families and the institutions that hire them." },
          { tag: "Vision", body: "A world where talent moves with dignity, transparency and confidence, regardless of origin." },
          { tag: "Values", body: "Integrity, compliance, calm execution, and a refusal to promise outcomes we cannot control." },
        ].map((b, i) => (
          <div key={i} className="flex flex-col">
            <span className="stat-numeral stat-numeral-gold opacity-50">{String(i + 1).padStart(2, "0")}</span>
            <div className="hairline w-8 my-4" />
            <div className="mono text-[0.65rem] tracking-[0.3em] uppercase text-gold-soft">{b.tag}</div>
            <p className="mt-3 text-ivory/80 leading-relaxed text-[0.95rem]">{b.body}</p>
          </div>
        ))}
      </div>
    </div>
  </PageFrame>
);

/* ========== 05 · DIRECTOR MESSAGE ========== */
const P05_Director = () => (
  <PageFrame>
    <div className="h-full grid grid-cols-12">
      <div className="col-span-5 relative overflow-hidden bg-navy">
        <img src={portraitDirector} alt="Managing Director" loading="lazy" className="w-full h-full object-cover" />
      </div>
      <div className="col-span-7 p-10 sm:p-14 flex flex-col">
        <Eyebrow>From the Managing Director</Eyebrow>
        <h2 className="display-3 text-navy mt-4">A letter to our clients<br />and partners.</h2>
        <div className="hairline w-10 mt-5 mb-6" />
        <p className="text-graphite/85 leading-relaxed text-[0.95rem]">
          <span className="font-display text-2xl text-gold-deep leading-none float-left mr-2 mt-1">"</span>
          For more than two decades, the question I have heard most often is not whether to move — but how to move responsibly. This publication is our answer in book form: the services we offer, the countries we operate in, and the standards we hold ourselves to.
        </p>
        <p className="text-graphite/85 leading-relaxed text-[0.95rem] mt-4">
          To every candidate who has trusted us with their next chapter, and every employer who has trusted us with their workforce — thank you. The pages that follow are written for you.
        </p>
        <div className="mt-auto pt-10">
          <div className="font-display italic text-navy text-xl">— Managing Director</div>
          <div className="mono text-[0.65rem] tracking-[0.3em] uppercase text-gold-deep mt-1">Editable Placeholder</div>
        </div>
      </div>
    </div>
  </PageFrame>
);

/* ========== 06 · AT A GLANCE ========== */
const P06_Glance = () => (
  <PageFrame>
    <div className="h-full p-10 sm:p-14 flex flex-col">
      <Chapter n="06" title="At a Glance" />
      <h2 className="display-2 text-navy mt-6">The firm in numbers.</h2>
      <p className="mono text-[0.6rem] tracking-[0.3em] uppercase text-gold-deep/70 mt-3">Sample Data · For Illustration Only</p>
      <div className="hairline w-12 mt-6 mb-10" />
      <div className="grid grid-cols-2 gap-x-10 gap-y-10 flex-1">
        {[
          { n: "20+", l: "Years of Practice" },
          { n: "40", l: "Destination Countries" },
          { n: "12", l: "Service Lines" },
          { n: "8", l: "International Offices" },
        ].map((s, i) => (
          <div key={i} className="border-l border-gold/40 pl-5">
            <div className="stat-numeral">{s.n}</div>
            <div className="mono text-[0.7rem] tracking-[0.25em] uppercase text-graphite/70 mt-2">{s.l}</div>
          </div>
        ))}
      </div>
      <div className="hairline-soft mt-6" />
      <p className="text-xs text-graphite/55 mt-3 italic">Metrics shown are illustrative placeholders pending verification.</p>
    </div>
  </PageFrame>
);

/* ========== 07 · GLOBAL SERVICE OVERVIEW ========== */
const P07_Services = () => (
  <PageFrame dark>
    <div className="h-full p-10 sm:p-14 flex flex-col">
      <Chapter n="07" title="Global Services" light />
      <h2 className="display-2 ivory mt-6">The full practice, <em className="text-gold">at a glance.</em></h2>
      <div className="hairline w-12 mt-6 mb-8" />
      <div className="grid sm:grid-cols-2 gap-x-10 gap-y-5 flex-1 text-ivory/90">
        {[
          "Work Permit & Overseas Employment",
          "Immigration & Permanent Residency",
          "Student Visa & International Education",
          "Business, Investor & Entrepreneur Visa",
          "Family, Visit & Sponsorship",
          "Employer Recruitment Solutions",
          "Document Preparation & Compliance",
          "Country Advisory & Settlement Support",
        ].map((s, i) => (
          <div key={i} className="flex items-baseline gap-4 border-b border-ivory/10 pb-4">
            <span className="mono text-xs text-gold-soft tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <span className="font-display text-lg">{s}</span>
          </div>
        ))}
      </div>
    </div>
  </PageFrame>
);

/* ========== 08 · WORK PERMIT ========== */
const P08_WorkPermit = () => (
  <PageFrame>
    <div className="h-full grid grid-cols-12">
      <div className="col-span-7 p-10 sm:p-14 flex flex-col">
        <Chapter n="08" title="Work Permit · Overseas Employment" />
        <h2 className="display-2 text-navy mt-5">Working abroad,<br /><em className="text-gold-deep">with structure.</em></h2>
        <div className="hairline w-12 mt-6 mb-6" />
        <p className="text-graphite/80 leading-relaxed">
          From skilled trades to specialised technical roles, our employment desk coordinates the full lifecycle: eligibility review, employer matching, contract review, work-permit application, medical and document compliance, travel and arrival support.
        </p>
        <ul className="mt-6 space-y-3 text-sm text-graphite/85">
          {["Eligibility & profile assessment","Employer & contract verification","Permit and visa filing coordination","Medical and document compliance","Pre-departure briefing"].map((x, i) => (
            <li key={i} className="flex items-baseline gap-3"><span className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 shrink-0" />{x}</li>
          ))}
        </ul>
        <p className="caption mt-auto pt-6">Informational only — outcomes determined by relevant authorities.</p>
      </div>
      <div className="col-span-5 relative overflow-hidden">
        <img src={workers} alt="Skilled trades workers" loading="lazy" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-navy/30" />
      </div>
    </div>
  </PageFrame>
);

/* ========== 09 · IMMIGRATION & PR ========== */
const P09_PR = () => (
  <PageFrame>
    <div className="h-full p-10 sm:p-14 flex flex-col">
      <Chapter n="09" title="Immigration · PR" />
      <h2 className="display-2 text-navy mt-5">Long-term <em className="text-gold-deep">settlement.</em></h2>
      <div className="hairline w-12 mt-6 mb-8" />
      <div className="grid sm:grid-cols-2 gap-10 flex-1">
        <div>
          <p className="text-graphite/85 leading-relaxed">
            Permanent residency is a multi-year journey. Our immigration advisory covers points-based skilled streams, employer-sponsored pathways, regional and rural categories, and family reunification programs across our destination countries.
          </p>
          <div className="hairline-soft mt-6 mb-6" />
          <div className="pull-quote">
            "Settlement is not a single application — it is a sequence of correct decisions over years."
          </div>
        </div>
        <div className="space-y-5">
          {[
            { k: "Skilled Stream", v: "Points-based assessment, occupation lists, employer sponsorship." },
            { k: "Family Reunification", v: "Spouse, parent and dependent-child pathways." },
            { k: "Investor & Business", v: "Capital, business establishment and entrepreneur routes." },
            { k: "Regional Programs", v: "Provincial / state nomination and regional incentives." },
          ].map((b, i) => (
            <div key={i} className="border-l-2 border-gold/60 pl-4">
              <div className="mono text-[0.65rem] tracking-[0.25em] uppercase text-gold-deep">{b.k}</div>
              <div className="text-sm text-graphite/80 mt-1.5 leading-relaxed">{b.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </PageFrame>
);

/* ========== 10 · STUDENT VISA ========== */
const P10_Student = () => (
  <PageFrame>
    <div className="h-full grid grid-cols-12">
      <div className="col-span-6 relative overflow-hidden">
        <img src={student} alt="Student walking through university courtyard" loading="lazy" className="w-full h-full object-cover" />
      </div>
      <div className="col-span-6 p-10 sm:p-14 flex flex-col justify-center">
        <Chapter n="10" title="Student Visa · Education" />
        <h2 className="display-2 text-navy mt-5">The application <em className="text-gold-deep">is a craft.</em></h2>
        <div className="hairline w-12 mt-6 mb-6" />
        <p className="text-graphite/80 leading-relaxed">
          From course selection and statement of purpose to financial evidence and visa interview — we treat the student application as the seriously curated submission it is.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 mono text-[0.65rem] tracking-[0.25em] uppercase">
          <div className="border border-page-rule p-3 text-graphite"><div className="text-gold-deep mb-1">01</div>Course mapping</div>
          <div className="border border-page-rule p-3 text-graphite"><div className="text-gold-deep mb-1">02</div>Institution liaison</div>
          <div className="border border-page-rule p-3 text-graphite"><div className="text-gold-deep mb-1">03</div>SOP & references</div>
          <div className="border border-page-rule p-3 text-graphite"><div className="text-gold-deep mb-1">04</div>Visa & funds</div>
        </div>
      </div>
    </div>
  </PageFrame>
);

/* ========== 11 · BUSINESS / INVESTOR ========== */
const P11_Business = () => (
  <PageFrame>
    <div className="h-full p-10 sm:p-14 flex flex-col">
      <Chapter n="11" title="Business · Investor Visa" />
      <h2 className="display-2 text-navy mt-5">Capital, <em className="text-gold-deep">on the move.</em></h2>
      <div className="hairline w-12 mt-6 mb-6" />
      <div className="grid sm:grid-cols-3 gap-8 flex-1">
        {[
          { n: "I", h: "Investor", b: "Government-approved capital programs with set thresholds and timelines." },
          { n: "II", h: "Entrepreneur", b: "Business establishment, innovation and start-up routes." },
          { n: "III", h: "Treaty / Significant Business", b: "High-value engagement with bilateral or regional eligibility." },
        ].map((c, i) => (
          <div key={i} className="flex flex-col border-t border-gold/40 pt-6">
            <span className="font-display text-5xl text-gold-deep">{c.n}</span>
            <h3 className="font-display text-2xl text-navy mt-4">{c.h}</h3>
            <p className="text-sm text-graphite/75 mt-3 leading-relaxed">{c.b}</p>
          </div>
        ))}
      </div>
      <p className="caption mt-8">All investor categories require legal & financial diligence — World Vision coordinates with licensed counsel where required.</p>
    </div>
  </PageFrame>
);

/* ========== 12 · FAMILY / VISIT ========== */
const P12_Family = () => (
  <PageFrame dark>
    <div className="h-full p-10 sm:p-14 grid grid-cols-12 gap-6">
      <div className="col-span-12 md:col-span-7 flex flex-col justify-center">
        <Chapter n="12" title="Family · Visit · Sponsorship" light />
        <h2 className="display-2 ivory mt-5">Bringing<br /><em className="text-gold">people</em> together.</h2>
        <div className="hairline w-12 mt-6 mb-6" />
        <p className="text-ivory/80 leading-relaxed max-w-md">
          Spouse and partner visas, parent reunification, dependent child sponsorship, and short-term visit categories. Each route demands its own evidentiary care — and is treated as such.
        </p>
      </div>
      <div className="col-span-12 md:col-span-5 flex flex-col gap-4 justify-center">
        {["Spouse · Partner","Parent · Family Reunion","Dependent Child","Visit · Tourist","Medical & Compassionate"].map((x, i) => (
          <div key={i} className="flex items-center justify-between border-b border-ivory/15 pb-3">
            <span className="font-display text-lg ivory">{x}</span>
            <span className="mono text-[0.6rem] tracking-widest uppercase text-gold-soft">{String(i + 1).padStart(2, "0")}</span>
          </div>
        ))}
      </div>
    </div>
  </PageFrame>
);

/* ========== 13 · EMPLOYER RECRUITMENT ========== */
const P13_Employer = () => (
  <PageFrame>
    <div className="h-full grid grid-cols-12">
      <div className="col-span-7 p-10 sm:p-14 flex flex-col">
        <Chapter n="13" title="Employer Recruitment Solutions" />
        <h2 className="display-2 text-navy mt-5">Hiring <em className="text-gold-deep">across borders.</em></h2>
        <div className="hairline w-12 mt-6 mb-6" />
        <p className="text-graphite/80 leading-relaxed max-w-lg">
          Our employer desk works with companies hiring foreign workers across skilled trades, professional and technical roles. We coordinate end-to-end — from role definition and candidate sourcing through to permit filing, mobilisation and arrival.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5">
          {[
            { n: "01", t: "Workforce Planning" },
            { n: "02", t: "Sourcing & Screening" },
            { n: "03", t: "Compliance & Filing" },
            { n: "04", t: "Mobilisation" },
          ].map((s) => (
            <div key={s.n} className="flex items-baseline gap-3">
              <span className="mono text-xs text-gold-deep">{s.n}</span>
              <span className="font-display text-base text-navy">{s.t}</span>
            </div>
          ))}
        </div>
        <div className="mt-auto pt-8 pull-quote text-base">A workforce is a long-term decision — we treat sourcing as such.</div>
      </div>
      <div className="col-span-5 relative overflow-hidden">
        <img src={handshake} alt="Employer partnership" loading="lazy" className="w-full h-full object-cover" />
      </div>
    </div>
  </PageFrame>
);

/* ========== 14 · INDUSTRIES ========== */
const P14_Industries = () => (
  <PageFrame>
    <div className="h-full p-10 sm:p-14 flex flex-col">
      <Chapter n="14" title="Industries We Serve" />
      <h2 className="display-2 text-navy mt-5">Sectors <em className="text-gold-deep">we know intimately.</em></h2>
      <div className="hairline w-12 mt-6 mb-8" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
        {[
          "Construction","Manufacturing","Hospitality","Healthcare",
          "Agriculture","Logistics","Retail","Skilled Trades",
        ].map((s, i) => (
          <div key={i} className="border border-page-rule p-5 flex flex-col justify-between min-h-[110px] hover:border-gold transition-colors">
            <span className="mono text-[0.65rem] tracking-[0.3em] uppercase text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
            <span className="font-display text-lg text-navy">{s}</span>
          </div>
        ))}
      </div>
      <p className="caption mt-6">Additional sectors served on request — including aviation, oil & gas, and education staffing.</p>
    </div>
  </PageFrame>
);

/* ========== 15 · GLOBAL COUNTRY NETWORK ========== */
const P15_Network = () => (
  <PageFrame dark>
    <div className="absolute inset-0">
      <img src={worldMap} alt="Global mobility network" loading="lazy" className="w-full h-full object-cover opacity-90" />
      <div className="absolute inset-0 bg-navy/40" />
    </div>
    <div className="relative h-full p-10 sm:p-14 flex flex-col justify-between">
      <div>
        <Chapter n="15" title="Global Network" light />
        <h2 className="display-2 ivory mt-5">A presence <em className="text-gold">in motion.</em></h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl">
        {[
          { r: "Europe", n: "12" },
          { r: "Australia · NZ", n: "02" },
          { r: "Middle East", n: "08" },
          { r: "Asia · SG", n: "10" },
        ].map((r, i) => (
          <div key={i} className="border-l border-gold/60 pl-4">
            <div className="font-display text-4xl ivory">{r.n}</div>
            <div className="mono text-[0.65rem] tracking-[0.25em] uppercase text-gold-soft mt-2">{r.r}</div>
          </div>
        ))}
      </div>
    </div>
  </PageFrame>
);

/* ========== 16 · EUROPE ========== */
const P16_Europe = () => (
  <PageFrame>
    <div className="h-full p-10 sm:p-14 flex flex-col">
      <Chapter n="16" title="Europe Destinations" />
      <h2 className="display-2 text-navy mt-5">Europe.</h2>
      <div className="hairline w-12 mt-6 mb-8" />
      <div className="grid sm:grid-cols-3 gap-4 flex-1">
        {[
          { c: "Germany", t: "Skilled, Healthcare" },
          { c: "Poland", t: "Trades, Manufacturing" },
          { c: "Portugal", t: "D7, Tech" },
          { c: "Romania", t: "Industrial" },
          { c: "Croatia", t: "Hospitality" },
          { c: "Hungary", t: "Manufacturing" },
          { c: "Czech Rep.", t: "Logistics, Industry" },
          { c: "Lithuania", t: "Trades" },
          { c: "Malta", t: "Investor, Service" },
        ].map((d, i) => (
          <div key={i} className="border border-page-rule p-4 flex flex-col">
            <div className="font-display text-xl text-navy">{d.c}</div>
            <div className="mono text-[0.6rem] tracking-[0.25em] uppercase text-gold-deep mt-2">{d.t}</div>
            <div className="hairline-soft mt-3" />
          </div>
        ))}
      </div>
      <p className="caption mt-6">Country availability changes with policy. Confirm current programs with an advisor.</p>
    </div>
  </PageFrame>
);

/* ========== 17 · AUSTRALIA & NZ ========== */
const P17_Anz = () => (
  <PageFrame>
    <div className="h-full grid grid-cols-12">
      <div className="col-span-7 p-10 sm:p-14 flex flex-col justify-center">
        <Chapter n="17" title="Australia · New Zealand" />
        <h2 className="display-2 text-navy mt-5">Pacific <em className="text-gold-deep">pathways.</em></h2>
        <div className="hairline w-12 mt-6 mb-6" />
        <p className="text-graphite/80 leading-relaxed max-w-md">
          Skilled migration, employer-nominated, regional, student and partner streams across both jurisdictions. We coordinate skills assessments, English testing logistics and points strategy.
        </p>
        <div className="mt-8 flex gap-10">
          <div><div className="stat-numeral">02</div><div className="mono text-[0.65rem] tracking-[0.25em] uppercase text-gold-deep mt-2">Jurisdictions</div></div>
          <div><div className="stat-numeral">15+</div><div className="mono text-[0.65rem] tracking-[0.25em] uppercase text-gold-deep mt-2">Visa Streams</div></div>
        </div>
      </div>
      <div className="col-span-5 relative overflow-hidden bg-navy">
        <img src={jetbridge} alt="" loading="lazy" className="w-full h-full object-cover" />
      </div>
    </div>
  </PageFrame>
);

/* ========== 18 · MIDDLE EAST ========== */
const P18_Me = () => (
  <PageFrame dark>
    <div className="h-full p-10 sm:p-14 flex flex-col">
      <Chapter n="18" title="Middle East" light />
      <h2 className="display-2 ivory mt-5">The Gulf <em className="text-gold">corridor.</em></h2>
      <div className="hairline w-12 mt-6 mb-10" />
      <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6 flex-1">
        {[
          { c: "United Arab Emirates", n: "01", t: "Skilled, Hospitality, Health" },
          { c: "Saudi Arabia", n: "02", t: "Industrial, Construction" },
          { c: "Qatar", n: "03", t: "Infrastructure, Services" },
          { c: "Oman", n: "04", t: "Trades, Logistics" },
          { c: "Bahrain", n: "05", t: "Finance, Hospitality" },
          { c: "Kuwait", n: "06", t: "Healthcare, Services" },
        ].map((d) => (
          <div key={d.c} className="flex items-baseline gap-5 border-b border-ivory/10 pb-4">
            <span className="mono text-xs text-gold-soft tabular-nums">{d.n}</span>
            <div className="flex-1">
              <div className="font-display text-xl ivory">{d.c}</div>
              <div className="mono text-[0.6rem] tracking-[0.25em] uppercase text-gold-soft mt-1">{d.t}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </PageFrame>
);

/* ========== 19 · ASIA / SINGAPORE ========== */
const P19_Asia = () => (
  <PageFrame>
    <div className="h-full p-10 sm:p-14 flex flex-col">
      <Chapter n="19" title="Asia · Singapore" />
      <h2 className="display-2 text-navy mt-5">Asia.</h2>
      <div className="hairline w-12 mt-6 mb-6" />
      <div className="grid sm:grid-cols-2 gap-12 flex-1">
        <div>
          <h3 className="font-display text-2xl text-navy">Singapore</h3>
          <p className="text-sm text-graphite/75 leading-relaxed mt-3">A premier hub for skilled professionals, technology and finance — Employment Pass, S Pass and ONE Pass routes.</p>
          <div className="hairline-soft mt-5" />
          <h3 className="font-display text-2xl text-navy mt-6">Japan</h3>
          <p className="text-sm text-graphite/75 leading-relaxed mt-3">Specified Skilled Worker, Highly Skilled Professional and Technical Intern programs.</p>
        </div>
        <div>
          <h3 className="font-display text-2xl text-navy">South Korea</h3>
          <p className="text-sm text-graphite/75 leading-relaxed mt-3">E-7 specialised, E-9 non-professional and seasonal worker routes by sector.</p>
          <div className="hairline-soft mt-5" />
          <h3 className="font-display text-2xl text-navy mt-6">Malaysia</h3>
          <p className="text-sm text-graphite/75 leading-relaxed mt-3">Employment Pass, professional visit pass and DE Rantau digital nomad.</p>
        </div>
      </div>
    </div>
  </PageFrame>
);

/* ========== 20 · CANDIDATE JOURNEY ========== */
const P20_CandidateJourney = () => (
  <PageFrame>
    <div className="h-full p-10 sm:p-14 flex flex-col">
      <Chapter n="20" title="Candidate Journey" />
      <h2 className="display-2 text-navy mt-5">From registration to <em className="text-gold-deep">departure.</em></h2>
      <div className="hairline w-12 mt-6 mb-10" />
      <div className="relative flex-1">
        <div className="absolute left-3 top-2 bottom-2 w-px bg-gold/40" />
        {[
          { n: "01", t: "Registration & assessment", d: "Profile, documents, eligibility review." },
          { n: "02", t: "Employer matching & offer", d: "Sourcing, interview, contract review." },
          { n: "03", t: "Permit application", d: "Filing, follow-up, status tracking." },
          { n: "04", t: "Medical & document compliance", d: "Health checks, certifications, attestations." },
          { n: "05", t: "Pre-departure briefing", d: "Travel, currency, culture and arrival." },
          { n: "06", t: "Arrival & settlement", d: "On-ground reception and reporting." },
        ].map((s) => (
          <div key={s.n} className="relative pl-12 pb-5">
            <div className="absolute left-0 top-1 w-6 h-6 border border-gold flex items-center justify-center bg-page">
              <span className="mono text-[0.55rem] text-gold-deep">{s.n}</span>
            </div>
            <div className="font-display text-lg text-navy">{s.t}</div>
            <div className="text-sm text-graphite/70 mt-1">{s.d}</div>
          </div>
        ))}
      </div>
    </div>
  </PageFrame>
);

/* ========== 21 · EMPLOYER JOURNEY ========== */
const P21_EmployerJourney = () => (
  <PageFrame dark>
    <div className="h-full p-10 sm:p-14 flex flex-col">
      <Chapter n="21" title="Employer Recruitment Journey" light />
      <h2 className="display-2 ivory mt-5">A workforce, <em className="text-gold">delivered.</em></h2>
      <div className="hairline w-12 mt-6 mb-10" />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 flex-1">
        {[
          { n: "I", t: "Discovery", d: "Role, volume, timeline." },
          { n: "II", t: "Sourcing", d: "Profile shortlists." },
          { n: "III", t: "Selection", d: "Interviews & offers." },
          { n: "IV", t: "Compliance", d: "Permit & medical." },
          { n: "V", t: "Mobilisation", d: "Travel & arrival." },
        ].map((s) => (
          <div key={s.n} className="border-t border-gold/40 pt-4">
            <div className="font-display text-3xl ivory">{s.n}</div>
            <div className="mono text-[0.6rem] tracking-[0.25em] uppercase text-gold-soft mt-3">{s.t}</div>
            <div className="text-sm text-ivory/70 mt-2">{s.d}</div>
          </div>
        ))}
      </div>
    </div>
  </PageFrame>
);

/* ========== 22 · DOC PREP ========== */
const P22_Docs = () => (
  <PageFrame>
    <div className="h-full grid grid-cols-12">
      <div className="col-span-5 relative overflow-hidden">
        <img src={passportStill} alt="Document still life" loading="lazy" className="w-full h-full object-cover" />
      </div>
      <div className="col-span-7 p-10 sm:p-14 flex flex-col">
        <Chapter n="22" title="Document Preparation · Compliance" />
        <h2 className="display-2 text-navy mt-5">The dossier <em className="text-gold-deep">decides.</em></h2>
        <div className="hairline w-12 mt-6 mb-6" />
        <p className="text-graphite/80 leading-relaxed">
          Most refusals are evidentiary. Our compliance desk pre-audits every application — translations, attestations, source-of-funds, employer letters, education evaluations — before submission.
        </p>
        <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
          {["Translations","Attestations","Source of funds","Employer letters","Police clearances","Education evaluation","Medicals","Biometrics"].map((x, i) => (
            <li key={i} className="border-l border-gold/40 pl-3 text-graphite/80">{x}</li>
          ))}
        </ul>
      </div>
    </div>
  </PageFrame>
);

/* ========== 23 · TECH PORTAL ========== */
const P23_Tech = () => (
  <PageFrame>
    <div className="h-full p-10 sm:p-14 flex flex-col">
      <Chapter n="23" title="Technology · Client Portal" />
      <h2 className="display-2 text-navy mt-5">Track every <em className="text-gold-deep">step.</em></h2>
      <div className="hairline w-12 mt-6 mb-8" />
      <div className="grid sm:grid-cols-2 gap-10 flex-1">
        <div>
          <p className="text-graphite/80 leading-relaxed">
            Candidates and employers access a unified portal with case status, document checklists, secure messaging and visa milestone tracking — accessible from any device.
          </p>
          <div className="mt-6 space-y-3">
            {[
              "Real-time case status",
              "Document checklist & uploads",
              "Secure messaging with advisors",
              "Visa milestone tracker",
              "Multi-language interface",
            ].map((x, i) => (
              <div key={i} className="flex items-baseline gap-3 text-sm">
                <span className="mono text-xs text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-graphite/85">{x}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Mock portal screen */}
        <div className="relative bg-navy aspect-[4/3] overflow-hidden shadow-elegant rounded-sm">
          <div className="absolute inset-0 p-4 text-ivory text-[0.55rem] mono">
            <div className="flex items-center justify-between border-b border-ivory/10 pb-2">
              <span className="text-gold-soft">WVC Portal</span>
              <span>● Live</span>
            </div>
            <div className="mt-3 space-y-2">
              {[{t:"Application filed",s:"complete"},{t:"Medical scheduled",s:"complete"},{t:"Permit decision",s:"active"},{t:"Travel & arrival",s:"pending"}].map((r,i)=>(
                <div key={i} className="flex items-center gap-2">
                  <span className={`w-2 h-2 ${r.s==="complete"?"bg-gold":r.s==="active"?"bg-ivory animate-pulse":"bg-ivory/20"}`} />
                  <span className="flex-1">{r.t}</span>
                  <span className="text-ivory/40">{r.s}</span>
                </div>
              ))}
            </div>
            <div className="absolute bottom-3 left-4 right-4 h-1 bg-ivory/10"><div className="h-full w-2/3 bg-gold" /></div>
          </div>
        </div>
      </div>
    </div>
  </PageFrame>
);

/* ========== 24 · WHY CHOOSE US ========== */
const P24_Why = () => (
  <PageFrame>
    <div className="h-full p-10 sm:p-14 flex flex-col">
      <Chapter n="24" title="Why Choose Us" />
      <h2 className="display-2 text-navy mt-5">Quiet <em className="text-gold-deep">competence.</em></h2>
      <div className="hairline w-12 mt-6 mb-10" />
      <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8 flex-1">
        {[
          { t: "Integrated practice", d: "Immigration, recruitment, education and compliance under one roof — fewer handoffs, less friction." },
          { t: "Documented process", d: "Every case follows a written workflow with audit-quality records." },
          { t: "Honest counsel", d: "We do not promise outcomes. We coordinate process and prepare you for it." },
          { t: "Global desk", d: "Coverage across multiple time zones with native-language case officers." },
        ].map((b, i) => (
          <div key={i} className="border-t border-page-rule pt-5">
            <span className="mono text-xs text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="font-display text-2xl text-navy mt-2">{b.t}</h3>
            <p className="text-sm text-graphite/75 mt-3 leading-relaxed">{b.d}</p>
          </div>
        ))}
      </div>
    </div>
  </PageFrame>
);

/* ========== 25 · PERFORMANCE ========== */
const P25_Metrics = () => (
  <PageFrame dark>
    <div className="h-full p-10 sm:p-14 flex flex-col">
      <Chapter n="25" title="Performance · Sample Data" light />
      <h2 className="display-2 ivory mt-5">Performance.</h2>
      <p className="mono text-[0.6rem] tracking-[0.3em] uppercase text-gold-soft/80 mt-3">Sample / Demo Figures — Pending Verification</p>
      <div className="hairline w-12 mt-6 mb-10" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 flex-1">
        {[
          { n: "98%", l: "On-time filing" },
          { n: "12d", l: "Avg. case opening" },
          { n: "40", l: "Destination countries" },
          { n: "24h", l: "Advisor response (avg.)" },
        ].map((m, i) => (
          <div key={i} className="border-t border-gold/40 pt-5">
            <div className="stat-numeral stat-numeral-ivory">{m.n}</div>
            <div className="mono text-[0.65rem] tracking-[0.25em] uppercase text-gold-soft mt-3">{m.l}</div>
          </div>
        ))}
      </div>
      <p className="caption text-ivory/60 mt-6">These are illustrative figures provided for layout purposes only.</p>
    </div>
  </PageFrame>
);

/* ========== 26 · CASE STUDY 1 — WORKER ========== */
const P26_CaseWorker = () => (
  <PageFrame>
    <div className="h-full grid grid-cols-12">
      <div className="col-span-5 relative overflow-hidden">
        <img src={workers} alt="" loading="lazy" className="w-full h-full object-cover" />
        <div className="absolute bottom-4 left-4 right-4 bg-navy/85 p-3">
          <div className="mono text-[0.6rem] tracking-[0.25em] uppercase text-gold-soft">Case Study · 01</div>
          <div className="font-display ivory text-xl mt-1">Worker placement</div>
        </div>
      </div>
      <div className="col-span-7 p-10 sm:p-14 flex flex-col">
        <Chapter n="26" title="Case Study · Worker Placement" />
        <h2 className="display-3 text-navy mt-5">A team of <em className="text-gold-deep">42 placed in 9 weeks.</em></h2>
        <p className="caption mt-3">Illustrative scenario — composite of typical engagements.</p>
        <div className="hairline w-10 mt-5 mb-5" />
        <p className="text-graphite/80 leading-relaxed text-sm">
          A regional construction firm needed forty-two skilled tradespeople for a stadium project. Working with their HR team, we ran a structured screening of three hundred candidates, coordinated employer interviews on-ground, and handled the full permit and mobilisation workflow.
        </p>
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[{n:"42",l:"Placed"},{n:"9w",l:"Cycle"},{n:"3",l:"Trades"}].map(s => (
            <div key={s.n}><div className="font-display text-3xl text-navy">{s.n}</div><div className="mono text-[0.6rem] tracking-widest uppercase text-gold-deep mt-1">{s.l}</div></div>
          ))}
        </div>
        <p className="caption mt-auto pt-6">Demo content — replace with verified case once cleared by client.</p>
      </div>
    </div>
  </PageFrame>
);

/* ========== 27 · CASE STUDY 2 — STUDENT/IMMIGRATION ========== */
const P27_CaseStudent = () => (
  <PageFrame>
    <div className="h-full grid grid-cols-12">
      <div className="col-span-7 p-10 sm:p-14 flex flex-col">
        <Chapter n="27" title="Case Study · Student & Immigration" />
        <h2 className="display-3 text-navy mt-5">From a small town to <em className="text-gold-deep">a doctoral lab.</em></h2>
        <p className="caption mt-3">Illustrative scenario — names anonymised.</p>
        <div className="hairline w-10 mt-5 mb-5" />
        <p className="text-graphite/80 leading-relaxed text-sm">
          A first-generation graduate joined us at the postgraduate selection stage. We mapped course options, supported statement and reference work, secured offer letters from two institutions, and coordinated the visa and funding evidence. Three years later, the candidate is on a post-study work pathway toward permanent residency.
        </p>
        <div className="mt-6 pull-quote text-sm">"They did not promise an outcome. They prepared us for the right one."</div>
        <div className="caption mt-2">— Candidate Family</div>
      </div>
      <div className="col-span-5 relative overflow-hidden">
        <img src={portraitCandidate} alt="Candidate portrait" loading="lazy" className="w-full h-full object-cover" />
      </div>
    </div>
  </PageFrame>
);

/* ========== 28 · PARTNER NETWORK ========== */
const P28_Partners = () => (
  <PageFrame>
    <div className="h-full p-10 sm:p-14 flex flex-col">
      <Chapter n="28" title="Partner · Employer Network" />
      <h2 className="display-2 text-navy mt-5">Our network.</h2>
      <div className="hairline w-12 mt-6 mb-8" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="border border-page-rule aspect-[3/2] flex flex-col items-center justify-center text-center">
            <span className="font-display text-xl text-navy/40">Partner {String(i + 1).padStart(2, "0")}</span>
            <span className="mono text-[0.55rem] tracking-widest uppercase text-gold-deep mt-2">Logo placeholder</span>
          </div>
        ))}
      </div>
      <p className="caption mt-6">Editable placeholders — replace with verified partner identities and logos.</p>
    </div>
  </PageFrame>
);

/* ========== 29 · TESTIMONIALS ========== */
const P29_Testimonials = () => (
  <PageFrame dark>
    <div className="h-full p-10 sm:p-14 flex flex-col">
      <Chapter n="29" title="Client Testimonials" light />
      <h2 className="display-2 ivory mt-5">In their words.</h2>
      <div className="hairline w-12 mt-6 mb-10" />
      <div className="grid sm:grid-cols-2 gap-10 flex-1">
        {[
          { q: "Calm, methodical, and exceptionally well-prepared. We have entrusted three rounds of recruitment to their team.", a: "HR Director · Construction Group", region: "Middle East" },
          { q: "They were the only firm who declined to promise an outcome — and the only one who delivered the right process.", a: "Engineering Graduate", region: "Europe" },
          { q: "The portal alone is worth the engagement. We always knew where each application stood.", a: "Operations Lead · Hospitality", region: "Asia" },
          { q: "From the consultation to the arrival call, every step had a name and a date.", a: "Family Sponsorship Client", region: "Australia" },
        ].map((t, i) => (
          <figure key={i} className="border-t border-gold/40 pt-5">
            <blockquote className="font-display italic text-lg ivory leading-snug">"{t.q}"</blockquote>
            <figcaption className="mt-4 flex items-baseline gap-3 mono text-[0.6rem] tracking-[0.25em] uppercase">
              <span className="text-gold-soft">{t.a}</span>
              <span className="text-ivory/40">·</span>
              <span className="text-ivory/60">{t.region}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="caption text-ivory/55 mt-6">Composite testimonials — replace with verified client statements upon consent.</p>
    </div>
  </PageFrame>
);

/* ========== 30 · GROWTH ROADMAP ========== */
const P30_Roadmap = () => (
  <PageFrame dark>
    <div className="absolute inset-0">
      <img src={roadmap} alt="" loading="lazy" className="w-full h-full object-cover opacity-80" />
      <div className="absolute inset-0 bg-navy/60" />
    </div>
    <div className="relative h-full p-10 sm:p-14 flex flex-col">
      <Chapter n="30" title="2026 → 2030 Roadmap" light />
      <h2 className="display-2 ivory mt-5">The next <em className="text-gold">five years.</em></h2>
      <div className="hairline w-12 mt-6 mb-10" />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 flex-1">
        {[
          { y: "2026", t: "Edition launch", d: "Publication & platform roll-out." },
          { y: "2027", t: "New desks", d: "Three additional country desks." },
          { y: "2028", t: "Portal v2", d: "Integrated employer console." },
          { y: "2029", t: "Partner program", d: "Verified affiliate network." },
          { y: "2030", t: "Education arm", d: "Direct institution partnerships." },
        ].map((m, i) => (
          <div key={i} className="border-t border-gold/40 pt-4">
            <div className="font-display text-2xl ivory">{m.y}</div>
            <div className="mono text-[0.6rem] tracking-[0.25em] uppercase text-gold-soft mt-2">{m.t}</div>
            <div className="text-sm text-ivory/70 mt-2">{m.d}</div>
          </div>
        ))}
      </div>
      <p className="caption text-ivory/60 mt-6">Roadmap is directional — milestones subject to change.</p>
    </div>
  </PageFrame>
);

/* ========== 31 · CONTACT & LEAD GENERATION ========== */
const P31_Contact = ({ onConsult }: { onConsult: () => void }) => (
  <PageFrame>
    <div className="h-full p-10 sm:p-14 flex flex-col">
      <Chapter n="31" title="Contact · Consultation" />
      <h2 className="display-2 text-navy mt-5">Speak with <em className="text-gold-deep">our team.</em></h2>
      <div className="hairline w-12 mt-6 mb-8" />
      <div className="grid sm:grid-cols-2 gap-10 flex-1">
        <div>
          <div className="space-y-5 text-sm">
            <div>
              <div className="mono text-[0.6rem] tracking-[0.3em] uppercase text-gold-deep">Email</div>
              <a href="mailto:hello@worldvision.example" className="font-display text-xl text-navy hover:text-gold-deep transition-colors">hello@worldvision.example</a>
            </div>
            <div>
              <div className="mono text-[0.6rem] tracking-[0.3em] uppercase text-gold-deep">Phone</div>
              <a href="tel:+10000000000" className="font-display text-xl text-navy hover:text-gold-deep transition-colors">+1 000 000 0000</a>
            </div>
            <div>
              <div className="mono text-[0.6rem] tracking-[0.3em] uppercase text-gold-deep">WhatsApp</div>
              <a href="https://wa.me/10000000000" className="font-display text-xl text-navy hover:text-gold-deep transition-colors">Chat with an advisor</a>
            </div>
            <div>
              <div className="mono text-[0.6rem] tracking-[0.3em] uppercase text-gold-deep">Office</div>
              <div className="font-display text-base text-navy leading-relaxed">Editable placeholder address<br />City · Country</div>
            </div>
          </div>
        </div>
        <div className="bg-navy text-ivory p-8 flex flex-col">
          <div className="eyebrow eyebrow-ivory">Book a 30-min consultation</div>
          <h3 className="font-display text-2xl ivory mt-3">Your global future starts with a conversation.</h3>
          <p className="text-ivory/75 mt-4 text-sm leading-relaxed">
            Share your goals and an advisor will get in touch within one business day. All inquiries are confidential.
          </p>
          <div className="mt-auto pt-6 flex flex-col gap-3">
            <button onClick={onConsult} className="btn-gold w-full">Request Consultation</button>
            <a href="mailto:hello@worldvision.example" className="btn-luxe-outline w-full text-center">Email instead</a>
          </div>
        </div>
      </div>
    </div>
  </PageFrame>
);

/* ========== 32 · BACK COVER ========== */
const P32_Back = () => (
  <div className="relative w-full h-full overflow-hidden bg-navy">
    <img src={backCoverImg} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, hsl(213 60% 8% / 0.7) 0%, hsl(213 60% 8% / 0.95) 100%)" }} />
    <div className="relative h-full flex flex-col justify-between p-10 sm:p-14 text-center">
      <div className="mono text-[0.65rem] tracking-[0.3em] uppercase text-gold-soft">World Vision Consultancy · 2026</div>
      <div>
        <h2 className="font-display ivory leading-[0.95]" style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}>
          Your <em className="text-gold not-italic">global future</em><br />starts here.
        </h2>
        <div className="hairline w-16 mx-auto mt-8" />
        <p className="text-ivory/75 mt-6 max-w-md mx-auto leading-relaxed">
          For consultation, recruitment partnership, or to begin a candidate journey — get in touch with our team.
        </p>
      </div>
      <div className="mono text-[0.6rem] tracking-[0.3em] uppercase text-ivory/40">End of Edition · Volume One</div>
    </div>
  </div>
);

/* ============================================================
   EXPORT — ordered array of 32 pages + titles
   ============================================================ */

export const PAGE_TITLES = [
  "Cover",
  "Opening Manifesto",
  "About World Vision Consultancy",
  "Mission · Vision · Values",
  "Message from the Managing Director",
  "Company at a Glance",
  "Global Service Overview",
  "Work Permit · Overseas Employment",
  "Immigration · Permanent Residency",
  "Student Visa · International Education",
  "Business · Investor Visa",
  "Family · Visit · Sponsorship",
  "Employer Recruitment Solutions",
  "Industries We Serve",
  "Global Country Network",
  "Europe Destinations",
  "Australia · New Zealand",
  "Middle East Destinations",
  "Asia · Singapore",
  "Candidate Journey",
  "Employer Recruitment Journey",
  "Document Preparation · Compliance",
  "Technology · Client Portal",
  "Why Choose Us",
  "Performance · Sample Metrics",
  "Case Study · Worker Placement",
  "Case Study · Student & Immigration",
  "Partner · Employer Network",
  "Client Testimonials",
  "2026 → 2030 Growth Roadmap",
  "Contact · Lead Generation",
  "Back Cover",
];

export function buildPages(onConsult: () => void): ReactNode[] {
  return [
    <P01_Cover />, <P02_Manifesto />, <P03_About />, <P04_MVV />,
    <P05_Director />, <P06_Glance />, <P07_Services />, <P08_WorkPermit />,
    <P09_PR />, <P10_Student />, <P11_Business />, <P12_Family />,
    <P13_Employer />, <P14_Industries />, <P15_Network />, <P16_Europe />,
    <P17_Anz />, <P18_Me />, <P19_Asia />, <P20_CandidateJourney />,
    <P21_EmployerJourney />, <P22_Docs />, <P23_Tech />, <P24_Why />,
    <P25_Metrics />, <P26_CaseWorker />, <P27_CaseStudent />, <P28_Partners />,
    <P29_Testimonials />, <P30_Roadmap />, <P31_Contact onConsult={onConsult} />, <P32_Back />,
  ];
}
