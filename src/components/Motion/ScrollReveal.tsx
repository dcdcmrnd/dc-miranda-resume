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

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, [pathname]);

  return null;
}
