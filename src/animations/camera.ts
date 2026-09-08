import type { LocationId } from "@/hooks/useExperience";

export interface CameraWaypoint {
  position: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
}

/**
 * One named camera state per location the visitor can be in. Navigation
 * (nav clicks, category selection, "enter" from loading) sets `location`,
 * and the Camera rig tweens position/lookAt/fov toward the matching
 * waypoint — this is the actual navigation model, not scrollIntoView.
 */
export const CAMERA_WAYPOINTS: Record<LocationId, CameraWaypoint> = {
  intro: { position: [0, 0.4, 7.5], lookAt: [0, 0, 0], fov: 45 },
  work: { position: [0, 1.1, 11], lookAt: [0, 0.2, -6], fov: 54 },
  web: { position: [-3.4, 0.6, 7.2], lookAt: [-1.6, 0.2, 1.5], fov: 42 },
  software: { position: [3.4, 0.4, 7.2], lookAt: [1.6, 0, 1.5], fov: 42 },
  automation: { position: [-2.6, 0.6, 6.6], lookAt: [-1, 0.4, -1.2], fov: 44 },
  gohighlevel: { position: [2.6, -0.4, 7], lookAt: [0.8, -0.2, -1.6], fov: 46 },
  graphics: { position: [-3, 0.3, 6.4], lookAt: [-1.2, 0.1, 0.6], fov: 42 },
  video: { position: [3, 0.5, 6.4], lookAt: [1.2, 0.2, 0.6], fov: 42 },
  experience: { position: [0, 0.5, 6.8], lookAt: [0, 0, 0.4], fov: 44 },
  about: { position: [-1, 0.3, 6.4], lookAt: [0, 0, 0], fov: 44 },
  contact: { position: [0, 0.3, 6.2], lookAt: [0, 0, 0], fov: 42 },
};
