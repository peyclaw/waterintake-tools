## Design Context

### Users
Search visitors asking "how much water should I drink?" — arriving via Google with a specific body and lifestyle, wanting a personalized number in under 15 seconds. Three intent tiers: (1) "How much for MY body?" (weight-based personalization), (2) "Am I drinking enough?" (validation-seeking), (3) "How do I drink more?" (behavior change). Mental model mirrors a BMI calculator: enter stats, get a number, see where you fall.

### Brand Personality
**Trustworthy, Instant, Scientific.** A calm, credible health utility that feels like a knowledgeable friend — not clinical, not playful, not salesy. Blue is the dominant brand color: 85% of healthcare companies use it, it physiologically reduces heart rate, and it semantically connects to water. The tool earns trust through scientific rigor (peer-reviewed formula, cited sources) and restraint (no gates, no ads above the fold, no friction).

### Aesthetic Direction
Clean, blue-centric, mobile-first health utility. No decorative complexity — every element serves time-to-value or perceived personalization. Reference the precision of Omni Calculator's credibility signals, the personalization depth of CamelBak's activity inputs, and the visual satisfaction of WaterMinder's gamification — but without any of their flaws (oversimplification, marketing clutter, app-gating). Anti-references: Medindia (dated, ad-heavy), Trifecta (email-gated), CamelBak (product-first, calculator-second).

### Design Principles

1. **Instant personalized value with zero friction** — The user wants a specific number for their specific body. Every design decision must reduce time-to-value or increase perceived personalization. If an element does neither, cut it. Target: page load to personalized result in under 15 seconds.

