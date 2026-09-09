"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Progressive-enhancement scroll reveals: elements are fully visible in
 * plain HTML/CSS. Only once this mounts does GSAP set an initial hidden
 * state and animate it in — so if JS fails to load, nothing stays
 * invisible. Targets [data-reveal] (single elements) and
 * [data-reveal-group] (staggers its direct [data-reveal-item] children).
 * Respects prefers-reduced-motion by skipping straight to the end state.
 *
 * Also drives [data-timeline-item]: once an entry has done its one-time
 * [data-reveal-item] fade-in, a scroll/resize listener continuously scales
 * + fades it by how close its center is to the viewport center, so the
 * entry currently "in focus" reads full-strength and neighbors recede.
 * Skipped entirely under reduced motion (falls back to the plain
 * fade-in-once state set above).
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const triggers: ScrollTrigger[] = [];

    const singles = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const groups = document.querySelectorAll<HTMLElement>("[data-reveal-group]");

    if (reduceMotion) {
      singles.forEach((el) => gsap.set(el, { clearProps: "all" }));
      groups.forEach((el) => gsap.set(el.querySelectorAll("[data-reveal-item]"), { clearProps: "all" }));
      return;
    }

    singles.forEach((el) => {
      gsap.set(el, { opacity: 0, y: 18 });
      const st = gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      }).scrollTrigger;
      if (st) triggers.push(st);
    });

    groups.forEach((group) => {
      const items = group.querySelectorAll("[data-reveal-item]");
      if (!items.length) return;
      gsap.set(items, { opacity: 0, y: 18 });
      const st = gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.06,
        scrollTrigger: { trigger: group, start: "top 88%", once: true },
      }).scrollTrigger;
      if (st) triggers.push(st);
    });

    ScrollTrigger.refresh();

    const timelineItems = document.querySelectorAll<HTMLElement>("[data-timeline-item]");
    let raf = 0;
    let onScroll: (() => void) | undefined;
    let onResize: (() => void) | undefined;

    if (timelineItems.length) {
      const update = () => {
        raf = 0;
        const center = window.innerHeight / 2;
        timelineItems.forEach((el) => {
          const rect = el.getBoundingClientRect();
          // Leave items that haven't entered (or have fully left) the
          // viewport alone — their one-time fade-in state stands until
          // they're actually in frame for the scrub to take over.
          if (rect.top > window.innerHeight || rect.bottom < 0) return;
          const elCenter = rect.top + rect.height / 2;
          const proximity = Math.max(0, 1 - Math.abs(elCenter - center) / (window.innerHeight * 0.6));
          gsap.set(el, { scale: 0.92 + proximity * 0.08, opacity: 0.45 + proximity * 0.55 });
        });
      };
      onScroll = () => {
        if (!raf) raf = requestAnimationFrame(update);
      };
      onResize = onScroll;
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
    }

    return () => {
      triggers.forEach((st) => st.kill());
      if (onScroll) window.removeEventListener("scroll", onScroll);
      if (onResize) window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}
