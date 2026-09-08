"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { Line } from "./primitives";
import { aiAutomationFlow } from "@/projects/projectData";
import { useExperience } from "@/hooks/useExperience";

const LAYOUT: Record<string, [number, number, number]> = {
  ai: [0, 1.3, 0],
  data: [0.95, 0.35, 0.2],
  logic: [-0.95, 0.35, -0.2],
  crm: [0.95, -0.65, 0.1],
  workflow: [-0.95, -0.65, -0.1],
  result: [0, -1.55, 0],
};
const EDGES: Array<[string, string]> = [
  ["ai", "data"],
  ["ai", "logic"],
  ["data", "crm"],
  ["logic", "workflow"],
  ["crm", "result"],
  ["workflow", "result"],
];

const nodeGeo = new THREE.IcosahedronGeometry(0.14, 0);

function Node({
  id,
  label,
  position,
  visible,
}: {
  id: string;
  label: string;
  position: [number, number, number];
  visible: boolean;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const { hovered, setHovered } = useExperience();
  const isHovered = hovered === `ai:${id}`;

  useFrame(() => {
    if (!mesh.current) return;
    const target = isHovered ? 1.7 : 1;
    mesh.current.scale.setScalar(THREE.MathUtils.lerp(mesh.current.scale.x, target, 0.15));
    const mat = mesh.current.material as THREE.MeshBasicMaterial;
    mat.opacity = THREE.MathUtils.lerp(mat.opacity, isHovered ? 1 : 0.65, 0.15);
  });

  return (
    <group position={position}>
      <mesh
        ref={mesh}
        geometry={nodeGeo}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(`ai:${id}`);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered((h) => (h === `ai:${id}` ? null : h));
        }}
      >
        <meshBasicMaterial color="#49ffb4" transparent opacity={0.65} wireframe />
      </mesh>
      {visible && (
      <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: isHovered ? "#eef0ff" : "#9195b8",
            whiteSpace: "nowrap",
            textShadow: "0 0 8px rgba(0,0,0,0.8)",
          }}
        >
          {label}
        </span>
      </Html>
      )}
    </group>
  );
}

/** Real content: the AI + Automation flow (User -> Website -> CRM ->
 * Automation -> AI -> Business Outcome) as an interactive node network.
 * Hovering a node (here, or from the matching HTML flow-step list) lights
 * it up via the shared `hovered` experience state. */
export default function AutomationNetwork({ visible }: { visible: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current) return;
    const target = visible ? 1 : 0;
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, target, 0.08));
  });

  const edgeLines = useMemo(
    () =>
      EDGES.map(([a, b]) => [new THREE.Vector3(...LAYOUT[a]), new THREE.Vector3(...LAYOUT[b])] as [THREE.Vector3, THREE.Vector3]),
    []
  );

  return (
    <group ref={group} position={[-1.1, 0.5, -4.5]} visible={visible}>
      {edgeLines.map((pts, i) => (
        <Line key={i} points={pts} color="#49ffb4" opacity={0.3} />
      ))}
      {aiAutomationFlow.nodes.map((n) => (
        <Node key={n.key} id={n.key} label={n.label} position={LAYOUT[n.key]} visible={visible} />
      ))}
    </group>
  );
}
