import {
	applyActivityMultiplier,
	applyClimateMultiplier,
	applyExerciseDuration,
	applySpecialConditions,
	calculate,
	calculateBaseIntake,
	calculateBeverageIntake,
	calculateBottleRefills,
	calculateComparison,
	generateDrinkingSchedule,
	lbsToKg,
	mlToGlasses,
	mlToOz,
} from "#/lib/calculator";

describe("calculateBaseIntake", () => {
	it("returns 2310 mL for 70 kg", () => {
		expect(calculateBaseIntake(70)).toBe(2310);
	});

	it("returns 0 for 0 kg", () => {
		expect(calculateBaseIntake(0)).toBe(0);
	});

	it("returns 4950 mL for 150 kg", () => {
		expect(calculateBaseIntake(150)).toBe(4950);
	});
});

describe("applyActivityMultiplier", () => {
	const base = 2310;

	it("sedentary multiplier (1.0) returns 2310", () => {
		expect(applyActivityMultiplier(base, "sedentary")).toBe(2310);
	});

	it("light multiplier (1.12) returns 2587.2", () => {
		expect(applyActivityMultiplier(base, "light")).toBeCloseTo(2587.2);
	});

	it("moderate multiplier (1.25) returns 2887.5", () => {
		expect(applyActivityMultiplier(base, "moderate")).toBe(2887.5);
	});

	it("very-active multiplier (1.45) returns 3349.5", () => {
		expect(applyActivityMultiplier(base, "very-active")).toBeCloseTo(3349.5);
	});

	it("extreme multiplier (1.6) returns 3696", () => {
		expect(applyActivityMultiplier(base, "extreme")).toBeCloseTo(3696);
	});
});

describe("applyClimateMultiplier", () => {
	const adjusted = 2887.5;

	it("temperate climate (1.0) returns 2887.5", () => {
		expect(applyClimateMultiplier(adjusted, "temperate")).toBe(2887.5);
	});

	it("hot climate (1.15) returns 3320.625", () => {
		expect(applyClimateMultiplier(adjusted, "hot")).toBeCloseTo(3320.625);
	});

	it("hot-humid climate (1.3) returns 3753.75", () => {
		expect(applyClimateMultiplier(adjusted, "hot-humid")).toBeCloseTo(3753.75);
	});
});

describe("applySpecialConditions", () => {
	it("returns the same value when no conditions are provided", () => {
		expect(applySpecialConditions(2887.5, {})).toBe(2887.5);
	});

	it("adds 300 for pregnancy only", () => {
		expect(applySpecialConditions(2887.5, { pregnancy: true })).toBe(3187.5);
	});

	it("adds 700 for lactation only", () => {
		expect(applySpecialConditions(2887.5, { lactation: true })).toBe(3587.5);
	});

	it("adds 1000 for both pregnancy and lactation", () => {
		expect(
			applySpecialConditions(2887.5, { pregnancy: true, lactation: true }),
		).toBe(3887.5);
	});

	it("returns the same value when conditions is undefined", () => {
		expect(applySpecialConditions(2887.5, undefined)).toBe(2887.5);
	});
});

describe("calculateBeverageIntake", () => {
	it("returns 1848 for a total of 2310", () => {
		expect(calculateBeverageIntake(2310)).toBe(1848);
	});

	it("returns 0 for a total of 0", () => {
		expect(calculateBeverageIntake(0)).toBe(0);
	});
});

describe("lbsToKg", () => {
	it("converts 150 lbs to approximately 68.0388 kg", () => {
		expect(lbsToKg(150)).toBeCloseTo(68.0388);
	});
});

describe("mlToOz", () => {
	it("converts 1000 mL to approximately 33.814 oz", () => {
		expect(mlToOz(1000)).toBeCloseTo(33.814);
	});
});

describe("mlToGlasses", () => {
	it("converts 1000 mL to 4 glasses", () => {
		expect(mlToGlasses(1000)).toBe(4);
	});

	it("converts 1100 mL to 4.4 glasses", () => {
		expect(mlToGlasses(1100)).toBe(4.4);
	});
});

