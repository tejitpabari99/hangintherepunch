# PM Spec — "The Comfort Object Confessional"

**Date:** March 8, 2026  
**Author:** PM Agent  
**Status:** HIDDEN COMPONENT — do not add visible routes until poobz approves  
**Priority:** Feature spec ready for dev

---

## Overview

An anonymous submission wall where visitors share their comfort objects. Prompt: **"Punch has his Djungelskog. What's yours?"** Submissions appear as cards in a masonry grid. Each card has a "me too ❤️" counter so visitors can resonate with others' confessions. No accounts. No names. Just honest, vulnerable, anonymous sharing.

**Why this feature:** Punch's story resonates because everyone has been Punch — clinging to something for comfort when the world is hard. A childhood blanket. A song. A person. This feature transforms passive empathy ("poor Punch") into active self-reflection ("I am Punch, and here's my Djungelskog"). It creates community, emotional investment, and shareable content — all without requiring identity.

---

## User Stories

### Core
- **US-CONF-1:** As a visitor, I want to anonymously share my comfort object so I can connect with Punch's story on a personal level.
- **US-CONF-2:** As a visitor, I want to browse other people's confessions so I feel less alone in needing comfort.
- **US-CONF-3:** As a visitor, I want to tap "me too ❤️" on confessions that resonate with me.
- **US-CONF-4:** As a visitor, I want to see confessions in a visually beautiful layout that feels warm, not clinical.
- **US-CONF-5:** As a visitor, I want the experience to feel safe and anonymous — no account, no identity.

### Secondary
- **US-CONF-6:** As a visitor, I want to filter/sort confessions (newest, most "me too"s, random).
- **US-CONF-7:** As a visitor, I want to share a specific confession card on social media.
- **US-CONF-8:** As a returning visitor, I want to see new confessions since my last visit.
- **US-CONF-9:** As an admin, I want to moderate submissions to prevent abuse.
- **US-CONF-10:** As a visitor, I want to optionally add an emoji that represents my comfort object.

---

## Acceptance Criteria

### Submission Flow
- [ ] Prominent prompt at top: "Punch has his Djungelskog. What's yours?"
- [ ] Single text input below prompt. Placeholder: "My old teddy bear that's missing an eye..."
- [ ] Character limit: 280 characters (tweet-length — enough for a confession, not an essay).
- [ ] Optional: emoji picker (single emoji) to represent the object. Default: 🧸
- [ ] Submit button: "Confess 🤫"
- [ ] After submission: confirmation message "Your confession is being reviewed 🐒" (if moderation queue is active) OR card appears immediately in the wall (if auto-approved).
- [ ] No account required. No name field. No email. Fully anonymous.
- [ ] One submission per visitor per hour (rate limit by IP hash).

### Confession Wall
- [ ] Masonry layout — Pinterest-style, responsive columns:
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 3 columns
- [ ] Each card shows:
  - Emoji (large, top of card): 🧸 or visitor-chosen emoji
  - Confession text (Outfit font, `--text-base`)
  - "me too ❤️" button with count
  - Relative timestamp: "2 hours ago", "3 days ago"
- [ ] Cards have warm cream background, `border-radius: 16px`, subtle shadow per style guide.
- [ ] Cards vary slightly in height based on text length (natural masonry feel).
- [ ] Infinite scroll — load 20 cards at a time, fetch more on scroll.
- [ ] Default sort: "trending" (mix of recency + "me too" count, weighted toward recent).
- [ ] Sort options (small toggle, not prominent): Trending | Newest | Most ❤️
- [ ] New confessions animate in with fade-up (per style guide scroll reveal pattern).

### "Me Too ❤️" Interaction
- [ ] Tap "me too ❤️" → heart fills/animates, count increments.
- [ ] One "me too" per confession per visitor (tracked via localStorage, not auth).
- [ ] Cannot "me too" your own confession (tracked by IP hash match within session).
- [ ] Heart animation: subtle scale bounce + color fill (empty heart → filled red heart).
- [ ] Optimistic UI — increment immediately, reconcile on next fetch.

### Sharing
- [ ] Each card has a small share icon (appears on hover/desktop, always visible on mobile).
- [ ] Share generates a card image (OG image) with:
  - The confession text
  - The emoji
  - "me too" count
  - hangintherepunch.com branding
  - Warm cream background with Punch Gold accent
