export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="site-footer mt-20 px-4 pb-14 pt-10 text-[var(--color-text-muted)]">
			<div className="page-wrap flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
				<p className="m-0 text-sm">
					&copy; {year} Water Intake Calculator. All rights reserved.
				</p>
				<p className="island-kicker m-0">Science-backed hydration guidance</p>
			</div>
			<div className="page-wrap">
				<p className="m-0 mt-2 text-center text-sm sm:text-left">
					This tool provides general hydration guidance, not medical advice.
				</p>
			</div>
		</footer>
	);
}
