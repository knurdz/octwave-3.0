"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import HeroVisual from "@/components/HeroVisual";
import WaveDoodles from "@/components/WaveDoodles";

const REGISTRATION_URL = "https://forms.gle/UcbBNwXAx5nZuNgF6";
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

// If the page loads already scrolled past this point (refresh mid-page),
// entrance animations are skipped and the hero renders in its settled state.
const INTRO_SCROLL_SKIP = 24;
const REGISTRATION_DEADLINE = new Date("2026-08-08T23:59:00+05:30").getTime();
const COUNTDOWN_UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Mins" },
];

function getRegistrationCountdown() {
  const remaining = Math.max(0, REGISTRATION_DEADLINE - Date.now());
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

function ExternalArrowIcon() {
  return (
    <svg className="digi-promo-btn-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 17 17 7M17 7H9M17 7v8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RegistrationCountdownWidget({ countdown }) {
  return (
    <div className="digi-reg-widget">
      <div className="digi-promo-actions">
        <a
          href={REGISTRATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="digi-promo-btn"
          aria-label="Register for OctWave 3.0"
        >
          Register now
          <ExternalArrowIcon />
        </a>
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
      <div className="digi-countdown" aria-live="polite">
        <p className="digi-countdown-label">
          <span>{countdown?.closed ? "Registrations closed" : "Closes Aug 8, 11:59 PM"}</span>
        </p>
        {countdown && !countdown.closed && (
          <div className="digi-countdown-grid" aria-label="Registration countdown">
            {COUNTDOWN_UNITS.map(({ key, label }, index) => (
              <span className="digi-countdown-unit" key={key}>
                <span className="digi-countdown-value">{String(countdown[key]).padStart(2, "0")}</span>
                <span className="digi-countdown-name">{label}</span>
                {index < COUNTDOWN_UNITS.length - 1 && <span className="digi-countdown-divider" aria-hidden="true" />}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [instant, setInstant] = useState(false);
  const [countdown, setCountdown] = useState(null);
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
    const updateCountdown = () => setCountdown(getRegistrationCountdown());
    updateCountdown();
    const timer = window.setInterval(updateCountdown, 30000);
    return () => window.clearInterval(timer);
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
          <p className="hero-reg-status" role="status" style={anim(200)}>
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
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="digi-hero-mobile-register"
            >
              Register now
            </a>
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
            </div>
            <RegistrationCountdownWidget countdown={countdown} />
          </aside>
        </div>
      </div>
    </section>
  );
}
