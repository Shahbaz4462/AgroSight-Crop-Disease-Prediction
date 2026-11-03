# AgroSight UI Design System ("Field Paper")

Hand this file to any developer or AI model with the prompt in section 12 and they should reproduce the same look, feel and UX in a new project.

Stack: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS 3.4, lucide-react. No UI library.
Working reference implementation: this repo. Verbatim source copies live in `docs/ui-kit/*.txt` (renamed `.txt` so they are not compiled; rename to `.tsx` / `.css` / `.ts` when copying).

---

## 1. Design intent

**One sentence:** a sharp, confident field instrument for people outdoors on a phone, not a soft, rounded SaaS template.

| Do | Don't |
|---|---|
| Square corners. Hard 2px ink borders. Hard offset shadows | Rounded cards (`rounded-2xl/3xl`), soft blurry shadows |
| One accent colour (acid lime) used sparingly for the main action and the "active" state | Rainbow gradients, glow, glassmorphism, emerald-to-teal gradients |
| Huge tight display headlines, small mono uppercase labels | Mid-sized grey text everywhere, 5 font weights |
| Plain words ("Is your crop sick?") | Jargon ("neural pipeline", "foliar pathology") |
| Big touch targets (56px+), one primary action per screen | Tiny chips, icon-only controls without labels |
| Real data or an honest "Sample" tag | Invented statistics presented as real |

These are exactly the things that make a UI look "AI-generated": rounded-everything, gradient hero, pill badges, emoji/sparkle icons, identical cards in a 3-col grid, vague centred copy. Avoid all of them.

Audience rules baked in: used mostly on **phones, outdoors, in sun, often one-handed, sometimes low literacy**. So: light mode default (readable in glare), high contrast, thumb-reachable bottom nav, minimal reading, numbered steps.

---

## 2. Design tokens

Defined as **space-separated RGB channels** in CSS variables so Tailwind opacity modifiers work (`bg-ink/10`).

```css
:root {
  --paper: 238 236 228;   /* page background, warm off-white */
  --card:  249 248 243;   /* raised surface */
  --ink:   11 26 18;      /* text, borders, shadows (near-black green) */
  --muted: 91 107 96;     /* secondary text */
  --accent: 200 241 53;   /* acid lime: THE accent */
  --forest: 14 59 40;     /* dark green section background */
  --danger: 229 57 31;    /* disease / destructive */
  --warn:  240 164 0;     /* caution / unsure */
  --ok:    31 138 76;     /* healthy */
}
.dark {
  --paper: 10 19 14;  --card: 17 29 22;  --ink: 234 240 230;  --muted: 143 161 150;
  --accent: 200 241 53;  --forest: 21 63 44;
  --danger: 255 90 66;  --warn: 245 184 40;  --ok: 74 200 125;
}
```

Tailwind mapping: `colors: { paper: 'rgb(var(--paper) / <alpha-value>)', ... }` (see `docs/ui-kit/tailwind.config.ts.txt`).

Rules:
- Text on lime/warn/ok backgrounds is **always `text-[#0b1a12]`** (fixed dark), never `text-ink`, because `ink` flips to light in dark mode.
- `accent` stays the same in both modes.
- Status colours: danger = disease, warn = unsure, ok = healthy. Always pair colour with a word or icon (colour-blind safe).
- Never introduce a second accent colour.

### Radius
`tailwind.config` overrides `borderRadius` so **everything is 0 except `rounded-full`**. Use `rounded-full` only for status dots. So even legacy `rounded-2xl` classes render square.

### Shadows (hard, no blur)
`shadow-hard` 4px 4px 0 ink, `shadow-hard-sm` 2px, `shadow-hard-lg` 8px. Always the ink colour.

### Borders
Standard is `border-2 border-ink`. Hairline dividers inside a bordered block: `divide-y-2 divide-ink` (strong) or `divide-ink/15` (soft). Page sections separated by `border-b-2 border-ink`.

---

## 3. Typography

Three fonts via `next/font/google`, exposed as CSS variables:

| Role | Font | Variable | Tailwind |
|---|---|---|---|
| Display / headings | Bricolage Grotesque | `--font-display` | `font-display` |
| Body | Instrument Sans | `--font-body` | `font-sans` (default) |
| Labels, numbers, data | JetBrains Mono | `--font-mono` | `font-mono` |

