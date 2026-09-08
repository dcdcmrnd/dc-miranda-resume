"use client";

import { useExperience } from "@/hooks/useExperience";
import { categories, projectsByCategory, aiAutomationFlow, ghlFlow, CategoryId } from "@/projects/projectData";
import ProjectRow from "@/components/ProjectUI/ProjectRow";

/** Phase 12–15: each category location shows its real capability
 * description, real tags, and its real project rows (or an honest
 * "in progress" status) next to the category's dedicated 3D environment. */
export default function CategoryPanel({ category }: { category: CategoryId }) {
  const { goTo } = useExperience();
  const data = categories.find((c) => c.id === category)!;
  const items = projectsByCategory(category);

  const extra =
    category === "automation" ? aiAutomationFlow : category === "gohighlevel" ? ghlFlow : null;

  return (
    <div className="location-panel">
      <p className="kicker">
        // Archive:// Node: {data.name.toUpperCase()}
      </p>
      <h1 className="huge-title" style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)" }}>
        {data.number}
        <br />
        {data.name}
      </h1>
      <p className="body-text">{data.description}</p>
      {extra && <p className="muted-text">{extra.body}</p>}
      <div className="tag-row">{data.tags.join(" · ")}</div>

      {items.length > 0 && (
        <div className="project-list" style={{ maxHeight: "26vh" }}>
          {items.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} />
          ))}
        </div>
      )}

      <div className="cta-row">
        <button className="btn-outline" data-cursor="view" onClick={() => goTo("work")}>
          ← All work
        </button>
      </div>
    </div>
  );
}
