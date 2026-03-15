# UX Design Spec — "The Comfort Object Confessional"

**Date:** March 8, 2026  
**Author:** UX Agent  
**Status:** Ready for dev  
**Route:** `/confess` (hidden until poobz approves)

---

## Design Philosophy

This feature should feel like opening a journal in a warm coffee shop. Anonymous, safe, a little vulnerable. The cards should look like something you'd pin to a corkboard or tuck into a book. Not a social media feed — a confessional wall. Hand-written quality without the gimmick of an actual handwriting font.

---

## Layout — ASCII Wireframe

### Mobile (< 640px)

```
┌─────────────────────────────┐
│                             │
│  Punch has his Djungelskog. │
│  What's yours?              │
│  (Fraunces 700, --text-2xl) │
│                             │
├─────────────────────────────┤
│                             │
│  ┌───────────────────────┐  │
│  │ My old teddy bear...  │  │
│  └───────────────────────┘  │
│  🧸 ▾  emoji     180/280   │
│                             │
│  ┌───────────────────────┐  │
│  │     Confess 🤫        │  │
│  └───────────────────────┘  │
│                             │
├─────────────────────────────┤
│  Trending | Newest | Most ❤️│
├─────────────────────────────┤
│                             │
│  ┌───────────────────────┐  │
│  │        🧸             │  │
│  │  "A stuffed elephant  │  │
│  │   named Gerald..."    │  │
│  │                       │  │
│  │  me too ❤️ 47         │  │
│  │          2 hours ago  │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │        🎵             │  │
│  │  "The same Radiohead  │  │
│  │   album..."           │  │
│  │                       │  │
│  │  me too ❤️ 123        │  │
│  │           1 day ago   │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │        ☕             │  │
│  │  "My morning coffee   │  │
│  │   routine..."         │  │
│  │                       │  │
│  │  me too ❤️ 89         │  │
│  │          3 hours ago  │  │
│  └───────────────────────┘  │
│                             │
│  (infinite scroll →)        │
│                             │
└─────────────────────────────┘
```

### Desktop (≥ 1024px)

```
┌───────────────────────────────────────────────────────────┐
│                                                           │
│              Punch has his Djungelskog.                    │
│              What's yours?                                │
│              (Fraunces 700, --text-3xl, centered)          │
│                                                           │
│         ┌──────────────────────────────────┐              │
│         │ My old teddy bear that's...      │              │
│         └──────────────────────────────────┘              │
│         🧸 ▾            180/280   [Confess 🤫]            │
│                                                           │
├───────────────────────────────────────────────────────────┤
│   Trending | Newest | Most ❤️                              │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐               │
│  │    🧸    │  │    🎵    │  │    ☕    │               │
│  │ "A       │  │ "The same│  │ "My      │               │
│  │ stuffed  │  │ Radiohead│  │ morning  │               │
│  │ elephant │  │ album.   │  │ coffee   │               │
│  │ named    │  │ Every    │  │ routine."│               │
│  │ Gerald." │  │ time."   │  │          │               │
│  │          │  │          │  │ ❤️ 89    │               │
│  │ ❤️ 47    │  │ ❤️ 123   │  │ 3h ago  │               │
│  │ 2h ago   │  │ 1d ago   │  │          │               │
│  └──────────┘  └──────────┘  └──────────┘               │
│                                                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐               │
│  │    🐕    │  │    🛏️    │  │    🎮    │               │
│  │ "My dog. │  │ "My      │  │ "Mine-   │               │
│  │  She     │  │ childhood│  │ craft.   │               │
│  │ doesn't  │  │ blanket. │  │ Building │               │
│  │ judge."  │  │ I'm 34." │  │ calms me"│               │
│  │          │  │          │  │          │               │
│  │ ❤️ 201   │  │ ❤️ 156   │  │ ❤️ 78    │               │
│  │ 5h ago   │  │ 12h ago  │  │ 2d ago   │               │
│  └──────────┘  └──────────┘  └──────────┘               │
│                                                           │
│  (infinite scroll →)                                      │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

---

## Component Breakdown

### 1. `<ConfessionalPage />`

Top-level page component.

**Structure:**
```
<ConfessionalPage>
  <ConfessionalHeader />
  <ConfessionForm />
  <SortToggle />
  <ConfessionWall />
  <ConfessionShareOverlay />   ← conditional
