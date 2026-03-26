import { useMemo } from "react";
import {
	ACTIVITY_MULTIPLIERS,
	CLIMATE_MULTIPLIERS,
	applyActivityMultiplier,
	applyClimateMultiplier,
	applyExerciseDuration,
	applySpecialConditions,
	calculateBaseIntake,
	calculateBeverageIntake,
	lbsToKg,
} from "#/lib/calculator";
import type {
	ActivityLevel,
	Climate,
	SpecialConditions,
	WeightUnit,
} from "#/lib/types";
import { cn } from "#/lib/utils";

interface FormulaBreakdownProps {
	weightKg: number;
	activityLevel: ActivityLevel;
	climate: Climate;
	conditions: SpecialConditions;
	exerciseMinutes: number;
	unit: WeightUnit;
}

const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
	sedentary: "Sedentary",
	light: "Light",
	moderate: "Active",
	"very-active": "Very Active",
	extreme: "Extreme",
};

const CLIMATE_LABELS: Record<Climate, string> = {
	temperate: "Cool/Mild",
	hot: "Warm",
	"hot-humid": "Hot & Humid",
};

interface FormulaStep {
	label: string;
	detail: string;
	result: string;
}

function useFormulaSteps(props: FormulaBreakdownProps): FormulaStep[] {
	const {
		weightKg: rawWeight,
		activityLevel,
		climate,
		conditions,
		exerciseMinutes,
		unit,
	} = props;

	return useMemo(() => {
		const weightKg = unit === "lbs" ? lbsToKg(rawWeight) : rawWeight;
		const steps: FormulaStep[] = [];

		// Step 1: Base calculation
		const base = calculateBaseIntake(weightKg);
		steps.push({
			label: "Base intake",
			detail: `${Math.round(weightKg)} kg x 33 mL`,
			result: `${Math.round(base)} mL`,
		});

		// Step 2: Activity multiplier
		const afterActivity = applyActivityMultiplier(base, activityLevel);
		const actMultiplier = ACTIVITY_MULTIPLIERS[activityLevel];
		steps.push({
			label: `Activity (${ACTIVITY_LABELS[activityLevel]})`,
			detail: `x ${actMultiplier}`,
			result: `${Math.round(afterActivity)} mL`,
		});

		// Step 3: Climate multiplier
		const afterClimate = applyClimateMultiplier(afterActivity, climate);
		const climMultiplier = CLIMATE_MULTIPLIERS[climate];
		steps.push({
			label: `Climate (${CLIMATE_LABELS[climate]})`,
			detail: `x ${climMultiplier}`,
			result: `${Math.round(afterClimate)} mL`,
		});

		// Step 4: Special conditions (if applicable)
		const conditionAmount =
			(conditions.pregnancy ? 300 : 0) + (conditions.lactation ? 700 : 0);
		if (conditionAmount > 0) {
			const afterConditions = applySpecialConditions(afterClimate, conditions);
			const parts: string[] = [];
			if (conditions.pregnancy) parts.push("pregnancy +300");
			if (conditions.lactation) parts.push("lactation +700");
			steps.push({
				label: "Special conditions",
				detail: `+ ${conditionAmount} mL (${parts.join(", ")})`,
				result: `${Math.round(afterConditions)} mL`,
			});
		}

		// Step 5: Exercise (if applicable)
		const totalBeforeExercise = Math.round(
			applySpecialConditions(afterClimate, conditions),
		);
		if (exerciseMinutes > 0) {
			const exerciseAmount = exerciseMinutes * 12;
			const afterExercise = applyExerciseDuration(
				totalBeforeExercise,
				exerciseMinutes,
			);
			steps.push({
				label: "Exercise",
				detail: `+ ${exerciseAmount} mL (${exerciseMinutes} min x 12 mL)`,
				result: `${Math.round(afterExercise)} mL`,
			});
		}

		// Step 6: Beverage intake (80%)
		const totalIntake =
			exerciseMinutes > 0
				? applyExerciseDuration(totalBeforeExercise, exerciseMinutes)
				: totalBeforeExercise;
		const beverage = calculateBeverageIntake(totalIntake);
		steps.push({
			label: "Beverage intake (80%)",
			detail: "Food provides ~20% of water",
			result: `${Math.round(beverage)} mL`,
		});

		return steps;
	}, [rawWeight, unit, activityLevel, climate, conditions, exerciseMinutes]);
}

export function FormulaBreakdown(props: FormulaBreakdownProps) {
	const steps = useFormulaSteps(props);

	return (
		<details className="group">
			<summary
				className={cn(
					"flex cursor-pointer list-none items-center gap-2 text-sm font-semibold text-[var(--color-text)]",
					"select-none rounded-lg px-3 py-2 transition-colors duration-200",
					"hover:bg-[var(--color-surface)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]",
					"[&::-webkit-details-marker]:hidden",
				)}
			>
				<svg
					className="h-4 w-4 shrink-0 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-open:rotate-90"
					viewBox="0 0 16 16"
					fill="none"
					aria-hidden="true"
				>
					<path
						d="M6 4l4 4-4 4"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				How we calculated this
			</summary>

			<div className="mt-4 pl-1">
				<ol
					className="space-y-0 divide-y divide-[var(--color-border)]"
					aria-label="Calculation steps"
				>
					{steps.map((step, index) => {
						const isLast = index === steps.length - 1;
						return (
							<li
								key={step.label}
								className={cn(
									"flex flex-col gap-0.5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4",
									isLast && "font-semibold",
								)}
							>
								<div className="flex items-start gap-2">
									<span
										className={cn(
											"flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs",
											isLast
												? "bg-[var(--color-primary)] text-[var(--color-on-primary)] font-bold"
												: "bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)]",
										)}
										aria-hidden="true"
									>
										{index + 1}
									</span>
									<div className="flex flex-col">
										<span className="text-sm text-[var(--color-text)]">
											{step.label}
										</span>
										<span className="text-sm text-[var(--color-text-muted)]">
											{step.detail}
										</span>
									</div>
								</div>
								<span
									className={cn(
										"ml-7 text-sm tabular-nums sm:ml-0 sm:text-right",
										isLast
											? "text-[var(--color-primary)] font-bold"
											: "text-[var(--color-text)]",
									)}
								>
									= {step.result}
								</span>
							</li>
						);
					})}
				</ol>
			</div>
		</details>
	);
}
