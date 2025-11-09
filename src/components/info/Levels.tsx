'use client';
import { motion } from 'framer-motion';

const levels = [
	{
		id: 1,
		name: 'Hell',
		desc: 'Ganz leicht erwärmt – weich & fluffig.',
		color: 'from-zinc-200 to-zinc-100',
	},
	{
		id: 2,
		name: 'Gold',
		desc: 'Klassisch – außen leicht kross, innen weich.',
		color: 'from-amber-300 to-yellow-200',
	},
	{
		id: 3,
		name: 'Kräftig',
		desc: 'Deutlich geröstet – intensiver Geschmack.',
		color: 'from-amber-500 to-orange-400',
	},
	{
		id: 4,
		name: 'Dunkel',
		desc: 'Sehr kross – rauchige Röstaromen.',
		color: 'from-zinc-700 to-zinc-500',
	},
];

export const Levels = () => (
	<section id="zutaten" className="py-24 px-6">
		<div className="max-w-5xl mx-auto">
			<div className="text-center mb-12">
				<h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
					Röstgrade
				</h2>
				<p className="mt-4 text-zinc-600 dark:text-zinc-400">
					Wie dunkel darf dein Toast sein?
				</p>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
				{levels.map((l, i) => (
					<motion.div
						key={l.id}
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: i * 0.08 }}
						className={`rounded-3xl p-6 backdrop-blur-xl bg-gradient-to-br ${l.color} text-zinc-900 dark:text-zinc-100 border border-white/40 dark:border-white/10 shadow-xl`}
					>
						<div className="text-4xl mb-2">{l.id === 4 ? '🍞' : '🥖'}</div>
						<h3 className="font-semibold mb-2">{l.name}</h3>
						<p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
							{l.desc}
						</p>
					</motion.div>
				))}
			</div>
		</div>
	</section>
);
