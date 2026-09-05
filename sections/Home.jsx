"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import HeroVisual from "@/components/HeroVisual";
import WaveDoodles from "@/components/WaveDoodles";

const BOOKLET_URL =
  "https://drive.google.com/file/d/1X7_9Bn6TLs3FUEidjqCLjhZHYE1LH3BP/view?usp=sharing";

const TITLE_SHARP = ["O", "c", "t"];
const TITLE_WAVE = ["W", "a", "v"];
const TITLE_LEN = TITLE_SHARP.length + TITLE_WAVE.length + 1;

function easeOutQuint(t) {
  return 1 - Math.pow(1 - t, 5);
}

function clamp01(t) {
  return Math.min(1, Math.max(0, t));
}

const INTRO_SCROLL_SKIP = 24;
const FINAL_DEADLINE = new Date("2026-09-12T08:30:00+05:30").getTime();

const DIGIT_PATTERNS = {
  "0": [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  "1": [
    [0, 0, 1, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0],
  ],
  "2": [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 1, 1, 0],
    [0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  "3": [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  "4": [
    [0, 0, 0, 1, 0],
    [0, 0, 1, 1, 0],
    [0, 1, 0, 1, 0],
    [1, 0, 0, 1, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],
  ],
  "5": [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  "6": [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  "7": [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
  ],
  "8": [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  "9": [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
};

function DotMatrixSVG({ value }) {
  const str = String(value).padStart(2, "0");
  const chars = str.split("");

  return (
    <svg
      viewBox="0 0 55 35"
      className="dot-matrix-svg"
      aria-label={str}
      role="img"
    >
      <defs>
        <filter id="dot-matrix-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {chars.map((ch, charIdx) => {
        const pattern = DIGIT_PATTERNS[ch] || DIGIT_PATTERNS["0"];
        const colOffset = charIdx * 6; // 5 cols + 1 col gap
        return (
          <g key={charIdx}>
            {pattern.map((row, rIdx) =>
              row.map((dot, cIdx) => {
                const cx = (colOffset + cIdx) * 5 + 2.5;
                const cy = rIdx * 5 + 2.5;
                const isOn = Boolean(dot);
                return (
                  <circle
                    key={`${rIdx}-${cIdx}`}
                    cx={cx}
                    cy={cy}
                    r={isOn ? 1.6 : 1.1}
                    fill={isOn ? "#c4b5fd" : "rgba(183, 148, 246, 0.14)"}
                    filter={isOn ? "url(#dot-matrix-glow)" : undefined}
                  />
                );
              })
            )}
          </g>
        );
      })}
    </svg>
  );
}

const COUNTDOWN_UNITS = [
  { key: "days", label: "DAYS" },
  { key: "hours", label: "HOURS" },
  { key: "minutes", label: "MIN" },
];

function getFinalCountdown() {
  const remaining = Math.max(0, FINAL_DEADLINE - Date.now());
  const day = 24 * 60 * 60 * 1000;
  const hour = 60 * 60 * 1000;
  const minute = 60 * 1000;

  return {
    days: Math.floor(remaining / day),
    hours: Math.floor((remaining % day) / hour),
    minutes: Math.floor((remaining % hour) / minute),
    closed: remaining <= 0,
  };
}

function HeroCountdownWidget() {
  const [countdown, setCountdown] = useState(getFinalCountdown);

  useEffect(() => {
    const update = () => setCountdown(getFinalCountdown());
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="dot-matrix-wrapper">
      <div className="dot-matrix-header">
        <span className="dot-matrix-date">September 12</span>
        <span className="dot-matrix-sub">UNTIL FINAL DAY</span>
      </div>
      <div className="dot-matrix-container" aria-live="polite">
        {COUNTDOWN_UNITS.map(({ key, label }) => {
          const valStr = String(countdown[key]).padStart(2, "0");
          return (
            <div key={key} className="dot-matrix-card">
              <DotMatrixSVG value={valStr} />
              <span className="dot-matrix-label">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [instant, setInstant] = useState(false);
  const titleRef = useRef(null);
  const versionRef = useRef(null);
  const wRef = useRef(null);
  const wFrontRef = useRef(null);
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
          <p className="hero-reg-status" role="status" style={anim(200)}>
            Final Challenge Begins
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

        {/* Lower Right Area: Description + Clean Date Banner + 3 Dot-Matrix LED Cards (DAYS, HOURS, MIN) */}
        <div className="digi-hero-copy">
          <div style={anim(900)}>
            <p className="digi-hero-lead">
              Sri Lanka&apos;s premier undergraduate AI &amp; Machine Learning competition by IEEE IAS
              Student Branch Chapter, University of Moratuwa.
            </p>
          </div>
          <div style={anim(1000)} className="hero-lower-right-countdown">
            <HeroCountdownWidget />
          </div>
        </div>

        {/* Lower Left Area: Promo Card with Booklet Button */}
        <div className="digi-promo-slot">
          <aside className="digi-promo-card" style={anim(1050)}>
            <div className="digi-promo-thumb">
              <Image src="/logo.jpeg" alt="" width={72} height={72} className="digi-promo-img" />
            </div>
            <div className="digi-promo-body">
              <p className="digi-promo-eyebrow">Final Challenge Begins</p>
              <p className="digi-promo-title">Final Challenge Begins</p>
              <p className="digi-promo-desc">
                View the delegate booklet for schedule, structure, rules, and stage details.
              </p>
            </div>
            <div className="digi-promo-actions">
              <a
                href={BOOKLET_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="digi-promo-btn digi-promo-btn-secondary"
                aria-label="View the OctWave 3.0 delegate booklet"
              >
                View booklet
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
