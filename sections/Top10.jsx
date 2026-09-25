"use client";

import { useState } from "react";
import SectionAtmosphere from "@/components/SectionAtmosphere";
import SectionIllustration from "@/components/SectionIllustration";
import Reveal from "@/components/Reveal";
import { TOP10_TEAMS } from "@/lib/top10";

function ChevronDownIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`archive-chevron-icon${open ? " is-open" : ""}`}
      style={{ width: "24px", height: "24px" }}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function initialOf(name) {
  return [...name][0] || "";
}

export default function Top10() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="top10" className="section section-atmosphere">
      <SectionAtmosphere glow="bl" waves="dense" parallax watermark="10" />

      <div className="section-inner">
        <div className="parallax-layer" data-depth="0.1">
          <Reveal className="section-header">
            <button
              type="button"
              className={`section-header-split section-header-with-illu archive-toggle-header${isExpanded ? " is-open" : ""}`}
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
            >
              <div style={{ textAlign: "left" }}>
                <p className="section-label">Top 10</p>
                <h2 className="section-title">
                  Ten teams. <span className="accent-text">One final.</span>
                </h2>
                <p className="section-sub">
                  Advanced from the Top 70 Round. Next: the physical final at University of Moratuwa.
                </p>
              </div>
              <div className="archive-toggle-right">
                <SectionIllustration variant="finalists" className="section-illu-header" />
                <div className="archive-toggle-action">
                  <span className="archive-toggle-hint">
                    {isExpanded ? "Hide Finalists" : "View Finalists"}
                  </span>
                  <div className="archive-toggle-icon">
                    <ChevronDownIcon open={isExpanded} />
                  </div>
                </div>
              </div>
            </button>
          </Reveal>
        </div>

        <div className={`archive-expandable-wrapper${isExpanded ? " is-expanded" : ""}`}>
          {isExpanded && (
            <Reveal delay={80} className="finalists-gallery parallax-layer" data-depth="0.05">
              <ul className="finalists-posters">
                {TOP10_TEAMS.map((team, i) => (
                  <li
                    key={`${team.name}-${team.university}`}
                    className={`finalists-poster finalists-poster-${i % 4}`}
                  >
                    <span className="finalists-frame" aria-hidden="true" />
                    <span className="finalists-ray" aria-hidden="true" />
                    <span className="finalists-echo" aria-hidden="true">
                      {team.name}
                    </span>
                    <span className="finalists-initial" aria-hidden="true">
                      {initialOf(team.name)}
                    </span>
                    <span className="finalists-tick finalists-tick-tl" aria-hidden="true" />
                    <span className="finalists-tick finalists-tick-br" aria-hidden="true" />
                    <div className="finalists-lockup">
                      <h3 className="finalists-name">{team.name}</h3>
                      <p className="finalists-uni">{team.university}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
