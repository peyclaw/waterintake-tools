import { fireEvent, render, screen } from "@testing-library/react";
import SexSelector from "#/components/calculator/SexSelector";

describe("SexSelector", () => {
	it("renders both Male and Female options", () => {
		const onChange = vi.fn();
		render(<SexSelector value="male" onChange={onChange} />);

		const radios = screen.getAllByRole("radio");
		expect(radios).toHaveLength(2);

		expect(screen.getByText("Male")).toBeInTheDocument();
		expect(screen.getByText("Female")).toBeInTheDocument();
	});

	it('selected option has aria-checked="true"', () => {
		const onChange = vi.fn();
		render(<SexSelector value="female" onChange={onChange} />);

		const femaleRadio = screen.getByRole("radio", { name: "Female" });
		expect(femaleRadio).toHaveAttribute("aria-checked", "true");

		const maleRadio = screen.getByRole("radio", { name: "Male" });
		expect(maleRadio).toHaveAttribute("aria-checked", "false");
	});

	it("clicking an option calls onChange with that sex value", () => {
		const onChange = vi.fn();
		render(<SexSelector value="male" onChange={onChange} />);

		const femaleRadio = screen.getByRole("radio", { name: "Female" });
		fireEvent.click(femaleRadio);

		expect(onChange).toHaveBeenCalledWith("female");
	});

	it("does not call onChange when clicking the already-selected option beyond the click itself", () => {
		const onChange = vi.fn();
		render(<SexSelector value="male" onChange={onChange} />);

		const maleRadio = screen.getByRole("radio", { name: "Male" });
		fireEvent.click(maleRadio);

		expect(onChange).toHaveBeenCalledWith("male");
	});

	it('has role="radiogroup" with aria-label', () => {
		const onChange = vi.fn();
		render(<SexSelector value="male" onChange={onChange} />);

		const radiogroup = screen.getByRole("radiogroup");
		expect(radiogroup).toBeInTheDocument();
		expect(radiogroup).toHaveAttribute("aria-label", "Biological sex");
	});

	it("selected option has tabIndex 0, unselected has tabIndex -1", () => {
		const onChange = vi.fn();
		render(<SexSelector value="male" onChange={onChange} />);

		const maleRadio = screen.getByRole("radio", { name: "Male" });
		const femaleRadio = screen.getByRole("radio", { name: "Female" });

		expect(maleRadio).toHaveAttribute("tabindex", "0");
		expect(femaleRadio).toHaveAttribute("tabindex", "-1");
	});

	it("ArrowRight key calls onChange with the next option", () => {
		const onChange = vi.fn();
		render(<SexSelector value="male" onChange={onChange} />);

		const maleRadio = screen.getByRole("radio", { name: "Male" });
		fireEvent.keyDown(maleRadio, { key: "ArrowRight" });

		expect(onChange).toHaveBeenCalledWith("female");
	});

	it("ArrowLeft key on first option wraps to last option", () => {
		const onChange = vi.fn();
		render(<SexSelector value="male" onChange={onChange} />);

		const maleRadio = screen.getByRole("radio", { name: "Male" });
		fireEvent.keyDown(maleRadio, { key: "ArrowLeft" });

		expect(onChange).toHaveBeenCalledWith("female");
	});

	it("ArrowDown key calls onChange with the next option", () => {
		const onChange = vi.fn();
		render(<SexSelector value="female" onChange={onChange} />);

		const femaleRadio = screen.getByRole("radio", { name: "Female" });
		fireEvent.keyDown(femaleRadio, { key: "ArrowDown" });

		expect(onChange).toHaveBeenCalledWith("male");
	});

	it("Enter key calls onChange with the current value", () => {
		const onChange = vi.fn();
		render(<SexSelector value="male" onChange={onChange} />);

		const maleRadio = screen.getByRole("radio", { name: "Male" });
		fireEvent.keyDown(maleRadio, { key: "Enter" });

		expect(onChange).toHaveBeenCalledWith("male");
	});

	it("Space key calls onChange with the current value", () => {
		const onChange = vi.fn();
		render(<SexSelector value="female" onChange={onChange} />);

		const femaleRadio = screen.getByRole("radio", { name: "Female" });
		fireEvent.keyDown(femaleRadio, { key: " " });

		expect(onChange).toHaveBeenCalledWith("female");
	});

	it("renders the label text 'Sex'", () => {
		const onChange = vi.fn();
		render(<SexSelector value="male" onChange={onChange} />);

		expect(screen.getByText("Sex")).toBeInTheDocument();
	});
});
