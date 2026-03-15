# Timeline Spec — "Punch's Journey"

## Overview

A vertical, scroll-driven interactive timeline that tells Punch's story from birth to today. Each section is a full emotional beat — not a bullet point, but a *moment*. The scroll is the narrative engine.

**Technical approach:** CSS scroll-driven animations + Intersection Observer for section reveals. No heavy scroll-hijacking libraries. The user controls their scroll speed — we just make it beautiful.

**URL:** `hangintherepunch.com/` (this IS the homepage)

---

## Global Timeline Structure

### Desktop (1024px+)
```
┌─────────────────────────────────────────┐
│              [HERO SECTION]             │
│         Full viewport, centered         │
├─────────────────────────────────────────┤
│                                         │
│    ┌──────────┐  │  Date                │
│    │  Image   │  │  Headline            │
│    │          │  │  Body text           │
│    └──────────┘  │                      │
│                  │                      │
│       Date       │  ┌──────────┐        │
│       Headline   │  │  Image   │        │
│       Body text  │  │          │        │
│                  │  └──────────┘        │
│                  │                      │
│              [continues]                │
│                                         │
├─────────────────────────────────────────┤
│             ["TODAY" SECTION]           │
└─────────────────────────────────────────┘
```

The thin vertical line (`1px`, `Soft Earth` at 30% opacity) runs down the center. Content alternates left/right. Timeline dots (`8px` filled circles, `Punch Gold`) sit on the line at each section.

### Mobile (< 1024px)
No center line. Full-width stacked sections. Date badge floats top-left of each section. Content is a single column flow. The vertical line becomes a subtle left-edge accent (`3px`, left margin).

---

## Progress Indicator

A thin progress bar fixed to the top of the viewport:
- `height: 3px`
- `background: Punch Gold`
- Width = scroll progress (0% → 100%)
- `z-index: 100`, sits above everything
- Fades in after scrolling past hero (not visible at page load)
- On desktop: also show a small floating "chapter label" next to it that updates per section (e.g., "July 2025 — Born into silence")

---

## Section-by-Section Breakdown

### S0: Hero — "This is Punch."

**Viewport:** Full screen (100vh)

**Layout:**
```
┌──────────────────────────┐
│                          │
│                          │
│     [Punch photo]        │
│     Soft fade edges      │
│                          │
│     "This is Punch."     │  ← Fraunces 900, hero size
│     "And this is         │
│      his story."         │  ← Outfit 300, text-lg
│                          │
│        ↓                 │  ← animated scroll chevron
│                          │
└──────────────────────────┘
```

**Visual:** Punch photo (ideally clinging to Oran-Mama) centered, large but not full-bleed. Surrounded by Warm Cream with subtle vignette. The image has a very slow, subtle zoom (`scale: 1 → 1.03` over 10s, CSS animation, loops).

**Animation:**
- Page load: photo fades in (500ms), then headline types in character by character (fast, 50ms/char, not a gimmick — just a gentle reveal)
- Scroll chevron pulses gently (opacity 0.4 → 1, 2s loop)
- On scroll down: photo parallax (moves up slower than scroll, 0.5x rate), headline fades out

**Copy:**
> **This is Punch.**
> And this is his story.

**Screenshot moment:** The hero itself. Clean, warm, one adorable photo, big type.

---

### S1: "Born into Silence" — Birth & Abandonment (July 2025)

**Date badge:** `JULY 2025`

**Headline:** "Born into silence"

**Body:**
> Punch was born at Takasakiyama Natural Zoological Garden in Ōita, Japan. His mother abandoned him almost immediately. In the wild, that's a death sentence. At the zoo, it meant something different — but not less lonely.
>
> He was the smallest monkey anyone had seen in years.

**Visual:** Single photo of tiny Punch, alone. If no photo available for this exact moment, use a warm-toned atmospheric shot of Takasakiyama with text overlay. Muted palette — lean into the `Lonely Night` gradient for this section's background.