</ConfessionalPage>
```

**Background:** Warm Cream `#FAF5EE` — consistent with main site. Full page.

**Container:**
```css
.confessional-page {
  width: 100%;
  max-width: 960px;      /* wider than main site for 3-col masonry */
  margin-inline: auto;
  padding-inline: var(--space-6);
  padding-block: var(--space-16) var(--space-24);
}
```

### 2. `<ConfessionalHeader />`

**Purpose:** The emotional prompt

**Text:**
- Line 1: `"Punch has his Djungelskog."` — Fraunces 700, Deep Bark
- Line 2: `"What's yours?"` — Fraunces 700, Punch Gold
- Both on separate lines (not inline)

**Typography:**
- Mobile: `--text-2xl` (32px)
- Tablet: `--text-3xl` (40px)
- Desktop: `--text-3xl` (40px)
- `text-align: center`
- `letter-spacing: -0.02em`
- `margin-bottom: var(--space-8)` (32px)

**Optional decorative element:**
- A tiny 🐒 emoji between the two lines, `opacity: 0.4`, `font-size: --text-sm`
- Or a thin gold line divider: `width: 40px`, `height: 2px`, `bg: var(--punch-gold)`, centered, `opacity: 0.4`

### 3. `<ConfessionForm />`

**Purpose:** Anonymous submission

**Layout:**
- Centered, `max-width: 560px`, `margin-inline: auto`
- `margin-bottom: var(--space-12)` (48px) — breathing room before the wall

**Input field — textarea:**
```css
.confession-input {
  width: 100%;
  min-height: 80px;
  max-height: 160px;
  resize: vertical;
  padding: var(--space-4) var(--space-4);  /* 16px */
  border: 1.5px solid #D4CCC4;
  border-radius: 16px;
  font-family: var(--font-body);
  font-size: 16px;                /* prevents iOS zoom */
  font-weight: 400;
  line-height: 1.5;
  color: var(--deep-bark);
  background: white;
  transition: border-color var(--duration-fast) var(--ease-default),
              box-shadow var(--duration-fast) var(--ease-default);
}

.confession-input:focus {
  outline: none;
  border-color: var(--punch-gold);
  box-shadow: 0 0 0 3px rgba(212, 160, 82, 0.2);
}

.confession-input::placeholder {
  color: var(--soft-earth);
  font-weight: 300;
}
```

- Placeholder: `"My old teddy bear that's missing an eye..."` (rotates randomly from a set of warm examples)
- Placeholder rotation set:
  - `"My old teddy bear that's missing an eye..."`
  - `"A song that always makes me feel safe..."`
  - `"The ratty blanket I refuse to throw away..."`
  - `"That one hoodie that still smells like home..."`

**Controls row (below textarea):**
```
┌──────────────────────────────────────┐
│ 🧸 ▾                  180/280       │
│ (emoji picker)     (char counter)    │
│                                      │
│           ┌──────────────────┐       │
│           │   Confess 🤫     │       │
│           └──────────────────┘       │
└──────────────────────────────────────┘
```

**Emoji picker:**
- Trigger: tap the current emoji (default 🧸) + small `▾` indicator
- Opens a small inline popup, NOT a full system emoji keyboard
- 20 curated emojis in a 5×4 grid:
  `🧸 🛏️ 🎵 🐕 🎮 📖 ☕ 🧣 🌙 💊`
  `🎧 🍫 🐈 🧶 🏠 🌊 🎨 🪴 🍵 🫂`
- Each emoji: `40px × 40px` touch target, `border-radius: 8px`, hover: `bg: var(--color-bg-deep)`
- Popup: `bg: white`, `border-radius: 16px`, `box-shadow: 0 8px 24px rgba(61,43,31,0.15)`, `padding: var(--space-3)`
- "Other..." link at bottom → opens system emoji picker (`<input>` trick)

