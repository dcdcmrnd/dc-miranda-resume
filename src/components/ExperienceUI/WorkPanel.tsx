"use client";

import { useMemo } from "react";
import { useExperience } from "@/hooks/useExperience";
import { projects, categories, CategoryId } from "@/projects/projectData";

const FILTERS: Array<{ id: CategoryId | "all"; label: string }> = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "software", label: "Software" },
  { id: "gohighlevel", label: "GoHighLevel" },
  { id: "automation", label: "Automation" },
  { id: "video", label: "Graphics/Video" },
];

/** Phase 7/11: the project gallery as HTML metadata driven by real data —
 * the visual representation lives in the 3D scene (WorkGallery markers);
 * this panel is the numbered/tagged information layer next to it. */
export default function WorkPanel() {
  const { selectedCategory, setSelectedCategory, selectedProjectId, selectProject } = useExperience();

  const visible = useMemo(
    () => (selectedCategory === "all" ? projects : projects.filter((p) => p.category === selectedCategory)),
    [selectedCategory]
  );

  return (
    <div className="location-panel" style={{ maxWidth: 560 }}>
      <p className="kicker">// Archive:// Node: Selected_Work</p>
      <h1 className="huge-title" style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)" }}>
        Selected Work
      </h1>
      <div className="filter-row">
        {FILTERS.map((f) => (
          <button key={f.id} data-active={selectedCategory === f.id} data-cursor="view" onClick={() => setSelectedCategory(f.id)}>
            [{f.label}]
          </button>
        ))}
      </div>
      <div className="project-list">
        {visible.map((p, i) => (
          <button
            key={p.id}
            className={`project-row${p.status === "pending" ? " is-pending" : ""}`}
            data-active={selectedProjectId === p.id}
            data-cursor={p.status === "live" ? "open" : "view"}
            onClick={() => selectProject(p.id)}
          >
            <span className="idx">{String(i + 1).padStart(2, "0")}</span>
            <span className="name">{p.name}</span>
            <span className="cat">{p.categoryLabel}</span>
            <span className="act">{p.action}</span>
          </button>
        ))}
      </div>
      <p className="muted-text" style={{ marginTop: 14, fontSize: 12 }}>
        Select a row to bring it into focus in the gallery, or a category card in the scene.
      </p>
      <div className="tag-row" style={{ marginTop: 4 }}>
        {categories.map((c) => (
          <span key={c.id}>{c.name}</span>
        ))}
      </div>
    </div>
  );
}
