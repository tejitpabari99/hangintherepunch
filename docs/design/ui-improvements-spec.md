# UX Design Spec — UI Improvements (5 Tasks)

**Date:** March 8, 2026  
**Author:** UX Agent  
**Status:** Ready for dev  
**Priority:** Sprint 1 — these ship first

---

## 1. More Padding & Spacing Throughout 🔴 P0

### Problem
The site feels cramped. The style guide defines generous spacing, but the implementation has drifted. poobz called this out directly.

### Specific Changes

#### Timeline Section Spacing
```css
/* BEFORE (current — too tight) */
.timeline-section {
  padding-block: var(--space-8);    /* 32px — not enough */
  /* gap between sections likely too small or missing */
}

/* AFTER */
.timeline-section {
  padding-block: var(--space-16);   /* 64px on mobile */
}

@media (min-width: 1024px) {
  .timeline-section {
    padding-block: var(--space-24); /* 96px on desktop */
  }
}
```

#### Gap Between Timeline Sections
```css
/* Add to the timeline track / list container */
.timeline-track {
  display: flex;
  flex-direction: column;
  gap: var(--space-16);             /* 64px between sections on mobile */
}

@media (min-width: 1024px) {
  .timeline-track {
    gap: var(--space-24);           /* 96px on desktop */
  }
}
```

#### Timeline Card Internal Padding
```css
/* BEFORE */
.timeline-card {
  padding: var(--space-4);          /* 16px — too tight */
}

/* AFTER */
.timeline-card {
  padding: var(--space-8);          /* 32px on mobile */
}

@media (min-width: 1024px) {
  .timeline-card {
    padding: var(--space-12);       /* 48px on desktop */
  }
}
```

#### Hero Section
```css
.timeline-hero {
  min-height: 100svh;
  padding-block: var(--space-32);   /* 128px — generous breathing room */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
```

#### Container Gutters (verify these match style guide)
```css
.container {
  padding-inline: var(--space-6);   /* 24px — per style guide */
}
```

#### Text Containers (global pass)
Any `<p>`, `<blockquote>`, or text wrapper inside cards that lacks spacing:
```css
.timeline-card p + p {
  margin-top: var(--space-4);       /* 16px between paragraphs */
}

.timeline-card .card-content {
  padding-block: var(--space-2);    /* 8px breathing room inside text areas */
}
```

#### Image Spacing in Cards
```css
.timeline-card img {
  margin-block: var(--space-4);     /* 16px above and below images */
  border-radius: 12px;             /* per style guide */
}
```

### Screenshot-Safe Check
After applying spacing changes, verify each section on iPhone 14 viewport (390×844):
- [ ] Key visual + headline + one body line visible without scrolling
- [ ] No element cut off awkwardly at edges
- [ ] Background colors/gradients make screenshots look intentional

### Device Test Checklist
- [ ] iPhone SE (375px)
- [ ] iPhone 14 (390px)
- [ ] iPad (768px)
- [ ] Desktop (1280px+)
- [ ] Galaxy S21 (360px) — narrowest common Android

---

## 2. Signup as Its Own Prominent Section 🔴 P0

### Problem
Signup is currently the last timeline card (`isCTA: true` on the "Today" entry). It's buried in the timeline and visually identical to story cards. It should be a distinct, prominent CTA zone.

### What to Remove
- Remove the signup form rendering from the "Today" timeline section
- The "Today" card should end with its emotional content (the story about Punch growing up)
- `isCTA: true` should no longer trigger a form inside the timeline card

### New Component: `<SignupSection />`

**Placement:** After `<Timeline />`, before `<footer>`. Not inside the timeline — visually separate.

#### Layout

