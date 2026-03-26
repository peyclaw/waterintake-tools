import { useCallback, useRef, useState } from "react";
import { GlassWater } from "lucide-react";
import { calculateBottleRefills } from "#/lib/calculator";
import type { BottleSize } from "#/lib/types";
import { cn } from "#/lib/utils";

interface BottleRefillCalculatorProps {
	totalMl: number;
}

const BOTTLE_SIZES: readonly BottleSize[] = [250, 500, 750, 1000];

const BOTTLE_LABELS: Record<BottleSize, string> = {
	250: "250 mL",
	500: "500 mL",
	750: "750 mL",
	1000: "1 L",
};

export function BottleRefillCalculator({
	totalMl,
}: BottleRefillCalculatorProps) {
	const [selectedSize, setSelectedSize] = useState<BottleSize>(500);
	const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

	const result = calculateBottleRefills(totalMl, selectedSize);

	const selectedIndex = BOTTLE_SIZES.indexOf(selectedSize);

	const focusOption = useCallback((index: number) => {
		optionRefs.current[index]?.focus();
	}, []);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLButtonElement>) => {
			let nextIndex: number | null = null;

			switch (event.key) {
				case "ArrowRight":
				case "ArrowDown": {
					event.preventDefault();
					nextIndex = (selectedIndex + 1) % BOTTLE_SIZES.length;
					break;
				}
				case "ArrowLeft":
				case "ArrowUp": {
					event.preventDefault();
					nextIndex =
						(selectedIndex - 1 + BOTTLE_SIZES.length) % BOTTLE_SIZES.length;
					break;
				}
				case " ":
				case "Enter": {
					event.preventDefault();
					const clickedValue = event.currentTarget.dataset.size;
					if (clickedValue) {
						setSelectedSize(Number(clickedValue) as BottleSize);
					}
					return;
				}
				default:
					return;
			}

			if (nextIndex !== null) {
				const nextSize = BOTTLE_SIZES[nextIndex];
				setSelectedSize(nextSize);
				focusOption(nextIndex);
			}
		},
		[selectedIndex, focusOption],
	);

	return (
		<div className="flex flex-col gap-4">
			<div className="mb-2 flex items-center gap-3">
				<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary-light)]">
					<GlassWater
						size={20}
						className="text-[var(--color-primary)]"
						aria-hidden="true"
					/>
				</div>
				<h2 className="text-xl font-bold leading-[1.2] text-[var(--color-text)]">
					Bottle Refill Calculator
				</h2>
			</div>
			<div className="flex flex-col gap-2">
				<span
					className="text-sm font-medium text-[var(--color-text)]"
					id="bottle-size-label"
				>
					Bottle size
				</span>
				<div
					role="radiogroup"
					aria-labelledby="bottle-size-label"
					className="flex flex-wrap gap-2"
				>
					{BOTTLE_SIZES.map((size, index) => {
						const isSelected = size === selectedSize;
						return (
							// biome-ignore lint/a11y/useSemanticElements: custom segmented control using WAI-ARIA radio pattern
							<button
								key={size}
								ref={(el) => {
									optionRefs.current[index] = el;
								}}
								type="button"
								role="radio"
								aria-checked={isSelected}
								tabIndex={isSelected ? 0 : -1}
								data-size={size}
								onClick={() => setSelectedSize(size)}
								onKeyDown={handleKeyDown}
								className={cn(
									"min-h-12 cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium",
									"transition-[transform,background-color,color,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]",
									"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]",
									isSelected
										? "bg-[var(--color-primary)] text-[var(--color-on-primary)]"
										: "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[color-mix(in_oklab,var(--color-primary)_30%,var(--color-border)_70%)]",
								)}
							>
								{BOTTLE_LABELS[size]}
							</button>
						);
					})}
				</div>
			</div>

			<div
				className={cn(
					"flex items-center gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4",
				)}
				aria-live="polite"
				aria-atomic="true"
			>
				<div className="flex shrink-0 items-center gap-1 text-[var(--color-primary)]">
					{Array.from({ length: Math.min(result.refills, 5) }).map(
						(_, i) => (
							<GlassWater
								// biome-ignore lint/suspicious/noArrayIndexKey: static list based on refill count
								key={i}
								className="h-5 w-5"
								aria-hidden="true"
							/>
						),
					)}
					{result.refills > 5 && (
						<span
							className="ml-0.5 text-xs font-semibold text-[var(--color-primary)]"
							aria-hidden="true"
						>
							+{result.refills - 5}
						</span>
					)}
				</div>

				<div className="flex flex-col">
					<p className="text-sm font-medium text-[var(--color-text)]">
						Fill your{" "}
						<span className="font-bold">{BOTTLE_LABELS[selectedSize]}</span>{" "}
						bottle{" "}
						<span className="font-bold text-[var(--color-primary)]">
							{result.refills} {result.refills === 1 ? "time" : "times"}
						</span>
					</p>
					{result.remainder > 0 && (
						<p className="text-sm text-[var(--color-text-muted)]">
							+ {result.remainder} mL remaining
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
