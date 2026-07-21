"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const fillRef = useRef(null);

  useEffect(() => {
    // Browsers with CSS scroll-driven animations handle the fill natively.
    if (typeof CSS !== "undefined" && CSS.supports?.("animation-timeline: scroll()")) {
      return;
    }

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, (window.scrollY || doc.scrollTop) / scrollable)) : 0;
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleY(${progress})`;
      }
    };

    const onScroll = () => {
      // throttle to one update per frame
      if (!rafId) rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span ref={fillRef} className="scroll-progress-fill" />
    </div>
  );
}
