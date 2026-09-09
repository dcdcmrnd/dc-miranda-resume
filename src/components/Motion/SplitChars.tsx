"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Per-character blur-reveal, matching the reference site's footer/social
 * links exactly: each letter is its own span, starting at opacity 0.2 /
 * blur(6px) / translateY(5px), staggering in to full clarity once the
 * link scrolls into view. Progressive enhancement like the rest of this
 * project's reveals — plain readable text without JS, GSAP only animates
 * once mounted, and prefers-reduced-motion skips straight to the end
 * state.
 */
export default function SplitChars({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = Array.from(el.querySelectorAll<HTMLElement>("[data-char]"));
    if (!chars.length) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      gsap.set(chars, { clearProps: "all" });
      return;
    }

    gsap.set(chars, { opacity: 0.2, filter: "blur(6px)", y: 5 });
    const tween = gsap.to(chars, {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.02,
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [text]);

  return (
    <span ref={ref} className={className}>
      {Array.from(text).map((ch, i) => (
        <span key={i} data-char style={{ display: "inline-block" }}>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}
