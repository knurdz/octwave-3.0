"use client";

/*
 * Section illustrations - fine-line "blueprint" style.
 * Shared language: 1px hairline strokes, dashed orbit rings,
 * tiny glowing nodes, crosshair ticks - matching the site's
 * editorial dark-purple aesthetic (section-ring, journey rail, etc).
 */

const INK = "#b794f6";
const INK_BRIGHT = "#c4b5fd";

function Crosshair({ x, y, size = 5, opacity = 0.35 }) {
  return (
    <g stroke={INK} strokeOpacity={opacity} strokeWidth="1" strokeLinecap="round">
      <line x1={x - size} y1={y} x2={x + size} y2={y} />
      <line x1={x} y1={y - size} x2={x} y2={y + size} />
    </g>
  );
}

/* ── About: signal constellation ─────────────────────
   A dashed orbit enclosing a constellation of nodes with
   a sine wave passing through - data + waves. */
function NeuralNet() {
  const wave =
    "M20 104 C54 104 54 74 88 74 C122 74 122 130 156 130 C190 130 190 88 224 88 C244 88 252 98 264 96";
  return (
    <svg viewBox="0 0 280 200" fill="none" aria-hidden="true" className="section-illu-svg">
      {/* orbit rings */}
      <g className="illu-spin-slow">
        <circle cx="148" cy="100" r="80" stroke={INK} strokeOpacity="0.4" strokeWidth="0.8" strokeDasharray="2 7" />
      </g>
      <circle cx="148" cy="100" r="57" stroke={INK} strokeOpacity="0.16" strokeWidth="0.7" />
      <circle cx="148" cy="20" r="2.2" fill={INK_BRIGHT} fillOpacity="0.8" className="illu-node" />

      {/* constellation hairlines */}
      <g stroke={INK} strokeOpacity="0.3" strokeWidth="1" strokeLinecap="round">
        <line x1="148" y1="98" x2="106" y2="70" className="illu-line" />
        <line x1="148" y1="98" x2="180" y2="56" className="illu-line" style={{ animationDelay: "0.4s" }} />
        <line x1="148" y1="98" x2="198" y2="122" className="illu-line" style={{ animationDelay: "0.8s" }} />
        <line x1="148" y1="98" x2="138" y2="146" className="illu-line" style={{ animationDelay: "1.2s" }} />
        <line x1="106" y1="70" x2="180" y2="56" className="illu-line" style={{ animationDelay: "0.6s" }} />
        <line x1="198" y1="122" x2="138" y2="146" className="illu-line" style={{ animationDelay: "1s" }} />
        <line x1="106" y1="70" x2="92" y2="120" className="illu-line" style={{ animationDelay: "0.2s" }} />
        <line x1="92" y1="120" x2="138" y2="146" className="illu-line" style={{ animationDelay: "1.4s" }} />
      </g>

      {/* nodes */}
      <g fill={INK_BRIGHT}>
        <circle cx="148" cy="98" r="3.4" className="illu-node" />
        <circle cx="106" cy="70" r="2.4" fillOpacity="0.85" className="illu-node" style={{ animationDelay: "0.3s" }} />
        <circle cx="180" cy="56" r="2.2" fillOpacity="0.75" className="illu-node" style={{ animationDelay: "0.6s" }} />
        <circle cx="198" cy="122" r="2.6" fillOpacity="0.85" className="illu-node" style={{ animationDelay: "0.9s" }} />
        <circle cx="138" cy="146" r="2.2" fillOpacity="0.75" className="illu-node" style={{ animationDelay: "1.2s" }} />
        <circle cx="92" cy="120" r="2" fillOpacity="0.65" className="illu-node" style={{ animationDelay: "1.5s" }} />
      </g>

      {/* wave passing through */}
      <path
        d={wave}
        stroke={INK}
        strokeOpacity="0.55"
        strokeWidth="1.2"
        strokeLinecap="round"
        className="illu-path-draw"
      />
      <circle r="2.4" fill="#fff" opacity="0.85">
        <animateMotion dur="6s" repeatCount="indefinite" path={wave} />
      </circle>

      {/* survey ticks */}
      <Crosshair x={26} y={30} />
      <Crosshair x={254} y={166} opacity={0.25} />
    </svg>
  );
}

