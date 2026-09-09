"use client";

import Link from "next/link";
import type { Project, Category } from "@/projects/projectData";
import { useVideoPreview } from "@/hooks/useVideoPreview";
import { driveEmbedUrl } from "@/lib/drive";

/** One card in the "Selected Work" bento grid. Hovering a published project
 * shows an inline Drive preview (see VideoPreviewLayer); clicking opens its
 * own page at /work/[slug] with the full embed and real blurb. Pending
 * categories render the same honest "in progress" status as the live site
 * — no invented case study. */
export default function WorkCard({
  project,
  category,
  featured = false,
}: {
  project: Project;
  category: Category;
  featured?: boolean;
}) {
  const { show, hide } = useVideoPreview();
  const embedUrl = project.status === "live" ? driveEmbedUrl(project.href) : null;

  const card = (
    <div
      className={`work-card${project.status === "pending" ? " is-pending" : ""}`}
      style={{ background: category.bg, ["--bar-color" as string]: category.accent }}
    >
      <h3 style={{ color: category.accent }}>{project.displayName}</h3>
      <p>{project.blurb || `${category.name} work — published case study coming soon.`}</p>
      {project.status === "live" ? (
        <span className="work-link" style={{ color: category.accent }}>
          View project →
        </span>
      ) : (
        <span className="work-status">In progress</span>
      )}
    </div>
  );

  // grid-column spanning only takes effect on the direct grid child — that's
  // this wrapper (Link/div), not the "work-card" div nested inside it — so
  // the featured class has to go here too (as a CSS class, not inline
  // style, so the mobile media query can still collapse it back to span 1).
  const wrapperClass = featured ? "is-featured" : undefined;

  if (project.status !== "live") {
    return (
      <div data-reveal-item className={wrapperClass}>
        {card}
      </div>
    );
  }

  return (
    <Link
      href={`/work/${project.slug}`}
      data-reveal-item
      className={wrapperClass}
      onMouseEnter={(e) => embedUrl && show(embedUrl, e.currentTarget)}
      onMouseLeave={hide}
    >
      {card}
    </Link>
  );
}
