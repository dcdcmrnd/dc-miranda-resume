"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { projects } from "@/projects/projectData";
import { useExperience } from "@/hooks/useExperience";
import { workMarkerWorldPosition } from "./galleryLayout";

const markerGeo = new THREE.PlaneGeometry(0.72, 0.98);

function Marker({
  index,
  position,
  id,
  isSelected,
}: {
  index: number;
  position: [number, number, number];
  id: string;
  isSelected: boolean;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const { selectProject, setHovered, hovered } = useExperience();
  const isHovered = hovered === `work:${id}`;

  useFrame(() => {
    if (!mesh.current) return;
    const targetScale = isSelected ? 1.5 : isHovered ? 1.15 : 1;
    mesh.current.scale.setScalar(THREE.MathUtils.lerp(mesh.current.scale.x, targetScale, 0.15));
    const mat = mesh.current.material as THREE.MeshBasicMaterial;
    const targetOpacity = isSelected ? 0.9 : isHovered ? 0.65 : 0.4;
    mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, 0.15);
  });

  return (
    <mesh
      ref={mesh}
      geometry={markerGeo}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(`work:${id}`);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered((h) => (h === `work:${id}` ? null : h));
      }}
      onClick={(e) => {
        e.stopPropagation();
        selectProject(id);
      }}
    >
      <meshBasicMaterial color="#ff8fd6" transparent opacity={0.4} wireframe />
    </mesh>
  );
}

/** Real content: every project row from the live site, spread along an
 * arc. Clicking a marker selects that project (camera focuses toward it,
 * and the HTML project panel shows its real metadata) instead of opening
 * a card/modal. */
export default function WorkGallery({ visible }: { visible: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { selectedProjectId } = useExperience();

  useFrame(() => {
    if (!group.current) return;
    const target = visible ? 1 : 0;
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, target, 0.08));
  });

  const positions = useMemo<[number, number, number][]>(
    () => projects.map((_, i) => workMarkerWorldPosition(i).toArray() as [number, number, number]),
    []
  );

  return (
    <group ref={group} visible={visible}>
      {projects.map((p, i) => (
        <Marker key={p.id} index={i} id={p.id} position={positions[i]} isSelected={selectedProjectId === p.id} />
      ))}
    </group>
  );
}
