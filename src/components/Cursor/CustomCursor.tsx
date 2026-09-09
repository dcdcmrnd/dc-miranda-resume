"use client";

import { useEffect, useRef } from "react";
import { useDevice } from "@/hooks/useDevice";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], input, textarea, select";

/**
 * Minimal custom cursor: a ring that follows the pointer and grows over
 * interactive elements, matching the reference site's cursor treatment
 * (it uses a static custom cursor image; this achieves the same "the
 * pointer itself feels designed" effect without a fabricated asset).
 * Desktop + motion-safe only — CSS media queries below additionally hide
 * it on touch/coarse pointers and under prefers-reduced-motion.
 */
export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const { isTouch, reducedMotion, ready } = useDevice();
  const active = ready && !isTouch && !reducedMotion;

  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const apply = () => {
      raf = 0;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      el.classList.toggle("is-hover", !!target.closest(INTERACTIVE_SELECTOR));
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [active]);

  if (!active) return null;

  return <div ref={ref} className="custom-cursor" aria-hidden="true" />;
}
