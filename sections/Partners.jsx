"use client";

import SectionAtmosphere from "@/components/SectionAtmosphere";
import Reveal from "@/components/Reveal";

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

        <Reveal className="partners-empty parallax-layer" data-depth="0.05">
          More collaborators will be announced soon.
        </Reveal>
      </div>
    </section>
  );
}
