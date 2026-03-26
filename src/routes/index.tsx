import {
	createFileRoute,
	useNavigate,
	useSearch,
} from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { ActivityLevelSelector } from "#/components/calculator/ActivityLevelSelector";
import ClimateSelector from "#/components/calculator/ClimateSelector";
import { OptionalInputs } from "#/components/calculator/OptionalInputs";
import SexSelector from "#/components/calculator/SexSelector";
import WeightInput from "#/components/calculator/WeightInput";
import { FAQ } from "#/components/content/FAQ";
import { HydrationTips } from "#/components/content/HydrationTips";
import { Methodology } from "#/components/content/Methodology";
import { SEOContent } from "#/components/content/SEOContent";
import { UrineColorGuide } from "#/components/content/UrineColorGuide";
import { WeightChart } from "#/components/content/WeightChart";
import { BottleRefillCalculator } from "#/components/result/BottleRefillCalculator";
import { ComparisonAnchor } from "#/components/result/ComparisonAnchor";
import { DrinkingSchedule } from "#/components/result/DrinkingSchedule";
import { FormulaBreakdown } from "#/components/result/FormulaBreakdown";
import { GlassVisualization } from "#/components/result/GlassVisualization";
import { ResultDisplay } from "#/components/result/ResultDisplay";
import { ShareButtons } from "#/components/result/ShareButtons";
import { calculate, lbsToKg } from "#/lib/calculator";
import type {
	ActivityLevel,
	Climate,
	ResultUnit,
	Sex,
	SpecialConditions,
	WeightUnit,
} from "#/lib/types";

// ---------------------------------------------------------------------------
// Search param defaults & validation
// ---------------------------------------------------------------------------

const DEFAULT_WEIGHT = 70;
const DEFAULT_UNIT: WeightUnit = "kg";
const DEFAULT_SEX: Sex = "male";
const DEFAULT_ACTIVITY: ActivityLevel = "moderate";
const DEFAULT_CLIMATE: Climate = "hot";

const VALID_UNITS: ReadonlySet<string> = new Set<WeightUnit>(["kg", "lbs"]);
const VALID_SEXES: ReadonlySet<string> = new Set<Sex>(["male", "female"]);
const VALID_ACTIVITIES: ReadonlySet<string> = new Set<ActivityLevel>([
	"sedentary",
	"light",
	"moderate",
	"very-active",
	"extreme",
]);
const VALID_CLIMATES: ReadonlySet<string> = new Set<Climate>([
	"temperate",
	"hot",
	"hot-humid",
]);
const VALID_RESULT_UNITS: ReadonlySet<string> = new Set<ResultUnit>([
	"mL",
	"oz",
	"L",
]);

type CalculatorSearchParams = {
	w?: number;
	u?: WeightUnit;
	s?: Sex;
	a?: ActivityLevel;
	c?: Climate;
	p?: number;
	l?: number;
	e?: number;
	r?: ResultUnit;
};