- [ ] Share URL: `hangintherepunch.com/confess?id=abc123`
- [ ] OG meta tags on share URL for rich link previews.

### Performance
- [ ] Initial load: 20 cards, < 2 seconds on 3G.
- [ ] Infinite scroll: fetch next 20, render < 500ms.
- [ ] Masonry layout: CSS-only (CSS `columns` or CSS Grid `masonry`) — no JS layout library.
- [ ] Total page weight < 100KB (excluding images — there are no images, just text cards).

---

## Data Model

### `confessions` table

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID (v4) | Primary key |
| `text` | VARCHAR(280) | Confession text |
| `emoji` | VARCHAR(10) | Single emoji (default: 🧸) |
| `me_too_count` | INTEGER | Default 0, denormalized for fast reads |
| `status` | ENUM | `pending` / `approved` / `rejected` |
| `ip_hash` | VARCHAR(64) | SHA-256 of IP (rate limiting + self-detection) |
| `flag_reason` | VARCHAR(255) | If auto-flagged, why (nullable) |
| `reviewed_by` | VARCHAR(50) | Admin who reviewed (nullable) |
| `reviewed_at` | TIMESTAMP | When reviewed (nullable) |
| `created_at` | TIMESTAMP | UTC |

### `me_toos` table

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID (v4) | Primary key |
| `confession_id` | UUID | FK to confessions |
| `ip_hash` | VARCHAR(64) | SHA-256 of IP (one per confession per IP) |
| `created_at` | TIMESTAMP | UTC |

**Unique constraint:** `(confession_id, ip_hash)` — prevents duplicate "me too"s.

### Indexes
- `idx_confessions_status_created` on `(status, created_at DESC)` — primary query
- `idx_confessions_status_metoo` on `(status, me_too_count DESC)` — "most loved" sort
- `idx_confessions_ip_hash` on `(ip_hash, created_at)` — rate limiting
- `idx_metoos_confession` on `(confession_id, ip_hash)` — duplicate check

### Privacy
- **No raw IPs stored.** SHA-256 hash only.
- **No identification.** No cookies for tracking identity, only localStorage for "me too" UI state.
- **Confessions are anonymous.** No attempt to correlate confessions to individuals.
- **Admin reviews see text only.** No IP data exposed in moderation UI.

---

## API Endpoints

### `POST /api/confess`

Submit a confession.

**Request:**
```json
{
  "text": "A ratty old blanket I've had since I was 3. It barely exists anymore.",
  "emoji": "🛏️"
}
```

**Response (201):**
```json
{
  "id": "a1b2c3d4-...",
  "status": "approved",
  "message": "Your confession has been added 🐒"
}
```

Or if queued for moderation:
```json
{
  "id": "a1b2c3d4-...",
  "status": "pending",
  "message": "Your confession is being reviewed 🐒"
}
```

**Errors:**
- `429` — Rate limited (already confessed in last hour)
- `400` — Text empty or exceeds 280 chars
- `422` — Text flagged as harmful (auto-rejected)

**Server-Side Logic:**
1. Validate text (length, not empty).
2. Hash IP, check rate limit (1 per hour).
3. Run text through moderation pipeline (see below).
4. If auto-approved → `status: approved`, visible immediately.
5. If flagged → `status: pending`, enters moderation queue.
6. If hard-reject (slurs, hate) → `status: rejected`, return 422.

### `GET /api/confessions?sort={trending|newest|popular}&cursor={id}&limit=20`

Fetch confessions for the wall.

**Response (200):**
```json
{
  "confessions": [
    {
      "id": "a1b2c3d4-...",
      "text": "A ratty old blanket I've had since I was 3.",
      "emoji": "🛏️",
      "meTooCount": 47,
      "createdAt": "2026-03-08T14:30:00Z"
    }
  ],
  "nextCursor": "e5f6g7h8-...",
  "hasMore": true
}
```

**Only returns `status: approved` confessions.** Cursor-based pagination for infinite scroll.

**Sort logic:**
- `trending`: Score = `me_too_count * 1.0 + recency_bonus` where recency_bonus decays over 48 hours. Hot + recent wins.
- `newest`: `created_at DESC`
- `popular`: `me_too_count DESC, created_at DESC`

### `POST /api/confessions/:id/metoo`

