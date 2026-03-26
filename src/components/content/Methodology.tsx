import { BookOpen, FlaskConical, Info, Scale } from "lucide-react";

const activityMultipliers = [
	{ level: "Sedentary", multiplier: "1.00x", description: "Little to no exercise" },
	{ level: "Light", multiplier: "1.12x", description: "Light exercise 1-3 days/week" },
	{ level: "Active", multiplier: "1.25x", description: "Moderate exercise 3-5 days/week" },
	{ level: "Very Active", multiplier: "1.45x", description: "Hard exercise 6-7 days/week" },
	{ level: "Extreme", multiplier: "1.60x", description: "Intense training or physical job" },
];

const climateMultipliers = [
	{ climate: "Temperate", multiplier: "1.00x", description: "Mild or cool environments" },
	{ climate: "Hot", multiplier: "1.15x", description: "Warm, dry climates" },
	{ climate: "Hot & Humid", multiplier: "1.30x", description: "Tropical or high-humidity heat" },
];

const references = [
	{
		label: "IOM (2005)",
		text: "Dietary Reference Intakes for Water, Potassium, Sodium, Chloride, and Sulfate. Adequate Intakes: 3.7 L/day (men), 2.7 L/day (women) from all sources.",
		source: "National Academies Press",
	},
	{
		label: "EFSA (2010)",
		text: "Scientific Opinion on Dietary Reference Values for Water. Recommends 2.5 L/day (men), 2.0 L/day (women) from all sources.",
		source: "EFSA Journal, 8(3), 1459",
	},
	{
		label: "Clinical Guideline",
		text: "The 30-35 mL/kg/day rule is widely used in clinical practice for estimating baseline fluid requirements in healthy adults.",
		source: "General medical consensus",
	},
	{
		label: "ACSM (2007)",
		text: "Exercise and Fluid Replacement Position Stand. Recommends pre-hydrating with 5-7 mL/kg at least 4 hours before exercise and replacing 150% of sweat losses post-exercise.",
		source: "Medicine & Science in Sports & Exercise, 39(2), 377-390",
	},
	{
		label: "Killer et al. (2014)",
		text: "Moderate caffeine consumption does not produce a meaningful dehydrating effect compared to water in regular caffeine consumers.",
		source: "PLoS ONE, 9(1), e84154",
	},
];