/* ── Structure: phase strata ─────────────────────────
   Three wireframe planes stacked in isometric space -
   workshops, preliminary, finale. */
function PhaseCascade() {
  const plane = (cy) => `M120 ${cy - 27} L198 ${cy} L120 ${cy + 27} L42 ${cy} Z`;
  return (
    <svg viewBox="0 0 240 220" fill="none" aria-hidden="true" className="section-illu-svg">
      {/* dashed orbit behind */}
      <g className="illu-spin-slow">
        <circle cx="120" cy="112" r="97" stroke={INK} strokeOpacity="0.28" strokeWidth="0.7" strokeDasharray="2 8" />
      </g>

      {/* vertical guides between plane corners */}
      <g stroke={INK} strokeOpacity="0.18" strokeWidth="1">
        <line x1="42" y1="58" x2="42" y2="166" />
        <line x1="198" y1="58" x2="198" y2="166" />
        <line x1="120" y1="31" x2="120" y2="85" strokeDasharray="1 4" />
        <line x1="120" y1="139" x2="120" y2="193" strokeDasharray="1 4" />
      </g>

      {/* wireframe planes (bottom to top for stacking) */}
      <g className="illu-layer" style={{ animationDelay: "0.4s" }}>
        <path d={plane(166)} stroke={INK} strokeOpacity="0.3" strokeWidth="1" />
        <circle cx="120" cy="166" r="2.2" fill={INK_BRIGHT} fillOpacity="0.6" className="illu-node" style={{ animationDelay: "0.8s" }} />
      </g>
      <g className="illu-layer" style={{ animationDelay: "0.2s" }}>
        <path d={plane(112)} fill="rgba(183,148,246,0.045)" stroke={INK} strokeOpacity="0.45" strokeWidth="1" />
        <circle cx="120" cy="112" r="2.6" fill={INK_BRIGHT} fillOpacity="0.8" className="illu-node" style={{ animationDelay: "0.4s" }} />
      </g>
      <g className="illu-layer">
        <path d={plane(58)} stroke={INK_BRIGHT} strokeOpacity="0.6" strokeWidth="1" />
        <circle cx="120" cy="58" r="3" fill={INK_BRIGHT} className="illu-node" />
      </g>

      {/* ascent dots beside the stack */}
      <g fill={INK_BRIGHT}>
        <circle cx="216" cy="140" r="1.6" fillOpacity="0.4" className="illu-node" style={{ animationDelay: "0.9s" }} />
        <circle cx="221" cy="112" r="1.8" fillOpacity="0.55" className="illu-node" style={{ animationDelay: "0.6s" }} />
        <circle cx="216" cy="84" r="2" fillOpacity="0.75" className="illu-node" style={{ animationDelay: "0.3s" }} />
      </g>

      <Crosshair x={26} y={26} />
      <Crosshair x={212} y={198} opacity={0.25} />
    </svg>
  );
}

/* ── Timeline: journey wave ──────────────────────────
   A drawn wave with dashed milestone rings - echoes the
   journey rail below it. */
