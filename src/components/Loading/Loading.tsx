"use client";

import { useEffect, useRef, useState } from "react";
import { useExperience } from "@/hooks/useExperience";
import { hero } from "@/projects/projectData";

/**
 * Phase 17: gated on real readiness signals (web font load + the WebGL
 * canvas actually mounting a first frame via assetsReady), not a fixed
 * setTimeout. Two checkpoints -> two real percentages, not an animated
 * fake bar.
 */
export default function Loading() {
  const { assetsReady, entered, enter } = useExperience();
  const [fontsReady, setFontsReady] = useState(false);
  const enterRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let cancelled = false;
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => {
        if (!cancelled) setFontsReady(true);
      });
    } else {
      setFontsReady(true);
    }
    return () => {
      cancelled = true;
    };
  }, []);

  const steps = [fontsReady, assetsReady];
  const progress = Math.round((steps.filter(Boolean).length / steps.length) * 100);
  const ready = progress === 100;

  useEffect(() => {
    if (ready) enterRef.current?.focus();
  }, [ready]);

  if (entered) return null;

  return (
    <div className={`loading-screen${entered ? " is-hidden" : ""}`} role="status" aria-live="polite">
      <div className="loading-name">{hero.name}</div>
      <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "var(--muted)", textTransform: "uppercase" }}>
        Initializing experience
      </div>
      <div className="loading-caps">
        {hero.caps.map((c) => (
          <span key={c} data-done={ready}>
            {c}
          </span>
        ))}
      </div>
      <div className="loading-bar-track">
        <div className="loading-bar-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="loading-pct">{progress}%</div>
      {ready && (
        <button ref={enterRef} className="enter-btn" onClick={enter} data-cursor="open">
          Enter →
        </button>
      )}
    </div>
  );
}
