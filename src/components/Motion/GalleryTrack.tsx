"use client";

import { useEffect, useRef } from "react";
import { useDevice } from "@/hooks/useDevice";

/**
 * Horizontal scroll-scrubbed gallery, matching the reference site's
 * technique: vertical scroll through a tall runway section drives
 * horizontal translateX on a sticky-pinned track, and each item
 * blurs/dims by distance from viewport center (sharp when centered, soft
 * at the edges).
 *
 * Touch and reduced-motion visitors get the honest fallback instead of a
 * faked version of the effect: a plain native horizontal scroller
 * (overflow-x, scroll-snap) with every item at full clarity — still
 * genuinely horizontal (never collapsed to a vertical stack), just
 * user-driven rather than scroll-linked, which is the appropriate call on
 * touch where wheel-driven scroll-jacking doesn't apply anyway.
 */
export default function GalleryTrack({ children }: { children: React.ReactNode }) {
  const runwayRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { isTouch, reducedMotion, ready } = useDevice();
  const scrubActive = ready && !isTouch && !reducedMotion;

  useEffect(() => {
    const runway = runwayRef.current;
    const track = trackRef.current;
    if (!runway || !track || !scrubActive) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = runway.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = rect.height - vh;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
      // track is width:max-content (sized to its own content), so its
      // clientWidth always equals scrollWidth — "overflow" only exists
      // relative to the viewport, not the track's own box.
      const maxScroll = Math.max(0, track.scrollWidth - window.innerWidth);
      track.style.transform = `translate3d(${-progress * maxScroll}px, 0, 0)`;

      const center = window.innerWidth / 2;
      track.querySelectorAll<HTMLElement>("[data-gallery-item]").forEach((item) => {
        const ir = item.getBoundingClientRect();
        const itemCenter = ir.left + ir.width / 2;
        const dist = Math.abs(itemCenter - center);
        const proximity = Math.max(0, 1 - dist / (window.innerWidth * 0.55));
        item.style.filter = `blur(${(1 - proximity) * 6}px)`;
        item.style.opacity = String(0.35 + proximity * 0.65);
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [scrubActive]);

  if (!scrubActive) {
    return (
      <div className="gallery-native">
        <div className="gallery-track">{children}</div>
      </div>
    );
  }

  return (
    <div ref={runwayRef} className="gallery-scrub-runway">
      <div className="gallery-scrub-pin">
        <div ref={trackRef} className="gallery-track">
          {children}
        </div>
      </div>
    </div>
  );
}
