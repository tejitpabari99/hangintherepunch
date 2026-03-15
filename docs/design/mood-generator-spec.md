# Mood Generator Spec — "I Am Punch"

## Overview

A quick, tap-driven quiz that maps your current mood to a moment in Punch's life, then generates a shareable card. This is the viral engine — the timeline tells the story, but the mood generator makes it *personal*.

**URL:** `hangintherepunch.com/mood` (also accessible from timeline footer link)

**Core loop:**
1. Answer 5 taps (< 30 seconds)
2. Get your Punch moment
3. Share the card
4. Come back tomorrow

---

## Entry Points

1. **Timeline footer (S10):** "Which Punch are you today? →" button
2. **Direct link:** `/mood` — shareable, works standalone without timeline context
3. **Share card CTA:** Every generated card links back to `/mood`
4. **Social bio link:** Optimized as a link-in-bio destination

### Landing State (for direct /mood visitors)

Brief 3-second intro before questions begin:

```
┌──────────────────────────────────┐
│                                  │
│     [Punch illustration:         │
│      different expressions]      │
│                                  │
│     "Which Punch are             │
│      you today?"                 │
│                                  │
│     [Start →]                    │
│                                  │
└──────────────────────────────────┘
```

Background: Warm Cream. Button: Punch Gold pill.

For users arriving from the timeline, skip the landing — go straight to Q1.

---

## Question Flow

### Design Principles for Questions
- **Tap, don't type.** Every answer is a single tap.
- **Emotional, not literal.** Don't ask "how are you?" — ask things that reveal mood indirectly.
- **Visual options when possible.** Icons/illustrations > text labels.
- **Fast transitions.** Card-swipe or crossfade between questions (200ms). No loading between questions.
- **Progress indicator:** 5 small dots at top, filled as you progress. Subtle, not a progress bar.

### Question Screen Layout (Mobile)

```
┌──────────────────────────────────┐
│  ○ ○ ○ ○ ○           ← progress │
│                                  │
│                                  │
│     Question text                │
│     (Fraunces 700, text-xl)      │
│                                  │
│                                  │
│  ┌────────────────────────────┐  │
│  │  Option A                  │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │  Option B                  │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │  Option C                  │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │  Option D                  │  │
│  └────────────────────────────┘  │
│                                  │
└──────────────────────────────────┘
```

### Option Button Styling

```css
.mood-option {
  width: 100%;
  padding: 16px 20px;
  background: white;
  border: 1.5px solid #E8DDD0;
  border-radius: 14px;
  font-family: 'Outfit', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #3D2B1F;
  text-align: left;
  cursor: pointer;
  transition: all 150ms ease;
}

.mood-option:hover {
  border-color: #D4A052;
  background: #FDF9F3;
}

.mood-option:active,
.mood-option.selected {
  border-color: #D4A052;
  background: #D4A052;
  color: white;
  transform: scale(0.98);
}
```

### The 5 Questions

Each question has 4 options. Each option maps to one or more Punch moments (scored internally).

---

**Q1: "Pick a window."**

*Show 4 illustrated windows (tap the image, not text):*

| Option | Visual | Maps to |
|--------|--------|---------|
| A | Window with rain outside, warm light inside | Oran-Mama (comfort-seeking) |
| B | Window cracked open, wind blowing curtain | Mountain (facing the unknown) |
| C | Window with sunrise, golden light flooding in | Growing (hope, new chapter) |
| D | Window with face reflected, dark outside | Viral (being seen / vulnerable) |

**Layout:** 2×2 grid of illustrated cards instead of vertical list. Each card is ~`160×140px` on mobile.

```
┌─────────┐ ┌─────────┐
│  🌧️     │ │  🌬️     │
│  Rain    │ │  Wind   │
└─────────┘ └─────────┘
┌─────────┐ ┌─────────┐
│  🌅     │ │  🌙     │
│  Sunrise │ │  Night  │
└─────────┘ └─────────┘
```

---

**Q2: "Your alarm just went off. First thought?"**

| Option | Text | Maps to |
|--------|------|---------|
| A | "Five more minutes under the blanket" | Oran-Mama |
| B | "Today's going to be different" | Mountain |
| C | "I wonder who texted me" | Viral |
| D | "...already? Okay. Let's go." | Growing |

---

