import * as THREE from "three";
import { projects } from "@/projects/projectData";

/** WorkGallery's group sits at this world offset — shared here so the
 * camera rig can compute the same world-space marker positions the
 * gallery renders, without duplicating (and risking drift from) the
 * layout math in two places. */
export const WORK_GROUP_POSITION: [number, number, number] = [0, 0, -8];

export function workMarkerWorldPosition(index: number): THREE.Vector3 {
  const n = projects.length;
  const t = n === 1 ? 0.5 : index / (n - 1);
  const x = THREE.MathUtils.lerp(-4.2, 4.2, t);
  const z = -Math.sin(t * Math.PI) * 2.2;
  return new THREE.Vector3(
    x + WORK_GROUP_POSITION[0],
    WORK_GROUP_POSITION[1],
    z + WORK_GROUP_POSITION[2]
  );
}

export function projectIndexById(id: string | null): number {
  if (!id) return -1;
  return projects.findIndex((p) => p.id === id);
}
