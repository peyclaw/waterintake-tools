import { fireEvent, render, screen } from "@testing-library/react";
import ClimateSelector from "#/components/calculator/ClimateSelector";

describe("ClimateSelector", () => {
	it("renders all 3 climate options", () => {
		const onChange = vi.fn();
		render(<ClimateSelector value="temperate" onChange={onChange} />);

		const radios = screen.getAllByRole("radio");
		expect(radios).toHaveLength(3);

		expect(screen.getByText("Cool/Mild")).toBeInTheDocument();
		expect(screen.getByText("Warm")).toBeInTheDocument();
		expect(screen.getByText("Hot & Humid")).toBeInTheDocument();
	});

	it('selected option has aria-checked="true"', () => {
		const onChange = vi.fn();
		render(<ClimateSelector value="hot" onChange={onChange} />);

		const radios = screen.getAllByRole("radio");
		const hotRadio = radios.find((r) => r.dataset.value === "hot");

		expect(hotRadio).toHaveAttribute("aria-checked", "true");

		const nonSelected = radios.filter((r) => r.dataset.value !== "hot");
		for (const radio of nonSelected) {
			expect(radio).toHaveAttribute("aria-checked", "false");
		}
	});

	it("clicking an option calls onChange with that climate value", () => {
		const onChange = vi.fn();
		render(<ClimateSelector value="temperate" onChange={onChange} />);

		const radios = screen.getAllByRole("radio");
		const hotHumidRadio = radios.find(
			(r) => r.dataset.value === "hot-humid",
		);

		if (hotHumidRadio) {
			fireEvent.click(hotHumidRadio);
		}

		expect(onChange).toHaveBeenCalledWith("hot-humid");
	});

	it('has role="radiogroup" with aria-labelledby referencing the visible label', () => {
		const onChange = vi.fn();
		render(<ClimateSelector value="temperate" onChange={onChange} />);

		const radiogroup = screen.getByRole("radiogroup");
		expect(radiogroup).toBeInTheDocument();
		expect(radiogroup).toHaveAttribute(
			"aria-labelledby",
			"climate-selector-label",
		);

		const label = document.getElementById("climate-selector-label");
		expect(label).toHaveTextContent("Climate");
	});

	it("selected option has tabIndex 0, unselected have tabIndex -1", () => {
		const onChange = vi.fn();
		render(<ClimateSelector value="hot" onChange={onChange} />);

		const radios = screen.getAllByRole("radio");
		for (const radio of radios) {
			if (radio.dataset.value === "hot") {
				expect(radio).toHaveAttribute("tabindex", "0");
			} else {
				expect(radio).toHaveAttribute("tabindex", "-1");
			}
		}
	});

	it("ArrowRight key calls onChange with the next option", () => {
		const onChange = vi.fn();
		render(<ClimateSelector value="temperate" onChange={onChange} />);

		const radios = screen.getAllByRole("radio");
		const temperateRadio = radios.find(
			(r) => r.dataset.value === "temperate",
		);

		if (temperateRadio) {
			fireEvent.keyDown(temperateRadio, { key: "ArrowRight" });
		}

		expect(onChange).toHaveBeenCalledWith("hot");
	});

	it("ArrowLeft key wraps from first to last option", () => {
		const onChange = vi.fn();
		render(<ClimateSelector value="temperate" onChange={onChange} />);

		const radios = screen.getAllByRole("radio");
		const temperateRadio = radios.find(
			(r) => r.dataset.value === "temperate",
		);

		if (temperateRadio) {
			fireEvent.keyDown(temperateRadio, { key: "ArrowLeft" });
		}

		expect(onChange).toHaveBeenCalledWith("hot-humid");
	});

	it("ArrowDown key calls onChange with the next option", () => {
		const onChange = vi.fn();
		render(<ClimateSelector value="hot" onChange={onChange} />);

		const radios = screen.getAllByRole("radio");
		const hotRadio = radios.find((r) => r.dataset.value === "hot");

		if (hotRadio) {
			fireEvent.keyDown(hotRadio, { key: "ArrowDown" });
		}

		expect(onChange).toHaveBeenCalledWith("hot-humid");
	});

	it("ArrowUp key calls onChange with the previous option", () => {
		const onChange = vi.fn();
		render(<ClimateSelector value="hot-humid" onChange={onChange} />);

		const radios = screen.getAllByRole("radio");
		const hotHumidRadio = radios.find(
			(r) => r.dataset.value === "hot-humid",
		);

		if (hotHumidRadio) {
			fireEvent.keyDown(hotHumidRadio, { key: "ArrowUp" });
		}

		expect(onChange).toHaveBeenCalledWith("hot");
	});

	it("Enter key calls onChange with the current option value", () => {
		const onChange = vi.fn();
		render(<ClimateSelector value="hot" onChange={onChange} />);

		const radios = screen.getAllByRole("radio");
		const hotRadio = radios.find((r) => r.dataset.value === "hot");

		if (hotRadio) {
			fireEvent.keyDown(hotRadio, { key: "Enter" });
		}

		expect(onChange).toHaveBeenCalledWith("hot");
	});

	it("Space key calls onChange with the current option value", () => {
		const onChange = vi.fn();
		render(<ClimateSelector value="temperate" onChange={onChange} />);

		const radios = screen.getAllByRole("radio");
		const temperateRadio = radios.find(
			(r) => r.dataset.value === "temperate",
		);

		if (temperateRadio) {
			fireEvent.keyDown(temperateRadio, { key: " " });
		}

		expect(onChange).toHaveBeenCalledWith("temperate");
	});

	it("renders the label text 'Climate'", () => {
		const onChange = vi.fn();
		render(<ClimateSelector value="temperate" onChange={onChange} />);

		expect(screen.getByText("Climate")).toBeInTheDocument();
	});
});
