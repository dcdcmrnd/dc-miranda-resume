"use client";

import { experienceTimeline, originStatement } from "@/projects/projectData";

/** Phase 20: real career history, transcribed from #origin, presented as a
 * spatial numbered log rather than a plain vertical resume timeline. */
export default function ExperienceTimelinePanel() {
  return (
    <div className="location-panel">
      <p className="kicker">// Archive:// Node: Origin</p>
      <h1 className="huge-title" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}>
        {originStatement.title}
      </h1>
      <p className="muted-text">{originStatement.body}</p>
      <div className="timeline-3d">
        {experienceTimeline.map((t) => (
          <div key={t.marker} className={`timeline-3d-step${t.status ? " status" : ""}`}>
            <span className="marker">{t.marker}</span>
            <span className="period">{t.period}</span>
            <p style={{ margin: 0 }}>{t.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
