import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Flipbook } from "@/components/Flipbook";
import { ConsultationModal } from "@/components/ConsultationModal";
import { ShareMenu } from "@/components/ShareMenu";
import { buildPages, PAGE_TITLES } from "@/components/pages/AllPages";
import { startReaderSession } from "@/lib/analytics";

export default function Read() {
  const navigate = useNavigate();
  const [consultOpen, setConsultOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => { startReaderSession(); }, []);

  const pages = useMemo(() => buildPages(() => setConsultOpen(true)), []);

  return (
    <>
      <Helmet>
        <title>The 2026 Edition — World Vision Consultancy</title>
        <meta name="description" content="Read the 32-page interactive publication from World Vision Consultancy." />
        <link rel="canonical" href="/read" />
      </Helmet>
      <Flipbook
        pages={pages}
        pageTitles={PAGE_TITLES}
        onClose={() => navigate("/")}
        onShare={() => setShareOpen(true)}
      />
      <ConsultationModal open={consultOpen} onOpenChange={setConsultOpen} />
      <ShareMenu open={shareOpen} onOpenChange={setShareOpen} />
    </>
  );
}