**Q3: "You walk into a room full of people. You—"**

| Option | Text | Maps to |
|--------|------|---------|
| A | "Find the corner with the best snacks" | Birth (alone, surviving) |
| B | "Look for the one person I know" | Oran-Mama |
| C | "Take a breath and walk in" | Mountain |
| D | "I'm already talking to someone" | Growing |

---

**Q4: "Pick something to hold."**

*Visual options again (2×2 grid):*

| Option | Visual | Maps to |
|--------|--------|---------|
| A | A warm mug | Oran-Mama (comfort objects) |
| B | A phone (screen glowing) | Viral (connection through screens) |
| C | Someone's hand | Growing (real connection) |
| D | Nothing — hands in pockets | Birth / Mountain (independence or loneliness) |

---

**Q5: "It's 2am. You're still awake because—"**

| Option | Text | Maps to |
|--------|------|---------|
| A | "My brain won't stop replaying things" | Viral |
| B | "I'm reading/watching something I can't put down" | Named (curiosity, identity) |
| C | "I just... don't want today to end yet" | Growing |
| D | "I'm waiting for something but I don't know what" | Birth / Oran-Mama |

---

## Scoring Logic

Each answer maps to one primary Punch moment. Tally the scores:

```javascript
const moments = {
  birth:    0,  // Alone, surviving
  named:    0,  // Finding identity
  oranmama: 0,  // Seeking comfort
  mountain: 0,  // Facing fear
  viral:    0,  // Being seen / vulnerable
  growing:  0,  // Letting go, moving forward
};

// After all 5 questions, find the highest score
// Ties broken by: later question answers weighted slightly more (Q5 > Q1)
// Weight: Q1 = 1.0, Q2 = 1.1, Q3 = 1.2, Q4 = 1.3, Q5 = 1.4
```

### The 6 Results

| ID | Title | Tagline | Emotional Core |
|----|-------|---------|----------------|
| `birth` | "Baby Punch" | "Alone, but here." | You're in survival mode. That's okay. You showed up. |
| `named` | "Punch, Named" | "Still figuring out who I am." | You're becoming. The name comes before the story. |
| `oranmama` | "Holding Oran-Mama" | "I just need something soft today." | Comfort isn't weakness. Hold on to what helps. |
| `mountain` | "Facing the Mountain" | "Sixty monkeys and one deep breath." | You're walking into it. That's braver than you think. |
| `viral` | "Eleven Million Eyes" | "Everyone's watching. I'm still here." | Being seen is terrifying. Being seen and surviving is everything. |
| `growing` | "Letting Go" | "Learning that the world is warm." | You don't need the plushie as much today. And that's beautiful. |

---

## Result Screen

### Layout (Mobile)

```
┌──────────────────────────────────┐
│                                  │
│     "You are..."                 │  ← Outfit 300, text-sm, fade in
│                                  │
│     ┌────────────────────────┐   │
│     │                        │   │
│     │  [Punch illustration   │   │
│     │   matching moment]     │   │
│     │                        │   │
│     │  "Holding              │   │
│     │   Oran-Mama"           │   │  ← Fraunces 900, text-2xl
│     │                        │   │
│     │  "I just need          │   │
│     │   something soft       │   │
│     │   today."              │   │  ← Outfit 300 italic, text-lg
│     │                        │   │
│     └────────────────────────┘   │
│                                  │  ← This card IS the share image
│     Comfort isn't weakness.      │
│     Hold on to what helps.       │  ← Body text, below card
│                                  │
│  ┌────────────────────────────┐  │
│  │   Share Your Punch Mood    │  │  ← Primary button
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │   Read Punch's Story →     │  │  ← Secondary button → timeline
│  └────────────────────────────┘  │
│                                  │
│     Come back tomorrow —         │
│     your Punch mood changes. 🧸  │
│                                  │
│  ┌────────────────────────────┐  │
│  │   Try Again                │  │  ← Ghost button
│  └────────────────────────────┘  │
│                                  │
└──────────────────────────────────┘
```

### Result Reveal Animation

1. Screen fades to result's background color (300ms)
2. "You are..." text fades in (200ms)
3. Pause (400ms) — suspense
4. Illustration slides up from below + fades in (500ms, `ease-enter`)
5. Title types in (fast, 40ms/char)
6. Tagline fades in (300ms, 200ms delay after title)
7. Body text and buttons fade in (300ms, staggered)

