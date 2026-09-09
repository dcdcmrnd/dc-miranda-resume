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
import GalleryTrack from "@/components/Motion/GalleryTrack";

// Mirrors the CSS custom properties in globals.css — TornDivider needs the
// literal hex value to fill its clip-path shape, which var() can't resolve
// from a server component.
const BG = "#060606";
const BG_ALT = "#0e0e0e";

export default function Home() {
  return (
    <main id="main-content" className="creative-room-page">
      {/* ---------------- Hero (Creative Room structure, DC content) ---------------- */}
      <section className="hero-stage">
        <div className="branch branch-left" aria-hidden="true">
          <FloatingIcons
            placements={[
              { icon: "code", top: "6%", left: "6%", size: 42, rotate: -12, color: "rgba(245,243,238,0.5)" },
              { icon: "gear", top: "30%", left: "24%", size: 30, rotate: 18, color: "rgba(245,243,238,0.35)" },
            ]}
          />
        </div>
        <div className="branch branch-right" aria-hidden="true">
          <FloatingIcons
            placements={[
              { icon: "film", top: "70%", left: "68%", size: 36, rotate: -10, color: "rgba(245,243,238,0.4)" },
              { icon: "brush", top: "50%", left: "82%", size: 38, rotate: 14, color: "rgba(245,243,238,0.5)" },
            ]}
          />
        </div>

        <div className="container hero-shell">
          <div className="hero-content">
            <h1 className="hero-wordmark" data-reveal>
              <span className="line line-top">DC</span>
              <span className="line line-bottom">MIRANDA</span>
            </h1>
            <p className="hero-caption" data-reveal>
              {hero.eyebrow}
            </p>
            <p className="hero-copy" data-reveal>
              {hero.statement}
            </p>

            <div className="services-list" data-reveal-group aria-label="Disciplines">
              {categories.map((c) => (
                <span key={c.id} data-reveal-item>
                  {c.name.toUpperCase()}
                </span>
              ))}
            </div>

            <div className="profile-links" data-reveal>
              <a href={`mailto:${contact.email}`}>Email</a>
              <a href={contact.whatsapp.href} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              <a href={contact.portfolio.href} target="_blank" rel="noreferrer">
                Notion
              </a>
              <a href="/resume">Résumé</a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Bio (full-viewport blur reveal) ---------------- */}
      <section className="bio-section">
        <div className="container">
          <p className="bio-text" data-blur-reveal>
            {resumeSummary}
          </p>
        </div>
      </section>

      {/* ---------------- Horizontal scroll-scrubbed gallery ---------------- */}
      <section className="gallery-section" id="work-gallery">
        <GalleryTrack>
          {categories.map((c) => (
            <div
              key={c.id}
              className="gallery-item"
              data-gallery-item
              style={{ ["--gallery-accent" as string]: c.accent }}
            >
              <a href="#work">
                <span className="gallery-item-index">{c.number}</span>
                <span className="gallery-item-name">{c.name}</span>
              </a>
            </div>
          ))}
        </GalleryTrack>
        <p className="gallery-caption">( scroll to explore — click any card to jump to selected work )</p>
      </section>

      {/* ---------------- What I Do ---------------- */}
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
      <TornDivider color={BG} />

      {/* ---------------- Selected Work ---------------- */}
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
      <TornDivider color={BG_ALT} />

      {/* ---------------- Experience ---------------- */}
      <div className="section-charcoal">
        <div className="container">
          <section className="section" id="experience">
            <h2 className="section-title" data-reveal>
              Experience
            </h2>
            <p className="section-intro" data-reveal>
              {hero.body}
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
      <TornDivider color={BG} />

      {/* ---------------- Systems ---------------- */}
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
      <TornDivider color={BG_ALT} />

      {/* ---------------- Process ---------------- */}
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
      <TornDivider color={BG} />

      {/* ---------------- About / The Difference ---------------- */}
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
      <TornDivider color={BG_ALT} />

      {/* ---------------- Resume teaser ---------------- */}
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
      <TornDivider color={BG_ALT} />

      {/* ---------------- Footer / Contact ---------------- */}
      <div className="contact-block" id="contact">
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
          <div className="contact-links" data-reveal>
            <a href={`mailto:${contact.email}`}>email</a>
            <a href={contact.whatsapp.href} target="_blank" rel="noreferrer">
              whatsapp
            </a>
            <a href={contact.portfolio.href} target="_blank" rel="noreferrer">
              notion
            </a>
          </div>
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
