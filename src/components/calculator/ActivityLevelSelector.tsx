import { useCallback, useRef } from "react";
import type { ActivityLevel } from "#/lib/types";
import { cn } from "#/lib/utils";

const ACTIVITY_LEVELS: ReadonlyArray<{
	value: ActivityLevel;
	label: string;
	description: string;
}> = [
	{
		value: "sedentary",
		label: "Sedentary",
		description: "I sit most of the day",
	},
	{
		value: "light",
		label: "Light",
		description: "Light exercise 1-3 days/week",
	},
	{
		value: "moderate",
		label: "Active",
		description: "Moderate exercise 3-5 days/week",
	},
	{
		value: "very-active",
		label: "Very Active",
		description: "Hard exercise 6-7 days/week",
	},
	{
		value: "extreme",
		label: "Extreme",
		description: "Intense training or a physical job",
	},
];

interface ActivityLevelSelectorProps {
	value: ActivityLevel;
	onChange: (level: ActivityLevel) => void;
}

export function ActivityLevelSelector({
	value,
	onChange,
}: ActivityLevelSelectorProps) {
	const cardRefs = useRef<Map<ActivityLevel, HTMLDivElement>>(new Map());

	const setCardRef = useCallback(
		(level: ActivityLevel) => (el: HTMLDivElement | null) => {
			if (el) {
				cardRefs.current.set(level, el);
			} else {
				cardRefs.current.delete(level);
			}
		},
		[],
	);

	const focusCard = useCallback((level: ActivityLevel) => {
		cardRefs.current.get(level)?.focus();
	}, []);

	const selectLevel = useCallback(
		(level: ActivityLevel) => {
			onChange(level);
			focusCard(level);
		},
		[onChange, focusCard],
	);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>) => {
			const currentIndex = ACTIVITY_LEVELS.findIndex((l) => l.value === value);
			let nextIndex: number | null = null;

			switch (event.key) {
				case "ArrowDown":
				case "ArrowRight": {
					event.preventDefault();
					nextIndex = (currentIndex + 1) % ACTIVITY_LEVELS.length;
					break;
				}
				case "ArrowUp":
				case "ArrowLeft": {
					event.preventDefault();
					nextIndex =
						(currentIndex - 1 + ACTIVITY_LEVELS.length) %
						ACTIVITY_LEVELS.length;
					break;
				}
				case " ":
				case "Enter": {
					event.preventDefault();
					const focused = document.activeElement as HTMLElement | null;
					const level = focused?.dataset.level as ActivityLevel | undefined;
					if (level) {
						selectLevel(level);
					}
					break;
				}
				default:
					return;
			}

			if (nextIndex !== null) {
				const next = ACTIVITY_LEVELS[nextIndex];
				selectLevel(next.value);
			}
		},
		[value, selectLevel],
	);

	return (
		<div className="flex flex-col gap-2">
			<span className="text-sm font-medium text-[var(--color-text)]">
				Activity Level
			</span>
			<div
				role="radiogroup"
				aria-label="Activity level"
				onKeyDown={handleKeyDown}
				className="grid grid-cols-1 gap-3 sm:grid-cols-2"
			>
				{ACTIVITY_LEVELS.map((level) => {
					const isSelected = value === level.value;

					return (
						// biome-ignore lint/a11y/useSemanticElements: custom radio card pattern requires div with role="radio"
						<div
							key={level.value}
							ref={setCardRef(level.value)}
							role="radio"
							aria-checked={isSelected}
							tabIndex={isSelected ? 0 : -1}
							data-level={level.value}
							onClick={() => selectLevel(level.value)}
							className={cn(
								"min-h-12 cursor-pointer rounded-lg border px-4 py-3 transition-[transform,border-color,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98]",
								"outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
								isSelected
									? "border-[var(--color-primary)] bg-[color-mix(in_oklab,var(--color-primary)_8%,var(--color-surface)_92%)]"
									: "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[color-mix(in_oklab,var(--color-primary)_30%,var(--color-border)_70%)]",
							)}
						>
							<span className="block text-sm font-bold text-[var(--color-text)]">
								{level.label}
							</span>
							<span className="block text-sm text-[var(--color-text-muted)]">
								{level.description}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
