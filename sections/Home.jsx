"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import HeroVisual from "@/components/HeroVisual";
import WaveDoodles from "@/components/WaveDoodles";

const REGISTRATION_URL = "https://forms.gle/UcbBNwXAx5nZuNgF6";

const TITLE_SHARP = ["O", "c", "t"];
const TITLE_WAVE = ["W", "a", "v"];
const TITLE_LEN = TITLE_SHARP.length + TITLE_WAVE.length + 1;

function easeOutQuint(t) {
  return 1 - Math.pow(1 - t, 5);
}

function clamp01(t) {
  return Math.min(1, Math.max(0, t));
}

// If the page loads already scrolled past this point (refresh mid-page),
// entrance animations are skipped and the hero renders in its settled state.
const INTRO_SCROLL_SKIP = 24;

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [instant, setInstant] = useState(false);
  const titleRef = useRef(null);
  const versionRef = useRef(null);
  const wRef = useRef(null);
  const wFrontRef = useRef(null);
  const regStatusRef = useRef(null);
  const heroBgRef = useRef(null);
  const heroInnerRef = useRef(null);

  useEffect(() => {
    if (window.scrollY > INTRO_SCROLL_SKIP) {
      setInstant(true);
      setVisible(true);
      return;
    }
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const root = heroBgRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const layers = root.querySelectorAll("[data-depth]");
    let raf = 0;

    const update = () => {
      const y = window.scrollY;
      layers.forEach((el) => {
        const depth = Number(el.getAttribute("data-depth") || 0.4);
        const shift = y * depth * 0.55;
        el.style.transform = `translate3d(0, ${shift}px, 0)`;
      });
      const visual = document.querySelector(".digi-hero-visual-parallax");
      if (visual) {
        visual.style.transform = `translate3d(0, ${y * 0.28}px, 0)`;
      }
      const copy = document.querySelector(".digi-hero-copy");
      if (copy) {
        copy.style.transform = `translate3d(0, ${y * 0.1}px, 0)`;
      }
      const promo = document.querySelector(".digi-promo-slot");
      if (promo) {
        promo.style.transform = `translate3d(0, ${y * 0.1}px, 0)`;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const root = titleRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const skipIntro = window.scrollY > INTRO_SCROLL_SKIP;
    const chars = [...root.querySelectorAll("[data-title-char]")];
    const version = versionRef.current;

    const syncFrontW = () => {
      const w = wRef.current;
      const front = wFrontRef.current;
      const status = regStatusRef.current;
      const inner = heroInnerRef.current;
      if (!w || !front || !inner) return;

      const wRect = w.getBoundingClientRect();
      const innerRect = inner.getBoundingClientRect();
      const style = window.getComputedStyle(w);

      front.style.left = `${wRect.left - innerRect.left}px`;
      front.style.top = `${wRect.top - innerRect.top}px`;
      front.style.width = `${wRect.width}px`;
      front.style.height = `${wRect.height}px`;
      front.style.fontSize = style.fontSize;
      front.style.lineHeight = style.lineHeight;
      front.style.letterSpacing = style.letterSpacing;
      front.style.opacity = style.opacity;

      if (status && window.getComputedStyle(status).position === "absolute") {
        const statusRect = status.getBoundingClientRect();
        const statusParentRect = status.offsetParent?.getBoundingClientRect() || innerRect;
        const wCenter = wRect.left - statusParentRect.left + wRect.width / 2;
        status.style.left = `${wCenter - statusRect.width / 2}px`;
      }
    };

    if (reduceMotion || skipIntro) {
      chars.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "translate3d(0,0,0)";
      });
      if (version) {
        version.style.opacity = "1";
        version.style.transform = "translate(34%, 0.28em)";
      }
      syncFrontW();
      window.addEventListener("resize", syncFrontW);
      return () => window.removeEventListener("resize", syncFrontW);
    }

    let raf = 0;
    let start = 0;
    const duration = 1650;
    const phaseGap = 0.085;

    const tick = (now) => {
      if (!start) start = now;
      const elapsed = now - start;
      let allDone = true;

      chars.forEach((el, i) => {
        const local = clamp01((elapsed / duration - i * phaseGap) / 0.72);
        if (local < 1) allDone = false;

        const rise = easeOutQuint(local);
        const wave = Math.sin(local * Math.PI) * (1 - rise);
        const y = (1 - rise) * 110 - wave * 28;
        const opacity = clamp01(rise * 1.35);

        el.style.opacity = String(opacity);
        el.style.transform = `translate3d(0, ${y}%, 0)`;
      });

      if (version) {
        const vLocal = clamp01((elapsed / duration - TITLE_LEN * phaseGap * 0.55) / 0.55);
        if (vLocal < 1) allDone = false;
        const vRise = easeOutQuint(vLocal);
        version.style.opacity = String(vRise);
        version.style.transform = `translate(34%, ${0.28 + (1 - vRise) * 0.35}em)`;
      }

      syncFrontW();

      if (!allDone) {
        raf = requestAnimationFrame(tick);
      } else {
        chars.forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "translate3d(0, 0, 0)";
        });
        if (version) {
          version.style.opacity = "1";
          version.style.transform = "translate(34%, 0.28em)";
        }
        syncFrontW();
      }
    };

    window.addEventListener("resize", syncFrontW);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", syncFrontW);
    };
  }, []);

  const anim = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(20px)",
    transition: instant
      ? "none"
      : `opacity 0.9s cubic-bezier(.16,1,.3,1) ${delay}ms, transform 0.9s cubic-bezier(.16,1,.3,1) ${delay}ms`,
  });

  // Robot rises from below while the title letters are still animating in
  const visualAnim = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(110px)",
    filter: visible ? "blur(0px)" : "blur(8px)",
    transition: instant
      ? "none"
      : "opacity 1.1s cubic-bezier(.16,1,.3,1) 400ms, transform 1.35s cubic-bezier(.16,1,.3,1) 400ms, filter 1.1s cubic-bezier(.16,1,.3,1) 400ms",
  };

  return (
    <section id="home" className="digi-hero">
      <div className="digi-hero-bg" aria-hidden="true" ref={heroBgRef}>
        <div className="digi-hero-grid" />
        <div className="digi-hero-noise" />
        <div className="digi-hero-glow digi-hero-glow-tl" />
        <div className="digi-hero-glow digi-hero-glow-br" />
        <WaveDoodles preset="default" />
      </div>

      <div className="digi-hero-inner" ref={heroInnerRef}>
        <div className="digi-hero-title-block">
          <p className="hero-reg-status" role="status" style={anim(200)} ref={regStatusRef}>
            Registrations open
          </p>
          <h1 className="digi-hero-title" aria-label="OctWave 3.0">
            <span className="sr-only">
              OctWave 3.0 - IEEE IAS Student Branch Chapter - University of Moratuwa
            </span>
            <span className="digi-title-line" aria-hidden="true" ref={titleRef}>
              {TITLE_SHARP.map((ch) => (
                <span key={`s-${ch}`} className="digi-title-char digi-title-sharp" data-title-char>
                  {ch}
                </span>
              ))}
              <span className="digi-title-wave">
                {TITLE_WAVE.map((ch) => (
                  <span
                    key={`w-${ch}`}
                    ref={ch === "W" ? wRef : undefined}
                    className={`digi-title-char digi-title-sharp${ch === "W" ? " digi-title-w" : ""}`}
                    data-title-char
                  >
                    {ch}
                  </span>
                ))}
                <span className="digi-title-e-group digi-title-char" data-title-char>
                  <span ref={versionRef} className="digi-title-version">
                    3.0
                  </span>
                  <span className="digi-title-sharp">e</span>
                </span>
              </span>
            </span>
          </h1>
        </div>

        <div className="digi-hero-visual-wrap" style={visualAnim}>
          <div className="digi-hero-visual-parallax">
            <HeroVisual />
          </div>
        </div>

        <span ref={wFrontRef} className="digi-title-w-front" aria-hidden="true">
          W
        </span>

        <div className="digi-hero-copy">
          <div style={anim(900)}>
            <p className="digi-hero-lead">
              Sri Lanka&apos;s premier undergraduate AI &amp; Machine Learning competition by IEEE IAS
              Student Branch Chapter, University of Moratuwa.
            </p>
          </div>
        </div>

        <div className="digi-promo-slot">
          <aside className="digi-promo-card" style={anim(1050)}>
            <div className="digi-promo-thumb">
              <Image src="/logo.jpeg" alt="" width={72} height={72} className="digi-promo-img" />
            </div>
            <div className="digi-promo-body">
              <p className="digi-promo-eyebrow">Registrations open</p>
              <p className="digi-promo-title">Register for OctWave 3.0</p>
              <p className="digi-promo-desc">
                Submit your team details through the official registration form.
              </p>
              <a href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer" className="digi-promo-btn">
                Register now
                <span className="digi-promo-btn-icon" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
