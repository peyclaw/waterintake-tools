# Phase 2 -- Content & SEO -- Development Tasks

## Specification Summary

**Original Requirements**: ROADMAP.md sections 2.1 through 2.5
**Technical Stack**: TanStack Start (React 19), TanStack Router (file-based routing), Vite 7, TypeScript strict, Tailwind CSS v4, Vitest, Bun
**Phase Goal**: Fill out Zone 2 + Zone 3, add enhanced calculator features, establish SEO foundation, enable shareable results.

**What Exists (Phase 1 Complete)**:
- Calculator engine: `src/lib/calculator.ts` with all pure functions, full test coverage
- Types: `src/lib/types.ts` with `ActivityLevel`, `Climate`, `Sex`, `WeightUnit`, `SpecialConditions`, `CalculatorInputs`, `CalculatorResult`
- Calculator UI: 4 input components (WeightInput, SexSelector, ActivityLevelSelector, ClimateSelector)
- Result display: `ResultDisplay` + `GlassVisualization` with SVG animation
- Home page: `src/routes/index.tsx` -- real-time calculator with smart defaults
- About page: `src/routes/about.tsx` -- methodology, references, disclaimer
- Routes: `/` and `/about` via TanStack Router file-based routing
- Styling: CSS variables for light/dark, Fraunces display font, Manrope body, glassmorphism cards
- Tests: 44 tests across 5 files, all passing

---

## Dependency Analysis

Before breaking tasks into batches, here are the key dependency chains:

```
2.5 Shareable Results (URL params)
  --> depends on nothing (works with existing inputs)
  --> BUT unlocks social sharing which needs OG tags from 2.4

2.1 Enhanced Calculator Features
  --> "Optional inputs" needs types + engine extension first
  --> "Comparison anchor" needs new helper function
  --> "Daily schedule" needs new helper function
  --> "Bottle refill" needs new helper function
  --> "How we calculated this" is pure UI, needs current engine constants

2.2 Zone 2 Content
  --> "Hydration tips" is static content, independent
  --> "Daily schedule viz" depends on 2.1 schedule logic
  --> "Urine color guide" is static content, independent

2.3 Zone 3 Content
  --> FAQ, chart, methodology, long-form are all static content, independent
  --> FAQ needs to exist before FAQPage JSON-LD (2.4) can reference it

2.4 Structured Data & Meta
  --> JSON-LD FAQPage depends on FAQ content existing (2.3)
  --> WebApplication JSON-LD is independent
  --> OG tags are independent
  --> Sitemap/canonical/robots are independent
```

---

## Batch 1 -- Start Immediately (No Dependencies)

These 8 tasks have zero dependencies on each other or on incomplete Phase 1 work. They can all be dispatched in parallel.

---

### [B1-T1] Calculator Engine Extensions -- New Helper Functions

**Description**: Extend `src/lib/calculator.ts` with new pure functions needed by 2.1 features. These are the foundation that several UI tasks depend on, so they must land first (or in parallel with independent UI work).

**What the ROADMAP says**:
- "Comparison anchor: That's X% more than the average person"
- "Daily drinking schedule: divide total into ~2-hour blocks"
- "Bottle refill calculator: user picks bottle size -> shows refill count"
- "Exercise duration (minutes/day)" as optional input

**Acceptance Criteria**:
- New type `ExerciseDuration` (or add `exerciseMinutes?: number` to `CalculatorInputs`)
- New type `BottleSize` with common sizes (500mL, 750mL, 1000mL, custom)
- New type `ScheduleBlock` with `{ time: string; amountMl: number }`
- `calculateComparisonPercent(userTotal: number): number` -- compare against IOM average (3700mL men / 2700mL women, so need sex param; or use a single 2500mL baseline for simplicity -- decide based on spec saying "average person")
- `generateDrinkingSchedule(totalMl: number, wakeHour?: number, sleepHour?: number): ScheduleBlock[]` -- divides total into ~2-hour blocks across waking hours (default 7am-11pm)
- `calculateBottleRefills(totalMl: number, bottleSizeMl: number): number` -- simple division, ceil
- `applyExerciseDuration(adjusted: number, minutes: number): number` -- additional water for exercise (ACSM guideline: ~350-500mL per 30 min moderate exercise; use 12mL/min as reasonable approximation)
- Unit tests for ALL new functions with edge cases
- Existing tests still pass

**Files to Create/Edit**:
- `src/lib/types.ts` (extend types)
- `src/lib/calculator.ts` (add new functions)
- `src/lib/__tests__/calculator.test.ts` (add new test cases)

