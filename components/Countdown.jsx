"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2026-07-12T23:59:59");

function pad(n) {
  return String(Math.max(0, n)).padStart(2, "0");
}

function getTimeLeft() {
  const diff = TARGET - Date.now();
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s };
}

const units = [{ key: "d" }, { key: "h" }, { key: "m" }, { key: "s" }];

export default function Countdown() {
  const [t, setT] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setT(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="countdown-wrapper hero-countdown-inner max-md:flex-col max-md:py-5">
      <div className="countdown-label max-md:text-center">
        REGISTRATION
        <br />
        CLOSES IN
      </div>

      <div className="countdown-digits">
        {units.map((u, i) => (
          <div key={u.key} style={{ display: "flex", alignItems: "center", gap: 2 }}>
            <span className="countdown-num">{pad(t[u.key])}</span>
            {i < units.length - 1 && <span className="countdown-sep">:</span>}
          </div>
        ))}
      </div>

      <div className="countdown-deadline">
        July
        <br />
        12<sup>th</sup>
      </div>
    </div>
  );
}
