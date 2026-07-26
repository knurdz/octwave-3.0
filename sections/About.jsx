"use client";

import SectionAtmosphere from "@/components/SectionAtmosphere";
import SectionIllustration from "@/components/SectionIllustration";
import Reveal from "@/components/Reveal";

const pillars = [
  {
    num: "01",
    title: "Industry-linked learning",
    desc: "Expert-led workshops bridging academic theory with live tools and real industry use cases you can apply immediately.",
  },
  {
    num: "02",
    title: "Two-stage competition",
    desc: "Online Kaggle preliminary followed by a physical final at University of Moratuwa with an industry judging panel.",
  },
  {
    num: "03",
    title: "Open to all undergrads",
    desc: "Government and private institution students across Sri Lanka. Compete solo or as a team.",
  },
  {
    num: "04",
    title: "Recognition + awards",
    desc: "Industry-endorsed certificates, professional recognition, and opportunities to engage with industry experts.",
  },
];

const highlights = [
  { value: "04", label: "Workshops" },
  { value: "10", label: "Finalists" },
  { value: "06", label: "Weeks" },
  { value: "SL", label: "All unis" },
];

export default function About() {
  return (
    <section id="about" className="section section-atmosphere">
      <SectionAtmosphere glow="tr" waves="default" parallax watermark="OctWave" />
      <div className="section-inner">
        <div className="parallax-layer" data-depth="0.1">
          <Reveal className="section-header section-header-split section-header-with-illu">
            <div>
              <p className="section-label">About the event</p>
              <h2 className="section-title">
                Built for the <span className="accent-text">next generation</span>
                <br />
                of AI engineers
              </h2>
              <p className="section-sub">
                An AI/ML competition by the IEEE IAS Student Branch Chapter at the University of
                Moratuwa, connecting universities to industry through structured workshops, a Kaggle
                challenge, and a live final with real industry datasets.
              </p>
            </div>
            <SectionIllustration variant="neural" className="section-illu-header" />
          </Reveal>
        </div>

        <div className="parallax-layer" data-depth="-0.06">
          <Reveal delay={80} className="about-metrics">
            {highlights.map((h) => (
              <div key={h.label} className="about-metric">
                <span className="about-metric-value">{h.value}</span>
                <span className="about-metric-label">{h.label}</span>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="about-pillars parallax-layer" data-depth="0.06">
          {pillars.map((pillar, i) => (
            <Reveal
              key={pillar.num}
              delay={120 + i * 70}
              as="article"
              className="about-pillar"
            >
              <span className="about-pillar-num" aria-hidden="true">
                {pillar.num}
              </span>
              <div className="about-pillar-copy">
                <h3 className="about-pillar-title">{pillar.title}</h3>
                <p className="about-pillar-desc">{pillar.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
