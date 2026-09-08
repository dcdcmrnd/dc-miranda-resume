"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ExperienceProvider, useExperience } from "@/hooks/useExperience";
import { useDevice } from "@/hooks/useDevice";
import { isWebGLAvailable } from "@/lib/webgl";
import Navigation from "@/components/Navigation/Navigation";
import Cursor from "@/components/Cursor/Cursor";
import Loading from "@/components/Loading/Loading";
import ExperienceUI from "@/components/ExperienceUI/ExperienceUI";
import ProjectDetail from "@/components/ProjectUI/ProjectDetail";
import WebGLErrorBoundary from "@/experience/Scene/WebGLErrorBoundary";

// The R3F canvas touches window/WebGL at module init, so it can only ever
// run on the client — Next.js would otherwise try to evaluate it during SSR.
const Scene = dynamic(() => import("@/experience/Scene/Scene"), { ssr: false });

function StaticBackdrop() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        background:
          "radial-gradient(circle at 30% 20%, rgba(176,107,255,0.14), transparent 55%), radial-gradient(circle at 80% 70%, rgba(94,168,255,0.12), transparent 50%), var(--void)",
      }}
    />
  );
}

function ExperienceRoot() {
  const device = useDevice();
  const { setAssetsReady, entered } = useExperience();
  const [webglOk, setWebglOk] = useState<boolean | null>(null);

  useEffect(() => {
    setWebglOk(isWebGLAvailable());
  }, []);

  // No-WebGL and reduced-motion visitors still get the full real content —
  // just without the 3D layer (Phase 24: graceful, not degraded-to-broken).
  const use3D = webglOk === true && !device.reducedMotion;

  useEffect(() => {
    if (webglOk === false || device.reducedMotion) setAssetsReady(true);
  }, [webglOk, device.reducedMotion, setAssetsReady]);

  if (webglOk === null || !device.ready) return <Loading />;

  return (
    <div className="app-root">
      {use3D ? (
        <WebGLErrorBoundary
          fallback={
            <>
              <StaticBackdrop />
            </>
          }
        >
          <Scene />
        </WebGLErrorBoundary>
      ) : (
        <StaticBackdrop />
      )}

      <span className="hud-corner hud-corner--tl" aria-hidden="true" />
      <span className="hud-corner hud-corner--tr" aria-hidden="true" />
      <span className="hud-corner hud-corner--bl" aria-hidden="true" />
      <span className="hud-corner hud-corner--br" aria-hidden="true" />

      <Loading />
      {entered && (
        <>
          <Navigation />
          <ExperienceUI />
          <ProjectDetail />
          <Cursor />
        </>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <ExperienceProvider>
      <ExperienceRoot />
    </ExperienceProvider>
  );
}
