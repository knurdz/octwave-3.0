"use client";

import Image from "next/image";
import Button from "@/components/Button";
import SectionAtmosphere from "@/components/SectionAtmosphere";
import Reveal from "@/components/Reveal";

const REGISTRATION_URL = "https://forms.gle/UcbBNwXAx5nZuNgF6";
const BOOKLET_URL =
  "https://drive.google.com/file/d/1X7_9Bn6TLs3FUEidjqCLjhZHYE1LH3BP/view?usp=sharing";

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#structure", label: "Structure" },
  { href: "#workshops", label: "Workshops" },
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
  {
    href: "https://whatsapp.com/channel/0029Vb5Od1KEQIasH3cEnr05",
    label: "WhatsApp Channel",
    icon: (
      <svg className="site-footer-social-svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2a9.9 9.9 0 0 0-8.57 14.86L2 22l5.3-1.4A9.94 9.94 0 1 0 12.04 2m.01 2a7.95 7.95 0 0 1 6.78 12.1 7.95 7.95 0 0 1-10.98 2.54l-.38-.23-3.15.83.84-3.07-.25-.4A7.95 7.95 0 0 1 12.05 4m-3.4 3.95c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.6c.13.17 1.76 2.69 4.27 3.77.6.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.48-.6 1.69-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.3-.25-.13-1.48-.73-1.71-.81-.23-.08-.4-.13-.57.13-.17.25-.65.81-.8.98-.15.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.25-1.49-1.4-1.74-.15-.25-.02-.39.11-.52.12-.12.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.57-1.38-.78-1.89-.21-.5-.42-.43-.57-.44h-.49z" />
      </svg>
    ),
  },
  {
    href: "https://youtube.com/@ieeeiasuom?si=bBQQ7peCwOCQE8HG",
    label: "YouTube",
    icon: (
      <svg className="site-footer-social-svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M21.58 7.19a2.52 2.52 0 0 0-1.77-1.78C18.25 5 12 5 12 5s-6.25 0-7.81.41a2.52 2.52 0 0 0-1.77 1.78A26.24 26.24 0 0 0 2 12a26.24 26.24 0 0 0 .42 4.81 2.52 2.52 0 0 0 1.77 1.78C5.75 19 12 19 12 19s6.25 0 7.81-.41a2.52 2.52 0 0 0 1.77-1.78A26.24 26.24 0 0 0 22 12a26.24 26.24 0 0 0-.42-4.81zM10 15V9l5.2 3L10 15z" />
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
              <Button href={REGISTRATION_URL}>Register now</Button>
              <a href={BOOKLET_URL} target="_blank" rel="noopener noreferrer" className="btn-outline site-footer-secondary">
                View booklet
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
              src="/powered-by-knurdz-new.svg"
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
