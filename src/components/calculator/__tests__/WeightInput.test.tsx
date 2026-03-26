import { fireEvent, render, screen } from "@testing-library/react";
import WeightInput from "#/components/calculator/WeightInput";

describe("WeightInput", () => {
	it("renders with default values (input shows '70', unit shows 'kg')", () => {
		const onChange = vi.fn();
		render(<WeightInput value={70} unit="kg" onChange={onChange} />);

		const input = screen.getByLabelText("Weight");
		expect(input).toHaveValue("70");

		const kgRadio = screen.getByRole("radio", { name: "kg" });
		expect(kgRadio).toBeChecked();
	});

	it("typing a number calls onChange with the number and current unit", () => {
		const onChange = vi.fn();
		render(<WeightInput value={70} unit="kg" onChange={onChange} />);

		const input = screen.getByLabelText("Weight");
		fireEvent.change(input, { target: { value: "85" } });

		expect(onChange).toHaveBeenCalledWith(85, "kg");
	});

	it("clicking 'lbs' toggle calls onChange with converted value and new unit", () => {
		const onChange = vi.fn();
		render(<WeightInput value={70} unit="kg" onChange={onChange} />);

		const lbsRadio = screen.getByRole("radio", { name: "lbs" });
		fireEvent.click(lbsRadio);

		expect(onChange).toHaveBeenCalledWith(Math.round(70 * 2.20462), "lbs");
	});

	it("empty input calls onChange with 0", () => {
		const onChange = vi.fn();
		render(<WeightInput value={70} unit="kg" onChange={onChange} />);

		const input = screen.getByLabelText("Weight");
		fireEvent.change(input, { target: { value: "" } });

		expect(onChange).toHaveBeenCalledWith(0, "kg");
	});

	it("non-numeric input is ignored", () => {
		const onChange = vi.fn();
		render(<WeightInput value={70} unit="kg" onChange={onChange} />);

		const input = screen.getByLabelText("Weight");
		fireEvent.change(input, { target: { value: "abc" } });

		expect(onChange).not.toHaveBeenCalled();
	});
});