export const Route = createFileRoute("/")({
	head: () => ({
		links: [
			{
				rel: "canonical",
				href: "https://waterintake.tools/",
			},
		],
		scripts: [
			{
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "FAQPage",
					mainEntity: [
						{
							"@type": "Question",
							name: "How much water should I drink based on my weight?",
							acceptedAnswer: {
								"@type": "Answer",
								text: "A widely used clinical guideline recommends 30-35 mL of water per kilogram of body weight per day. For example, a 70 kg (154 lb) person would need roughly 2.3-2.5 L daily. This baseline is then adjusted for activity level, climate, and individual health factors. Our calculator uses 33 mL/kg as the starting point, which falls in the middle of this evidence-based range.",
							},
						},
						{
							"@type": "Question",
							name: "Does coffee count as water intake?",
							acceptedAnswer: {
								"@type": "Answer",
								text: "Yes, moderate coffee consumption contributes to your daily fluid intake. A 2014 study by Killer et al. published in PLoS ONE found that moderate caffeine intake (up to about 4 cups per day) has no meaningful dehydrating effect and contributes to hydration similarly to water. However, very high caffeine doses may have a mild diuretic effect, so it is best to count coffee as part of your intake without relying on it as your sole fluid source.",
							},
						},
						{
							"@type": "Question",
							name: "Is 8 glasses a day enough?",
							acceptedAnswer: {
								"@type": "Answer",
								text: 'The popular "8 glasses a day" rule \u2014 sometimes stated as "drink half your body weight in ounces" \u2014 has no peer-reviewed scientific derivation. It likely originated from a 1945 U.S. Food and Nutrition Board recommendation that was taken out of context, as the original statement included water from food. Actual needs vary significantly based on body weight, activity, and climate, which is why a personalized calculation is more accurate than a one-size-fits-all number.',
							},
						},
						{
							"@type": "Question",
							name: "Can you drink too much water?",
							acceptedAnswer: {
								"@type": "Answer",
								text: "Yes, drinking excessive amounts of water in a short period can lead to hyponatremia, a potentially dangerous condition where blood sodium levels drop too low. This is most common during endurance exercise when large volumes are consumed without adequate electrolyte replacement. For most healthy adults following thirst cues and the guidelines from this calculator, overhydration is unlikely, but rapid intake of several liters within an hour should be avoided.",
							},
						},
						{
							"@type": "Question",
							name: "How do I know if I'm dehydrated?",
							acceptedAnswer: {
								"@type": "Answer",
								text: "Common signs of mild dehydration include dark yellow urine, dry mouth, fatigue, headache, and reduced concentration. A simple self-check is the urine color test: pale straw-colored urine generally indicates adequate hydration, while dark amber suggests you need more fluids. By the time you feel thirsty, you may already be mildly dehydrated, so proactive intake throughout the day is recommended.",
							},
						},
						{
							"@type": "Question",
							name: "Does sparkling water count toward daily intake?",
							acceptedAnswer: {
								"@type": "Answer",
								text: "Yes, sparkling water (carbonated water) hydrates just as effectively as still water and counts fully toward your daily intake. Research shows no significant difference in hydration status between still and carbonated water consumption. The carbonation does not impair absorption or increase fluid loss. Flavored sparkling waters are also fine, though you should watch for added sugars or artificial sweeteners in some brands.",
							},
						},
						{
							"@type": "Question",
							name: "Should I drink more water when exercising?",
							acceptedAnswer: {
								"@type": "Answer",
								text: "Yes, exercise increases fluid needs substantially. The American College of Sports Medicine (ACSM) recommends drinking 5-7 mL per kg of body weight at least 4 hours before exercise, sipping fluid during activity, and replacing 150% of sweat losses afterward. For moderate 30-60 minute workouts, an extra 400-800 mL is typical. Our calculator accounts for this through the activity level multiplier, which increases your baseline by up to 60% for extreme activity levels.",
							},
						},
						{
							"@type": "Question",
							name: "Do fruits and vegetables count toward water intake?",
							acceptedAnswer: {
								"@type": "Answer",
								text: "Absolutely. About 20% of daily water intake comes from food, according to the Institute of Medicine (IOM). Water-rich foods like watermelon (92% water), cucumbers (95%), oranges (87%), and strawberries (91%) contribute meaningfully to hydration. Our calculator accounts for this by recommending a beverage intake that is 80% of total water needs, with the remaining 20% expected to come from food sources.",
							},
						},
						{
							"@type": "Question",
							name: "Is cold or warm water better for hydration?",
							acceptedAnswer: {
								"@type": "Answer",
								text: "Both cold and warm water hydrate equally well. Water temperature does not meaningfully affect absorption or hydration status. Some research suggests cold water may be consumed in greater volumes during exercise because it feels more refreshing, while warm water may aid digestion for some individuals. The best temperature is whichever one encourages you to drink enough throughout the day.",
							},
						},
						{
							"@type": "Question",
							name: "How much water should I drink during pregnancy?",
							acceptedAnswer: {
								"@type": "Answer",
								text: "Pregnant women need approximately 300 mL (about 10 oz) more water per day than their non-pregnant baseline, according to IOM guidelines, bringing the general recommendation to about 3.0 L of total water daily. During lactation, fluid needs increase further by approximately 700 mL per day. These additional requirements support increased blood volume, amniotic fluid, and milk production. Always consult your healthcare provider for guidance specific to your pregnancy.",
							},
						},
						{
							"@type": "Question",
							name: "Does alcohol dehydrate you?",
							acceptedAnswer: {
								"@type": "Answer",
								text: "Alcohol is a diuretic, meaning it increases urine production and can lead to net fluid loss. Studies show that beverages with more than 4% alcohol content tend to have a dehydrating effect, with stronger drinks causing greater fluid loss. For every alcoholic drink, it is advisable to have an extra glass of water. Alcohol should not be counted toward your daily water intake goal.",
							},
						},
						{
							"@type": "Question",
							name: "How does climate affect water needs?",
							acceptedAnswer: {
								"@type": "Answer",
								text: "Hot and humid environments significantly increase fluid losses through sweat, raising your daily water needs by 15-30%. In hot climates, your body can lose 1-2 liters of sweat per hour during activity. High altitude (above 2,500 m) also increases water loss through faster respiration and increased urine output. Our calculator adjusts for climate with multipliers of 1.15x for hot conditions and 1.30x for hot and humid environments.",
							},
						},
					],
				}),
			},
			{
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "HowTo",
					name: "How to Calculate Your Daily Water Intake",
					description:
						"Use our science-backed calculator to determine your personalized daily water intake.",
					step: [
						{
							"@type": "HowToStep",
							name: "Enter your weight",
							text: "Enter your body weight in kilograms or pounds.",
						},
						{
							"@type": "HowToStep",
							name: "Select your sex",
							text: "Choose your biological sex for accurate recommendations.",
						},
						{
							"@type": "HowToStep",
							name: "Choose activity level",
							text: "Select how physically active you are on a typical day.",
						},
						{
							"@type": "HowToStep",
							name: "Set your climate",
							text: "Choose the climate you live in.",
						},
						{
							"@type": "HowToStep",
							name: "View your result",
							text: "See your personalized daily water intake recommendation instantly.",
						},
					],
				}),
			},
		],
	}),
	component: CalculatorPage,
	validateSearch(raw: Record<string, unknown>): CalculatorSearchParams {
		const w =
			typeof raw.w === "number"
				? raw.w
				: typeof raw.w === "string"
					? Number(raw.w)
					: DEFAULT_WEIGHT;

		const pRaw =
			typeof raw.p === "number"
				? raw.p
				: typeof raw.p === "string"
					? Number(raw.p)
					: 0;

		const lRaw =
			typeof raw.l === "number"
				? raw.l
				: typeof raw.l === "string"
					? Number(raw.l)
					: 0;

		const eRaw =
			typeof raw.e === "number"
				? raw.e
				: typeof raw.e === "string"
					? Number(raw.e)
					: 0;

		return {
			w: Number.isFinite(w) ? w : DEFAULT_WEIGHT,
			u: VALID_UNITS.has(raw.u as string)
				? (raw.u as WeightUnit)
				: DEFAULT_UNIT,
			s: VALID_SEXES.has(raw.s as string) ? (raw.s as Sex) : DEFAULT_SEX,
			a: VALID_ACTIVITIES.has(raw.a as string)
				? (raw.a as ActivityLevel)
				: DEFAULT_ACTIVITY,
			c: VALID_CLIMATES.has(raw.c as string)
				? (raw.c as Climate)
				: DEFAULT_CLIMATE,
			p: pRaw === 1 ? 1 : 0,
			l: lRaw === 1 ? 1 : 0,
			e: Number.isFinite(eRaw) && eRaw >= 0 ? Math.floor(eRaw) : 0,
			r: VALID_RESULT_UNITS.has(raw.r as string)
				? (raw.r as ResultUnit)
				: undefined,
		};
	},
});

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

