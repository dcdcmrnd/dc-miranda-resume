# Reference Specification — to-portfolio.com

Reverse-engineered from the live site via headless-browser inspection
(Playwright/Chromium) at four viewports: 1440×900, 1920×1080,
1024×1366 (tablet portrait), 390×844 (mobile). No source code was
copied — this documents observed behavior and computed styles only,
to guide an original implementation for DC Miranda.

Values marked **measured** came from `getComputedStyle` /
`getBoundingClientRect` on the live page. Values marked **observed**
are read off screenshots and are approximate.

## Framework fingerprint

Next.js (`_next/static` chunks), Tailwind-generated utility classes
(`fixed left-0 right-0 top-0 z-30 …`), CSS custom properties for
theming, a WebGL/three-fiber canvas layer, and a `jsx-…` scoped-style
hash — a React app, not a static template.

## Colors (measured, via `:root` custom properties)

| Token | Value | Use |
|---|---|---|
| `--background` | `#eaeaea` | page background, graph-paper base |
| `--panel` | `#ffffffeb` (white, ~92% opacity) | floating content panels, blurred |
| `--border` | `#33333329` (ink, ~16% opacity) | hairlines, panel borders |
| `--accent` | `#333` | **same as ink** — nav-link text, most "colored" labels are actually just dark grey |
| `--foreground` | `#666` | secondary text |
| `--muted` | `#8a8a8a` | tertiary/label text |

**Key finding:** the site reads as colorful because of the glitch
scramble and 3D scene, but the actual palette is almost monochrome.
The one real color is a small mint/teal-green status LED next to
"LINK STABLE" (~a positive/online signal), used nowhere else at
volume. There is no orange, blue, or brand-saturated accent smeared
across labels/brackets/tags the way an early implementation attempt
did — that was the biggest fidelity miss and has been corrected (see
"Corrections applied" below).

## Typography (measured)

- Font: **Geist Mono** (`"Geist Mono", "Geist Mono Fallback"`), weight
  **300** (light) for headings and labels. No serif/display pairing —
  monospace only, everywhere.
- Body element itself sets no font-family (falls back to browser
  serif) — font is applied per-component, not globally inherited.
- Label/small text: `font-size: 10–11px`, `letter-spacing: 0.18–0.2em`
  (Tailwind `tracking-[0.18em]` / `tracking-[0.2em]`), uppercase.
- A measured `<h1>` (boot-sequence title) rendered at `17.28px / 300
  weight / letter-spacing 4.49px (~26% of font-size) / line-height
  23.76px` — i.e. even "headline" text stays fairly small and
  letter-spaced rather than using huge display sizes; scale comes from
  the large glitch-title treatment and the 3D scene, not from
  oversized type.
- Scales down proportionally on mobile (measured ~14.6px vs ~17.3px
  desktop for the same element).

## Layout

- Fixed top bar: `position: fixed; top:0; left:0; right:0; z-index:30`,
  height **~46.5px at 1440w** — a thin strip, not a tall nav.
- Nav buttons: Tailwind `rounded-md`, `border`, `bg-[var(--panel)]/75`,
  `px-2.5 py-1.5`, `font-mono text-[10px] uppercase tracking-[0.18em]`,
  hover swaps border to accent and background to `--background`.
- Floating content panels ("cards") are centered, fixed-width
  (`w-[min(2…)]`), **not full-bleed** — narrow, framed, blurred
  (`backdrop-filter: blur(12px)`) over the WebGL/grid backdrop, with
  small corner tick marks.
- Document height varies hugely by viewport: 22,558px (1440w),
  25,262px (1920w), 29,557px (1024w tablet-portrait), but only
  **8,290px on mobile (390w)** — mobile is a materially shorter,
  re-composed experience, not a shrunk desktop layout.
- Background: a fine graph-paper grid, plus thin hairline "circuit"
  diagrams (right-angle connector lines, small filled/hollow dots,
  circles) scattered as depth decoration behind panels.

