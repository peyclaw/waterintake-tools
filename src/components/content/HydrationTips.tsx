import type { LucideIcon } from "lucide-react";
import {
	Apple,
	Bell,
	ClipboardCheck,
	Coffee,
	Dumbbell,
	Droplets,
	Eye,
	GlassWater,
	Sunrise,
	Thermometer,
} from "lucide-react";

interface HydrationTip {
	icon: LucideIcon;
	title: string;
	description: string;
}

const tips: HydrationTip[] = [
	{
		icon: Sunrise,
		title: "Start your day with water",
		description:
			"Drink a glass within 30 minutes of waking to rehydrate after sleep and kick-start your metabolism.",
	},
	{
		icon: GlassWater,
		title: "Carry a reusable bottle",
		description:
			"You'll drink more when water is visible and within reach. Keep a bottle at your desk, in your bag, or in the car.",
	},
	{
		icon: Bell,
		title: "Set regular reminders",
		description:
			"Drink at consistent intervals throughout the day rather than trying to consume large amounts at once.",
	},
	{
		icon: Apple,
		title: "Eat water-rich foods",
		description:
			"Cucumbers, watermelon, oranges, and strawberries contribute roughly 20% of your daily water intake.",
	},
	{
		icon: Eye,
		title: "Monitor your urine color",
		description:
			"Pale straw color indicates good hydration. Darker urine is a sign you need to drink more.",
	},
	{
		icon: Droplets,
		title: "Drink before you feel thirsty",
		description:
			"Thirst signals lag behind actual dehydration. By the time you feel thirsty, you may already be mildly dehydrated.",
	},
	{
		icon: Dumbbell,
		title: "Adjust for exercise",
		description:
			"Drink extra before, during, and after physical activity. The ACSM recommends replacing 150% of sweat losses.",
	},
	{
		icon: Coffee,
		title: "Be mindful of caffeine and alcohol",
		description:
			"Both have mild diuretic effects at high doses. Moderate coffee intake is fine, but don't rely on it for hydration.",
	},
	{
		icon: ClipboardCheck,
		title: "Track your intake",
		description:
			"Awareness alone improves hydration habits. Use a simple tally, an app, or marks on your bottle.",
	},
	{
		icon: Thermometer,
		title: "Hydrate more in heat and humidity",
		description:
			"Sweat losses can double in hot climates. Increase your intake and sip frequently when temperatures rise.",
	},
];

export function HydrationTips() {
	return (
		<section
			className="island-shell rise-in rounded-lg p-6"
			aria-labelledby="hydration-tips-heading"
		>
			<h2
				id="hydration-tips-heading"
				className="mb-2 text-xl font-bold leading-[1.2] text-[var(--color-text)]"
			>
				Hydration Tips
			</h2>
			<p className="mb-6 text-sm text-[var(--color-text-muted)]">
				Evidence-based habits to help you stay well hydrated throughout the day.
			</p>

			<div className="grid gap-4 md:grid-cols-2">
				{tips.map((tip) => (
					<TipCard key={tip.title} tip={tip} />
				))}
			</div>
		</section>
	);
}

function TipCard({ tip }: { tip: HydrationTip }) {
	const Icon = tip.icon;

	return (
		<article className="flex gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5">
			<div
				className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary-light)]"
				aria-hidden="true"
			>
				<Icon size={20} className="text-[var(--color-primary)]" />
			</div>
			<div className="min-w-0">
				<h3 className="text-sm font-semibold leading-snug text-[var(--color-text)]">
					{tip.title}
				</h3>
				<p className="mt-1 text-sm leading-relaxed text-[var(--color-text-muted)]">
					{tip.description}
				</p>
			</div>
		</article>
	);
}
