import { useEffect, useRef, useState } from "react";
import { calculateComparison } from "#/lib/calculator";

interface ComparisonAnchorProps {
	totalMl: number;
}

function useAnimatedNumber(target: number, duration = 600): number {
	const [current, setCurrent] = useState(0);
	const rafRef = useRef<number | null>(null);
	const startRef = useRef<number | null>(null);
	const fromRef = useRef(0);

	useEffect(() => {
		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (prefersReducedMotion) {
			setCurrent(target);
			return;
		}

		fromRef.current = current;
		startRef.current = null;

		const animate = (timestamp: number) => {
			if (startRef.current === null) {
				startRef.current = timestamp;
			}

			const elapsed = timestamp - startRef.current;
			const progress = Math.min(elapsed / duration, 1);
			// Ease-out cubic
			const eased = 1 - (1 - progress) ** 3;
			const value = Math.round(
				fromRef.current + (target - fromRef.current) * eased,
			);

			setCurrent(value);

			if (progress < 1) {
				rafRef.current = requestAnimationFrame(animate);
			}
		};

		rafRef.current = requestAnimationFrame(animate);

		return () => {
			if (rafRef.current !== null) {
				cancelAnimationFrame(rafRef.current);
			}
		};
		// Only re-trigger on target change, not on current
		// biome-ignore lint/correctness/useExhaustiveDependencies: animation should only restart when target changes
	}, [target, duration]);

	return current;
}

export function ComparisonAnchor({ totalMl }: ComparisonAnchorProps) {
	const comparison = calculateComparison(totalMl);
	const animatedPercentage = useAnimatedNumber(comparison.percentage);

	if (comparison.percentage === 0) {
		return (
			<p
				className="text-center text-sm font-medium text-[var(--color-text-muted)]"
				aria-label="Your intake matches the average person"
			>
				That's about the same as the average person
			</p>
		);
	}

	const isMore = comparison.direction === "more";

	return (
		<p
			className="text-center text-sm font-medium text-[var(--color-text-muted)]"
			aria-label={`That's ${comparison.percentage} percent ${comparison.direction} than the average person`}
		>
			That's{" "}
			<span
				className={
					isMore
						? "font-bold text-[var(--color-success)]"
						: "font-bold text-[var(--color-warning)]"
				}
			>
				{animatedPercentage}%{" "}
				{isMore ? "more" : "less"}
			</span>{" "}
			than the average person
		</p>
	);
}
