"use client";

import { useExperience, LocationId } from "@/hooks/useExperience";
import type { CategoryId } from "@/projects/projectData";
import IntroPanel from "./IntroPanel";
import WorkPanel from "./WorkPanel";
import CategoryPanel from "./CategoryPanel";
import ExperienceTimelinePanel from "./ExperienceTimelinePanel";
import AboutPanel from "./AboutPanel";
import ContactPanel from "./ContactPanel";

const CATEGORY_LOCATIONS = new Set<LocationId>(["web", "software", "automation", "gohighlevel", "graphics", "video"]);

function isCategoryLocation(location: LocationId): location is LocationId & CategoryId {
  return CATEGORY_LOCATIONS.has(location);
}

/** Switches the HTML content layer by location (Phase 3/18): one persistent
 * WebGL layer underneath, changing HTML overlay content on top. */
export default function ExperienceUI() {
  const { location } = useExperience();

  return (
    <div className="ui-layer">
      {location === "intro" && <IntroPanel />}
      {location === "work" && <WorkPanel />}
      {isCategoryLocation(location) && <CategoryPanel category={location as CategoryId} />}
      {location === "experience" && <ExperienceTimelinePanel />}
      {location === "about" && <AboutPanel />}
      {location === "contact" && <ContactPanel />}
    </div>
  );
}
