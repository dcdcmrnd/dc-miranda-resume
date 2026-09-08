import {
  categories,
  projects,
  hero,
  aiAutomationFlow,
  ghlFlow,
  processSteps,
  differenceLines,
  differenceStatus,
  differenceClosing,
  vow,
  originStatement,
  contact,
} from "@/projects/projectData";
import WorkCard from "@/components/ProjectUI/WorkCard";
import BubbleWrap from "@/components/BubbleWrap/BubbleWrap";

export default function Home() {
  return (
    <main>
      <div className="container">
        <section className="hero-card">
          <div>
            <p className="hero-heading">
              {hero.greeting}
            </p>
            <p className="hero-role">{hero.role}</p>
            <p className="hero-body">{hero.statement}</p>
            <p className="hero-sub">{hero.body}</p>
            <a className="hero-cta" href="#work">
              View my work →
            </a>
          </div>
          <div className="hero-art" aria-hidden="true">
            <span className="mark">DC</span>
          </div>
        </section>
      </div>

      <div className="container">
        <section className="section" id="capabilities">
          <p className="section-title">What I Do</p>
          <p className="section-intro">
            I work across the creative and technical side of digital projects, allowing me to take an idea from
            concept to execution without treating design, development, and automation as separate pieces.
          </p>
          <div className="cap-grid">
            {categories.map((c) => (
              <div key={c.id} className="cap-card" style={{ background: c.bg }}>
                <span className="cap-no" style={{ color: c.accent }}>
                  {c.number}
                </span>
                <h3 style={{ color: c.accent }}>{c.name}</h3>
                <p>{c.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="container">
        <section className="section" id="work">
          <p className="section-title">Selected Work</p>
          <p className="section-intro">
            Published deliverables link straight through; categories without a case study yet say so honestly.
          </p>
          <div className="work-grid">
            {projects.map((p) => {
              const category = categories.find((c) => c.id === p.category)!;
              return <WorkCard key={p.id} project={p} category={category} />;
            })}
          </div>
        </section>
      </div>

      <div className="container">
        <section className="section">
          <p className="section-title">Systems, not just sites</p>
          <p className="section-intro">
            Most projects need more than one skill. Instead of treating design, development, and automation as
            separate projects, I connect them into one system.
          </p>

          <div className="system-panel">
            <h3>{aiAutomationFlow.title}</h3>
            <p className="body-text">{aiAutomationFlow.body}</p>
            <div className="flow-steps">
              {aiAutomationFlow.steps.map((s, i) => (
                <span key={s} style={{ display: "contents" }}>
                  <span className="step">{s}</span>
                  {i < aiAutomationFlow.steps.length - 1 && <span className="arrow">→</span>}
                </span>
              ))}
            </div>
          </div>

          <div className="system-panel">
            <h3>{ghlFlow.title}</h3>
            <p className="body-text">{ghlFlow.body}</p>
            <div className="flow-steps">
              {ghlFlow.steps.map((s, i) => (
                <span key={s} style={{ display: "contents" }}>
                  <span className="step">{s}</span>
                  {i < ghlFlow.steps.length - 1 && <span className="arrow">→</span>}
                </span>
              ))}
            </div>
            <div className="tag-row">{ghlFlow.tags.join(" · ")}</div>
          </div>
        </section>
      </div>

      <div className="container">
        <section className="section">
          <p className="section-title">How I Approach Projects</p>
          <div className="cap-grid">
            {processSteps.map((step) => (
              <div key={step.no} className="cap-card" style={{ background: "#f7f6f3" }}>
                <span className="cap-no">{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="container">
        <section className="section">
          <p className="section-title">The Difference</p>
          <div className="diff-lines">
            {differenceLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p className="status">{differenceStatus}</p>
          </div>
          <p className="section-intro" style={{ marginTop: 14 }}>
            {differenceClosing}
          </p>

          <div className="system-panel" style={{ marginTop: 24 }}>
            <h3>{vow.title}</h3>
            {vow.lines.map((l, i) => (
              <p className="body-text" key={i} style={{ marginBottom: 8 }}>
                <b>{l.tag}</b> — {l.text}
              </p>
            ))}
            <p className="body-text" style={{ color: "var(--brand)", fontWeight: 600 }}>
              <b>{vow.intent.tag}</b> — {vow.intent.text}
            </p>
          </div>
        </section>
      </div>

      <div className="container">
        <section className="section">
          <p className="section-title">{originStatement.title}</p>
          <p className="section-intro">{originStatement.body}</p>
          <a className="hero-cta" href="/resume">
            View the full timeline on my résumé →
          </a>
        </section>
      </div>

      <div className="contact-block">
        <div className="container">
          <p className="contact-heading">{contact.statement}</p>
          <p className="contact-body">{contact.body}</p>
          <p className="contact-motto">{contact.motto}</p>
          <ul className="contact-links">
            <li>
              <a href={`mailto:${contact.email}`}>
                <span>
                  <span className="tag">Email</span>
                  {contact.email}
                </span>
                <span className="val">Start a project →</span>
              </a>
            </li>
            <li>
              <a href={contact.whatsapp.href} target="_blank" rel="noreferrer">
                <span>
                  <span className="tag">WhatsApp</span>
                  {contact.whatsapp.display}
                </span>
                <span className="val">Open →</span>
              </a>
            </li>
            <li>
              <a href={contact.portfolio.href} target="_blank" rel="noreferrer">
                <span>
                  <span className="tag">Portfolio</span>
                  {contact.portfolio.display}
                </span>
                <span className="val">Open →</span>
              </a>
            </li>
          </ul>
          <div className="footer-meta">
            <span>© 2026 DC Miranda</span>
            <span>scroll on — the footer hides bubble wrap ↓</span>
          </div>
          <BubbleWrap />
        </div>
      </div>
    </main>
  );
}