**Animation:**
- Content fades up from below (standard scroll reveal)
- Background subtly shifts from Warm Cream to Lonely Night gradient as section enters viewport
- Optional: very faint particle effect of falling leaves (CSS-only, 3-4 elements, `prefers-reduced-motion` respects)

**Emotional beat:** Quiet sadness. Don't overplay it. Let the emptiness do the work.

**Screenshot moment:** The headline "Born into silence" over the muted background with tiny Punch. Minimal, devastating.

---

### S2: "They Named Him Punch" — Zookeepers & Identity

**Date badge:** `AUGUST 2025`

**Headline:** "They named him Punch"

**Body:**
> The zookeepers took him in. Hand-fed him. Kept him warm through the night. They named him after Monkey Punch — the manga artist who created Lupin III.
>
> A name for a fighter. For someone who'd have to be clever to survive.

**Visual:** Photo of Punch being held/fed by a zookeeper. Warm tones return — transition back to Golden Hour gradient.

**Sidebar element (desktop):** Small inline note styled as a card:
> **💡 Who was Monkey Punch?**
> Kazuhiko Katō (1937–2019), pen name Monkey Punch, created *Lupin the Third* — one of the longest-running manga series in history. A trickster who always found a way.

**Animation:**
- Standard scroll reveal
- The "fun fact" card slides in from the right with a slight delay (200ms after main content)
- Background warms back up

**Screenshot moment:** The Lupin III connection card — fans will screenshot and share this.

---

### S3: "Oran-Mama" — The Plushie (Fall 2025)

**Date badge:** `FALL 2025`

**Headline:** "He needed something to hold onto"

**Body:**
> Baby monkeys need to cling. It's not cute — it's survival. Without a mother to hold, Punch had nothing.
>
> The zookeepers gave him an IKEA Djungelskog orangutan plushie. He grabbed on and wouldn't let go.
>
> They called it "Oran-Mama."

**Visual:** THE photo — Punch clinging to the Djungelskog. This is the money shot. Full-width, high-res. Let it breathe with generous padding above and below.

**Special treatment:** This image gets a subtle golden glow effect — a soft `box-shadow: 0 0 80px rgba(212, 160, 82, 0.15)` behind it, as if the image itself is warm.

**Pull quote (below image):**
> *"He held on like his life depended on it. Because it did."*

**Animation:**
- Image enters with a slightly slower, more deliberate reveal (600ms instead of standard 400ms)
- Pull quote fades in 400ms after image
- Very subtle: the plushie in the photo gets a faint warm pulse overlay (CSS `mix-blend-mode: soft-light` animated opacity)

**Screenshot moment:** This entire section. The image, the headline, the quote. This is the one that gets shared.

---

### S4: "Monkey Mountain" — Integration (Jan 19, 2026)

**Date badge:** `JANUARY 19, 2026`

**Headline:** "Time to face the mountain"

**Body:**
> Punch couldn't stay with the zookeepers forever. To be a monkey, he had to live with monkeys.
>
> Monkey Mountain: 60+ Japanese macaques. A hierarchy. Politics. Teeth.
>
> On January 19, 2026, tiny Punch — still clutching Oran-Mama — walked into the group.

**Visual:** Wide shot of Monkey Mountain (the enclosure/group). If available, Punch entering the group. Use the `Forest Shadow` color as accent for this section.

**Layout note:** The "60+" number can be a large typographic element — `Fraunces 900`, oversized (like `8rem`), low opacity (15%), positioned behind the body text as a background element.

**Animation:**
- Content reveals standard
- The large "60+" number fades in at 10% opacity as a background element
- Section background shifts to include Forest Shadow tones

**Screenshot moment:** "Time to face the mountain" headline with the imposing 60+ number ghosted behind.

---

### S5: "I Am Punch" — The Bullying (Feb 19, 2026)

**Date badge:** `FEBRUARY 19, 2026`

**Headline:** "They came for him"

**Sub-headline:** "And 11 million people watched"

