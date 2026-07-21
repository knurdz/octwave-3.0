"use client";

import SectionAtmosphere from "@/components/SectionAtmosphere";
import SectionIllustration from "@/components/SectionIllustration";
import Reveal from "@/components/Reveal";

const phases = [
  {
    num: "01",
    stage: "Foundation",
    title: "Introductory session",
    desc: "Industry experts present AI/ML trends and set the foundation before the technical workshops begin.",
    topics: [],
  },
  {
    num: "02",
    stage: "Training",
    title: "Workshops · 4 sessions",
    desc: "Hands-on training in ML models, time-series data, data engineering, and the Kaggle platform.",
    topics: ["Intro to ML", "Time series", "Data engineering", "Kaggle"],
  },
  {
    num: "03",
    stage: "Compete",
    title: "Preliminary round · online",
    desc: "Kaggle challenge + report submission. Top 10 teams advance based on leaderboard + report quality.",
    topics: ["Online", "Kaggle", "Top 10 advance"],
  },
  {
    num: "04",
    stage: "Present",
    title: "Final round · physical at UOM",
    desc: "Industry dataset + live presentations to a panel. Ends with the awards ceremony at University of Moratuwa.",
    topics: ["Physical", "Real dataset", "Industry judges", "Awards"],
  },
];

export default function Structure() {
  return (
    <section id="structure" className="section section-atmosphere">
      <SectionAtmosphere glow="bl" waves="dense" parallax watermark="Phases" />
      <div className="section-inner">
        <div className="parallax-layer" data-depth="0.1">
          <Reveal className="section-header section-header-split section-header-with-illu">
            <div>
              <p className="section-label">Event structure</p>
              <h2 className="section-title">
                Four phases. <span className="accent-text">One goal.</span>
              </h2>
              <p className="section-sub">
                Learn the tools. Apply them competitively. Present to industry leaders.
              </p>
            </div>
            <SectionIllustration variant="cascade" className="section-illu-header" />
          </Reveal>
        </div>

        <div className="phases parallax-layer" data-depth="0.05">
          {phases.map((phase, i) => (
            <Reveal
              key={phase.num}
              delay={i * 90}
              as="article"
              className="phase"
            >
              <div className="phase-side">
                <span className="phase-num" aria-hidden="true">
                  {phase.num}
                </span>
                <span className="phase-stage">{phase.stage}</span>
              </div>

              <div className="phase-body">
                <h3 className="phase-title">{phase.title}</h3>
                <p className="phase-desc">{phase.desc}</p>
                {phase.topics.length > 0 && (
                  <p className="phase-topics">
                    {phase.topics.join(" · ")}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
