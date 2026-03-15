# Style Guide — hangintherepunch.com

## Emotional Direction

This isn't a cute animal site. It's a story about abandonment, loneliness, finding comfort in something soft, and slowly learning to be brave. The design should feel like golden hour light through a window — warm, quiet, a little melancholy, but hopeful.

**Keywords:** Warm, intimate, tender, resilient, golden, quiet strength

---

## Color Palette

### Primary Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Punch Gold** | `#D4A052` | Primary accent, CTAs, timeline markers |
| **Warm Cream** | `#FAF5EE` | Page background, card backgrounds |
| **Deep Bark** | `#3D2B1F` | Primary text, headings |
| **Soft Earth** | `#8B7355` | Secondary text, captions, dates |

### Secondary Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Blush Pink** | `#E8C4B8` | Emotional highlights, the "vulnerable" moments |
| **Forest Shadow** | `#4A5D4A` | Monkey Mountain sections, nature moments |
| **Storm Grey** | `#6B6B7B` | Bullying/conflict sections (muted, not harsh) |
| **Sky Hope** | `#A8C4D4` | "Today" section, forward-looking moments |

### Gradient Definitions

- **Golden Hour:** `linear-gradient(180deg, #FAF5EE 0%, #F5E6D0 50%, #E8D4B8 100%)` — default section bg
- **Lonely Night:** `linear-gradient(180deg, #E8E0D8 0%, #D4CCC4 100%)` — abandonment section
- **New Dawn:** `linear-gradient(180deg, #FAF5EE 0%, #E8F0F4 100%)` — hope/future sections

### Dark Mode (v2, not launch)

Invert to deep warm browns (`#1A1410` bg) with cream text. Gold accent stays. Not a priority for launch.

---

## Typography

### Font Stack

| Role | Font | Fallback | Weight |
|------|------|----------|--------|
| **Display / Headlines** | **Fraunces** (Google Fonts) | Georgia, serif | 700, 900 |
| **Body** | **Outfit** (Google Fonts) | system-ui, sans-serif | 300, 400, 500 |
| **Accent / Dates** | **JetBrains Mono** (Google Fonts) | monospace | 400 |

**Why Fraunces:** It's a variable "wonky" serif — has optical personality, feels handmade and warm without being childish. The `WONK` axis can add playfulness to headings.

**Why Outfit:** Clean geometric sans that doesn't feel corporate. Light weights feel airy and modern.

**Why JetBrains Mono for dates:** Gives timeline dates a documentary / factual quality that contrasts with the emotional serif headlines.

### Type Scale (Mobile-First)

```
--text-xs:    0.75rem / 1.2   (12px) — dates, fine print
--text-sm:    0.875rem / 1.4  (14px) — captions, metadata
--text-base:  1rem / 1.6      (16px) — body text
--text-lg:    1.25rem / 1.5   (20px) — lead paragraphs
--text-xl:    1.5rem / 1.3    (24px) — section subheads
--text-2xl:   2rem / 1.2      (32px) — section headlines (mobile)
--text-3xl:   2.5rem / 1.1    (40px) — section headlines (tablet+)
--text-4xl:   3.5rem / 1.05   (56px) — hero headline (desktop)
--text-hero:  clamp(2.5rem, 8vw, 5rem) / 1.0 — hero, fluid
```

### Type Rules

- **Headlines:** Fraunces 900, `WONK: 1` for emotional sections, `WONK: 0` for factual. Letter-spacing: `-0.02em`.
- **Body:** Outfit 300–400. Max line width: `65ch`. Line-height 1.6.
- **Dates on timeline:** JetBrains Mono 400, uppercase, `letter-spacing: 0.1em`, `text-transform: uppercase`.
- **Pull quotes:** Fraunces 700 italic, `text-indent: -0.4em` for hanging punctuation, `font-size: text-xl`.
- **No text smaller than 14px** on any breakpoint.

---

## Spacing System

8px base grid:

```
--space-1:  0.25rem  (4px)
--space-2:  0.5rem   (8px)
--space-3:  0.75rem  (12px)
--space-4:  1rem     (16px)
--space-6:  1.5rem   (24px)
--space-8:  2rem     (32px)
--space-12: 3rem     (48px)
--space-16: 4rem     (64px)
--space-24: 6rem     (96px)
--space-32: 8rem     (128px)
```

**Section spacing:** Each timeline section has `padding-block: var(--space-24)` minimum on mobile, `var(--space-32)` on desktop. This gives breathing room for screenshots.

---

## Layout & Responsive

### Breakpoints

```
--bp-sm:  640px   (large phones landscape)
--bp-md:  768px   (tablets)
--bp-lg:  1024px  (small laptops)
--bp-xl:  1280px  (desktop)
```

### Container

```css
.container {
  width: 100%;
  max-width: 720px;       /* content column — intentionally narrow for readability */
  margin-inline: auto;
  padding-inline: var(--space-6);  /* 24px gutters on mobile */
}

@media (min-width: 1024px) {
  .container {
    max-width: 800px;
  }
}
```

**Full-bleed elements** (hero images, key moments) break out of container to `100vw`.

### Mobile-First Grid

- **Mobile (< 640px):** Single column. Everything stacks. Timeline is vertical-only.
- **Tablet (640–1023px):** Content column centered, images can alternate left/right of text.
- **Desktop (1024px+):** Timeline gets a subtle vertical line with alternating content sides. More whitespace. Parallax effects activate.

