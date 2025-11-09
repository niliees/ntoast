'use client';

import { ScrollIntro } from '@/components/experience/ScrollIntro';
import { FlavorStrip } from '@/components/sections/FlavorStrip';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <ScrollIntro />
      <FlavorStrip />
    </div>
  );
}