function JourneyPath() {
  const path =
    "M12 66 C52 66 52 30 92 30 C132 30 132 92 172 92 C212 92 212 42 252 42 C282 42 294 60 308 56";
  return (
    <svg viewBox="0 0 320 120" fill="none" aria-hidden="true" className="section-illu-svg">
      <defs>
        <linearGradient id="illu-path-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={INK} stopOpacity="0.1" />
          <stop offset="50%" stopColor={INK} stopOpacity="0.7" />
          <stop offset="100%" stopColor={INK_BRIGHT} stopOpacity="0.25" />
        </linearGradient>
      </defs>

      {/* faint echo of the path */}
      <path
        d="M12 74 C52 74 52 38 92 38 C132 38 132 100 172 100 C212 100 212 50 252 50 C282 50 294 68 308 64"
        stroke={INK}
        strokeOpacity="0.1"
        strokeWidth="1"
        strokeDasharray="2 5"
        fill="none"
      />

      {/* main wave */}
      <path
        d={path}
        stroke="url(#illu-path-grad)"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
        className="illu-path-draw"
      />

      {/* milestones: dashed ring + node, like the journey dots */}
      {[
        { cx: 92, cy: 30 },
        { cx: 172, cy: 92 },
        { cx: 252, cy: 42 },
      ].map((p, i) => (
        <g key={i} className="illu-node" style={{ animationDelay: `${i * 0.4}s` }}>
          <circle cx={p.cx} cy={p.cy} r="9" stroke={INK} strokeOpacity="0.5" strokeWidth="0.8" strokeDasharray="2 4" fill="none" />
          <circle cx={p.cx} cy={p.cy} r="2.4" fill={INK_BRIGHT} />
        </g>
      ))}

      {/* traveling spark */}
      <circle r="2.4" fill="#fff" opacity="0.85">
        <animateMotion dur="5.5s" repeatCount="indefinite" path={path} />
      </circle>

      <Crosshair x={20} y={104} opacity={0.25} />
      <Crosshair x={302} y={16} opacity={0.25} />
    </svg>
  );
}

/* ── Rules: charter sheet ────────────────────────────
   A hairline document with ruled clauses and a dashed
   wave seal - the OctWave codebook. */
function RuleBook() {
  return (
    <svg viewBox="0 0 200 220" fill="none" aria-hidden="true" className="section-illu-svg">
      {/* back sheet */}
      <rect x="54" y="24" width="102" height="142" rx="3" stroke={INK} strokeOpacity="0.15" strokeWidth="1" />
      {/* front sheet */}
      <rect x="42" y="34" width="102" height="142" rx="3" fill="rgba(183,148,246,0.03)" stroke={INK} strokeOpacity="0.45" strokeWidth="1" />

      {/* margin rule */}
      <line x1="56" y1="46" x2="56" y2="164" stroke={INK} strokeOpacity="0.2" strokeWidth="0.8" strokeDasharray="1 4" />

      {/* ruled clauses */}
      {[
        { y: 56, x2: 128 },
        { y: 71, x2: 118 },
        { y: 86, x2: 130 },
        { y: 101, x2: 104 },
        { y: 116, x2: 126 },
        { y: 131, x2: 112 },
        { y: 146, x2: 92 },
      ].map((l, i) => (
        <g key={l.y} className="illu-line" style={{ animationDelay: `${i * 0.18}s` }}>
          <circle cx="63" cy={l.y} r="1.1" fill={INK_BRIGHT} fillOpacity="0.55" />
          <line
            x1="70"
            y1={l.y}
            x2={l.x2}
            y2={l.y}
            stroke={INK_BRIGHT}
            strokeOpacity={i % 2 ? 0.22 : 0.32}
            strokeWidth="1"
            strokeLinecap="round"
          />
        </g>
      ))}

      {/* wave seal */}
      <g className="illu-node" style={{ animationDelay: "0.5s" }}>
        <g className="illu-spin-slow">
          <circle cx="146" cy="170" r="21" stroke={INK} strokeOpacity="0.55" strokeWidth="0.8" strokeDasharray="2 5" fill="#050508" />
        </g>
        <circle cx="146" cy="170" r="13.5" stroke={INK} strokeOpacity="0.3" strokeWidth="0.8" fill="none" />
        <path
          d="M137 170 C140 165.5 142 165.5 145 170 C148 174.5 150 174.5 153 170 C154.5 167.8 156 167.8 157.5 169.5"
          stroke={INK_BRIGHT}
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      <Crosshair x={168} y={28} opacity={0.3} />
      <Crosshair x={26} y={196} opacity={0.22} />
    </svg>
  );
}

/* ── Top 70: roster lattice ──────────────────────────
   A 10×7 node grid — seventy points, a few lit. */
