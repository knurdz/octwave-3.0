"use client";

import { useMemo, useState } from "react";
import SectionAtmosphere from "@/components/SectionAtmosphere";
import SectionIllustration from "@/components/SectionIllustration";
import Reveal from "@/components/Reveal";
import { TOP70_TEAMS } from "@/lib/top70";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shortlist-search-svg">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M16 16.5L20.5 21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function initials(name) {
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function uniShort(name) {
  const aliases = {
    "University of Ruhuna": "Ruhuna",
    "University of Ruhuna Faculty of Engineering": "Ruhuna",
    "Sabaragamuwa University of Sri Lanka": "Sabaragamuwa",
    "Rajarata University of Sri Lanka": "Rajarata",
    "JIAT (Affiliated with IIC University)": "JIAT",
  };
  if (aliases[name]) return aliases[name];
  return name.replace(/^University of /i, "").replace(/ University$/i, "");
}

export default function Top70() {
  const [query, setQuery] = useState("");
  const [uni, setUni] = useState("all");

  const universities = useMemo(
    () => [...new Set(TOP70_TEAMS.map((team) => team.university))].sort((a, b) => a.localeCompare(b)),
    []
  );

  const teams = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOP70_TEAMS.filter((team) => {
      if (uni !== "all" && team.university !== uni) return false;
      const hay = `${team.name} ${team.university}`.toLowerCase();
      return !q || hay.includes(q);
    });
  }, [query, uni]);

  const metrics = [
    { value: String(TOP70_TEAMS.length).padStart(2, "0"), label: "Shortlisted" },
    { value: String(universities.length).padStart(2, "0"), label: "Universities" },
    { value: "01", label: "Online round" },
    { value: "10", label: "Advance next" },
  ];

  return (
    <section id="top70" className="section section-atmosphere">
      <SectionAtmosphere glow="tr" waves="default" parallax watermark="70" />

      <div className="section-inner">
        <div className="parallax-layer" data-depth="0.1">
          <Reveal className="section-header section-header-split section-header-with-illu">
            <div>
              <p className="section-label">Top 70</p>
              <h2 className="section-title">
                The teams that <span className="accent-text">made the cut.</span>
              </h2>
              <p className="section-sub">
                Advanced from the preliminary Kaggle round. These teams move on to the Top 70 Round.
              </p>
            </div>
            <SectionIllustration variant="lattice" className="section-illu-header" />
          </Reveal>
        </div>

        <Reveal delay={60} className="shortlist-metrics parallax-layer" data-depth="0.04">
          {metrics.map((metric) => (
            <div key={metric.label} className="shortlist-metric">
              <span className="shortlist-metric-value">{metric.value}</span>
              <span className="shortlist-metric-label">{metric.label}</span>
            </div>
          ))}
        </Reveal>

        <Reveal delay={100} className="shortlist-controls parallax-layer" data-depth="0.04">
          <div className="shortlist-toolbar">
            <label className="shortlist-search-wrap">
              <span className="sr-only">Search teams or universities</span>
              <span className="shortlist-search-icon" aria-hidden="true">
                <SearchIcon />
              </span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search team or university"
                className="shortlist-search"
                autoComplete="off"
              />
            </label>
            <p className="shortlist-count">
              {String(teams.length).padStart(2, "0")} / {String(TOP70_TEAMS.length).padStart(2, "0")}
            </p>
          </div>

          <div className="shortlist-chips" aria-label="Filter by university">
            <button
              type="button"
              aria-pressed={uni === "all"}
              className={`shortlist-chip${uni === "all" ? " is-active" : ""}`}
              onClick={() => setUni("all")}
            >
              All
            </button>
            {universities.map((name) => (
              <button
                key={name}
                type="button"
                aria-pressed={uni === name}
                className={`shortlist-chip${uni === name ? " is-active" : ""}`}
                onClick={() => setUni(name)}
              >
                {uniShort(name)}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={140} className="shortlist-wall-wrap parallax-layer" data-depth="0.05">
          {teams.length === 0 ? (
            <p className="shortlist-empty">No teams match that filter.</p>
          ) : (
            <ul className="shortlist-wall">
              {teams.map((team) => (
                <li key={`${team.name}-${team.university}`} className="shortlist-tile">
                  <div className="shortlist-tile-top">
                    <span className="shortlist-mono" aria-hidden="true">
                      {initials(team.name)}
                    </span>
                    <span className="shortlist-node" aria-hidden="true" />
                  </div>
                  <h3 className="shortlist-name">{team.name}</h3>
                  <p className="shortlist-uni">{team.university}</p>
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </div>
    </section>
  );
}
