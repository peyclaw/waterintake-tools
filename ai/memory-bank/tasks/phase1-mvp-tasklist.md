# Phase 1 -- MVP: Core Calculator -- Development Tasks

## Status Report

**Assessment Date**: 2026-03-23
**Assessed By**: SeniorProjectManager
**Overall Phase 1 Status**: ~85% Complete -- core calculator is functional, remaining work is polish, testing gaps, and branding refinement.

---

## Phase 1 Task Checklist

### Foundation Layer

| # | Task | Status | Evidence |
|---|------|--------|----------|
| 0 | Vitest Configuration Setup | DONE | `vitest.config.ts` exists, `bun run test` runs 44 tests across 5 files, jsdom configured, path aliases resolve |
| 1 | TypeScript Type Definitions | DONE | `src/lib/types.ts` exports all 6 types: `ActivityLevel`, `Climate`, `Sex`, `WeightUnit`, `SpecialConditions`, `CalculatorInputs`, `CalculatorResult` |
| 2 | Calculator Engine -- Pure Functions | DONE | `src/lib/calculator.ts` exports all 9 functions including `calculate()` convenience function. Exact ROADMAP multipliers used. |
| 3 | Calculator Engine -- Unit Tests | DONE | `src/lib/__tests__/calculator.test.ts` -- comprehensive tests for all functions including edge cases (zero weight, negative weight, all activity levels, all climates, special conditions combos, unit conversions). All pass. |
| 4 | Color Palette Shift | DONE | `src/styles.css` already uses `--lagoon: #1976D2`, `--foam: #E3F2FD`, `--lagoon-deep: #00796B` in light mode. Dark mode tokens also updated (`--lagoon: #64B5F6`, `--lagoon-deep: #80CBC4`, `--foam: #0D1B2A`). Background gradients reference blue values. |

### Input Components

| # | Task | Status | Evidence |
|---|------|--------|----------|
| 5 | WeightInput Component | DONE | `src/components/calculator/WeightInput.tsx` -- numeric input with `inputMode="numeric"`, kg/lbs segmented toggle with auto-conversion, `aria-label`, visible focus ring, min-h-12 touch targets, handles empty/non-numeric input |
| 6 | SexSelector Component | DONE | `src/components/calculator/SexSelector.tsx` -- 2-option segmented control, `role="radiogroup"` + `aria-label="Biological sex"`, `role="radio"` + `aria-checked` on each option, full keyboard nav (Arrow keys, Space, Enter), `tabIndex` roving, min-h-12 touch targets, focus ring |
| 7 | ActivityLevelSelector Component | DONE | `src/components/calculator/ActivityLevelSelector.tsx` -- 5 radio cards (all engine levels covered including Extreme), plain-language descriptors, `role="radiogroup"`, `role="radio"` + `aria-checked`, arrow key navigation, `fieldset`/`legend`, responsive grid (1-col mobile, 2-col sm+), focus ring |
| 8 | ClimateSelector Component | DONE | `src/components/calculator/ClimateSelector.tsx` -- 3-option segmented control ("Cool / Mild", "Warm", "Hot & Humid"), `role="radiogroup"`, `role="radio"` + `aria-checked`, full keyboard nav, roving tabIndex, focus ring |

### Page Assembly & Results

| # | Task | Status | Evidence |
|---|------|--------|----------|
| 9 | Calculator Page Assembly | DONE | `src/routes/index.tsx` -- home page is the calculator. All 4 inputs wired to lifted `useState`. Real-time calculation via `useMemo`. Smart defaults: 70 kg, male, moderate, temperate. Result visible on load. Two-column grid on md+. `aria-live="polite"` on result section. Uses `island-shell` and `rise-in` classes. |
| 10 | ResultDisplay + GlassVisualization | DONE | `src/components/result/ResultDisplay.tsx` -- large number with `display-title` (Fraunces), clamp(2.5rem, 8vw, 4rem), unit-aware (mL vs fl oz), glasses count, total intake footnote. `src/components/result/GlassVisualization.tsx` -- inline SVG glasses with CSS fill animation, max 15 display with overflow indicator, `prefers-reduced-motion` respected, `aria-label` on each glass and container. |

### Accessibility & Responsive

| # | Task | Status | Notes |
|---|------|--------|-------|
| 11 | Responsive Layout & Accessibility Audit | PARTIALLY DONE | Layout structure is correct (single-col mobile, two-col md+). Touch targets meet 48dp minimum (min-h-12 = 48px). Font sizes >= 16px on inputs. `aria-live`, `role="radiogroup"`, focus rings all present. **Needs formal audit**: contrast ratio verification across both themes, 320px viewport test, full keyboard-only walkthrough. |

### Branding & Meta

