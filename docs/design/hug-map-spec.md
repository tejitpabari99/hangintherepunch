# UX Design Spec — "Send Punch a Hug" (Global Hug Map)

**Date:** March 8, 2026  
**Author:** UX Agent  
**Status:** Ready for dev  
**Route:** `/hug` (hidden until poobz approves)

---

## Design Philosophy

This is a love letter from strangers. The map should feel like a constellation of warmth — gold stars on a dark sky, each one a person who cared enough to tap a button. It should be emotional, not technical. A hug map, not a heat map.

---

## Layout — ASCII Wireframe

### Mobile (< 640px)

```
┌─────────────────────────────┐
│                             │
│  🤗 12,847 hugs             │
│  from 94 countries          │
│                             │
├─────────────────────────────┤
│                             │
│                             │
│     [ WORLD MAP ]           │
│     dark bg, gold dots      │
│     60vh height             │
│     pinch-zoom enabled      │
│                             │
│                             │
├─────────────────────────────┤
│                             │
│  ┌─────────────────────┐    │
│  │  Send Punch a Hug 🤗│    │
│  └─────────────────────┘    │
│                             │
├─────────────────────────────┤
│                             │
│  💬 Latest notes ticker     │
│  "Hang in there! — Tokyo"  │
│  auto-scrolling, 1 at time │
│                             │
└─────────────────────────────┘
```

### Desktop (≥ 1024px)

```
┌───────────────────────────────────────────────────────────┐
│                                                           │
│           🤗 12,847 hugs from 94 countries                │
│                                                           │
├───────────────────────────────────────────────────────────┤
│                                                           │
│                                                           │
│                                                           │
│              [ WORLD MAP — FULL WIDTH ]                   │
│              70vh height                                  │
│              dark warm bg, clustered gold dots             │
│              pan + scroll-zoom                            │
│                                                           │
│                                                           │
│          ┌──────────────────────┐                         │
│          │  Send Punch a Hug 🤗 │   ← centered overlay    │
│          └──────────────────────┘                         │
│                                                           │
├──────────────────────┬────────────────────────────────────┤
│  💬 Latest notes     │  "Hang in there! 🐒" — Tokyo, JP  │
│  ticker (horizontal) │  "You're so brave" — London, GB   │
└──────────────────────┴────────────────────────────────────┘
```

---

## Component Breakdown

### 1. `<HugMapPage />`

Top-level page component. Renders all children. Full-bleed (no `.container` max-width on the map section).

**Structure:**
```
<HugMapPage>
  <HugCounter />
  <HugMap />
  <HugButton />
  <NotesTicker />
  <HugShareOverlay />    ← conditional, after hug sent
  <NoteInputSheet />     ← conditional, after hug sent
</HugMapPage>
```

### 2. `<HugCounter />`

**Purpose:** Big emotional number. "X hugs from Y countries"

**Layout:**
- Centered text block above the map
- `padding-block: var(--space-12)` (48px top/bottom)
- Background: same dark as map section (`#2A2420`) for seamless transition

**Typography:**
- Number: Fraunces 900, `clamp(2.5rem, 6vw, 4rem)`, Punch Gold `#D4A052`
- "hugs from": Outfit 300, `--text-lg`, `rgba(255, 255, 255, 0.7)` (light on dark)
- Country count: Fraunces 700, `--text-2xl`, Punch Gold
- "countries": Outfit 300, `--text-lg`, `rgba(255, 255, 255, 0.7)`

**Animation:**
- Count-up from 0 to current value over 2s on scroll-into-view
- Use `requestAnimationFrame` with easing, not `setInterval`
- Easing: ease-out (fast start, slow finish — dramatic)
- Updates via polling (30s) — when new value arrives, animate delta only
- Respect `prefers-reduced-motion`: show final number immediately

**Responsive:**
- Mobile: stack vertically — "12,847" on one line, "hugs from 94 countries" on next
- Desktop: single line — "🤗 12,847 hugs from 94 countries"
- Compact mobile variant: "12.8K hugs • 94 countries"

### 3. `<HugMap />`

**Purpose:** Interactive world map with glowing hug dots

