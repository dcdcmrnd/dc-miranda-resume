import type { Metadata } from "next";
import {
  hero,
  resumeStats,
  resumeCapabilities,
  resumeTimeline,
  techStack,
  projects,
  contact,
} from "@/projects/projectData";

export const metadata: Metadata = {
  title: "Résumé — DC Miranda",
};

export default function ResumePage() {
  const liveProjects = projects.filter((p) => p.status === "live");

  return (
    <main className="container">
      <div className="detail-hero">
        <p className="detail-kicker">Full-Stack Web Developer · AI-Enabled Digital Builder</p>
        <h1 className="detail-title">DC Miranda</h1>
        <p className="detail-blurb">{hero.statement}</p>
      </div>

      <section className="section">
        <p className="section-title">Why this is credible for web development</p>
        <p className="section-intro">
          Positioned around the same value modern service businesses look for: full-stack delivery, smart
          automation, SEO-ready structure, and a polished experience from concept to launch.
        </p>
        <div className="stat-grid">
          {resumeStats.map((s) => (
            <div key={s.title} className="stat-card">
              <strong>{s.title}</strong>
              <span>{s.body}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="section-title">What I can build</p>
        <div className="caps-grid-2">
          {resumeCapabilities.map((c) => (
            <div key={c.title} className="stat-card">
              <strong>{c.title}</strong>
              <span>{c.body}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="section-title">Project proof</p>
        <p className="section-intro">Real, published deliverables — each opens with the actual video embedded.</p>
        <div className="work-grid">
          {liveProjects.map((p) => (
            <a key={p.id} href={`/work/${p.slug}`} className="work-card" style={{ background: "#f7f6f3" }}>
              <h3>{p.displayName}</h3>
              <p>{p.blurb}</p>
              <span className="work-link">Open project →</span>
            </a>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="section-title">Experience</p>
        <div className="timeline">
          {resumeTimeline.map((t) => (
            <div key={t.role} className="timeline-item">
              <div className="period">{t.period}</div>
              <div className="role">{t.role}</div>
              <p style={{ color: "var(--muted)", marginTop: 6 }}>{t.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="section-title">Core stack</p>
        <div className="pill-row">
          {techStack.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingBottom: 60 }}>
        <p className="section-title">Contact</p>
        <div className="stat-grid">
          <div className="stat-card">
            <strong>Email</strong>
            <span>
              <a className="link" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </span>
          </div>
          <div className="stat-card">
            <strong>Phone / WhatsApp</strong>
            <span>
              <a className="link" href={contact.whatsapp.href} target="_blank" rel="noreferrer">
                {contact.whatsapp.display}
              </a>
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
