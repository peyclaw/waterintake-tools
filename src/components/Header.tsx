import { Link } from "@tanstack/react-router";
import { Droplets } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
	return (
		<header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-header-bg)] px-4 backdrop-blur-lg">
			<nav
				aria-label="Main navigation"
				className="page-wrap flex items-center gap-5 py-3 sm:gap-6 sm:py-4"
			>
				<Link
					to="/"
					aria-label="Water Intake Calculator — Home"
					className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-[var(--color-text)] no-underline transition-colors duration-200 hover:text-[var(--color-primary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)] sm:text-base"
				>
					<Droplets size={16} aria-hidden="true" />
					Water Intake
				</Link>

				<div className="flex items-center gap-4 text-sm font-semibold sm:gap-5">
					<Link
						to="/"
						className="nav-link"
						activeProps={{ className: "nav-link is-active" }}
					>
						Home
					</Link>
					<Link
						to="/about"
						className="nav-link"
						activeProps={{ className: "nav-link is-active" }}
					>
						About
					</Link>
				</div>

				<div className="ml-auto">
					<ThemeToggle />
				</div>
			</nav>
		</header>
	);
}