| # | Task | Status | Evidence |
|---|------|--------|----------|
| 12 | Header Rebranding | DONE | `src/components/Header.tsx` -- uses Droplets icon + "Water Intake" text, TanStack links removed, nav has Home + About, ThemeToggle retained. |
| 13 | Meta Tags and Page Title | DONE | `src/routes/__root.tsx` head config has title "Water Intake Calculator -- How Much Water Should You Drink Daily?" and meta description about personalized daily water intake. |
| 13a | Footer Rebranding | DONE | `src/components/Footer.tsx` -- copyright says "Water Intake Calculator", tagline "Science-backed hydration guidance", disclaimer about general guidance. No TanStack references. |
| 14 | Light/Dark/Auto Theme Verification | NOT FORMALLY DONE | Both light and dark mode CSS tokens exist and are comprehensive. Components use CSS variable references throughout. ThemeToggle cycles correctly. **Needs formal walkthrough**: verify no text invisibility, contrast issues, or broken states across all three modes on the actual rendered page. |

### Testing

| # | Task | Status | Evidence |
|---|------|--------|----------|
| 15 | Component Tests | PARTIALLY DONE | **Exists**: `WeightInput.test.tsx` (5 tests), `ActivityLevelSelector.test.tsx` (4 tests), `ResultDisplay.test.tsx` (5 tests). **Missing**: `SexSelector.test.tsx`, `ClimateSelector.test.tsx`, `GlassVisualization.test.tsx`. |
| 16 | Integration Smoke Test | DONE | `src/__tests__/calculator-integration.test.tsx` -- tests default render (70 kg -> 2310 mL), calculation correctness verification, weight change updates result, glasses count display. All 4 tests pass. |

---

## Test Suite Summary

**Current State**: 5 test files, 44 tests, ALL PASSING.

| Test File | Tests | Status |
|-----------|-------|--------|
| `src/lib/__tests__/calculator.test.ts` | ~20 | PASS |
| `src/components/calculator/__tests__/WeightInput.test.tsx` | 5 | PASS |
| `src/components/calculator/__tests__/ActivityLevelSelector.test.tsx` | 4 | PASS |
| `src/components/result/__tests__/ResultDisplay.test.tsx` | 5 | PASS |
| `src/__tests__/calculator-integration.test.tsx` | 4 | PASS |

---

## Remaining Work -- Prioritized Task List

The following tasks are what remains to complete Phase 1. They are ordered by priority.

### [NEXT] Task R1: Missing Component Tests (SexSelector, ClimateSelector, GlassVisualization)

**Priority**: HIGH -- the ROADMAP testing strategy requires component tests for Phase 1.

**Description**: Three UI components lack test coverage. The pattern is already established by the existing test files (WeightInput, ActivityLevelSelector, ResultDisplay), so these should follow the same conventions.

**Acceptance Criteria**:
- `src/components/calculator/__tests__/SexSelector.test.tsx` exists with tests for:
  - Renders both Male and Female options
  - Selected option has `aria-checked="true"`, other has `aria-checked="false"`
  - Clicking an option calls `onChange` with correct `Sex` value
  - `role="radiogroup"` is present
  - Keyboard navigation (ArrowLeft/ArrowRight changes selection)
- `src/components/calculator/__tests__/ClimateSelector.test.tsx` exists with tests for:
  - Renders all 3 options ("Cool / Mild", "Warm", "Hot & Humid")
  - Selected option has `aria-checked="true"`
  - Clicking calls `onChange` with correct `Climate` value
  - `role="radiogroup"` is present
  - Keyboard navigation works
- `src/components/result/__tests__/GlassVisualization.test.tsx` exists with tests for:
  - Renders correct number of glass SVGs for a given count
  - Partial glass renders for fractional count
  - Overflow indicator shows when glasses exceed MAX_DISPLAY (15)
  - Container has appropriate `aria-label`
- All new tests pass via `bun run test`

**Files to Create**:
- `src/components/calculator/__tests__/SexSelector.test.tsx`
- `src/components/calculator/__tests__/ClimateSelector.test.tsx`
- `src/components/result/__tests__/GlassVisualization.test.tsx`

**Estimated Time**: 45 minutes
**Recommended Agent**: Code agent (testing/frontend)
**Dependencies**: None -- components already exist and work
**Reference patterns**: Follow conventions in `src/components/calculator/__tests__/WeightInput.test.tsx`

---

### [NEXT] Task R2: Formal Accessibility Audit Pass

**Priority**: HIGH -- ROADMAP Section 1.3 has specific requirements that need verification.

**Description**: The accessibility foundations are in place (aria attributes, focus rings, keyboard nav, touch targets), but no formal audit has been performed. This task requires running through the ROADMAP 1.3 checklist item by item on the actual rendered page.

**Acceptance Criteria**:
- Color contrast verified >= 4.5:1 for normal text, >= 3:1 for large text in BOTH light and dark modes
- Calculator tested at 320px viewport width -- no horizontal overflow, all controls usable
- Full keyboard-only walkthrough: Tab through all inputs, use arrow keys within radio groups, verify focus order is logical
- 8dp spacing between adjacent touch targets verified
- All `aria-live="polite"` regions confirmed to announce result changes to screen readers
- Any issues found are fixed in the relevant component files

