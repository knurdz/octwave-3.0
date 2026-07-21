"use client";

import Image from "next/image";
import SectionAtmosphere from "@/components/SectionAtmosphere";
import Reveal from "@/components/Reveal";

const cochairs = [
  {
    photo: "/team/Manushi.jpeg",
    name: "Manushi Gunasekara",
    role: "Co-chair",
    phone: "+94 71 348 3880",
  },
  {
    photo: "/team/Hiruna-new.jpeg",
    name: "Hirun Jayalath",
    role: "Co-chair",
    phone: "+94 76 915 5953",
  },
  {
    photo: "/team/Lakmana.jpeg",
    name: "Lakmana Thabrew",
    role: "Co-chair",
    phone: "+94 71 327 8691",
  },
];

export default function Team() {
  return (
    <section id="team" className="section section-atmosphere">
      <SectionAtmosphere glow="bl" waves="dense" parallax watermark="Team" />

      <div className="section-inner">
        <div className="parallax-layer" data-depth="0.1">
          <Reveal className="section-header section-header-split">
            <div>
              <p className="section-label">Our team</p>
              <h2 className="section-title">
                The people <span className="accent-text">behind</span> the wave
              </h2>
            </div>
            <p className="section-sub section-sub-flush">
              IEEE IAS Student Branch Chapter at University of Moratuwa. Reach a co-chair for anything OctWave.
            </p>
          </Reveal>
        </div>

        <div className="roster parallax-layer" data-depth="0.05">
          <div className="roster-rail" aria-hidden="true">
            <span className="roster-rail-line" />
          </div>

          <div className="roster-grid">
            {cochairs.map((m, i) => (
              <Reveal
                key={m.name}
                delay={i * 100}
                as="article"
                className="roster-person"
              >
                <span className="roster-index" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="roster-photo">
                  <Image
                    src={m.photo}
                    alt={m.name}
                    fill
                    className="roster-img"
                    sizes="(max-width: 768px) 80vw, 280px"
                  />
                  <span className="roster-photo-veil" aria-hidden="true" />
                </div>

                <div className="roster-meta">
                  <p className="roster-role">{m.role}</p>
                  <h3 className="roster-name">{m.name}</h3>
                  <a
                    href={`tel:${m.phone.replace(/\s+/g, "")}`}
                    className="roster-phone"
                  >
                    {m.phone}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
