'use client';
import { motion } from 'framer-motion';
import { Wheat, Star } from 'lucide-react';
import { useToast } from '@/components/ToastProvider';

const facts = [
  'Toast was enjoyed in ancient Egypt over open flames.',
  'The first electric toaster appeared in 1893 (Scotland).',
  'Millions of slices are eaten worldwide every minute.'
];

export const Facts = () => {
  const { showToast } = useToast();
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative p-12 rounded-[3rem] bg-white/60 backdrop-blur-2xl border-2 border-white/80 shadow-2xl overflow-hidden">
          <motion.div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(251,146,60,0.3) 35px, rgba(251,146,60,0.3) 70px)' }} animate={{ backgroundPosition: ['0px 0px','100px 100px'] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} />
          <div className="relative">
            <div className="text-center mb-8">
              <Wheat className="w-16 h-16 mx-auto mb-4 text-amber-600" />
              <h2 className="text-4xl font-black mb-4 text-amber-900">Did You Know?</h2>
            </div>
            <div className="space-y-6 text-lg text-amber-800">
              {facts.map((f, i) => (
                <motion.p key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-3">
                  <Star className="w-6 h-6 flex-shrink-0 text-orange-500 mt-1" />
                  <span>{f}</span>
                </motion.p>
              ))}
            </div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => showToast('🌾 More toast facts coming soon!', 'success')} className="mt-8 w-full py-4 px-8 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all">Learn More Facts</motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