export function Methodology() {
	return (
		<section className="island-shell rise-in rounded-lg p-6">
			<div className="mb-6 flex items-center gap-3">
				<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary-light)]">
					<FlaskConical
						size={20}
						aria-hidden="true"
						className="text-[var(--color-primary)]"
					/>
				</div>
				<h2 className="text-xl font-bold leading-[1.2] text-[var(--color-text)]">
					How We Calculate Your Intake
				</h2>
			</div>

			{/* Formula Overview */}
			<div className="mb-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
				<h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-[var(--color-text)]">
					<Scale size={16} aria-hidden="true" className="text-[var(--color-cta)]" />
					Formula Breakdown
				</h3>
				<div className="space-y-3 text-base leading-7 text-[var(--color-text-muted)]">
					<p>
						Our calculator uses a four-step formula grounded in clinical hydration
						guidelines:
					</p>
					<ol className="list-inside list-decimal space-y-2 pl-1">
						<li>
							<strong className="text-[var(--color-text)]">Base intake</strong> = body
							weight (kg) &times; 33 mL
						</li>
						<li>
							<strong className="text-[var(--color-text)]">Activity adjustment</strong>{" "}
							= base &times; activity multiplier
						</li>
						<li>
							<strong className="text-[var(--color-text)]">Climate adjustment</strong>{" "}
							= adjusted &times; climate multiplier
						</li>
						<li>
							<strong className="text-[var(--color-text)]">Beverage target</strong> =
							total &times; 0.80 (accounting for ~20% from food)
						</li>
					</ol>
					<p>
						Special conditions add a fixed amount: +300 mL for pregnancy and +700 mL
						for lactation, applied before the beverage split.
					</p>
				</div>
			</div>

			{/* Multiplier Tables */}
			<div className="mb-6 grid gap-4 sm:grid-cols-2">
				<div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
					<h3 className="mb-3 text-base font-semibold text-[var(--color-text)]">
						Activity Multipliers
					</h3>
					<div className="overflow-x-auto">
						<table className="w-full text-left text-sm">
							<thead>
								<tr className="border-b border-[var(--color-border)]">
									<th scope="col" className="pb-2 pr-3 font-semibold text-[var(--color-text)]">
										Level
									</th>
									<th scope="col" className="pb-2 pr-3 font-semibold text-[var(--color-text)]">
										Factor
									</th>
									<th scope="col" className="hidden pb-2 font-semibold text-[var(--color-text)] sm:table-cell">
										Description
									</th>
								</tr>
							</thead>
							<tbody>
								{activityMultipliers.map((row) => (
									<tr
										key={row.level}
										className="border-b border-[var(--color-border)] last:border-0"
									>
										<td className="py-2 pr-3 font-medium text-[var(--color-text)]">
											{row.level}
										</td>
										<td className="py-2 pr-3 tabular-nums text-[var(--color-cta)]">
											{row.multiplier}
										</td>
										<td className="hidden py-2 text-[var(--color-text-muted)] sm:table-cell">
											{row.description}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				<div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
					<h3 className="mb-3 text-base font-semibold text-[var(--color-text)]">
						Climate Multipliers
					</h3>
					<div className="overflow-x-auto">
						<table className="w-full text-left text-sm">
							<thead>
								<tr className="border-b border-[var(--color-border)]">
									<th scope="col" className="pb-2 pr-3 font-semibold text-[var(--color-text)]">
										Climate
									</th>
									<th scope="col" className="pb-2 pr-3 font-semibold text-[var(--color-text)]">
										Factor
									</th>
									<th scope="col" className="hidden pb-2 font-semibold text-[var(--color-text)] sm:table-cell">
										Description
									</th>
								</tr>
							</thead>
							<tbody>
								{climateMultipliers.map((row) => (
									<tr
										key={row.climate}
										className="border-b border-[var(--color-border)] last:border-0"
									>
										<td className="py-2 pr-3 font-medium text-[var(--color-text)]">
											{row.climate}
										</td>
										<td className="py-2 pr-3 tabular-nums text-[var(--color-cta)]">
											{row.multiplier}
										</td>
										<td className="hidden py-2 text-[var(--color-text-muted)] sm:table-cell">
											{row.description}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			{/* How it relates to guidelines */}
			<div className="mb-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
				<h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-[var(--color-text)]">
					<Info size={16} aria-hidden="true" className="text-[var(--color-cta)]" />
					Relation to Published Guidelines
				</h3>
				<div className="space-y-3 text-base leading-7 text-[var(--color-text-muted)]">
					<p>
						The IOM recommends 3.7 L/day for adult men and 2.7 L/day for adult women
						from all sources (food and beverages). EFSA guidelines are slightly lower
						at 2.5 L and 2.0 L respectively. Our weight-based formula (33 mL/kg)
						produces results that fall within the range established by these
						guidelines for a typical adult, while personalizing the output to
						individual body mass.
					</p>
					<p>
						For a 70 kg male with moderate activity in a temperate climate, our
						calculator yields approximately 2,888 mL total intake (2,310 mL from
						beverages), which aligns closely with the EFSA recommendation and falls
						within the IOM range after accounting for food-sourced water.
					</p>
				</div>
			</div>

			{/* Scientific References */}
			<div className="mb-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
				<h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-[var(--color-text)]">
					<BookOpen size={16} aria-hidden="true" className="text-[var(--color-cta)]" />
					Scientific References
				</h3>
				<ul className="space-y-3 text-sm leading-6 text-[var(--color-text-muted)]">
					{references.map((ref) => (
						<li key={ref.label}>
							<strong className="text-[var(--color-text)]">{ref.label}</strong>
							{" -- "}
							{ref.text}
							<br />
							<span className="text-sm italic text-[var(--color-text-muted)]">
								{ref.source}
							</span>
						</li>
					))}
				</ul>
			</div>

			{/* Limitations & Disclaimer */}
			<div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
				<h3 className="mb-3 text-base font-semibold text-[var(--color-text)]">
					Limitations & Disclaimer
				</h3>
				<ul className="space-y-2 text-base leading-7 text-[var(--color-text-muted)]">
					<li>
						This calculator provides general estimates for healthy adults. It does
						not account for specific medical conditions, medications (such as
						diuretics), or individual metabolic variation.
					</li>
					<li>
						The 33 mL/kg baseline is a population-level approximation. Individual
						needs may vary due to age, body composition, kidney function, and other
						health factors.
					</li>
					<li>
						Altitude adjustments are not yet included. People living or exercising
						above 2,500 m (8,200 ft) may need 1-1.5 L more per day due to increased
						respiratory water loss.
					</li>
					<li>
						Always consult a healthcare professional for personalized hydration
						advice, particularly if you have heart, kidney, or liver conditions.
					</li>
				</ul>
			</div>
		</section>
	);
}
