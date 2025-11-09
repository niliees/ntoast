'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import toastImage from '@/components/toast.png';

const flavors = [
  'marmelade', 'schoko', 'honig', 'avocado', 'käse', 'salami', 'erdnussbutter', 'lachs', 'ei', 'tomate'
];

export const FlavorStrip = () => (
  <section className="relative py-14 bg-black overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-black pointer-events-none" />
    {/* blurred watermark toast in background */}
    <div className="absolute -top-24 -right-24 w-[50vw] h-[50vw] opacity-[0.07] blur-3xl rotate-12 pointer-events-none">
      <Image src={toastImage} alt="" fill className="object-cover" />
    </div>
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-center mb-8 relative"
    >
      <h3 className="text-zinc-400 text-sm uppercase tracking-widest">vielfalt</h3>
    </motion.div>
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: ['0%', '-50%'] }}
      transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      className="flex gap-10 whitespace-nowrap will-change-transform"
    >
      {[...flavors, ...flavors].map((f, i) => (
        <span key={i} className="text-4xl md:text-5xl font-semibold bg-gradient-to-br from-zinc-200 to-zinc-400 bg-clip-text text-transparent select-none">
          {f}
        </span>
      ))}
    </motion.div>
  </section>
);
