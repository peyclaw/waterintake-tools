import { render, screen } from "@testing-library/react";
import { HydrationTips } from "#/components/content/HydrationTips";

describe("HydrationTips", () => {
	it("renders the section heading", () => {
		render(<HydrationTips />);

		expect(
			screen.getByRole("heading", { name: "Hydration Tips", level: 2 }),
		).toBeInTheDocument();
	});

	it("renders the introductory description", () => {
		render(<HydrationTips />);

		expect(
			screen.getByText(
				"Evidence-based habits to help you stay well hydrated throughout the day.",
			),
		).toBeInTheDocument();
	});

	it("renders all 10 tip cards", () => {
		render(<HydrationTips />);

		const articles = screen.getAllByRole("article");
		expect(articles).toHaveLength(10);
	});

	it("renders each tip with a title (h3) and description", () => {
		render(<HydrationTips />);

		const expectedTitles = [
			"Start your day with water",
			"Carry a reusable bottle",
			"Set regular reminders",
			"Eat water-rich foods",
			"Monitor your urine color",
			"Drink before you feel thirsty",
			"Adjust for exercise",
			"Be mindful of caffeine and alcohol",
			"Track your intake",
			"Hydrate more in heat and humidity",
		];

		for (const title of expectedTitles) {
			expect(
				screen.getByRole("heading", { name: title, level: 3 }),
			).toBeInTheDocument();
		}
	});

	it("renders tip descriptions", () => {
		render(<HydrationTips />);

		expect(
			screen.getByText(/Drink a glass within 30 minutes of waking/),
		).toBeInTheDocument();

		expect(
			screen.getByText(/Sweat losses can double in hot climates/),
		).toBeInTheDocument();

		expect(
			screen.getByText(/Cucumbers, watermelon, oranges/),
		).toBeInTheDocument();
	});

	it("has an accessible section with aria-labelledby linking to the heading", () => {
		const { container } = render(<HydrationTips />);

		const section = container.querySelector(
			'section[aria-labelledby="hydration-tips-heading"]',
		);
		expect(section).toBeInTheDocument();

		const heading = container.querySelector("#hydration-tips-heading");
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent("Hydration Tips");
	});

	it("each tip card contains an icon wrapper with aria-hidden", () => {
		const { container } = render(<HydrationTips />);

		const iconContainers = container.querySelectorAll(
			'article > div[aria-hidden="true"]',
		);
		expect(iconContainers.length).toBe(10);
	});

	it("renders icons inside styled containers with foam background class", () => {
		const { container } = render(<HydrationTips />);

		const iconWrappers = container.querySelectorAll(
			"article .bg-\\[var\\(--color-primary-light\\)\\]",
		);
		expect(iconWrappers.length).toBe(10);
	});
});