```
┌───────────────────────────────────────────────────────────┐
│  ═══════════════════════════════════════════════════════  │
│  (Punch Gold gradient bg)                                 │
│                                                           │
│                                                           │
│              Stay in Punch's Corner                       │
│              (Fraunces 900, --text-2xl → --text-3xl,      │
│               Deep Bark)                                  │
│                                                           │
│              Get milestone updates, new stories,          │
│              and the occasional monkey emoji.             │
│              (Outfit 300, --text-lg, Deep Bark 80%)       │
│                                                           │
│         ┌────────────────────────┬───────────┐            │
│         │ your@email.com         │ Sign Up 🐵│            │
│         └────────────────────────┴───────────┘            │
│                                                           │
│              Join 847 others following                     │
│              Punch's journey                              │
│              (Outfit 300, --text-sm, Soft Earth)           │
│                                                           │
│              No spam. Just monkey updates. 🐵              │
│              (Outfit 300, --text-xs, Soft Earth 70%)       │
│                                                           │
│                                                           │
│  ═══════════════════════════════════════════════════════  │
└───────────────────────────────────────────────────────────┘
```

#### Styling

```css
.signup-section {
  width: 100%;
  padding-block: var(--space-24);     /* 96px top/bottom */
  padding-inline: var(--space-6);     /* 24px gutters */
  background: linear-gradient(
    180deg,
    rgba(212, 160, 82, 0.08) 0%,
    rgba(212, 160, 82, 0.15) 50%,
    rgba(212, 160, 82, 0.08) 100%
  );
  text-align: center;
}

.signup-section__inner {
  max-width: 540px;
  margin-inline: auto;
}

.signup-section__headline {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: var(--text-2xl);        /* 32px mobile */
  color: var(--deep-bark);
  margin-bottom: var(--space-4);     /* 16px */
  letter-spacing: -0.02em;
}

@media (min-width: 768px) {
  .signup-section__headline {
    font-size: var(--text-3xl);      /* 40px tablet+ */
  }
}

.signup-section__subhead {
  font-family: var(--font-body);
  font-weight: 300;
  font-size: var(--text-lg);         /* 20px */
  color: rgba(61, 43, 31, 0.8);
  margin-bottom: var(--space-8);     /* 32px */
  line-height: 1.5;
}
```

#### Form Layout

**Mobile: stacked**
```css
.signup-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);                /* 12px */
  margin-bottom: var(--space-6);     /* 24px */
}

.signup-form__input {
  width: 100%;
  padding: 14px 16px;
  border: 1.5px solid rgba(61, 43, 31, 0.15);
  border-radius: 9999px;             /* pill shape to match button */
  font-size: 16px;                   /* prevents iOS zoom */
  font-family: var(--font-body);
  background: white;
  text-align: center;
}

.signup-form__input:focus {
  outline: none;
  border-color: var(--punch-gold);
  box-shadow: 0 0 0 3px rgba(212, 160, 82, 0.2);
}

.signup-form__btn {
  padding: 14px 32px;
  border-radius: 9999px;
  background: var(--deep-bark);       /* Dark bark, NOT gold — stands out against gold bg */
  color: white;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: var(--text-base);
  border: none;
  cursor: pointer;
  transition: background var(--duration-fast) var(--ease-default),
              transform 0.1s var(--ease-default);
  min-height: 48px;
}

.signup-form__btn:hover {
  background: #2A1F15;
  transform: translateY(-1px);
}

.signup-form__btn:active {
  transform: translateY(0);
}
```

**Desktop: inline (input + button on one row)**
```css
@media (min-width: 640px) {
  .signup-form {
    flex-direction: row;
    max-width: 480px;
    margin-inline: auto;
  }
  
  .signup-form__input {
    flex: 1;
    text-align: left;
    border-radius: 9999px 0 0 9999px;
    border-right: none;
  }
  
  .signup-form__btn {
    border-radius: 0 9999px 9999px 0;
    white-space: nowrap;
  }
}
```

#### Social Proof
```css
.signup-section__proof {
  font-family: var(--font-body);
  font-weight: 300;
  font-size: var(--text-sm);
  color: var(--soft-earth);
  margin-bottom: var(--space-2);
}
```
- Text: `"Join 847 others following Punch's journey"` (dynamic count from signup API if available, else hardcode and update manually)
- If count unavailable: omit this line entirely. Don't show "Join 0 others."

