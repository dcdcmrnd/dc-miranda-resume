"use client";

import { forwardRef, useMemo } from "react";
import * as THREE from "three";

/** Wireframe line-art mesh — the whole experience uses edges/line geometry
 * only (no filled/lit meshes), matching the established visual language and
 * keeping the renderer cheap (no lighting setup needed). */
export const Wire = forwardRef<THREE.LineSegments, {
  geometry: THREE.BufferGeometry;
  color: string;
  opacity?: number;
  position?: [number, number, number];
}>(function Wire({ geometry, color, opacity = 0.55, position }, ref) {
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);
  return (
    <lineSegments ref={ref} geometry={edges} position={position}>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </lineSegments>
  );
});

export function Line({
  points,
  color,
  opacity = 0.35,
}: {
  points: THREE.Vector3[];
  color: string;
  opacity?: number;
}) {
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  return (
    <line>
      <primitive object={geometry} attach="geometry" />
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </line>
  );
}

export function pointOnPath(points: THREE.Vector3[], t: number): THREE.Vector3 {
  const n = points.length;
  const scaled = Math.min(Math.max(t, 0), 1) * (n - 1);
  const i = Math.min(Math.floor(scaled), n - 2);
  const frac = scaled - i;
  const a = points[i];
  const b = points[i + 1];
  return new THREE.Vector3(
    THREE.MathUtils.lerp(a.x, b.x, frac),
    THREE.MathUtils.lerp(a.y, b.y, frac),
    THREE.MathUtils.lerp(a.z, b.z, frac)
  );
}
