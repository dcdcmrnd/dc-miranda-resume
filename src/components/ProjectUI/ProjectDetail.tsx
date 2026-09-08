"use client";

import { useExperience } from "@/hooks/useExperience";
import { projects, categories } from "@/projects/projectData";

/** Phase 8: selecting a project (3D marker or HTML row) opens this detail
 * panel instead of a modal dialog — the camera has already focused toward
 * the project's marker in the scene behind it. */
export default function ProjectDetail() {
  const { selectedProjectId, selectProject } = useExperience();
  if (!selectedProjectId) return null;

  const project = projects.find((p) => p.id === selectedProjectId);
  if (!project) return null;
  const category = categories.find((c) => c.id === project.category);

  return (
    <div className="detail-overlay">
      <div className="detail-panel" role="dialog" aria-label={project.name}>
        <button className="detail-close" onClick={() => selectProject(null)} data-cursor="view">
          × Close
        </button>
        <p className="kicker" style={{ marginBottom: 8 }}>
          {project.categoryLabel}
        </p>
        <h2 style={{ margin: "0 0 10px", fontSize: 20, wordBreak: "break-word" }}>{project.name}</h2>
        {category && <p className="muted-text" style={{ fontSize: 13 }}>{category.description}</p>}
        {category && (
          <div className="tag-row" style={{ marginBottom: 18 }}>
            {category.tags.slice(0, 5).join(" · ")}
          </div>
        )}
        {project.status === "live" && project.href ? (
          <a
            className="btn-solid"
            href={project.href}
            target="_blank"
            rel="noreferrer"
            data-cursor="open"
            style={{ display: "inline-block", textAlign: "center", textDecoration: "none" }}
          >
            {project.action}
          </a>
        ) : (
          <p className="muted-text" style={{ fontSize: 12, margin: 0 }}>
            This case study is in progress and not published yet.
          </p>
        )}
      </div>
    </div>
  );
}
