import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useMemo, useState } from "react";
import WeightInput from "#/components/calculator/WeightInput";
import { GlassVisualization } from "#/components/result/GlassVisualization";
import { ResultDisplay } from "#/components/result/ResultDisplay";
import { calculate } from "#/lib/calculator";
import type {
	ActivityLevel,
	Climate,
	ResultUnit,
	Sex,
	WeightUnit,
} from "#/lib/types";

// ---------------------------------------------------------------------------
// Mini integration wrapper that mirrors the page state logic without the
// TanStack Router context that CalculatorPage requires.
// ---------------------------------------------------------------------------
function CalculatorIntegration() {
	const [weight, setWeight] = useState(70);
	const [unit, setUnit] = useState<WeightUnit>("kg");
	const [sex] = useState<Sex>("male");
	const [activityLevel] = useState<ActivityLevel>("moderate");
	const [climate] = useState<Climate>("temperate");
	const [resultUnit, setResultUnit] = useState<ResultUnit>("mL");

	const result = useMemo(
		() => calculate({ weight, unit, sex, activityLevel, climate }),
		[weight, unit, sex, activityLevel, climate],
	);

	function handleWeightChange(newWeight: number, newUnit: WeightUnit) {
		setWeight(newWeight);
		setUnit(newUnit);
	}

	return (
		<>
			<WeightInput value={weight} unit={unit} onChange={handleWeightChange} />
			<ResultDisplay
				result={result}
				resultUnit={resultUnit}
				onResultUnitChange={setResultUnit}
			/>
			<GlassVisualization glasses={result.glasses} />
		</>
	);
}

// ---------------------------------------------------------------------------
// Integration tests
// ---------------------------------------------------------------------------

describe("Calculator integration", () => {
	it("renders with smart defaults (70 kg, moderate, temperate) and shows a non-zero result", () => {
		render(<CalculatorIntegration />);

		// The weight input should show 70
		const weightInput = screen.getByLabelText("Weight");
		expect(weightInput).toHaveValue("70");

		// The beverage result should be non-zero and visible
		const resultValue = screen.getByText("2310");
		expect(resultValue).toBeInTheDocument();

		// mL should appear (in the result label and in the unit toggle)
		expect(screen.getAllByText("mL").length).toBeGreaterThanOrEqual(1);
	});

	it("result number matches the expected calculation (70 kg, moderate, temperate => 2310 mL beverage)", () => {
		// Verify the pure calculation first
		const result = calculate({
			weight: 70,
			unit: "kg",
			sex: "male",
			activityLevel: "moderate",
			climate: "temperate",
		});

		// 70 * 33 = 2310 (base)
		// 2310 * 1.25 = 2887.5 (moderate activity)
		// 2887.5 * 1.0 = 2887.5 (temperate climate)
		// round(2887.5) = 2888 (totalIntakeMl)
		// round(2888 * 0.8) = 2310 (beverageIntakeMl)
		expect(result.totalIntakeMl).toBe(2888);
		expect(result.beverageIntakeMl).toBe(2310);

		// Now verify the UI renders that exact value
		render(<CalculatorIntegration />);
		expect(screen.getByText("2310")).toBeInTheDocument();
		expect(
			screen.getByText("Total water need: 2888 mL (including water from food)"),
		).toBeInTheDocument();
	});

	it("changing weight input updates the displayed result", async () => {
		const user = userEvent.setup();
		render(<CalculatorIntegration />);

		const weightInput = screen.getByLabelText("Weight");

		// Clear the input and type a new weight of 80 kg
		await user.clear(weightInput);
		await user.type(weightInput, "80");

		// 80 * 33 = 2640 -> * 1.25 = 3300 -> round = 3300 total
		// 3300 * 0.8 = 2640 beverage
		expect(screen.getByText("2640")).toBeInTheDocument();
		expect(
			screen.getByText("Total water need: 3300 mL (including water from food)"),
		).toBeInTheDocument();
	});

	it("displays the glasses count", () => {
		render(<CalculatorIntegration />);

		// For 2310 mL beverage: round((2310 / 250) * 10) / 10 = 9.2 glasses
		expect(screen.getByText("~9.2 glasses per day")).toBeInTheDocument();

		// The glass visualization should also be present
		expect(
			screen.getByLabelText("Visual representation of 9.2 glasses of water"),
		).toBeInTheDocument();
	});
});
