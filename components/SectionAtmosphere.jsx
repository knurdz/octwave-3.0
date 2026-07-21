"use client";

import { useEffect, useRef } from "react";
import WaveDoodles from "@/components/WaveDoodles";

export default function SectionAtmosphere({
  glow = "tr",
  waves = "default",
  parallax = true,
  noise = false,
  watermark = "",
}) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!parallax) return;
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const section = root.closest("section") || root;
    // Match hero: parallax every [data-depth] in the section (bg + content)
    const layers = section.querySelectorAll("[data-depth]");
    let raf = 0;

    const update = () => {
      // Section-relative travel - same feel as hero's scrollY once the section is in play
      const travel = -section.getBoundingClientRect().top;

      layers.forEach((el) => {
        const depth = Number(el.getAttribute("data-depth") || 0.4);
        const shift = travel * depth * 0.55;
        el.style.transform = `translate3d(0, ${shift}px, 0)`;
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [parallax]);

  return (
    <div className="section-atmosphere-bg" aria-hidden="true" ref={rootRef}>
      <div className="parallax-layer section-grid-wrap" data-depth="0.12">
        <div className="section-grid" />
      </div>
      {noise && <div className="section-noise" />}
      <div className="parallax-layer section-glow-wrap" data-depth="0.28">
        <div className={`section-glow section-glow-${glow}`} />
        <div className={`section-glow-soft section-glow-soft-${glow === "tr" ? "bl" : "tr"}`} />
      </div>

      <div className="parallax-layer section-orbs-wrap" data-depth="0.4">
        <span className="section-orb section-orb-a" />
        <span className="section-orb section-orb-b" />
        <span className="section-orb section-orb-c" />
      </div>

      <div
        className={`parallax-layer section-ring-wrap ${glow === "tr" ? "section-ring-left" : "section-ring-right"}`}
        data-depth="0.2"
      >
        <svg className="section-ring" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="96" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 7" />
          <circle cx="100" cy="100" r="72" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
          <circle cx="100" cy="4" r="3" fill="currentColor" />
        </svg>
      </div>

      {watermark && (
        <div className="parallax-layer section-watermark-wrap" data-depth="0.16">
          <span className="section-watermark">{watermark}</span>
        </div>
      )}

      <WaveDoodles preset={waves} />
    </div>
  );
}
