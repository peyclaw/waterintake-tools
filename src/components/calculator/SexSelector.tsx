import { useCallback, useRef } from "react";
import type { Sex } from "#/lib/types";
import { cn } from "#/lib/utils";

interface SexSelectorProps {
	value: Sex;
	onChange: (sex: Sex) => void;
}

const OPTIONS: readonly { value: Sex; label: string }[] = [
	{ value: "male", label: "Male" },
	{ value: "female", label: "Female" },
];

export default function SexSelector({ value, onChange }: SexSelectorProps) {
	const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

	const setOptionRef = useCallback(
		(index: number) => (el: HTMLButtonElement | null) => {
			optionRefs.current[index] = el;
		},
		[],
	);

	const focusOption = useCallback((index: number) => {
		optionRefs.current[index]?.focus();
	}, []);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLButtonElement>) => {
			const currentIndex = OPTIONS.findIndex((opt) => opt.value === value);
			let nextIndex: number | null = null;

			switch (event.key) {
				case "ArrowLeft":
				case "ArrowUp": {
					event.preventDefault();
					nextIndex = (currentIndex - 1 + OPTIONS.length) % OPTIONS.length;
					break;
				}
				case "ArrowRight":
				case "ArrowDown": {
					event.preventDefault();
					nextIndex = (currentIndex + 1) % OPTIONS.length;
					break;
				}
				case " ":
				case "Enter": {
					event.preventDefault();
					onChange(OPTIONS[currentIndex]?.value ?? OPTIONS[0].value);
					return;
				}
				default:
					return;
			}

			if (nextIndex !== null) {
				const nextOption = OPTIONS[nextIndex];
				if (nextOption) {
					onChange(nextOption.value);
					focusOption(nextIndex);
				}
			}
		},
		[value, onChange, focusOption],
	);

	return (
		<div className="flex flex-col gap-2">
			<span className="text-sm font-medium text-[var(--color-text)]">Sex</span>
			<div
				role="radiogroup"
				aria-label="Biological sex"
				className="inline-flex rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-1"
			>
				{OPTIONS.map((option, index) => {
					const isSelected = value === option.value;
					return (
						// biome-ignore lint/a11y/useSemanticElements: custom segmented radio control uses role="radio" on buttons per WAI-ARIA radio group pattern
						<button
							key={option.value}
							ref={setOptionRef(index)}
							type="button"
							role="radio"
							aria-checked={isSelected}
							tabIndex={isSelected ? 0 : -1}
							onClick={() => onChange(option.value)}
							onKeyDown={handleKeyDown}
							className={cn(
								"min-h-12 flex-1 cursor-pointer rounded-2xl px-4 text-sm font-medium transition-[transform,background-color,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]",
								"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]",
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
