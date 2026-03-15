# Email Signup Spec — "Stay Close"

## Placement

The signup lives as **Section S9** in the timeline, immediately after the "Today" live section and before the footer. It is NOT a popup, NOT a sticky bar, NOT a modal. It's a natural part of the story flow.

**Why here:** The user has just traveled through Punch's entire journey. They're emotionally invested. The "Today" section tells them the story is ongoing. The signup is the answer to "how do I keep following this?"

### Secondary Placement (optional, v2)

A minimal inline signup can also appear mid-timeline — specifically after **S5 ("I Am Punch" / viral moment)**, the emotional peak. This would be a smaller, less prominent version:

```
┌──────────────────────────────────┐
│  This story isn't over.          │
│  [email@example.com] [→]        │
└──────────────────────────────────┘
```

One line. Appears with the same scroll-reveal as other content. Easy to scroll past. Not pushy.

---

## Primary Signup — Section S9

### Layout (Mobile)

```
┌──────────────────────────────────┐
│                                  │
│         [Small Punch             │
│          illustration:           │
│          looking up,             │
│          hopeful]                │
│                                  │
│     "Punch's story isn't         │
│      over. Neither is yours."    │
│                                  │
│     Get updates when something   │
│     happens. No spam. Just       │
│     Punch.                       │
│                                  │
│  ┌────────────────────────────┐  │
│  │  your@email.com            │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │     Stay Close  →          │  │
│  └────────────────────────────┘  │
│                                  │
│     We'll email you maybe        │
│     once a week. Unsubscribe     │
│     anytime.                     │
│                                  │
└──────────────────────────────────┘
```

### Layout (Desktop, 1024px+)

Same content, but constrained to a centered card (`max-width: 480px`):

```
┌──────────────────────────────────────────────────┐
│                                                  │
│          ┌──────────────────────────┐            │
│          │   [Punch illustration]   │            │
│          │                          │            │
│          │  "Punch's story isn't    │            │
│          │   over. Neither is       │            │
│          │   yours."                │            │
│          │                          │            │
│          │  Get updates when        │            │
│          │  something happens.      │            │
│          │  No spam. Just Punch.    │            │
│          │                          │            │
│          │  [email    ] [Stay Close]│            │
│          │                          │            │
│          │  Once a week. Unsub      │            │
│          │  anytime.                │            │
│          └──────────────────────────┘            │
│                                                  │
└──────────────────────────────────────────────────┘
```

On desktop, email field and button sit on the same row (inline form).

---

## Visual Treatment

### Background

Section background: `Blush Pink` at 30% opacity over `Warm Cream` — subtly different from surrounding sections. Just enough to feel like a pause in the story.

Alternative: Soft gradient from `Warm Cream` → `Blush Pink (20%)` → `Warm Cream`.

### Card (Desktop)

- `background: white`
- `border-radius: 20px`
- `box-shadow: 0 4px 24px rgba(61, 43, 31, 0.06)`
- `padding: 48px 40px`
- Centered horizontally

### Illustration

Small, warm illustration of Punch looking up — hopeful expression. Same style as mood generator illustrations (line art, warm monochrome, one accent color). Approximately `120px` height on mobile, `160px` on desktop.

---

## Copy

### Headline
**"Punch's story isn't over. Neither is yours."**

Alternatives (A/B test candidates):
- "Never miss a Punch moment"
- "Stay in Punch's corner"
- "Keep holding on"

### Body
**"Get updates when something happens. No spam. Just Punch."**

### Button
**"Stay Close →"**

Alternatives:
- "Hold On 🧸"
- "I'm Here →"

### Fine Print
**"We'll email you maybe once a week. Unsubscribe anytime."**

The word "maybe" is intentional — it feels honest and human, not corporate.

### Placeholder
**"your@email.com"**

---

## Input & Button Specs

### Email Input

