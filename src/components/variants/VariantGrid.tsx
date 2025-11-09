'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useToast } from '@/components/ToastProvider';

interface Variant {
  id: string;
  name: string;
  desc: string;
  emoji: string;
  tags: string[];
  gradient: string;
}

const variants: Variant[] = [
  { id: 'butter', name: 'Butter Toast', desc: 'Geschmolzene Butter auf warmem Brot.', emoji: '🧈', tags: ['klassisch','simpel'], gradient: 'from-yellow-300/30 to-amber-200/30' },
  { id: 'jam', name: 'Marmelade Toast', desc: 'Süße Fruchtmarmelade, leicht säuerlich.', emoji: '🍓', tags: ['fruchtig'], gradient: 'from-pink-300/30 to-rose-300/30' },
  { id: 'honey', name: 'Honig Toast', desc: 'Flüssiger Blütenhonig – golden & mild.', emoji: '🍯', tags: ['süß','natürlich'], gradient: 'from-amber-300/30 to-yellow-200/30' },
  { id: 'avocado', name: 'Avocado Toast', desc: 'Cremige Avocado mit etwas Salz & Pfeffer.', emoji: '🥑', tags: ['gesund','trend'], gradient: 'from-green-300/30 to-emerald-300/30' },
  { id: 'bruschetta', name: 'Bruschetta Style', desc: 'Tomaten, Basilikum, Olivenöl – mediterran.', emoji: '🍅', tags: ['herzhaft'], gradient: 'from-red-300/30 to-orange-300/30' },
  { id: 'choco', name: 'Schoko Aufstrich', desc: 'Süß, cremig, Comfort-Food pur.', emoji: '🍫', tags: ['süß','kids'], gradient: 'from-brown-400/30 to-yellow-200/30' },
  { id: 'egg', name: 'Ei & Schnittlauch', desc: 'Rührei oder pochiert, würzig & warm.', emoji: '🥚', tags: ['protein','frühstück'], gradient: 'from-amber-200/30 to-yellow-100/30' },
  { id: 'smoke', name: 'Lachs & Dill', desc: 'Geräucherter Lachs, etwas Zitrone.', emoji: '🐟', tags: ['premium','omega3'], gradient: 'from-orange-300/30 to-teal-200/30' },
];

const tagFilters = ['alle','süß','herzhaft','gesund','klassisch','trend','premium'];

export const VariantGrid = () => {
  const { showToast } = useToast();
  const [filter, setFilter] = useState<string>('alle');

  const filtered = variants.filter(v => filter === 'alle' || v.tags.includes(filter));

  return (
    <section id="varianten" className="py-24 px-6 relative bg-gradient-to-b from-transparent to-zinc-100 dark:to-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent">Varianten</h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">Wähle deinen Style – süß, herzhaft oder kreativ.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {tagFilters.map(t => (
            <button
              key={t}
              onClick={() => { setFilter(t); showToast(`Filter: ${t}`, 'info'); }}
              className={`px-4 py-2 text-sm rounded-full border backdrop-blur-sm transition-colors ${filter===t? 'bg-zinc-900 text-white dark:bg-white dark:text-black':'bg-zinc-200/40 dark:bg-zinc-800/40 text-zinc-700 dark:text-zinc-300 border-zinc-300/40 dark:border-zinc-700/40 hover:bg-zinc-300/50 dark:hover:bg-zinc-700/50'}`}
            >{t}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -6 }}
              className="relative group rounded-3xl overflow-hidden p-[1px] bg-gradient-to-br from-zinc-300/40 to-zinc-100/10 dark:from-zinc-700/40 dark:to-zinc-800/10"
            >
              <div className="rounded-3xl h-full w-full p-6 flex flex-col backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/40 dark:border-zinc-700/40">
                <motion.div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br ${v.gradient}`}
                />
                <div className="relative">
                  <div className="text-5xl mb-4 select-none">{v.emoji}</div>
                  <h3 className="font-semibold text-lg mb-2 text-zinc-900 dark:text-zinc-100">{v.name}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">{v.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {v.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 text-xs rounded-full bg-zinc-900/5 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 border border-zinc-300/30 dark:border-zinc-600/30">{tag}</span>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => showToast(`${v.name} ausgewählt`, 'success')}
                    className="mt-auto px-4 py-2 text-sm font-medium rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black shadow-sm hover:shadow-md transition-shadow"
                  >Details</motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
