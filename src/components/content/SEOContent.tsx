import { BookOpen } from "lucide-react";

export function SEOContent() {
	return (
		<section
			className="island-shell rise-in rounded-lg p-6 md:p-10"
			aria-labelledby="seo-content-heading"
		>
			<div className="mb-8 flex items-center gap-3">
				<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary-light)]">
					<BookOpen
						size={20}
						aria-hidden="true"
						className="text-[var(--color-primary)]"
					/>
				</div>
				<h2
					id="seo-content-heading"
					className="text-xl font-bold leading-[1.2] text-[var(--color-text)]"
				>
					The Complete Guide to Daily Water Intake
				</h2>
			</div>

			<div className="prose-section space-y-8 text-base leading-7 text-[var(--color-text-muted)]">
				{/* Introduction */}
				<p>
					Water is the single most important nutrient your body needs every
					day. It powers everything from your brain and muscles to your
					kidneys and skin. Yet most people have no idea how much they
					actually need. Generic advice like "drink eight glasses a day" has
					persisted for decades despite having no solid scientific backing.
					The truth is that your ideal water intake depends on your body
					weight, how active you are, the climate you live in, and several
					other personal factors. This guide breaks down the science of
					hydration so you can understand exactly why our calculator works
					the way it does and how to use its results in your daily life.
				</p>

				{/* Section 1: Why Hydration Matters */}
				<div>
					<h3 className="mb-4 text-xl font-semibold text-[var(--color-text)]">
						Why Hydration Matters
					</h3>
					<p className="mb-4">
						Your body is roughly 60% water by weight. Every cell, tissue,
						and organ depends on adequate fluid to function properly. Water
						carries nutrients to cells, cushions joints, regulates body
						temperature through sweating, and helps your kidneys flush out
						waste products. When you do not drink enough, these processes
						slow down, and the effects can be surprisingly wide-ranging.
					</p>
					<p className="mb-4">
						Chronic mild dehydration, the kind most people experience
						without realizing it, has been linked to persistent fatigue,
						recurring headaches, difficulty concentrating, and reduced
						cognitive performance. A study by Armstrong and Johnson
						published in the journal <em>Nutrients</em> in 2018 found that
						a habitual daily water intake below 1.8 liters triggers a
						measurable neuroendocrine stress response, elevating cortisol
						levels and impairing mood. In other words, being even slightly
						under-hydrated on a regular basis puts your body into a low-grade
						state of physiological stress.
					</p>
					<p>
						Adequate hydration also supports healthy digestion, helps
						maintain blood pressure, and plays a role in keeping your skin
						elastic and resilient. For people trying to manage their weight,
						drinking water before meals has been shown to reduce calorie
						intake by promoting a feeling of fullness. Staying well hydrated
						is one of the simplest and most impactful things you can do for
						your overall health.
					</p>
				</div>

				{/* Section 2: How Much Water Do You Really Need? */}
				<div>
					<h3 className="mb-4 text-xl font-semibold text-[var(--color-text)]">
						How Much Water Do You Really Need?
					</h3>
					<p className="mb-4">
						The idea that everyone should drink eight glasses of water a day
						is one of the most persistent health myths in modern culture.
						Despite its widespread repetition, there is no peer-reviewed
						study that established this as a universal requirement. The
						origin of the "8 x 8" rule appears to trace back to a 1945
						recommendation from the U.S. National Research Council, which
						stated that adults need approximately 2.5 liters of water per
						day. However, the very next sentence, often overlooked, noted
						that "most of this quantity is contained in prepared foods." The
						recommendation was about total water from all sources, not just
						beverages.
					</p>
					<p className="mb-4">
						Modern scientific guidelines paint a more nuanced picture. The
						U.S. Institute of Medicine (IOM) published comprehensive
						Dietary Reference Intakes for water in 2005, setting Adequate
						Intake levels at 3.7 liters per day for adult men and 2.7 liters
						per day for adult women. These figures include water from food,
						which accounts for about 20% of the total. The European Food
						Safety Authority (EFSA) released similar guidelines in 2010,
						recommending slightly lower amounts: 2.5 liters per day for men
						and 2.0 liters per day for women from all sources.
					</p>
					<p className="mb-4">
						In clinical practice, healthcare professionals commonly use a
						weight-based formula: 30 to 35 milliliters of water per kilogram
						of body weight per day. This approach is more individualized
						than a flat recommendation because it scales naturally with body
						size. A person weighing 55 kilograms has very different fluid
						needs than someone weighing 100 kilograms, and a one-size-fits-all
						number cannot account for that difference.
					</p>
					<p>
						Our calculator uses 33 mL/kg as the baseline, which sits in the
						middle of the 30-35 mL/kg clinical range. This starting point
						is then adjusted for your activity level, climate, and any
						special conditions, resulting in a recommendation that is far
						more accurate than a generic daily number. By personalizing the
						calculation to your body, we bridge the gap between broad
						population-level guidelines and your individual needs.
					</p>
				</div>

				{/* Section 3: Exercise and Hydration */}
				<div>
					<h3 className="mb-4 text-xl font-semibold text-[var(--color-text)]">
						Exercise and Hydration
					</h3>
					<p className="mb-4">
						Physical activity dramatically increases your body's water
						requirements. When you exercise, you lose fluid primarily
						through sweat and increased respiration. Depending on the
						intensity and duration of your workout, as well as the
						environmental conditions, sweat losses can range from 0.5 liters
						per hour during light activity to more than 2.5 liters per hour
						during intense exercise in the heat. Failing to replace these
						losses impairs performance, reduces endurance, and increases the
						risk of heat-related illness.
					</p>
					<p className="mb-4">
						The American College of Sports Medicine (ACSM) provides
						detailed guidelines for exercise hydration. Before exercise, the
						recommendation is to drink 5 to 7 milliliters per kilogram of
						body weight at least four hours before your session. For a 70 kg
						person, that works out to roughly 350 to 490 milliliters, or about
						one and a half to two glasses of water. This pre-hydration window
						gives your body enough time to absorb the fluid and produce urine,
						allowing you to start your workout in a well-hydrated state.
					</p>
					<p className="mb-4">
						During exercise, the ACSM suggests drinking 150 to 350
						milliliters every 15 to 20 minutes, depending on your sweat rate
						and the conditions. Sipping smaller amounts regularly is more
						effective than drinking large volumes infrequently, as it
						promotes steady absorption and reduces the risk of stomach
						discomfort. After exercise, the guideline is to replace 150% of
						the fluid lost during the session. This surplus accounts for
						ongoing urine production and ensures complete rehydration.
					</p>
					<p className="mb-4">
						A practical way to gauge your sweat loss is to weigh yourself
						before and after exercise. Each kilogram of weight lost
						corresponds to approximately one liter of fluid. So if you weigh
						0.8 kg less after a run, you should aim to drink about 1.2 liters
						over the following two to four hours.
					</p>
					<p>
						For sessions lasting longer than 60 minutes, electrolyte
						replacement becomes important. Sweat contains sodium, potassium,
						and other minerals in addition to water. Replacing only water
						without electrolytes during prolonged exercise can dilute blood
						sodium levels and, in extreme cases, contribute to hyponatremia.
						Sports drinks, electrolyte tablets, or simply adding a pinch of
						salt to your water can help maintain the mineral balance your
						body needs during extended physical activity.
					</p>
				</div>

				{/* Section 4: Hydration During Pregnancy and Lactation */}
				<div>
					<h3 className="mb-4 text-xl font-semibold text-[var(--color-text)]">
						Hydration During Pregnancy and Lactation
					</h3>
					<p className="mb-4">
						Pregnancy places significant additional demands on your body's
						fluid balance. Blood volume increases by approximately 50%
						during pregnancy to support the growing fetus, the placenta, and
						the amniotic fluid. This expansion requires a corresponding
						increase in water intake. The Institute of Medicine recommends
						that pregnant women consume approximately 3.0 liters of total
						water per day, an increase of about 300 milliliters over the
						non-pregnant baseline for women.
					</p>
					<p className="mb-4">
						Morning sickness, which affects the majority of pregnant women
						during the first trimester, can complicate hydration
						significantly. Nausea and vomiting lead to direct fluid loss,
						and the aversion to eating and drinking that often accompanies
						morning sickness can make it harder to replace those losses.
						Small, frequent sips of water throughout the day, sometimes
						enhanced with a squeeze of lemon or a small amount of ginger,
						are generally better tolerated than large volumes consumed at once.
					</p>
					<p>
						During lactation, fluid needs increase even further. Breast
						milk is approximately 87% water, and producing an adequate
						supply requires substantial additional fluid intake. The IOM
						recommends approximately 3.8 liters of total water per day for
						lactating women, roughly 700 milliliters more than the
						non-pregnant recommendation. Many lactation specialists suggest
						drinking a glass of water each time you nurse or pump, which
						provides a practical way to spread the additional intake
						throughout the day. As always, individual needs vary, and
						consulting with your healthcare provider is advisable for
						guidance specific to your situation.
					</p>
				</div>

				{/* Section 5: Climate and Altitude Effects */}
				<div>
					<h3 className="mb-4 text-xl font-semibold text-[var(--color-text)]">
						Climate and Altitude Effects
					</h3>
					<p className="mb-4">
						Environmental conditions have a major impact on how much water
						your body needs. In hot and humid climates, sweat losses can
						easily double compared to temperate conditions, even during
						sedentary activities. Your body relies on evaporative cooling
						through sweat to regulate its core temperature, and when the
						surrounding air is hot or saturated with moisture, this process
						becomes less efficient, causing you to sweat more to achieve
						the same cooling effect. Our calculator accounts for this with
						climate multipliers: 1.15x for hot conditions and 1.30x for hot
						and humid environments.
					</p>
					<p className="mb-4">
						Cold environments present a different but equally significant
						challenge. In cold, dry air, respiratory water loss increases
						because your body must humidify the air you breathe. At the same
						time, the cold suppresses thirst perception, making it easy to
						become dehydrated without feeling thirsty. Winter dehydration is
						common and often overlooked, particularly among people who
						exercise outdoors in cold weather.
					</p>
					<p>
						High altitude, generally above 2,500 meters (about 8,200 feet),
						compounds these effects. The lower atmospheric pressure and drier
						air at altitude increase both respiratory and urinary water loss.
						Studies show that fluid requirements can increase by one to one
						and a half liters per day at high elevations. A study by Seal
						and colleagues published in the <em>European Journal of
						Nutrition</em> in 2023 confirmed that following the National
						Academy of Medicine (NAM) guidelines for fluid intake helps
						maintain optimal urine osmolality even at altitude, supporting
						the use of evidence-based hydration targets regardless of
						elevation.
					</p>
				</div>

				{/* Section 6: Common Hydration Myths Debunked */}
				<div>
					<h3 className="mb-4 text-xl font-semibold text-[var(--color-text)]">
						Common Hydration Myths Debunked
					</h3>

					<h3 className="mb-2 mt-4 text-base font-semibold text-[var(--color-text)]">
						"Coffee dehydrates you"
					</h3>
					<p className="mb-4">
						This is one of the most widespread hydration myths, and modern
						research has largely debunked it. A well-designed 2014 study by
						Killer and colleagues, published in <em>PLoS ONE</em>, compared
						the hydration effects of moderate coffee consumption (four cups
						per day) against equal volumes of water in regular caffeine
						drinkers. The researchers found no significant difference in
						hydration markers between the two groups. While very high doses
						of caffeine can have a mild diuretic effect, moderate daily
						coffee intake contributes to your fluid needs much like water does.
					</p>

					<h3 className="mb-2 mt-4 text-base font-semibold text-[var(--color-text)]">
						"Clear urine means you are well hydrated"
					</h3>
					<p className="mb-4">
						Many people aim for completely clear urine as a sign of good
						hydration, but this is actually a sign that you may be drinking
						more than you need. The optimal urine color is a pale straw
						shade, indicating that your kidneys are filtering waste
						efficiently without being overloaded with excess water.
						Consistently clear urine can indicate overhydration, which, while
						not typically dangerous in moderate amounts, offers no additional
						health benefit and may flush out electrolytes unnecessarily.
					</p>

					<h3 className="mb-2 mt-4 text-base font-semibold text-[var(--color-text)]">
						"You need 8 glasses of water a day"
					</h3>
					<p className="mb-4">
						As discussed earlier, this guideline has no peer-reviewed
						scientific basis. It appears to stem from a misreading of the
						1945 National Research Council recommendation that included
						water obtained from food. Your actual needs depend on your
						weight, activity, climate, and other individual factors.
						Following a personalized recommendation, like the one our
						calculator provides, is a far more reliable approach than
						counting glasses.
					</p>

					<h3 className="mb-2 mt-4 text-base font-semibold text-[var(--color-text)]">
						"Thirst means you are already dehydrated"
					</h3>
					<p>
						While this claim has some basis for certain populations, such as
						older adults whose thirst perception declines with age, it is
						misleading as a general rule. For most healthy adults, thirst is
						a reliable and well-calibrated signal that it is time to drink.
						Your body triggers the thirst response when blood osmolality
						rises by just 1 to 2 percent, well before clinically significant
						dehydration occurs. Rather than ignoring thirst, the practical
						takeaway is to honor it promptly and not delay drinking once the
						signal arises.
					</p>
				</div>

				{/* Section 7: Risks of Overhydration */}
				<div>
					<h3 className="mb-4 text-xl font-semibold text-[var(--color-text)]">
						Risks of Overhydration
					</h3>
					<p className="mb-4">
						While under-hydration gets most of the attention, drinking too
						much water can also be dangerous. The most serious risk is
						hyponatremia, a condition in which blood sodium levels fall to
						dangerously low concentrations. Sodium is essential for nerve
						and muscle function, and when it becomes too diluted, symptoms
						can range from nausea, headache, and confusion to seizures and,
						in severe cases, coma or death.
					</p>
					<p className="mb-4">
						Hyponatremia is most commonly observed in endurance athletes,
						particularly marathon runners and ultramarathon participants who
						consume large volumes of plain water over several hours without
						replacing lost electrolytes. However, it can also occur in
						non-athletic settings when people follow extreme water-drinking
						challenges or believe that more water is always better.
					</p>
					<p>
						The key warning signs of overhydration include persistent
						headache, nausea or vomiting after drinking water, swelling in
						the hands or feet, and confusion or disorientation. If you
						experience these symptoms after consuming large amounts of water,
						stop drinking and seek medical attention promptly. Our calculator
						is designed to recommend an appropriate daily target that
						supports hydration without pushing you toward excess. Following
						the recommended amount, spreading your intake throughout the day,
						and listening to your body's signals will keep you safely and
						effectively hydrated.
					</p>
				</div>

				{/* Conclusion */}
				<div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
					<h3 className="mb-3 text-base font-semibold text-[var(--color-text)]">
						Putting It All Together
					</h3>
					<p>
						Hydration is not a one-size-fits-all equation. Your ideal daily
						water intake depends on your body weight, physical activity,
						environment, and life circumstances like pregnancy or lactation.
						The scientific evidence consistently supports a weight-based
						approach adjusted for individual factors, which is exactly what
						our calculator provides. Use your personalized result as a daily
						target, pay attention to your urine color as a hydration check,
						and adjust your intake on days when you exercise heavily or spend
						time in extreme temperatures. Staying properly hydrated is one
						of the simplest steps you can take toward better health,
						sharper focus, and sustained energy throughout the day.
					</p>
				</div>

				{/* References */}
				<div>
					<h3 className="mb-3 text-sm font-semibold text-[var(--color-text)]">
						References
					</h3>
					<ul className="list-disc space-y-1 pl-5 text-sm leading-5 text-[var(--color-text-muted)]">
						<li>
							Armstrong, L.E. & Johnson, E.C. (2018). Water intake, water
							balance, and the elusive daily water requirement.{" "}
							<em>Nutrients</em>, 10(12), 1928.
						</li>
						<li>
							Institute of Medicine (2005). Dietary Reference Intakes for
							Water, Potassium, Sodium, Chloride, and Sulfate. National
							Academies Press.
						</li>
						<li>
							EFSA Panel on Dietetic Products, Nutrition and Allergies
							(2010). Scientific Opinion on Dietary Reference Values for
							Water. <em>EFSA Journal</em>, 8(3), 1459.
						</li>
						<li>
							American College of Sports Medicine (2007). Exercise and
							Fluid Replacement Position Stand. <em>Medicine & Science in
							Sports & Exercise</em>, 39(2), 377-390.
						</li>
						<li>
							Killer, S.C., Blannin, A.K., & Jeukendrup, A.E. (2014). No
							evidence of dehydration with moderate daily coffee intake.{" "}
							<em>PLoS ONE</em>, 9(1), e84154.
						</li>
						<li>
							Seal, A.D. et al. (2023). Total water intake guidelines are
							sufficient for optimal hydration in United States adults.{" "}
							<em>European Journal of Nutrition</em>, 62, 2161-2170.
						</li>
					</ul>
				</div>
			</div>
		</section>
	);
}
