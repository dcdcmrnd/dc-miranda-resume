"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Wire } from "./primitives";

const outerGeo = new THREE.IcosahedronGeometry(2.2, 1);
const innerGeo = new THREE.IcosahedronGeometry(1.15, 0);
const driftGeo = new THREE.TorusGeometry(1.4, 0.02, 6, 40);

/** The intro-state centerpiece — same identity mark across the experience. */
export default function HomeObject({ visible }: { visible: boolean }) {
  const group = useRef<THREE.Group>(null);
  const outer = useRef<THREE.LineSegments>(null);
  const inner = useRef<THREE.LineSegments>(null);
  const drift = useRef<THREE.LineSegments>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    if (outer.current) {
      outer.current.rotation.y = t * 0.15;
      outer.current.rotation.x = t * 0.06;
    }
    if (inner.current) inner.current.rotation.y -= t * 0.1;
    if (drift.current) drift.current.rotation.z += delta * 0.12;
    const breathe = 1 + Math.sin(t * 0.6) * 0.05;
    group.current.scale.setScalar(breathe);
    group.current.visible = visible;
  });

  return (
    <group ref={group} visible={visible}>
      <Wire ref={outer} geometry={outerGeo} color="#9fb4ff" opacity={0.55} />
      <Wire ref={inner} geometry={innerGeo} color="#ff5a2b" opacity={0.55} />
      <Wire ref={drift} geometry={driftGeo} color="#b06bff" opacity={0.28} position={[-2.6, 1.4, -2.5]} />
    </group>
  );
}
