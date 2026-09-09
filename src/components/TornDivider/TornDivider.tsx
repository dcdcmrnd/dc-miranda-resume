// Fixed jagged silhouette (not random — must stay identical between server
// and client render). Values are percentages of the divider's own height.
const JAGGED_Y = [0, 55, 8, 78, 22, 92, 4, 68, 32, 100, 14, 82, 42, 6, 62, 18, 96, 10, 52, 28, 88, 0, 72, 38, 60];

/** A torn-paper seam between two sections: a jagged strip filled with the
 * color of the section that follows it, so the section above appears to
 * tear open into the next one. Purely decorative. */
export default function TornDivider({ color }: { color: string }) {
  const points = JAGGED_Y.map((y, i) => `${(i / (JAGGED_Y.length - 1)) * 100}% ${y}%`).join(", ");
  const clipPath = `polygon(${points}, 100% 100%, 0% 100%)`;

  return <div className="torn-seam" style={{ background: color, clipPath }} aria-hidden="true" />;
}
