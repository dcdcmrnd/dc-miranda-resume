"use client";

import { useExperience } from "@/hooks/useExperience";
import { hero } from "@/projects/projectData";

export default function IntroPanel() {
  const { goTo } = useExperience();
  return (
    <div className="location-panel">
      <p className="kicker">// {hero.tag}</p>
      <h1 className="huge-title">[{hero.name}]</h1>
      <p className="tag-row">{hero.caps.join(" · ")}</p>
      <p className="body-text">{hero.statement}</p>
      <p className="muted-text">{hero.body}</p>
      <p className="body-text" style={{ fontWeight: 700 }}>
        {hero.motto}
      </p>
      <div className="cta-row">
        <button className="btn-solid" data-cursor="open" onClick={() => goTo("work")}>
          View my work //
        </button>
        <button className="btn-outline" data-cursor="view" onClick={() => goTo("contact")}>
          Let&apos;s work together
        </button>
      </div>
    </div>
  );
}