**Body:**
> The other monkeys didn't welcome Punch. They bullied him. Stole his food. Pushed him around.
>
> A video of Punch — tiny, alone, clutching his plushie while bigger monkeys circled — went mega-viral.
>
> 11 million views. And a feeling that swept the internet:
>
> **"I am Punch, and he is me."**

**Visual:** Still from the viral video, or the video itself (autoplay muted, with play button for sound). The `Storm Grey` palette enters subtly here.

**The Quote Treatment:**
The line "I am Punch, and he is me" gets special treatment:
- Centered, isolated in its own space (generous padding above/below)
- `Fraunces 900`, `text-2xl` on mobile, `text-3xl` on desktop
- Color: `Deep Bark`
- Subtle text-shadow for depth
- On scroll, each word appears one at a time (staggered 200ms per word)
- After full reveal: a soft golden underline animates left-to-right beneath the text

**View counter:** Animated counting number that rolls up from 0 to 11,000,000 as user scrolls through. `JetBrains Mono`, small, positioned as a detail element. Format: `11,000,000+ views`.

**Animation:**
- Section background desaturates slightly (the storm grey influence)
- Quote word-by-word reveal is the centerpiece animation
- View counter rolls up in sync with scroll position

**Screenshot moment:** "I am Punch, and he is me" — big, centered, golden underline. THE screenshot of the entire site.

---

### S6: "The World Responded" — IKEA & Global Impact

**Date badge:** `FEBRUARY 2026`

**Headline:** "The world held on too"

**Body:**
> IKEA donated 33 Djungelskog toys to Takasakiyama.
>
> Within days, the plushie sold out in stores worldwide. On eBay, prices hit $350 for a $20 toy.
>
> People didn't just want to watch Punch. They wanted to hold what he held.

**Visual:** Collage-style layout — IKEA shelf (empty), eBay listing screenshot, people with their own Djungelskog plushies. Multiple smaller images rather than one hero.

**Price ticker element:**
```
┌─────────────────────┐
│  Djungelskog Price   │
│  $19.99 → $350+     │
│  ████████████████░░  │
└─────────────────────┘
```
Animated bar/number that fills as you scroll through. Styled like a stock ticker but warm — `Punch Gold` fill, `JetBrains Mono` numbers.

**"33" number treatment:** Similar to the "60+" in S4 — large `Fraunces 900` "33" as a background element, low opacity.

**Animation:**
- Photo collage: images stagger in (100ms apart), slight random rotation (-2° to 2°) for a scattered/organic feel
- Price counter animates with scroll
- Tone shifts back to warm — hope returns

**Screenshot moment:** The price ticker $19.99 → $350+. People love the "internet broke capitalism" angle.

---

### S7: "Finding His Way" — Growth (March 2026)

**Date badge:** `MARCH 2026`

**Headline:** "He started to let go"

**Body:**
> Slowly, Punch found his place. He made a friend — a real one, not made of polyester.
>
> He still carries Oran-Mama sometimes. But not always. Not like before.
>
> He's learning that the world isn't just teeth and cold shoulders. Some of it is warm on its own.

**Visual:** Photo of Punch with other monkeys (friendly interaction), or Punch without the plushie. The warmest palette of the whole timeline — full Golden Hour gradient.

**Emotional design note:** This section should feel like exhaling. More whitespace than any other section. Wider line spacing. Let the words float.

**Animation:**
- Gentle, slow reveals
- Background is the warmest, most golden tone
- If there's a photo of Punch without the plushie: it enters with a slightly longer fade, giving the viewer a moment to notice the absence

**Screenshot moment:** "He started to let go" — the most human line in the whole timeline.

---

### S8: "Today" — Live Section

**Date badge:** `TODAY` (pulsing dot indicator, like a live stream badge)

**Headline:** "Punch is [age] days old"

**Body:** Dynamic content area. This section updates with the latest Punch news/photos. Initially:
> Punch is growing every day. He's still at Takasakiyama, still figuring out the hierarchy, still occasionally dragging Oran-Mama around when he thinks no one's looking.
>
> This story isn't over. It's barely started.

