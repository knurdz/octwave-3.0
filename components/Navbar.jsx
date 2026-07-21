"use client";

import { useEffect, useState } from "react";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "structure", label: "Structure" },
  { id: "timeline", label: "Timeline" },
  { id: "rules", label: "Rules" },
  { id: "partners", label: "Partners" },
  { id: "team", label: "Team" },
];

const BOOKLET_URL =
  "https://drive.google.com/file/d/1X7_9Bn6TLs3FUEidjqCLjhZHYE1LH3BP/view?usp=sharing";

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 17L17 7M17 7H9M17 7V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon({ open }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {open ? (
        <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      ) : (
        <>
          <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links.map(({ id }) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-42% 0px -48% 0px", threshold: [0, 0.2, 0.45] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`digi-nav-wrap${scrolled ? " digi-nav-scrolled" : ""}`}>
      <nav className="digi-nav" aria-label="Main">
        <a href="#home" className="digi-nav-logo" aria-label="OctWave 3.0 home">
          <span className="digi-nav-brand">
            Oct<span className="digi-nav-brand-muted">Wave</span>
          </span>
          <span className="digi-nav-ver">3.0</span>
        </a>

        <div className="digi-nav-links" role="list">
          {links.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              role="listitem"
              className={`digi-nav-link${activeId === id ? " is-active" : ""}`}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="digi-nav-actions">
          <a
            href={BOOKLET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="digi-nav-cta"
          >
            Booklet
            <ArrowIcon />
          </a>

          <button
            type="button"
            className="digi-nav-menu-btn"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="digi-nav-mobile" onClick={closeMenu}>
          <div className="digi-nav-mobile-panel" onClick={(e) => e.stopPropagation()}>
            {links.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`digi-nav-mobile-link${activeId === id ? " is-active" : ""}`}
                onClick={closeMenu}
              >
                {label}
              </a>
            ))}
            <a
              href={BOOKLET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="digi-nav-cta digi-nav-cta-full"
              onClick={closeMenu}
            >
              Booklet
              <ArrowIcon />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