describe("calculate (end-to-end)", () => {
	it("returns correct values for default inputs", () => {
		const result = calculate({
			weight: 70,
			unit: "kg",
			sex: "male",
			activityLevel: "moderate",
			climate: "temperate",
		});

		expect(result.totalIntakeMl).toBe(2888);
		expect(result.beverageIntakeMl).toBe(2310);
		expect(result.glasses).toBe(mlToGlasses(2310));
		expect(result.ouncesEquivalent).toBeCloseTo(mlToOz(2310));
	});

	it("converts lbs to kg properly", () => {
		const result = calculate({
			weight: 154,
			unit: "lbs",
			sex: "male",
			activityLevel: "moderate",
			climate: "temperate",
		});

		const expectedWeightKg = lbsToKg(154);
		const expectedBase = calculateBaseIntake(expectedWeightKg);
		const expectedAfterActivity = applyActivityMultiplier(
			expectedBase,
			"moderate",
		);
		const expectedTotal = Math.round(
			applyClimateMultiplier(expectedAfterActivity, "temperate"),
		);
		const expectedBeverage = Math.round(calculateBeverageIntake(expectedTotal));

		expect(result.totalIntakeMl).toBe(expectedTotal);
		expect(result.beverageIntakeMl).toBe(expectedBeverage);
	});

	it("returns all zeros for negative weight", () => {
		const result = calculate({
			weight: -5,
			unit: "kg",
			sex: "male",
			activityLevel: "moderate",
			climate: "temperate",
		});

		expect(result.totalIntakeMl).toBe(0);
		expect(result.beverageIntakeMl).toBe(0);
		expect(result.glasses).toBe(0);
		expect(result.ouncesEquivalent).toBe(0);
	});

	it("includes exercise minutes in the calculation pipeline", () => {
		const result = calculate({
			weight: 70,
			unit: "kg",
			sex: "male",
			activityLevel: "moderate",
			climate: "temperate",
			exerciseMinutes: 30,
		});

		// 70 * 33 = 2310 -> * 1.25 = 2887.5 -> * 1.0 = 2887.5 -> + 0 (no conditions) -> + 360 (30*12) = 3247.5 -> round = 3248
		expect(result.totalIntakeMl).toBe(3248);
		expect(result.beverageIntakeMl).toBe(Math.round(3248 * 0.8));
	});

	it("combines exercise and special conditions correctly", () => {
		const result = calculate({
			weight: 70,
			unit: "kg",
			sex: "female",
			activityLevel: "moderate",
			climate: "temperate",
			specialConditions: { pregnancy: true },
			exerciseMinutes: 30,
		});

		// 70 * 33 = 2310 -> * 1.25 = 2887.5 -> * 1.0 = 2887.5 -> + 300 (pregnancy) = 3187.5 -> + 360 (30*12) = 3547.5 -> round = 3548
		expect(result.totalIntakeMl).toBe(3548);
		expect(result.beverageIntakeMl).toBe(Math.round(3548 * 0.8));
	});

	it("ignores exerciseMinutes of 0", () => {
		const withZero = calculate({
			weight: 70,
			unit: "kg",
			sex: "male",
			activityLevel: "moderate",
			climate: "temperate",
			exerciseMinutes: 0,
		});
		const without = calculate({
			weight: 70,
			unit: "kg",
			sex: "male",
			activityLevel: "moderate",
			climate: "temperate",
		});
		expect(withZero.totalIntakeMl).toBe(without.totalIntakeMl);
	});

	it("adds 1000 to total for pregnancy and lactation before beverage calc", () => {
		const result = calculate({
			weight: 70,
			unit: "kg",
			sex: "female",
			activityLevel: "moderate",
			climate: "temperate",
			specialConditions: { pregnancy: true, lactation: true },
		});

		// 70 * 33 = 2310 -> * 1.25 = 2887.5 -> * 1.0 = 2887.5 -> + 1000 = 3887.5 -> round = 3888
		expect(result.totalIntakeMl).toBe(3888);
		// 3888 * 0.8 = 3110.4 -> round = 3110
		expect(result.beverageIntakeMl).toBe(3110);
		expect(result.glasses).toBe(mlToGlasses(3110));
		expect(result.ouncesEquivalent).toBeCloseTo(mlToOz(3110));
	});
});