Scale (mobile to desktop):
- Hero H1: `text-[3.4rem] sm:text-7xl lg:text-[6.5rem] font-display font-extrabold leading-[0.88]`
- Page H1 (PageHeader): `text-5xl sm:text-6xl md:text-7xl leading-[0.9]`
- Section H2: `text-4xl md:text-6xl leading-[0.95]` (or `text-3xl` inside content)
- Body: 16px base, `text-lg md:text-xl` for lead text, `text-muted` for secondary
- **Label** (`.label`): mono, 11px, uppercase, `letter-spacing: .12em`. Used for every small caption, tab, tag, nav link, metric name.
- Big numbers: `font-mono text-4xl font-medium` (confidence %, steps `01 02 03`).

Headline tracking is tight (`letter-spacing:-0.03em` applied to h1-h3 in CSS). Headlines end with a full stop ("Scan a leaf.", "My scans.") for a firm, editorial tone.

Highlight trick (hero): a lime block behind one word:
```tsx
<span className="relative inline-block">
  <span className="absolute inset-x-[-0.08em] bottom-[0.06em] top-[0.2em] bg-accent" aria-hidden="true" />
  <span className="relative text-[#0b1a12]">sick?</span>
</span>
```

---

## 4. Layout

- Page container: `max-w-7xl mx-auto px-4 sm:px-8` (reading pages `max-w-4xl`, scan flow `max-w-xl`).
- Vertical rhythm: sections `py-12 md:py-20`, always separated by a full-width `border-b-2 border-ink`.
- Page start: `PageHeader` (label, giant title, optional sub, optional right-side slot) then a bordered body.
- Mobile first. Desktop adds columns, never new features.
- **Mobile bottom nav** (5 tabs, `md:hidden`, fixed). Centre tab is the primary action as a full lime block. Add `pb-safe-nav` to `<main>` so content clears it. Include `env(safe-area-inset-bottom)`.
- **Desktop top nav**: logo square (lime, 32px, bordered), mono uppercase links with 2px underline for active, dark "Scan a leaf ↗" button.
- Footer is desktop only, solid ink background.
- Sticky side column on desktop for result detail (`lg:sticky lg:top-24`).

Section background pattern on a long page: paper, then ink ticker strip, paper, `bg-forest` CTA block at the end.

---

## 5. Core CSS component classes (`globals.css`, `@layer components`)

```css
.label  { font-family: var(--font-mono); font-size: .6875rem; letter-spacing: .12em; text-transform: uppercase; font-weight: 500; }
.panel  { background: rgb(var(--card)); border: 2px solid rgb(var(--ink)); }
.btn    { min-height: 3.5rem; padding: 0 1.5rem; border: 2px solid rgb(var(--ink)); font: 700 1.0625rem var(--font-display);
          box-shadow: 4px 4px 0 0 rgb(var(--ink)); transition: transform .12s, box-shadow .12s; display:inline-flex; align-items:center; justify-content:center; gap:.625rem; }
.btn:hover  { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 0 rgb(var(--ink)); }
.btn:active { transform: translate(4px,4px);   box-shadow: 0 0 0 0 rgb(var(--ink)); }   /* physically presses */
.btn-accent { background: rgb(var(--accent)); color:#0b1a12; }
.btn-ink    { background: rgb(var(--ink)); color: rgb(var(--paper)); }
.btn-paper  { background: rgb(var(--card)); color: rgb(var(--ink)); }
.grid-bg    { background-image: linear-gradient(rgb(var(--ink)/.07) 1px,transparent 1px), linear-gradient(90deg, rgb(var(--ink)/.07) 1px,transparent 1px); background-size: 32px 32px; }
```
Focus ring: 3px accent outline + 5px ink ring (`:focus-visible`).

Full file: `docs/ui-kit/globals.css.txt`.

---

## 6. Component recipes

Copy these patterns; do not invent new ones.

**Primary button** `className="btn btn-accent"`. One per screen. Full width on mobile (`w-full sm:w-auto`), `min-h-[4rem] text-xl` for the hero CTA. Icon `strokeWidth={2.5}`.

**Panel / card** `className="panel"` (+ `shadow-hard` when it is the focal item). Never rounded.

**Segmented tabs / filters** (replaces pill tabs):
```tsx
<div role="tablist" className="grid grid-cols-3 border-2 border-ink">
  <button role="tab" aria-selected={on}
    className={`h-14 label border-r-2 last:border-r-0 border-ink ${on ? 'bg-ink text-paper' : 'bg-card hover:bg-accent hover:text-[#0b1a12]'}`}>
```

**List rows** (history, recent scans, knowledge base): one bordered container, `divide-y-2 divide-ink`, each row `flex items-center gap-4 p-3 hover:bg-accent hover:text-[#0b1a12]`. Thumbnail `w-14 h-14 border-2 border-ink object-cover`. Status as a 10px round dot plus a label word.

