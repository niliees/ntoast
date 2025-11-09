'use client';
import { motion } from 'framer-motion';

const rows = [
	{ label: 'Kalorien', value: '75–120 kcal', note: 'pro Scheibe, je nach Brotsorte' },
	{ label: 'Kohlenhydrate', value: '12–20 g', note: 'Vollkorn langsamer verstoffwechselt' },
	{ label: 'Protein', value: '2–5 g', note: 'Mehr mit Ei/Skyr/Quark' },
	{ label: 'Fett', value: '0.5–3 g', note: 'steigt mit Butter/Öl deutlich' },
];

export const Nutrition = () => (
	<section id="inspiration" className="py-24 px-6">
		<div className="max-w-4xl mx-auto">
			<div className="text-center mb-10">
				<h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
					Nährwerte (Faustwerte)
				</h2>
				<p className="mt-4 text-zinc-600 dark:text-zinc-400">
					Variiert nach Brot, Scheibendicke & Toppings.
				</p>
			</div>
			<div className="rounded-3xl overflow-hidden backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/40 dark:border-zinc-700/40 shadow-xl">
				{rows.map((r, i) => (
					<motion.div
						key={r.label}
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: i * 0.05 }}
						className={`flex items-center justify-between gap-4 px-6 py-4 ${
							i !== rows.length - 1
								? 'border-b border-zinc-200/40 dark:border-zinc-700/40'
								: ''
						}`}
					>
						<div>
							<p className="font-medium">{r.label}</p>
							<p className="text-sm text-zinc-600 dark:text-zinc-400">
								{r.note}
							</p>
						</div>
						<div className="text-right font-semibold">{r.value}</div>
					</motion.div>
				))}
			</div>
		</div>
	</section>
);
