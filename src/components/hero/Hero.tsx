'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useToast } from '@/components/ToastProvider';

export const Hero = () => {
  const { showToast } = useToast();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start','end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.85]);

  return (
    <section ref={ref} className="pt-24 pb-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center pb-12"
        >
          <motion.p className="text-sm text-blue-600 font-semibold mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>New</motion.p>
          <motion.h1 style={{ opacity, scale }} className="text-5xl md:text-7xl font-semibold text-gray-900 mb-4 tracking-tight">
            Toast Pro
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-2xl md:text-3xl text-gray-600 mb-8">
            Perfectly golden. Remarkably simple.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
            <span className="text-lg text-gray-600">From $2.49</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => showToast('🍞 Added to cart!', 'success')} className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">Buy</motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => showToast('📖 Learn more about Toast Pro', 'info')} className="px-6 py-2 text-blue-600 text-sm font-medium hover:underline">Learn more →</motion.button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7, duration: 0.8 }} className="relative w-full max-w-4xl mx-auto">
          <div className="aspect-[16/9] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-2xl">
            <motion.div animate={{ rotateY: [0, 10, 0, -10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="text-[15rem] md:text-[20rem] select-none">
              🍞
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

