import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { faqItems, getFaqJsonLd } from "#/lib/seo/faq-schema";
import { getHowToJsonLd, getWebAppJsonLd } from "#/lib/seo/json-ld";
import { seo } from "#/lib/seo/seo";
import Footer from "../components/Footer";
import Header from "../components/Header";

import appCss from "../styles.css?url";

const faqJsonLd = JSON.stringify(getFaqJsonLd(faqItems));
const webAppJsonLd = JSON.stringify(getWebAppJsonLd());
const howToJsonLd = JSON.stringify(getHowToJsonLd());

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{ name: "theme-color", content: "#1976D2" },
			{ name: "color-scheme", content: "light dark" },
			{
				name: "robots",
				content:
					"index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes",
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "black-translucent",
			},
			...seo({
				title:
					"Water Intake Calculator — How Much Water Should You Drink Daily?",
				description:
					"Calculate your personalized daily water intake based on weight, activity level, and climate. Free, instant, science-backed hydration results.",
				keywords:
					"water intake calculator, daily water intake, how much water to drink, hydration calculator, water consumption",
				canonicalPath: "/",
			}),
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
			{ rel: "icon", href: "/favicon.ico", sizes: "48x48" },
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/apple-touch-icon.png",
			},
			{ rel: "manifest", href: "/site.webmanifest" },
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: theme must init before paint */}
				<script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
					dangerouslySetInnerHTML={{ __html: webAppJsonLd }}
				/>
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: FAQ JSON-LD structured data
					dangerouslySetInnerHTML={{ __html: faqJsonLd }}
				/>
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: HowTo JSON-LD structured data
					dangerouslySetInnerHTML={{ __html: howToJsonLd }}
				/>
				<HeadContent />
			</head>
			<body className="font-sans antialiased [overflow-wrap:anywhere] selection:bg-[rgba(25,118,210,0.24)]">
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[var(--color-primary)] focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-[var(--color-on-primary)] focus:shadow-lg"
				>
					Skip to main content
				</a>
				<Header />
				{children}
				<Footer />
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