#### Fine Print
```css
.signup-section__fine-print {
  font-family: var(--font-body);
  font-weight: 300;
  font-size: var(--text-xs);
  color: rgba(139, 115, 85, 0.7);
}
```
- Text: `"No spam. Just monkey updates. 🐵"`

#### States
- **Default:** as above
- **Submitting:** button text → "Signing up..." + disable
- **Success:** entire form area replaced with: `"You're in! 🐒 Check your inbox."` (Fraunces 700, `--text-lg`, Punch Gold). Fade transition.
- **Error:** red text below input: `"Something went wrong. Try again?"` (Outfit 400, `--text-sm`, `var(--color-rose)`)
- **Already signed up** (if detectable via localStorage): show `"You're already in Punch's corner 🐒"` instead of form

---

## 3. Quiz Button ("I Am Punch") on Main Page 🟠 P1

### Problem
The mood quiz at `/i-am-punch` is only reachable via direct URL. It's discoverable by nobody.

### Solution: Floating Action Button (FAB) + Hero Secondary CTA

#### A. Floating Action Button `<QuizFAB />`

**Design:**
```css
.quiz-fab {
  position: fixed;
  bottom: var(--space-6);           /* 24px from bottom */
  right: var(--space-6);            /* 24px from right */
  z-index: 100;                     /* above content, below modals */
  
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  
  padding: 12px 20px;
  border-radius: 9999px;
  background: var(--punch-gold);
  color: white;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: var(--text-sm);
  
  box-shadow: 0 4px 16px rgba(212, 160, 82, 0.35);
  cursor: pointer;
  text-decoration: none;
  
  transition: transform var(--duration-fast) var(--ease-default),
              box-shadow var(--duration-fast) var(--ease-default),
              opacity var(--duration-normal) var(--ease-enter);
  
  min-height: 48px;                 /* touch target */
}

.quiz-fab:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 24px rgba(212, 160, 82, 0.45);
  color: white;
}

.quiz-fab:active {
  transform: scale(0.97);
}
```

**Content:** `"🐒 I Am Punch"` — emoji + text