**"Days old" counter:** Calculate from July 2025 birthdate. `JetBrains Mono`, large. Updates live (recalculates on load).

**Live indicator:** Small red/gold pulsing dot next to "TODAY" badge:
```css
.live-dot {
  width: 8px;
  height: 8px;
  background: #D4A052;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(212, 160, 82, 0.4); }
  50% { opacity: 0.8; box-shadow: 0 0 0 8px rgba(212, 160, 82, 0); }
}
```

**CMS-ready:** This section's body content should be easily updatable (markdown file, simple CMS, or even a JSON file). Structure:
```json
{
  "lastUpdated": "2026-03-07",
  "headline": "Punch is {days} days old",
  "body": "...",
  "image": "...",
  "source": "optional link to latest news"
}
```

**Below the "Today" content:**
- Link to Takasakiyama's official site/social
- "Follow Punch's story" → leads to email signup (S9)

**Screenshot moment:** The live dot + days counter. Makes people feel connected to an ongoing story.

---

### S9: "Stay Close" — Email Signup

> *See `signup-spec.md` for full details*

Positioned here, after the emotional climax of the timeline. Full section treatment, not a footer afterthought.

---

### S10: Footer — "I Am Punch"

**Layout:**
```
┌──────────────────────────────────┐
│                                  │
│   [Small Punch illustration]     │
│                                  │
│   "I am Punch, and he is me."   │
│                                  │
│   [Try: I Am Punch Quiz →]      │  ← link to mood generator
│                                  │
│   Made with 🧸 for a little     │
│   monkey who needed a hug.      │
│                                  │
│   About · Sources · Privacy     │
│                                  │
└──────────────────────────────────┘
```

Background: `Deep Bark` with cream text (inverted). Warm, closing feel.

---

## Scroll Behavior & Technical Notes

### Scroll-Linked Animations

Use the **Intersection Observer API** with thresholds for section reveals:
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, {
  threshold: 0.15,  // Trigger when 15% visible
  rootMargin: '0px 0px -10% 0px'  // Slightly before full visibility
});
```

### Progress Bar

Use `scroll()` timeline where supported, fallback to `scrollY / scrollHeight` listener (throttled to `requestAnimationFrame`).

### Parallax (Desktop Only)

Hero image only. Use `transform: translateY(calc(var(--scroll) * 0.3))` driven by scroll position. Do NOT apply parallax on mobile — it's janky and wastes battery.

### Section Snap (Optional, test this)

Consider `scroll-snap-type: y proximity` (NOT `mandatory` — that feels controlling). Each section has `scroll-snap-align: start`. Test on real devices — if it feels wrong, remove it.

### Pre-loading

- Hero image: `<link rel="preload" as="image">`
- Sections S1–S3 images: load immediately (above-the-fold or near)
- S4+ images: `loading="lazy"`
- Fonts: `<link rel="preload" as="font" crossorigin>`

### Semantic HTML Structure

```html
<main class="timeline">
  <section class="timeline__hero" aria-label="Introduction">...</section>
  <article class="timeline__section" data-section="birth" aria-label="July 2025 — Born into silence">
    <time datetime="2025-07">July 2025</time>
    <h2>Born into silence</h2>
    ...
  </article>
  <article class="timeline__section" data-section="named">...</article>
  <!-- ... -->
  <section class="timeline__today" aria-label="Today" aria-live="polite">...</section>
  <section class="timeline__signup" aria-label="Email signup">...</section>
  <footer class="timeline__footer">...</footer>
</main>
```

### URL Anchors

Each section gets an anchor: `#born`, `#named`, `#oranmama`, `#mountain`, `#viral`, `#world`, `#growing`, `#today`

These enable direct-linking to specific moments (great for sharing: "hangintherepunch.com#viral").

### Analytics Events

Track scroll depth per section. Fire events:
- `timeline_section_viewed` with `section_id`
- `timeline_completed` when user reaches Today
- `quote_visible` when "I am Punch" quote enters viewport (track the viral moment)
