"use client";

import Image from "next/image";
import Button from "@/components/Button";
import SectionAtmosphere from "@/components/SectionAtmosphere";
import Reveal from "@/components/Reveal";

const BOOKLET_URL =
  "https://drive.google.com/file/d/1X7_9Bn6TLs3FUEidjqCLjhZHYE1LH3BP/view?usp=sharing";

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#structure", label: "Structure" },
  { href: "#timeline", label: "Timeline" },
  { href: "#rules", label: "Rules" },
  { href: "#partners", label: "Partners" },
  { href: "#team", label: "Team" },
];

const socials = [
  {
    href: "https://www.facebook.com/share/1986hbaq9z",
    label: "Facebook",
    icon: (
      <svg className="site-footer-social-svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h3V2h-3a5 5 0 00-5 5v1z" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/company/ieeeiasuom",
    label: "LinkedIn",
    icon: (
      <svg className="site-footer-social-svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.8v8.37h2.8v-4.67c0-.25.02-.5.1-.68a1.14 1.14 0 0 1 1-.77c.76 0 1 .52 1 1.3v4.82h2.8M6.5 8.37a1.37 1.37 0 1 0 0-2.75 1.37 1.37 0 0 0 0 2.75M8 18.5V10.13H5v8.37h3z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="site-footer section-atmosphere">
      <SectionAtmosphere glow="cta" waves="dense" parallax={false} noise />

      <div className="section-inner site-footer-inner">
        <Reveal className="site-footer-main">
          <div className="site-footer-brand">
            <p className="section-label">OctWave 3.0</p>
            <h2 className="site-footer-title">
              Ready to make <span className="accent-text">your wave?</span>
            </h2>
            <p className="site-footer-sub">
              Explore the full programme including workshops, a Kaggle challenge, and a live final on the
              biggest stage.
            </p>
            <div className="site-footer-actions">
              <Button href={BOOKLET_URL}>View booklet</Button>
              <a href="#timeline" className="btn-outline site-footer-secondary">
                See timeline
              </a>
            </div>
          </div>

          <nav className="site-footer-col" aria-label="Footer">
            <p className="site-footer-col-title">Explore</p>
            <ul className="site-footer-list">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="site-footer-link">
                    <span className="site-footer-link-arrow" aria-hidden="true">
                      →
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer-col">
            <p className="site-footer-col-title">Connect</p>
            <ul className="site-footer-list">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-footer-link site-footer-social-link"
                  >
                    <span className="site-footer-social-icon">{s.icon}</span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>

            <address className="site-footer-address">
              IEEE IAS Student Branch Chapter
              <br />
              University of Moratuwa
              <br />
              Sri Lanka
            </address>
          </div>
        </Reveal>

        <div className="site-footer-bar">
          <p className="site-footer-copy">
            © {new Date().getFullYear()} IEEE IAS · University of Moratuwa
          </p>
          <a
            href="https://knurdz.org"
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer-powered"
            aria-label="Powered by Knurdz Community"
          >
            <Image
              src="/powered-by-knurdz.jpg"
              alt="Powered by Knurdz Community"
              width={220}
              height={73}
              className="site-footer-powered-img"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
