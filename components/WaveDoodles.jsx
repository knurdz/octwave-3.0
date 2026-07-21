"use client";

const WAVE_PATH_A =
  "M1 9C4.5 9 4.5 3 8 3C11.5 3 11.5 15 15 15C18.5 15 18.5 3 22 3C25.5 3 25.5 15 29 15C32.5 15 32.5 9 36 9C37.5 9 38.5 7.5 39 6";
const WAVE_PATH_B =
  "M1 9C4.5 9 4.5 14 8 14C11.5 14 11.5 4 15 4C18.5 4 18.5 14 22 14C25.5 14 25.5 4 29 4C32.5 4 32.5 9 36 9C37.5 9 38.5 10.5 39 12";
const WAVE_PATH_C =
  "M1 9C4.5 9 4.5 5 8 5C11.5 5 11.5 13 15 13C18.5 13 18.5 5 22 5C25.5 5 25.5 13 29 13C32.5 13 32.5 7 36 7C37.5 7 38.5 8 39 9";

const PRESETS = {
  default: [
    { top: "14%", left: "5%", w: 56, rotate: -10, opacity: 0.42, dur: 3.6, delay: 0, depth: 0.65 },
    { top: "42%", right: "6%", w: 66, rotate: 12, opacity: 0.36, dur: 4.1, delay: 0.5, depth: 1.05 },
    { top: "72%", left: "8%", w: 52, rotate: 8, opacity: 0.34, dur: 3.8, delay: 0.9, depth: 0.5 },
  ],
  dense: [
    { top: "10%", left: "4%", w: 58, rotate: -8, opacity: 0.42, dur: 3.5, delay: 0, depth: 0.6 },
    { top: "30%", right: "5%", w: 70, rotate: 14, opacity: 0.38, dur: 4.0, delay: 0.4, depth: 0.95 },
    { top: "54%", left: "6%", w: 54, rotate: 6, opacity: 0.35, dur: 3.7, delay: 0.8, depth: 0.45 },
    { top: "74%", right: "8%", w: 62, rotate: -12, opacity: 0.32, dur: 4.2, delay: 0.2, depth: 0.8 },
    { top: "90%", left: "42%", w: 48, rotate: 4, opacity: 0.28, dur: 3.9, delay: 0.6, depth: 0.7 },
  ],
};

function WaveDoodle({ width = 42, duration = 3.6, delay = 0 }) {
  const height = Math.round(width * 0.48);
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 18"
      fill="none"
      aria-hidden="true"
      className="digi-wave-svg"
    >
      <path
        className="digi-wave-path"
        d={WAVE_PATH_A}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <animate
          attributeName="d"
          values={`${WAVE_PATH_A};${WAVE_PATH_B};${WAVE_PATH_C};${WAVE_PATH_A}`}
          dur={`${duration}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;0.33;0.66;1"
          keySplines="0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1"
        />
      </path>
    </svg>
  );
}

export default function WaveDoodles({ preset = "default" }) {
  const items = PRESETS[preset] || PRESETS.default;

  return (
    <div className="wave-doodles" aria-hidden="true">
      {items.map((w, i) => (
        <span
          key={i}
          className="parallax-layer digi-wave-slot"
          data-depth={w.depth}
          style={{
            top: w.top,
            left: w.left,
            right: w.right,
          }}
        >
          <span
            className="digi-wave-doodle"
            style={{
              opacity: w.opacity,
              "--wave-rotate": `${w.rotate}deg`,
              transform: `rotate(${w.rotate}deg)`,
              animationDelay: `${w.delay}s`,
            }}
          >
            <WaveDoodle width={w.w} duration={w.dur} delay={w.delay} />
          </span>
        </span>
      ))}
    </div>
  );
}

export { WaveDoodle };
