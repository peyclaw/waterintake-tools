const URINE_COLORS = [
	{
		color: "#FEFCE8",
		label: "Pale straw",
		status: "Well hydrated",
		action: null,
		level: "optimal" as const,
	},
	{
		color: "#FEF9C3",
		label: "Light yellow",
		status: "Hydrated",
		action: null,
		level: "good" as const,
	},
	{
		color: "#FDE68A",
		label: "Yellow",
		status: "Normal",
		action: null,
		level: "normal" as const,
	},
	{
		color: "#FCD34D",
		label: "Dark yellow",
		status: "Mildly dehydrated",
		action: "Drink some water",
		level: "mild" as const,
	},
	{
		color: "#F59E0B",
		label: "Amber",
		status: "Dehydrated",
		action: "Drink water now",
		level: "warning" as const,
	},
	{
		color: "#D97706",
		label: "Honey",
		status: "Very dehydrated",
		action: "Drink water immediately",
		level: "danger" as const,
	},
	{
		color: "#92400E",
		label: "Brown",
		status: "Severely dehydrated",
		action: "Seek medical attention",
		level: "critical" as const,
	},
] as const;

type HydrationLevel = (typeof URINE_COLORS)[number]["level"];

const STATUS_ICONS: Record<HydrationLevel, string> = {
	optimal: "\u2713\u2713",
	good: "\u2713",
	normal: "\u2013",
	mild: "!",
	warning: "!!",
	danger: "!!!",
	critical: "\u26A0",
};

function getStatusClasses(level: HydrationLevel): string {
	switch (level) {
		case "optimal":
		case "good":
			return "text-[var(--color-cta)] font-medium";
		case "normal":
			return "text-[var(--color-text-muted)]";
		case "mild":
			return "text-[var(--color-text)] font-medium";
		case "warning":
		case "danger":
		case "critical":
			return "text-[var(--color-text)] font-semibold";
	}
}

export function UrineColorGuide() {
	return (
		<div className="island-shell rise-in rounded-lg p-6">
			<h2 className="mb-2 text-xl font-bold leading-[1.2] text-[var(--color-text)]">
				Urine Color Hydration Guide
			</h2>
			<p className="mb-6 text-sm text-[var(--color-text-muted)]">
				Check your urine color as a quick hydration indicator. Lighter
				colors generally mean better hydration. This guide works best with
				your first morning urine sample.
			</p>

			<div role="list" aria-label="Urine color hydration levels" className="space-y-3">
				{URINE_COLORS.map((entry) => (
					<div
						key={entry.label}
						role="listitem"
						className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 sm:gap-4"
					>
						{/* Color swatch -- decorative for visual users, text label below provides meaning */}
						<div
							className="h-10 w-10 flex-shrink-0 rounded-lg border border-black/10 sm:h-12 sm:w-12"
							style={{ backgroundColor: entry.color }}
							aria-hidden="true"
						/>

						<div className="min-w-0 flex-1">
							<div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
								<span className="font-medium text-[var(--color-text)]">
									{entry.label}
								</span>
								<span
									className={`text-sm ${getStatusClasses(entry.level)}`}
									aria-label={`Hydration status: ${entry.status}`}
								>
									{STATUS_ICONS[entry.level]} {entry.status}
								</span>
							</div>
							{entry.action && (
								<p className="mt-0.5 text-sm text-[var(--color-text-muted)]">
									{entry.action}
								</p>
							)}
						</div>
					</div>
				))}
			</div>

			<div className="mt-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-4 py-3">
				<p className="text-sm leading-5 text-[var(--color-text-muted)]">
					<strong className="text-[var(--color-text)]">Note:</strong> Urine
					color can be affected by vitamins (especially B2), medications,
					and certain foods like beets or asparagus. This guide provides a
					general indication and should not replace professional medical
					assessment. If you notice persistently dark urine despite adequate
					fluid intake, consult a healthcare provider.
				</p>
			</div>
		</div>
	);
}
