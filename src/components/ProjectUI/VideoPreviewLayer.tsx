"use client";

import { useDevice } from "@/hooks/useDevice";
import { useVideoPreview } from "@/hooks/useVideoPreview";

const WIDTH = 320;
const HEIGHT = (WIDTH * 9) / 16;

/** Renders the single floating Drive preview panel next to whichever
 * project row is currently hovered (see useVideoPreview). Desktop only —
 * there is no hover state to drive this on touch. */
export default function VideoPreviewLayer() {
  const device = useDevice();
  const { state } = useVideoPreview();

  if (!device.ready || device.isTouch || !state.embedUrl || !state.rect) return null;

  let top = Math.max(12, Math.min(state.rect.top, window.innerHeight - HEIGHT - 12));
  let left = state.rect.right + 16;
  if (left + WIDTH > window.innerWidth) left = Math.max(12, state.rect.left - WIDTH - 16);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top,
        left,
        width: WIDTH,
        height: HEIGHT,
        zIndex: 500,
        background: "#000",
        border: "1px solid var(--line-strong)",
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: "0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,90,43,0.15)",
        pointerEvents: "none",
      }}
    >
      <iframe src={state.embedUrl} allow="autoplay" style={{ width: "100%", height: "100%", border: 0, display: "block" }} />
    </div>
  );
}
