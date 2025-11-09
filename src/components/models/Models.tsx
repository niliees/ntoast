'use client';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ToastProvider';

type Model = { id: string; name: string; tagline: string; description: string; price: string; emoji: string };

export const Models = ({ models, selected, onSelect }: { models: Model[]; selected: string; onSelect: (id: string) => void; }) => {
  const { showToast } = useToast();
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">Choose your Toast.</h2>
          <p className="text-xl text-gray-600">Three perfect options. One perfect moment.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {models.map((model, index) => (
            <motion.div key={model.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -8 }}
              onClick={() => { onSelect(model.id); showToast(`${model.emoji} ${model.name} selected!`, 'success'); }}
              className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all ${selected === model.id ? 'ring-2 ring-blue-600 ring-offset-4' : ''}`}>
              <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 p-8 h-full">
                <div className="text-8xl mb-6 text-center">{model.emoji}</div>
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">{model.name}</h3>
                  <p className="text-lg text-blue-600 mb-4">{model.tagline}</p>
                  <p className="text-sm text-gray-600 mb-6">{model.description}</p>
                  <p className="text-lg font-semibold text-gray-900 mb-4">{model.price}</p>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full py-3 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">Buy</motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