**Dimensions:**
- Mobile: `width: 100vw`, `height: 60vh`, `min-height: 400px`
- Tablet: `height: 65vh`
- Desktop: `height: 70vh`, `max-height: 700px`

**Map Style:**
- Dark warm base — NOT pure black, NOT cool gray
- Base color: `#2A2420` (warm charcoal, close to Deep Bark but darker)
- Land masses: `#352D26` (slightly lighter than bg)
- Borders: `#4A3F36` at `0.5px` (barely visible, just enough for shape)
- Water: `#231E1A` (darker than land)
- Labels: OFF — no city/country names on the map (too noisy)
- Use MapLibre GL JS with custom style JSON

**Hug Dots:**
- Color: `#D4A052` (Punch Gold)
- Base dot: `6px` circle
- Glow: `box-shadow: 0 0 8px 2px rgba(212, 160, 82, 0.5)`
- Cluster dots: size scales with count — `6px` (1–10) → `12px` (11–100) → `20px` (101–1K) → `32px` (1K+)
- Cluster label: white text, Outfit 500, `--text-xs`, centered in dot

**Recency glow (< 24h):**
```css
.hug-dot--recent {
  box-shadow: 0 0 12px 4px rgba(212, 160, 82, 0.7);
  animation: hugPulse 3s ease-in-out infinite;
}
@keyframes hugPulse {
  0%, 100% { box-shadow: 0 0 12px 4px rgba(212, 160, 82, 0.7); }
  50% { box-shadow: 0 0 20px 8px rgba(212, 160, 82, 0.3); }
}
```

**Interactions:**
- Desktop: scroll-zoom, click-drag pan, hover on cluster → tooltip
- Mobile: pinch-zoom, drag pan, tap on cluster → tooltip
- Tooltip: `"42 hugs from Tokyo 🇯🇵"` — dark bg pill, Outfit 400, `--text-sm`
- Initial view: auto-fit bounds to show all dots (MapLibre `fitBounds`)

**Performance:**
- Use MapLibre's built-in GeoJSON clustering
- Initial load: cluster data only (from `/api/hugs/clusters`)
- Individual dots load on zoom level ≥ 8
- Lazy-load MapLibre (~200KB) — show skeleton placeholder until ready

**Skeleton state:**
- Dark rectangle with a subtle shimmer animation
- Outline of continents drawn in `#352D26` (CSS background SVG, ~5KB)

### 4. `<HugButton />`

**Purpose:** The big "send a hug" CTA

**Design:**
- Pill shape: `border-radius: 9999px`
- Background: Punch Gold `#D4A052`
- Text: `"Send Punch a Hug 🤗"`, white, Outfit 500, `--text-lg` (20px)
- Padding: `16px 40px`
- Min touch target: `52px` height (exceeds 44px minimum)
- Shadow: `0 4px 16px rgba(212, 160, 82, 0.3)`

**Placement:**
- Mobile: below the map, centered, full-width minus gutters (`margin-inline: var(--space-6)`)
- Desktop: overlaid on the map, centered horizontally, `bottom: var(--space-12)` from map bottom

**States:**
- Default: gold bg, white text
- Hover: `background: #C49042`, `transform: scale(1.03)`, shadow intensifies
- Active/pressed: `transform: scale(0.97)`, shadow reduces
- Disabled (already hugged): `opacity: 0.6`, text changes to `"Hugged! 🤗 Come back tomorrow"`, `cursor: not-allowed`
- Loading: text replaced with `"Sending... 🤗"` + subtle pulse animation on button bg

**Transition on tap:**
```css
.hug-btn {
  transition: transform var(--duration-fast) var(--ease-default),
              background var(--duration-fast) var(--ease-default),
              box-shadow var(--duration-normal) var(--ease-default);
}
```

### 5. `<NoteInputSheet />`

**Purpose:** Optional note input after hug is sent

**Trigger:** Appears 500ms after hug dot animation completes

**Mobile — Bottom Sheet:**
```
┌─────────────────────────────┐
│   ─── (drag handle, 40x4)   │
│                             │
│  Add a note for Punch?      │
│  (optional)                 │
│                             │
│  ┌───────────────────────┐  │
│  │ Hang in there...      │  │
│  └───────────────────────┘  │
│         120 / 140           │
│                             │
│  ┌─────────┐  ┌──────────┐ │
│  │  Skip   │  │ Send 💌  │ │
│  └─────────┘  └──────────┘ │
│                             │
└─────────────────────────────┘
```

