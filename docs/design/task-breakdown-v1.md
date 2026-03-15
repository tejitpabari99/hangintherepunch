# Task Breakdown v1 — hangintherepunch.com Redesign
**Date:** 2026-03-07  
**PM:** PM Agent  
**Inputs:** Social research round 1, poobz's 5 UI priorities, current codebase audit

---

## Executive Summary

We're bundling the new **Progress Tracker** feature with all 5 of poobz's UI fixes into one cohesive redesign pass. The goal: transform the site from a static story into a living, trackable journey that gives people a reason to come back.

**Priority order:**
1. 🔴 **P0 — Spacing & Polish** (quick wins, immediate visual improvement)
2. 🔴 **P0 — Standalone Signup Section** (unlock email collection)
3. 🟠 **P1 — Quiz CTA on Main Page** (surface existing feature)
4. 🟠 **P1 — Progress Tracker** (new feature, biggest impact)
5. 🟡 **P2 — Clickable/Expandable Cards** (detail pages)
6. 🟡 **P2 — Source References** (credibility layer)

---

## UX TASKS

### UX-1: Global Spacing Pass (P0)
**Goal:** More breathing room throughout. Site currently feels tight.

**Specs:**
- Increase `--section-padding` from `4rem` to `6rem` (desktop) / `4rem` (mobile)
- Timeline card internal padding: bump `.timeline-text` from `var(--space-lg)` (~1.5rem) to `2rem` desktop
- Hero section: add `var(--space-8)` (~2rem) bottom padding before scroll hint
- Gap between timeline cards: increase from current `var(--section-padding)` to `5rem` minimum
- Footer padding: increase from `var(--space-2xl)` to `6rem` vertical
- **Key principle:** Don't just add padding everywhere — add *vertical rhythm*. Sections should breathe between each other, not just internally.

**Deliverable:** Updated spacing values (can be a token update doc or marked-up wireframe showing before/after).

---

### UX-2: Standalone Signup Section Design (P0)
**Goal:** Pull signup out of the last timeline card. Give it its own full-width section between the timeline and footer.

**Current state:** Signup lives inside the "Today" timeline card via `isCTA: true`. It's buried — users have to scroll through the entire timeline to find it.

**Design direction:**
- Full-width section with its own background treatment (subtle gradient or warm cream → slightly darker)
- Centered layout, max-width ~600px
- Headline: "Stay in Punch's Corner" (keep existing) or rework to tie into progress tracker: **"Get Notified When Punch Hits His Next Milestone"**
- Subheadline referencing the living nature of the story
- Email input + CTA button (existing form, new visual treatment)
- Trust line: "No spam. Just monkey updates. 🐵" (keep)
- Consider adding a small milestone preview above the form (e.g., "Next milestone: Sleeping with other monkeys 🐒")
- This section should feel like a **pause point** — distinct from the timeline, inviting, not salesy

**Deliverable:** Section layout wireframe with copy suggestions.

---

### UX-3: Quiz CTA on Main Page (P1)
**Goal:** Surface the "I Am Punch" mood generator from the main page. Currently only linked in the footer.

**Design direction — Two placements:**

1. **Sticky/floating CTA button** (bottom-right corner, appears after scrolling past hero)
   - Small pill button: "🐒 What Punch are you?" 
   - Subtle entrance animation (slide up from bottom)
   - Doesn't interfere with reading experience
   - Disappears when user reaches footer (where the existing link is)

2. **Inline section between timeline and signup** (or between signup and footer)
   - Card-style callout: "Take the quiz → What Punch moment are you today?"
   - Preview of one quiz result card (teaser)
   - Links to /mood

**Deliverable:** Mockup of both placements. Dev can implement whichever poobz prefers (or both).

---

### UX-4: Progress Tracker Design (P1) ⭐ NEW FEATURE
**Goal:** Visual milestone board showing Punch's socialization journey — past, present, and future.

**Concept:** Vertical progress path (not horizontal — matches our timeline vibe). Each milestone is a node on the path. Completed ones are filled/colored. Current one pulses. Future ones are grayed/outlined.

**Layout specs:**
- New route: `/progress` (or section on main page — TBD, I lean toward **both**: a preview section on main page + full page at /progress)
- **Main page preview:** Compact horizontal or mini-vertical showing current milestone with "See full progress →" link
- **Full page:** Vertical path, left-aligned on desktop (simpler than alternating timeline)