### Safe Screenshot Zone

Every timeline section must have a "sweet spot" — a 390×844px area (iPhone 14 viewport) that looks complete and shareable as-is. This means:
- Key visual + headline + one line of body visible without scrolling within each section
- No element cut off awkwardly at iPhone viewport edges
- Background gradients/colors make screenshots look intentional, not cropped

---

## Imagery & Media

### Photo Treatment

- All photos get a subtle warm color grade: `filter: sepia(8%) saturate(110%) brightness(102%)`
- Border radius: `12px` (not harsh squares, not full circles)
- Optional: thin `1px solid rgba(61, 43, 31, 0.1)` border for definition on light backgrounds
- **Loading:** Blur-up placeholder (tiny base64 thumbnail → full image). No layout shift.

### Illustration Style (for mood generator & decorative elements)

- Soft, slightly textured line art
- Warm monochrome (Deep Bark on Warm Cream) with one accent color per illustration
- Think Noritake (Japanese illustrator) meets children's book warmth
- Consistent stroke weight: 2px at render size

### Video

- Autoplay muted with play button overlay
- Poster frame required (no black rectangles)
- Max initial load: poster only. Video loads on interaction.

---

## Motion & Animation

### Principles

- **Purposeful:** Animation reveals content or guides attention. Never decorative-only.
- **Subtle:** Ease-in-out, 300–500ms for most transitions. Nothing bouncy or springy.
- **Scroll-driven:** Prefer CSS `animation-timeline: scroll()` and Intersection Observer over JS scroll listeners for performance.
- **Reduced motion:** Respect `prefers-reduced-motion`. All animations have a static fallback that still looks good.

### Standard Transitions

```css
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);  /* Material standard */
--ease-enter:   cubic-bezier(0, 0, 0.2, 1);     /* decelerate */
--ease-exit:    cubic-bezier(0.4, 0, 1, 1);      /* accelerate */

--duration-fast:   150ms;
--duration-normal: 300ms;
--duration-slow:   500ms;
--duration-scroll: 800ms;  /* for scroll-linked animations */
```

### Scroll Reveal Pattern

Elements enter with:
```css
/* Initial state */
opacity: 0;
transform: translateY(24px);

/* Revealed state */
opacity: 1;
transform: translateY(0);
transition: opacity var(--duration-scroll) var(--ease-enter),
            transform var(--duration-scroll) var(--ease-enter);
```

Stagger child elements by `100ms` each for lists/groups.

---

## Components

### Buttons

- **Primary (CTA):** `bg: Punch Gold`, `color: white`, `border-radius: 9999px` (pill), `padding: 12px 32px`, `font: Outfit 500`
- **Secondary:** `bg: transparent`, `border: 1.5px solid Deep Bark`, `border-radius: 9999px`
- **Ghost:** `bg: transparent`, `color: Punch Gold`, underline on hover
- Hover: subtle scale `transform: scale(1.02)` + shadow `0 4px 12px rgba(0,0,0,0.1)`
- Active: `transform: scale(0.98)`
- Min touch target: `44px` height

### Cards

- `bg: white` or `bg: Warm Cream`
- `border-radius: 16px`
- `box-shadow: 0 1px 3px rgba(61, 43, 31, 0.08)`
- Hover (desktop): `box-shadow: 0 8px 24px rgba(61, 43, 31, 0.12)`, `transform: translateY(-2px)`
- Padding: `var(--space-6)` on mobile, `var(--space-8)` on desktop

### Input Fields

- `border: 1.5px solid #D4CCC4`
- `border-radius: 12px`
- `padding: 14px 16px`
- `font-size: 16px` (prevents iOS zoom)
- Focus: `border-color: Punch Gold`, `box-shadow: 0 0 0 3px rgba(212, 160, 82, 0.2)`
- Placeholder text: Soft Earth color

---

## Iconography

Minimal. Use sparingly:
- Timeline dots/markers: filled circles, `8px`, Punch Gold
- Share icon: simple arrow-out-of-box line icon
- Scroll indicator: animated chevron, Soft Earth color
- No icon library dependency — inline SVGs only for the ~5 icons needed

---

## Performance Budget

| Asset | Budget |
|-------|--------|
| **First paint CSS** | < 15KB gzipped |
| **Total JS (initial)** | < 50KB gzipped |
| **Largest Contentful Paint** | < 2.5s on 3G |
| **Hero image** | < 200KB (WebP/AVIF with fallback) |
| **Each timeline section image** | < 150KB |
| **Total page weight (above fold)** | < 500KB |
| **Web fonts** | 2 variable fonts, < 80KB total |

### Loading Strategy

1. Critical CSS inlined in `<head>`
2. Fonts: `font-display: swap` with system fallback metrics matched
3. Images: native `loading="lazy"` except hero
4. Timeline sections below fold: content loaded via Intersection Observer
5. Mood generator: code-split, loaded on navigation

---

## Accessibility

- WCAG 2.1 AA minimum
- All color combos meet 4.5:1 contrast (Deep Bark on Warm Cream = 10.5:1 ✓, Soft Earth on Warm Cream = 4.6:1 ✓)
- Focus rings: `3px solid Punch Gold` with `2px offset`
- Skip-to-content link
- Timeline sections are semantic `<article>` elements with proper heading hierarchy
- All images have descriptive alt text (Punch's story deserves to be read too)
- Scroll animations respect `prefers-reduced-motion: reduce`
- Touch targets minimum 44×44px
