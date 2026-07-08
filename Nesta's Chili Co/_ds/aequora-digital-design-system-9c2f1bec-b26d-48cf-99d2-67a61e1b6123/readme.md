# Aequora Digital Design System

The design system for **Aequora Digital** — a web design, SEO, Google Ads, and
managed-VA agency for U.S. small businesses ("Web Design & Enhancement · U.S. Small
Business"). Rebuilt to follow the brand as it actually exists on the live site.

## Sources

- **[aequoradigital.com](https://www.aequoradigital.com/)** — primary source of
  truth for this system. Colors, radii, shadows, and the font pairing were read
  directly from the site's own `:root` CSS custom properties and `<link>` font
  imports; copy (headlines, service names, pricing tiers, FAQ) is copied verbatim
  from the live site since this is the user's own company.
- `github.com/dcdcmrnd/dc-miranda-resume` — attached in an earlier round but empty
  on `main`; nothing could be read from it.
- `github.com/dcdcmrnd/Aequora-Digital-AI-Tool` and
  `github.com/dcdcmrnd/ai-web-design-landing` — two other repos visible under the
  same GitHub account. Not read for this pass since the live site gave a complete,
  authoritative source; worth exploring if you want this system to also cover an
  internal tool's UI (`Aequora-Digital-AI-Tool` looks like it could be a client
  portal/dashboard product) or reconcile against `ai-web-design-landing`'s own
  `design.md`/`content.json`.

An earlier draft of this system (before the live site was provided) invented an
unrelated craft-food brand direction — that draft has been fully replaced.

## Index

- `styles.css` — global stylesheet entry point (imports only)
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `effects.css`, `fonts.css`
- `assets/logos/` — real Aequora Digital "Ae" monogram logo
- `assets/fonts/` — self-hosted Plus Jakarta Sans (variable, upright + italic)
- `assets/icons/` — Lucide-sourced SVG icon substitutes (menu, close, chevrons,
  arrows, check, mail, search, plus/minus)
- `components/core/` — Button, IconButton, Badge, Tag, Card
- `components/forms/` — Input, Select, Checkbox, Switch
- `components/feedback/` — Toast, Tooltip, Dialog
- `components/navigation/` — Tabs
- `components/pricing/` — PricingCard
- `ui_kits/aequora-digital-site/` — full home-page recreation (nav, hero, services,
  pricing, FAQ, footer)
- `guidelines/` — foundation specimen cards (Colors, Type, Brand)
- `SKILL.md` — Claude Code–compatible skill wrapper for this system

## Components

Button, IconButton, Badge, Tag, Card, Input, Select, Checkbox, Switch, Toast,
Tooltip, Dialog, Tabs, PricingCard.

### Intentional additions

No component library/codebase was available (the live site is server-rendered
marketing HTML, not a component source) — this is a from-scratch set sized to an
agency marketing site. `PricingCard` was added because pricing tiers are a defined,
recurring pattern on the real site (three tiers, one "featured"), not a generic
guess.

## Content fundamentals

- **Tone:** direct, confident, plain-spoken — sells outcomes ("more customers"),
  not jargon. Reads like a founder talking straight to a business owner, not a
  marketing department.
- **Voice:** heavy "we/you" — "We build, manage, and grow websites... You get more
  customers." Consistently addresses the reader as a business owner, not a
  developer.
- **Casing:** sentence case everywhere, including headlines — no all-caps
  shouting. Small eyebrow labels ("What We Do," "Pricing") are the one uppercase,
  wide-tracked exception.
- **Punctuation & rhythm:** short, punchy fragments and one-line promises —
  "No freelancer headaches. No DIY guesswork. Just results." Headlines often end on
  a gradient-highlighted emphasis phrase ("*Let's fix that.*").
- **Numbers as proof:** concrete, specific stats used as trust signals throughout
  (48h, 100%, 14 days, $1,999) rather than vague superlatives.
- **Humor:** minimal — one dry aside at most ("official review" style jokes do not
  appear here; this is a more buttoned-up register than a consumer brand).
- **Emoji:** used sparingly and functionally as inline bullet icons in a couple of
  spots (💻 📈 🛒) — not used in headlines, buttons, or body copy.
- **Vibe in one line:** a technically-credible founder giving a small-business
  owner an honest, no-nonsense pitch — competent, not corporate.

## Visual foundations

- **Color:** an "ocean" palette — vivid ocean-blue navy as primary, a bright
  aqua/teal ("terra") for small accents (the pulsing hero dot, section-label
  underline, chip numbers), warm sand as a secondary/neutral accent, and a family
  of blue-tinted neutrals (sea-mist backgrounds, ocean-dark text) instead of true
  grays — even body text is a blue-leaning navy, never pure black.
- **Type:** a single family, **Plus Jakarta Sans**, at both ends of the weight
  range — 700–800 for every heading (tight, negative letter-spacing around
  -0.03em) and 400–600 for body/UI text. One recurring accent: an **italic,
  weight-300** word or phrase inside headlines, rendered with a navy→bright-navy
  gradient text-fill — the brand's one "designed" flourish.
- **Spacing:** 4px base scale, generous section padding (64–96px), max content
  width 1200px.
- **Backgrounds:** mostly flat — white/sea-mist page backgrounds, one deep navy
  section (footer, process/CTA band) for contrast. No photography-heavy full-bleed
  treatment; imagery is used as supporting content blocks, not backdrops. No
  patterns or textures.
- **Animation:** subtle and functional — a soft pulsing dot on the hero badge,
  gentle hover lifts, simple opacity/transform transitions. No bounce, no spring,
  no decorative looping beyond that one pulse. **Scroll storytelling** (added in
  this system, technique inspired by buckssauce.com/about's layered-parallax,
  reveal-as-you-scroll hero — no code or imagery copied from that site): the hero
  headline/subhead/CTAs/stats stage in with a staggered fade-up on load, a faint
  dot-grid backdrop and the hero photo drift at different scroll-linked speeds
  (parallax), and Services/Pricing/FAQ cards fade up as they enter the viewport,
  staggered by column/row. All of it respects `prefers-reduced-motion`. See
  `ui_kits/aequora-digital-site/ScrollFx.jsx` (`Reveal`, `useParallax`).
- **Hover states:** buttons brighten (navy → bright ocean navy-lt) and lift 1–2px
  with a soft shadow bloom; ghost buttons/links just shift border/text color to
  navy — no fill-in on hover.
- **Press states:** not heavily choreographed on the source site; this system uses
  a light scale-down (kept consistent with the rest of the kit) rather than
  inventing a new press language.
- **Borders:** thin (1–1.5px), low-opacity navy-tinted borders (`rgba(13,92,122,…)`)
  — delicate, not bold. No thick 2px+ borders anywhere on the source site.
- **Shadows:** soft, ocean-tinted (`rgba(8,32,48,…)`), used sparingly — mostly on
  hover states and the featured pricing card, not on every card by default.
- **Corner radii:** generous and rounded throughout — 16px on cards/chips, 32px on
  large surfaces (hero art, feature panels), fully pill-shaped nav/CTA buttons and
  badges. No sharp/square corners anywhere on the source site.
- **Cards:** white surface, thin low-opacity border, large 16–32px radius, shadow
  only on hover or for the one "featured" state — never a colored left-border
  accent.
- **Transparency/blur:** the header uses a translucent, blurred background
  (`backdrop-filter: blur(14px)`) so page content shows through subtly while
  scrolling — the one deliberate glass-morphism moment in an otherwise flat system.
- **Imagery color vibe:** not yet populated with real photography (dashed
  placeholders throughout this kit) — the one stock photo referenced by the live
  site is a natural-light, warm-neutral small-business/office scene, not moody or
  desaturated.

## Iconography

- **System:** [Lucide](https://lucide.dev) SVGs, copied locally into
  `assets/icons/` — stroke-based, 24×24, 2px stroke. This is a **substitution**,
  not a brand-defined icon system (the live site itself mostly uses inline emoji
  as bullet icons — 💻 📈 🛒 🔒 — rather than an SVG icon set).
- **Usage:** functional UI icons only (menu, close, chevron, arrow, check, mail,
  search) — no decorative icon illustrations.
- **Emoji:** used on the live site as small inline bullet markers next to a few
  feature callouts; not used elsewhere (never in this design system's own UI
  chrome).
- **Unicode glyphs as icons:** not used.

## Fonts

**Plus Jakarta Sans** is confirmed from the live site's own Google Fonts import
(`family=Plus+Jakarta+Sans:ital,wght@...300..800`) — self-hosted as variable woff2
(upright + italic) in `assets/fonts/` and declared in `tokens/fonts.css`. No
substitution needed; this is the real brand font. (Note: the site's `<head>` also
imports Playfair Display, but it is never referenced anywhere in the site's CSS —
treated as an unused leftover import and not carried into this system.)

## Logo

The real logo (`assets/logos/aequora-digital-logo.png`) — a navy "Ae" monogram — was
downloaded directly from the live site and is used throughout this system's nav,
footer, and Brand guideline card.