**Milestone data (15 milestones):**
| # | Milestone | Date | Status | Source |
|---|-----------|------|--------|--------|
| 1 | Born at Ichikawa City Zoo | Jul 26, 2025 | ✅ | Mainichi |
| 2 | Abandoned by mother | Jul 2025 | ✅ | Zoo statement |
| 3 | Hand-raised by zookeepers | Jul-Dec 2025 | ✅ | Zoo statement |
| 4 | Given Oran-Mama plushie | Fall 2025 | ✅ | Zoo/IKEA |
| 5 | Moved to Monkey Mountain | Jan 19, 2026 | ✅ | Zoo X post |
| 6 | First viral moment | ~Feb 5, 2026 | ✅ | X/TikTok |
| 7 | Bullied by adult monkey | Feb 19, 2026 | ✅ | 11M+ view video |
| 8 | IKEA donates 33 toys | Feb 17, 2026 | ✅ | Mayor's X post |
| 9 | Playing with baby monkeys | Feb 23, 2026 | ✅ | Zoo update |
| 10 | Eating independently | Feb 23, 2026 | ✅ | Zoo update |
| 11 | First grooming from peer | ~Feb 2026 | ✅ | Zoo/news |
| 12 | Using plushie less | Mar 5, 2026 | ✅ | AP News |
| 13 | Sleeping with other monkeys | TBD | ⏳ NEXT | Zoo director stated goal |
| 14 | Fully accepted into troop | TBD | ⬜ | — |
| 15 | Outgrows plushie completely | TBD | ⬜ | — |

**Visual treatment:**
- Completed milestones: Solid gold dot, date + title visible, source link icon
- **Current milestone (12):** Pulsing glow animation, expanded card showing latest info
- **Next target (13):** Outlined dot, slightly visible, "NEXT GOAL" label
- Future milestones: Faded/grayed dots with titles only
- Vertical line connecting all dots (matches timeline spine aesthetic)
- At the bottom of the tracker: **Email CTA** — "Get notified when Punch hits his next milestone 🐒"

**Mobile:** Same vertical layout, full-width, compact text

**Deliverable:** Wireframe of full progress page + main-page preview section. Color/style should match existing design tokens (gold for completed, grey for future, green pulse for current).

---

### UX-5: Expandable Card Detail Pages (P2)
**Goal:** Each timeline card becomes clickable → opens a detail page with more content, embedded media, and source links.

**Current state:** Cards show title, body text, detail text, and a gradient placeholder. Not clickable.

**Design direction:**
- Cards get a subtle "click to explore" affordance (small arrow icon, cursor change, hover state)
- Click → navigates to `/story/{id}` (e.g., `/story/born`, `/story/viral`)
- Detail page layout:
  - Hero image/video area (using media from research links)
  - Full narrative text (expanded from current `content` + `detail`)
  - Embedded media gallery (zoo posts, news photos, videos)
  - Source citations at bottom
  - "← Previous Chapter" / "Next Chapter →" navigation
  - Back to timeline link

**Media sources available:** 200+ links in `punch-media-links.md` — Getty photos, YouTube videos, zoo X posts, news articles. We can embed tweets, YouTube players, and link to articles.

**Deliverable:** Detail page wireframe showing content zones + media placement.

---

### UX-6: Source References on Cards (P2)
**Goal:** Add credibility. Every card should cite its sources.

**Design direction:**
- Small "Sources" footer at bottom of each timeline card
- Collapsed by default (just "📎 Sources" with count), expandable on click
- Shows linked article titles: "AP News — Mar 5, 2026", "Zoo statement — Feb 23"
- On detail pages: full bibliography-style source list
- Non-intrusive — shouldn't distract from the story flow

**Deliverable:** Card footer mockup showing collapsed + expanded states.

---

## DEV TASKS

### DEV-1: Global Spacing Update (P0)
**Depends on:** UX-1 (or can proceed with the specs above)

**Changes:**
- `globals.css`: Increase `--section-padding` to `6rem`, add `--section-padding-mobile: 4rem`
- `Timeline.css`: Update `.timeline-section` padding, `.timeline-text` internal padding
- `TimelinePage.jsx`: Footer padding increase
- Add media query breakpoints for responsive spacing adjustments
- Test on mobile (320px, 375px, 768px) and desktop (1024px, 1440px)

**Estimate:** Small — mostly CSS token changes.

---

### DEV-2: Extract Signup to Standalone Section (P0)
**Depends on:** UX-2