- Slides up from bottom with `transform: translateY(100%) → translateY(0)`
- Duration: `var(--duration-slow)` (500ms), `var(--ease-enter)`
- Backdrop: `rgba(42, 36, 32, 0.5)` — warm dark overlay
- Sheet bg: `white`, `border-radius: 20px 20px 0 0`
- Padding: `var(--space-8)` top, `var(--space-6)` sides, `var(--space-6)` bottom (+ safe area inset)

**Desktop — Modal Card:**
- Centered card, `max-width: 440px`
- Same content, `border-radius: 20px` all corners
- Appears with `opacity: 0 → 1` + `scale(0.95) → scale(1)`

**Input field:**
- `border: 1.5px solid #D4CCC4`
- `border-radius: 12px`
- `padding: 14px 16px`
- `font-size: 16px` (prevents iOS zoom)
- `font-family: var(--font-body)`
- Focus: `border-color: var(--punch-gold)`, `box-shadow: 0 0 0 3px rgba(212, 160, 82, 0.2)`
- Placeholder: `"Hang in there little guy..."`, color `var(--soft-earth)`
- Character counter: JetBrains Mono, `--text-xs`, Soft Earth, right-aligned below input

**Buttons:**
- "Skip" — ghost style, `color: var(--soft-earth)`, no border
- "Send 💌" — primary pill, Punch Gold bg

### 6. `<HugShareOverlay />`

**Purpose:** Shareable card shown after hug + note (or skip)

**Trigger:** Appears after note submission or skip

**Share card dimensions (for download/social):**
- Instagram square: `1080 × 1080px`
- Twitter/OG: `1200 × 675px`
- Rendered via `html2canvas` or Satori server-side

**Card design:**
```
┌─────────────────────────────────────┐
│                                     │
│  (warm charcoal bg: #2A2420)        │
│                                     │
│         🐒❤️                        │
│                                     │
│    I'm hug #12,847                  │
│    (Fraunces 900, Punch Gold,       │
│     clamp 2rem–3rem)                │
│                                     │
│    from Tokyo, Japan 🇯🇵            │
│    (Outfit 300, white 70%)          │
│                                     │
│    ── ✦ ──                          │
│                                     │
│    "Hang in there little guy"       │
│    (Outfit 400 italic, white 90%,   │
│     only if note exists)            │
│                                     │
│                                     │
│    hangintherepunch.com             │
│    (Outfit 300, --text-xs,          │
│     white 40%, bottom)              │
│                                     │
└─────────────────────────────────────┘
```

**Visual details:**
- Background: `#2A2420` with a subtle radial gradient (`rgba(212, 160, 82, 0.08)` center glow)
- Gold decorative dots scattered subtly (matching map aesthetic)
- Emoji: 48px
- Divider (`── ✦ ──`): Punch Gold at 40% opacity

**Overlay UI (what the user sees on-screen):**

Mobile:
```
┌─────────────────────────────┐
│   ─── (drag handle)         │
│                             │
│   ┌───────────────────┐     │
│   │                   │     │
│   │   [SHARE CARD     │     │
│   │    PREVIEW]       │     │
│   │                   │     │
│   └───────────────────┘     │
│                             │
│   ┌──────────────────────┐  │
│   │ 📋 Copy Link         │  │
│   ├──────────────────────┤  │
│   │ 🐦 Share on X        │  │
│   ├──────────────────────┤  │
│   │ 📸 Save Image        │  │
│   ├──────────────────────┤  │
│   │ 📱 More...           │  │
│   └──────────────────────┘  │
│                             │
│   ┌──────────────────────┐  │
│   │     Done ✓           │  │
│   └──────────────────────┘  │
│                             │
└─────────────────────────────┘
```