**Estimated Time**: 45 minutes
**Recommended Agent**: Code agent (backend/logic focus)

---

### [B1-T2] Shareable URL State -- Search Params Integration

**Description**: Encode calculator inputs in URL search params so results are bookmarkable and shareable. This is section 2.5 from the ROADMAP and is the highest-priority Phase 2 feature.

**What the ROADMAP says**:
- "Encode inputs in URL search params (`?w=70&u=kg&a=moderate&c=hot`)"
- "TanStack Router `validateSearch` for type-safe URL state"
- "Navigating to a param URL pre-fills inputs and auto-calculates"

**Acceptance Criteria**:
- `src/routes/index.tsx` route definition uses `validateSearch` to define search param schema
- Supported params: `w` (weight, number), `u` (unit, "kg"|"lbs"), `s` (sex, "male"|"female"), `a` (activity level), `c` (climate)
- All params are optional -- missing params use current defaults (70, kg, male, moderate, temperate)
- Invalid param values fall back to defaults (no crash)
- When user changes an input, URL updates via `navigate({ search: ... })` without full page reload
- Navigating to `/?w=80&u=lbs&a=light&c=hot` pre-fills all inputs and shows calculated result immediately
- Existing functionality (real-time calculation, defaults on bare `/`) is unchanged
- New test: URL param round-trip (set params -> verify inputs pre-filled -> verify result matches)

**Files to Create/Edit**:
- `src/routes/index.tsx` (major refactor -- state from URL instead of useState)
- `src/lib/types.ts` (possibly add search param schema type)

**Tests to Create**:
- `src/__tests__/url-params.test.tsx` (or extend integration test)

**Estimated Time**: 60 minutes
**Recommended Agent**: Code agent (frontend, TanStack Router expertise)
**Technical Notes**: TanStack Router's `createFileRoute('/').update({ validateSearch: ... })` pattern. The route already uses `createFileRoute('/')`. State management shifts from `useState` to URL-derived state with `useSearch()` and `useNavigate()`.

---

### [B1-T3] FAQ Section -- Zone 3 Content

**Description**: Create the FAQ section targeting People Also Ask queries. This is pure content with an accordion UI pattern. It needs to exist before the FAQPage JSON-LD can be created.

**What the ROADMAP says**:
- "FAQ section targeting People Also Ask" with 4 specific questions listed, plus "6-8 more PAA-derived questions"
- Specific content guidance: "Does coffee count?" -> cite Killer et al., 2014; "Is 8 glasses enough?" -> debunk half-body-weight rule

**Acceptance Criteria**:
- New component `src/components/content/FAQ.tsx`
- Minimum 10 FAQ items with evidence-based answers
- Required questions (from ROADMAP):
  1. "How much water should I drink based on my weight?"
  2. "Does coffee count as water intake?" (cite Killer et al., 2014)
  3. "Is 8 glasses a day enough?" (debunk: no peer-reviewed derivation)
  4. "Can you drink too much water?" (hyponatremia risk)
  5-10. PAA-derived questions (e.g., "Does tea count?", "How do I know if I'm dehydrated?", "Should I drink more water when sick?", "Does sparkling water count?", "How much water during pregnancy?", "Can drinking water help you lose weight?")
- Accordion/expandable UI (use `<details>`/`<summary>` or an accessible disclosure pattern)
- Each answer is 2-4 sentences, evidence-based, no medical advice
- Answers include inline citations where the ROADMAP specifies them
- Uses existing design tokens (island-shell, sea-ink, etc.)
- Accessible: keyboard navigable, works with screen readers
- Component accepts no props (content is static)

**Files to Create**:
- `src/components/content/FAQ.tsx`

**Estimated Time**: 45 minutes
**Recommended Agent**: Code agent (frontend + content writing)

---

### [B1-T4] Body Weight Lookup Chart -- Zone 3 Content

**Description**: Create a quick-reference table showing water intake by body weight. This is a static content component for Zone 3.

**What the ROADMAP says**:
- "Body weight lookup chart (quick-reference table)"

**Acceptance Criteria**:
- New component `src/components/content/WeightChart.tsx`
- Table showing weight (kg and lbs) vs. recommended daily water intake
- Weight range: 40kg to 120kg in 5kg increments (or similar reasonable range)
- Shows both total intake and beverage intake columns
- Uses the actual `calculateBaseIntake` function from the engine for accuracy (import and call it, do not hardcode values)
- Assumes "moderate" activity and "temperate" climate as the default basis (state this clearly)
- Responsive: horizontal scroll on mobile or card-based layout
- Uses existing design tokens
- Accessible: proper `<table>`, `<thead>`, `<th scope>` markup
- Note at bottom: "Values shown for moderate activity in a temperate climate. Use the calculator above for a personalized result."

