import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Quote, Shield, ExternalLink, Activity, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Testimonial } from '../types';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const list: Testimonial[] = [
    {
      id: 'guy',
      quote: "Working with Boulevard felt less like building with a third-party developer and more like collaborating with an internal, highly-aligned creative partner. Every visual cue, every word—just hit exactly right.",
      author: 'Guy Hawkins',
      role: 'Head of Product',
      company: 'Webflow',
      rate: '+80%',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
    },
    {
      id: 'sarah',
      quote: "The interface fluidity and technical response benchmarks of Boulevard's React modules are premier. They built an exceptionally responsive audio streaming canvas directory that boosted engagement metrics tenfold.",
      author: 'Sarah Jenkins',
      role: 'VP of Interactive Design',
      company: 'Spotify',
      rate: '+94%',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120',
    },
    {
      id: 'alex',
      quote: "Our global multi-currency integration and merchant portal needed high structural discipline and visual premium. Boulevard handled both perfectly, ensuring security compliance across 14 sovereign registries.",
      author: 'Alex Rivera',
      role: 'Chief Architect',
      company: 'Coinbase',
      rate: '+45%',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    },
    {
      id: 'marcus',
      quote: "By aligning custom slack workspace templates inside our marketing flow, Boulevard shortened our feedback circles to near zero. A phenomenal execution of modular design patterns.",
      author: 'Marcus Vance',
      role: 'Head of Brand Strategy',
      company: 'Slack',
      rate: '+62%',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
    }
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % list.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + list.length) % list.length);
  };

  const handleSelectBrand = (company: string) => {
    const idx = list.findIndex(t => t.company === company);
    if (idx !== -1) {
      setCurrentIndex(idx);
    }
  };

  const activeReview = list[currentIndex];

  const partners = [
    { name: 'Coinbase', svgPaths: 'M18 12c0 3.31-2.69 6-6 6s-6-2.69-6-6 2.69-6 6-6 6 2.69 6 6z' },
    { name: 'Slack', svgPaths: 'M5 12h14M12 5v14' },
    { name: 'Spotify', svgPaths: 'M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z' },
  ];

  return (
    <section id="testimonials" className="relative bg-[#060608] text-zinc-300 py-24 px-6 md:px-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Label and Big Heading with pagination controls inside */}
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 mb-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#2E8BF7] font-bold block mb-3">(Reviews — 05)</span>
            <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-white">
              Testimonials
            </h2>
          </div>

          <div className="flex items-center space-x-3 mt-6 md:mt-0">
            <button
              onClick={handlePrev}
              className="h-12 w-12 rounded-full border border-zinc-805 hover:border-zinc-600 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900/60 transition-all cursor-pointer"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              className="h-12 w-12 rounded-full border border-zinc-805 hover:border-zinc-600 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900/60 transition-all cursor-pointer"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Dynamic Slider box matching image design */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center bg-[#0C0E14] rounded-[32px] p-8 md:p-12 border border-zinc-800 mt-12 min-h-[380px] relative overflow-hidden shadow-2xl">
          
          {/* Subtle decoration */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
            <Quote size={240} className="text-white absolute right-10 bottom-10" />
          </div>

          {/* Left Block metric (Conversion rate stats) */}
          <div className="md:col-span-4 space-y-3 border-b md:border-b-0 md:border-r border-zinc-800 pb-8 md:pb-0 md:pr-8 flex flex-col justify-center">
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase w-full">Words from the ones who know us best</span>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReview.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="space-y-1"
              >
                <div className="font-display text-6xl md:text-7xl font-black tracking-tight text-white flex items-baseline">
                  {activeReview.rate}
                </div>
                <div className="text-xs font-mono text-[#2E8BF7] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                  <Activity size={12} /> conversion metric boost
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Block Quote & Bio */}
          <div className="md:col-span-8 flex flex-col justify-between h-full space-y-8 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReview.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Large quote text */}
                <p className="font-display text-xl sm:text-2xl font-medium leading-relaxed text-zinc-300 italic">
                  "{activeReview.quote}"
                </p>

                {/* Author profile row */}
                <div className="flex items-center justify-between gap-4 pt-4 border-t border-zinc-850 flex-wrap">
                  <div className="flex items-center gap-3">
                    <img 
                      src={activeReview.avatarUrl} 
                      alt={activeReview.author}
                      className="h-11 w-11 rounded-full object-cover border border-zinc-800"
                    />
                    <div>
                      <h4 className="font-display font-bold text-sm text-zinc-205 leading-none">{activeReview.author}</h4>
                      <span className="text-xs font-mono text-zinc-400 mt-1 block">
                        {activeReview.role} of <strong className="text-zinc-300">{activeReview.company}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Brand Tag indicator pill */}
                  <div className="bg-[#2E8BF7]/10 border border-[#2E8BF7]/30 px-4 py-2 rounded-xl text-xs font-mono font-semibold text-[#2E8BF7] flex items-center gap-2">
                    <Sparkles size={12} /> {activeReview.company} Team
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Corporate bottom logo partner links strip as shown exactly in image design */}
        <div className="mt-16 pt-8 border-t border-zinc-850">
          <p className="text-xs font-mono tracking-widest text-[#2E8BF7] font-bold uppercase mb-8 text-center sm:text-left">• Working with brands that matter</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: 'coinbase', id: 'alex' },
              { name: 'slack', id: 'marcus' },
              { name: 'coinbase', id: 'alex' }, // Repeated as displayed in original image layout
              { name: 'Spotify', id: 'sarah' }
            ].map((br, idx) => {
              const isCurrent = activeReview.company.toLowerCase() === br.name.toLowerCase();
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectBrand(br.name === 'coinbase' ? 'Coinbase' : br.name === 'slack' ? 'Slack' : br.name)}
                  className={`py-6 rounded-2xl border text-center transition-all flex items-center justify-center font-display font-extrabold text-lg select-none cursor-pointer ${
                    isCurrent 
                      ? 'bg-[#2E8BF7]/20 text-[#2E8BF7] border-[#2E8BF7]/50 shadow-2xl scale-103' 
                      : 'bg-[#0C0E14] border-zinc-800 hover:border-zinc-700 text-[#2E8BF7] hover:text-white shadow-lg'
                  }`}
                >
                  {br.name === 'slack' ? (
                    <span className={`flex items-center gap-1.5 font-sans font-black tracking-tight ${isCurrent ? 'text-[#2E8BF7]' : 'text-zinc-400'}`}>
                      # slack
                    </span>
                  ) : br.name === 'Spotify' ? (
                    <span className="flex items-center gap-1.5 font-sans font-bold tracking-tight text-[#1da951]">
                      🟢 Spotify
                    </span>
                  ) : (
                    <span className={`font-sans font-semibold tracking-tight ${isCurrent ? 'text-white' : 'text-zinc-400'}`}>
                      coinbase
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
