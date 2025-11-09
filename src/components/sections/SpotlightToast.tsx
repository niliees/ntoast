'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import toastImage from '@/components/toast.png';

/*
SpotlightToast: Dark glass spotlight section that showcases a real toast photo.
Place your image at: public/assets/toast-hero.jpg (recommended ~2000x1300, JPG, optimized)
You can change the path via the 'srcPath' prop if needed.
*/

export const SpotlightToast = ({ srcPath = '/assets/toast-hero.jpg' }: { srcPath?: string }) => {
  const [errored, setErrored] = useState(false);
  return (
    <section className="relative px-6 py-24 bg-gradient-to-b from-black to-zinc-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">echter toast, echte textur</h2>
          <p className="mt-3 text-zinc-400">füge dein foto ein – wir setzen es in szene</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
        >
          {/* subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

          <div className="relative aspect-[16/9]">
            <Image
              src={toastImage}
              alt="Toast Detail"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              className="object-cover"
              priority
            />
          </div>

          {/* bottom caption */}
          <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center justify-between text-zinc-200">
            <span className="text-sm uppercase tracking-wider">toast spotlight</span>
            <span className="text-sm text-zinc-400">/assets/toast-hero.jpg</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
