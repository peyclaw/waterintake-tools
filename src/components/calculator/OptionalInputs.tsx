import { useCallback } from "react";
import type { Sex, SpecialConditions } from "#/lib/types";
import { cn } from "#/lib/utils";

interface OptionalInputsProps {
	sex: Sex;
	conditions: SpecialConditions;
	exerciseMinutes: number;
	onConditionsChange: (conditions: SpecialConditions) => void;
	onExerciseChange: (minutes: number) => void;
}

export function OptionalInputs({
	sex,
	conditions,
	exerciseMinutes,
	onConditionsChange,
	onExerciseChange,
}: OptionalInputsProps) {
	const handlePregnancyChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			onConditionsChange({
				...conditions,
				pregnancy: e.target.checked,
			});
		},
		[conditions, onConditionsChange],
	);

	const handleLactationChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			onConditionsChange({
				...conditions,
				lactation: e.target.checked,
			});
		},
		[conditions, onConditionsChange],
	);

	const handleExerciseChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const raw = e.target.value;
			if (raw === "") {
				onExerciseChange(0);
				return;
			}
			const parsed = Number.parseInt(raw, 10);
			if (!Number.isNaN(parsed) && parsed >= 0) {
				onExerciseChange(parsed);
			}
		},
		[onExerciseChange],
	);

	const showSpecialConditions = sex === "female";

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
				Refine your result
			</summary>

			<div className="mt-4 space-y-4 pl-1">
				{showSpecialConditions && (
					<fieldset className="m-0 border-none p-0">
						<legend className="mb-2 text-sm font-medium text-[var(--color-text)]">
							Special Conditions
						</legend>
						<div className="space-y-2">
							<label
								htmlFor="condition-pregnant"
								className={cn(
									"flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border px-4 py-2",
									"transition-colors duration-200",
									conditions.pregnancy
										? "border-[var(--color-primary)] bg-[color-mix(in_oklab,var(--color-primary)_8%,var(--color-surface)_92%)]"
										: "border-[var(--color-border)] bg-[var(--color-surface)]",
								)}
							>
								<input
									id="condition-pregnant"
									type="checkbox"
									checked={conditions.pregnancy ?? false}
									onChange={handlePregnancyChange}
									className={cn(
										"h-4 w-4 shrink-0 cursor-pointer rounded border-[var(--color-border)]",
										"accent-[var(--color-primary)]",
										"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]",
									)}
								/>
								<span className="flex flex-col">
									<span className="text-sm font-medium text-[var(--color-text)]">
										Pregnant
									</span>
									<span className="text-sm text-[var(--color-text-muted)]">
										+300 mL per day
									</span>
								</span>
							</label>

							<label
								htmlFor="condition-lactating"
								className={cn(
									"flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border px-4 py-2",
									"transition-colors duration-200",
									conditions.lactation
										? "border-[var(--color-primary)] bg-[color-mix(in_oklab,var(--color-primary)_8%,var(--color-surface)_92%)]"
										: "border-[var(--color-border)] bg-[var(--color-surface)]",
								)}
							>
								<input
									id="condition-lactating"
									type="checkbox"
									checked={conditions.lactation ?? false}
									onChange={handleLactationChange}
									className={cn(
										"h-4 w-4 shrink-0 cursor-pointer rounded border-[var(--color-border)]",
										"accent-[var(--color-primary)]",
										"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]",
									)}
								/>
								<span className="flex flex-col">
									<span className="text-sm font-medium text-[var(--color-text)]">
										Lactating
									</span>
									<span className="text-sm text-[var(--color-text-muted)]">
										+700 mL per day
									</span>
								</span>
							</label>
						</div>
					</fieldset>
				)}

				<div className="flex flex-col gap-2">
					<label
						htmlFor="exercise-input"
						className="text-sm font-medium text-[var(--color-text)]"
					>
						Exercise duration
					</label>
					<div className="flex items-center gap-2">
						<input
							id="exercise-input"
							type="text"
							inputMode="numeric"
							pattern="[0-9]*"
							value={exerciseMinutes === 0 ? "" : exerciseMinutes}
							onChange={handleExerciseChange}
							placeholder="0"
							aria-describedby="exercise-hint"
							className={cn(
								"min-h-12 w-24 rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-base text-[var(--color-text)]",
								"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]",
							)}
						/>
						<span
							id="exercise-hint"
							className="text-sm text-[var(--color-text-muted)]"
						>
							min / day
						</span>
					</div>
					{exerciseMinutes > 0 && (
						<p className="text-sm text-[var(--color-text-muted)]">
							+{exerciseMinutes * 12} mL for exercise hydration
						</p>
					)}
				</div>
			</div>
		</details>
	);
}
