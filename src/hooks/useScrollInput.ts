"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * There is no tall scrollable document in this experience — the whole thing
 * is a fixed-viewport 3D application (Phase 10: navigation should feel like
 * an app, not a page that scrolls to sections). Wheel/touch input is instead
 * captured as a virtual signal that (a) gives the camera a small continuous
 * dolly nudge for "the world reacts to scroll" (Phase 9), and (b) fires a
 * swipe callback used to step through the work gallery.
 */
export function useScrollInput(onSwipe?: (direction: 1 | -1) => void) {
  const dolly = useRef(0);
  const accum = useRef(0);
  const swipeAccum = useRef(0);
  const cooldown = useRef(false);

  useEffect(() => {
    function triggerSwipe(dir: 1 | -1) {
      if (cooldown.current || !onSwipe) return;
      cooldown.current = true;
      onSwipe(dir);
      window.setTimeout(() => {
        cooldown.current = false;
      }, 550);
    }

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      accum.current = THREE.MathUtils.clamp(accum.current + e.deltaY * 0.0015, -1.2, 1.2);
      swipeAccum.current += e.deltaY;
      if (swipeAccum.current > 90) {
        triggerSwipe(1);
        swipeAccum.current = 0;
      } else if (swipeAccum.current < -90) {
        triggerSwipe(-1);
        swipeAccum.current = 0;
      }
    }

    let touchStartY = 0;
    function onTouchStart(e: TouchEvent) {
      touchStartY = e.touches[0].clientY;
    }
    function onTouchMove(e: TouchEvent) {
      const dy = touchStartY - e.touches[0].clientY;
      accum.current = THREE.MathUtils.clamp(accum.current + dy * 0.004, -1.2, 1.2);
      touchStartY = e.touches[0].clientY;
      swipeAccum.current += dy * 2.2;
      if (swipeAccum.current > 90) {
        triggerSwipe(1);
        swipeAccum.current = 0;
      } else if (swipeAccum.current < -90) {
        triggerSwipe(-1);
        swipeAccum.current = 0;
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    let raf = 0;
    function tick() {
      dolly.current = THREE.MathUtils.lerp(dolly.current, accum.current, 0.08);
      accum.current *= 0.94;
      swipeAccum.current *= 0.9;
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      cancelAnimationFrame(raf);
    };
  }, [onSwipe]);

  return dolly;
}
