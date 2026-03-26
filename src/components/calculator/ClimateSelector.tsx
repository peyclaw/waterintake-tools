import { useCallback, useRef } from "react";

import type { Climate } from "#/lib/types";
import { cn } from "#/lib/utils";

const OPTIONS: { label: string; value: Climate }[] = [
	{ label: "Cool/Mild", value: "temperate" },
	{ label: "Warm", value: "hot" },
	{ label: "Hot & Humid", value: "hot-humid" },
];

interface ClimateSelectorProps {
	value: Climate;
	onChange: (climate: Climate) => void;
}

export default function ClimateSelector({
	value,
	onChange,
}: ClimateSelectorProps) {
	const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

	const selectedIndex = OPTIONS.findIndex((o) => o.value === value);

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
					nextIndex = (selectedIndex + 1) % OPTIONS.length;
					break;
				}
				case "ArrowLeft":
				case "ArrowUp": {
					event.preventDefault();
					nextIndex = (selectedIndex - 1 + OPTIONS.length) % OPTIONS.length;
					break;
				}
				case " ":
				case "Enter": {
					event.preventDefault();
					const clickedValue = event.currentTarget.dataset.value as Climate;
					if (clickedValue) {
						onChange(clickedValue);
					}
					return;
				}
				default:
					return;
			}

			if (nextIndex !== null) {
				onChange(OPTIONS[nextIndex].value);
				focusOption(nextIndex);
			}
		},
		[selectedIndex, onChange, focusOption],
	);

	return (
		<div className="flex flex-col gap-2">
			<span
				className="text-sm font-medium text-[var(--color-text)]"
				id="climate-selector-label"
			>
				Climate
			</span>

			<div
				role="radiogroup"
				aria-labelledby="climate-selector-label"
				className="grid grid-cols-3 overflow-hidden rounded-3xl border border-[var(--color-border)]"
			>
				{OPTIONS.map((option, index) => {
					const isSelected = option.value === value;

					return (
						// biome-ignore lint/a11y/useSemanticElements: custom segmented control using WAI-ARIA radio pattern
						<button
							key={option.value}
							ref={(el) => {
								optionRefs.current[index] = el;
							}}
							type="button"
							role="radio"
							aria-checked={isSelected}
							tabIndex={isSelected ? 0 : -1}
							data-value={option.value}
							onClick={() => onChange(option.value)}
							onKeyDown={handleKeyDown}
							className={cn(
								"min-h-12 cursor-pointer text-sm font-medium transition-[transform,background-color,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] outline-none active:scale-[0.97]",
								"focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-inset",
								isSelected
									? "bg-[var(--color-primary)] text-[var(--color-on-primary)]"
									: "bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-primary)]/10",
							)}
						>
							{option.label}
						</button>
					);
				})}
			</div>
		</div>
	);
}
