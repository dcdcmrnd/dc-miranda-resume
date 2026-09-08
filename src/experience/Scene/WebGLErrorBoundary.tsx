"use client";

import { Component, ReactNode } from "react";

interface Props {
  fallback: ReactNode;
  children: ReactNode;
}
interface State {
  failed: boolean;
}

/** Graceful WebGL fallback (Phase 24): if canvas/context creation throws
 * anywhere below, render the plain-DOM fallback instead of a blank crash. */
export default class WebGLErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}
