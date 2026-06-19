import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, ArrowRight } from "lucide-react";
import coverSkyline from "@/assets/cover-skyline.jpg";
import passportStill from "@/assets/passport-stilllife.jpg";
import worldMap from "@/assets/world-map.jpg";
import workers from "@/assets/workers.jpg";
import student from "@/assets/student.jpg";
import handshake from "@/assets/handshake.jpg";
import boardroom from "@/assets/boardroom.jpg";

interface Publication {
  slug: string;
  title: string;
  category: string;
  language: string;
  date: string;
  description: string;
  cover: string;
  primary?: boolean;
}

const CATEGORIES = ["All", "Company Profile", "Country Visa Guides", "Recruitment Catalogues", "Employer Brochures", "Student Visa Guides", "Annual Reports", "Client Checklists"];

const PUBLICATIONS: Publication[] = [
  { slug: "2026-edition", title: "World Vision Consultancy — 2026 Edition", category: "Company Profile", language: "English", date: "Jan 2026", description: "Our flagship 32-page publication: services, country network, journeys and case studies.", cover: coverSkyline, primary: true },
  { slug: "europe-guide-2026", title: "Europe Destinations · Visa Guide", category: "Country Visa Guides", language: "English", date: "Feb 2026", description: "An editorial guide to Europe destinations and pathways.", cover: passportStill },
  { slug: "global-network", title: "Global Country Network", category: "Country Visa Guides", language: "English", date: "Feb 2026", description: "An overview of countries we operate in.", cover: worldMap },
  { slug: "skilled-trades", title: "Skilled Trades · Recruitment Catalogue", category: "Recruitment Catalogues", language: "English", date: "Mar 2026", description: "Available trades, sectors and timelines.", cover: workers },
  { slug: "employer-brochure", title: "Employer Partnership Brochure", category: "Employer Brochures", language: "English", date: "Mar 2026", description: "Workforce planning to mobilisation.", cover: handshake },
  { slug: "student-guide", title: "Student Visa & International Education", category: "Student Visa Guides", language: "English", date: "Feb 2026", description: "Course mapping to visa issuance.", cover: student },
  { slug: "annual-2025", title: "Annual Report · 2025", category: "Annual Reports", language: "English", date: "Dec 2025", description: "Year in review — placeholder.", cover: boardroom },
  { slug: "client-checklist", title: "Candidate Document Checklist", category: "Client Checklists", language: "English", date: "Jan 2026", description: "Document preparation checklist.", cover: passportStill },
];

export default function Bookshelf() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const filtered = PUBLICATIONS.filter((p) =>
    (cat === "All" || p.category === cat) &&
    (q === "" || p.title.toLowerCase().includes(q.toLowerCase()) || p.description.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <>
      <Helmet>
        <title>Virtual Bookshelf — World Vision Consultancy</title>
        <meta name="description" content="Browse publications from World Vision Consultancy — company profile, visa guides, recruitment catalogues and more." />
        <link rel="canonical" href="/bookshelf" />
      </Helmet>

      <div className="min-h-screen bg-ivory text-graphite">
        <header className="px-6 sm:px-10 py-6 border-b border-page-rule">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
            <BrandLogo variant="navy" />
            <Link to="/" className="mono text-[0.65rem] tracking-[0.3em] uppercase text-navy hover:text-gold-deep transition-colors">← Home</Link>
          </div>
        </header>

        <section className="max-w-7xl mx-auto px-6 sm:px-10 py-16">
          <div className="eyebrow">Virtual Bookshelf</div>
          <h1 className="font-display text-navy mt-3 leading-tight" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
            Our <em className="text-gold-deep">publications.</em>
          </h1>
          <div className="hairline w-16 mt-6" />

          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-[240px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-graphite/50" size={16} />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search publications…" className="pl-9 border-graphite/20 bg-transparent" maxLength={120}/>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`px-3 py-1.5 mono text-[0.6rem] tracking-[0.25em] uppercase border transition-colors ${cat === c ? "bg-navy text-ivory border-navy" : "border-page-rule text-graphite hover:border-gold hover:text-gold-deep"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p) => (
              <article key={p.slug} className="group bg-page border border-page-rule hover:border-gold hover:shadow-elegant transition-all flex flex-col">
                <div className="relative aspect-[3/4] overflow-hidden bg-navy">
                  <img src={p.cover} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                  {p.primary && (
                    <div className="absolute top-3 left-3 mono text-[0.55rem] tracking-[0.3em] uppercase bg-gold text-navy px-2 py-1">Flagship</div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="mono text-[0.6rem] tracking-[0.3em] uppercase text-gold-deep">{p.category}</div>
                  <h3 className="font-display text-xl text-navy mt-2 leading-snug">{p.title}</h3>
                  <p className="text-sm text-graphite/70 mt-3 leading-relaxed flex-1">{p.description}</p>
                  <div className="hairline-soft my-4" />
                  <div className="flex items-center justify-between text-[0.65rem] mono tracking-widest uppercase text-graphite/60">
                    <span>{p.language}</span>
                    <span>{p.date}</span>
                  </div>
                  <Link to={p.primary ? "/read" : "/read"} className="btn-luxe mt-5 inline-flex justify-center"><BookOpen size={14}/> Open <ArrowRight size={14}/></Link>
                </div>
              </article>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full text-center py-16 text-graphite/50">No publications match your search.</div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