**Numbered step** (all advice): 36px bordered square containing mono `01`, then the sentence.
```tsx
<li className="flex gap-4"><span className="font-mono text-sm w-9 h-9 border-2 border-ink flex items-center justify-center bg-card">01</span><span className="pt-1.5">Text</span></li>
```

**Verdict banner** (full-width top of result): background by state (`bg-danger text-white` / `bg-ok` / `bg-warn` with `text-[#0b1a12]`), label, giant `Disease found.` headline, one-line sub.

**Segmented meter** (confidence): 20 square cells, filled = `bg-ink`; in the scan progress, 10 cells filled `bg-accent`. Keep `role="meter"` with aria values.

**Hover-lime cards** (steps grid): `hover:bg-accent hover:text-[#0b1a12] transition-colors` on cells of a `border-2 divide-x-2` grid.

**Ticker strip**: `bg-ink text-paper` mono labels separated by lime `✦`, CSS marquee (`animate-marquee`), `aria-hidden`.

**Drawer** (detail view): fixed right sheet `sm:max-w-xl border-l-2 border-ink`, sticky header with label + square close button, backdrop `bg-ink/60`, Escape closes, body scroll locked.

**Sample-data tag**: dashed bordered box with a black "SAMPLE" mono chip. Use whenever numbers are not real.

**Error/notice**: `border-2 border-ink bg-danger text-white shadow-hard-sm`; caution `bg-warn text-[#0b1a12]`; neutral note `border-2 border-dashed border-ink`.

**Hero specimen graphic**: crisp inline SVG (leaf, lesions with dashed lime rings, callout lines, mono tag labels) inside a `panel shadow-hard-lg grid-bg` with an ink top bar ("SPECIMEN 0427 / ANALYSING" with blinking dot). See `LeafSpecimen.tsx.txt`. Slight `lg:rotate-[1.5deg]` for energy. Swap the SVG for your domain's subject.

**Charts**: no chart library. Use bordered bar rows (`h-3 border-2 border-ink` with an ink fill), stacked bars, and tables. They read better on phones and match the system.

**Map**: SVG polygons, `fill-card stroke-ink`, selected = `fill-accent`, mono uppercase labels, keyboard accessible (`tabIndex`, `role="button"`, Enter/Space).

---

## 7. Motion

Purposeful and small:
- Page load: `fade-up` (translateY 14px to 0, 0.55s ease-out) with stagger classes `d1 d2 d3` (0.08s steps).
- Button press translate (see `.btn`).
- Scan laser sweep, blink dot, marquee, line draw-in on the specimen graphic.
- Always honour `prefers-reduced-motion` (CSS in globals sets durations to ~0).
- No bounce, no parallax, no scroll-jacking.

---

## 8. Mobile and UX rules

1. One primary action per screen, in the lower half (thumb zone).
2. Touch targets at least 48px; primary buttons 56 to 64px.
3. Bottom tab bar on mobile, top nav on desktop. Same items, same order.
4. Forms: `type="search"`, large inputs (`h-14`), visible labels, `aria-label` on icon buttons.
5. Never rely on hover for information.
6. Plain language, short sentences, numbered steps over paragraphs.
7. Always show a way back and a way forward ("New scan", "Scan again").
8. Empty states have a headline and the primary action ("No scans yet." + Scan button).
9. Destructive actions are separate, labelled, and confirmed when bulk (`confirm()` is acceptable for MVP).
10. Honest states: loading, error, "not sure", offline. Never show fake success.
11. Persist useful things locally (history in `localStorage`), shrink images before storing (`src/lib/image.ts`).

Accessibility: semantic landmarks (`header`, `nav aria-label`, `main`), `aria-current="page"`, `role=tablist/tab/aria-selected`, `role=status aria-live=polite` for scan hints, visible focus ring, colour never the only signal, 4.5:1 contrast (ink on paper is about 15:1).

---

## 9. Live camera scanner (pattern)

`src/components/scanner/LiveCamera.tsx` (copy: `docs/ui-kit/LiveCamera.tsx.txt`).
- `getUserMedia` with `facingMode: ideal environment`, 1080p ideal. `video playsInline muted autoPlay`.
- Analysis loop every 200ms on a 96x96 centre crop: plant-colour ratio, Laplacian variance (sharpness), mean luminance, frame difference (motion).
- Auto-capture after all gates pass for 1200ms; manual shutter always available; Auto toggle; flip camera if more than one device.
- Gates are constants at the top of the file (`MIN_LEAF_RATIO`, `MIN_SHARPNESS`, `MIN_LIGHT`, `MAX_LIGHT`, `MAX_MOTION`, `HOLD_MS`). **Tune on real devices.**
- Graceful failure screen for denied, no camera, insecure context, or error, always with a "use a photo instead" path.
- **Requires https** (except localhost). Use `npm run dev:https` or deploy to test on phones.
- To adapt to another subject (barcodes, documents, faces) replace the colour test with the relevant check; keep the gating, hold-still and fallback structure.

