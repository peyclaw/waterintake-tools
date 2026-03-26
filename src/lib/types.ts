export type ActivityLevel =
	| "sedentary"
	| "light"
	| "moderate"
	| "very-active"
	| "extreme";

export type Climate = "temperate" | "hot" | "hot-humid";

export type Sex = "male" | "female";

export type WeightUnit = "kg" | "lbs";

export type ResultUnit = "mL" | "oz" | "L";

export type SpecialConditions = {
	pregnancy?: boolean;
	lactation?: boolean;
};

export type CalculatorInputs = {
	weight: number;
	unit: WeightUnit;
	sex: Sex;
	activityLevel: ActivityLevel;
	climate: Climate;
	specialConditions?: SpecialConditions;
	exerciseMinutes?: number;
};

export type CalculatorResult = {
	totalIntakeMl: number;
	beverageIntakeMl: number;
	glasses: number;
	ouncesEquivalent: number;
};

export type ComparisonResult = {
	percentage: number;
	direction: "more" | "less";
};

export type ScheduleBlock = {
	time: string;
	amountMl: number;
};

export type BottleRefillResult = {
	refills: number;
	remainder: number;
};

export type BottleSize = 250 | 500 | 750 | 1000;
