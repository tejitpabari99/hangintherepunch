# PM Task Breakdown — UI Improvements + Progress Tracker

**Date:** March 8, 2026  
**Author:** PM Agent  
**Status:** Ready for dev/UX pickup  

---

## Priority Legend

- 🔴 **P0** — Do first, high impact, low effort
- 🟠 **P1** — Do next, high impact, moderate effort
- 🟡 **P2** — Important but can wait for next sprint
- ⚪ **P3** — Nice-to-have / polish

---

## Part A: UI Improvements (from poobz)

### 1. More Padding Throughout the Site 🔴 P0

**Why:** poobz explicitly called this out. The site feels cramped. The style guide already defines generous spacing (`--space-24` / `--space-32` for section padding) but implementation may have drifted.

#### UX Tasks
- [ ] **UX-PAD-1:** Audit every section on mobile (375px) and desktop (1280px). Screenshot current state vs. desired state. Flag any section where content touches edges or feels tight.
- [ ] **UX-PAD-2:** Define specific padding increases per component. Recommendation:
  - Timeline cards: increase `padding` from current to `var(--space-8)` mobile / `var(--space-12)` desktop
  - Hero section: increase `padding-block` to `var(--space-32)` minimum
  - Between timeline sections: ensure `gap` is at least `var(--space-16)` mobile / `var(--space-24)` desktop
  - Container gutters: ensure `padding-inline: var(--space-6)` (24px) per style guide

#### Dev Tasks
- [ ] **DEV-PAD-1:** Update `Timeline.css` — increase spacing between `.timeline-track` children. Add `gap: var(--space-16)` or equivalent margin.
- [ ] **DEV-PAD-2:** Update `TimelineSection` card padding to `var(--space-8)` on mobile, `var(--space-12)` on desktop.
- [ ] **DEV-PAD-3:** Update `.timeline-hero` — ensure `min-height: 100svh` with generous internal padding so nothing feels squeezed.
- [ ] **DEV-PAD-4:** Global pass — add `padding-block: var(--space-6)` to any text container that doesn't have it.
- [ ] **DEV-PAD-5:** Verify on real devices: iPhone SE (375px), iPhone 14 (390px), iPad (768px), desktop (1280px+).

---

### 2. Separate Signup Into Its Own Prominent Section 🔴 P0

**Why:** Signup is currently rendered as the last timeline card (`isCTA: true` on the "Today" entry in `timelineData.js`). It's buried. Poobz wants it prominent.

