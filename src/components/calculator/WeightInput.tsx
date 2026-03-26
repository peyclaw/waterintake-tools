import { useCallback } from "react";

import type { WeightUnit } from "#/lib/types";
import { cn } from "#/lib/utils";

const KG_TO_LBS = 2.20462;
const LBS_TO_KG = 0.453592;

type WeightInputProps = {
	value: number;
	unit: WeightUnit;
	onChange: (weight: number, unit: WeightUnit) => void;
};

const units: WeightUnit[] = ["kg", "lbs"];

export default function WeightInput({
	value,
	unit,
	onChange,
}: WeightInputProps) {
	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const raw = e.target.value;
			if (raw === "") {
				onChange(0, unit);
				return;
			}
			const parsed = Number.parseInt(raw, 10);
			if (!Number.isNaN(parsed)) {
				onChange(parsed, unit);
			}
		},
		[onChange, unit],
	);

	const handleUnitSwitch = useCallback(
		(nextUnit: WeightUnit) => {
			if (nextUnit === unit) return;

			const converted =
				nextUnit === "lbs"
					? Math.round(value * KG_TO_LBS)
					: Math.round(value * LBS_TO_KG);

			onChange(converted, nextUnit);
		},
		[onChange, unit, value],
	);

	return (
		<div className="flex flex-col gap-2">
			<label
				htmlFor="weight-input"
				className="text-sm font-medium text-[var(--color-text)]"
			>
				Weight
			</label>
			<span id="weight-unit-hint" className="sr-only">
				Currently in {unit}
			</span>

			<div className="flex gap-2">
				<input
					id="weight-input"
					type="text"
					inputMode="numeric"
					pattern="[0-9]*"
					value={value === 0 ? "" : value}
					onChange={handleInputChange}
					aria-describedby="weight-unit-hint"
					placeholder={unit === "kg" ? "e.g., 70" : "e.g., 154"}
					className={cn(
						"min-h-12 flex-1 rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-base text-[var(--color-text)]",
						"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]",
					)}
				/>

				<fieldset className="flex overflow-hidden rounded-3xl border border-[var(--color-border)]">
					<legend className="sr-only">Weight unit</legend>
					{units.map((u) => {
						const isSelected = u === unit;
						const id = `weight-unit-${u}`;
						return (
							<label
								key={u}
								htmlFor={id}
								className={cn(
									"relative flex min-h-12 min-w-[3.5rem] cursor-pointer items-center justify-center px-4 text-sm font-semibold transition-[transform,background-color,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]",
									"has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--color-primary)]",
									isSelected
										? "bg-[var(--color-primary)] text-[var(--color-on-primary)]"
										: "bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-primary)]/10",
								)}
							>
								<input
									id={id}
									type="radio"
									name="weight-unit"
									value={u}
									checked={isSelected}
									onChange={() => handleUnitSwitch(u)}
									className="sr-only"
								/>
								{u}
							</label>
						);
					})}
				</fieldset>
			</div>
		</div>
	);
}