**Visibility behavior:**
- **Hidden** when hero section is in viewport (don't show immediately — let the story begin)
- **Visible** once user scrolls past hero (Intersection Observer on hero element)
- Entrance: `opacity: 0 → 1`, `translateY(16px) → 0`, `var(--duration-normal)` (300ms)
- Exit (scrolling back to hero): reverse animation

```javascript
// Pseudo-code for FAB visibility
const heroRef = useRef(null);
const [showFab, setShowFab] = useState(false);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => setShowFab(!entry.isIntersecting),
    { threshold: 0 }
  );
  if (heroRef.current) observer.observe(heroRef.current);
  return () => observer.disconnect();
}, []);
```

**Mobile adjustments:**
- Bottom: `var(--space-8)` (32px) to clear system gesture zones
- Right: `var(--space-4)` (16px) — slightly closer to edge on small screens
- Ensure it doesn't overlap with any other fixed elements

**Link:** `<a href="/i-am-punch">` — simple navigation, no JavaScript required for the link itself

#### B. Hero Secondary CTA

In the hero section, below the main "Scroll to begin" hint, add a secondary link:

```
┌─────────────────────────────────┐
│                                 │
│         [hero content]          │
│                                 │
│         ↓ Scroll to begin       │
│                                 │
│    or   Take the Quiz →         │
│         (ghost button style)    │
│                                 │
└─────────────────────────────────┘
```

**Styling:**
```css
.hero-quiz-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-4);
  
  font-family: var(--font-body);
  font-weight: 400;
  font-size: var(--text-sm);
  color: var(--soft-earth);
  text-decoration: none;
  
  transition: color var(--duration-fast) var(--ease-default);
}

.hero-quiz-link:hover {
  color: var(--punch-gold);
}

.hero-quiz-link__prefix {
  font-weight: 300;
  color: rgba(139, 115, 85, 0.5);
  margin-right: var(--space-2);
}
```

**HTML:** `<span class="hero-quiz-link__prefix">or</span> <a href="/i-am-punch" class="hero-quiz-link">Take the Quiz →</a>`

- This is subtle — it shouldn't compete with "Scroll to begin"
- The FAB is the primary discovery mechanism; this is secondary

---

## 4. Clickable Timeline Cards → Detail Pages 🟡 P2

### Problem
Timeline cards show content inline but there's no way to dive deeper. poobz wants cards to be clickable and expand into rich detail pages.

### Solution: Route-Based Detail Pages

**Why routes over modals:** Each milestone becomes its own shareable URL. Better for SEO, social sharing, and direct linking. `/timeline/born`, `/timeline/viral`, etc.

#### A. Card Click Affordance

Make timeline cards visually communicate that they're clickable.

**Changes to existing `<TimelineSection />` cards:**

```css
.timeline-card--clickable {
  cursor: pointer;
  position: relative;
  transition: box-shadow var(--duration-normal) var(--ease-default),
              transform var(--duration-normal) var(--ease-default);
}

/* Hover lift — desktop only */
@media (hover: hover) {
  .timeline-card--clickable:hover {
    box-shadow: 0 8px 24px rgba(61, 43, 31, 0.12);
    transform: translateY(-2px);
  }
  
  .timeline-card--clickable:hover .card-expand-hint {
    opacity: 1;
  }
}

/* Active press */
.timeline-card--clickable:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(61, 43, 31, 0.1);
}

/* Expand hint — small arrow + text */
.card-expand-hint {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid rgba(61, 43, 31, 0.06);
  
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 400;
  color: var(--punch-gold);
  
  opacity: 0.6;
  transition: opacity var(--duration-fast) var(--ease-default);
}

.card-expand-hint__arrow {
  transition: transform var(--duration-fast) var(--ease-default);
}

.timeline-card--clickable:hover .card-expand-hint__arrow {
  transform: translateX(4px);
}
```

**Expand hint content:** `"Read the full story →"` — visible at bottom of every card. Mobile: always `opacity: 0.6`. Desktop: `opacity: 0.4`, `1.0` on hover.

**Implementation:** Wrap each `<TimelineSection>` card in `<Link to={/timeline/${section.id}}>`. Ensure the entire card is the click target.

#### B. Detail Page `<TimelineDetailPage />`

**Route:** `/timeline/:id` (e.g., `/timeline/born`, `/timeline/viral`)

**Layout:**

```
┌───────────────────────────────────────────────────────────┐
│                                                           │
│  ← Back to timeline                                      │
│  (ghost link, top-left, sticky)                           │
│                                                           │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  ┌─────────────────────────────────────────────────────┐  │
│  │                                                     │  │
│  │              [ HERO IMAGE ]                         │  │
│  │              full-bleed, 50vh max                   │  │
│  │                                                     │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                           │
│              JULY 26, 2025                                │
│              (JetBrains Mono, --text-xs, uppercase)       │
│                                                           │
│              Born at Ichikawa City Zoo                     │
│              (Fraunces 900, --text-3xl → --text-4xl)       │
│                                                           │
│              Rich body text. Multiple paragraphs.          │
│              More context than the timeline card.          │
│              Photos, videos, embedded tweets.              │
│              (Outfit 300, --text-base to --text-lg,        │
│               max-width: 65ch)                            │
│                                                           │
│              ┌─────────┐ ┌─────────┐ ┌─────────┐         │
│              │ [photo] │ │ [photo] │ │ [video] │         │
│              └─────────┘ └─────────┘ └─────────┘         │
│              (media gallery, responsive grid)             │
│                                                           │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  Sources                                                  │
│  • AP News — March 5, 2026                                │
│  • Mainichi — February 17, 2026                           │
│  (JetBrains Mono, --text-xs, Soft Earth, links)           │
│                                                           │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  ← Named After a Manga   │   The Viral Moment →          │
│  (prev/next chapter nav)                                  │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

**Back link:**
```css
.detail-back {
  position: sticky;
  top: 0;
  z-index: 50;
  padding: var(--space-4) var(--space-6);
  background: rgba(250, 245, 238, 0.9);     /* Warm Cream, translucent */
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 400;
  color: var(--soft-earth);
}

.detail-back a {
  color: var(--soft-earth);
  text-decoration: none;
}

.detail-back a:hover {
  color: var(--punch-gold);
}
```

**Hero image:**
```css
.detail-hero-image {
  width: 100vw;
  margin-left: calc(-50vw + 50%);     /* full-bleed breakout */
  max-height: 50vh;
  object-fit: cover;
  filter: sepia(8%) saturate(110%) brightness(102%);   /* per style guide */
}
```

**Date:**
```css
.detail-date {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--soft-earth);
  margin-top: var(--space-8);
  margin-bottom: var(--space-3);
}
```

**Title:**
```css
.detail-title {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: var(--text-3xl);          /* 40px mobile */
  color: var(--deep-bark);
  letter-spacing: -0.02em;
  margin-bottom: var(--space-8);
}

