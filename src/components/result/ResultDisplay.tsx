import { useCallback, useRef } from "react";
import { mlToOz } from "#/lib/calculator";
import type { CalculatorResult, ResultUnit } from "#/lib/types";
import { cn } from "#/lib/utils";

const RESULT_UNITS: ReadonlyArray<{ value: ResultUnit; label: string }> = [
	{ value: "mL", label: "mL" },
	{ value: "oz", label: "fl oz" },
	{ value: "L", label: "L" },
];

type ResultDisplayProps = {
	result: CalculatorResult;
	resultUnit: ResultUnit;
	onResultUnitChange: (unit: ResultUnit) => void;
};

function formatValue(ml: number, unit: ResultUnit): number {
	switch (unit) {
		case "oz":
			return Math.round(mlToOz(ml));
		case "L":
			return Math.round((ml / 1000) * 10) / 10;
		default:
			return Math.round(ml);
	}
}

function formatUnitLabel(unit: ResultUnit): string {
	switch (unit) {
		case "oz":
			return "fl oz";
		case "L":
			return "L";
		default:
			return "mL";
	}
}

export function ResultDisplay({
	result,
	resultUnit,
	onResultUnitChange,
}: ResultDisplayProps) {
	const displayValue = formatValue(result.beverageIntakeMl, resultUnit);
	const unitLabel = formatUnitLabel(resultUnit);
	const btnRefs = useRef<Map<ResultUnit, HTMLButtonElement>>(new Map());

	const setBtnRef = useCallback(
		(unit: ResultUnit) => (el: HTMLButtonElement | null) => {
			if (el) btnRefs.current.set(unit, el);
			else btnRefs.current.delete(unit);
		},
		[],
	);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>) => {
			const currentIndex = RESULT_UNITS.findIndex(
				(u) => u.value === resultUnit,
			);
			let nextIndex: number | null = null;

			switch (event.key) {
				case "ArrowRight":
				case "ArrowDown": {
					event.preventDefault();
					nextIndex = (currentIndex + 1) % RESULT_UNITS.length;
					break;
				}
				case "ArrowLeft":
				case "ArrowUp": {
					event.preventDefault();
					nextIndex =
						(currentIndex - 1 + RESULT_UNITS.length) % RESULT_UNITS.length;
					break;
				}
				default:
					return;
			}

			if (nextIndex !== null) {
				const next = RESULT_UNITS[nextIndex];
				onResultUnitChange(next.value);
				btnRefs.current.get(next.value)?.focus();
			}
		},
		[resultUnit, onResultUnitChange],
	);

	return (
		<div
			className={cn(
				"flex flex-col items-center gap-4 rounded-lg px-6 py-8 text-center",
				"border border-[var(--color-border)] bg-[var(--color-surface-strong)]",
			)}
		>
			<p className="island-kicker mb-0">Your daily beverage intake</p>

			<div className="flex flex-col items-center gap-1">
				<span className="result-number text-[var(--color-primary)]">
					{displayValue}
				</span>
				<span className="text-lg font-semibold text-[var(--color-text-muted)]">
					{unitLabel}
				</span>
			</div>

			<p className="text-base font-medium text-[var(--color-text)]">
				~{result.glasses.toFixed(1)} glasses per day
			</p>

			{/* Result unit toggle */}
			<div
				role="radiogroup"
				aria-label="Result display unit"
				onKeyDown={handleKeyDown}
				className="flex gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-1"
			>
				{RESULT_UNITS.map((u) => {
					const isSelected = resultUnit === u.value;
					return (
						<button
							key={u.value}
							ref={setBtnRef(u.value)}
							type="button"
							role="radio"
							aria-checked={isSelected}
							tabIndex={isSelected ? 0 : -1}
							onClick={() => onResultUnitChange(u.value)}
							className={cn(
								"min-h-8 rounded-full px-3 py-1 text-xs font-semibold transition-[background-color,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
								"outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-surface)]",
								isSelected
									? "bg-[var(--color-primary)] text-[var(--color-on-primary)]"
									: "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
							)}
						>
							{u.label}
						</button>
					);
				})}
			</div>

			<p className="text-sm text-[var(--color-text-muted)]">
				Total water need: {Math.round(result.totalIntakeMl)} mL (including
				water from food)
			</p>
		</div>
	);
}
