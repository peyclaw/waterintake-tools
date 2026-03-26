import { createFileRoute, Link } from "@tanstack/react-router";
import {
	Activity,
	BookOpen,
	Calculator,
	Droplets,
	ShieldAlert,
	Thermometer,
} from "lucide-react";
import { seo, seoLinks } from "#/lib/seo/seo";

export const Route = createFileRoute("/about")({
	head: () => ({
		meta: [
			...seo({
				title:
					"About — How the Water Intake Calculator Works | Science-Backed",
				description:
					"Learn how our water intake calculator works. Based on IOM, EFSA, and ACSM research using a 33 mL/kg weight-based formula with activity and climate adjustments.",
				keywords:
					"water intake calculator methodology, hydration science, water intake formula, IOM water guidelines, EFSA water recommendations",
				canonicalPath: "/about",
			}),
		],
		links: [...seoLinks("/about")],
		scripts: [
			{
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "BreadcrumbList",
					itemListElement: [
						{
							"@type": "ListItem",
							position: 1,
							name: "Home",
							item: "https://waterintake.com/",
						},
						{
							"@type": "ListItem",
							position: 2,
							name: "About",
							item: "https://waterintake.com/about",
						},
					],
				}),
			},
		],
	}),
	component: About,
});

function About() {
	return (
		<main id="main-content" className="page-wrap px-4 pb-8 pt-14">
			<section className="mb-10 text-center">
				<p className="island-kicker mb-2">About</p>
				<h1 className="mb-3 text-4xl font-bold tracking-tight text-[var(--color-text)] sm:text-5xl">
					Science-backed hydration guidance
				</h1>
				<p className="mx-auto max-w-xl text-base text-[var(--color-text-muted)] sm:text-lg">
					A free, open tool that calculates your personalized daily water intake
					based on peer-reviewed research.
				</p>
			</section>

			<div className="grid gap-8 md:grid-cols-2">
				<section className="island-shell rise-in rounded-lg p-6">
					<div className="mb-4 flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary-light)]">
							<Calculator
								size={20}
								aria-hidden="true"
								className="text-[var(--color-primary)]"
							/>
						</div>
						<h2 className="text-xl font-bold leading-[1.2] text-[var(--color-text)]">
							What it does
						</h2>
					</div>
					<p className="leading-7 text-[var(--color-text-muted)]">
						The Water Intake Calculator estimates how much water you should
						drink each day. Enter your weight, biological sex, activity level,
						and climate to receive a personalized recommendation split into
						total water intake and the portion you should aim to get from
						beverages (about 80% of total intake, per IOM guidelines).
					</p>
				</section>

				<section className="island-shell rise-in rounded-lg p-6 [animation-delay:80ms]">
					<div className="mb-4 flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary-light)]">
							<Droplets
								size={20}
								aria-hidden="true"
								className="text-[var(--color-primary)]"
							/>
						</div>
						<h2 className="text-xl font-bold leading-[1.2] text-[var(--color-text)]">
							How it works
						</h2>
					</div>
					<p className="leading-7 text-[var(--color-text-muted)]">
						We start with a baseline of roughly 33 mL per kg of body weight,
						then apply multipliers for physical activity (sedentary through
						extreme) and climate (temperate, hot, or hot-humid). Additional
						adjustments account for pregnancy and lactation. The final number is
						rounded and converted to glasses (250 mL each) for easy tracking.
					</p>
				</section>

				<section className="island-shell rise-in rounded-lg p-6 [animation-delay:160ms]">
					<div className="mb-4 flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary-light)]">
							<Activity
								size={20}
								aria-hidden="true"
								className="text-[var(--color-primary)]"
							/>
						</div>
						<h2 className="text-xl font-bold leading-[1.2] text-[var(--color-text)]">
							Adjustment factors
						</h2>
					</div>
					<ul className="space-y-2 text-[var(--color-text-muted)]">
						<li className="flex items-start gap-2">
							<Thermometer
								size={16}
								aria-hidden="true"
								className="mt-1 flex-shrink-0 text-[var(--color-cta)]"
							/>
							<span>
								<strong className="text-[var(--color-text)]">Climate</strong> --
								hot and humid environments increase fluid losses through sweat,
								raising your need by up to 30%.
							</span>
						</li>
						<li className="flex items-start gap-2">
							<Activity
								size={16}
								aria-hidden="true"
								className="mt-1 flex-shrink-0 text-[var(--color-cta)]"
							/>
							<span>
								<strong className="text-[var(--color-text)]">Activity</strong> --
								exercise increases metabolic water demand; the ACSM recommends
								additional fluid before, during, and after physical activity.
							</span>
						</li>
					</ul>
				</section>

				<section className="island-shell rise-in rounded-lg p-6 [animation-delay:240ms]">
					<div className="mb-4 flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary-light)]">
							<BookOpen
								size={20}
								aria-hidden="true"
								className="text-[var(--color-primary)]"
							/>
						</div>
						<h2 className="text-xl font-bold leading-[1.2] text-[var(--color-text)]">
							Scientific references
						</h2>
					</div>
					<ul className="space-y-2 text-sm leading-6 text-[var(--color-text-muted)]">
						<li>
							<strong className="text-[var(--color-text)]">IOM (2005)</strong> --
							Dietary Reference Intakes for Water, Potassium, Sodium, Chloride,
							and Sulfate. National Academies Press.
						</li>
						<li>
							<strong className="text-[var(--color-text)]">EFSA (2010)</strong> --
							Scientific Opinion on Dietary Reference Values for Water. EFSA
							Journal, 8(3), 1459.
						</li>
						<li>
							<strong className="text-[var(--color-text)]">ACSM (2007)</strong> --
							Exercise and Fluid Replacement Position Stand. Medicine & Science
							in Sports & Exercise, 39(2), 377-390.
						</li>
					</ul>
				</section>
			</div>

			<section className="island-shell mt-8 rounded-lg p-6">
				<div className="mb-3 flex items-center gap-3">
					<ShieldAlert
						size={20}
						aria-hidden="true"
						className="flex-shrink-0 text-[var(--color-cta)]"
					/>
					<h2 className="text-xl font-bold leading-[1.2] text-[var(--color-text)]">
						Disclaimer
					</h2>
				</div>
				<p className="max-w-3xl text-sm leading-6 text-[var(--color-text-muted)]">
					This calculator provides general hydration estimates for healthy
					adults. It is not a substitute for professional medical advice,
					diagnosis, or treatment. Individual needs vary based on health
					conditions, medications, and other factors. Always consult a
					healthcare professional for guidance specific to your situation.
				</p>
			</section>

			<div className="mt-10 text-center">
				<Link
					to="/"
					className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-2.5 text-sm font-semibold text-[var(--color-text)] no-underline shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-transform duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:scale-[1.02]"
				>
					<Droplets size={16} aria-hidden="true" />
					Try the calculator
				</Link>
			</div>
		</main>
	);
}
