import { render, screen } from "@testing-library/react";
import { GlassVisualization } from "#/components/result/GlassVisualization";

describe("GlassVisualization", () => {
	it("renders the correct number of full glasses", () => {
		render(<GlassVisualization glasses={5} />);

		const glassImages = screen.getAllByRole("img", { name: "Full glass" });
		expect(glassImages).toHaveLength(5);
	});

	it("renders a partial glass for fractional values", () => {
		render(<GlassVisualization glasses={3.5} />);

		const fullGlasses = screen.getAllByRole("img", { name: "Full glass" });
		expect(fullGlasses).toHaveLength(3);

		const partialGlass = screen.getByRole("img", {
			name: "Glass 50% full",
		});
		expect(partialGlass).toBeInTheDocument();
	});

	it("renders zero glasses when glasses is 0", () => {
		render(<GlassVisualization glasses={0} />);

		const container = screen.getByRole("img", {
			name: "Visual representation of 0.0 glasses of water",
		});
		expect(container).toBeInTheDocument();

		const glassImages = screen.queryAllByRole("img", {
			name: /glass/i,
		});
		// Only the container role="img" should exist, no individual glass SVGs
		expect(glassImages).toHaveLength(1);
	});

	it("has role=\"img\" with descriptive aria-label on the container", () => {
		render(<GlassVisualization glasses={8} />);

		const container = screen.getByRole("img", {
			name: "Visual representation of 8.0 glasses of water",
		});
		expect(container).toBeInTheDocument();
	});

	it("caps display at 15 glasses and shows overflow text", () => {
		render(<GlassVisualization glasses={18} />);

		const fullGlasses = screen.getAllByRole("img", { name: "Full glass" });
		expect(fullGlasses).toHaveLength(15);

		expect(screen.getByText("+3 more")).toBeInTheDocument();
	});

	it("does not show overflow text when glasses count is 15 or fewer", () => {
		render(<GlassVisualization glasses={10} />);

		expect(screen.queryByText(/more/)).not.toBeInTheDocument();
	});

	it("renders exactly 15 glasses when glasses is 15", () => {
		render(<GlassVisualization glasses={15} />);

		const fullGlasses = screen.getAllByRole("img", { name: "Full glass" });
		expect(fullGlasses).toHaveLength(15);

		expect(screen.queryByText(/more/)).not.toBeInTheDocument();
	});

	it("handles fractional overflow correctly", () => {
		render(<GlassVisualization glasses={16.5} />);

		const fullGlasses = screen.getAllByRole("img", { name: "Full glass" });
		expect(fullGlasses).toHaveLength(15);

		expect(screen.getByText("+2 more")).toBeInTheDocument();
	});

	it("aria-label shows the correct glasses count with one decimal place", () => {
		render(<GlassVisualization glasses={7.3} />);

		const container = screen.getByRole("img", {
			name: "Visual representation of 7.3 glasses of water",
		});
		expect(container).toBeInTheDocument();
	});

	it("each individual glass SVG has appropriate aria-label", () => {
		render(<GlassVisualization glasses={2.7} />);

		const fullGlasses = screen.getAllByRole("img", { name: "Full glass" });
		expect(fullGlasses).toHaveLength(2);

		const partialGlass = screen.getByRole("img", {
			name: "Glass 70% full",
		});
		expect(partialGlass).toBeInTheDocument();
	});

	it("updates when props change", () => {
		const { rerender } = render(<GlassVisualization glasses={3} />);

		let fullGlasses = screen.getAllByRole("img", { name: "Full glass" });
		expect(fullGlasses).toHaveLength(3);

		rerender(<GlassVisualization glasses={6} />);

		fullGlasses = screen.getAllByRole("img", { name: "Full glass" });
		expect(fullGlasses).toHaveLength(6);
	});
});