**Files Potentially Affected**:
- `src/components/calculator/WeightInput.tsx`
- `src/components/calculator/SexSelector.tsx`
- `src/components/calculator/ActivityLevelSelector.tsx`
- `src/components/calculator/ClimateSelector.tsx`
- `src/components/result/ResultDisplay.tsx`
- `src/components/result/GlassVisualization.tsx`
- `src/routes/index.tsx`
- `src/styles.css`

**Estimated Time**: 40 minutes
**Recommended Agent**: Code agent (frontend/accessibility focus)
**Dependencies**: None -- all UI is assembled
**Note**: This may be partially automatable with Lighthouse audit, but manual keyboard walkthrough is essential.

---

### [NEXT] Task R3: Light/Dark/Auto Theme Verification

**Priority**: MEDIUM -- ROADMAP Section 1.4 explicitly requires this.

**Description**: Verify all calculator components render correctly across light, dark, and auto theme modes. The CSS variables exist for both modes, but no one has verified the actual rendered result.

**Acceptance Criteria**:
- In light mode: all text readable, inputs have visible borders, segmented control selected/unselected states distinguishable, result number clearly visible, glass SVGs visible
- In dark mode: same checks, plus verify no white-on-white or dark-on-dark text
- In auto mode: follows OS preference correctly
- Focus rings visible against background in both modes
- Theme toggle cycles correctly: light -> dark -> auto -> light
- No flash of wrong theme on page load (FOUC prevention script in `__root.tsx` works)

**Files Potentially Affected**:
- `src/styles.css` (if contrast fixes needed)
- Any component with hardcoded colors (unlikely -- they use CSS variables)

**Estimated Time**: 30 minutes
**Recommended Agent**: Code agent (frontend) -- or manual review by developer
**Dependencies**: None

---

### [LOW PRIORITY] Task R4: About Page Content Update

**Priority**: LOW -- not explicitly in Phase 1 ROADMAP, but the page still has TanStack Start placeholder content.

**Description**: The `/about` route at `src/routes/about.tsx` still says "A small starter with room to grow" and references TanStack Start. While the ROADMAP does not specifically call out updating this page in Phase 1, it is inconsistent with the rebranded Header/Footer.

**Acceptance Criteria**:
- About page has water intake calculator appropriate content
- References to TanStack Start removed
- Consistent with Header/Footer branding

**Files to Edit**:
- `src/routes/about.tsx`

**Estimated Time**: 15 minutes
**Recommended Agent**: Code agent (frontend)
**Dependencies**: None

---

## Execution Recommendation

**Immediate Next Steps** (can run in parallel):

1. **Task R1** (Missing Component Tests) -- dispatch to a code agent. This is pure test-writing with clear patterns to follow. Low risk, high value for confidence before Phase 2.

2. **Task R2** (Accessibility Audit) -- dispatch to a code agent with frontend/a11y focus. Needs to render the page and inspect. May produce fixes.

3. **Task R3** (Theme Verification) -- can be combined with R2 as a single review pass, or done separately.

**After those complete**:

4. **Task R4** (About Page) -- quick cleanup, can be done by anyone.

**Then Phase 1 is complete** and the project can move to Phase 2 (Content & SEO).

---

## Blockers and Dependencies

| Blocker | Affects | Resolution |
|---------|---------|------------|
| None identified | -- | Phase 1 has no external blockers. All remaining work is internal polish. |

**Cross-task dependencies for remaining work**:
- R1 (tests) has zero dependencies -- can start immediately
- R2 (a11y audit) has zero dependencies -- can start immediately
- R3 (theme check) has zero dependencies -- can start immediately
- R4 (about page) has zero dependencies -- can start immediately
- All four remaining tasks are fully parallelizable

---

## What Was Done Well (Observations for Future Projects)

1. **Engine-first approach worked**: The calculator engine was built and fully tested before any UI, exactly as the ROADMAP prescribed. This prevented rework.
2. **Accessibility was built in, not bolted on**: Every input component has proper ARIA attributes, keyboard navigation, and focus management from the start. The roving `tabIndex` pattern is correctly implemented across all radio group components.
3. **Integration test is solid**: The mini integration wrapper in `calculator-integration.test.tsx` sidesteps TanStack Router context requirements cleanly. Good pattern to remember.
4. **CSS variable architecture pays off**: Using CSS custom properties for theming means all components automatically support dark mode without per-component changes.

## What to Watch For

1. **Font loading**: The Google Fonts `@import` in `styles.css` line 1 is still the "open decision" from the ROADMAP. This should be resolved before Phase 2 performance work.
2. **shadcn/ui variable overlap**: `src/styles.css` has both the custom water-intake design tokens AND the shadcn/ui oklch variables. These coexist now but could cause confusion. No action needed for Phase 1.
3. **`Extreme` activity level**: The ROADMAP says "4 radio cards" but the implementation correctly shows all 5 engine levels. This is the right call -- the spec was slightly inconsistent and the implementation chose completeness.
