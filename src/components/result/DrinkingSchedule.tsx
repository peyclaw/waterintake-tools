import { useMemo } from "react";
import { Clock } from "lucide-react";
import { generateDrinkingSchedule, mlToGlasses } from "#/lib/calculator";
import { cn } from "#/lib/utils";

interface DrinkingScheduleProps {
	totalMl: number;
}

export function DrinkingSchedule({ totalMl }: DrinkingScheduleProps) {
	const schedule = useMemo(
		() => generateDrinkingSchedule(totalMl),
		[totalMl],
	);

	if (schedule.length === 0) {
		return null;
	}

	const maxAmount = Math.max(...schedule.map((block) => block.amountMl));

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-2">
				<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary-light)]">
					<Clock
						size={20}
						className="text-[var(--color-primary)]"
						aria-hidden="true"
					/>
				</div>
				<h2 className="text-xl font-bold leading-[1.2] text-[var(--color-text)]">
					Daily Drinking Schedule
				</h2>
			</div>

			<div
				className="space-y-2"
				role="list"
				aria-label="Daily drinking schedule with 8 time blocks"
			>
				{schedule.map((block) => {
					const fillPercent =
						maxAmount > 0
							? Math.round((block.amountMl / maxAmount) * 100)
							: 0;
					const glasses = mlToGlasses(block.amountMl);

					return (
						<div
							key={block.time}
							role="listitem"
							className={cn(
								"flex items-center gap-3 rounded-lg px-3 py-2",
								"border border-[var(--color-border)] bg-[var(--color-surface)]",
							)}
						>
							<span className="w-16 shrink-0 text-xs font-semibold tabular-nums text-[var(--color-text)]">
								{block.time}
							</span>

							<div className="relative h-2 flex-1 overflow-hidden rounded-full bg-[var(--color-border)]">
								<div
									className="absolute inset-y-0 left-0 rounded-full bg-[var(--color-primary)] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
									style={{
										width: `${fillPercent}%`,
										opacity: 0.6 + (fillPercent / 100) * 0.4,
									}}
									role="progressbar"
									aria-valuenow={block.amountMl}
									aria-valuemin={0}
									aria-valuemax={maxAmount}
									aria-label={`${block.amountMl} mL at ${block.time}`}
								/>
							</div>

							<span className="w-20 shrink-0 text-right text-xs tabular-nums text-[var(--color-text-muted)]">
								<span className="font-medium text-[var(--color-text)]">
									{block.amountMl} mL
								</span>
								<span className="ml-1 text-[var(--color-text-muted)]">
									({glasses.toFixed(1)} gl)
								</span>
							</span>
						</div>
					);
				})}
			</div>

			<p className="text-sm text-[var(--color-text-muted)]">
				Distribute your intake across the day for better hydration. Drink more
				in the morning and around meals.
			</p>
		</div>
	);
}
