'use client';
import { motion } from 'framer-motion';
import { Coffee, Heart, Star } from 'lucide-react';
import { useToast } from '@/components/ToastProvider';

export const Footer = () => {
  const { showToast } = useToast();
  return (
    <footer className="py-16 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-6xl mx-auto">
        <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-xl border-2 border-white/80 shadow-2xl dark:bg-zinc-900/60 dark:border-zinc-800/80">
          <div className="text-center">
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }} className="text-5xl mb-4 select-none">🍞</motion.div>
            <h3 className="text-3xl font-black mb-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Toast</h3>
            <p className="text-amber-800 dark:text-amber-300 mb-6">Making breakfast better, one slice at a time</p>
            <div className="flex justify-center gap-4 mb-6">
              <motion.button whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }} onClick={() => showToast('🔔 Newsletter soon!', 'info')} className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"><Coffee className="w-5 h-5" /></motion.button>
              <motion.button whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }} onClick={() => showToast('❤️ Thanks!', 'success')} className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-pink-400 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"><Heart className="w-5 h-5" /></motion.button>
              <motion.button whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }} onClick={() => showToast('⭐ Rate us!', 'success')} className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"><Star className="w-5 h-5" /></motion.button>
            </div>
            <p className="text-amber-700 dark:text-amber-300/80 text-sm mb-2">Built with 🍞 using Next.js, Framer Motion & Tailwind CSS</p>
            <p className="text-amber-600 dark:text-amber-200/70 text-xs">© 2025 Toast. All rights reserved. Made with love and butter.</p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};
