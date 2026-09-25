"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SectionAtmosphere from "@/components/SectionAtmosphere";
import Reveal from "@/components/Reveal";
import { WINNERS } from "@/lib/winners";

function TrophyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="winner-trophy-icon" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.003 0H9.497m5.003 0a7.5 7.5 0 0 0 4.25-6.75V4.875A1.125 1.125 0 0 0 17.625 3.75H6.375A1.125 1.125 0 0 0 5.25 4.875v3.75a7.5 7.5 0 0 0 4.25 6.75m0 0a3.75 3.75 0 0 1 7.5 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.625 6h2.25a2.25 2.25 0 0 1 2.25 2.25v.75a4.5 4.5 0 0 1-4.5 4.5h-.75M6.375 6H4.125A2.25 2.25 0 0 0 1.875 8.25v.75a4.5 4.5 0 0 0 4.5 4.5h.75" />
    </svg>
  );
}

function ZoomIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="winner-zoom-icon" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="winner-close-icon" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function Winners() {
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    if (!activeModal) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setActiveModal(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeModal]);

  return (
    <section id="winners" className="section section-atmosphere">
      <SectionAtmosphere glow="center" waves="dense" parallax watermark="WINNERS" />

      <div className="section-inner">
        <div className="parallax-layer" data-depth="0.1">
          <Reveal className="section-header section-header-center">
            <p className="section-label">Grand Finale Awards</p>
            <h2 className="section-title">
              The champions of <span className="accent-text">OctWave 3.0</span>
            </h2>
            <p className="section-sub section-sub-center">
              Celebrating the exceptional teams who conquered the final challenge at University of Moratuwa.
            </p>
          </Reveal>
        </div>

        {/* Podium Grid: 1st Runners Up (Left) | Champions (Center elevated) | 2nd Runners Up (Right) */}
        <Reveal delay={80} className="parallax-layer winners-podium-layer" data-depth="0.05">
          <div className="winners-podium">
            {WINNERS.map((winner) => {
              const isChampion = winner.rank === 1;

              return (
                <div
                  key={winner.id}
                  className={`winner-card winner-card-${winner.accent}${isChampion ? " winner-card-champion" : ""}`}
                  style={{ "--podium-order": winner.podiumOrder }}
                >
                  <span className="winner-frame-border" aria-hidden="true" />
                  <span className="winner-tick winner-tick-tl" aria-hidden="true" />
                  <span className="winner-tick winner-tick-tr" aria-hidden="true" />
                  <span className="winner-tick winner-tick-bl" aria-hidden="true" />
                  <span className="winner-tick winner-tick-br" aria-hidden="true" />

                  {/* Header / Rank indicator */}
                  <div className="winner-card-top">
                    <div className="winner-badge-pill">
                      {isChampion && <TrophyIcon />}
                      <span className="winner-badge-text">{winner.badge}</span>
                    </div>
                    <span className="winner-rank-num" aria-hidden="true">
                      0{winner.rank}
                    </span>
                  </div>

                  {/* Image container with click-to-zoom */}
                  <button
                    type="button"
                    className="winner-photo-wrapper"
                    onClick={() => setActiveModal(winner)}
                    aria-label={`View ceremony photo of ${winner.team}`}
                  >
                    <Image
                      src={winner.image}
                      alt={`${winner.team} receiving the ${winner.title} award at OctWave 3.0`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
                      className="winner-photo-img"
                      priority={isChampion}
                    />
                    <div className="winner-photo-overlay" aria-hidden="true">
                      <span className="winner-photo-zoom-prompt">
                        <ZoomIcon />
                        <span>Enlarge Photo</span>
                      </span>
                    </div>
                  </button>

                  {/* Winner Metadata */}
                  <div className="winner-card-info">
                    <div className="winner-prize-tag">
                      <span className="winner-prize-label">Prize Award</span>
                      <span className="winner-prize-amount">{winner.prize}</span>
                    </div>

                    <h3 className="winner-team-name">{winner.team}</h3>
                    <p className="winner-uni-name">{winner.university}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>

      {/* Lightbox Modal */}
      {activeModal && (
        <div
          className="winner-modal-backdrop"
          onClick={() => setActiveModal(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-team-title"
        >
          <div className="winner-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="winner-modal-close"
              onClick={() => setActiveModal(null)}
              aria-label="Close photo preview"
            >
              <CloseIcon />
            </button>

            <div className="winner-modal-image-wrap">
              <Image
                src={activeModal.image}
                alt={`${activeModal.team} award ceremony photo`}
                width={1024}
                height={682}
                className="winner-modal-img"
                priority
              />
            </div>

            <div className="winner-modal-caption">
              <div className="winner-modal-caption-badge">
                <span>{activeModal.badge}</span>
                <span className="winner-modal-prize">{activeModal.prize}</span>
              </div>
              <h3 id="modal-team-title" className="winner-modal-title">
                {activeModal.team}
              </h3>
              <p className="winner-modal-uni">{activeModal.university}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