Total reveal: ~2 seconds. Feels like an unveiling, not a page load.

**Reduced motion:** Skip character-by-character and slide-up. Everything fades in simultaneously.

---

## Share Cards

### Dimensions

| Platform | Size | Aspect Ratio | Notes |
|----------|------|-------------|-------|
| **X (Twitter)** | 1200×675px | 16:9 | `summary_large_image` card |
| **Instagram Story** | 1080×1920px | 9:16 | Full screen vertical |
| **TikTok** | 1080×1920px | 9:16 | Same as IG Story |
| **Open Graph (default)** | 1200×630px | ~1.9:1 | Facebook, Discord, iMessage previews |
| **Square (fallback)** | 1080×1080px | 1:1 | Instagram feed, general purpose |

### Card Layout — X / OG (Landscape)

```
┌────────────────────────────────────────────────┐
│                                                │
│   [Punch illustration]     "Holding            │
│                             Oran-Mama"          │
│                                                │
│                            "I just need         │
│                             something soft      │
│                             today."             │
│                                                │
│   hangintherepunch.com/mood    #IAmPunch        │
│                                                │
└────────────────────────────────────────────────┘
```

- Left 40%: Illustration (centered, with padding)
- Right 60%: Title + tagline
- Bottom strip: URL + hashtag
- Background: Result-specific color variant (see below)

### Card Layout — Instagram Story / TikTok (Portrait)

```
┌──────────────────────┐
│                      │
│                      │
│   "I am Punch        │
│    today."           │  ← Small header text
│                      │
│                      │
│   [Punch             │
│    illustration,     │
│    large,            │
│    centered]         │
│                      │
│                      │
│   "Holding           │
│    Oran-Mama"        │  ← Title, Fraunces 900
│                      │
│   "I just need       │
│    something soft    │
│    today."           │  ← Tagline
│                      │
│                      │
│  hangintherepunch    │
│  .com/mood           │  ← URL at bottom
│                      │
│   #IAmPunch          │
│                      │
└──────────────────────┘
```

### Card Color Variants

Each result gets its own background gradient for the share card:

| Result | Card Background | Accent |
|--------|----------------|--------|
| Baby Punch | `#E8E0D8` → `#DDD5CD` (cool, muted) | `#8B7355` |
| Punch, Named | `#F5E6D0` → `#EDD8C0` (warm sand) | `#D4A052` |
| Holding Oran-Mama | `#FAF0E6` → `#F0E0D0` (softest warm) | `#E8C4B8` |
| Facing the Mountain | `#E8EDE8` → `#D8E0D8` (forest mist) | `#4A5D4A` |
| Eleven Million Eyes | `#E0E0E8` → `#D4D4DC` (cool exposure) | `#6B6B7B` |
| Letting Go | `#F0F4F8` → `#E8F0F4` (open sky) | `#A8C4D4` |

### Card Generation

**Method:** Client-side canvas rendering (no server dependency for v1).

```javascript
// Use html2canvas or a custom Canvas 2D renderer
// Pre-render illustrations as optimized PNGs
// Text rendered via Canvas 2D for exact control

async function generateShareCard(result, format = 'x') {
  const dimensions = {
    x:     { width: 1200, height: 675 },
    story: { width: 1080, height: 1920 },
    og:    { width: 1200, height: 630 },
    square:{ width: 1080, height: 1080 },
  };
  
  const canvas = document.createElement('canvas');
  canvas.width = dimensions[format].width;
  canvas.height = dimensions[format].height;
  
  // ... render background gradient, illustration, text
  
  return canvas.toDataURL('image/png');
}
```

**Alternative (v2):** Server-side generation via `/api/card?result=oranmama&format=story` using Satori + sharp. Better for OG meta tags (dynamic `og:image`).

### Share Flow

1. User taps "Share Your Punch Mood"
2. **Mobile:** Use Web Share API if available (`navigator.share()` with image blob)
3. **Fallback:** Show share sheet with platform buttons:
   - Download Image (always available)
   - Copy Link
   - Share to X (pre-filled tweet)
   - Share to Instagram (instructions: "Save image → Open Instagram Stories")

