"use client";

import { useState } from "react";

/** A small, purely decorative "pop the bubble wrap" strip for the footer —
 * borrowed as an interaction idea (click-to-pop, one-way), not any of the
 * reference site's actual assets, copy, or styling. */
export default function BubbleWrap({ count = 40 }: { count?: number }) {
  const [popped, setPopped] = useState<Set<number>>(() => new Set());

  return (
    <div className="bubble-wrap" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          className={`bubble${popped.has(i) ? " is-popped" : ""}`}
          tabIndex={-1}
          onClick={() => {
            if (popped.has(i)) return;
            setPopped((prev) => new Set(prev).add(i));
          }}
        />
      ))}
    </div>
  );
}
