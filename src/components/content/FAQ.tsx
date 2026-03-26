import { HelpCircle } from "lucide-react";

interface FAQItem {
	question: string;
	answer: string;
}

const faqItems: FAQItem[] = [
	{
		question: "How much water should I drink based on my weight?",
		answer:
			"A widely used clinical guideline recommends 30-35 mL of water per kilogram of body weight per day. For example, a 70 kg (154 lb) person would need roughly 2.3-2.5 L daily. This baseline is then adjusted for activity level, climate, and individual health factors. Our calculator uses 33 mL/kg as the starting point, which falls in the middle of this evidence-based range.",
	},
	{
		question: "Does coffee count as water intake?",
		answer:
			"Yes, moderate coffee consumption contributes to your daily fluid intake. A 2014 study by Killer et al. published in PLoS ONE found that moderate caffeine intake (up to about 4 cups per day) has no meaningful dehydrating effect and contributes to hydration similarly to water. However, very high caffeine doses may have a mild diuretic effect, so it is best to count coffee as part of your intake without relying on it as your sole fluid source.",
	},
	{
		question: 'Is 8 glasses a day enough?',
		answer:
			'The popular "8 glasses a day" rule — sometimes stated as "drink half your body weight in ounces" — has no peer-reviewed scientific derivation. It likely originated from a 1945 U.S. Food and Nutrition Board recommendation that was taken out of context, as the original statement included water from food. Actual needs vary significantly based on body weight, activity, and climate, which is why a personalized calculation is more accurate than a one-size-fits-all number.',
	},
	{
		question: "Can you drink too much water?",
		answer:
			"Yes, drinking excessive amounts of water in a short period can lead to hyponatremia, a potentially dangerous condition where blood sodium levels drop too low. This is most common during endurance exercise when large volumes are consumed without adequate electrolyte replacement. For most healthy adults following thirst cues and the guidelines from this calculator, overhydration is unlikely, but rapid intake of several liters within an hour should be avoided.",
	},
	{
		question: "How do I know if I'm dehydrated?",
		answer:
			"Common signs of mild dehydration include dark yellow urine, dry mouth, fatigue, headache, and reduced concentration. A simple self-check is the urine color test: pale straw-colored urine generally indicates adequate hydration, while dark amber suggests you need more fluids. By the time you feel thirsty, you may already be mildly dehydrated, so proactive intake throughout the day is recommended.",
	},
	{
		question: "Does sparkling water count toward daily intake?",
		answer:
			"Yes, sparkling water (carbonated water) hydrates just as effectively as still water and counts fully toward your daily intake. Research shows no significant difference in hydration status between still and carbonated water consumption. The carbonation does not impair absorption or increase fluid loss. Flavored sparkling waters are also fine, though you should watch for added sugars or artificial sweeteners in some brands.",
	},
	{
		question: "Should I drink more water when exercising?",
		answer:
			"Yes, exercise increases fluid needs substantially. The American College of Sports Medicine (ACSM) recommends drinking 5-7 mL per kg of body weight at least 4 hours before exercise, sipping fluid during activity, and replacing 150% of sweat losses afterward. For moderate 30-60 minute workouts, an extra 400-800 mL is typical. Our calculator accounts for this through the activity level multiplier, which increases your baseline by up to 60% for extreme activity levels.",
	},
	{
		question: "Do fruits and vegetables count toward water intake?",
		answer:
			"Absolutely. About 20% of daily water intake comes from food, according to the Institute of Medicine (IOM). Water-rich foods like watermelon (92% water), cucumbers (95%), oranges (87%), and strawberries (91%) contribute meaningfully to hydration. Our calculator accounts for this by recommending a beverage intake that is 80% of total water needs, with the remaining 20% expected to come from food sources.",
	},
	{
		question: "Is cold or warm water better for hydration?",
		answer:
			"Both cold and warm water hydrate equally well. Water temperature does not meaningfully affect absorption or hydration status. Some research suggests cold water may be consumed in greater volumes during exercise because it feels more refreshing, while warm water may aid digestion for some individuals. The best temperature is whichever one encourages you to drink enough throughout the day.",
	},
	{
		question: "How much water should I drink during pregnancy?",
		answer:
			"Pregnant women need approximately 300 mL (about 10 oz) more water per day than their non-pregnant baseline, according to IOM guidelines, bringing the general recommendation to about 3.0 L of total water daily. During lactation, fluid needs increase further by approximately 700 mL per day. These additional requirements support increased blood volume, amniotic fluid, and milk production. Always consult your healthcare provider for guidance specific to your pregnancy.",
	},
	{
		question: "Does alcohol dehydrate you?",
		answer:
			"Alcohol is a diuretic, meaning it increases urine production and can lead to net fluid loss. Studies show that beverages with more than 4% alcohol content tend to have a dehydrating effect, with stronger drinks causing greater fluid loss. For every alcoholic drink, it is advisable to have an extra glass of water. Alcohol should not be counted toward your daily water intake goal.",
	},
	{
		question: "How does climate affect water needs?",
		answer:
			"Hot and humid environments significantly increase fluid losses through sweat, raising your daily water needs by 15-30%. In hot climates, your body can lose 1-2 liters of sweat per hour during activity. High altitude (above 2,500 m) also increases water loss through faster respiration and increased urine output. Our calculator adjusts for climate with multipliers of 1.15x for hot conditions and 1.30x for hot and humid environments.",
	},
];

export function FAQ() {
	return (
		<section
			className="island-shell rise-in rounded-lg p-6"
		>
			<div className="mb-6 flex items-center gap-3">
				<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary-light)]">
					<HelpCircle
						size={20}
						aria-hidden="true"
						className="text-[var(--color-primary)]"
					/>
				</div>
				<h2 className="text-xl font-bold leading-[1.2] text-[var(--color-text)]">
					Frequently Asked Questions
				</h2>
			</div>

			<div className="space-y-3">
				{faqItems.map((item) => (
					<details
						key={item.question}
						className="group rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] transition-colors"
					>
						<summary className="flex min-h-12 cursor-pointer select-none items-center gap-3 px-5 py-4 text-base font-semibold leading-snug text-[var(--color-text)] marker:[font-size:0] [&::-webkit-details-marker]:hidden">
							<span
								aria-hidden="true"
								className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-[var(--color-primary-light)] text-xs text-[var(--color-primary)] transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-open:rotate-90"
							>
								&#9654;
							</span>
							<span>{item.question}</span>
						</summary>
						<div
							className="px-5 pb-5 pt-0 text-base leading-7 text-[var(--color-text-muted)]"
						>
							<p>{item.answer}</p>
						</div>
					</details>
				))}
			</div>
		</section>
	);
}