#### UX Tasks
- [ ] **UX-SIGNUP-1:** Design a standalone signup section that lives BELOW the timeline but ABOVE the footer. Full-width, distinct background (suggestion: Punch Gold gradient or warm cream with gold border).
- [ ] **UX-SIGNUP-2:** Section should include:
  - Headline: "Stay in Punch's Corner" (keep existing copy — it's good)
  - Subhead: "Get milestone updates, new stories, and the occasional monkey emoji."
  - Email input + CTA button (pill style per style guide)
  - Social proof: "Join X others following Punch's journey" (if count available)
  - Fine print: "No spam. Just monkey updates. 🐵"
- [ ] **UX-SIGNUP-3:** Design should be visually distinct from timeline cards — this is a CTA zone, not a story card.

#### Dev Tasks
- [ ] **DEV-SIGNUP-1:** Remove `isCTA: true` rendering from the "Today" timeline section. The "Today" card should end with the emotional content, not a form.
- [ ] **DEV-SIGNUP-2:** Create a new `<SignupSection />` component (or repurpose `Signup` with a new `variant="section"`). Place it in `TimelinePage` AFTER `<Timeline />`.
- [ ] **DEV-SIGNUP-3:** Style the section: full-width, `padding-block: var(--space-24)`, distinct background gradient, centered content (`max-width: 480px` for the form).
- [ ] **DEV-SIGNUP-4:** Keep the existing `/api/signup` endpoint integration — just move the UI.

---

### 3. Quiz Button ("I Am Punch") Accessible From Main Page 🟠 P1

**Why:** The mood quiz (`/i-am-punch`) exists but is only reachable via direct URL. Poobz wants it discoverable from the main page.

#### UX Tasks
- [ ] **UX-QUIZ-1:** Decide placement (pick ONE — discuss with poobz):
  - **Option A: Floating Action Button (FAB)** — bottom-right corner, always visible. Emoji: 🐒 or ✨. Label: "I Am Punch". Collapses to icon on scroll-down, expands on scroll-up.
  - **Option B: Hero CTA** — secondary button in the hero section: "Take the quiz → I Am Punch". Below the "Scroll to begin" hint.
  - **Option C: Nav bar** — add a minimal sticky nav with just the quiz link + site title.
  - **Recommendation:** Option A (FAB) for maximum discoverability without disrupting the scroll experience. Option B as a secondary placement.
- [ ] **UX-QUIZ-2:** Design the FAB. Pill shape, Punch Gold bg, white text, subtle shadow. `44px` min touch target. Entrance animation: fade-in after scrolling past hero (don't show immediately — let the story begin first).

#### Dev Tasks
- [ ] **DEV-QUIZ-1:** Create `<QuizFAB />` component. Fixed position, bottom-right, `z-index` above content but below modals. Links to `/i-am-punch`.
- [ ] **DEV-QUIZ-2:** Show FAB only after user scrolls past the hero section (use Intersection Observer on hero element, show FAB when hero is out of viewport).
- [ ] **DEV-QUIZ-3:** Add a secondary CTA to the hero section: `<a href="/i-am-punch">` styled as a ghost button below the scroll hint.
- [ ] **DEV-QUIZ-4:** Respect `prefers-reduced-motion` for FAB entrance animation.

---

### 4. Timeline Cards → Expandable Detail Pages 🟡 P2

**Why:** Timeline cards currently show `content` + `detail` inline. Poobz wants cards to be clickable and expand into richer detail views with more photos, videos, and info.

#### UX Tasks
- [ ] **UX-EXPAND-1:** Design the expanded detail view. Two options:
  - **Option A: Full-page route** — `/timeline/born`, `/timeline/viral`, etc. Each is a rich article page with a back button. Better for SEO and sharing.
  - **Option B: Modal/overlay** — card expands in-place or opens a fullscreen overlay. Smoother UX, no route change, but harder to share.
  - **Recommendation:** Option A (route-based) for shareability. Each milestone becomes its own shareable page.
- [ ] **UX-EXPAND-2:** Design the detail page layout:
  - Hero image (full-bleed)
  - Date + title (Fraunces, large)
  - Rich body text (longer form content from research)
  - Media gallery: photos, embedded tweets, YouTube videos
  - Source references (see task #5)
  - "← Back to timeline" link + "Next chapter →" navigation
- [ ] **UX-EXPAND-3:** Design the "clickable" indicator on timeline cards — subtle arrow icon, hover shadow lift, cursor pointer. Visual affordance that cards are interactive.

#### Dev Tasks
- [ ] **DEV-EXPAND-1:** Extend `timelineData.js` — add `detailContent` object to each entry:
  ```js
  detailContent: {
    bodyHtml: '...', // rich text or markdown
    media: [
      { type: 'image', src: '...', alt: '...', credit: '...' },
      { type: 'video', src: '...', poster: '...' },
      { type: 'tweet', url: '...' },
    ],
    sources: [
      { label: 'AP News', url: '...', date: '...' },
    ],
  }
  ```
- [ ] **DEV-EXPAND-2:** Create `<TimelineDetail />` page component. Route: `/timeline/:id`.
- [ ] **DEV-EXPAND-3:** Add route to `App.jsx`: `<Route path="/timeline/:id" element={<TimelineDetailPage />} />`.
- [ ] **DEV-EXPAND-4:** Make timeline cards clickable — wrap in `<Link to={/timeline/${section.id}}>`. Add hover styles (shadow lift, subtle scale).
- [ ] **DEV-EXPAND-5:** Populate `detailContent` using media from `punch-media-links.md`. Match media to timeline sections by date/topic.
- [ ] **DEV-EXPAND-6:** Build media gallery component — lazy-loaded images, embedded tweets (use Twitter embed widget), YouTube embeds (facade pattern — poster-only until click).

---

### 5. Source References on All Timeline Cards 🟠 P1

**Why:** The story is factual. Every claim should be traceable to a source. This builds credibility and protects against "is this real?" skepticism.

#### UX Tasks
- [ ] **UX-SRC-1:** Design source display on cards. Recommendation:
  - Small, muted text at bottom of each card: "Source: AP News, Mar 5 2026" with link icon
  - On detail pages: full source list with dates and links
  - Style: JetBrains Mono, `--text-xs`, Soft Earth color
- [ ] **UX-SRC-2:** Multiple sources per card are fine. Use comma-separated inline list on cards, bulleted list on detail pages.

#### Dev Tasks
- [ ] **DEV-SRC-1:** Add `sources` array to each entry in `timelineData.js`:
  ```js
  sources: [
    { label: 'Ichikawa City Zoo', url: 'https://x.com/ichikawa_zoo/...', date: '2026-02-05' },
    { label: 'AP News', url: 'https://apnews.com/...', date: '2026-03-05' },
  ]
  ```
- [ ] **DEV-SRC-2:** Render sources at the bottom of `<TimelineSection />`. Map from `punch-media-links.md` to populate:
  - `born` → Mainichi photo gallery, zoo X posts
  - `named` → Zoo X account, Wikipedia (Monkey Punch)
  - `oranmama` → Zoo statements, Mainichi article
  - `mountain` → Zoo X post (2026-01-19 integration)
  - `viral` → @tate_gf X post (11M views), zoo statement on bullying
  - `world` → NYT, CNN, AP, Guardian, IKEA posts, USA Today (5,200 visitors)
  - `growing` → AP (Mar 5), Business Insider (Mar 3), Fox News (Mar 2)
  - `today` → Latest zoo X updates
- [ ] **DEV-SRC-3:** Style per UX spec — small, unobtrusive, links open in new tab (`target="_blank" rel="noopener"`).

---

## Part B: New Feature — Progress Tracker

### Overview

Visual milestone board showing Punch's socialization journey. Vertical progress path with completed/current/future milestones. This is the #1 retention feature — gives people a reason to return.

**Location:** New section on the main page (between timeline and signup section), AND its own route `/progress` for direct linking.

### Milestones (from research)

| # | Milestone | Date | Source | Status |
|---|-----------|------|--------|--------|
| 1 | Born at Ichikawa City Zoo | Jul 26, 2025 | Mainichi | ✅ Complete |
| 2 | Abandoned by mother | Jul 2025 | Zoo statements | ✅ Complete |
| 3 | Hand-raised by zookeepers | Jul–Dec 2025 | Zoo X account | ✅ Complete |
| 4 | Given Oran-Mama (IKEA Djungelskog) | Fall 2025 | Zoo statements | ✅ Complete |
| 5 | Integrated into Monkey Mountain | Jan 19, 2026 | Zoo X post | ✅ Complete |
| 6 | First viral moment | ~Feb 5, 2026 | @ichikawa_zoo X | ✅ Complete |
| 7 | Bullied by adult monkey | Feb 19, 2026 | @tate_gf X, 11M+ views | ✅ Complete |
| 8 | IKEA donates 33 toys | Feb 17, 2026 | Mayor's X post, USA Today | ✅ Complete |
| 9 | Playing with baby monkeys | Feb 23, 2026 | Zoo X update | ✅ Complete |
| 10 | Eating independently | Feb 23, 2026 | Zoo X update | ✅ Complete |
| 11 | Using plushie less | Mar 5, 2026 | AP News, The Independent | ✅ Complete |
| 12 | **Sleeping with other monkeys** | TBD | Zoo director quote (AP) | ⏳ CURRENT GOAL |
| 13 | Fully accepted into troop | TBD | — | ⬜ Future |
| 14 | Outgrows plushie completely | TBD | — | ⬜ Future |

### UX Tasks

- [ ] **UX-PROG-1:** Design the progress tracker as a vertical milestone path. Visual language:
  - Completed milestones: filled Punch Gold circles, solid connecting line, full content visible
  - Current milestone: **pulsing** gold circle with glow effect (CSS animation, `box-shadow` pulse), highlighted card
  - Future milestones: gray circles, dashed connecting line, dimmed text, no date
- [ ] **UX-PROG-2:** Each milestone node shows:
  - Circle indicator (filled/pulsing/gray)
  - Date (JetBrains Mono, uppercase, `--text-xs`)
  - Title (Fraunces, `--text-lg`)
  - 1–2 sentence description (Outfit, `--text-base`)
  - Source link (small, Soft Earth color): "Source: AP News →"
- [ ] **UX-PROG-3:** Design the "Notify me" CTA that appears after the current milestone:
  - Placement: right after the pulsing milestone, before the grayed future ones
  - Copy: "Get notified when Punch reaches his next milestone"
  - Email input + submit button (reuse signup form pattern)
  - Make it feel like you're subscribing to THIS specific moment, not a generic newsletter
- [ ] **UX-PROG-4:** Design the progress summary bar — a thin horizontal bar at the top of the section showing "11 of 14 milestones reached" with a fill animation. Optional but high visual impact.
- [ ] **UX-PROG-5:** Mobile: single column, milestones stacked vertically. Desktop: can keep same vertical layout (don't force horizontal — vertical scrolling is natural for a journey). Max-width 600px centered.
- [ ] **UX-PROG-6:** Design empty/loading state (skeleton placeholders matching milestone card shapes).

### Dev Tasks

- [ ] **DEV-PROG-1:** Create data file `src/data/milestoneData.js`:
  ```js
  export const milestones = [
    {
      id: 'born',
      title: 'Born at Ichikawa City Zoo',
      date: '2025-07-26',
      dateLabel: 'July 26, 2025',
      description: 'Punch is born during a heatwave. His mother abandons him almost immediately.',
      status: 'complete', // 'complete' | 'current' | 'future'
      source: { label: 'Mainichi', url: 'https://mainichi.jp/english/articles/20260217/p2a/00m/0li/008000c' },
    },
    // ... all 14 milestones
  ];
  ```
- [ ] **DEV-PROG-2:** Create `<ProgressTracker />` component. Renders milestone list with visual state per `status` field.
- [ ] **DEV-PROG-3:** Implement the pulsing effect on the current milestone:
  ```css
  .milestone--current .milestone-dot {
    animation: pulse 2s ease-in-out infinite;
    box-shadow: 0 0 0 0 rgba(212, 160, 82, 0.4);
  }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(212, 160, 82, 0.4); }
    50% { box-shadow: 0 0 0 12px rgba(212, 160, 82, 0); }
  }
  ```
- [ ] **DEV-PROG-4:** Future milestones: `opacity: 0.4`, dashed connecting line (`border-left: 2px dashed #D4CCC4`), no date shown.
- [ ] **DEV-PROG-5:** Implement "Notify me" email CTA. Reuse existing `/api/signup` endpoint — add a `source: 'milestone'` field to the payload so we can segment later.
- [ ] **DEV-PROG-6:** Add route in `App.jsx`: `<Route path="/progress" element={<ProgressPage />} />`.
- [ ] **DEV-PROG-7:** Also embed a compact version of the tracker in the main `TimelinePage`, placed between the timeline and the new signup section.
- [ ] **DEV-PROG-8:** Scroll-reveal animation: milestones fade in as user scrolls, staggered by 100ms per milestone. Respect `prefers-reduced-motion`.
- [ ] **DEV-PROG-9:** Progress summary bar at top: simple `<div>` with width percentage. Animate on scroll into view.
- [ ] **DEV-PROG-10:** Make milestone data easy to update — when new milestones are confirmed, a dev should only need to change the `status` field and add a date/source to the next entry.

---

## Implementation Order (Recommended Sprint Plan)

### Sprint 1 (This Week) — Quick Wins
1. 🔴 **DEV-PAD-1 through PAD-5** — padding fixes (2–3 hours)
2. 🔴 **DEV-SIGNUP-1 through SIGNUP-4** — move signup to standalone section (2–3 hours)
3. 🟠 **DEV-SRC-1 through SRC-3** — add source references (2–3 hours)

### Sprint 2 (Next Week) — New Features
4. 🟠 **DEV-QUIZ-1 through QUIZ-4** — quiz FAB button (1–2 hours)
5. 🟠 **DEV-PROG-1 through PROG-10** — progress tracker (full day)

### Sprint 3 — Rich Content
6. 🟡 **DEV-EXPAND-1 through EXPAND-6** — expandable detail pages (full day+)

---

## Open Questions for poobz

1. **Quiz button placement:** FAB (floating bottom-right) vs. hero CTA vs. both?
2. **Progress tracker:** standalone page only, or also embedded in main timeline page?
3. **Detail pages:** route-based (`/timeline/born`) or modal overlay?
4. **Signup section copy:** Keep "Stay in Punch's Corner" or try something new?
5. **Progress tracker notify:** Same email list as main signup, or separate segment?