describe("calculateComparison", () => {
	it("returns 25% more when user total is 2500 vs 2000 average", () => {
		const result = calculateComparison(2500);
		expect(result.percentage).toBe(25);
		expect(result.direction).toBe("more");
	});

	it("returns 25% less when user total is 1500 vs 2000 average", () => {
		const result = calculateComparison(1500);
		expect(result.percentage).toBe(25);
		expect(result.direction).toBe("less");
	});

	it("returns 0% more when user total equals the average", () => {
		const result = calculateComparison(2000);
		expect(result.percentage).toBe(0);
		expect(result.direction).toBe("more");
	});

	it("returns 100% more when user total is double the average", () => {
		const result = calculateComparison(4000);
		expect(result.percentage).toBe(100);
		expect(result.direction).toBe("more");
	});

	it("returns 100% less when user total is 0", () => {
		const result = calculateComparison(0);
		expect(result.percentage).toBe(100);
		expect(result.direction).toBe("less");
	});

	it("accepts a custom average baseline", () => {
		const result = calculateComparison(3000, 2500);
		expect(result.percentage).toBe(20);
		expect(result.direction).toBe("more");
	});

	it("handles custom average lower than user total", () => {
		const result = calculateComparison(1000, 2500);
		expect(result.percentage).toBe(60);
		expect(result.direction).toBe("less");
	});

	it("handles zero average baseline gracefully", () => {
		const result = calculateComparison(2000, 0);
		expect(result.percentage).toBe(0);
		expect(result.direction).toBe("more");
	});

	it("rounds percentage to nearest integer", () => {
		// 2333 vs 2000 = 16.65% -> rounds to 17%
		const result = calculateComparison(2333);
		expect(result.percentage).toBe(17);
		expect(result.direction).toBe("more");
	});
});

describe("generateDrinkingSchedule", () => {
	it("returns 8 blocks for a positive total", () => {
		const schedule = generateDrinkingSchedule(2000);
		expect(schedule).toHaveLength(8);
	});

	it("returns an empty array for 0 mL", () => {
		const schedule = generateDrinkingSchedule(0);
		expect(schedule).toHaveLength(0);
	});

	it("returns an empty array for negative mL", () => {
		const schedule = generateDrinkingSchedule(-500);
		expect(schedule).toHaveLength(0);
	});

	it("sums all blocks to equal the original total", () => {
		const total = 2500;
		const schedule = generateDrinkingSchedule(total);
		const sum = schedule.reduce((acc, block) => acc + block.amountMl, 0);
		expect(sum).toBe(total);
	});

	it("front-loads morning blocks (7am and 9am get 15% each)", () => {
		const total = 2000;
		const schedule = generateDrinkingSchedule(total);
		expect(schedule[0].amountMl).toBe(300); // 15% of 2000
		expect(schedule[1].amountMl).toBe(300); // 15% of 2000
	});

	it("evening blocks get 10% each", () => {
		const total = 2000;
		const schedule = generateDrinkingSchedule(total);
		expect(schedule[6].amountMl).toBe(200); // 10% of 2000
		// Last block absorbs rounding remainder
	});

	it("uses correct time labels", () => {
		const schedule = generateDrinkingSchedule(2000);
		const times = schedule.map((b) => b.time);
		expect(times).toEqual([
			"7:00 AM",
			"9:00 AM",
			"11:00 AM",
			"1:00 PM",
			"3:00 PM",
			"5:00 PM",
			"7:00 PM",
			"9:00 PM",
		]);
	});

	it("handles rounding so total is preserved exactly", () => {
		// 2333 mL: percentages * 2333 will produce fractional amounts
		const total = 2333;
		const schedule = generateDrinkingSchedule(total);
		const sum = schedule.reduce((acc, block) => acc + block.amountMl, 0);
		expect(sum).toBe(total);
	});

	it("produces integer amounts for each block", () => {
		const schedule = generateDrinkingSchedule(2777);
		for (const block of schedule) {
			expect(Number.isInteger(block.amountMl)).toBe(true);
		}
	});

	it("distributes correctly for a small total (500 mL)", () => {
		const schedule = generateDrinkingSchedule(500);
		const sum = schedule.reduce((acc, block) => acc + block.amountMl, 0);
		expect(sum).toBe(500);
		expect(schedule).toHaveLength(8);
	});
});