**Changes:**
- Remove `isCTA` logic from `TimelineSection.jsx` (stop rendering Signup inside last card)
- Remove `isCTA: true` from last entry in `timelineData.js` (or keep the flag but don't render signup there)
- Create new component: `SignupSection.jsx` — full-width section wrapping existing `Signup` component
- Add `SignupSection` to `TimelinePage.jsx` between `<Timeline />` and `<footer>`
- Update Signup copy to reference progress tracker (once DEV-4 lands)
- Style new section with its own background treatment

**Estimate:** Small-medium. Mostly restructuring existing components.

---

### DEV-3: Quiz CTA Component (P1)
**Depends on:** UX-3

**Changes:**
- Create `QuizCTA.jsx` — floating button component with scroll-triggered visibility
- Add to `TimelinePage.jsx` 
- Use `useIntersectionObserver` (already exists) to show/hide based on scroll position
- Create inline quiz section component if doing the card-style placement too
- Link to `/mood`

**Estimate:** Small.

---

### DEV-4: Progress Tracker Feature (P1) ⭐ NEW
**Depends on:** UX-4

**Changes:**
- Create `src/data/progressData.js` — milestone data array with dates, descriptions, sources, status (complete/current/next/future)
- Create `src/components/ProgressTracker/ProgressTracker.jsx` — full progress page component
- Create `src/components/ProgressTracker/ProgressTracker.css`
- Create `src/components/ProgressTracker/Milestone.jsx` — individual milestone node
- Create `src/components/ProgressTracker/ProgressPreview.jsx` — compact version for main page
- Create `src/pages/ProgressPage.jsx` — route wrapper
- Update `App.jsx`: Add route `/progress`
- Add `ProgressPreview` to `TimelinePage.jsx` (between timeline and signup section)
- Pulsing animation on current milestone (CSS keyframes)
- Email CTA at bottom of progress page (reuse Signup component with different copy)

**Estimate:** Medium-large. New feature, but straightforward component work.

---

### DEV-5: Clickable Cards + Detail Pages (P2)
**Depends on:** UX-5

**Changes:**
- Extend `timelineData.js`: Add `sources` array and `media` array to each entry
- Make `TimelineSection` cards clickable — wrap in `<Link to={/story/${section.id}}>` or use `navigate()`
- Add hover affordance (arrow icon, subtle animation)
- Create `src/pages/StoryDetailPage.jsx` — dynamic detail page
- Create `src/components/StoryDetail/` — hero, media gallery, source list, chapter nav components
- Update `App.jsx`: Add route `/story/:id`
- Media embeds: YouTube iframe, Twitter/X embed script, linked images
- Navigation between chapters (prev/next)

**Estimate:** Medium-large. Most work is in the detail page layout and media embedding.

---

### DEV-6: Source References on Cards (P2)
**Depends on:** UX-6, partially DEV-5 (shared data)

**Changes:**
- Extend `timelineData.js`: Add `sources` array to each section (title, url, date)
- Create `SourceFooter.jsx` — collapsible source list component
- Add to `TimelineSection.jsx` below detail text
- Expand/collapse toggle with animation
- On detail pages: render full source list (ties into DEV-5)

**Estimate:** Small.

---

## Implementation Order

```
Phase 1 (Ship fast — visual polish):
  DEV-1 (spacing) → can start immediately
  DEV-2 (signup section) → needs UX-2 wireframe

Phase 2 (New features):  
  DEV-4 (progress tracker) → needs UX-4 wireframe
  DEV-3 (quiz CTA) → needs UX-3 mockup

Phase 3 (Depth):
  DEV-5 (detail pages) → needs UX-5 wireframe
  DEV-6 (sources) → can start with DEV-5 or independently
```

**Phase 1 can start NOW** — spacing is pure CSS, signup extraction is straightforward restructuring.

**Phase 2 needs UX designs** but Dev can scaffold the data structures and routing while waiting.

**Phase 3 is the richest but can ship incrementally** — even partial detail pages (text-only, no media) add value.

---

## Data Architecture Note

The `timelineData.js` needs to evolve. Current shape:
```js
{ id, title, date, content, detail, emoji, colors... }
```

Target shape:
```js
{ 
  id, title, date, content, detail, emoji, colors,
  sources: [{ title, url, date, type }],
  media: [{ type: 'image'|'video'|'tweet', url, caption }],
  milestoneIds: ['born', 'abandoned'],  // links to progress data
}
```

And new `progressData.js`:
```js
{
  id, title, date, description, status: 'complete'|'current'|'next'|'future',
  source: { title, url },
  timelineSectionId: 'born',  // back-link to timeline
}
```

This lets timeline cards, detail pages, progress tracker, and sources all draw from the same data.
