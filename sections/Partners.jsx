"use client";

import Image from "next/image";
import SectionAtmosphere from "@/components/SectionAtmosphere";
import Reveal from "@/components/Reveal";

const partners = [
  {
    name: "Knurdz Community",
    role: "Web Partner",
    logo: "/partners/nurdz.png",
    href: "https://knurdz.org",
  },
];

export default function Partners() {
  return (
    <section id="partners" className="section section-atmosphere">
      <SectionAtmosphere glow="tr" waves="default" parallax watermark="Partners" />

      <div className="section-inner">
        <div className="parallax-layer" data-depth="0.1">
          <Reveal className="section-header section-header-split">
            <div>
              <p className="section-label">Our partners</p>
              <h2 className="section-title">
                Backed by <span className="accent-text">collaborators</span>
              </h2>
            </div>
            <p className="section-sub section-sub-flush">
              Organisations supporting OctWave 3.0, helping to build the platform and amplify the wave.
            </p>
          </Reveal>
        </div>

        <div className="partners-grid parallax-layer" data-depth="0.05">
          {partners.map((partner, i) => (
            <Reveal key={partner.name} delay={i * 100} as="article" className="partner-card">
              <a
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                className="partner-logo-frame"
                aria-label={`${partner.name} · ${partner.role}`}
              >
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={320}
                  height={100}
                  className="partner-logo"
                />
              </a>
              <p className="partner-role">{partner.role}</p>
              <p className="partner-name">{partner.name}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
