# ROADMAP — Water Intake Calculator

> A daily water intake calculator that delivers a personalized hydration result in under 15 seconds — no gates, no clutter, no ads above the fold.

---

## Current State

The project is a greenfield **TanStack Start** (React 19) application with full boilerplate in place but zero calculator logic.

**What exists:**

| Layer | Detail |
|-------|--------|
| Framework | TanStack Start + TanStack Router (file-based routing), Vite 7, TypeScript strict |
| Styling | Tailwind CSS v4, CSS custom properties (ocean/teal palette), `@tailwindcss/typography`, Fraunces (display) + Manrope (body) |
| Theming | Light/dark/auto toggle with `localStorage` persistence and FOUC-preventing `<head>` script |
| Components | `Header` (sticky nav, theme toggle), `Footer`, `ThemeToggle` (three-state cycle) |
| Routes | `/` (template hero — needs replacement), `/about` (placeholder) |
| Tooling | Biome (lint + format), Vitest + Testing Library + jsdom, Bun |
| PWA | `manifest.json` (generic TanStack icons/names), `robots.txt` |
| Icons | lucide-react |
| Path aliases | `#/*` and `@/*` → `./src/*` |

**What needs adapting:**

- Home page → becomes the calculator
- Header/Footer branding → water intake identity
- Color palette → shift CTA/backgrounds toward blue/water hues (existing teal is close)
- PWA manifest → proper name, icons, theme colors
- No structured data, OG tags, or SEO meta exist yet

---

## Design System Notes

### Color Migration Strategy

The existing CSS variable architecture (`--sea-ink`, `--lagoon`, `--surface`, etc.) is sound. A **surgical shift** — not a full remap — is recommended:

| Token | Current | Target | Rationale |
|-------|---------|--------|-----------|
| `--lagoon` (primary) | `#4fb8b2` (teal) | `#1976D2` (water blue) | Stronger CTA contrast |
| `--foam` (light bg) | `#f3faf5` (mint) | `#E3F2FD` (blue tint) | Water association |
| `--lagoon-deep` (CTA) | `#328f97` (deep teal) | `#00796B` (deep teal-green) | Minor shift, keeps warmth |

**Keep:** Fraunces for the hero result number, Manrope for body, `island-shell` glassmorphism pattern for the calculator card, `rise-in` animation for entrance.

### Open Decision

Font loading: current Google Fonts `@import` vs. self-hosted with `font-display: swap` vs. system font stack. Research recommends system stack for zero-load-time; Fraunces/Manrope provide brand differentiation. **Decide before Phase 1 implementation.**

---

## Phase 1 — MVP: Core Calculator

**Goal:** Fully functional calculator on the home page. Personalized result in < 15 seconds from page load. Mobile-first, accessible, real-time updates.

### 1.1 Calculator Engine

Create `src/lib/calculator.ts` — pure functions, no UI dependencies:

- `calculateBaseIntake(weightKg)` — weight × 33 mL
- `applyActivityMultiplier(base, level)` — Sedentary 1.0×, Light 1.12×, Moderate 1.25×, Very Active 1.45×, Extreme 1.6×
- `applyClimateMultiplier(adjusted, climate)` — Temperate 1.0×, Hot 1.15×, Hot & Humid 1.30×
- `applySpecialConditions(adjusted, conditions)` — Pregnancy +300 mL, Lactation +700 mL
- `calculateBeverageIntake(total)` — total × 0.8 (removes food-sourced water)
- Unit conversions: `lbsToKg`, `mlToOz`, `mlToGlasses` (250 mL/glass)

Types in `src/lib/types.ts`: `ActivityLevel`, `Climate`, `Sex`, `SpecialConditions`, `CalculatorInputs`, `CalculatorResult`

**Tests:** Unit tests for all functions with edge cases. Must pass before UI work begins.

### 1.2 Calculator UI (Zone 1 — Above the Fold)

Replace home page with calculator. Components in `src/components/calculator/`:

