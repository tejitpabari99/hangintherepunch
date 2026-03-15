# PM Spec — "Send Punch a Hug" (Global Hug Map)

**Date:** March 8, 2026  
**Author:** PM Agent  
**Status:** HIDDEN COMPONENT — do not add visible routes until poobz approves  
**Priority:** Feature spec ready for dev

---

## Overview

An interactive world map where visitors tap/click to "send Punch a hug." Each hug creates a glowing dot at the visitor's approximate location. A live counter shows total hugs and countries represented. Visitors can optionally add a 1-sentence note. After hugging, they get a shareable card: "I'm hug #X 🐒❤️"

**Why this feature:** Punch's story resonates because people feel protective of him. This gives that feeling a tangible outlet — you can't actually hug Punch, but you can add your warmth to a global constellation of people who care. It's emotional, visual, shareable, and creates community without requiring accounts.

---

## User Stories

### Core
- **US-HUG-1:** As a visitor, I want to send Punch a hug so I can express my support.
- **US-HUG-2:** As a visitor, I want to see my hug appear on a world map so I feel part of a global community.
- **US-HUG-3:** As a visitor, I want to see how many total hugs Punch has received so I feel the scale of love.
- **US-HUG-4:** As a visitor, I want to see how many countries have sent hugs so I understand the global reach.
- **US-HUG-5:** As a visitor, I want to add a short note with my hug so I can personalize my support.
- **US-HUG-6:** As a visitor, I want a shareable card showing my hug number so I can share on social media.

### Secondary
- **US-HUG-7:** As a visitor, I want to see other people's notes (anonymously) to feel connected.
- **US-HUG-8:** As a returning visitor, I want to see the map has grown since my last visit.
- **US-HUG-9:** As a mobile visitor, I want the map to work smoothly on my phone.
- **US-HUG-10:** As a visitor, I want the experience to feel warm and emotional, not clinical.

---

## Acceptance Criteria

### Hug Submission
- [ ] Visitor taps a "Send a Hug" button (large, prominent, warm gold).
- [ ] Browser requests geolocation permission OR falls back to IP-based approximate location.
- [ ] If geolocation denied: use IP geolocation (country/city level — never exact address).
- [ ] A glowing dot appears at the visitor's approximate location on the map with a brief particle animation.
- [ ] Counter increments immediately (optimistic update).
- [ ] Visitor is prompted (optional): "Add a note for Punch (1 sentence)" — text input, 140 char max.
- [ ] After submission, show shareable card overlay.
- [ ] One hug per visitor per 24 hours (rate limited by IP + fingerprint, not hard auth).
- [ ] No account required. Ever.

### Map Display
- [ ] World map renders on page load with existing hug dots.
- [ ] Dots have a subtle glow effect (CSS `box-shadow` with rgba gold).
- [ ] Dense areas show as brighter/larger glowing regions (cluster rendering).
- [ ] Map is pannable and zoomable on desktop; pinch-zoom on mobile.
- [ ] Initial view: zoomed to show all dots, centered on wherever density is highest.
- [ ] Map style: dark/muted base (think warm charcoal, not pure black) with gold dots. Matches site's warm palette.
- [ ] Dots from the last 24 hours have a slightly brighter glow (recency indicator).
- [ ] Clicking/tapping a dot cluster shows a tooltip: "42 hugs from Tokyo 🇯🇵"

### Counter
- [ ] Displays at top of section: "🤗 12,847 hugs from 94 countries"
- [ ] Counter animates up on page load (count-up animation from 0 to current value, ~2 seconds).
- [ ] Updates in real-time via polling (every 30s) or WebSocket if feasible.
- [ ] Country count derived from unique country codes in the dataset.

### Share Card
- [ ] After sending a hug, overlay appears with a styled card:
  - "I'm hug #12,847 🐒❤️"
  - "I sent Punch a hug from [City, Country]"
  - hangintherepunch.com branding
  - Share buttons: Copy link, X/Twitter, Instagram story (generates image)
- [ ] Card is a downloadable PNG (canvas-rendered or server-generated).
- [ ] Share URL: `hangintherepunch.com/hug?id=12847` — opens the map zoomed to that hug's region.

### Notes (Optional)
- [ ] Notes are anonymous — no name, no account.
- [ ] 140 character limit, single line.
- [ ] Basic profanity filter (see Moderation section).
- [ ] Notes visible on hover/tap over dots: "Hang in there little guy 🥺 — Tokyo, Japan"
- [ ] A scrolling "latest notes" ticker below the map (last 10 notes, auto-rotating).

