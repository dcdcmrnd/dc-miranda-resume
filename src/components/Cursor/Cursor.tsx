"use client";

import { useEffect, useRef, useState } from "react";
import { useDevice } from "@/hooks/useDevice";

type CursorState = "default" | "view" | "open" | "drag";

/** Phase 16: subtle custom cursor with default/view/open/drag states,
 * driven by data-cursor="view|open|drag" on interactive DOM elements.
 * Desktop only — never rendered on touch devices. */
export default function Cursor() {
  const device = useDevice();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, rx: 0, ry: 0 });
  const [state, setState] = useState<CursorState>("default");

  useEffect(() => {
    if (!device.ready || device.isTouch) return;
    document.documentElement.classList.add("has-cursor-fx");

    function onMove(e: PointerEvent) {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    }
    function onOver(e: PointerEvent) {
      const el = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      setState((el?.getAttribute("data-cursor") as CursorState) || "default");
    }
    function onDown(e: PointerEvent) {
      const el = (e.target as HTMLElement)?.closest?.("[data-cursor='drag']");
      if (el) setState("drag");
    }
    function onUp() {
      setState((prev) => (prev === "drag" ? "default" : prev));
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });

    let raf = 0;
    function tick() {
      if (dot.current) dot.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%,-50%)`;
      pos.current.rx += (pos.current.x - pos.current.rx) * 0.2;
      pos.current.ry += (pos.current.y - pos.current.ry) * 0.2;
      if (ring.current)
        ring.current.style.transform = `translate3d(${pos.current.rx}px, ${pos.current.ry}px, 0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("has-cursor-fx");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      cancelAnimationFrame(raf);
    };
  }, [device.ready, device.isTouch]);

  if (!device.ready || device.isTouch) return null;

  const label = state === "view" ? "VIEW" : state === "open" ? "OPEN →" : state === "drag" ? "DRAG" : "";

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" data-state={state} aria-hidden="true">
        {label}
      </div>
    </>
  );
}
