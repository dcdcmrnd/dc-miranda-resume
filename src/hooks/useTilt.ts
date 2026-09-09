"use client";

import { useEffect, useRef } from "react";

interface TiltOptions {
  max?: number; // max rotation in degrees
  scale?: number; // scale applied while active
  disabled?: boolean;
  baseRotateZ?: number; // static 2D rotation to preserve (e.g. the hero photo's sticker tilt)
  liftPx?: number; // translateY applied while hovering, replaces an existing CSS :hover lift the inline transform would otherwise clobber
}

/**
 * Pointer-driven tilt, ported from the original vanilla site's `initTilt`:
 * cache the element's rect once on pointerenter (not on every move), batch
 * the actual style write through a single requestAnimationFrame. No-ops
 * entirely when `disabled` (coarse pointer / prefers-reduced-motion) —
 * callers pass that in from `useDevice`, so touch/reduced-motion visitors
 * keep the plain, already-shipped static element untouched.
 */
export function useTilt<T extends HTMLElement>({ max = 6, scale = 1, disabled = false, baseRotateZ = 0, liftPx = 0 }: TiltOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return;

    let rect: DOMRect | null = null;
    let pendingX = 0;
    let pendingY = 0;
    let raf: number | null = null;
    const zPart = baseRotateZ ? ` rotateZ(${baseRotateZ}deg)` : "";
    const liftPart = liftPx ? ` translateY(${liftPx}px)` : "";

    function apply() {
      raf = null;
      if (!el) return;
      el.style.transform = `perspective(900px) rotateX(${(-pendingY * max).toFixed(2)}deg) rotateY(${(pendingX * max).toFixed(2)}deg)${zPart}${liftPart} scale(${scale})`;
    }

    // Inline transform takes over from any CSS :hover transform (e.g. an
    // existing translateY lift) the moment JS attaches, so `apply()` folds
    // that lift back in via `liftPx` — and runs once on enter, before any
    // move, so the lift still appears immediately like the CSS version did.
    function onEnter() {
      rect = el!.getBoundingClientRect();
      if (!raf) raf = requestAnimationFrame(apply);
    }
    function onMove(e: PointerEvent) {
      if (!rect) rect = el!.getBoundingClientRect();
      pendingX = (e.clientX - rect.left) / rect.width - 0.5;
      pendingY = (e.clientY - rect.top) / rect.height - 0.5;
      if (!raf) raf = requestAnimationFrame(apply);
    }
    function onLeave() {
      rect = null;
      pendingX = 0;
      pendingY = 0;
      if (raf) cancelAnimationFrame(raf);
      raf = null;
      el!.style.transform = baseRotateZ ? `rotateZ(${baseRotateZ}deg)` : "";
    }

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [max, scale, disabled, baseRotateZ, liftPx]);

  return ref;
}
