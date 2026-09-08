"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";
import { useExperience } from "@/hooks/useExperience";
import { CAMERA_WAYPOINTS } from "@/animations/camera";
import { workMarkerWorldPosition, projectIndexById } from "@/experience/Objects/galleryLayout";

/**
 * The camera is an active participant in navigation: every location change
 * tweens position/lookAt/fov to that location's named waypoint (see
 * animations/camera.ts) instead of the page scrolling to a DOM section.
 * Mouse parallax and a small scroll-driven dolly are layered on top of the
 * animated base position, not instead of it.
 */
export default function CameraRig({ scrollDolly }: { scrollDolly: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  const { location, selectedProjectId } = useExperience();
  const base = useRef({ x: 0, y: 0.4, z: 7.5 });
  const lookAt = useRef({ x: 0, y: 0, z: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  const focus = useRef({ strength: 0 });
  const perspCamera = camera as THREE.PerspectiveCamera;

  useEffect(() => {
    function onMove(e: PointerEvent) {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    const wp = CAMERA_WAYPOINTS[location];
    gsap.to(base.current, {
      x: wp.position[0],
      y: wp.position[1],
      z: wp.position[2],
      duration: 1.4,
      ease: "power3.inOut",
    });
    gsap.to(lookAt.current, {
      x: wp.lookAt[0],
      y: wp.lookAt[1],
      z: wp.lookAt[2],
      duration: 1.4,
      ease: "power3.inOut",
    });
    gsap.to(perspCamera, {
      fov: wp.fov,
      duration: 1.2,
      ease: "power3.inOut",
      onUpdate: () => perspCamera.updateProjectionMatrix(),
    });
  }, [location, perspCamera]);

  // Phase 8: selecting a project shifts camera focus toward its marker
  // (rather than only opening a detail panel over an unchanged scene).
  useEffect(() => {
    const index = projectIndexById(selectedProjectId);
    const target = location === "work" && index >= 0 ? 1 : 0;
    gsap.to(focus.current, { strength: target, duration: 0.9, ease: "power2.out" });
  }, [location, selectedProjectId]);

  useFrame(() => {
    const dolly = scrollDolly.current;
    camera.position.set(
      base.current.x + mouse.current.x * 0.35,
      base.current.y - mouse.current.y * 0.25,
      base.current.z - dolly * 0.6
    );

    let lx = lookAt.current.x;
    let ly = lookAt.current.y;
    let lz = lookAt.current.z;
    const index = projectIndexById(selectedProjectId);
    if (focus.current.strength > 0.01 && index >= 0) {
      const marker = workMarkerWorldPosition(index);
      lx = THREE.MathUtils.lerp(lx, marker.x, focus.current.strength);
      ly = THREE.MathUtils.lerp(ly, marker.y, focus.current.strength);
      lz = THREE.MathUtils.lerp(lz, marker.z, focus.current.strength);
    }
    camera.lookAt(lx, ly, lz + dolly * 0.4);
  });

  return null;
}
