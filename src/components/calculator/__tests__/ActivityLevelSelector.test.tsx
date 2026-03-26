import { fireEvent, render, screen } from "@testing-library/react";
import { ActivityLevelSelector } from "#/components/calculator/ActivityLevelSelector";

describe("ActivityLevelSelector", () => {
	it("renders all 5 activity level options", () => {
		const onChange = vi.fn();
		render(<ActivityLevelSelector value="sedentary" onChange={onChange} />);

		const radios = screen.getAllByRole("radio");
		expect(radios).toHaveLength(5);

		expect(screen.getByText("Sedentary")).toBeInTheDocument();
		expect(screen.getByText("Light")).toBeInTheDocument();
		expect(screen.getByText("Active")).toBeInTheDocument();
		expect(screen.getByText("Very Active")).toBeInTheDocument();
		expect(screen.getByText("Extreme")).toBeInTheDocument();
	});

	it('selected option has aria-checked="true"', () => {
		const onChange = vi.fn();
		render(<ActivityLevelSelector value="moderate" onChange={onChange} />);

		const radios = screen.getAllByRole("radio");
		const moderateRadio = radios.find((r) => r.dataset.level === "moderate");

		expect(moderateRadio).toHaveAttribute("aria-checked", "true");

		const nonSelected = radios.filter((r) => r.dataset.level !== "moderate");
		for (const radio of nonSelected) {
			expect(radio).toHaveAttribute("aria-checked", "false");
		}
	});

	it("clicking an option calls onChange with that level", () => {
		const onChange = vi.fn();
		render(<ActivityLevelSelector value="sedentary" onChange={onChange} />);

		const radios = screen.getAllByRole("radio");
		const veryActiveRadio = radios.find(
			(r) => r.dataset.level === "very-active",
		);

		if (veryActiveRadio) {
			fireEvent.click(veryActiveRadio);
		}

		expect(onChange).toHaveBeenCalledWith("very-active");
	});

	it('has role="radiogroup"', () => {
		const onChange = vi.fn();
		render(<ActivityLevelSelector value="sedentary" onChange={onChange} />);

		expect(screen.getByRole("radiogroup")).toBeInTheDocument();
	});
});