### Performance
- [ ] Map renders < 3 seconds on 3G mobile.
- [ ] Handle 100K+ dots without lag (cluster rendering required).
- [ ] Initial data payload: only cluster data, not individual dots. Load dot details on zoom.
- [ ] Hug submission response < 500ms.

---

## Data Model

### `hugs` table

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID (v4) | Primary key |
| `hug_number` | SERIAL | Auto-incrementing hug count (for "I'm hug #X") |
| `lat` | FLOAT | Latitude (rounded to 2 decimal places for privacy — ~1km precision) |
| `lng` | FLOAT | Longitude (rounded to 2 decimal places) |
| `country_code` | VARCHAR(2) | ISO 3166-1 alpha-2 |
| `city` | VARCHAR(100) | Approximate city name (from IP or geolocation) |
| `note` | VARCHAR(140) | Optional message (nullable) |
| `note_approved` | BOOLEAN | Default `true` — set to `false` if flagged by filter |
| `ip_hash` | VARCHAR(64) | SHA-256 of IP (for rate limiting, never stored raw) |
| `created_at` | TIMESTAMP | UTC |

### `hug_stats` materialized view / cache

| Field | Type | Description |
|-------|------|-------------|
| `total_hugs` | INTEGER | Total count |
| `total_countries` | INTEGER | Distinct country codes |
| `last_updated` | TIMESTAMP | Cache freshness |

### Indexes
- `idx_hugs_created` on `created_at` (for recency queries)
- `idx_hugs_country` on `country_code` (for country count)
- `idx_hugs_ip_hash` on `ip_hash, created_at` (for rate limiting)
- `idx_hugs_geo` on `lat, lng` (for cluster queries)

### Privacy
- **Never store raw IP addresses.** Only hashed.
- **Round coordinates** to 2 decimal places (~1km). No one needs to know the exact house.
- **No cookies, no tracking, no accounts.** Rate limiting via IP hash only.
- **Notes are anonymous.** No attempt to identify authors.

---

## API Endpoints

### `POST /api/hug`

Send a hug.

**Request:**
```json
{
  "lat": 35.68,
  "lng": 139.77,
  "note": "Hang in there Punch! 🐒"
}
```

**Response (201):**
```json
{
  "hugNumber": 12847,
  "id": "a1b2c3d4-...",
  "city": "Tokyo",
  "countryCode": "JP",
  "totalHugs": 12847,
  "totalCountries": 94
}
```

**Errors:**
- `429` — Rate limited (already hugged in last 24h)
- `400` — Invalid coordinates or note too long
- `422` — Note flagged by profanity filter (hug still counted, note dropped)

**Rate Limiting:** 1 hug per IP hash per 24 hours. Return `retryAfter` timestamp on 429.

**Server-Side Logic:**
1. Hash IP, check rate limit.
2. Round lat/lng to 2 decimal places.
3. Reverse geocode to get city + country (use free service: ip-api.com or MaxMind GeoLite2).
4. If note present, run through profanity filter. If flagged, set `note_approved = false`, still create the hug.
5. Insert row, increment `hug_number`.
6. Update cached stats.

### `GET /api/hugs/stats`

Get current totals.

**Response (200):**
```json
{
  "totalHugs": 12847,
  "totalCountries": 94,
  "lastHugAt": "2026-03-08T14:30:00Z"
}
```

**Cache:** Aggressive — cache for 30 seconds at CDN layer.

### `GET /api/hugs/clusters?zoom={z}&bounds={swLat,swLng,neLat,neLng}`

Get clustered hug data for map rendering.

**Response (200):**
```json
{
  "clusters": [
    { "lat": 35.68, "lng": 139.77, "count": 4201, "label": "Tokyo, JP" },
    { "lat": 40.71, "lng": -74.01, "count": 892, "label": "New York, US" }
  ]
}
```

**Logic:** Server-side clustering (grid-based or supercluster algorithm) based on zoom level. At low zoom: country-level clusters. At high zoom: city-level or individual dots.

### `GET /api/hugs/recent?limit=10`

Get latest notes for the ticker.

**Response (200):**
```json
{
  "notes": [
    { "note": "Hang in there! 🐒", "city": "Tokyo", "countryCode": "JP", "createdAt": "..." },
    { "note": "You're so brave Punch", "city": "London", "countryCode": "GB", "createdAt": "..." }
  ]
}
```

**Filter:** Only return `note_approved = true` entries.

### `GET /api/hug/:id`

Get a specific hug for share card rendering.

**Response (200):**
```json
{
  "hugNumber": 12847,
  "city": "Tokyo",
  "countryCode": "JP",
  "createdAt": "2026-03-08T14:30:00Z"
}
```

