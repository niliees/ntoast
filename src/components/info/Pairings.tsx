'use client';
import { motion } from 'framer-motion';

const pairings = [
	{
		combo: 'Avocado + Chili + Limette',
		note: 'Frische Säure & leichte Schärfe balancieren die Cremigkeit.',
	},
	{
		combo: 'Honig + Walnuss + Ricotta',
		note: 'Süß, nussig, leicht – super für Brunch.',
	},
	{
		combo: 'Butter + Radieschen + Salz',
		note: 'Knackige Frische trifft Fett & Mineralität.',
	},
	{
		combo: 'Marmelade + Erdnussbutter',
		note: 'Sweet & salty Klassiker – Texturkontrast.',
	},
	{
		combo: 'Lachs + Frischkäse + Dill',
		note: 'Umami + Kräuter machen es elegant.',
	},
];

export const Pairings = () => (
	<section id="inspiration" className="py-24 px-6">
		<div className="max-w-5xl mx-auto">
			<div className="text-center mb-12">
				<h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
					Inspiration
				</h2>
				<p className="mt-4 text-zinc-600 dark:text-zinc-400">
					Ausgewogene Geschmackspaare für mehr Tiefe.
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{pairings.map((p, i) => (
					<motion.div
						key={p.combo}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: i * 0.07 }}
						className="rounded-3xl p-6 backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/40 dark:border-zinc-700/40 shadow-xl hover:shadow-2xl transition-shadow"
					>
						<h3 className="font-medium mb-2">{p.combo}</h3>
						<p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
							{p.note}
						</p>
					</motion.div>
				))}
			</div>
		</div>
	</section>
);