**Character counter:**
- JetBrains Mono, `--text-xs`, right-aligned
- Color: `var(--soft-earth)` when under limit
- Color: `var(--color-rose)` (#C85A54) when within 20 chars of limit
- Format: `180/280`

**Submit button:**
- `"Confess 🤫"` — primary pill style
- `background: var(--punch-gold)`, `color: white`
- `border-radius: 9999px`, `padding: 14px 32px`
- `font-family: var(--font-body)`, `font-weight: 500`, `font-size: --text-base`
- Full width on mobile, `max-width: 200px` centered on desktop
- `margin-top: var(--space-4)`

**States:**
- Empty textarea: button disabled, `opacity: 0.5`
- Valid text: button enabled
- Submitting: text → `"Confessing..."` + subtle pulse
- Success: form clears, brief confirmation toast (see below)
- Error (rate limited): toast message `"One confession per hour — take your time 🐒"`

**Success confirmation:**
- Toast slides down from top of form area
- `"Your confession has been added 🐒"` (or `"being reviewed"` if queued)
- bg: `rgba(212, 160, 82, 0.1)`, `border-left: 3px solid var(--punch-gold)`
- `border-radius: 12px`, `padding: var(--space-3) var(--space-4)`
- Outfit 400, `--text-sm`, Deep Bark
- Auto-dismisses after 4s, or tap to dismiss
- If auto-approved, user's card animates into the wall (highlighted for 3s with subtle gold border glow)

### 4. `<SortToggle />`

**Purpose:** Sort controls for the confession wall

**Design:**
- Horizontal pill group, centered
- `margin-bottom: var(--space-8)`
- Three options: `Trending` | `Newest` | `Most ❤️`

```css
.sort-toggle {
  display: inline-flex;
  background: rgba(61, 43, 31, 0.05);
  border-radius: 9999px;
  padding: 4px;
  gap: 0;
}

.sort-toggle__option {
  padding: 8px 20px;
  border-radius: 9999px;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 400;
  color: var(--soft-earth);
  background: transparent;
  transition: all var(--duration-fast) var(--ease-default);
  cursor: pointer;
  border: none;
}

.sort-toggle__option--active {
  background: white;
  color: var(--deep-bark);
  font-weight: 500;
  box-shadow: 0 1px 3px rgba(61, 43, 31, 0.1);
}
```

### 5. `<ConfessionWall />`

**Purpose:** Masonry grid of confession cards

**Layout — CSS Columns (no JS library):**
```css
.confession-wall {
  columns: 1;
  column-gap: var(--space-4);     /* 16px */
}

@media (min-width: 640px) {
  .confession-wall {
    columns: 2;
    column-gap: var(--space-4);
  }
}

@media (min-width: 1024px) {
  .confession-wall {
    columns: 3;
    column-gap: var(--space-6);   /* 24px on desktop */
  }
}
```

**Infinite scroll:**
- Sentinel `<div>` at bottom of wall, observed via Intersection Observer
- Threshold: `200px` before sentinel is visible → prefetch next page
- Loading indicator: 3 skeleton cards (pulsing) appended to wall
- Fetch 20 cards per page, cursor-based pagination

**Scroll reveal animation (new cards loading in):**
```css
.confession-card--entering {
  opacity: 0;
  transform: translateY(16px);
}

.confession-card--visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity var(--duration-scroll) var(--ease-enter),
              transform var(--duration-scroll) var(--ease-enter);
}
```

Stagger: each card in a batch delays by `80ms` × index.

### 6. `<ConfessionCard />`

**Purpose:** Individual confession display — this is the heart of the feature

**Design goals:** Warm, journal-like, hand-written quality WITHOUT a handwriting font. Achieve this through:
- Generous whitespace inside cards
- Soft shadows
- Slightly randomized visual treatment (see "Organic variety" below)
- Warm color palette

**Card structure:**
```
┌─────────────────────────┐
│                         │
│          🧸             │  ← emoji, centered
│                         │
│  "A stuffed elephant    │  ← confession text
│   named Gerald. He's    │
│   been through 3 moves  │
│   and a divorce."       │
│                         │
│  ─────────────────────  │  ← subtle divider
│                         │
│  me too ❤️ 47    2h ago │  ← actions row
│                         │
│  ── hangintherepunch ── │  ← watermark (screenshot only)
│                         │
└─────────────────────────┘
```

**Card CSS:**
```css
.confession-card {
  break-inside: avoid;
  margin-bottom: var(--space-4);         /* 16px gap between cards */
  padding: var(--space-6) var(--space-6); /* 24px all around */
  background: white;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(61, 43, 31, 0.08);
  transition: box-shadow var(--duration-normal) var(--ease-default),
              transform var(--duration-normal) var(--ease-default);
  position: relative;
  overflow: hidden;
}

/* Desktop hover — warm lift */
@media (hover: hover) {
  .confession-card:hover {
    box-shadow: 0 8px 24px rgba(61, 43, 31, 0.12);
    transform: translateY(-2px);
  }
}

/* Mobile spacing */
@media (max-width: 639px) {
  .confession-card {
    margin-bottom: var(--space-3);       /* 12px — tighter on mobile */
    padding: var(--space-4) var(--space-4); /* 16px */
  }
}
```

**Emoji:**
- Centered, `font-size: 2rem` (32px)
- `margin-bottom: var(--space-3)` (12px)

**Confession text:**
- Font: Outfit 400, `--text-base` (16px), `line-height: 1.6`
- Color: `var(--deep-bark)`
- `margin-bottom: var(--space-4)` (16px)
- No quotes wrapping the text — let it breathe. (The quotes in wireframes are just for illustration.)

**Divider:**
- `height: 1px`, `background: rgba(61, 43, 31, 0.06)`, `margin-bottom: var(--space-3)`

**Actions row:**
- Flexbox, `justify-content: space-between`, `align-items: center`

**"Me too ❤️" button:**
```css
.metoo-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);              /* 8px */
  padding: 6px 14px;
  border-radius: 9999px;
  background: transparent;
  border: 1.5px solid rgba(61, 43, 31, 0.1);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 400;
  color: var(--soft-earth);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-default);
  min-height: 36px;
  min-width: 44px;                  /* touch target */
}

.metoo-btn:hover {
  border-color: var(--blush-pink);
  color: var(--blush-pink);
  background: rgba(232, 196, 184, 0.1);
}

.metoo-btn--active {
  border-color: var(--blush-pink);
  color: var(--blush-pink);
  background: rgba(232, 196, 184, 0.15);
  font-weight: 500;
}
```

**Heart animation (on tap):**
```css
@keyframes heartBounce {
  0% { transform: scale(1); }
  30% { transform: scale(1.3); }
  60% { transform: scale(0.9); }
  100% { transform: scale(1); }
}

.metoo-btn--just-tapped .metoo-heart {
  animation: heartBounce 400ms var(--ease-default);
  color: var(--blush-pink);
}
```

- Heart: empty outline → filled on active
- Empty: `♡` or SVG outline heart
- Filled: `❤️` or SVG filled heart in `var(--blush-pink)`
- Count animates: number briefly scales up then back `(scale(1.1) → scale(1))` over 200ms

**Timestamp:**
- JetBrains Mono, `--text-xs`, `var(--soft-earth)`
- Relative: "2h ago", "3d ago", "1w ago"

**Watermark (subtle, for screenshots):**
- Only visible when card is shared / screenshotted
- Implementation: very low opacity text at bottom of card
```css
.confession-card::after {
  content: 'hangintherepunch.com';
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-body);
  font-size: 9px;
  font-weight: 300;
  color: rgba(61, 43, 31, 0.08);   /* nearly invisible on screen */
  letter-spacing: 0.05em;
  pointer-events: none;
}
```
- In share card renders: increase opacity to `0.3` so it's visible in exported images

**Organic variety (the "journal-like" feel):**
To avoid a sterile grid, apply subtle randomized variations per card:

```css
/* Rotate cards very slightly for a pinned-to-board feel */
.confession-card:nth-child(3n)   { transform: rotate(0.3deg); }
.confession-card:nth-child(3n+1) { transform: rotate(-0.2deg); }
.confession-card:nth-child(3n+2) { transform: rotate(0.15deg); }

/* Vary background very subtly */
.confession-card:nth-child(4n)   { background: #FFFEF9; }  /* barely warmer */
.confession-card:nth-child(4n+1) { background: #FFFFFF; }
.confession-card:nth-child(4n+2) { background: #FEFCF7; }  /* slightly cream */
.confession-card:nth-child(4n+3) { background: #FFFEFC; }
```

- On hover, reset rotation to `0deg` (straightens out — satisfying micro-interaction)
- Respect `prefers-reduced-motion`: no rotation

**Share icon on cards:**
- Small share icon, top-right of card
- Mobile: always visible, `8px` from top-right, `opacity: 0.3`
- Desktop: appears on hover, `opacity: 0 → 0.6`
- Icon: simple arrow-out-of-box SVG, `16px`, `var(--soft-earth)`
- Tap → generates share card (see `<ConfessionShareOverlay />`)

### 7. `<ConfessionShareOverlay />`

**Purpose:** Share a specific confession as an image

**Share card design (for download/social):**

Dimensions:
- Instagram square: `1080 × 1080px`
- Twitter/OG: `1200 × 675px`

```
┌─────────────────────────────────────┐
│                                     │
│  (Warm Cream bg: #FAF5EE)          │
│                                     │
│                                     │
│            🧸                       │
│                                     │
│  A stuffed elephant named Gerald.   │
│  He's been through 3 moves and      │
│  a divorce.                         │
│                                     │
│  (Outfit 400, --text-lg to 2xl,     │
│   Deep Bark, centered)              │
│                                     │
│            ♡ 47                     │
│   (Blush Pink, Outfit 300)          │
│                                     │
│  ── ✦ ──                            │
│                                     │
│  Punch has his Djungelskog.         │
│  What's yours?                      │
│  (Fraunces 400, --text-sm,          │
│   Soft Earth, italic)               │
│                                     │
│  hangintherepunch.com/confess       │
│  (Outfit 300, --text-xs,            │
│   Soft Earth 50%)                   │
│                                     │
└─────────────────────────────────────┘
```

**Visual details:**
- Background: Warm Cream `#FAF5EE`
- Subtle decorative border: `8px` inset from edges, `1px solid rgba(212, 160, 82, 0.15)`, `border-radius: 12px`
- Gives it a "framed print" quality
- Punch Gold accent on the `✦` divider

**Overlay UI:** Same bottom-sheet (mobile) / modal (desktop) pattern as the hug map share overlay. Include:
- Card preview
- "📋 Copy Link" / "🐦 Share on X" / "📸 Save Image" / "📱 More..." buttons

---

## Submission Flow (Detailed)

```
Step 1: User types confession in textarea
        → Character counter updates live
        → Submit button enables when text.length > 0

Step 2: User optionally picks emoji from inline picker
        → Default: 🧸
        → Picker opens inline below emoji trigger

Step 3: User taps "Confess 🤫"
        → Button enters loading state
        → POST /api/confess { text, emoji }

Step 4a (auto-approved):
        → Toast: "Your confession has been added 🐒"
        → Form clears
        → User's card appears at TOP of the wall with highlight:
          - Gold border glow: box-shadow: 0 0 0 2px rgba(212, 160, 82, 0.3)
          - Fades to normal after 3s
          - Scroll-to behavior: if wall is below viewport, smooth scroll to show new card

Step 4b (queued for moderation):
        → Toast: "Your confession is being reviewed 🐒"
        → Form clears
        → No card appears yet (user doesn't know which are moderated vs not)

Step 4c (rejected):
        → Toast: "Hmm, let's try different words 🐒" (vague, no details on what triggered it)
        → Form retains text so user can edit
        → No indication of specific filter trigger (prevents gaming)

Step 4d (rate limited):
        → Toast: "One confession per hour — take your time 🐒"
        → Form retains text
        → Button stays disabled with countdown? (optional, might be over-engineered)
```

---

## Color & Typography Summary

| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| Header line 1 | Fraunces | `--text-2xl` → `--text-3xl` | 700 | `var(--deep-bark)` |
| Header line 2 | Fraunces | `--text-2xl` → `--text-3xl` | 700 | `var(--punch-gold)` |
| Textarea | Outfit | `16px` | 400 | `var(--deep-bark)` |
| Placeholder | Outfit | `16px` | 300 | `var(--soft-earth)` |
| Char counter | JetBrains Mono | `--text-xs` | 400 | `var(--soft-earth)` / `var(--color-rose)` |
| Submit button | Outfit | `--text-base` | 500 | `white` on `var(--punch-gold)` |
| Sort toggle | Outfit | `--text-sm` | 400/500 | `var(--soft-earth)` / `var(--deep-bark)` |
| Card emoji | System | `2rem` | — | — |
| Card text | Outfit | `--text-base` | 400 | `var(--deep-bark)` |
| Me too button | Outfit | `--text-sm` | 400 | `var(--soft-earth)` / `var(--blush-pink)` |
| Timestamp | JetBrains Mono | `--text-xs` | 400 | `var(--soft-earth)` |
| Watermark | Outfit | `9px` | 300 | `rgba(61,43,31,0.08)` |
| Toast message | Outfit | `--text-sm` | 400 | `var(--deep-bark)` |

---

## Responsive Behavior

### Mobile (< 640px)
- Header: `--text-2xl`, centered
- Form: full width, `padding-inline: var(--space-6)`
- Wall: 1 column, full width
- Cards: `padding: var(--space-4)`, `margin-bottom: var(--space-3)`
- Share icon: always visible at low opacity
- Emoji picker: bottom-sheet style
- Touch targets: all buttons ≥ 44px

### Tablet (640–1023px)
- Header: `--text-3xl`
- Form: `max-width: 560px`, centered
- Wall: 2 columns, `column-gap: var(--space-4)`
- Cards: `padding: var(--space-6)`
- Emoji picker: inline popup

### Desktop (≥ 1024px)
- Header: `--text-3xl`
- Form: `max-width: 560px`, centered
- Wall: 3 columns, `column-gap: var(--space-6)`
- Cards: `padding: var(--space-6)`, hover effects active
- Share icon: visible on hover
- Emoji picker: inline popup

---

## Animations

### Card entrance (scroll reveal)
- `opacity: 0 → 1`, `translateY(16px) → 0`
- Duration: `var(--duration-scroll)` (800ms)
- Easing: `var(--ease-enter)`
- Stagger: `80ms` per card in batch

### "Me too" heart tap
- Heart: `heartBounce` animation (scale 1 → 1.3 → 0.9 → 1, 400ms)
- Count: brief scale(1.1) → scale(1), 200ms
- Border color transition to Blush Pink, 150ms

### New card highlight (user's own submission)
- `box-shadow: 0 0 0 2px rgba(212, 160, 82, 0.3)` → `0 0 0 0 transparent`
- Duration: 3s, linear fade

### Sort toggle
- Active indicator slides between options (transform-based, not reflow)
- 200ms, ease-default

### Emoji picker
- Mobile: slide up from bottom, 300ms
- Desktop: scale(0.95, 0) → scale(1, 1) from trigger point, 200ms
- Both: `opacity: 0 → 1`

### Reduced motion
All animations → instant (per global `prefers-reduced-motion` rule in `globals.css`)

---

## Skeleton / Loading States

**Card skeleton:**
```css
.confession-card--skeleton {
  background: white;
  border-radius: 16px;
  padding: var(--space-6);
}

.skeleton-line {
  height: 14px;
  border-radius: 7px;
  background: linear-gradient(
    90deg,
    rgba(61, 43, 31, 0.06) 25%,
    rgba(61, 43, 31, 0.1) 50%,
    rgba(61, 43, 31, 0.06) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

**Skeleton card layout:**
- Circle (emoji placeholder): `32px`, centered
- 3 lines: `100%`, `80%`, `60%` width, `8px` gap between
- Actions row: 2 small rectangles

**Show 6 skeleton cards on initial load, matching masonry column count.**

---

## Empty State (launch day)

If fewer than 5 approved confessions exist, show seed confessions (pre-loaded in DB, marked with a `seed: true` flag so they can be hidden later).

Seed confessions from PM spec:
1. 🧸 "A stuffed elephant named Gerald. He's been through 3 moves and a divorce."
2. 🎵 "The same Radiohead album. Every time life gets hard."
3. 🛏️ "My childhood blanket. I'm 34."
4. ☕ "My morning coffee routine. It's the only part of the day that's mine."
5. 🐕 "My dog. She doesn't judge."

**Do NOT mark seed confessions visually.** They should blend in completely.

---

## Accessibility

- Form: proper `<label>` for textarea (can be visually hidden since the header serves as the prompt, but use `aria-labelledby` pointing to the header)
- Character counter: `aria-live="polite"`, announces when near limit
- Emoji picker: `role="listbox"`, arrow key navigation, `aria-label="Choose an emoji for your confession"`
- Sort toggle: `role="radiogroup"` with `role="radio"` for each option
- Cards: `role="article"`, each with an `aria-label` summarizing content
- "Me too" button: `aria-pressed="true/false"`, `aria-label="Me too, X people agree"`
- Infinite scroll: announce "Loading more confessions" via `aria-live` region
- Focus management: after submission, move focus to the success toast or new card
- All color combos meet WCAG AA 4.5:1 contrast
- All touch targets ≥ 44px
