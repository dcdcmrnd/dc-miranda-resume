"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { CategoryId, Project } from "@/projects/projectData";
import { useExperience } from "@/hooks/useExperience";

const screenGeo = new THREE.PlaneGeometry(1.5, 0.94);

function Screen({
  project,
  position,
  color,
  index,
  visible,
}: {
  project: Project;
  position: [number, number, number];
  color: string;
  index: number;
  visible: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const { hovered, setHovered } = useExperience();
  const isHovered = hovered === `creative:${project.id}`;

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime + index * 1.3;
    group.current.position.y = position[1] + Math.sin(t * 0.4) * 0.1;
    const target = isHovered ? 1.08 : 1;
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, target, 0.15));
  });

  const openLink = () => {
    if (project.href) window.open(project.href, "_blank", "noreferrer");
  };

  return (
    <group
      ref={group}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(`creative:${project.id}`);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered((h) => (h === `creative:${project.id}` ? null : h));
      }}
      onClick={(e) => {
        e.stopPropagation();
        openLink();
      }}
    >
      <mesh geometry={screenGeo}>
        <meshBasicMaterial color={color} transparent opacity={isHovered ? 0.8 : 0.5} wireframe />
      </mesh>
      {visible && (
      <Html center distanceFactor={9} style={{ pointerEvents: "none" }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
            letterSpacing: "0.04em",
            color: isHovered ? "#eef0ff" : "#9195b8",
            whiteSpace: "nowrap",
            textShadow: "0 0 8px rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          {project.status === "live" ? "▶" : "◌"} {project.name}
        </div>
      </Html>
      )}
    </group>
  );
}

/** Real project rows tagged for graphics/video, laid out as floating
 * "screens." Clicking one opens the real hosted deliverable (Google Drive)
 * — nothing here fabricates a playable in-page asset that doesn't exist. */
export default function CreativeGallery({
  visible,
  category,
  color,
  items,
}: {
  visible: boolean;
  category: CategoryId;
  color: string;
  items: Project[];
}) {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current) return;
    const target = visible ? 1 : 0;
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, target, 0.08));
  });

  const positions = useMemo<[number, number, number][]>(() => {
    const n = Math.max(items.length, 1);
    return items.map((_, i) => {
      const t = n === 1 ? 0.5 : i / (n - 1);
      return [THREE.MathUtils.lerp(-2.4, 2.4, t), Math.sin(t * Math.PI) * 0.5, Math.cos(t * Math.PI * 0.6) * 0.8];
    });
  }, [items]);

  // Both creative categories sit at the same depth as the other category
  // environments (AI/GHL) — a closer offset was tried for "video" but made
  // the screens loom large enough to overlap the HTML text panel.
  const zOffset = -0.4;

  return (
    <group ref={group} position={[0, 0.1, zOffset]} visible={visible}>
      {items.map((p, i) => (
        <Screen key={p.id} project={p} position={positions[i]} color={color} index={i} visible={visible} />
      ))}
    </group>
  );
}
