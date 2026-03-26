import { render, screen } from "@testing-library/react";
import { ResultDisplay } from "#/components/result/ResultDisplay";
import type { CalculatorResult } from "#/lib/types";

const metricResult: CalculatorResult = {
	totalIntakeMl: 2500,
	beverageIntakeMl: 2000,
	glasses: 8.0,
	ouncesEquivalent: 67.6,
};

const imperialResult: CalculatorResult = {
	totalIntakeMl: 3000,
	beverageIntakeMl: 2400,
	glasses: 9.6,
	ouncesEquivalent: 81.2,
};

const noop = () => {};

describe("ResultDisplay", () => {
	it("renders the correct beverage intake number for metric (shows mL)", () => {
		render(
			<ResultDisplay
				result={metricResult}
				resultUnit="mL"
				onResultUnitChange={noop}
			/>,
		);

		expect(screen.getByText("2000")).toBeInTheDocument();
	});

	it('renders the correct value for imperial (shows fl oz when resultUnit is "oz")', () => {
		render(
			<ResultDisplay
				result={imperialResult}
				resultUnit="oz"
				onResultUnitChange={noop}
			/>,
		);

		expect(
			screen.getByText(String(Math.round(imperialResult.ouncesEquivalent))),
		).toBeInTheDocument();
	});

	it("shows glasses count", () => {
		render(
			<ResultDisplay
				result={metricResult}
				resultUnit="mL"
				onResultUnitChange={noop}
			/>,
		);

		expect(screen.getByText("~8.0 glasses per day")).toBeInTheDocument();
	});

	it("shows total intake text", () => {
		render(
			<ResultDisplay
				result={metricResult}
				resultUnit="mL"
				onResultUnitChange={noop}
			/>,
		);

		expect(
			screen.getByText("Total water need: 2500 mL (including water from food)"),
		).toBeInTheDocument();
	});

	it("updates when props change", () => {
		const { rerender } = render(
			<ResultDisplay
				result={metricResult}
				resultUnit="mL"
				onResultUnitChange={noop}
			/>,
		);

		expect(screen.getByText("2000")).toBeInTheDocument();

		rerender(
			<ResultDisplay
				result={imperialResult}
				resultUnit="oz"
				onResultUnitChange={noop}
			/>,
		);

		expect(
			screen.getByText(String(Math.round(imperialResult.ouncesEquivalent))),
		).toBeInTheDocument();
	});

	it("renders result unit toggle with mL, fl oz, and L options", () => {
		render(
			<ResultDisplay
				result={metricResult}
				resultUnit="mL"
				onResultUnitChange={noop}
			/>,
		);

		const radiogroup = screen.getByRole("radiogroup", {
			name: "Result display unit",
		});
		expect(radiogroup).toBeInTheDocument();

		const radios = screen.getAllByRole("radio");
		expect(radios).toHaveLength(3);
	});

	it("shows L result when resultUnit is L", () => {
		render(
			<ResultDisplay
				result={metricResult}
				resultUnit="L"
				onResultUnitChange={noop}
			/>,
		);

		// 2000 mL = 2.0 L
		expect(screen.getByText("2")).toBeInTheDocument();
	});
});
