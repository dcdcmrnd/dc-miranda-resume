import {
  categories,
  projects,
  hero,
  resumeSummary,
  resumeTimeline,
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
import Image from "next/image";
import WorkCard from "@/components/ProjectUI/WorkCard";
import BubbleWrap from "@/components/BubbleWrap/BubbleWrap";
import TornDivider from "@/components/TornDivider/TornDivider";
import FloatingIcons from "@/components/FloatingIcons/FloatingIcons";
import TiltCard from "@/components/Motion/TiltCard";

// Mirrors the CSS custom properties in globals.css — TornDivider needs the
// literal hex value to fill its clip-path shape, which var() can't resolve
// from a server component.
const NAVY = "#171c33";
const CHARCOAL = "#1c1c1e";
const SIGNAL_DEEP = "#c11919";

export default function Home() {
  return (
    <main id="main-content">
      <div className="section-navy" style={{ position: "relative" }}>
        <FloatingIcons
          placements={[
            { icon: "code", top: "8%", left: "4%", size: 46, rotate: -12, color: "#7ecbff" },
            { icon: "gear", top: "18%", left: "92%", size: 40, rotate: 20, color: "#5cffc2" },
            { icon: "bolt", top: "70%", left: "3%", size: 36, rotate: 8, color: "#ffd166" },
            { icon: "film", top: "80%", left: "90%", size: 42, rotate: -10, color: "#ff7fae" },
            { icon: "brush", top: "4%", left: "60%", size: 34, rotate: 16, color: "#c299ff" },
          ]}
        />
        <div className="container">
          <section className="hero-card">
            <div>
              <h1>
                <span className="hero-heading" data-reveal>
                  {hero.greeting}
                </span>
                <span className="hero-role" data-reveal>
                  {hero.role}
                </span>
              </h1>
              <p className="hero-body" data-reveal>
                {hero.statement}
              </p>
              <p className="hero-sub" data-reveal>
                {hero.body}
              </p>
              <a className="hero-cta" href="#work" data-reveal>
                View my work
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
            <TiltCard className="hero-art" max={5} baseRotateZ={-2}>
              <Image
                src="/me.jpg"
                alt="Portrait of DC Miranda"
                fill
                sizes="(max-width: 800px) 100vw, 480px"
                style={{ objectFit: "cover" }}
                priority
              />
              <span className="mark" aria-hidden="true">
                DC · Aequora Digital
              </span>
            </TiltCard>
          </section>
        </div>
      </div>
      <TornDivider color={CHARCOAL} />

      <div className="section-charcoal">
        <div className="container">
          <section className="section" id="capabilities">
            <h2 className="section-title" data-reveal>
              What I Do
            </h2>
            <p className="section-intro" data-reveal>
              I work across the creative and technical side of digital projects, allowing me to take an idea from
              concept to execution without treating design, development, and automation as separate pieces.
            </p>
            <div className="cap-grid" data-reveal-group>
              {categories.map((c) => (
                <TiltCard
                  key={c.id}
                  className="cap-card"
                  max={4}
                  liftPx={-4}
                  data-reveal-item
                  style={{ ["--bar-color" as string]: c.accent } as React.CSSProperties}
                >
                  <span className="cap-no" style={{ color: c.accent }}>
                    {c.number}
                  </span>
                  <h3 style={{ color: c.accent }}>{c.name}</h3>
                  <p>{c.description}</p>
                </TiltCard>
              ))}
            </div>
          </section>
        </div>
      </div>
      <TornDivider color={NAVY} />

      <div className="section-navy">
        <div className="container">
          <section className="section" id="work">
            <h2 className="section-title" data-reveal>
              Selected Work
            </h2>
            <p className="section-intro" data-reveal>
              Published deliverables link straight through; categories without a case study yet say so honestly.
            </p>
            <div className="work-grid" data-reveal-group>
              {projects.map((p, i) => {
                const category = categories.find((c) => c.id === p.category)!;
                return <WorkCard key={p.id} project={p} category={category} featured={i === 0} />;
              })}
            </div>
          </section>
        </div>
      </div>
      <TornDivider color={CHARCOAL} />

      <div className="section-charcoal">
        <div className="container">
          <section className="section" id="experience">
            <h2 className="section-title" data-reveal>
              Experience
            </h2>
            <p className="section-intro" data-reveal>
              {resumeSummary}
            </p>
            <div className="timeline-scroll" data-reveal-group>
              {resumeTimeline.map((t) => (
                <div key={`${t.role}-${t.period}`} className="timeline-scroll-item" data-reveal-item data-timeline-item>
                  <span className="timeline-scroll-period">{t.period}</span>
                  <h3>{t.role}</h3>
                  <p>{t.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <TornDivider color={NAVY} />

      <div className="section-navy">
        <div className="container">
          <section className="section">
            <h2 className="section-title" data-reveal>
              Systems, not just sites
            </h2>
            <p className="section-intro" data-reveal>
              Most projects need more than one skill. Instead of treating design, development, and automation as
              separate projects, I connect them into one system.
            </p>

            <div className="systems-grid" data-reveal-group>
              <TiltCard
                className="system-panel system-card"
                max={3}
                liftPx={-4}
                data-reveal-item
                style={{ ["--panel-accent" as string]: categories.find((c) => c.id === "automation")!.accent } as React.CSSProperties}
              >
                <span className="system-no">01</span>
                <h3>{aiAutomationFlow.title}</h3>
                <p className="body-text">{aiAutomationFlow.body}</p>
                <div className="flow-steps">
                  {aiAutomationFlow.steps.map((s, i) => (
                    <span key={s} style={{ display: "contents" }}>
                      <span className="step">{s}</span>
                      {i < aiAutomationFlow.steps.length - 1 && (
                        <span className="arrow" aria-hidden="true">
                          →
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </TiltCard>

              <TiltCard
                className="system-panel system-card"
                max={3}
                liftPx={-4}
                data-reveal-item
                style={{ ["--panel-accent" as string]: categories.find((c) => c.id === "gohighlevel")!.accent } as React.CSSProperties}
              >
                <span className="system-no">02</span>
                <h3>{ghlFlow.title}</h3>
                <p className="body-text">{ghlFlow.body}</p>
                <div className="flow-steps">
                  {ghlFlow.steps.map((s, i) => (
                    <span key={s} style={{ display: "contents" }}>
                      <span className="step">{s}</span>
                      {i < ghlFlow.steps.length - 1 && (
                        <span className="arrow" aria-hidden="true">
                          →
                        </span>
                      )}
                    </span>
                  ))}
                </div>
                <div className="tag-row">{ghlFlow.tags.join(" · ")}</div>
              </TiltCard>
            </div>
          </section>
        </div>
      </div>
      <TornDivider color={CHARCOAL} />

      <div className="section-charcoal">
        <div className="container">
          <section className="section">
            <h2 className="section-title" data-reveal>
              How I Approach Projects
            </h2>
            <div className="process-stepper" data-reveal-group>
              {processSteps.map((step) => (
                <div key={step.no} className="process-step" data-reveal-item>
                  <span className="process-no">{step.no}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <TornDivider color={NAVY} />

      <div className="section-navy">
        <div className="container">
          <section className="section" id="about">
            <h2 className="section-title" data-reveal>
              The Difference
            </h2>
            <p className="section-intro" data-reveal>
              {differenceClosing}
            </p>
            <div className="manifesto-panel" data-reveal>
              <div className="diff-lines">
                {differenceLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                <p className="status pull-quote">{differenceStatus}</p>
              </div>
            </div>

            <div className="system-panel" style={{ marginTop: 24 }} data-reveal>
              <h3>{vow.title}</h3>
              {vow.lines.map((l, i) => (
                <p className="body-text" key={i} style={{ marginBottom: 8 }}>
                  <b>{l.tag}</b> — {l.text}
                </p>
              ))}
              <p className="body-text" style={{ color: "var(--brand-bright)", fontWeight: 600 }}>
                <b>{vow.intent.tag}</b> — {vow.intent.text}
              </p>
            </div>
          </section>
        </div>
      </div>
      <TornDivider color={CHARCOAL} />

      <div className="section-charcoal">
        <div className="container">
          <section className="section">
            <h2 className="section-title" data-reveal>
              {originStatement.title}
            </h2>
            <p className="section-intro" data-reveal>
              {originStatement.body}
            </p>
            <a className="hero-cta" href="/resume" data-reveal>
              View the full timeline on my résumé
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </section>
        </div>
      </div>
      <TornDivider color={SIGNAL_DEEP} />

      <div className="contact-block">
        <div className="container">
          <h2 className="contact-heading" data-reveal>
            {contact.statement}
          </h2>
          <p className="contact-body" data-reveal>
            {contact.body}
          </p>
          <p className="contact-motto" data-reveal>
            {contact.motto}
          </p>
          <ul className="contact-links" data-reveal>
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
