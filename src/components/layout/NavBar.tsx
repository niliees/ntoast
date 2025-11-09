'use client';
import { useToast } from '@/components/ToastProvider';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/theme/ThemeProvider';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const sections = [
  { id: 'varianten', label: 'Varianten' },
  { id: 'tipps', label: 'Tipps' },
  { id: 'zutaten', label: 'Zutaten' },
  { id: 'inspiration', label: 'Inspiration' },
];

export const NavBar = () => {
  const { showToast } = useToast();
  const { dark, toggle } = useTheme();
  const [active, setActive] = useState<string>('varianten');

  useEffect(() => {
    const handler = () => {
      let current = active;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          current = s.id;
          break;
        }
      }
      if (current !== active) setActive(current);
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, [active]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200/60 dark:bg-zinc-900/70 dark:border-zinc-800/60"
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between text-sm">
        <div className="flex items-center gap-8">
          <span className="text-2xl select-none">🍞</span>
          <div className="hidden md:flex gap-6 text-zinc-600 dark:text-zinc-300">
            {sections.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`relative px-1 transition-colors hover:text-black dark:hover:text-white ${active===s.id? 'text-black dark:text-white font-medium':''}`}
              >
                {s.label}
                {active===s.id && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-zinc-900 dark:bg-zinc-100" />
                )}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-zinc-200/70 dark:bg-zinc-800/70 backdrop-blur-md hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => showToast('🔖 Coming soon: Favoriten speichern', 'info')}
            className="text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors"
          >
            Favoriten
          </button>
        </div>
      </div>
    </motion.nav>
  );
};