@media (min-width: 1024px) {
  .detail-title {
    font-size: 3.5rem;                 /* 56px desktop */
  }
}
```

**Body:**
```css
.detail-body {
  font-family: var(--font-body);
  font-weight: 300;
  font-size: var(--text-lg);            /* 20px — slightly larger than timeline cards */
  line-height: 1.7;
  color: var(--deep-bark);
  max-width: 65ch;
}

.detail-body p + p {
  margin-top: var(--space-6);           /* 24px between paragraphs */
}
```

**Media gallery:**
```css
.detail-media {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-4);
  margin-block: var(--space-8);
}

.detail-media__item {
  border-radius: 12px;
  overflow: hidden;
}

.detail-media__item img {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  filter: sepia(8%) saturate(110%) brightness(102%);
}
```

- Videos: facade pattern (poster image → load iframe on click)
- Tweets: use Twitter embed widget, lazy-loaded
- Images: native `loading="lazy"`, blur-up placeholder

**Chapter navigation (prev/next):**
```css
.detail-nav {
  display: flex;
  justify-content: space-between;
  padding-block: var(--space-8);
  margin-top: var(--space-12);
  border-top: 1px solid rgba(61, 43, 31, 0.08);
}

.detail-nav__link {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: var(--text-sm);
  color: var(--soft-earth);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-default);
}

.detail-nav__link:hover {
  color: var(--punch-gold);
}

.detail-nav__link--next {
  text-align: right;
}
```

#### C. Data Extension

Add `detailContent` to each entry in `timelineData.js`:

```javascript
{
  id: 'born',
  // ... existing fields ...
  detailContent: {
    bodyHtml: `<p>Punch was born on July 26, 2025, during a blistering 
    heatwave at Ichikawa City Zoo...</p>
    <p>His mother abandoned him almost immediately...</p>`,
    media: [
      { type: 'image', src: '/media/punch-baby.jpg', alt: 'Newborn Punch at the zoo', credit: 'Ichikawa City Zoo' },
      { type: 'tweet', url: 'https://x.com/ichikawa_zoo/status/...' },
    ],
    sources: [
      { label: 'Mainichi', url: 'https://mainichi.jp/...', date: '2026-02-17' },
    ],
  },
}
```

---

## 5. Source References on All Timeline Cards 🟠 P1

### Problem
The story is factual. Every claim should be traceable. Sources build credibility.

### Design

**Placement:** Bottom of each timeline card, below all content, above the "Read the full story →" expand hint.

```
┌───────────────────────────────────────┐
│                                       │
│  [card content]                       │
│                                       │
│  ─────────────────────────────────── │
│                                       │
│  📰 Source: AP News, Mar 5 2026 ↗    │
│                                       │
│  Read the full story →                │
│                                       │
└───────────────────────────────────────┘
```

**Multiple sources:**
```
│  📰 AP News (Mar 5) ↗ · CNN (Mar 4) ↗ · NYT (Mar 3) ↗  │
```

**Styling:**
```css
.card-sources {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-3);    /* 8px vertical, 12px horizontal */
  margin-top: var(--space-4);
  padding-top: var(--space-3);
  border-top: 1px solid rgba(61, 43, 31, 0.06);
}