**4 Required Inputs:**
1. **WeightInput** — numeric text field (`inputmode="numeric"`) + kg/lbs segmented toggle
2. **SexSelector** — 2-option segmented control (Male / Female)
3. **ActivityLevelSelector** — 4 radio cards with plain-language descriptors (e.g., "I sit most of the day")
4. **ClimateSelector** — 3-option segmented control (Cool/Mild, Warm, Hot & Humid)

**Result display** in `src/components/result/`:
- `ResultDisplay` — large bold number (40px+), unit label, glasses count
- `GlassVisualization` — inline SVG water glasses with animated fill

**Behavior:** Real-time calculation (no submit button). Smart defaults pre-filled (70 kg, Moderate, Temperate) so a result is visible immediately on load.

### 1.3 Responsive Design & Accessibility

- Mobile: single column. Desktop (`md`+): two-column (inputs | result)
- All touch targets ≥ 48×48dp, 8dp spacing between targets
- All inputs ≥ 16px font (prevents iOS auto-zoom)
- `aria-live="polite"` on result container
- `role="radiogroup"` + `aria-label` on segmented controls
- Visible focus rings (2px contrasting outline)
- Full keyboard navigation (Tab, Space/Enter, arrow keys)
- Color contrast ≥ 4.5:1 (text), ≥ 3:1 (large text)
- Target: Lighthouse accessibility ≥ 90

### 1.4 Branding & Meta

- Update Header: water intake logo/name, relevant nav links
- Update Footer: project-appropriate attribution
- Update `<title>` and `<meta description>` in `__root.tsx` head config
- Verify all new components render correctly in light/dark/auto modes

---

## Phase 2 — Content & SEO

**Goal:** Fill out Zone 2 + Zone 3, add enhanced calculator features, establish SEO foundation.

### 2.1 Enhanced Calculator Features

- **Optional inputs** (progressive disclosure via "Refine your result" expandable):
  - Pregnancy/Lactation toggle (visible only when Sex = Female)
  - Exercise duration (minutes/day)
- **Comparison anchor:** "That's X% more than the average person"
- **Daily drinking schedule:** divide total into ~2-hour blocks
- **Bottle refill calculator:** user picks bottle size → shows refill count
- **"How we calculated this"** expandable with formula breakdown

### 2.2 Zone 2 — First Scroll

- Personalized hydration tips (evidence-based)
- Daily drinking schedule visualization (timeline or table)
- Urine color guide for hydration self-assessment

### 2.3 Zone 3 — Deep Scroll

- **FAQ section** targeting People Also Ask:
  - "How much water should I drink based on my weight?"
  - "Does coffee count as water intake?" (myth-bust: moderate caffeine has no meaningful impact — Killer et al., 2014)
  - "Is 8 glasses a day enough?" (debunk: the "half your body weight in ounces" rule has no peer-reviewed derivation)
  - "Can you drink too much water?"
  - 6–8 more PAA-derived questions
- Body weight lookup chart (quick-reference table)
- Methodology section citing IOM 2005, EFSA 2010, ACSM guidelines
- Long-form SEO content (1,500–2,000 words) covering exercise hydration, pregnancy, dehydration signs

### 2.4 Structured Data & Meta

- JSON-LD schemas: `WebApplication`, `FAQPage`, `HowTo` — injected via TanStack Start `head()` config
- Open Graph + Twitter Card meta tags
- OG image (static or build-time generated)
- `robots.txt` with sitemap reference
- Sitemap generation
- Canonical URLs

### 2.5 Shareable Results

- Encode inputs in URL search params (`?w=70&u=kg&a=moderate&c=hot`)
- TanStack Router `validateSearch` for type-safe URL state
- Social share buttons (copy link, Twitter, Facebook) with pre-filled text
- Navigating to a param URL pre-fills inputs and auto-calculates

---

## Phase 3 — Growth: PWA, Monetization, Retention