Send a "me too" on a confession.

**Request:** (empty body — IP hash used for dedup)

**Response (200):**
```json
{
  "meTooCount": 48,
  "alreadyDone": false
}
```

If already done: `{ "meTooCount": 48, "alreadyDone": true }` (idempotent, no error).

### `GET /api/confessions/:id`

Get a single confession (for share card / OG image rendering).

**Response (200):**
```json
{
  "id": "a1b2c3d4-...",
  "text": "A ratty old blanket I've had since I was 3.",
  "emoji": "🛏️",
  "meTooCount": 47,
  "createdAt": "2026-03-08T14:30:00Z"
}
```

### Admin Endpoints (protected, require admin auth)

### `GET /api/admin/confessions/queue?status=pending&limit=50`

Fetch moderation queue.

### `PATCH /api/admin/confessions/:id`

Approve or reject.

**Request:**
```json
{
  "status": "approved",
  "reviewedBy": "poobz"
}
```

---

## Moderation Strategy

### Three-Tier Pipeline

#### Tier 1: Hard Filter (Instant, Automated)
- **Blocklist:** Maintain a list of slurs, hate speech terms, explicit sexual content.
- **Library:** `bad-words` npm package + custom additions specific to this context.
- **URL filter:** Reject any text containing URLs/links (spam prevention).
- **Result:** If match → `status: rejected` immediately. No human review needed.
- **User experience:** Generic error message, no indication of what triggered it.

#### Tier 2: AI Soft Filter (Fast, Automated)
- **Service:** OpenAI Moderation API (free) or Perspective API (Google, free).
- **Check for:** Harassment, self-harm content, personal information (phone numbers, addresses), targeted hate.
- **Threshold:** If moderation score > 0.7 → `status: pending` (queued for human review).
- **Threshold:** If score > 0.9 → `status: rejected` (auto-reject, too risky).
- **Result:** Borderline content goes to manual queue. Clearly bad content is auto-rejected.