**Pre-filled tweet:**
```
I'm "{result title}" today.

"{tagline}"

Find your Punch mood → hangintherepunch.com/mood #IAmPunch
```

### OG Meta Tags (for /mood link previews)

When sharing the URL (not the image), the OG tags should show a generic mood generator preview:

```html
<meta property="og:title" content="Which Punch Are You Today?" />
<meta property="og:description" content="Find your Punch mood. Takes 30 seconds." />
<meta property="og:image" content="/og/mood-default.png" />
```

For result-specific URLs (`/mood?r=oranmama`), generate dynamic OG images:
```html
<meta property="og:title" content="I'm Holding Oran-Mama today." />
<meta property="og:description" content="I just need something soft today. — Find your Punch mood" />
<meta property="og:image" content="/api/og?result=oranmama" />
```

---

## "Come Back Tomorrow" Mechanic

### How It Works

- Store the result + date in `localStorage`:
  ```json
  { "result": "oranmama", "date": "2026-03-07", "count": 3 }
  ```
- If user returns same day: show their result directly (skip quiz), with "Retake?" option
- If user returns next day: fresh quiz, new result possible
- `count` tracks total times taken — after 5+ visits, show: "You've found your Punch mood {count} times. You keep coming back. 🧸"

### Returning User Flow

```
Same day:
  → Show result card immediately
  → "This is still you today."
  → [Share] [Retake?]

New day:
  → "New day, new Punch."
  → Go to Q1

5+ visits:
  → Show small loyalty message before quiz
  → "You've been here {count} times. Punch would be proud."
```

---

## Illustrations Needed

6 illustrations, one per result. Consistent style (see style guide):

1. **Baby Punch** — Tiny monkey, alone, looking at something off-frame. Muted tones.
2. **Punch, Named** — Punch with a slight head tilt, curious expression. Warm sand tones.
3. **Holding Oran-Mama** — Punch clinging to the plushie, eyes closed. Softest, warmest palette.
4. **Facing the Mountain** — Punch from behind, looking up at something large (implied). Green-grey tones.
5. **Eleven Million Eyes** — Punch looking directly at the viewer. Slightly cool tones. Most intense.
6. **Letting Go** — Punch walking forward, plushie visible behind/beside him but not gripped. Open sky tones.

**Format:** SVG preferred (scalable for all card sizes), with PNG fallbacks at 2x resolution.
**Style:** Warm line art, consistent 2px stroke, monochrome + one accent color per illustration (matches card color variant).

---

## Page Structure & Technical

### Route
`/mood` — standalone page, own `<head>` with mood-specific OG tags.

### Code Splitting
Mood generator JS/CSS should NOT be in the main timeline bundle. Lazy-load on navigation to `/mood`.

### State Machine

```
LANDING → Q1 → Q2 → Q3 → Q4 → Q5 → CALCULATING → RESULT
                                         ↓
                                    (fake 1.5s delay
                                     with animation)
```

The "calculating" state is artificial but important — it makes the result feel considered, not instant. Show:
- Punch illustration shuffling (3-4 different poses cycling, 300ms each)
- "Finding your Punch..." text
- Subtle particle effect (warm dots floating)
- Duration: exactly 1.5 seconds

### Keyboard/Accessibility
- Options navigable with arrow keys
- Enter/Space to select
- Tab to move between options
- Each question is a `<fieldset>` with `<legend>` (the question text)
- Options are `<button>` elements (not radio inputs — tapping is the interaction)
- Live region announces result for screen readers

### Analytics

Track:
- `mood_started` — first question viewed
- `mood_q{n}_answered` — each question, with answer value
- `mood_completed` — result shown, with result ID
- `mood_shared` — share button tapped, with platform
- `mood_shared_method` — web share API vs manual download vs copy link
- `mood_retake` — user chose to retake
- `mood_return_visit` — returning user (with day count)

**Funnel target:** 70%+ completion rate (it's only 5 taps). 15%+ share rate from completions.

---

## Performance

- Total JS for mood generator: < 30KB gzipped
- Illustrations: < 50KB each (SVG) or < 100KB (PNG)
- Card generation: < 2 seconds on mid-range phone
- No external dependencies (no quiz libraries, no heavy canvas libs)
- Pre-load illustration assets after Q3 (by then we can predict likely results based on scores so far — preload top 2 candidates)
