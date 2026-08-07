"use client";

import Image from "next/image";
import SectionAtmosphere from "@/components/SectionAtmosphere";
import Reveal from "@/components/Reveal";

const PARTNERS = [
  {
    name: "CWIT",
    fullName: "Colombo West International Terminal (Private) Limited",
    role: "Gold Partner",
    logo: "/partners/cwit.jpg",
  },
  {
    name: "HackSL",
    fullName: "Digital media partner for OctWave 3.0",
    role: "Digital Media Partner",
    logo: "/partners/hacksl.jpg",
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
                Backed by <span className="accent-text">partners</span>
              </h2>
            </div>
            <p className="section-sub section-sub-flush">
              Organisations supporting OctWave 3.0 and helping amplify the wave.
            </p>
          </Reveal>
        </div>

        <Reveal className="partners-grid parallax-layer" data-depth="0.05">
          {PARTNERS.map((partner) => (
            <article className="partner-shell" key={partner.name}>
              <span className="partner-dot" aria-hidden="true" />
              <div className="partner-card">
                <span className="partner-ray" aria-hidden="true" />
                <p className="partner-tier">
                  <span className="partner-tier-bar" aria-hidden="true" />
                  {partner.role}
                </p>
                <div className="partner-logo-pad">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    width={360}
                    height={220}
                    className="partner-logo"
                  />
                </div>
                <div className="partner-copy">
                  <h3>{partner.name}</h3>
                  <p>{partner.fullName}</p>
                </div>
                <span className="partner-line partner-line-top" aria-hidden="true" />
                <span className="partner-line partner-line-left" aria-hidden="true" />
                <span className="partner-line partner-line-bottom" aria-hidden="true" />
                <span className="partner-line partner-line-right" aria-hidden="true" />
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
