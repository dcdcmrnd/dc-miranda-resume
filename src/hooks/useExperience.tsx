"use client";

import { createContext, useCallback, useContext, useMemo, useState, ReactNode, Dispatch, SetStateAction } from "react";
import type { CategoryId } from "@/projects/projectData";

export const LOCATIONS = [
  "intro",
  "work",
  "web",
  "software",
  "automation",
  "gohighlevel",
  "graphics",
  "video",
  "experience",
  "about",
  "contact",
] as const;

export type LocationId = (typeof LOCATIONS)[number];

interface ExperienceState {
  location: LocationId;
  goTo: (location: LocationId) => void;
  selectedCategory: CategoryId | "all";
  setSelectedCategory: (category: CategoryId | "all") => void;
  selectedProjectId: string | null;
  selectProject: (id: string | null) => void;
  hovered: string | null;
  setHovered: Dispatch<SetStateAction<string | null>>;
  assetsReady: boolean;
  setAssetsReady: (v: boolean) => void;
  entered: boolean;
  enter: () => void;
}

const ExperienceContext = createContext<ExperienceState | null>(null);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<LocationId>("intro");
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | "all">("all");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [assetsReady, setAssetsReady] = useState(false);
  const [entered, setEntered] = useState(false);

  const goTo = useCallback((next: LocationId) => {
    setLocation(next);
    if (next !== "work") setSelectedProjectId(null);
  }, []);

  const selectProject = useCallback((id: string | null) => {
    setSelectedProjectId(id);
  }, []);

  const enter = useCallback(() => setEntered(true), []);

  const value = useMemo<ExperienceState>(
    () => ({
      location,
      goTo,
      selectedCategory,
      setSelectedCategory,
      selectedProjectId,
      selectProject,
      hovered,
      setHovered,
      assetsReady,
      setAssetsReady,
      entered,
      enter,
    }),
    [location, goTo, selectedCategory, selectedProjectId, selectProject, hovered, assetsReady, entered, enter]
  );

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}

export function useExperience() {
  const ctx = useContext(ExperienceContext);
  if (!ctx) throw new Error("useExperience must be used within ExperienceProvider");
  return ctx;
}
