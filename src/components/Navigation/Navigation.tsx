"use client";

import { useExperience, LocationId } from "@/hooks/useExperience";

const NAV_ITEMS: Array<{ id: LocationId; label: string }> = [
  { id: "work", label: "Work" },
  { id: "automation", label: "AI + Automation" },
  { id: "gohighlevel", label: "GoHighLevel" },
  { id: "video", label: "Creative" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

/** Phase 10: clicking nav sets `location` — no scrollIntoView, no page
 * reload. The camera rig reacts to the state change. */
export default function Navigation() {
  const { location, goTo } = useExperience();

  return (
    <nav className="hud-nav" aria-label="Primary">
      <button className="hud-status" style={{ background: "none", border: "none" }} onClick={() => goTo("intro")} data-cursor="view">
        <span className="hud-dot" aria-hidden="true" />
        <b style={{ color: "var(--fg)" }}>DC_MIRANDA</b>
      </button>
      <div className="nav-links">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className="pill"
            data-active={location === item.id}
            data-cursor="view"
            onClick={() => goTo(item.id)}
            aria-current={location === item.id ? "page" : undefined}
          >
            [{item.label}]
          </button>
        ))}
      </div>
    </nav>
  );
}
