"use client";

import type { Project } from "@/projects/projectData";
import { useExperience } from "@/hooks/useExperience";
import { useVideoPreview } from "@/hooks/useVideoPreview";
import { driveEmbedUrl } from "@/lib/drive";

/** One row in a project list. Hovering a live (published) row shows an
 * inline Drive preview via VideoPreviewLayer instead of requiring a click
 * — clicking still selects the project (opens the detail panel with the
 * real link) as the fallback for touch/keyboard users. */
export default function ProjectRow({ project, index }: { project: Project; index: number }) {
  const { selectedProjectId, selectProject } = useExperience();
  const { show, hide } = useVideoPreview();
  const embedUrl = project.status === "live" ? driveEmbedUrl(project.href) : null;

  return (
    <button
      className={`project-row${project.status === "pending" ? " is-pending" : ""}`}
      data-active={selectedProjectId === project.id}
      data-cursor={project.status === "live" ? "open" : "view"}
      onClick={() => selectProject(project.id)}
      onMouseEnter={(e) => {
        if (embedUrl) show(embedUrl, e.currentTarget);
      }}
      onMouseLeave={hide}
    >
      <span className="idx">{String(index + 1).padStart(2, "0")}</span>
      <span className="name">{project.name}</span>
      <span className="cat">{project.categoryLabel}</span>
      <span className="act">{project.action}</span>
    </button>
  );
}