**Share buttons:**
- Stack vertically, full-width, `border-radius: 12px`
- Each: `padding: 14px 16px`, `bg: var(--color-bg-deep)`, left icon + label
- Hover: `bg: var(--color-accent-light)`
- "Copy Link" → copies `hangintherepunch.com/hug?id=12847` to clipboard, button text changes to "Copied! ✓" for 2s
- "Share on X" → opens `https://twitter.com/intent/tweet?text=I'm hug %2312847 for Punch 🐒❤️&url=hangintherepunch.com/hug?id=12847`
- "Save Image" → downloads PNG (1080×1080)
- "More..." → native `navigator.share()` API (mobile only, hide on desktop if unsupported)

### 7. `<NotesTicker />`

**Purpose:** Scrolling feed of recent hug notes

**Design:**
- Full-width bar below the map
- Background: `#2A2420` (continuous with map bg), `border-top: 1px solid rgba(212, 160, 82, 0.15)`
- Height: `56px`
- Padding: `var(--space-4)` inline

**Content:**
- Single note visible at a time (fade transition between notes)
- Format: `"Hang in there! 🐒" — Tokyo, JP`
- Font: Outfit 400, `--text-sm`, `rgba(255, 255, 255, 0.7)`
- City/country: Outfit 300, `--text-xs`, `rgba(255, 255, 255, 0.4)`
- Transition: `opacity 0 → 1` + `translateY(8px) → 0`, 500ms ease-enter
- Auto-rotate every 4 seconds
- Pause on hover (desktop) or tap (mobile)

**Data:** Fetched from `/api/hugs/recent?limit=10`, refreshed every 60s

---

## Hug Submission Animation Sequence

This is the emotional payoff. Timing matters.

```
T+0ms     User taps "Send Punch a Hug 🤗"
          → Button enters loading state ("Sending... 🤗" + pulse)
          → Browser requests geolocation (or uses IP fallback)

T+300ms   API response received (optimistic: show before confirmed)
          → New dot appears at user's location with BURST animation:
            1. Dot scales from 0 → 1.2 → 1.0 (cubic-bezier bounce)
            2. Ring expands outward: 0px → 40px, opacity 1 → 0
            3. 3-4 tiny gold particles drift outward and fade (CSS only)
          → Counter ticks up by 1 (animated)
          → Button changes to "Hugged! 🤗"
          → Map smoothly pans/zooms to center on user's location

T+800ms   Dot settles into normal glow state
          → Burst animation complete

T+1300ms  Note input sheet slides up (500ms after dot settles)

T+varies  User types note + taps "Send 💌" (or "Skip")

T+done    Share overlay appears
```

**Burst animation CSS:**
```css
@keyframes hugBurst {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.3); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes hugRing {
  0% { transform: scale(0.5); opacity: 0.8; border-width: 3px; }
  100% { transform: scale(3); opacity: 0; border-width: 1px; }
}

@keyframes hugParticle {
  0% { transform: translate(0, 0) scale(1); opacity: 1; }
  100% { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; }
}

.hug-dot--new {
  animation: hugBurst 600ms var(--ease-enter) forwards;
}

.hug-ring {
  position: absolute;
  border-radius: 50%;
  border: 3px solid rgba(212, 160, 82, 0.6);
  animation: hugRing 800ms var(--ease-exit) forwards;
}

.hug-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--punch-gold);
  animation: hugParticle 700ms var(--ease-exit) forwards;
}
```

**Particles:** Generate 4 particles with CSS custom properties for direction:
- `--dx: 20px, --dy: -25px`
- `--dx: -18px, --dy: -20px`
- `--dx: 25px, --dy: 15px`
- `--dx: -22px, --dy: 18px`

---

## Color & Typography Summary

| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| Counter number | Fraunces | `clamp(2.5rem, 6vw, 4rem)` | 900 | `#D4A052` |
| Counter label | Outfit | `--text-lg` | 300 | `rgba(255,255,255,0.7)` |
| Hug button | Outfit | `--text-lg` | 500 | `#FFFFFF` on `#D4A052` bg |
| Note input | Outfit | `16px` | 400 | `var(--deep-bark)` |
| Note placeholder | Outfit | `16px` | 400 | `var(--soft-earth)` |
| Char counter | JetBrains Mono | `--text-xs` | 400 | `var(--soft-earth)` |
| Ticker note | Outfit | `--text-sm` | 400 | `rgba(255,255,255,0.7)` |
| Ticker location | Outfit | `--text-xs` | 300 | `rgba(255,255,255,0.4)` |
| Share card title | Fraunces | `clamp(2rem, 5vw, 3rem)` | 900 | `#D4A052` |
| Share card location | Outfit | `--text-lg` | 300 | `rgba(255,255,255,0.7)` |
| Share card note | Outfit | `--text-base` | 400i | `rgba(255,255,255,0.9)` |
| Share card branding | Outfit | `--text-xs` | 300 | `rgba(255,255,255,0.4)` |
| Tooltip | Outfit | `--text-sm` | 400 | `#FFFFFF` on `rgba(42,36,32,0.9)` bg |

