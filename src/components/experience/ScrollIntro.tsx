'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import toastImage from '@/components/toast.png';



export const ScrollIntro = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start','end end'] });

  const rotateY = useTransform(scrollYProgress, [0, 0.5], [0, 180]);
  const translateZ = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0, -120, -400, -550, -650]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [1, 0.95, 0.8, 0.7, 0.65]);
  const toastOpacity = useTransform(scrollYProgress, [0.35, 0.5, 0.62], [1, 0.55, 0.18]);

  // Widened intervals: longer visible, larger gaps
  const firstOpacity = useTransform(scrollYProgress, [0.38, 0.42, 0.50, 0.54], [0, 1, 1, 0]);
  const secondOpacity = useTransform(scrollYProgress, [0.60, 0.64, 0.72, 0.76], [0, 1, 1, 0]);
  const thirdOpacity = useTransform(scrollYProgress, [0.80, 0.84, 0.92, 0.96], [0, 1, 1, 0]);

  const firstY = useTransform(scrollYProgress, [0.38, 0.42, 0.50, 0.54], [80, 0, -10, -30]);
  const secondY = useTransform(scrollYProgress, [0.60, 0.64, 0.72, 0.76], [80, 0, -10, -30]);
  const thirdY = useTransform(scrollYProgress, [0.80, 0.84, 0.92, 0.96], [80, 0, -10, -30]);

  return (
    <div ref={ref} className="relative h-[650vh] w-full">
      {/* Sticky Bühne */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Perspektive für 3D Drehung */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '1600px' }}>
          <motion.div
            style={{ rotateY, scale, opacity: toastOpacity, transformStyle: 'preserve-3d', translateZ }}
            className="select-none"
          >
            {/* Prefer placing toast.png into /public/assets/toast.png for optimal static serving */}
            <div className="relative" style={{ width: '32vw', height: '32vw' }}>
              <Image
                src={toastImage}
                alt="Toast"
                fill
                className="object-cover rounded-3xl"
              />
              <noscript>🍞</noscript>
            </div>
          </motion.div>
        </div>

        {/* Texte mittig, erscheinen / verschwinden */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div style={{ opacity: firstOpacity, y: firstY }} className="absolute text-center">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">eine delikatesse</h2>
          </motion.div>
          <motion.div style={{ opacity: secondOpacity, y: secondY }} className="absolute text-center">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white">ob mit Marmelade, Schoko oder doch Salami</h2>
          </motion.div>
          <motion.div style={{ opacity: thirdOpacity, y: thirdY }} className="absolute text-center">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">Toast geht immer.</h2>
          </motion.div>
        </div>

        {/* Dezenter dunkler Verlauf Hintergrund */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-zinc-900 to-black" />
      </div>
    </div>
  );
};
