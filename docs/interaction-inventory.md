# Interaction Inventory — DC Miranda Portfolio

Every interactive/animated behavior in the implementation, mapped to
what was observed on the reference (to-portfolio.com) where
applicable, and to the actual trigger/implementation in this repo.

| Element | Trigger | Behavior | Reference basis | Duration / easing | Implementation |
|---|---|---|---|---|---|
| Hero title | Page load | Character-scramble decode to final text | Observed: glitch decode on boot title | 1.1s, linear-ish substitution | `assets/js/main.js: glitchReveal()` |
| `[REBUILD]` button | Click | Scrolls to top, replays hero glitch, increments `[LOOP nn]` counter | Observed: `[REBUILD]` reconstructs the world, loop counter | Scroll 0.9s `power2.inOut` (Lenis), glitch 1.1s | `data-rebuild` handler |
| Nav / fixed bar | Scroll | Border strengthens past 20px scroll; stays pinned (no hide) | Measured: `position:fixed`, persists through entire scroll | instant (no animated hide) | `.hud`, `updateHud()` |
| Section panels | Enter viewport | Fade + short rise, corner ticks visible from the start | Observed: panel fade/blur-in | 0.6s `power2.out`, 15% viewport threshold, once | GSAP `ScrollTrigger` batch reveal (`MOTION.duration.normal`) |
| Section headings | Enter viewport | Word-level fade/rise reveal | Observed: label-level reveal on scroll | 0.5s, 0.06s stagger | `RevealText` primitive in `main.js` |
| 3D wireframe backdrop | Scroll position (0–1 page progress) | Rotates ~2.5 turns across the page, scales up, brightens in hero, dims mid-page, brightens again near footer | Observed: 3D scene persists and evolves across the whole scroll, not just hero | continuous, driven by Lenis scroll progress | `initWebGLBackdrop()` (Three.js) |
| 3D wireframe backdrop | Mouse move | Camera drifts toward pointer (parallax) | Observed: scene reacts to cursor | eased lerp ~0.025/frame | same |
| Decorative line-art (hex, rings) | Scroll | Subtle vertical parallax drift | Observed: circuit/line diagrams behind panels | continuous, GSAP ScrollTrigger `scrub` | `[data-parallax]` via ScrollTrigger |
| Featured work image | Scroll | Parallax drift inside its frame | Reference pattern (line-art parallax) applied to imagery, DC-original content | continuous, scrub | `[data-parallax]` on `<img>` |
| Panel / module card | Mouse move (desktop only) | 3D tilt toward cursor (`rotateX/rotateY`), shadow lifts | Not on reference; added per "more interactive" direction, kept GPU-cheap | instant follow, `perspective(900px)` | `initTilt()` |
| Reticle cursor | Mouse move | Dot + lagging outline box follow cursor; box enlarges over links/buttons | Not literally on reference (theirs is native cursor); custom cursor implemented per general brief requirement, styled to match the HUD/reticle language | dot instant, box lerp 0.2/frame | `.reticle-dot`, `.reticle-box` |
| Reticle cursor | Touch / coarse pointer | Disabled entirely, native cursor/touch used | — | — | `matchMedia("(hover:none),(pointer:coarse)")` guard |
| Mobile menu | Tap `[Menu]` | Fullscreen nav overlay fades in | Observed: `[Menu]` replaces desktop nav under a breakpoint | 0.32s fade | `.mobile-menu`, `menu-open` class |
| Work filter pills | Click | Directory-listing rows show/hide by discipline tag | DC-original device (file/directory listing), not on reference | instant | `[data-filter]` handler |
| All animation | `prefers-reduced-motion: reduce` | Reveals show final state immediately, 3D backdrop disabled, tilt/cursor disabled, Lenis smooth-scroll disabled (native scroll) | Spec requirement (§19); reference could not be tested against this media query from outside | — | checked once at boot, gates every system |
| All animation | `(hover:none)` / coarse pointer | Cursor, tilt disabled; taps replace hovers | Spec requirement (§18) | — | same guard |

## Notes on scope decisions

- **No page transitions**: this is a single-page, single-route site
  (anchor navigation only), so §14 (route transition choreography)
  does not apply.
- **No horizontal scroll / pinning**: the reference's project section
  was not reached in this audit pass; nothing on the audited sections
  required horizontal scroll or GSAP pinning, so none was added. If a
  future "selected work" redesign wants a pinned horizontal rail,
  ScrollTrigger's `pin` is already loaded and ready to use.
- **No progressive-disclosure "principal" gimmick**: the reference's
  `ABOUT: TELEMETRY` panel with a locked `[DISCLOSE_ARCHITECT]` button
  is a personal-mystery narrative device for that site's anonymous
  author. DC's site is not anonymous, so this specific interaction was
  not ported — but the frosted/blurred panel styling it uses was
  folded into the shared panel component.
