import { useMemo } from "react";
import {
	calculateBaseIntake,
	applyActivityMultiplier,
	calculateBeverageIntake,
} from "#/lib/calculator";
import type { ActivityLevel } from "#/lib/types";

type WeightChartProps = {
	highlightWeight?: number;
};

const WEIGHT_RANGE_KG = Array.from({ length: 16 }, (_, i) => 45 + i * 5);
const ACTIVITY_COLUMNS: { level: ActivityLevel; label: string }[] = [
	{ level: "sedentary", label: "Sedentary" },
	{ level: "moderate", label: "Moderate" },
	{ level: "very-active", label: "Very Active" },
];

function kgToLbs(kg: number): number {
	return Math.round(kg * 2.20462);
}

function computeIntake(
	weightKg: number,
	activity: ActivityLevel,
): { ml: number; glasses: number } {
	const base = calculateBaseIntake(weightKg);
	const afterActivity = applyActivityMultiplier(base, activity);
	const beverageMl = Math.round(calculateBeverageIntake(afterActivity));
	const glasses = Math.round((beverageMl / 250) * 10) / 10;
	return { ml: beverageMl, glasses };
}

export function WeightChart({ highlightWeight = 70 }: WeightChartProps) {
	const rows = useMemo(
		() =>
			WEIGHT_RANGE_KG.map((kg) => ({
				kg,
				lbs: kgToLbs(kg),
				intakes: ACTIVITY_COLUMNS.map((col) => computeIntake(kg, col.level)),
			})),
		[],
	);

	const closestWeight = useMemo(() => {
		let best = WEIGHT_RANGE_KG[0];
		let bestDiff = Math.abs(WEIGHT_RANGE_KG[0] - highlightWeight);
		for (const w of WEIGHT_RANGE_KG) {
			const diff = Math.abs(w - highlightWeight);
			if (diff < bestDiff) {
				best = w;
				bestDiff = diff;
			}
		}
		return best;
	}, [highlightWeight]);

	return (
		<div className="island-shell rise-in rounded-lg p-6">
			<h2 className="mb-2 text-xl font-bold leading-[1.2] text-[var(--color-text)]">
				Daily Water Intake by Body Weight
			</h2>
			<p className="mb-6 text-sm text-[var(--color-text-muted)]">
				Beverage intake estimates for temperate climate. Values based on 33
				mL/kg baseline with activity multipliers (IOM/EFSA guidelines).
			</p>

			<div
				className="overflow-x-auto rounded-lg border border-[var(--color-border)]"
				tabIndex={0}
				role="region"
				aria-label="Scrollable weight chart table"
			>
				<table className="w-full min-w-[580px] border-collapse text-sm">
					<caption className="sr-only">
						Daily recommended beverage intake in milliliters and glasses for
						body weights from 45 kg to 120 kg across sedentary, moderate, and
						very active activity levels.
					</caption>
					<thead>
						<tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-strong)]">
							<th
								scope="col"
								className="sticky left-0 z-10 bg-[var(--color-surface-strong)] px-3 py-3 text-left font-semibold text-[var(--color-text)] sm:px-4"
							>
								Weight
							</th>
							{ACTIVITY_COLUMNS.map((col) => (
								<th
									key={col.level}
									scope="col"
									className="px-3 py-3 text-center font-semibold text-[var(--color-text)] sm:px-4"
								>
									{col.label}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{rows.map((row) => {
							const isHighlighted = row.kg === closestWeight;
							return (
								<tr
									key={row.kg}
									className={
										isHighlighted
											? "border-b border-[var(--color-border)] bg-[var(--color-primary-light)]"
											: "border-b border-[var(--color-border)] hover:bg-[var(--color-surface)]"
									}
								>
									<th
										scope="row"
										className={`sticky left-0 z-10 px-3 py-2.5 text-left font-medium sm:px-4 ${
											isHighlighted
												? "bg-[var(--color-primary-light)] text-[var(--color-primary)]"
												: "bg-[var(--color-surface-strong)] text-[var(--color-text)]"
										}`}
									>
										<span className="font-semibold">{row.kg} kg</span>
										<span className="ml-1.5 text-xs text-[var(--color-text-muted)]">
											({row.lbs} lbs)
										</span>
									</th>
									{row.intakes.map((intake, idx) => (
										<td
											key={ACTIVITY_COLUMNS[idx].level}
											className={`px-3 py-2.5 text-center sm:px-4 ${
												isHighlighted
													? "font-medium text-[var(--color-text)]"
													: "text-[var(--color-text-muted)]"
											}`}
										>
											<span className="font-medium text-[var(--color-text)]">
												{intake.ml.toLocaleString()} mL
											</span>
											<br />
											<span className="text-xs text-[var(--color-text-muted)]">
												{intake.glasses} glasses
											</span>
										</td>
									))}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			<p className="mt-4 text-sm text-[var(--color-text-muted)]">
				1 glass = 250 mL. Hot or humid climates may require 15-30% more.
				Consult a healthcare professional for personalized advice.
			</p>
		</div>
	);
}