function CalculatorPage() {
	const {
		w: weight = DEFAULT_WEIGHT,
		u: unit = DEFAULT_UNIT,
		s: sex = DEFAULT_SEX,
		a: activityLevel = DEFAULT_ACTIVITY,
		c: climate = DEFAULT_CLIMATE,
		p = 0,
		l = 0,
		e = 0,
		r: resultUnitParam,
	} = useSearch({ from: "/" });
	const resultUnit: ResultUnit = resultUnitParam ?? (unit === "lbs" ? "oz" : "mL");
	const navigate = useNavigate();
	const resultRef = useRef<HTMLDivElement>(null);
	const [hasScrolled, setHasScrolled] = useState(false);

	// Derived state
	const pregnancy = sex === "female" && p === 1;
	const lactation = sex === "female" && l === 1;
	const exerciseMinutes = e;
	const specialConditions: SpecialConditions = { pregnancy, lactation };
	const weightInKg = unit === "lbs" ? lbsToKg(weight) : weight;

	// biome-ignore lint/correctness/useExhaustiveDependencies: specialConditions is derived from pregnancy + lactation
	const result = useMemo(
		() =>
			calculate({
				weight,
				unit,
				sex,
				activityLevel,
				climate,
				specialConditions,
				exerciseMinutes,
			}),
		[
			weight,
			unit,
			sex,
			activityLevel,
			climate,
			pregnancy,
			lactation,
			exerciseMinutes,
		],
	);

	const scrollToResult = useCallback(() => {
		if (hasScrolled) return;
		const isMobile = window.matchMedia("(max-width: 767px)").matches;
		if (isMobile && resultRef.current) {
			resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
			setHasScrolled(true);
		}
	}, [hasScrolled]);

	const updateSearch = useCallback(
		(updates: Partial<CalculatorSearchParams>) => {
			navigate({
				to: "/",
				search: (prev) => ({ ...prev, ...updates }) as CalculatorSearchParams,
				replace: true,
			});
		},
		[navigate],
	);

	const handleWeightChange = useCallback(
		(newWeight: number, newUnit: WeightUnit) => {
			updateSearch({ w: newWeight, u: newUnit });
			scrollToResult();
		},
		[updateSearch, scrollToResult],
	);

	const handleSexChange = useCallback(
		(newSex: Sex) => {
			updateSearch({ s: newSex });
			scrollToResult();
		},
		[updateSearch, scrollToResult],
	);

	const handleActivityChange = useCallback(
		(newActivity: ActivityLevel) => {
			updateSearch({ a: newActivity });
			scrollToResult();
		},
		[updateSearch, scrollToResult],
	);

	const handleClimateChange = useCallback(
		(newClimate: Climate) => {
			updateSearch({ c: newClimate });
			scrollToResult();
		},
		[updateSearch, scrollToResult],
	);

	const handleConditionsChange = useCallback(
		(conditions: SpecialConditions) => {
			updateSearch({
				p: conditions.pregnancy ? 1 : 0,
				l: conditions.lactation ? 1 : 0,
			});
		},
		[updateSearch],
	);

	const handleExerciseChange = useCallback(
		(minutes: number) => {
			updateSearch({ e: minutes });
			scrollToResult();
		},
		[updateSearch, scrollToResult],
	);

	const handleResultUnitChange = useCallback(
		(newUnit: ResultUnit) => {
			updateSearch({ r: newUnit });
		},
		[updateSearch],
	);

	return (
		<main id="main-content" className="page-wrap px-4 pb-8 pt-14">
			{/* HERO */}
			<section className="mb-8 text-center">
				<h1 className="mb-3 text-4xl font-bold tracking-tight text-[var(--color-text)] sm:text-5xl">
					How much water should you drink?
				</h1>
				<p className="mx-auto max-w-xl text-base text-[var(--color-text-muted)] sm:text-lg">
					Enter your details below for a personalized daily hydration
					recommendation based on your body, activity, and environment.
				</p>
			</section>

			{/* ZONE 1: Calculator + Result grid */}
			<div className="grid gap-8 md:grid-cols-[1fr_1fr]">
				<section className="island-shell rise-in rounded-lg p-6">
					<h2 className="text-xl font-bold leading-[1.2] text-[var(--color-text)]">
						Your Details
					</h2>
					<div className="mt-6 space-y-8">
						<WeightInput
							value={weight}
							unit={unit}
							onChange={handleWeightChange}
						/>
						<SexSelector value={sex} onChange={handleSexChange} />
						<ActivityLevelSelector
							value={activityLevel}
							onChange={handleActivityChange}
						/>
						<ClimateSelector value={climate} onChange={handleClimateChange} />
						<OptionalInputs
							sex={sex}
							conditions={specialConditions}
							exerciseMinutes={exerciseMinutes}
							onConditionsChange={handleConditionsChange}
							onExerciseChange={handleExerciseChange}
						/>
					</div>
					<button
						type="button"
						onClick={() => {
							resultRef.current?.scrollIntoView({
								behavior: "smooth",
								block: "start",
							});
							setHasScrolled(true);
						}}
						className="mt-6 flex w-full min-h-14 items-center justify-center gap-2 rounded-xl bg-[var(--color-cta)] text-white font-semibold text-base transition-[transform,background-color] duration-200 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-cta)] md:hidden"
					>
						See your result
						<ChevronDown size={18} aria-hidden="true" />
					</button>
				</section>

				<section ref={resultRef} className="md:sticky md:top-24 md:self-start">
					<div className="island-shell rise-in rounded-lg p-6 shadow-[0_4px_16px_rgba(0,0,0,0.12)] [animation-delay:80ms]">
						<h2 className="text-xl font-bold leading-[1.2] text-[var(--color-text)]">
							Your Daily Intake
						</h2>
						<div className="mt-6 flex flex-col gap-4">
							<div aria-live="polite" aria-atomic="true">
								<ResultDisplay
								result={result}
								resultUnit={resultUnit}
								onResultUnitChange={handleResultUnitChange}
							/>
							</div>
							<ComparisonAnchor totalMl={result.beverageIntakeMl} />
							<GlassVisualization glasses={result.glasses} />
							<p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
								This calculator provides general guidance based on
								scientific guidelines. It is not a substitute for
								medical advice.
							</p>
						</div>
					</div>
				</section>
			</div>

			{/* ZONE 2: Engagement (first scroll) */}
			<div className="mt-8 space-y-8">
				<section className="island-shell rise-in rounded-lg p-6">
					<DrinkingSchedule totalMl={result.beverageIntakeMl} />
				</section>

				<section className="island-shell rise-in rounded-lg p-6 [animation-delay:80ms]">
					<BottleRefillCalculator totalMl={result.beverageIntakeMl} />
				</section>

				<section className="island-shell rise-in rounded-lg p-6 [animation-delay:160ms]">
					<FormulaBreakdown
						weightKg={weight}
						activityLevel={activityLevel}
						climate={climate}
						conditions={{ pregnancy, lactation }}
						exerciseMinutes={exerciseMinutes}
						unit={unit}
					/>
				</section>

				<div className="flex justify-center rise-in [animation-delay:240ms]">
					<ShareButtons
						totalMl={result.beverageIntakeMl}
						glasses={result.glasses}
					/>
				</div>

				<HydrationTips />
			</div>

			{/* ZONE 3: SEO & Education (deep scroll) */}
			<div className="mt-8 space-y-8">
				<UrineColorGuide />
				<FAQ />
				<WeightChart highlightWeight={weightInKg} />
				<Methodology />
				<SEOContent />
			</div>
		</main>
	);
}
