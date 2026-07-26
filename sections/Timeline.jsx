"use client";

import SectionAtmosphere from "@/components/SectionAtmosphere";
import SectionIllustration from "@/components/SectionIllustration";
import Reveal from "@/components/Reveal";

const weeks = [
  {
    wk: "1",
    title: "Team Registration",
    closed: true,
  },
  {
    wk: "2",
    title: "AI/ML Workshops",
  },
  {
    wk: "3",
    title: "Kaggle Preliminary",
  },
  {
    wk: "4",
    title: "Top 10 Final Challenge Announced",
  },
  {
    wk: "5",
    title: "Grand Finale, Awards & Recognition",
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
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