**Files to Create**:
- `src/components/content/WeightChart.tsx`

**Estimated Time**: 30 minutes
**Recommended Agent**: Code agent (frontend)

---

### [B1-T5] Methodology Section -- Zone 3 Content

**Description**: Create the methodology/science section explaining the calculation approach with proper citations.

**What the ROADMAP says**:
- "Methodology section citing IOM 2005, EFSA 2010, ACSM guidelines"

**Acceptance Criteria**:
- New component `src/components/content/Methodology.tsx`
- Explains the calculation formula step-by-step (base intake, activity multiplier, climate multiplier, special conditions, beverage ratio)
- Cites all three primary references: IOM (2005), EFSA (2010), ACSM (2007)
- Also references: Killer et al. (2014), Armstrong & Johnson (2018), Seal et al. (2023) from the ROADMAP scientific references section
- Clear, readable prose (not overly academic)
- Uses heading hierarchy correctly (h3 or h4 within the page context)
- Uses existing design tokens (island-shell card style)
- Includes the medical disclaimer (already exists in Footer, but reinforce here)

**Files to Create**:
- `src/components/content/Methodology.tsx`

**Estimated Time**: 30 minutes
**Recommended Agent**: Code agent (frontend + technical writing)

---

### [B1-T6] Urine Color Guide -- Zone 2 Content

**Description**: Create a visual urine color guide for hydration self-assessment. This is a Zone 2 (first scroll) content component.

**What the ROADMAP says**:
- "Urine color guide for hydration self-assessment"

**Acceptance Criteria**:
- New component `src/components/content/UrineColorGuide.tsx`
- Visual color strip or card grid showing 6-8 colors from pale straw to dark amber
- Each color has: color swatch (CSS background), hydration status label (e.g., "Well hydrated", "Mildly dehydrated", "Severely dehydrated"), brief description
- Color values based on the standard clinical urine color chart
- Accessible: color is NOT the only indicator -- each level has text labels
- `aria-label` on the overall component
- Uses existing design tokens for card styling
- Works in both light and dark themes (verify swatches are visible against both backgrounds)
- Brief intro text: "Check the color of your urine to quickly assess your hydration level"

**Files to Create**:
- `src/components/content/UrineColorGuide.tsx`

**Estimated Time**: 40 minutes
**Recommended Agent**: Code agent (frontend, design-aware)

---

### [B1-T7] Personalized Hydration Tips -- Zone 2 Content

**Description**: Create an evidence-based hydration tips section for Zone 2 (first scroll below calculator).

**What the ROADMAP says**:
- "Personalized hydration tips (evidence-based)"

**Acceptance Criteria**:
- New component `src/components/content/HydrationTips.tsx`
- 6-8 practical hydration tips with brief evidence backing
- Example tips: "Drink a glass of water first thing in the morning", "Keep a water bottle at your desk", "Eat water-rich foods (cucumber, watermelon, oranges)", "Set regular reminders if you forget to drink", "Drink before you feel thirsty -- thirst signals lag behind actual need", "Increase intake during illness, especially fever or diarrhea"
- Each tip: icon (from lucide-react) + title + 1-2 sentence explanation
- Card or list layout that fits the existing design system
- Uses existing design tokens
- Component is static (no props needed for now -- "personalized" aspect will come when we wire it to calculator results in Batch 2)

**Files to Create**:
- `src/components/content/HydrationTips.tsx`

**Estimated Time**: 35 minutes
**Recommended Agent**: Code agent (frontend + content)

---

### [B1-T8] OG Tags and Basic Meta Infrastructure

**Description**: Add Open Graph and Twitter Card meta tags to the root route. This is independent of other 2.4 tasks.

**What the ROADMAP says**:
- "Open Graph + Twitter Card meta tags"
- "OG image (static or build-time generated)"
- "Canonical URLs"

**Acceptance Criteria**:
- `src/routes/__root.tsx` head config extended with:
  - `og:title`, `og:description`, `og:type` (website), `og:url`, `og:image`
  - `twitter:card` (summary_large_image), `twitter:title`, `twitter:description`, `twitter:image`
  - `<link rel="canonical">` pointing to the production URL
