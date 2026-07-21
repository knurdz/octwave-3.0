"use client";

import { useEffect, useRef, useState } from "react";

const symbols = ["{", "</>", "( )", "[ ]", "}"];

export default function Loader({ onDone }) {
  const [p, setP] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const onDoneRef = useRef(onDone);
  const finishedRef = useRef(false);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    finishedRef.current = false;

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      onDoneRef.current();
    };

    const symIv = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % symbols.length);
    }, 300);

    const iv = setInterval(() => {
      setP((prev) => {
        const next = prev + Math.random() * 15;
        if (next >= 100) {
          clearInterval(iv);
          clearInterval(symIv);
          setTimeout(finish, 500);
          return 100;
        }
        return next;
      });
    }, 80);

    const safetyTimeout = setTimeout(finish, 4000);

    return () => {
      clearInterval(iv);
      clearInterval(symIv);
      clearTimeout(safetyTimeout);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-[999]"
      style={{ background: "#02020e" }}
    >
      <div className="flex gap-5 mb-10">
        {symbols.map((sym, i) => (
          <span
            key={sym}
            className="font-mono text-lg transition-all duration-200"
            style={{
              color: i === activeIdx ? "#818cf8" : "#1e1b4b",
              transform: i === activeIdx ? "scale(1.2)" : "scale(1)",
              display: "inline-block",
              textShadow: i === activeIdx ? "0 0 12px #818cf8aa" : "none",
            }}
          >
            {sym}
          </span>
        ))}
      </div>

      <div className="w-[220px] h-[2px] bg-gray-900 overflow-hidden rounded">
        <div
          className="h-full transition-all duration-100 rounded"
          style={{
            width: `${p}%`,
            background: "linear-gradient(90deg, #7c3aed, #22d3ee)",
          }}
        />
      </div>

      <div className="text-xs mt-3 font-mono" style={{ color: "#334155" }}>
        {Math.round(p)}%
      </div>
    </div>
  );
}
