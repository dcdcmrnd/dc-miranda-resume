import type { Metadata } from "next";
import {
  resumeSummary,
  resumeStats,
  resumeCapabilities,
  resumeTimeline,
  education,
  resumeProjects,
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
        <p className="detail-kicker">Digital Solutions Expert · AI-Assisted Web & Software Development</p>
        <h1 className="detail-title">DC Loumart Miranda</h1>
        <p className="detail-blurb">{resumeSummary}</p>
        <p className="section-intro" style={{ marginBottom: 0 }}>{contact.location}</p>
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
          Projects
        </h2>
        <p className="section-intro" data-reveal>
          Real, shipped software. Live links aren&apos;t wired up yet — ask DC directly for a walkthrough.
        </p>
        <div className="caps-grid-2" data-reveal-group>
          {resumeProjects.map((p) => (
            <div key={p.name} className="stat-card" data-reveal-item>
              <strong>{p.name}</strong>
              <div className="detail-kicker" style={{ marginTop: 4, marginBottom: 8 }}>
                {p.org} · {p.period}
              </div>
              <span>{p.body}</span>
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
          Education
        </h2>
        <div className="stat-card" data-reveal style={{ maxWidth: 640 }}>
          <strong>{education.school}</strong>
          <div className="detail-kicker" style={{ marginTop: 4, marginBottom: 8 }}>
            {education.degree} · {education.period}
          </div>
          <span>{education.body}</span>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title" data-reveal>
          Core stack
        </h2>
        <div data-reveal-group style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {techStack.map((group) => (
            <div key={group.category} data-reveal-item>
              <div className="detail-kicker" style={{ marginBottom: 10 }}>
                {group.category}
              </div>
              <div className="pill-row">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
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
              <a className="link" href={`mailto:${contact.resumeEmail}`}>
                {contact.resumeEmail}
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