---

## Tech Recommendations

### Map Library
**Recommendation: [MapLibre GL JS](https://maplibre.org/)** (free, open-source fork of Mapbox GL JS)
- WebGL-rendered: handles 100K+ points smoothly
- Clustering built-in via GeoJSON source
- Custom styling: can match warm site palette
- Free tile sources: Stadia Maps, MapTiler (free tier), or self-hosted
- ~200KB gzipped (code-split, lazy load)

**Alternative:** Leaflet + Leaflet.markercluster — lighter (~40KB) but less polished for the glowing dots effect.

**Map tiles:** Use a dark warm-toned style. Stadia Alidade Smooth Dark or custom MapTiler style with warm browns/charcoals instead of cool grays.

### Backend
- **Vercel Serverless Functions** (already used for `/api/signup`) — add hug endpoints here
- **Database:** Vercel Postgres (built-in) or Supabase (free tier: 500MB, more than enough)
- **Geolocation fallback:** MaxMind GeoLite2 database (free, self-hosted lookup — no API call needed per request)
- **Profanity filter:** `bad-words` npm package for basic filter + custom blocklist

### Share Card Generation
- **Client-side:** Use `html2canvas` or `@vercel/og` (Satori) to render the share card as a PNG
- **Server-side alternative:** `/api/hug/:id/card` endpoint that returns an OG image (for link previews on social media)

### Real-Time Updates (Optional, V2)
- Vercel doesn't natively support WebSocket, so use polling (30s interval) for counter updates
- If real-time matters later: Ably or Pusher free tier (100 concurrent connections)

---

## UI/UX Notes

### Visual Design
- Map section background: warm charcoal (`#2A2420`) — dark enough for gold dots to glow
- Hug dots: `#D4A052` (Punch Gold) with `box-shadow: 0 0 8px rgba(212, 160, 82, 0.6)`
- Recent dots (< 24h): brighter glow, slight pulse animation
- "Send a Hug" button: large pill, Punch Gold, centered above/below map. `font-size: --text-lg`. Emoji prefix: 🤗
- On tap: ripple animation emanating from the dot, then subtle particles (CSS only, not JS particles)
- Counter: Fraunces display font, large numbers, JetBrains Mono for "hugs" / "countries" labels

### Interaction Flow
1. Visitor sees map with existing dots + counter
2. Taps "Send Punch a Hug 🤗"
3. Browser asks for location (or falls back to IP)
4. Dot appears with glow animation ✨
5. Counter ticks up
6. Optional note prompt slides up: "Add a note for Punch? (optional)"
7. Share card appears: "I'm hug #12,847 🐒❤️" with share buttons
8. Card dismisses, visitor sees their dot on the map

### Mobile Considerations
- Map takes full viewport width, ~60vh height
- "Send a Hug" button sticky at bottom of map view
- Share card is a bottom sheet, not a centered modal
- Counter is compact: "12.8K hugs • 94 countries"

---

## Moderation

### Automated
- `bad-words` npm package with custom additions (slurs, hate speech terms)
- Reject notes containing URLs (spam prevention)
- Max 140 chars enforced server-side
- Flag but don't block: if a note is borderline, store it with `note_approved = false`. Hug still counts.

### Manual (V2)
- Admin endpoint `GET /api/admin/hugs/flagged` to review flagged notes
- Simple approve/reject interface (can be a basic admin page, doesn't need to be fancy)

---

## Metrics to Track

- Total hugs (all time)
- Hugs per day (growth rate)
- Countries reached (expansion)
- Note submission rate (% of huggers who add a note)
- Share card generation rate (% who click share)
- Share card click-through rate (people arriving via shared links)

---

## Hidden Component Implementation

```jsx
// In App.jsx — DO NOT add to visible navigation
// Route exists but is not linked from anywhere until poobz says go
<Route path="/hug" element={<HugMapPage />} />
```

- No link in nav, footer, or any other component
- Accessible only via direct URL for testing
- Feature flag: `REACT_APP_FEATURE_HUG_MAP=true` (env var) to completely hide/show

---

## Open Questions

1. **Location permission UX:** Show a friendly explanation before the browser prompt? ("We just need your approximate area to place your hug on the map — we never store your exact location")
2. **Returning visitors:** Should they see their previous hug highlighted? (Requires cookie/localStorage)
3. **Hug milestones:** Celebrate round numbers? ("You're hug #10,000! 🎉")
4. **Sound:** Subtle chime on hug? (Off by default, toggle-able)
5. **Hug animations:** How elaborate? Simple dot glow vs. heart particles vs. ripple wave
