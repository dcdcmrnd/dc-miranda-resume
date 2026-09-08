"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { Line, pointOnPath } from "./primitives";
import { ghlFlow } from "@/projects/projectData";
import { useExperience } from "@/hooks/useExperience";

const nodeGeo = new THREE.IcosahedronGeometry(0.12, 0);
const particleGeo = new THREE.IcosahedronGeometry(0.045, 0);

function Node({
  id,
  label,
  position,
  visible,
}: {
  id: string;
  label: string;
  position: THREE.Vector3;
  visible: boolean;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const { hovered, setHovered } = useExperience();
  const isHovered = hovered === `ghl:${id}`;

  useFrame(() => {
    if (!mesh.current) return;
    const target = isHovered ? 1.7 : 1;
    mesh.current.scale.setScalar(THREE.MathUtils.lerp(mesh.current.scale.x, target, 0.15));
    const mat = mesh.current.material as THREE.MeshBasicMaterial;
    mat.opacity = THREE.MathUtils.lerp(mat.opacity, isHovered ? 1 : 0.7, 0.15);
  });

  return (
    <group position={position}>
      <mesh
        ref={mesh}
        geometry={nodeGeo}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(`ghl:${id}`);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered((h) => (h === `ghl:${id}` ? null : h));
        }}
      >
        <meshBasicMaterial color="#ffd166" transparent opacity={0.7} wireframe />
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

function Particle({ pathPoints, offset }: { pathPoints: THREE.Vector3[]; offset: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    const t = ((state.clock.elapsedTime * 0.12) + offset) % 1;
    mesh.current.position.copy(pointOnPath(pathPoints, t));
  });
  return (
    <mesh ref={mesh} geometry={particleGeo}>
      <meshBasicMaterial color="#ffffff" transparent opacity={0.9} wireframe />
    </mesh>
  );
}

/** Real content: the GoHighLevel lead-to-client pipeline, animated. */
export default function GHLPipeline({ visible }: { visible: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current) return;
    const target = visible ? 1 : 0;
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, target, 0.08));
  });

  const points = useMemo(() => {
    const stops = ghlFlow.nodes.length;
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < stops; i++) {
      const t = i / (stops - 1);
      pts.push(new THREE.Vector3(THREE.MathUtils.lerp(-2.4, 2.4, t), Math.sin(t * Math.PI * 2) * 0.4, Math.cos(t * Math.PI) * 0.5));
    }
    return pts;
  }, []);

  return (
    <group ref={group} position={[0.4, -0.3, -6.2]} visible={visible}>
      <Line points={points} color="#ffd166" opacity={0.35} />
      {ghlFlow.nodes.map((n, i) => (
        <Node key={n.key} id={n.key} label={n.label} position={points[i]} visible={visible} />
      ))}
      {[0, 1 / 3, 2 / 3].map((offset, i) => (
        <Particle key={i} pathPoints={points} offset={offset} />
      ))}
    </group>
  );
}
