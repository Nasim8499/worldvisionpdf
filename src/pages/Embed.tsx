import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Flipbook } from "@/components/Flipbook";
import { ConsultationModal } from "@/components/ConsultationModal";
import { buildPages, PAGE_TITLES } from "@/components/pages/AllPages";

/* Embeddable viewer — clean, iframe-ready.
   Supported query: ?page=N (1-based), ?toolbar=0 to hide */
export default function Embed() {
  const [params] = useSearchParams();
  const startPage = Math.max(1, Math.min(32, parseInt(params.get("page") || "1", 10))) - 1;
  const showToolbar = params.get("toolbar") !== "0";
  const [consultOpen, setConsultOpen] = useState(false);

  // shift body bg + remove margin for embed
  useEffect(() => {
    document.body.style.background = "hsl(213 60% 8%)";
    document.body.style.margin = "0";
  }, []);

  const pages = useMemo(() => buildPages(() => setConsultOpen(true)), []);
  // Slice from startPage: we wrap the Flipbook by passing reorganized array
  const reordered = useMemo(() => startPage === 0 ? pages : [...pages.slice(startPage), ...pages.slice(0, startPage)], [pages, startPage]);
  const titlesReordered = useMemo(() => startPage === 0 ? PAGE_TITLES : [...PAGE_TITLES.slice(startPage), ...PAGE_TITLES.slice(0, startPage)], [startPage]);

  return (
    <>
      <Helmet>
        <title>Embedded Publication — World Vision Consultancy</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Flipbook pages={reordered} pageTitles={titlesReordered} />
      {!showToolbar && <style>{`header { display: none !important; }`}</style>}
      <ConsultationModal open={consultOpen} onOpenChange={setConsultOpen} />
    </>
  );
}