- OG image: create a static placeholder image at `public/og-image.png` (1200x630px) -- can be a simple branded card with "Water Intake Calculator" text and a water drop icon. Use a simple SVG-to-PNG or just a placeholder for now.
- `robots.txt` updated to include sitemap reference: `Sitemap: https://waterintake.tools/sitemap.xml` (or whatever the production domain will be -- use a reasonable placeholder)
- All meta tags render correctly in the HTML head (verify with view-source)

**Files to Create/Edit**:
- `src/routes/__root.tsx` (extend head config)
- `public/og-image.png` (create static OG image)
- `public/robots.txt` (update with sitemap reference)

**Estimated Time**: 40 minutes
**Recommended Agent**: Code agent (frontend/SEO)
**Note**: The OG image can be minimal for now. A polished version can be created later. The important thing is the meta tag infrastructure.

---

## Batch 2 -- Depends on Batch 1

These tasks require one or more Batch 1 tasks to be complete before they can start.

---

### [B2-T1] "How We Calculated This" Expandable

**Depends on**: B1-T1 (engine extensions -- needs access to multiplier constants)

**Description**: Add an expandable section below the result that shows the user's specific formula breakdown. Example: "70 kg x 33 mL = 2,310 mL base. x 1.25 (moderate activity) = 2,887 mL. x 1.0 (temperate climate) = 2,887 mL. x 0.8 beverage ratio = 2,310 mL."

**Files to Create/Edit**:
- `src/components/result/FormulaBreakdown.tsx` (new)
- `src/routes/index.tsx` (integrate into result section)
- `src/lib/calculator.ts` (export multiplier constants or add a `calculateWithSteps()` function that returns intermediate values)

**Estimated Time**: 45 minutes
**Recommended Agent**: Code agent (frontend)

---

### [B2-T2] Optional Inputs -- Progressive Disclosure

**Depends on**: B1-T1 (engine extensions -- needs exercise duration logic and updated types)

**Description**: Add a "Refine your result" expandable section with optional inputs: pregnancy/lactation toggle (visible only when sex=female) and exercise duration (minutes/day).

**Files to Create/Edit**:
- `src/components/calculator/OptionalInputs.tsx` (new)
- `src/routes/index.tsx` (add expandable section, wire new state)
- `src/lib/types.ts` (already extended in B1-T1)

**Estimated Time**: 50 minutes
**Recommended Agent**: Code agent (frontend)

---

### [B2-T3] Comparison Anchor

**Depends on**: B1-T1 (engine extensions -- needs `calculateComparisonPercent`)

**Description**: Show "That's X% more than the average person" below the result number.

**Files to Create/Edit**:
- `src/components/result/ComparisonAnchor.tsx` (new)
- `src/routes/index.tsx` (integrate)

**Estimated Time**: 25 minutes
**Recommended Agent**: Code agent (frontend)

---

### [B2-T4] Bottle Refill Calculator

**Depends on**: B1-T1 (engine extensions -- needs `calculateBottleRefills`)

**Description**: User picks a bottle size, sees how many refills per day. Simple UI: segmented control or dropdown for bottle size, display refill count.

**Files to Create/Edit**:
- `src/components/result/BottleRefill.tsx` (new)
- `src/routes/index.tsx` (integrate into result section)

**Estimated Time**: 30 minutes
**Recommended Agent**: Code agent (frontend)

---

### [B2-T5] Daily Drinking Schedule Visualization -- Zone 2

**Depends on**: B1-T1 (engine extensions -- needs `generateDrinkingSchedule`)

**Description**: Show a timeline or table of when to drink water throughout the day. This is Zone 2 content that uses the calculator's output.

**Files to Create/Edit**:
- `src/components/content/DrinkingSchedule.tsx` (new)
- `src/routes/index.tsx` (integrate into Zone 2 area)

**Estimated Time**: 45 minutes
**Recommended Agent**: Code agent (frontend, design-aware)

---

### [B2-T6] Home Page Assembly -- Zone 2 + Zone 3 Integration

**Depends on**: B1-T3, B1-T4, B1-T5, B1-T6, B1-T7 (all content components must exist)

**Description**: Integrate all Zone 2 and Zone 3 content components into the home page below the calculator. Establish the scroll structure: Zone 1 (calculator, above fold) -> Zone 2 (tips, schedule, urine guide) -> Zone 3 (FAQ, weight chart, methodology, long-form content).

**Files to Create/Edit**:
- `src/routes/index.tsx` (major integration -- add sections below calculator grid)

