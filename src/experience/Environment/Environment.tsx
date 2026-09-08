"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PILLARS: Array<{ x: number; z: number; h: number; color: string }> = [
  { x: -5.2, z: 3, h: 6, color: "#49ffb4" },
  { x: 5.6, z: 1.5, h: 7.5, color: "#ff6bd6" },
  { x: -4.4, z: -3.5, h: 5.5, color: "#5ec8ff" },
  { x: 4.8, z: -5.5, h: 6.5, color: "#ffd166" },
  { x: -6, z: -9, h: 7, color: "#b06bff" },
  { x: 6.2, z: -11.5, h: 6, color: "#49ffb4" },
];

function Starfield({ count = 700 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 14 + Math.random() * 26;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame(() => {
    if (points.current) points.current.rotation.y += 0.0002;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#eef0ff" size={0.045} transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

function FloorGrid() {
  return (
    <gridHelper
      args={[70, 56, "#9fa8ff", "#2a3060"]}
      position={[0, -1.15, -8]}
      // GridHelper's material needs transparency turned on explicitly for
      // the opacity below to have any effect (three.js default is opaque).
      onUpdate={(grid) => {
        const mat = grid.material as THREE.LineBasicMaterial;
        mat.transparent = true;
        mat.opacity = 0.55;
      }}
    />
  );
}

function Pillars({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;
  return (
    <group>
      {PILLARS.map((p, i) => (
        <mesh key={i} position={[p.x, p.h / 2 - 1.15, p.z]}>
          <planeGeometry args={[0.05, p.h]} />
          <meshBasicMaterial
            color={p.color}
            transparent
            opacity={0.7}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
            depthWrite={false}
            fog={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Always-present ground layer: gives the camera an actual environment to
 * move through (floor + fog for depth, drifting stars, neon accent
 * pillars for parallax/scale cues) rather than floating objects in a void.
 * `richEffects` is turned off on touch/low-power devices.
 */
export default function Environment({ richEffects }: { richEffects: boolean }) {
  return (
    <>
      <fog attach="fog" args={["#05060b", 9, 40]} />
      <Starfield count={richEffects ? 700 : 260} />
      <FloorGrid />
      <Pillars enabled={richEffects} />
    </>
  );
}
