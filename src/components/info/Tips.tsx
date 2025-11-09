'use client';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ToastProvider';
import { Flame, Timer, Sparkles, SquareGanttChart, ThermometerSun, Droplets } from 'lucide-react';

const tips = [
	{
		icon: Flame,
		title: 'Vorheizen lohnt sich',
		desc: 'Ein kurzer Leer-Gang bringt die Heizspiralen auf Temperatur und sorgt für gleichmäßigere Bräunung.',
	},
	{
		icon: Timer,
		title: 'Timing statt Stufe',
		desc: 'Jeder Toaster ist anders – arbeite mit Stoppuhr, nicht nur mit der Skala.',
	},
	{
		icon: Sparkles,
		title: 'Friertes Brot? Kein Problem',
		desc: 'Einmal länger toasten oder zweimal kurz – so bleibt die Mitte saftig.',
	},
	{
		icon: SquareGanttChart,
		title: 'Gleichmäßige Platzierung',
		desc: 'Brot mittig einsetzen; bei dünnen Scheiben zwei gleichzeitig toasten.',
	},
	{
		icon: ThermometerSun,
		title: 'Nachwärme nutzen',
		desc: 'Bei empfindlichen Toppings (z. B. Butter) die Resthitze nutzen statt nachzuheizen.',
	},
	{
		icon: Droplets,
		title: 'Crunch bewahren',
		desc: 'Toast erst kurz ausdampfen lassen, dann belegen – so bleibt er knusprig.',
	},
];

export const Tips = () => {
	const { showToast } = useToast();
	return (
		<section id="tipps" className="py-24 px-6">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-12">
					<h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
						Tipps & Tricks
					</h2>
					<p className="mt-4 text-zinc-600 dark:text-zinc-400">
						Kleinigkeiten, die den Unterschied machen.
					</p>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{tips.map((t, i) => {
						const Icon = t.icon;
						return (
							<motion.div
								key={t.title}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.06 }}
								whileHover={{ y: -4 }}
								className="rounded-3xl p-6 backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/40 dark:border-zinc-700/40 shadow-xl"
							>
								<div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-black flex items-center justify-center mb-4">
									<Icon className="w-6 h-6" />
								</div>
								<h3 className="font-semibold text-lg mb-2">{t.title}</h3>
								<p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
									{t.desc}
								</p>
								<motion.button
									whileHover={{ scale: 1.03 }}
									whileTap={{ scale: 0.96 }}
									onClick={() =>
										showToast(`Hinweis gespeichert: ${t.title}`, 'success')
									}
									className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline"
								>
									Merken
								</motion.button>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
};
