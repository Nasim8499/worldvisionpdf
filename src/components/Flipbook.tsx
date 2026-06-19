import { useEffect, useRef, useState, useCallback, ReactNode } from "react";
import { ChevronLeft, ChevronRight, X, BookOpen, Volume2, VolumeX, Maximize2, Minimize2, ZoomIn, ZoomOut, LayoutGrid, List, Share2 } from "lucide-react";
import { trackPageView } from "@/lib/analytics";

interface FlipbookProps {
  pages: ReactNode[];
  pageTitles: string[];
  onClose?: () => void;
  onShare?: () => void;
}

const FLIP_MS = 800;

export function Flipbook({ pages, pageTitles, onClose, onShare }: FlipbookProps) {
  const [index, setIndex] = useState(0);
  const [isSpread, setIsSpread] = useState(false);
  const [flipping, setFlipping] = useState<null | "next" | "prev">(null);
  const [flipProgress, setFlipProgress] = useState(0); // 0..1 for drag
  const [thumbsOpen, setThumbsOpen] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dragRef = useRef<{ startX: number; dx: number; active: boolean } | null>(null);

  const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Responsive: spread on >= 1024px
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setIsSpread(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Init page-turn sound (synth fallback — uses WebAudio)
  useEffect(() => {
    audioRef.current = new Audio("data:audio/wav;base64,UklGRjQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YRAAAAAAAAAAAAAAAAAAAAAAAAA=");
    return () => { audioRef.current = null; };
  }, []);

  const playFlipSound = useCallback(() => {
    if (!soundOn) return;
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "triangle";
      o.frequency.setValueAtTime(280, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.25);
      g.gain.setValueAtTime(0.0001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
      o.connect(g); g.connect(ctx.destination);
      o.start(); o.stop(ctx.currentTime + 0.4);
    } catch {}
  }, [soundOn]);

  const total = pages.length;

  // Compute visible pages
  const { leftIndex, rightIndex } = computeVisible(index, total, isSpread);

  const canNext = isSpread ? rightIndex !== null && rightIndex < total - 1 : index < total - 1;
  const canPrev = index > 0;

  const goNext = useCallback(() => {
    if (!canNext || flipping) return;
    playFlipSound();
    setFlipping("next");
    setTimeout(() => {
      setIndex((i) => Math.min(total - 1, isSpread ? i + 2 : i + 1));
      setFlipping(null);
      setFlipProgress(0);
    }, reducedMotion ? 100 : FLIP_MS);
  }, [canNext, flipping, isSpread, total, playFlipSound, reducedMotion]);

  const goPrev = useCallback(() => {
    if (!canPrev || flipping) return;
    playFlipSound();
    setFlipping("prev");
    setTimeout(() => {
      setIndex((i) => Math.max(0, isSpread ? i - 2 : i - 1));
      setFlipping(null);
      setFlipProgress(0);
    }, reducedMotion ? 100 : FLIP_MS);
  }, [canPrev, flipping, isSpread, playFlipSound, reducedMotion]);

  const jumpTo = useCallback((target: number) => {
    const clamped = Math.max(0, Math.min(total - 1, target));
    setIndex(isSpread && clamped > 0 ? (clamped % 2 === 0 ? clamped : clamped - 1) : clamped);
    setThumbsOpen(false); setTocOpen(false);
  }, [isSpread, total]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") { e.preventDefault(); goNext(); }
      else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); goPrev(); }
      else if (e.key === "Home") jumpTo(0);
      else if (e.key === "End") jumpTo(total - 1);
      else if (e.key === "Escape") { setThumbsOpen(false); setTocOpen(false); }
      else if (e.key === "f" || e.key === "F") toggleFullscreen();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goNext, goPrev, jumpTo, total]);

  // Track page view
  useEffect(() => {
    trackPageView(index + 1);
    if (isSpread && rightIndex !== null && rightIndex !== index) trackPageView(rightIndex + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, isSpread]);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await containerRef.current?.requestFullscreen();
        setFullscreen(true);
      } else {
        await document.exitFullscreen();
        setFullscreen(false);
      }
    } catch {}
  };

  // Drag/swipe
  const onPointerDown = (e: React.PointerEvent) => {
    if (flipping) return;
    dragRef.current = { startX: e.clientX, dx: 0, active: true };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current?.active) return;
    const dx = e.clientX - dragRef.current.startX;
    dragRef.current.dx = dx;
    const w = containerRef.current?.clientWidth ?? 800;
    setFlipProgress(Math.max(-1, Math.min(1, dx / (w / 2))));
  };
  const onPointerUp = () => {
    if (!dragRef.current?.active) return;
    const dx = dragRef.current.dx;
    dragRef.current.active = false;
    if (dx < -80) goNext();
    else if (dx > 80) goPrev();
    else setFlipProgress(0);
  };

  // Click corners
  const onPageClick = (which: "left" | "right") => () => {
    if (which === "right") goNext(); else goPrev();
  };

  const progress = ((index + 1) / total) * 100;

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 bg-navy flex flex-col" role="dialog" aria-label="Publication reader">
      {/* TOP TOOLBAR */}
      <header className="flex items-center justify-between gap-4 px-3 sm:px-6 py-3 border-b border-ivory/10 bg-navy/95 backdrop-blur">
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={onClose} className="text-ivory/80 hover:text-gold transition-colors p-2" aria-label="Close reader">
            <X size={20} />
          </button>
          <div className="hidden sm:block min-w-0">
            <div className="mono text-[0.6rem] tracking-[0.25em] uppercase text-gold-soft">World Vision Consultancy</div>
            <div className="font-display text-ivory text-sm truncate">{pageTitles[index] ?? `Page ${index + 1}`}</div>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 text-ivory/80">
          <button onClick={() => setTocOpen((v) => !v)} className="p-2 hover:text-gold transition-colors" aria-label="Table of contents"><List size={18} /></button>
          <button onClick={() => setThumbsOpen((v) => !v)} className="p-2 hover:text-gold transition-colors" aria-label="Page thumbnails"><LayoutGrid size={18} /></button>
          <button onClick={() => setZoom((z) => Math.max(0.7, z - 0.1))} className="p-2 hover:text-gold transition-colors hidden sm:inline-flex" aria-label="Zoom out"><ZoomOut size={18} /></button>
          <button onClick={() => setZoom((z) => Math.min(1.5, z + 0.1))} className="p-2 hover:text-gold transition-colors hidden sm:inline-flex" aria-label="Zoom in"><ZoomIn size={18} /></button>
          <button onClick={() => setSoundOn((v) => !v)} className="p-2 hover:text-gold transition-colors" aria-label={soundOn ? "Mute page turn" : "Enable page turn sound"}>
            {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <button onClick={toggleFullscreen} className="p-2 hover:text-gold transition-colors hidden sm:inline-flex" aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"}>
            {fullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
          {onShare && (
            <button onClick={onShare} className="p-2 hover:text-gold transition-colors" aria-label="Share">
              <Share2 size={18} />
            </button>
          )}
        </div>
      </header>

      {/* BOOK STAGE */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden book-stage select-none" style={{ background: "radial-gradient(ellipse at center, hsl(213 60% 14%) 0%, hsl(213 60% 8%) 100%)" }}>
        {canPrev && (
          <button onClick={goPrev} className="absolute left-2 sm:left-6 z-20 p-3 rounded-full bg-ivory/5 hover:bg-gold/20 text-ivory transition-colors backdrop-blur" aria-label="Previous page">
            <ChevronLeft size={24} />
          </button>
        )}
        {canNext && (
          <button onClick={goNext} className="absolute right-2 sm:right-6 z-20 p-3 rounded-full bg-ivory/5 hover:bg-gold/20 text-ivory transition-colors backdrop-blur" aria-label="Next page">
            <ChevronRight size={24} />
          </button>
        )}

        <div
          className="relative flex items-stretch shadow-spread"
          style={{
            transform: `scale(${zoom})`,
            transition: "transform 300ms var(--ease-luxe)",
            width: isSpread ? "min(94vw, 1400px)" : "min(94vw, 720px)",
            aspectRatio: isSpread ? "1.42 / 1" : "0.71 / 1",
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {/* Static spread (two pages, or one on mobile) */}
          {isSpread ? (
            <>
              <div className="relative w-1/2 h-full overflow-hidden bg-page" onClick={onPageClick("left")}>
                {leftIndex !== null ? pages[leftIndex] : <div className="page-surface w-full h-full" />}
                <div className="page-edge-shadow page-edge-shadow-right" />
                <PageFooter n={leftIndex !== null ? leftIndex + 1 : null} total={total} />
              </div>
              <div className="relative w-1/2 h-full overflow-hidden bg-page" onClick={onPageClick("right")}>
                {rightIndex !== null ? pages[rightIndex] : <div className="page-surface w-full h-full" />}
                <div className="page-edge-shadow page-edge-shadow-left" />
                <PageFooter n={rightIndex !== null ? rightIndex + 1 : null} total={total} />
              </div>
            </>
          ) : (
            <div className="relative w-full h-full overflow-hidden bg-page" onClick={onPageClick("right")}>
              {pages[index]}
              <PageFooter n={index + 1} total={total} />
            </div>
          )}

          {/* Flipping leaf overlay */}
          {flipping && !reducedMotion && (
            <div
              className="absolute top-0 h-full pointer-events-none"
              style={{
                left: flipping === "next" ? (isSpread ? "50%" : "0") : "0",
                width: isSpread ? "50%" : "100%",
                perspective: "2400px",
                zIndex: 10,
              }}
            >
              <div
                className="relative w-full h-full"
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: flipping === "next" ? "left center" : "right center",
                  animation: `${flipping === "next" ? "flipNext" : "flipPrev"} ${FLIP_MS}ms var(--ease-page) forwards`,
                }}
              >
                {/* Front face = current right (or current single) */}
                <div className="leaf-face overflow-hidden bg-page">
                  {flipping === "next"
                    ? (isSpread && rightIndex !== null ? pages[rightIndex] : pages[index])
                    : (isSpread && leftIndex !== null ? pages[leftIndex] : pages[index])}
                  <div className={`page-edge-shadow ${flipping === "next" ? "page-edge-shadow-left" : "page-edge-shadow-right"}`} />
                </div>
                {/* Back face = next left (or next single) */}
                <div className="leaf-face leaf-back overflow-hidden bg-page">
                  {(() => {
                    const target = flipping === "next" ? Math.min(total - 1, isSpread ? index + 2 : index + 1) : Math.max(0, isSpread ? index - 2 : index - 1);
                    return pages[target];
                  })()}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-ivory/10">
          <div className="h-full bg-gold transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* BOTTOM BAR: page count */}
      <div className="flex items-center justify-center gap-4 py-2 mono text-[0.7rem] tracking-[0.2em] uppercase text-ivory/60 border-t border-ivory/10 bg-navy">
        <span>{String(index + 1).padStart(2, "0")} {isSpread && rightIndex !== null && rightIndex !== index ? `— ${String(rightIndex + 1).padStart(2, "0")}` : ""} / {String(total).padStart(2, "0")}</span>
      </div>

      {/* TOC PANEL */}
      {tocOpen && (
        <div className="absolute inset-0 z-40 bg-navy/95 backdrop-blur-sm overflow-y-auto scrollbar-thin" onClick={() => setTocOpen(false)}>
          <div className="max-w-3xl mx-auto px-6 py-12" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="eyebrow eyebrow-ivory">Contents</div>
                <h2 className="display-2 ivory mt-2">Table of Contents</h2>
              </div>
              <button onClick={() => setTocOpen(false)} className="text-ivory/60 hover:text-gold p-2"><X /></button>
            </div>
            <div className="hairline mb-6" />
            <ul className="divide-y divide-ivory/10">
              {pageTitles.map((title, i) => (
                <li key={i}>
                  <button
                    onClick={() => jumpTo(i)}
                    className="w-full text-left py-4 flex items-baseline gap-6 group hover:text-gold transition-colors text-ivory/85"
                  >
                    <span className="mono text-xs text-gold-soft tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-lg flex-1">{title}</span>
                    <span className="mono text-[0.65rem] tracking-widest uppercase opacity-0 group-hover:opacity-100 text-gold">Open →</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* THUMBS PANEL */}
      {thumbsOpen && (
        <div className="absolute inset-0 z-40 bg-navy/95 backdrop-blur-sm overflow-y-auto scrollbar-thin" onClick={() => setThumbsOpen(false)}>
          <div className="max-w-6xl mx-auto px-6 py-12" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="eyebrow eyebrow-ivory">Pages</div>
                <h2 className="display-2 ivory mt-2">All Spreads</h2>
              </div>
              <button onClick={() => setThumbsOpen(false)} className="text-ivory/60 hover:text-gold p-2"><X /></button>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {pages.map((p, i) => (
                <button
                  key={i}
                  onClick={() => jumpTo(i)}
                  className={`relative aspect-[0.71/1] overflow-hidden bg-page border transition-all ${i === index || i === rightIndex ? "border-gold shadow-gold" : "border-ivory/15 hover:border-gold/50"}`}
                >
                  <div className="absolute inset-0 transform scale-[0.35] origin-top-left" style={{ width: "285%", height: "285%", pointerEvents: "none" }}>
                    {p}
                  </div>
                  <div className="absolute bottom-1 right-1 mono text-[0.55rem] tracking-widest uppercase px-1.5 py-0.5 bg-navy/80 text-gold-soft">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes flipNext {
          from { transform: rotateY(0deg); box-shadow: 0 0 0 hsl(0 0% 0% / 0); }
          50%  { box-shadow: -20px 0 40px hsl(0 0% 0% / 0.4); }
          to   { transform: rotateY(-180deg); box-shadow: 0 0 0 hsl(0 0% 0% / 0); }
        }
        @keyframes flipPrev {
          from { transform: rotateY(-180deg); }
          to   { transform: rotateY(0deg); }
        }
      `}</style>
    </div>
  );
}

function computeVisible(index: number, total: number, isSpread: boolean) {
  if (!isSpread) return { leftIndex: null, rightIndex: index };
  // Cover (index 0) shown as right-only; then 1-2, 3-4, ...
  if (index === 0) return { leftIndex: null, rightIndex: 0 };
  if (index === total - 1 && index % 2 === 0) return { leftIndex: index, rightIndex: null };
  if (index % 2 === 1) return { leftIndex: index, rightIndex: index + 1 < total ? index + 1 : null };
  return { leftIndex: index - 1, rightIndex: index };
}

function PageFooter({ n, total }: { n: number | null; total: number }) {
  if (n === null) return null;
  return (
    <div className="absolute bottom-3 left-0 right-0 px-6 flex items-center justify-between pointer-events-none">
      <span className="mono text-[0.6rem] tracking-[0.3em] uppercase text-gold-deep/70">World Vision · 2026</span>
      <span className="mono text-[0.65rem] tracking-[0.2em] text-gold-deep/80 tabular-nums">{String(n).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
    </div>
  );
}
