import { cn } from "#/lib/utils";

type GlassVisualizationProps = {
	glasses: number;
};

const MAX_DISPLAY = 15;
const MAX_PER_ROW = 8;

function getBalancedRows<T>(items: T[]): T[][] {
	if (items.length <= MAX_PER_ROW) return [items];
	const rowCount = Math.ceil(items.length / MAX_PER_ROW);
	const base = Math.floor(items.length / rowCount);
	const extra = items.length % rowCount;
	const rows: T[][] = [];
	let offset = 0;
	for (let i = 0; i < rowCount; i++) {
		const size = i < extra ? base + 1 : base;
		rows.push(items.slice(offset, offset + size));
		offset += size;
	}
	return rows;
}

function WaterGlass({
	fillPercent,
	index,
}: {
	fillPercent: number;
	index: number;
}) {
	const clampedFill = Math.max(0, Math.min(1, fillPercent));
	const fillHeight = 26 * clampedFill;
	const fillY = 10 + 26 * (1 - clampedFill);
	const animationDelay = `${index * 60}ms`;

	return (
		<svg
			viewBox="0 0 32 40"
			className="glass-appear h-[30px] w-[24px] sm:h-[40px] sm:w-[32px] md:h-[44px] md:w-[36px]"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label={
				clampedFill >= 1
					? "Full glass"
					: clampedFill > 0
						? `Glass ${Math.round(clampedFill * 100)}% full`
						: "Empty glass"
			}
			style={{ animationDelay }}
		>
			{/* Glass body - tapered tumbler */}
			<path
				d="M5 6 L3 36 Q3 38 5 38 L27 38 Q29 38 29 36 L27 6 Q27 4 25 4 L7 4 Q5 4 5 6Z"
				stroke="var(--color-primary)"
				strokeWidth="1.5"
				fill="none"
				strokeLinejoin="round"
			/>

			{/* Water fill clipped to glass interior */}
			{clampedFill > 0 && (
				<>
					<clipPath id={`glass-clip-${index}`}>
						<path d="M5.5 6.5 L3.5 35.5 Q3.5 37.5 5.5 37.5 L26.5 37.5 Q28.5 37.5 28.5 35.5 L26.5 6.5 Q26.5 5 25 5 L7 5 Q5.5 5 5.5 6.5Z" />
					</clipPath>
					<rect
						x="3"
						y={fillY}
						width="26"
						height={fillHeight}
						fill="var(--color-primary)"
						opacity="0.35"
						clipPath={`url(#glass-clip-${index})`}
						className="glass-fill"
						style={{ animationDelay }}
					/>
				</>
			)}
		</svg>
	);
}

export function GlassVisualization({ glasses }: GlassVisualizationProps) {
	const wholeCount = Math.floor(glasses);
	const fraction = glasses - wholeCount;
	const displayCount = Math.min(
		wholeCount + (fraction > 0 ? 1 : 0),
		MAX_DISPLAY,
	);
	const overflow = glasses - MAX_DISPLAY;

	const items: Array<{ key: number; fill: number }> = [];
	for (let i = 0; i < displayCount; i++) {
		if (i < wholeCount) {
			items.push({ key: i, fill: 1 });
		} else {
			items.push({ key: i, fill: fraction });
		}
	}

	const rows = getBalancedRows(items);

	return (
		<div
			key={glasses}
			role="img"
			aria-label={`Visual representation of ${glasses.toFixed(1)} glasses of water`}
			className={cn("flex flex-col items-center gap-2 py-4")}
		>
			{rows.map((row, rowIndex) => (
				<div key={rowIndex} className="flex items-end justify-center gap-2">
					{row.map((item) => (
						<WaterGlass
							key={item.key}
							fillPercent={item.fill}
							index={item.key}
						/>
					))}
				</div>
			))}
			{overflow > 0 && (
				<span className="text-sm font-semibold text-[var(--color-text-muted)]">
					+{Math.ceil(overflow)} more
				</span>
			)}
		</div>
	);
}