#### Tier 3: Manual Review Queue
- **Who reviews:** poobz (initially). Can add moderators later.
- **Interface:** Simple admin page at `/admin/moderate` (protected by password or auth token).
- **Queue shows:** Confession text, emoji, flag reason (from AI), created timestamp.
- **Actions:** Approve ✅ / Reject ❌ / Edit (fix typos, redact personal info) ✏️
- **SLA:** Review within 24 hours. If not reviewed within 48h, auto-approve (assumption: if the AI only soft-flagged it, it's probably fine).

### What Gets Through (Examples)
- ✅ "My mom's old sweater. She passed 3 years ago."
- ✅ "A specific pillow I flip to the cold side every night lol"
- ✅ "My dog. He's not an object but he's my comfort. 🐕"
- ✅ "Minecraft. Seriously. Building things calms me down."
- ✅ "音楽 (Music)" — non-English confessions are fine

### What Gets Flagged (Examples)
- ⏳ "My ex's hoodie... is that weird?" — AI might flag "ex" context, human approves
- ⏳ Confessions with mild profanity — human decides

### What Gets Rejected (Examples)
- ❌ Slurs, hate speech, harassment
- ❌ Links to external sites
- ❌ Personal information (phone numbers, full names, addresses)
- ❌ Explicit sexual content
- ❌ Spam / promotional content

### Scaling Plan
- **Phase 1 (launch):** Auto-approve most, manual queue for flagged. poobz reviews.
- **Phase 2 (>1K submissions):** Tighter AI filter, more auto-approve for clean content, batch review for flagged.
- **Phase 3 (>10K submissions):** Consider community moderation ("report" button on cards) or trusted user moderators.

---

## Tech Recommendations

### Frontend
- **Masonry layout:** CSS `columns` property (simplest, no JS dependency):
  ```css
  .confessional-wall {
    columns: 1;
    column-gap: var(--space-4);
  }
  @media (min-width: 640px) { .confessional-wall { columns: 2; } }
  @media (min-width: 1024px) { .confessional-wall { columns: 3; } }
  
  .confession-card {
    break-inside: avoid;
    margin-bottom: var(--space-4);
  }
  ```
- **Infinite scroll:** Intersection Observer on a sentinel element at the bottom. Fetch next page on intersect.
- **"Me too" state:** Store `Set` of confession IDs in `localStorage`. Check before rendering filled/unfilled heart.
- **Emoji picker:** Lightweight inline selector — show 20 popular emojis (🧸🛏️🎵🐕🎮📖☕🧣🌙💊🎧🍫🐈🧶🏠🌊🎨🪴🍵🫂). Custom emoji input for anything else.

### Backend
- **Vercel Serverless Functions** — same as other endpoints.
- **Database:** Same Vercel Postgres / Supabase instance as hug map.
- **AI Moderation:** OpenAI Moderation API — free, fast, one HTTP call per submission.
- **OG Image generation:** `@vercel/og` (Satori) — generates share card images server-side for social previews.

### Caching
- `GET /api/confessions` responses: CDN cache 60 seconds (stale-while-revalidate).
- `GET /api/confessions/:id` responses: CDN cache 5 minutes (individual cards don't change often).
- "Me too" counts: accept eventual consistency (up to 60s stale is fine).

---

## UI/UX Notes

### Visual Design
- Section background: Warm Cream (`#FAF5EE`), consistent with site.
- Prompt text: Fraunces 700, `--text-2xl`, Deep Bark. The question should feel intimate, like a friend asking.
- Card backgrounds: White (`#FFFFFF`), `border-radius: 16px`, `box-shadow: 0 1px 3px rgba(61, 43, 31, 0.08)`.
- Card emoji: Centered at top of card, `font-size: 2rem`.
- Card text: Outfit 400, `--text-base`, Deep Bark.
- "Me too ❤️" button: Bottom of card. Muted style (Soft Earth color) until tapped, then Blush Pink with filled heart.
- Timestamp: JetBrains Mono, `--text-xs`, Soft Earth.

### Interaction Flow
1. Visitor arrives, sees prompt: "Punch has his Djungelskog. What's yours?"
2. Below: text input with placeholder and submit button.
3. Below that: masonry wall of existing confessions.
4. Visitor reads others' confessions, taps "me too ❤️" on ones that resonate.
5. Visitor types their own confession, picks an emoji, submits.
6. Card appears in wall (if auto-approved) with a highlight animation.
7. Optional: share button on their card for social media.

### Mobile Considerations
- Single column layout, full-width cards with `padding: var(--space-6)`.
- Submission form is sticky at top (scrolls with page, not fixed — no viewport blocking).
- "Me too" button has `44px` touch target minimum.
- Infinite scroll works naturally with mobile scroll behavior.

### Empty State
- If fewer than 5 confessions (launch day): show 5–10 seed confessions from the team.
- Suggested seed confessions:
  - 🧸 "A stuffed elephant named Gerald. He's been through 3 moves and a divorce."
  - 🎵 "The same Radiohead album. Every time life gets hard."
  - 🛏️ "My childhood blanket. I'm 34."
  - ☕ "My morning coffee routine. It's the only part of the day that's mine."
  - 🐕 "My dog. She doesn't judge."

---

## Hidden Component Implementation

```jsx
// In App.jsx — DO NOT add to visible navigation
<Route path="/confess" element={<ConfessionalPage />} />
```

- No link in nav, footer, or any other component.
- Accessible only via direct URL for testing.
- Feature flag: `REACT_APP_FEATURE_CONFESSIONAL=true` to completely hide/show.

---

## Metrics to Track

- Total confessions (all time)
- Confessions per day (submission rate)
- Average "me too" count per confession
- Moderation queue size + average review time
- Auto-approve rate vs. flagged rate vs. rejected rate
- Share card generation rate
- Return visit rate (do people come back to browse?)

---

## Open Questions

1. **Moderation at launch:** Start with auto-approve + post-hoc review? Or start with queue-first (all pending until approved)? Recommendation: auto-approve with AI filter for launch, switch to queue if problems arise.
2. **Emoji:** Free-form emoji input or curated picker? Free-form is more expressive but risks misuse (flag emojis, etc.).
3. **Seed content:** How many seed confessions? Should they be marked as "from the team" or blend in?
4. **Threading:** Should people be able to reply to confessions? (Recommendation: NO for v1 — keep it simple, one-way sharing.)
5. **Categories/tags:** Should confessions be taggable? (Recommendation: NO for v1 — organic browsing is better than forced categorization.)
6. **Internationalization:** Non-English confessions welcome? If so, AI moderation needs multilingual support (OpenAI handles this well).
