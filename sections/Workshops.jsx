"use client";

import SectionAtmosphere from "@/components/SectionAtmosphere";
import Reveal from "@/components/Reveal";

/* ─── Workshop data ─────────────────────────────────────
   Each entry maps to a recording. Add future sessions here.
   YouTube embed URLs follow the /embed/{id} pattern.
────────────────────────────────────────────────────────── */
const workshops = [
  {
    num: "01",
    title: "Introduction to Machine Learning",
    host: "Workshop Series · Session 1",
    desc: "Foundational concepts in supervised and unsupervised learning, model evaluation, and how ML fits into the OctWave competition workflow.",
    tags: ["ML Fundamentals", "Supervised Learning", "Model Evaluation"],
    youtubeId: "i49aQ-YLLfk",
  },
  {
    num: "02",
    title: "Time-Series & Data Engineering",
    host: "Workshop Series · Session 2",
    desc: "Hands-on deep-dive into time-series analysis, feature engineering pipelines, and preparing real-world datasets for the Kaggle preliminary round.",
    tags: ["Time Series", "Feature Engineering", "Data Pipelines"],
    youtubeId: "6BVFUhtN1WA",
  },
];

/* ─── Play icon SVG ──────────────────────────────────── */
function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="ws-play-icon"
    >
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  );
}

/* ─── YouTube embed (lazy iframe) ────────────────────── */
function WorkshopEmbed({ id, title }) {
  return (
    <div className="ws-embed-wrap" aria-label={`Video: ${title}`}>
      <iframe
        className="ws-embed-iframe"
        src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&color=white`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}

/* ─── Single workshop card ───────────────────────────── */
function WorkshopCard({ workshop, index }) {
  const isEven = index % 2 === 0;

  return (
    <Reveal
      delay={index * 100}
      as="article"
      className={`ws-card ${isEven ? "ws-card-ltr" : "ws-card-rtl"}`}
    >
      {/* ── Video embed ── */}
      <div className="ws-card-media">
        <WorkshopEmbed id={workshop.youtubeId} title={workshop.title} />
        <span className="ws-card-media-glow" aria-hidden="true" />
      </div>

      {/* ── Copy ── */}
      <div className="ws-card-copy">
        <p className="ws-card-kicker">
          <span className="ws-card-num" aria-hidden="true">
            {workshop.num}
          </span>
          {workshop.host}
        </p>

        <h3 className="ws-card-title">{workshop.title}</h3>
        <p className="ws-card-desc">{workshop.desc}</p>

        <ul className="ws-card-tags" aria-label="Topics covered">
          {workshop.tags.map((tag) => (
            <li key={tag} className="ws-card-tag">
              {tag}
            </li>
          ))}
        </ul>

        <a
          href={`https://youtu.be/${workshop.youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ws-card-cta"
          aria-label={`Watch ${workshop.title} on YouTube`}
        >
          <span className="ws-card-cta-icon" aria-hidden="true">
            <PlayIcon />
          </span>
          Watch on YouTube
        </a>
      </div>
    </Reveal>
  );
}

/* ─── Section ────────────────────────────────────────── */
export default function Workshops() {
  return (
    <section id="workshops" className="section section-atmosphere">
      <SectionAtmosphere glow="tr" waves="default" parallax watermark="Learn" />

      <div className="section-inner">
        <div className="parallax-layer" data-depth="0.1">
          <Reveal className="section-header section-header-center">
            <p className="section-label">Workshop Recordings</p>
            <h2 className="section-title">
              Learn from the{" "}
              <span className="accent-text">experts</span>
            </h2>
            <p className="section-sub section-sub-center">
              Missed a session? All workshop recordings are available here.
              More sessions will be added as the series progresses.
            </p>
          </Reveal>
        </div>

        <div className="ws-list parallax-layer" data-depth="0.05">
          {workshops.map((ws, i) => (
            <WorkshopCard key={ws.num} workshop={ws} index={i} />
          ))}
        </div>


      </div>
    </section>
  );
}
