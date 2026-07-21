"use client";

import SectionAtmosphere from "@/components/SectionAtmosphere";
import SectionIllustration from "@/components/SectionIllustration";
import Reveal from "@/components/Reveal";

const weeks = [
  {
    wk: "01",
    title: "Register team",
    desc: "Team registration for OctWave 3.0 has closed.",
    meta: "Closed",
    closed: true,
  },
  {
    wk: "02",
    title: "Attend workshops",
    desc: "AI/ML trends · Intro to ML · Models · Data engineering pipelines.",
    meta: "4 sessions",
  },
  {
    wk: "03",
    title: "Kaggle preliminary",
    desc: "Compete on Kaggle, submit your model + report. Top 10 advance.",
    meta: "Online",
  },
  {
    wk: "04",
    title: "Top-10 final",
    desc: "Real-world challenge and live presentations at University of Moratuwa.",
    meta: "Physical · UOM",
  },
  {
    wk: "05",
    title: "Awards & recognition",
    desc: "Winning teams, certifications, industry recognition, and career networks.",
    meta: "Ceremony",
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="section section-atmosphere">
      <SectionAtmosphere glow="tr" waves="default" parallax watermark="Journey" />

      <div className="section-inner">
        <div className="parallax-layer" data-depth="0.1">
          <Reveal className="section-header section-header-center">
            <p className="section-label">Timeline</p>
            <h2 className="section-title">
              Your <span className="accent-text">journey</span> unfolds
            </h2>
            <p className="section-sub section-sub-center">
              Five weeks from registration to the awards stage.
            </p>
            <p className="timeline-status" role="status">
              Registration closed
            </p>
            <SectionIllustration variant="path" float={false} className="section-illu-path" />
          </Reveal>
        </div>

        <div className="journey parallax-layer" data-depth="0.05">
          <div className="journey-rail" aria-hidden="true">
            <span className="journey-rail-line" />
            <span className="journey-rail-pulse" />
          </div>

          <ol className="journey-steps">
            {weeks.map((item, i) => (
              <li key={item.wk} className="journey-step-wrap">
                <Reveal
                  delay={i * 90}
                  className={`journey-step${item.closed ? " is-closed" : ""}`}
                >
                  <div className="journey-marker" aria-hidden="true">
                    <span className="journey-dot" />
                  </div>
                  <span className="journey-wk">Week {item.wk}</span>
                  <span className="journey-num" aria-hidden="true">
                    {item.wk}
                  </span>
                  <h3 className="journey-title">{item.title}</h3>
                  <p className="journey-desc">{item.desc}</p>
                  <span className="journey-meta">{item.meta}</span>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