---

## Responsive Behavior

### Mobile (< 640px)
- Counter: stacked, compact format ("12.8K hugs • 94 countries")
- Map: `60vh`, full bleed
- Hug button: below map, full-width (minus 24px gutters)
- Note input: bottom sheet
- Share overlay: bottom sheet
- Ticker: single line, smaller text
- Tooltips: appear on tap, dismiss on tap elsewhere

### Tablet (640–1023px)
- Counter: single line
- Map: `65vh`
- Hug button: centered below map, `max-width: 320px`
- Note input: centered card (not bottom sheet)
- Share overlay: centered card

### Desktop (≥ 1024px)
- Counter: single line, larger type
- Map: `70vh`, `max-height: 700px`
- Hug button: overlaid on map, centered, `bottom: var(--space-12)`
- Note input: centered modal card, `max-width: 440px`
- Share overlay: centered modal, `max-width: 480px`
- Ticker: horizontal layout, show 2 notes side by side
- Tooltips: appear on hover

---

## Accessibility

- Map: include `role="img"` with `aria-label="World map showing X hugs from Y countries"`
- Hug button: `aria-label="Send Punch a hug"`, keyboard-accessible (Enter/Space)
- Counter: `aria-live="polite"` for real-time updates
- Note input: proper `<label>` association, `aria-describedby` for character limit
- Share overlay: focus trap when open, Escape to dismiss
- Bottom sheets: focus trap, swipe-down to dismiss
- All animations respect `prefers-reduced-motion: reduce`
- Tooltips: accessible via keyboard focus on dot clusters
- Skip link to bypass map for screen reader users

---

## Geolocation UX

**Before requesting permission:**
Show a brief inline message (not a separate modal — keep it lightweight):

```
┌──────────────────────────────────────┐
│ 📍 We'll place your hug on the map  │
│ using your approximate location.    │
│ We never store exact coordinates.   │
│                                     │
│  [Allow Location]  [Use Approximate]│
└──────────────────────────────────────┘
```

- "Allow Location" → triggers `navigator.geolocation` browser prompt
- "Use Approximate" → uses IP-based geolocation immediately (no browser prompt)
- This appears as a small card overlay on the map, not a full modal
- Style: `bg: white`, `border-radius: 16px`, `box-shadow`, centered on map
- After choice, this card dismisses and the hug flow continues

**Fallback chain:**
1. Browser geolocation → round to 2 decimal places
2. IP geolocation → city-level accuracy
3. Both fail → place dot at country centroid, or random offset within country bounds

---

## Rate Limiting UX

When a user has already hugged in the last 24h:

- Hug button shows: `"Hugged! 🤗 Come back tomorrow"` in muted gold
- `opacity: 0.6`, `cursor: not-allowed`
- Below button, small text: `"You sent hug #12,847 from Tokyo — 18h until your next hug"`
- Font: Outfit 300, `--text-sm`, `rgba(255, 255, 255, 0.5)`
- Track via `localStorage` key `lastHugAt` (timestamp) — client-side check prevents unnecessary API calls. Server validates independently.

---

## Performance Notes

- **Code-split** the entire hug map page. Don't bundle MapLibre with the main timeline.
- **Lazy-load MapLibre** — show skeleton (dark bg + continent outlines SVG) until JS loads
- **Cluster data first** — initial API call returns ~50-200 cluster points, not 100K individual dots
- **Canvas rendering** for dots at scale — MapLibre handles this via WebGL
- **Share card rendering** — use `@vercel/og` (Satori) for server-side OG images. Client-side `html2canvas` as download fallback.
- **Polling, not WebSocket** — 30s interval for counter updates. Acceptable staleness for this use case.