describe("calculateBottleRefills", () => {
	it("returns 4 refills and 0 remainder for 2000 mL with 500 mL bottle", () => {
		const result = calculateBottleRefills(2000, 500);
		expect(result.refills).toBe(4);
		expect(result.remainder).toBe(0);
	});

	it("returns 2 refills and 200 remainder for 2200 mL with 1000 mL bottle", () => {
		const result = calculateBottleRefills(2200, 1000);
		expect(result.refills).toBe(2);
		expect(result.remainder).toBe(200);
	});

	it("returns 8 refills for 2000 mL with 250 mL bottle", () => {
		const result = calculateBottleRefills(2000, 250);
		expect(result.refills).toBe(8);
		expect(result.remainder).toBe(0);
	});

	it("handles 750 mL bottle correctly", () => {
		const result = calculateBottleRefills(2000, 750);
		expect(result.refills).toBe(2);
		expect(result.remainder).toBe(500);
	});

	it("returns 0 refills and 0 remainder for 0 mL total", () => {
		const result = calculateBottleRefills(0, 500);
		expect(result.refills).toBe(0);
		expect(result.remainder).toBe(0);
	});

	it("returns 0 refills and 0 remainder for negative total", () => {
		const result = calculateBottleRefills(-100, 500);
		expect(result.refills).toBe(0);
		expect(result.remainder).toBe(0);
	});

	it("returns 0 refills when total is less than bottle size", () => {
		const result = calculateBottleRefills(200, 500);
		expect(result.refills).toBe(0);
		expect(result.remainder).toBe(200);
	});

	it("returns integer remainder even with fractional total", () => {
		const result = calculateBottleRefills(2333, 500);
		expect(result.refills).toBe(4);
		expect(result.remainder).toBe(333);
		expect(Number.isInteger(result.remainder)).toBe(true);
	});
});

describe("applyExerciseDuration", () => {
	it("adds 12 mL per minute for 30 minutes (360 mL)", () => {
		expect(applyExerciseDuration(2000, 30)).toBe(2360);
	});

	it("adds 12 mL per minute for 60 minutes (720 mL)", () => {
		expect(applyExerciseDuration(2000, 60)).toBe(2720);
	});

	it("adds 12 mL per minute for 90 minutes (1080 mL)", () => {
		expect(applyExerciseDuration(2000, 90)).toBe(3080);
	});

	it("returns base unchanged for 0 minutes", () => {
		expect(applyExerciseDuration(2000, 0)).toBe(2000);
	});

	it("returns base unchanged for negative minutes", () => {
		expect(applyExerciseDuration(2000, -15)).toBe(2000);
	});

	it("works with a non-round base value", () => {
		expect(applyExerciseDuration(2887, 45)).toBe(2887 + 45 * 12);
	});

	it("adds 12 mL for 1 minute", () => {
		expect(applyExerciseDuration(1500, 1)).toBe(1512);
	});

	it("handles very long exercise durations (180 min = 2160 mL added)", () => {
		expect(applyExerciseDuration(2000, 180)).toBe(4160);
	});
});