**Goal:** Transform from single-use tool to return-visit app with sustainable revenue.

### 3.1 PWA

- Update `manifest.json`: proper name, icons, theme colors
- Service worker for offline caching
- Install prompt triggered **after first successful calculation** (not on load)
- Standalone display mode, splash screen

### 3.2 Monetization (Non-Intrusive)

- **Affiliate bottles:** contextual placement after result ("Track your intake with these")
- **Single ad unit:** Zone 2–3 gap only. Never in calculator or result area
- **Optional email capture:** "Get your personalized hydration plan as PDF" — never gate the core calculator
- Disclosure/compliance for affiliate links

### 3.3 Analytics & Performance

- Core Web Vitals targets: LCP < 2.5s, INP < 200ms, CLS < 0.1
- Track: calculator completions, input distributions, share events
- JS bundle budget: < 100 KB gzipped for calculator route

### 3.4 Backlog

- Altitude adjustment multiplier (+1–1.5 L/day above 8,000 ft)
- Age-based adjustments
- Medication disclaimers (diuretics)
- i18n / multi-language
- Historical tracking (localStorage intake log)
- Dark mode OG image variant
- A/B testing infrastructure

---

## Key Architectural Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| State management | React `useState` + lifted state | ~6 inputs, no async — no external state lib needed |
| Calculation trigger | Real-time (every input change) | Research requires instant feedback; formula is trivial |
| Internal units | Always metric (mL, kg) | Convert at input/display boundaries only |
| URL state | TanStack Router search params | Type-safe, SSR-compatible, enables shareable results |
| Glass visualization | Inline SVG + CSS animation | No chart library needed; keeps bundle tiny |
| Structured data | JSON-LD in `head()` | Idiomatic TanStack Start injection point |

---

## Testing Strategy

| Level | Scope | Phase |
|-------|-------|-------|
| Unit | Calculator pure functions (Vitest) | 1 (blocker) |
| Component | Input/result components (Testing Library) | 1 |
| Integration | Full input → result flow | 2 |
| Visual regression | Light/dark theme screenshots | 2 |
| E2E | Shareable URL round-trip | 2 |

---

## Priority Map

| Priority | Feature | Phase |
|----------|---------|-------|
| **Essential** | Weight + activity + climate calculation | 1 |
| **Essential** | Real-time result display | 1 |
| **Essential** | Glass/visual output | 1 |
| **Essential** | Mobile-first responsive | 1 |
| **Essential** | Accessible design (WCAG 2.1 AA) | 1 |
| High | Shareable/bookmarkable URLs | 2 |
| High | FAQ with myth-busting | 2 |
| High | Structured data (SEO) | 2 |
| High | Comparison anchor | 2 |
| Medium | Daily drinking schedule | 2 |
| Medium | Bottle refill calculator | 2 |
| Medium | Urine color guide | 2 |
| Medium | PWA install prompt | 3 |
| Low | Affiliate monetization | 3 |
| Low | Email PDF capture | 3 |
| Backlog | Altitude/age/medication | 3+ |

---

## Non-Goals

- User accounts or authentication
- Backend database or API server (all calculation is client-side)
- Native mobile apps (PWA covers mobile)
- Real-time hydration tracking with notifications (this is a calculator, not a tracker)
- Medical advice or diagnosis — appropriate disclaimers required

---

## Scientific References

- IOM (2005) — Adequate Intakes: 3.7 L/day (men), 2.7 L/day (women)
- EFSA (2010) — 2.5 L/day (men), 2.0 L/day (women)
- Clinical guideline: 30–35 mL/kg/day
- ACSM — replace 150% of sweat loss post-exercise
- Killer et al. (2014, PLoS ONE) — moderate caffeine does not impair hydration
- Armstrong & Johnson (2018, Nutrients) — intake below 1.8 L/day triggers neuroendocrine stress
- Seal et al. (2023, European Journal of Nutrition) — NAM guidelines maintain optimal urine osmolality