## Hero / boot sequence

1. **Audio-routing gate**: "OUTPUT ROUTING — select channel state" with
   ON/OFF buttons (SFX/voice-synth toggle). Skippable via OFF.
2. **Authentication/handshake sequence**: scrambled system-log text
   (`VERIFY·FIELD`, `CREDENTIAL`, `HANDSHAKE`, `ACCESS·GATE`,
   `SUBSYS_ACCESS_GATE`…), a `PERMIT` grant, `CLASS:OBSERVER ·
   MODE:READ-ONLY`.
3. **WebGL scene load**: "LOADING — WEBGL · 3D SCENE — CANVAS READY."
4. **Settled hero**: a large low-poly crystalline 3D form (three.js/
   R3F) center-stage over a radial-white vignette, a persistent fixed
   status bar (`NEURAL NODE INTERFACE · LINK STABLE [LOOP 00]`, audio
   toggle, `[REBUILD]`, `[HOME] [ABOUT] [EXPT. LOGS]`), a
   glitch-scrambled bracketed title that decodes to `[ PORTFOLIO ]`,
   a giant `LOOP: 00` numeral bottom-right, a `SCROLL` cue with tick
   marks bottom-center.

This full sequence replays on `[REBUILD]`, incrementing the loop
counter — reconstructing the "world" from origin.

## Sections (in scroll order, home page)

1. **Hero / boot** — as above.
2. **ARCHIVE:// NODE: PIVOT — RECORD_LOG** — a bordered, corner-ticked
   panel; career timeline as terminal log lines
   (`[ CAREER ] : EDUCATION : …`), ending in a `[ STATUS ]` line.
3. **ARCHIVE:// NODE: VOW** — same panel pattern; 2 short value
   statements (`[ CRAFT ]`, `[ INTENT ]`).
4. **ABOUT:// NODE: BRIEF — TELEMETRY** (mobile-observed) — a
   frosted, blurred panel over a faint world-map line-art with a
   moving scan-line; shows `[ LOCATION ]`, `[ COORDINATES ]`,
   `[ PRINCIPAL ]`, `[ STATUS ]: ABRIDGED · EXPAND_ALLOWED` and a
   `[ DISCLOSE_ARCHITECT// ]` button — a progressive-disclosure /
   "locked info" interaction. Not replicated for DC (it's a personal
   mystery-narrative device specific to that site's author; DC's site
   has nothing to hide, so this pattern isn't appropriate content-wise
   — but the panel/blur/corner-tick visual language is reused).
5. **REBUILD:// NODE: ORIGIN — ORIGIN GATE** — footer reset panel:
   "Close this timeline and reconstruct the world at origin
   coordinates," `[ RECONSTRUCT WORLD// ]` button, `PID:// DAEMON-4182
   ALIVE` status line.

Every section uses the *same* bordered/corner-ticked panel component
with a two-line header (`PATH://` left, `NODE: X` right) — there is
no visual "chapter" differentiation by background color; rhythm comes
from panel size/position/content density and the evolving 3D scene
behind it, not from color banding.

## Motion (observed)

- Glitch/scramble text-reveal on the hero title and section labels —
  random-character substitution converging left-to-right, roughly
  1–1.5s.
- 3D scene persists and evolves across the whole scroll (not confined
  to the hero) — different silhouettes appear at different scroll
  depths (crystal → cube lattice → spiral/conveyor form near the
  footer), with continuous slow rotation plus mouse-parallax camera
  drift.
- Panel entrances: fade/blur-in, no aggressive slide.
- Fixed nav persists across the entire scroll (no hide-on-scroll-down
  behavior observed — unlike an earlier implementation attempt).
