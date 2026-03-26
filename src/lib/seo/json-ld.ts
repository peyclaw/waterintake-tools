export function getWebAppJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "WebApplication",
		name: "Water Intake Calculator",
		description:
			"Calculate your personalized daily water intake based on weight, activity level, and climate.",
		url: "https://waterintake.tools/",
		applicationCategory: "HealthApplication",
		operatingSystem: "Any",
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "USD",
		},
		featureList: [
			"Personalized water intake calculation based on body weight",
			"Activity level and climate adjustments",
			"Daily drinking schedule with time blocks",
			"Glass visualization and bottle refill calculator",
			"Science-backed formula with cited sources",
		],
	};
}

export function getHowToJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "HowTo",
		name: "How to Calculate Your Daily Water Intake",
		description:
			"Use our science-backed calculator to determine your personalized daily water intake.",
		step: [
			{
				"@type": "HowToStep",
				name: "Enter your weight",
				text: "Enter your body weight in kilograms or pounds.",
			},
			{
				"@type": "HowToStep",
				name: "Select your sex",
				text: "Choose your biological sex for accurate recommendations.",
			},
			{
				"@type": "HowToStep",
				name: "Choose activity level",
				text: "Select how physically active you are on a typical day.",
			},
			{
				"@type": "HowToStep",
				name: "Set your climate",
				text: "Choose the climate you live in.",
			},
			{
				"@type": "HowToStep",
				name: "View your result",
				text: "See your personalized daily water intake recommendation instantly.",
			},
		],
	};
}