**Estimated Time**: 40 minutes
**Recommended Agent**: Code agent (frontend, layout)

---

### [B2-T7] JSON-LD Structured Data -- FAQPage + WebApplication

**Depends on**: B1-T3 (FAQ component must exist with final question/answer content so JSON-LD matches rendered content)

**Description**: Add JSON-LD structured data for FAQPage (matching FAQ content) and WebApplication schemas. Inject via TanStack Start `head()` config.

**Files to Create/Edit**:
- `src/lib/structured-data.ts` (new -- helper functions to generate JSON-LD objects)
- `src/routes/__root.tsx` or `src/routes/index.tsx` (inject via head config)

**Estimated Time**: 40 minutes
**Recommended Agent**: Code agent (frontend/SEO)

---

### [B2-T8] Social Share Buttons

**Depends on**: B1-T2 (shareable URL params must work first) and B1-T8 (OG tags should exist for shared links to preview correctly)

**Description**: Add copy-link, Twitter, and Facebook share buttons near the result. Pre-fill share text with the user's result.

**Files to Create/Edit**:
- `src/components/result/ShareButtons.tsx` (new)
- `src/routes/index.tsx` (integrate near result)

**Estimated Time**: 35 minutes
**Recommended Agent**: Code agent (frontend)

---

### [B2-T9] Long-Form SEO Content -- Zone 3

**Depends on**: Nothing strictly, but better to write after B1-T3 (FAQ) and B1-T5 (methodology) are done to avoid content overlap.

**Description**: Create 1,500-2,000 word long-form content covering exercise hydration, pregnancy hydration, and dehydration signs. This is the "deep scroll" SEO content.

**Files to Create/Edit**:
- `src/components/content/LongFormContent.tsx` (new)

**Estimated Time**: 50 minutes
**Recommended Agent**: Code agent (frontend + long-form content writing)

---

## Batch 3 -- Final Integration and Polish

These tasks depend on Batch 2 being substantially complete.

---

### [B3-T1] Sitemap Generation

**Depends on**: B2-T6 (page structure finalized)

**Description**: Generate a sitemap.xml. Since this is a small site (2 routes: `/` and `/about`), a static sitemap file in `public/` is sufficient. If more routes are added, consider build-time generation.

**Files to Create**:
- `public/sitemap.xml`

**Estimated Time**: 15 minutes
**Recommended Agent**: Code agent

---

### [B3-T2] URL Params Extension for New Inputs

**Depends on**: B2-T2 (optional inputs) and B1-T2 (URL param infrastructure)

**Description**: Extend the URL search params to include optional inputs (pregnancy, lactation, exercise minutes, bottle size). Ensure shareable URLs capture the full calculator state.

**Files to Create/Edit**:
- `src/routes/index.tsx` (extend validateSearch schema)

**Estimated Time**: 25 minutes
**Recommended Agent**: Code agent (frontend)

---

### [B3-T3] Integration Tests for Phase 2 Features

**Depends on**: B2-T6 (page fully assembled)

**Description**: Add integration and E2E-style tests for Phase 2 features: URL param round-trip, FAQ accordion behavior, schedule generation accuracy, share button functionality.

**Files to Create**:
- `src/__tests__/phase2-integration.test.tsx`
- `src/__tests__/url-roundtrip.test.tsx`

**Estimated Time**: 50 minutes
**Recommended Agent**: Code agent (testing)

---

### [B3-T4] Visual Regression Baseline -- Light/Dark Screenshots

**Depends on**: B2-T6 (page fully assembled with all content)

**Description**: Capture baseline screenshots of the full page in both light and dark themes at mobile and desktop widths. The ROADMAP testing strategy calls for "visual regression: light/dark theme screenshots" in Phase 2.

**Estimated Time**: 30 minutes
**Recommended Agent**: Code agent (testing/QA)

---

### [B3-T5] Performance Audit and Optimization

**Depends on**: All Batch 2 tasks complete

**Description**: Run Lighthouse audit, verify Core Web Vitals targets (LCP < 2.5s, CLS < 0.1). Check JS bundle size. Optimize if needed (lazy loading Zone 3 content, image optimization for OG image).

**Estimated Time**: 40 minutes
**Recommended Agent**: Code agent (performance)

---

## Task Count Summary

