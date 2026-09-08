"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, ReactNode } from "react";

interface PreviewState {
  embedUrl: string | null;
  rect: DOMRect | null;
}

interface VideoPreviewApi {
  state: PreviewState;
  show: (embedUrl: string, anchor: HTMLElement) => void;
  hide: () => void;
}

const VideoPreviewContext = createContext<VideoPreviewApi | null>(null);

/** Shared across WorkPanel/CategoryPanel rows so only one floating Drive
 * preview exists at a time, positioned next to whichever row is hovered. */
export function VideoPreviewProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PreviewState>({ embedUrl: null, rect: null });
  const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingKey = useRef<string | null>(null);

  const show = useCallback((embedUrl: string, anchor: HTMLElement) => {
    pendingKey.current = embedUrl;
    if (showTimer.current) clearTimeout(showTimer.current);
    showTimer.current = setTimeout(() => {
      if (pendingKey.current !== embedUrl) return;
      setState({ embedUrl, rect: anchor.getBoundingClientRect() });
    }, 220);
  }, []);

  const hide = useCallback(() => {
    pendingKey.current = null;
    if (showTimer.current) clearTimeout(showTimer.current);
    setState({ embedUrl: null, rect: null });
  }, []);

  const value = useMemo<VideoPreviewApi>(() => ({ state, show, hide }), [state, show, hide]);

  return <VideoPreviewContext.Provider value={value}>{children}</VideoPreviewContext.Provider>;
}

export function useVideoPreview() {
  const ctx = useContext(VideoPreviewContext);
  if (!ctx) throw new Error("useVideoPreview must be used within VideoPreviewProvider");
  return ctx;
}
