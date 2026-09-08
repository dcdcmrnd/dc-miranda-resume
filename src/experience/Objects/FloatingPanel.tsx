"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Wire } from "./primitives";

const frameGeo = new THREE.PlaneGeometry(2.4, 1.5);
const barGeo = new THREE.PlaneGeometry(2.4, 0.22);
const dotGeo = new THREE.CircleGeometry(0.035, 12);

/**
 * A stylized floating "browser window / app panel" — three window-control
 * dots on a title bar over a frame — standing in for the web/software
 * project surfaces described in the brief. Wireframe only, per the
 * experience's line-art visual language.
 */
export default function FloatingPanel({
  color,
  position,
  visible,
  index = 0,
}: {
  color: string;
  position: [number, number, number];
  visible: boolean;
  index?: number;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime + index * 1.7;
    group.current.position.y = position[1] + Math.sin(t * 0.5) * 0.12;
    group.current.rotation.y = Math.sin(t * 0.2) * 0.08;
    const target = visible ? 1 : 0;
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, target, 0.08));
  });

  return (
    <group ref={group} position={position} visible={visible}>
      <Wire geometry={frameGeo} color={color} opacity={0.5} />
      <Wire geometry={barGeo} color={color} opacity={0.7} position={[0, 0.64, 0.001]} />
      {[-1.0, -0.86, -0.72].map((x, i) => (
        <mesh key={i} position={[x, 0.64, 0.002]}>
          <primitive object={dotGeo} attach="geometry" />
          <meshBasicMaterial color={color} transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}