function RosterLattice() {
  const cols = 10;
  const rows = 7;
  const ox = 22;
  const oy = 30;
  const gap = 20;
  const nodes = Array.from({ length: cols * rows }, (_, i) => {
    const c = i % cols;
    const r = Math.floor(i / cols);
    return { x: ox + c * gap, y: oy + r * gap, i };
  });
  const lit = new Set([3, 12, 21, 24, 33, 35, 42, 46, 55, 64]);
  const path = `M${nodes[3].x} ${nodes[3].y} L${nodes[12].x} ${nodes[12].y} L${nodes[21].x} ${nodes[21].y} L${nodes[24].x} ${nodes[24].y} L${nodes[33].x} ${nodes[33].y} L${nodes[35].x} ${nodes[35].y} L${nodes[46].x} ${nodes[46].y} L${nodes[55].x} ${nodes[55].y} L${nodes[64].x} ${nodes[64].y}`;

  return (
    <svg viewBox="0 0 240 200" fill="none" aria-hidden="true" className="section-illu-svg">
      <g className="illu-spin-slow">
        <circle cx="120" cy="98" r="92" stroke={INK} strokeOpacity="0.28" strokeWidth="0.7" strokeDasharray="2 8" />
      </g>
      <circle cx="120" cy="98" r="68" stroke={INK} strokeOpacity="0.12" strokeWidth="0.7" />

      <path d={path} stroke={INK} strokeOpacity="0.28" strokeWidth="0.9" className="illu-path-draw" />

      {nodes.map((n) => {
        const isLit = lit.has(n.i);
        return (
          <circle
            key={n.i}
            cx={n.x}
            cy={n.y}
            r={isLit ? 2.6 : 1.35}
            fill={INK_BRIGHT}
            fillOpacity={isLit ? 0.95 : 0.28}
            className="illu-node"
            style={{ animationDelay: `${(n.i % 12) * 0.12}s` }}
          />
        );
      })}

      <Crosshair x={18} y={18} />
      <Crosshair x={222} y={178} opacity={0.25} />
    </svg>
  );
}

/* ── Top 10: ten nodes on a dashed ring ──────────── */
function FinalistRing() {
  const cx = 120;
  const cy = 100;
  const r = 64;
  const nodes = Array.from({ length: 10 }, (_, i) => {
    const a = (Math.PI * 2 * i) / 10 - Math.PI / 2;
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r, i };
  });

  return (
    <svg viewBox="0 0 240 200" fill="none" aria-hidden="true" className="section-illu-svg">
      <g className="illu-spin-slow">
        <circle cx={cx} cy={cy} r="88" stroke={INK} strokeOpacity="0.28" strokeWidth="0.7" strokeDasharray="2 8" />
      </g>
      <circle cx={cx} cy={cy} r={r} stroke={INK} strokeOpacity="0.45" strokeWidth="0.9" strokeDasharray="3 6" />
      <circle cx={cx} cy={cy} r="36" stroke={INK} strokeOpacity="0.14" strokeWidth="0.7" />
      <circle cx={cx} cy={cy} r="3" fill={INK_BRIGHT} className="illu-node" />

      {nodes.map((n) => (
        <g key={n.i} className="illu-node" style={{ animationDelay: `${n.i * 0.18}s` }}>
          <circle cx={n.x} cy={n.y} r="9" stroke={INK} strokeOpacity="0.4" strokeWidth="0.7" strokeDasharray="2 4" fill="none" />
          <circle cx={n.x} cy={n.y} r="2.4" fill={INK_BRIGHT} />
        </g>
      ))}

      <Crosshair x={22} y={22} />
      <Crosshair x={218} y={176} opacity={0.25} />
    </svg>
  );
}

const ILLUSTRATIONS = {
  neural: NeuralNet,
  cascade: PhaseCascade,
  path: JourneyPath,
  book: RuleBook,
  lattice: RosterLattice,
  finalists: FinalistRing,
};

export default function SectionIllustration({
  variant = "neural",
  className = "",
  float = true,
}) {
  const Illu = ILLUSTRATIONS[variant] || NeuralNet;

  return (
    <div
      className={`section-illu ${float ? "section-illu-float" : ""} ${className}`.trim()}
      aria-hidden="true"
    >
      <div className="section-illu-glow" />
      <Illu />
    </div>
  );
}
