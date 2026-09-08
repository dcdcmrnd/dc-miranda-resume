"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useExperience } from "@/hooks/useExperience";
import { useDevice } from "@/hooks/useDevice";
import { useScrollInput } from "@/hooks/useScrollInput";
import { projects, projectsByCategory } from "@/projects/projectData";
import CameraRig from "@/experience/Camera/CameraRig";
import Environment from "@/experience/Environment/Environment";
import HomeObject from "@/experience/Objects/HomeObject";
import FloatingPanel from "@/experience/Objects/FloatingPanel";
import AutomationNetwork from "@/experience/Objects/AutomationNetwork";
import GHLPipeline from "@/experience/Objects/GHLPipeline";
import WorkGallery from "@/experience/Objects/WorkGallery";
import CreativeGallery from "@/experience/Objects/CreativeGallery";

function nextProjectId(currentId: string | null, dir: 1 | -1): string {
  const ids = projects.map((p) => p.id);
  const idx = currentId ? ids.indexOf(currentId) : -1;
  const next = (idx + dir + ids.length) % ids.length;
  return ids[next];
}

function SceneContent({ richEffects }: { richEffects: boolean }) {
  const { location, selectedProjectId, selectProject } = useExperience();

  const handleSwipe = useMemo(
    () => (dir: 1 | -1) => {
      if (location !== "work") return;
      selectProject(nextProjectId(selectedProjectId, dir));
    },
    [location, selectedProjectId, selectProject]
  );
  const dolly = useScrollInput(handleSwipe);

  const graphicsItems = useMemo(() => projectsByCategory("graphics").concat(projectsByCategory("video")), []);
  const videoItems = useMemo(() => projectsByCategory("video"), []);

  return (
    <>
      <CameraRig scrollDolly={dolly} />
      <Environment richEffects={richEffects} />

      <HomeObject visible={location === "intro"} />
      <WorkGallery visible={location === "work"} />

      <FloatingPanel color="#5ec8ff" position={[-1.6, 0.1, 1.5]} visible={location === "web"} index={0} />
      <FloatingPanel color="#b06bff" position={[1.6, 0.1, 1.5]} visible={location === "software"} index={1} />

      <AutomationNetwork visible={location === "automation"} />
      <GHLPipeline visible={location === "gohighlevel"} />

      <CreativeGallery visible={location === "graphics"} category="graphics" color="#ff5c8a" items={graphicsItems} />
      <CreativeGallery visible={location === "video"} category="video" color="#8b8bff" items={videoItems} />
    </>
  );
}

/**
 * The persistent WebGL layer (Phase 4): one Canvas, one scene, objects and
 * camera changing state as `location` changes — not a separate canvas per
 * section.
 */
export default function Scene() {
  const device = useDevice();
  const { setAssetsReady } = useExperience();
  const richEffects = device.ready && !device.isTouch && !device.reducedMotion;
  const dpr = useMemo<[number, number]>(() => (device.isMobile ? [1, 1] : [1, 1.5]), [device.isMobile]);

  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.4, 7.5], fov: 45, near: 0.1, far: 100 }}
      style={{ position: "fixed", inset: 0 }}
      onCreated={() => setAssetsReady(true)}
    >
      <Suspense fallback={null}>
        <SceneContent richEffects={richEffects} />
        {richEffects && (
          <EffectComposer multisampling={0}>
            <Bloom intensity={0.85} luminanceThreshold={0.38} luminanceSmoothing={0.7} mipmapBlur />
          </EffectComposer>
        )}
      </Suspense>
    </Canvas>
  );
}