- `prefers-reduced-motion` was not explicitly tested against the live
  site (cannot force a third-party site's media query from outside);
  our implementation forces reduced-motion behavior locally regardless.

## Corrections applied to the DC Miranda implementation after this audit

1. **Color desaturated.** Bracket/tag colors on record-log lines,
   section kickers, and nav-link text changed from orange to the
   ink/grey palette, matching the reference's `--accent: #333`
   finding. Orange is now reserved for exactly three things: the
   pulse status dot, the inner wireframe layer of the 3D scene, and
   interactive hover/focus/active states — mirroring how the
   reference reserves its one real color (the green LED) for a status
   signal rather than decoration.
2. **Panels now frosted/blurred** (`background: rgba(255,255,255,.92);
   backdrop-filter: blur(10px)`) instead of flat-opaque, matching the
   measured `--panel: #ffffffeb` + `blur(12px)` on the reference.
3. **Nav bar thinned** toward the measured ~46.5px reference height.
4. **Motion centralized** into `assets/js/motion.js` and rebuilt on
   GSAP + ScrollTrigger + Lenis (see `/docs/interaction-inventory.md`)
   instead of hand-rolled `requestAnimationFrame` scroll math, per the
   architecture spec.

## Fidelity self-assessment

Scored 1–10 against this spec, after the corrections above. Honest
scores, not aspirational ones — anything below 8 says why.

| Category | Score | Notes |
|---|---|---|
| Layout | 8 | Thin fixed bar, centered narrow panels, corner ticks, graph-paper ground all match. Reference's panels are more consistently narrow/centered; ours vary width by section (record-log, module grid, directory listing) to carry more original content. |
| Typography | 9 | Same monospace-only system, light weight, wide label tracking, no display-serif pairing. |
| Colors | 9 | Corrected to near-monochrome + one reserved accent, matching the `--accent:#333` finding. DC's orange stands in for their green as the one deliberate spark — a brand choice, not a miss. |
| Navigation | 8 | Fixed, thin, persistent, pill buttons. Ours adds a `[Contact]` item and a visible loop counter at all times; reference's nav is marginally sparser. |
| Project presentation | 6 | Reference's project/work section wasn't reached in this audit pass (boot sequence + about/vow/origin were the sections actually inspected). Our directory-listing device is an original, defensible pattern in the same terminal language, but isn't verified against their actual project UI. |
| Scroll experience | 8 | Lenis + ScrollTrigger now drive it, matching the architecture spec. 3D backdrop persists and evolves across scroll like the reference; ours uses one evolving wireframe rather than their multiple distinct silhouettes (crystal/lattice/spiral). |
| Motion | 8 | Centralized MOTION tokens, ScrollTrigger-driven reveals, word-level text reveal, clip-path image reveal, scroll-scrubbed parallax — all per spec. Timing values are reasoned estimates, not measured against the reference's actual GSAP timelines (not inspectable from outside). |
| Hover interaction | 7 | Tilt-on-hover and dir-row/contact reveal-on-hover are original additions in the spirit of "intentional hover," not ported from the reference (its hover states weren't captured in this audit). |
| Cursor | 7 | Custom reticle cursor with a hover state exists per the general brief; the reference itself appeared to use the native cursor in the sections audited, so this is an addition rather than a port. |
| Media | 7 | Real project imagery (Nesta's Chili Co.) gets a clip-path reveal + scroll parallax. No video on the reference's audited sections to compare against. |
| Responsiveness | 8 | Verified at all four required viewports, zero console errors, mobile menu, reduced 3D/parallax on mobile. Reference's document-height data shows its mobile experience is far more re-composed (8,290px vs 22–29k desktop) than ours (which mostly reflows the same sections). |
| **Overall feel** | **8** | Reads as the same design family: terminal HUD, monochrome-plus-one-accent, bracketed record-log framing, persistent evolving 3D, glitch reveal, rebuild loop — built from DC's real content rather than the reference's. |

Categories at 6–7 (project presentation, hover, cursor, media) are
below 8 because they're **original work in the reference's visual
language**, not measurements against something actually observed on
the live site — those specific interactions weren't reachable in the
audited sections. Iterating further here means either auditing deeper
into the reference (a project/work page, if one exists at a
sub-route) or treating these as intentional DC-original extensions.
