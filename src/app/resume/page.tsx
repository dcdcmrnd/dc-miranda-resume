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
    <main id="main-content" className="container">
      <div className="detail-hero">
        <p className="detail-kicker">Full-Stack Web Developer · AI-Enabled Digital Builder</p>
        <h1 className="detail-title">DC Miranda</h1>
        <p className="detail-blurb">{hero.statement}</p>
      </div>

      <section className="section">
        <h2 className="section-title" data-reveal>
          Why this is credible for web development
        </h2>
        <p className="section-intro" data-reveal>
          Positioned around the same value modern service businesses look for: full-stack delivery, smart
          automation, SEO-ready structure, and a polished experience from concept to launch.
        </p>
        <div className="stat-grid" data-reveal-group>
          {resumeStats.map((s) => (
            <div key={s.title} className="stat-card" data-reveal-item>
              <strong>{s.title}</strong>
              <span>{s.body}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title" data-reveal>
          What I can build
        </h2>
        <div className="caps-grid-2" data-reveal-group>
          {resumeCapabilities.map((c) => (
            <div key={c.title} className="stat-card" data-reveal-item>
              <strong>{c.title}</strong>
              <span>{c.body}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title" data-reveal>
          Project proof
        </h2>
        <p className="section-intro" data-reveal>
          Real, published deliverables — each opens with the actual video embedded.
        </p>
        <div className="work-grid" data-reveal-group>
          {liveProjects.map((p) => (
            <a key={p.id} href={`/work/${p.slug}`} className="work-card" data-reveal-item>
              <h3>{p.displayName}</h3>
              <p>{p.blurb}</p>
              <span className="work-link">Open project →</span>
            </a>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title" data-reveal>
          Experience
        </h2>
        <div className="timeline" data-reveal-group>
          {resumeTimeline.map((t) => (
            <div key={t.role} className="timeline-item" data-reveal-item>
              <div className="period">{t.period}</div>
              <div className="role">{t.role}</div>
              <p style={{ color: "var(--muted)", marginTop: 6 }}>{t.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title" data-reveal>
          Core stack
        </h2>
        <div className="pill-row" data-reveal>
          {techStack.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingBottom: 60 }}>
        <h2 className="section-title" data-reveal>
          Contact
        </h2>
        <div className="stat-grid" data-reveal-group>
          <div className="stat-card" data-reveal-item>
            <strong>Email</strong>
            <span>
              <a className="link" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </span>
          </div>
          <div className="stat-card" data-reveal-item>
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