.card-source {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);                   /* 4px */
  
  font-family: var(--font-mono);
  font-size: var(--text-xs);             /* 12px */
  font-weight: 400;
  color: var(--soft-earth);
  text-decoration: none;
  
  transition: color var(--duration-fast) var(--ease-default);
}

.card-source:hover {
  color: var(--punch-gold);
}

.card-source__icon {
  font-size: 10px;
  opacity: 0.5;
}

/* Separator between multiple sources */
.card-source + .card-source::before {
  content: '·';
  margin-right: var(--space-2);
  color: rgba(139, 115, 85, 0.3);
}
```

**External link icon:** Small `↗` arrow (inline text, not an SVG — keeps it lightweight).

**Link behavior:** `target="_blank" rel="noopener noreferrer"` — opens in new tab.

### Data

Add `sources` array to each entry in `timelineData.js`:

```javascript
// Source mapping from PM task breakdown:
{
  id: 'born',
  sources: [
    { label: 'Mainichi', url: 'https://mainichi.jp/english/articles/20260217/p2a/00m/0li/008000c', date: '2026-02-17' },
  ],
},
{
  id: 'named',
  sources: [
    { label: 'Ichikawa Zoo (X)', url: 'https://x.com/ichikawa_zoo/...', date: '2025-08' },
  ],
},
{
  id: 'viral',
  sources: [
    { label: '@tate_gf (X)', url: 'https://x.com/tate_gf/status/1892610050594455887', date: '2026-02-19' },
    { label: 'Ichikawa Zoo', url: 'https://x.com/ichikawa_zoo/...', date: '2026-02' },
  ],
},
{
  id: 'world',
  sources: [
    { label: 'NYT', url: 'https://nytimes.com/...', date: '2026-03' },
    { label: 'AP News', url: 'https://apnews.com/...', date: '2026-03-05' },
    { label: 'CNN', url: 'https://cnn.com/...', date: '2026-03' },
    { label: 'USA Today', url: 'https://usatoday.com/...', date: '2026-03' },
  ],
},
{
  id: 'growing',
  sources: [
    { label: 'AP News', url: 'https://apnews.com/...', date: '2026-03-05' },
    { label: 'Business Insider', url: 'https://businessinsider.com/...', date: '2026-03-03' },
  ],
},
{
  id: 'today',
  sources: [
    { label: 'Ichikawa Zoo (X)', url: 'https://x.com/ichikawa_zoo/...', date: '2026-03' },
  ],
},
```

**Rendering:** In `<TimelineSection />`, map `sources` array if present:
```jsx
{section.sources?.length > 0 && (
  <div className="card-sources">
    {section.sources.map((source, i) => (
      <a 
        key={i}
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card-source"
      >
        {source.label}
        {source.date && ` (${formatShortDate(source.date)})`}
        <span className="card-source__icon">↗</span>
      </a>
    ))}
  </div>
)}
```

**Date formatting:** `formatShortDate('2026-03-05')` → `"Mar 5"` — short month + day, no year (same year implied).

### Detail Pages
On detail pages (`/timeline/:id`), show the full source list with complete dates:

```css
.detail-sources {
  margin-top: var(--space-8);
  padding-top: var(--space-6);
  border-top: 1px solid rgba(61, 43, 31, 0.08);
}

.detail-sources__title {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--soft-earth);
  margin-bottom: var(--space-4);
}

.detail-sources__list {
  list-style: none;
  padding: 0;
}

.detail-sources__item {
  padding: var(--space-2) 0;
}

.detail-sources__item a {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--soft-earth);
}

.detail-sources__item a:hover {
  color: var(--punch-gold);
}

.detail-sources__date {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: rgba(139, 115, 85, 0.6);
  margin-left: var(--space-2);
}
```

---

## Implementation Order

1. **Padding/spacing** (2–3h) — global CSS changes, test on devices
2. **Signup section** (2–3h) — new component, remove CTA from timeline
3. **Source references** (2–3h) — add data, render component
4. **Quiz FAB** (1–2h) — new component, Intersection Observer
5. **Detail pages** (full day+) — new route, data extension, media gallery

Items 1–3 are Sprint 1. Items 4–5 are Sprint 2.