---

## 10. File map (this repo)

```
src/app/globals.css              tokens + .label/.panel/.btn/.grid-bg + animations
tailwind.config.ts               colors from CSS vars, radius reset, fonts, hard shadows, marquee
src/app/layout.tsx               next/font setup, Navbar, BottomNav, Footer, <main className="pb-safe-nav">
src/components/layout/           Navbar, BottomNav, Footer, PageHeader (+SampleDataNote), LeafSpecimen
src/components/scanner/LiveCamera.tsx
src/components/diagnosis/ScanFlow.tsx   start (camera) -> analysing -> result routing
src/app/page.tsx                 home: hero, ticker, recent, steps, CTA
src/app/results/page.tsx         verdict banner + sticky photo/meter + tabs + steps
src/app/history, crops, insights, about, architecture, admin
```

---

## 11. Porting to a new project (checklist)

1. `npx create-next-app@14` (TypeScript, Tailwind, App Router, src dir). `npm i lucide-react clsx tailwind-merge`.
2. Copy `docs/ui-kit/globals.css.txt` to `src/app/globals.css`, `tailwind.config.ts.txt` to `tailwind.config.ts` (drop the "legacy palettes" block if unneeded).
3. Copy `layout.tsx.txt` and set the new site title/description and `themeColor`.
4. Copy `Navbar`, `BottomNav`, `Footer`, `PageHeader` into `src/components/layout/`. Edit the link arrays and the primary action.
5. Rename the product: logo icon, wordmark, labels. Change the hero specimen SVG to the new subject.
6. Build each page from the recipes in section 6. Do not add new visual styles.
7. Keep the accent and ink tokens. If a brand colour is required, change only `--accent` and `--forest`, then re-check text contrast on accent (it must stay dark text).
8. Run the checks in section 13.

---

## 12. Prompt to give the next model

> Build the UI for **[product]** using the AgroSight "Field Paper" design system in `docs/DESIGN-SYSTEM.md`. Copy the tokens, `globals.css`, `tailwind.config.ts` and layout components from `docs/ui-kit/`. Follow the component recipes exactly. Rules: square corners only, `border-2 border-ink`, hard offset shadows, one lime accent used only for the primary action and active states, giant tight display headlines ending in a full stop, mono uppercase `.label` captions, numbered steps, mobile bottom tab bar with the primary action as the centre lime block, plain language, honest sample-data tags. Do not use rounded corners, gradients, glass effects, pill badges or soft shadows. Target audience: **[who, device, environment]**. Pages needed: **[list]**. Primary action: **[verb]**. After building, take mobile (390px) and desktop (1280px) screenshots and fix anything that violates the rules in section 1.

---

## 13. Verification checklist

- [ ] `npx tsc --noEmit` clean.
- [ ] No `rounded-` classes except `rounded-full` on dots; no `bg-gradient`, no `backdrop-blur` (except the nav if needed), no `shadow-lg/xl`.
- [ ] Every page has a `PageHeader` (or the hero) and `border-b-2 border-ink` section dividers.
- [ ] Mobile 390px: no horizontal scroll, bottom nav does not cover content, primary action reachable.
- [ ] Dark mode toggle: text on lime stays dark; panels still bordered.
- [ ] Every icon-only button has `aria-label`.
- [ ] Sample or placeholder numbers are tagged `SampleDataNote`.
- [ ] Reduced-motion respected.

---

## 14. Gotchas learned the hard way

- **Never run `next build` while `next dev` is running.** Both write `.next`; the dev server then serves a page with no CSS. Fix: stop dev, delete `.next`, restart.
- After editing `tailwind.config.ts`, **restart the dev server**; it may not pick up new colour classes otherwise.
- On Windows, scripts that write files with Python should pass `encoding='utf-8'`; the default code page corrupts characters like `·` and `—` into `Â·`.
- `next/image` with user photos (data/blob URLs) is fiddly; use a plain `<img>` with an eslint-disable comment.
- Camera and `navigator.share` need https (or localhost).
- Text colour on `bg-accent|warn|ok` must be hard-coded dark (`text-[#0b1a12]`), not `text-ink`.
- Do not seed fake history/records for new users; start empty.
- Do not ship placeholder statistics without a visible "Sample" tag.

---

## 15. Related docs

- Next project steps (model, deployment, farmer-readiness): `docs/AgroSight-Next-Steps.pdf`
- Verbatim source copies: `docs/ui-kit/`
