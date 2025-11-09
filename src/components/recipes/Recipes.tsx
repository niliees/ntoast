'use client';
import { motion } from 'framer-motion';
import { ArrowRight, ThermometerSun, Timer, Wheat, Star, Coffee, Heart } from 'lucide-react';
import { useToast } from '@/components/ToastProvider';

export type Recipe = { title: string; time: string; difficulty: string; emoji: string };

export const Recipes = ({ items }: { items: Recipe[] }) => {
  const { showToast } = useToast();
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <motion.div initial={{ rotate: -180, scale: 0 }} whileInView={{ rotate: 0, scale: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 200 }} className="text-6xl mb-4">👨‍🍳</motion.div>
          <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Popular Recipes</h2>
          <p className="text-xl text-amber-800">Master these classic toast creations</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((recipe, index) => (
            <motion.div key={recipe.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -10, scale: 1.02 }}
              className="relative p-8 rounded-3xl bg-white/70 backdrop-blur-xl border-2 border-white/80 shadow-2xl hover:shadow-3xl transition-all group cursor-pointer overflow-hidden"
              onClick={() => showToast(`${recipe.emoji} ${recipe.title} recipe opened!`, 'info')}>
              <motion.div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-amber-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="text-6xl mb-4 group-hover:scale-125 transition-transform">{recipe.emoji}</div>
                <h3 className="text-2xl font-bold mb-3 text-amber-900">{recipe.title}</h3>
                <div className="flex items-center gap-4 text-sm text-amber-700">
                  <div className="flex items-center gap-1"><Timer className="w-4 h-4" /><span>{recipe.time}</span></div>
                  <div className="flex items-center gap-1"><ThermometerSun className="w-4 h-4" /><span>{recipe.difficulty}</span></div>
                </div>
                <motion.div className="mt-4 flex items-center gap-2 text-orange-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity" whileHover={{ x: 5 }}>
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

