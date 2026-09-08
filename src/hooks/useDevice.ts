"use client";

import { useEffect, useState } from "react";

export interface DeviceInfo {
  isTouch: boolean;
  isMobile: boolean;
  reducedMotion: boolean;
  ready: boolean;
}

/**
 * Central device capability check. Server-rendered default assumes the most
 * conservative (desktop, motion-safe) case; the real values settle on the
 * client after mount, and every consumer treats `ready` as the gate before
 * branching so SSR/hydration never mismatches.
 */
export function useDevice(): DeviceInfo {
  const [info, setInfo] = useState<DeviceInfo>({
    isTouch: false,
    isMobile: false,
    reducedMotion: false,
    ready: false,
  });

  useEffect(() => {
    const touchQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    const mobileQuery = window.matchMedia("(max-width: 760px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    function update() {
      setInfo({
        isTouch: touchQuery.matches,
        isMobile: mobileQuery.matches,
        reducedMotion: motionQuery.matches,
        ready: true,
      });
    }
    update();

    touchQuery.addEventListener("change", update);
    mobileQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);
    return () => {
      touchQuery.removeEventListener("change", update);
      mobileQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  return info;
}
