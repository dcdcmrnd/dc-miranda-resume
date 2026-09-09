"use client";

import { useTilt } from "@/hooks/useTilt";
import { useDevice } from "@/hooks/useDevice";

/** Thin client wrapper so server-rendered sections (hero, "What I Do" grid)
 * can opt an element into pointer tilt without becoming client components
 * themselves. Renders a plain div — same DOM shape callers already style. */
export default function TiltCard({
  className,
  style,
  max = 6,
  baseRotateZ = 0,
  liftPx = 0,
  children,
  ...rest
}: {
  className?: string;
  style?: React.CSSProperties;
  max?: number;
  baseRotateZ?: number;
  liftPx?: number;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  const { isTouch, reducedMotion, ready } = useDevice();
  const ref = useTilt<HTMLDivElement>({ max, baseRotateZ, liftPx, disabled: !ready || isTouch || reducedMotion });

  return (
    <div ref={ref} className={className} style={style} {...rest}>
      {children}
    </div>
  );
}
