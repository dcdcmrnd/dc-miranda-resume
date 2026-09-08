"use client";

import { differenceLines, differenceStatus, differenceClosing, vow } from "@/projects/projectData";

/** Real "Difference" + "Vow" copy from index.html, combined into one
 * philosophy/about location. */
export default function AboutPanel() {
  return (
    <div className="location-panel">
      <p className="kicker">// Archive:// Node: Difference</p>
      <h1 className="huge-title" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}>
        The Difference
      </h1>
      <div className="diff-lines">
        {differenceLines.map((line) => (
          <p key={line}>{line}</p>
        ))}
        <p className="status">{differenceStatus}</p>
      </div>
      <p className="muted-text">{differenceClosing}</p>

      <p className="kicker" style={{ marginTop: 22 }}>
        // Archive:// Node: Vow
      </p>
      <p className="body-text" style={{ fontWeight: 700 }}>
        {vow.title}
      </p>
      <div className="diff-lines">
        {vow.lines.map((l, i) => (
          <p key={i}>
            <b style={{ color: "var(--muted-2)", marginRight: 8 }}>{l.tag}</b>
            {l.text}
          </p>
        ))}
        <p className="status">
          <b style={{ color: "var(--ok)", marginRight: 8 }}>{vow.intent.tag}</b>
          {vow.intent.text}
        </p>
      </div>
    </div>
  );
}