```css
.signup-input {
  width: 100%;
  padding: 14px 16px;
  font-family: 'Outfit', system-ui, sans-serif;
  font-size: 16px;               /* Prevents iOS zoom */
  font-weight: 400;
  color: #3D2B1F;                /* Deep Bark */
  background: #FFFFFF;
  border: 1.5px solid #D4CCC4;
  border-radius: 12px;
  outline: none;
  transition: border-color 200ms, box-shadow 200ms;
}

.signup-input:focus {
  border-color: #D4A052;         /* Punch Gold */
  box-shadow: 0 0 0 3px rgba(212, 160, 82, 0.2);
}

.signup-input::placeholder {
  color: #8B7355;                /* Soft Earth */
  opacity: 0.7;
}
```

### Submit Button

```css
.signup-button {
  width: 100%;                    /* Full width on mobile */
  padding: 14px 32px;
  font-family: 'Outfit', system-ui, sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #FFFFFF;
  background: #D4A052;           /* Punch Gold */
  border: none;
  border-radius: 9999px;         /* Pill */
  cursor: pointer;
  transition: transform 150ms, box-shadow 150ms, background 150ms;
}

.signup-button:hover {
  background: #C49042;
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(212, 160, 82, 0.3);
}

.signup-button:active {
  transform: scale(0.98);
}

/* Desktop: inline with input */
@media (min-width: 1024px) {
  .signup-form {
    display: flex;
    gap: 12px;
  }
  .signup-input {
    flex: 1;
  }
  .signup-button {
    width: auto;
    white-space: nowrap;
  }
}
```

---

## States

### Default
Form visible, standard styling.

### Loading (after submit)
- Button text changes to a small spinner (CSS-only, 16px circle, white)
- Input becomes `readonly`
- Button becomes `pointer-events: none`

### Success
Entire form area crossfades (300ms) to:

```
┌──────────────────────────────────┐
│                                  │
│         🧸                       │
│                                  │
│    "You're in Punch's corner     │
│     now."                        │
│                                  │
│    We'll be in touch.            │
│                                  │
└──────────────────────────────────┘
```

The 🧸 emoji can optionally be replaced with a small animation (plushie with a subtle bounce).

Save signup state to `localStorage` so returning visitors see the success state without re-submitting.

### Error
- Input border turns `#C44D4D` (warm red, not harsh)
- Error text below input: "That doesn't look right — try again?" in `Soft Earth` color
- Shake animation on input: `translateX` oscillation (quick, 300ms, 3 cycles, ±4px)

### Already Subscribed (localStorage check)
Show success state directly. Don't make them feel like they need to re-enter.

---

## Technical

### Backend
Minimal. Options:
1. **Buttondown** — simple email newsletter API, free tier works
2. **ConvertKit** — more features if needed later
3. **Custom:** POST to `/api/subscribe` → store in DB → send confirmation

### Request
```
POST /api/subscribe
Content-Type: application/json

{
  "email": "user@example.com",
  "source": "timeline",          // or "mid-timeline" for secondary placement
  "section": "s9"                // which section they signed up from
}
```

### Validation
- Client-side: HTML5 `type="email"` + basic regex check before submit
- Server-side: proper email validation, rate limiting (5 attempts per IP per hour)
- Double opt-in: send confirmation email before adding to list

### Privacy
- No tracking pixels in signup form
- Email stored, nothing else
- Link to privacy policy in fine print
- GDPR-compliant: explicit consent via submission act

---

## Animation

### Entry
Section enters with standard scroll reveal (fade up, 400ms). Form elements stagger:
1. Illustration (0ms)
2. Headline (100ms)
3. Body text (200ms)
4. Form (300ms)
5. Fine print (400ms)

### Micro-interactions
- Input focus: border color transition (200ms) + box-shadow bloom
- Button hover: scale + shadow (150ms)
- Success transition: crossfade (300ms) with slight scale-up on the success message (1.0 → 1.02)

---

## Metrics

Track:
- `signup_form_viewed` — section enters viewport
- `signup_input_focused` — user taps/clicks the input
- `signup_submitted` — form submitted
- `signup_success` — confirmation received
- `signup_error` — error state shown
- `signup_source` — which placement (primary S9 or secondary mid-timeline)

**Conversion funnel:** viewed → focused → submitted → confirmed. Target: 3-5% of timeline completers sign up.