2. **Scientific credibility without clinical coldness** — Ground everything in peer-reviewed evidence (IOM 2005, EFSA 2010, 33 mL/kg clinical guideline). Show methodology transparently. But use plain language, not jargon. Debunk myths (caffeine doesn't dehydrate). Cite sources but don't lecture.

3. **Progressive disclosure over information overload** — Zone 1 (above fold): calculator + result only. Zone 2 (first scroll): tips, schedule, urine guide. Zone 3 (deep scroll): FAQ, methodology, SEO content. Advanced inputs behind "Refine your result" expandable. Never clutter the primary experience.

4. **Accessible by default, not by afterthought** — WCAG 2.1 AA minimum. Every interactive element gets a label, a focus state, and keyboard support. Dynamic results use aria-live. Color never carries meaning alone. 48px touch targets. 16px minimum font size (prevents iOS zoom).

5. **Monetization serves the user, not the other way around** — No ads or affiliate content above the fold or within the calculator. No email gates on core functionality. Affiliate recommendations only after the result, contextualized by the user's intake ("Get a bottle for your goal"). One ad unit maximum per viewport. The result card is permanently ad-free.

---

## Design Tokens

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#1976D2` | Interactive elements, links, accents |
| Primary Light | `#E3F2FD` | Card backgrounds, water-fill animation |
| CTA | `#00796B` | Primary action buttons |
| CTA Alt | `#1565C0` | Secondary action buttons |
| Background | `#F8FAFE` | Page background (light blue tint) |
| Surface | `#FFFFFF` | Card surfaces |
| Text | `#1A2332` | Primary body text (4.5:1+ contrast) |
| Text Muted | `#6B7B8D` | Secondary text, helper text |
| Success | `#2E7D32` | "Well hydrated" states |
| Warning | `#E65100` | "Drink more" nudges |
| Water Fill | `#2196F3` | Glass fill animation, water visuals |
| Water Light | `#E1F5FE` | Light water accents |

**Dark mode:** Invert appropriately — lighter blues on dark backgrounds, maintain 4.5:1 contrast ratios.

### Typography
System font stack for zero-load-time rendering:
```
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| Result number | 36-48px (clamp) | 700-900 | 1.2 |
| Section headers | 20px | 700 | 1.2 |
| Body text | 16-18px | 400 | 1.5 |
| Labels | 14px | 500 | 1.4 |
| Helper text | 14px | 400 | 1.4 |

### Spacing
Base unit: **8px**. All spacing derives from this.

| Token | Value | Usage |
|-------|-------|-------|
| Input padding | 16px | Inside form fields |
| Card padding | 24px | Inside card containers |
| Section spacing | 32px | Between page sections |

### Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| Cards | 12px | Card containers |
| Inputs | 8px | Form fields |
| Pills/Segments | 24px | Segmented controls, tags |

### Shadows
| Token | Value | Usage |
|-------|-------|-------|
| Card | `0 2px 8px rgba(0,0,0,0.08)` | Default card elevation |
| Elevated | `0 4px 16px rgba(0,0,0,0.12)` | Hover states, result card |

### Animation
- Transitions: 200-300ms ease-out for result updates
- Glass fill: 500ms with staggered delays
- Result card entrance: subtle scale-up on first completion
- Easing: `cubic-bezier(0.23, 1, 0.32, 1)` for strong ease-out
- Respect `prefers-reduced-motion`: disable animations

---

## UX Architecture

### Page Structure: Single Page, Three Zones

**Zone 1 — Above the fold (80%+ of users stop here)**
- Calculator form: 4 required inputs stacked vertically
- Result display: large number + glass visualization
- Max-width 480px centered on desktop, full-width on mobile
- Desktop option: split layout — inputs left, result right

**Zone 2 — First scroll**
- Daily drinking schedule (8 time blocks, 7 AM - 9 PM)
- Comparison anchor ("X% more/less than average")
- Bottle refill calculator
- Personalized hydration tips

**Zone 3 — Deep scroll (SEO weight)**
- FAQ section with FAQPage schema (8-10 PAA questions)
- Methodology with formula breakdown and citations
- Weight-to-water lookup chart
- Educational content (1,500-2,000 words)

### Input Specification

**4 Required Inputs:**

1. **Weight** — `<input type="text" inputmode="numeric">` with kg/lbs unit toggle on same row. Placeholder "e.g., 70" (never as label). 2-3 digit field width.

2. **Sex** — 2-option segmented control (Male/Female). `role="radiogroup"` with `aria-label`. Pill-styled, instant selection.

3. **Activity Level** — 5-option radio cards:
   - Sedentary: "I sit most of the day"
   - Light: "Light exercise 1-3 days/week"
   - Active: "Moderate exercise 3-5 days/week"
   - Very Active: "Hard exercise 6-7 days/week"
   - Extreme: "Intense training or a physical job"
   - Plain-language descriptors, not clinical terms.

4. **Climate** — 3-option segmented control: Cool/Mild, Warm, Hot & Humid.

**Smart defaults:** "Active" (internal value `moderate`) activity + "Warm" (internal value `hot`) climate pre-selected.

**2 Optional Inputs (behind "Refine your result" expandable):**
5. Pregnancy/Lactation toggle (visible only if Female selected)
6. Exercise duration (minutes per day)

### Result Display

**Primary result:** 36-48px bold number showing daily beverage intake in user's unit (oz or mL) AND glasses (e.g., "95 oz — about 12 glasses per day"). `aria-live="polite"` container.

**Visual:** Horizontal row of water glass icons that fill with animated blue. Support up to 15 glasses.

**Comparison anchor:** "That's X% more/less than the average person" (baseline: 2,000 mL).

**Bottle refill calculator:** User picks bottle size (250mL, 500mL, 750mL, 1L) → see refill count.

**Daily schedule:** 8 time-block timeline showing intake distribution across the day.

**Secondary details:**
- Total water vs. beverages-only distinction ("~20% comes from food")
- "How we calculated this" expandable with formula steps
- Medical disclaimer

### Interaction Patterns

- **Real-time calculation** — Results update instantly as inputs change. No "Calculate" button delay.
- **Micro-animations** — Glass icons fill with 200-300ms ease-out. Result number transitions smoothly. Subtle scale-up on first result appearance.
- **Exploration-friendly** — All inputs remain visible alongside results. Users can tweak without restarting.
- **Shareable URLs** — Parameters encoded in URL (e.g., `?w=75&a=active&c=warm`) for sharing and bookmarking.

---

## Formula

**Base:** body weight (kg) x 33 mL

**Activity multipliers:** Sedentary 1.0x, Light 1.12x, Active 1.25x, Very Active 1.45x, Extreme 1.6x

**Climate multipliers:** Temperate 1.0x, Warm/Hot 1.15x, Hot & Humid 1.30x

**Special conditions:** Pregnancy +300 mL, Lactation +700 mL, Exercise +12 mL/minute

**Beverage intake:** Total x 0.8 (20% from food per IOM)

**Glass conversion:** 250 mL per glass

**Minimum floor:** Never display below 1,800 mL (triggers neuroendocrine stress per Armstrong & Johnson 2018)

**Sources:** IOM 2005 (3.7L men / 2.7L women), EFSA 2010 (2.5L men / 2.0L women), 30-35 mL/kg clinical guideline, ACSM exercise guidelines

---

## Accessibility — WCAG 2.1 AA

- Every input has a programmatic `<label>`, not just visual
- Segmented controls: `role="radiogroup"` with `aria-label`
- Dynamic results: `aria-live="polite"` announcements
- Color never sole indicator of meaning (text labels alongside color states)
- Focus states: 2px outline in contrasting color on all interactive elements
- Text contrast: 4.5:1 normal text, 3:1 large text (18px+ bold or 24px+)
- Touch targets: 48x48dp minimum, 8dp spacing between
- Font size: 16px minimum on inputs (prevents iOS Safari auto-zoom)
- Full keyboard navigation: Tab through inputs, Space/Enter to select, arrow keys within groups
- Single-column layout on mobile (CXL: 15.4s faster than multi-column)
- CTA button: 56-72dp tall, full-width on mobile

---

## SEO Architecture

- Primary schema: `WebApplication` with `applicationCategory: "HealthApplication"`
- FAQ schema: `FAQPage` on FAQ section (target People Also Ask)
- Methodology schema: `HowTo` for calculation explanation
- Target PAA queries: "How much water based on weight?", "Does coffee count?", "Is 8 glasses enough?", "Can you drink too much?"
- Static weight-to-water lookup chart for featured snippet capture
- Educational Zone 3 content: 1,500-2,000 words covering exercise hydration, pregnancy, 8x8 myth, dehydration signs
- E-E-A-T signals: cite IOM/EFSA, show methodology transparently

---

## Monetization Rules

**Non-negotiable:** No ads, affiliate links, or promotional content above the fold, within the calculator form, or inside the result card.

**Tier 1 — Affiliate (MVP-ready):** "Get a bottle for your goal" section in Zone 2, showing 2-3 bottles contextualized by user's intake. Placed below result and daily schedule.

**Tier 2 — Display ads (post-launch):** Single responsive ad unit between Zone 2 and Zone 3. Never more than one ad per viewport.

**Tier 3 — Premium (nice-to-have):** "Download your hydration plan" PDF behind optional email capture. Never gate the core calculation.

---

## Retention Mechanics

- **PWA install prompt:** Defer until after first calculation completion (5x higher install rate). Don't re-prompt for 14 days after dismissal.
- **Shareable results:** URL params recreate results. "Share my hydration goal" button with pre-populated social text.
- **Open Graph:** Dynamic OG image showing user's personalized result for rich social previews.
- **Bookmark nudge:** Subtle prompt after result display.
