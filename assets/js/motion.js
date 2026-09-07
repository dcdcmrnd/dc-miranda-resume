/**
 * Centralized motion tokens.
 * Single source of truth for durations, easings, stagger and distance
 * values used across the reveal / parallax / cursor / hover systems in
 * main.js. No animation values should be hard-coded outside this file.
 */
window.MOTION = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 0.9,
    hero: 1.1,
  },
  ease: {
    standard: "power2.out",
    inOut: "power2.inOut",
    expressive: "expo.out",
  },
  stagger: {
    tight: 0.035,
    normal: 0.06,
    loose: 0.12,
  },
  distance: {
    sm: 14,
    md: 26,
    lg: 46,
  },
  scrollTrigger: {
    start: "top 88%",
    once: true,
  },
};