| Batch | Tasks | Parallelizable | Total Estimated Time |
|-------|-------|----------------|---------------------|
| Batch 1 | 8 tasks | All 8 in parallel | ~325 min if serial, ~60 min if parallel |
| Batch 2 | 9 tasks | ~6 in parallel (after deps met) | ~355 min if serial, ~90 min if parallel |
| Batch 3 | 5 tasks | ~3 in parallel | ~160 min if serial, ~50 min if parallel |
| **Total** | **22 tasks** | | **~840 min serial, ~200 min parallel** |

---

## Dispatch Plan -- What to Start RIGHT NOW

### Parallel Dispatch (8 agents):

| Task | Agent Type | Priority | Est. Time |
|------|-----------|----------|-----------|
| **B1-T1**: Calculator Engine Extensions | Code (logic/testing) | CRITICAL -- blocks 5 Batch 2 tasks | 45 min |
| **B1-T2**: Shareable URL State | Code (frontend, TanStack Router) | HIGH -- blocks share buttons | 60 min |
| **B1-T3**: FAQ Section | Code (frontend + content) | HIGH -- blocks JSON-LD | 45 min |
| **B1-T4**: Body Weight Lookup Chart | Code (frontend) | MEDIUM | 30 min |
| **B1-T5**: Methodology Section | Code (frontend + writing) | MEDIUM | 30 min |
| **B1-T6**: Urine Color Guide | Code (frontend, design) | MEDIUM | 40 min |
| **B1-T7**: Hydration Tips | Code (frontend + content) | MEDIUM | 35 min |
| **B1-T8**: OG Tags and Meta | Code (frontend/SEO) | HIGH -- blocks share preview | 40 min |

### Critical Path:

```
B1-T1 (engine) --> B2-T1 (formula breakdown)
                --> B2-T2 (optional inputs) --> B3-T2 (URL param extension)
                --> B2-T3 (comparison anchor)
                --> B2-T4 (bottle refill)
                --> B2-T5 (schedule viz)

B1-T2 (URL params) --> B2-T8 (share buttons)
                    --> B3-T2 (URL param extension)

B1-T3 (FAQ) --> B2-T7 (JSON-LD)
B1-T3,T4,T5,T6,T7 (all content) --> B2-T6 (page assembly)

B2-T6 (page assembly) --> B3-T3 (integration tests)
                       --> B3-T4 (visual regression)
                       --> B3-T5 (performance audit)
```

**The single most critical task is B1-T1** (engine extensions) because it blocks 5 downstream tasks. If resources are limited, prioritize this one.

---

## Quality Requirements

- [ ] All new components use existing CSS design tokens (no hardcoded colors)
- [ ] All interactive elements have keyboard navigation and ARIA attributes
- [ ] All new content is evidence-based with citations where specified
- [ ] All new functions have unit tests
- [ ] Existing 44 tests continue to pass after every task
- [ ] Components work in both light and dark themes
- [ ] Mobile responsive (single column on small screens)
- [ ] No new dependencies unless absolutely necessary
- [ ] Images from approved sources (Unsplash, picsum.photos) -- NO Pexels
- [ ] TypeScript strict mode -- no `any` types, no `@ts-ignore`

## Technical Notes

- **TanStack Router search params**: Use `createFileRoute('/').update({ validateSearch })` pattern. The `useSearch()` hook returns typed params. `useNavigate()` with `{ search }` option updates URL.
- **Content components convention**: All new content components go in `src/components/content/` directory. They should be self-contained and accept minimal props.
- **JSON-LD injection**: TanStack Start's `head()` config supports `scripts` array for inline scripts. Use `type: 'application/ld+json'` with stringified JSON.
- **FAQ accordion pattern**: Use native `<details>`/`<summary>` for best accessibility and zero-JS fallback, styled with Tailwind.
- **Font loading decision**: Still unresolved from Phase 1. The Google Fonts `@import` in `styles.css` line 1 should be addressed during B3-T5 (performance audit) at latest.

## Observations for Agent Dispatchers

1. **B1-T1 is the keystone**: If you can only dispatch one task, dispatch this one. Everything else can wait.
2. **Content tasks (B1-T3 through B1-T7) are lowest risk**: They create new files, touch nothing existing. Safe to run in parallel with no merge conflicts.
3. **B1-T2 (URL params) is the highest-risk task**: It refactors the home page state management. It should NOT run in parallel with any other task that touches `src/routes/index.tsx`. Since B1-T1 only touches `src/lib/`, they are safe to run together.
4. **B2-T6 (page assembly) is the integration bottleneck**: It stitches everything together. All content components must be done first. This is where merge conflicts will happen if content component interfaces change.
5. **Testing tasks (B3-T3, B3-T4) should run LAST**: They validate the final assembled page.
