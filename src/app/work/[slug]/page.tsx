import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, projectBySlug, categories } from "@/projects/projectData";
import { driveEmbedUrl } from "@/lib/drive";

export function generateStaticParams() {
  return projects.filter((p) => p.status === "live").map((p) => ({ slug: p.slug }));
}

export default function WorkDetailPage({ params }: { params: { slug: string } }) {
  const project = projectBySlug(params.slug);
  if (!project || project.status !== "live") return notFound();

  const category = categories.find((c) => c.id === project.category)!;
  const embedUrl = driveEmbedUrl(project.href);

  return (
    <main className="container">
      <div className="detail-hero">
        <Link href="/#work" className="back-link">
          ← All work
        </Link>
        <p className="detail-kicker" style={{ color: category.accent }}>
          {project.categoryLabel}
        </p>
        <h1 className="detail-title">{project.displayName}</h1>
        <p className="detail-blurb">{project.blurb}</p>
      </div>

      {embedUrl && (
        <div className="detail-embed">
          <iframe src={embedUrl} allow="autoplay" title={project.displayName} />
        </div>
      )}

      <p style={{ marginBottom: 60 }}>
        <a className="link" href={project.href} target="_blank" rel="noreferrer">
          Open in Google Drive →
        </a>
      </p>
    </main>
  );
}
