import type {
	ActivityLevel,
	BottleRefillResult,
	BottleSize,
	CalculatorInputs,
	CalculatorResult,
	Climate,
	ComparisonResult,
	ScheduleBlock,
	SpecialConditions,
} from "#/lib/types";

export const MINIMUM_FLOOR_ML = 1800;

export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
	sedentary: 1.0,
	light: 1.12,
	moderate: 1.25,
	"very-active": 1.45,
	extreme: 1.6,
};

export const CLIMATE_MULTIPLIERS: Record<Climate, number> = {
	temperate: 1.0,
	hot: 1.15,
	"hot-humid": 1.3,
};

const ZERO_RESULT: CalculatorResult = {
	totalIntakeMl: 0,
	beverageIntakeMl: 0,
	glasses: 0,
	ouncesEquivalent: 0,
};

export function calculateBaseIntake(weightKg: number): number {
	return weightKg * 33;
}

export function applyActivityMultiplier(
	base: number,
	level: ActivityLevel,
): number {
	return base * ACTIVITY_MULTIPLIERS[level];
}

export function applyClimateMultiplier(
	adjusted: number,
	climate: Climate,
): number {
	return adjusted * CLIMATE_MULTIPLIERS[climate];
}

export function applySpecialConditions(
	adjusted: number,
	conditions?: SpecialConditions,
): number {
	if (!conditions) return adjusted;
	let result = adjusted;
	if (conditions.pregnancy) result += 300;
	if (conditions.lactation) result += 700;
	return result;
}

export function calculateBeverageIntake(total: number): number {
	return total * 0.8;
}

export function lbsToKg(lbs: number): number {
	return lbs * 0.453592;
}

export function mlToOz(ml: number): number {
	return ml * 0.033814;
}

export function mlToGlasses(ml: number): number {
	return Math.round((ml / 250) * 10) / 10;
}

export function calculate(inputs: CalculatorInputs): CalculatorResult {
	if (inputs.weight <= 0) return ZERO_RESULT;

	const weightKg =
		inputs.unit === "lbs" ? lbsToKg(inputs.weight) : inputs.weight;

	const base = calculateBaseIntake(weightKg);
	const afterActivity = applyActivityMultiplier(base, inputs.activityLevel);
	const afterClimate = applyClimateMultiplier(afterActivity, inputs.climate);
	const afterConditions = applySpecialConditions(afterClimate, inputs.specialConditions);
	const afterExercise = applyExerciseDuration(afterConditions, inputs.exerciseMinutes ?? 0);
	const totalIntakeMl = Math.max(
		MINIMUM_FLOOR_ML,
		Math.round(afterExercise),
	);

	const beverageIntakeMl = Math.round(calculateBeverageIntake(totalIntakeMl));
	const glasses = mlToGlasses(beverageIntakeMl);
	const ouncesEquivalent = mlToOz(beverageIntakeMl);

	return {
		totalIntakeMl,
		beverageIntakeMl,
		glasses,
		ouncesEquivalent,
	};
}

const AVERAGE_BASELINE_ML = 2000;

export function calculateComparison(
	userTotal: number,
	averageTotal: number = AVERAGE_BASELINE_ML,
): ComparisonResult {
	if (averageTotal === 0) {
		return { percentage: 0, direction: "more" };
	}

	const diff = userTotal - averageTotal;
	const percentage = Math.round(Math.abs(diff / averageTotal) * 100);
	const direction: ComparisonResult["direction"] = diff >= 0 ? "more" : "less";

	return { percentage, direction };
}

const SCHEDULE_TIMES = [
	"7:00 AM",
	"9:00 AM",
	"11:00 AM",
	"1:00 PM",
	"3:00 PM",
	"5:00 PM",
	"7:00 PM",
	"9:00 PM",
];

const SCHEDULE_PERCENTAGES = [0.15, 0.15, 0.125, 0.125, 0.125, 0.125, 0.1, 0.1];

export function generateDrinkingSchedule(totalMl: number): ScheduleBlock[] {
	if (totalMl <= 0) return [];

	let distributed = 0;

	return SCHEDULE_TIMES.map((time, index) => {
		const isLast = index === SCHEDULE_TIMES.length - 1;
		const amountMl = isLast
			? totalMl - distributed
			: Math.round(totalMl * SCHEDULE_PERCENTAGES[index]);

		distributed += amountMl;

		return { time, amountMl };
	});
}

export function calculateBottleRefills(
	totalMl: number,
	bottleSizeMl: BottleSize,
): BottleRefillResult {
	if (totalMl <= 0 || bottleSizeMl <= 0) {
		return { refills: 0, remainder: 0 };
	}

	const refills = Math.floor(totalMl / bottleSizeMl);
	const remainder = Math.round(totalMl % bottleSizeMl);

	return { refills, remainder };
}

const ML_PER_EXERCISE_MINUTE = 12;

export function applyExerciseDuration(
	base: number,
	minutesPerDay: number,
): number {
	if (minutesPerDay <= 0) return base;
	return base + minutesPerDay * ML_PER_EXERCISE_MINUTE;
}
