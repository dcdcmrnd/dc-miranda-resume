"use client";

import { useEffect, useRef } from "react";
import { useDevice } from "@/hooks/useDevice";

const ICONS: Record<string, JSX.Element> = {
  code: (
    <path d="M8 6 2 12l6 6M16 6l6 6-6 6M14 4l-4 16" strokeLinecap="round" strokeLinejoin="round" />
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3v2.4M12 18.6V21M21 12h-2.4M5.4 12H3M18.1 5.9l-1.7 1.7M7.6 16.4l-1.7 1.7M18.1 18.1l-1.7-1.7M7.6 7.6 5.9 5.9" strokeLinecap="round" />
    </>
  ),
  bolt: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" strokeLinejoin="round" />,
  film: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M8 5v14M16 5v14M3 9.5h5M16 9.5h5M3 14.5h5M16 14.5h5" />
    </>
  ),
  brush: <path d="M4 20c0-4 2-6 5-6s4 2 4 4-2 3-4 3-3-1-3-1M13 14 20 4l1 1-10 9" strokeLinecap="round" strokeLinejoin="round" />,
};

interface Placement {
  icon: keyof typeof ICONS;
  top: string;
  left: string;
  size: number;
  rotate: number;
  color: string;
}

/** Purely decorative scattered flat-icon accents (code / gear / bolt / film /
 * brush) — a flat-SVG stand-in for the reference's floating 3D objects,
 * representing DC's actual disciplines rather than any invented imagery.
 * Desktop + motion-safe visitors additionally get a light mouse-parallax
 * drift, each icon shifting by a different depth factor; touch and
 * reduced-motion visitors get the plain static scatter untouched. */
export default function FloatingIcons({ placements }: { placements: Placement[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { isTouch, reducedMotion, ready } = useDevice();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !ready || isTouch || reducedMotion) return;

    const icons = Array.from(root.querySelectorAll<HTMLElement>("[data-float-icon]"));
    let rect = root.getBoundingClientRect();
    let raf = 0;
    let px = 0;
    let py = 0;

    const apply = () => {
      raf = 0;
      icons.forEach((icon) => {
        const depth = Number(icon.dataset.depth) || 1;
        const base = icon.dataset.baseTransform || "";
        icon.style.transform = `${base} translate(${(px * 16 * depth).toFixed(1)}px, ${(py * 16 * depth).toFixed(1)}px)`;
      });
    };
    const onMove = (e: PointerEvent) => {
      px = (e.clientX - rect.left) / rect.width - 0.5;
      py = (e.clientY - rect.top) / rect.height - 0.5;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onResize = () => {
      rect = root.getBoundingClientRect();
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ready, isTouch, reducedMotion]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="floating-icons"
      style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}
    >
      {placements.map((p, i) => {
        const baseTransform = `rotate(${p.rotate}deg)`;
        return (
          <svg
            key={i}
            data-float-icon
            data-depth={(i % 3) + 1}
            data-base-transform={baseTransform}
            width={p.size}
            height={p.size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={p.color}
            strokeWidth="1.6"
            style={{
              position: "absolute",
              top: p.top,
              left: p.left,
              transform: baseTransform,
              opacity: 0.5,
            }}
          >
            {ICONS[p.icon]}
          </svg>
        );
      })}
    </div>
  );
}
