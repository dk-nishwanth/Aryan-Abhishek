import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Cpu, Code, Heart, Check, Flame, Trophy, KeyRound } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AboutGrid() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Skills & Tools list with loading-page theme matching colors
  const designSkills = [
    { name: 'Branding', bg: 'bg-[#ECFEFF]', text: 'text-[#0891b2]', border: 'border-[#ECFEFF]/50' },
    { name: 'Motion Design', bg: 'bg-[#E1EEFA]', text: 'text-[#2E8BF7]', border: 'border-[#E1EEFA]/50' },
    { name: 'Layouts & Grids', bg: 'bg-[#F0FDF4]', text: 'text-[#0FA958]', border: 'border-[#F0FDF4]/50' },
    { name: 'UI/UX', bg: 'bg-[#FFFBEB]', text: 'text-[#FFA82E]', border: 'border-[#FFFBEB]/50' },
    { name: 'Social Media', bg: 'bg-[#E0F2FE]', text: 'text-[#0369a1]', border: 'border-[#E0F2FE]/50' },
    { name: 'Infographics', bg: 'bg-[#EBF7FC]', text: 'text-[#12B4D1]', border: 'border-[#EBF7FC]/50' }
  ];

  const designTools = [
    { name: 'Figma', color: 'bg-[#ECFEFF] text-[#0891b2] border-[#0891b2]/20' },
    { name: 'Photoshop', color: 'bg-[#E1EEFA] text-[#2E8BF7] border-[#2E8BF7]/20' },
    { name: 'Illustrator', color: 'bg-[#FFFBEB] text-[#FFA82E] border-[#FFA82E]/20' },
    { name: 'After Effects', color: 'bg-[#F0FDF4] text-[#0FA958] border-[#0FA958]/20' },
    { name: 'Premiere Pro', color: 'bg-[#E6FFFA] text-[#12B4D1] border-[#12B4D1]/20' },
    { name: 'InDesign', color: 'bg-[#FFF5F5] text-[#E12D39] border-[#E12D39]/20' }
  ];

  return (
    <section id="about" className="relative bg-[#FAF8F2] text-zinc-800 py-24 px-6 md:px-12 overflow-hidden border-t border-zinc-200">
      {/* Visual background lights using loading page colors */}
      <div className="absolute right-0 top-1/4 w-[350px] h-[350px] rounded-full bg-[#2E8BF7]/5 blur-[80px]" />
      <div className="absolute left-0 bottom-1/4 w-[250px] h-[250px] rounded-full bg-[#12B4D1]/5 blur-[60px]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto"
      >
        {/* Intro Tagline & Asterisk Orb */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-zinc-900 max-w-4xl leading-[1.15]">
            Bringing structural discipline, kinetic storytelling, and{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#205C9E] via-[#2E8BF7] to-[#12B4D1] font-semibold">raw visual power</span> to every brand graphic and digital product.
          </h2>

          <div className="flex items-center gap-4">
            {/* Small cobalt blue capsule with signature mark */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2E8BF7] border border-white/10 text-white font-mono text-sm font-bold shadow-md">
              AA
            </div>

            {/* Rotating asterisk badge in high-contrast blue */}
            <div className="relative flex-shrink-0 w-16 h-16 rounded-full bg-[#12B4D1] border border-black/15 flex items-center justify-center text-white group hover:scale-110 transition-all duration-300 shadow-lg">
              <svg 
                className="w-8 h-8 animate-[spin_10s_linear_infinite] group-hover:animate-[spin_4s_linear_infinite]" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5"
              >
                <line x1="12" y1="2" x2="12" y2="22" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" />
              </svg>
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white"></span>
              </span>
            </div>
          </div>
        </div>

        {/* Triple Card Grid */}
        <div className="grid grid-cols-3 gap-3 md:gap-6 mb-16">
          {/* Card A: Personal Statement in Blue Glow screen gradient */}
          <div 
            className="group relative rounded-2xl sm:rounded-[28px] overflow-hidden bg-gradient-to-tr from-[#205C9E] via-[#2E8BF7] to-[#4BA4FF] p-3 sm:p-8 min-h-[180px] sm:min-h-[320px] flex flex-col justify-between border-2 border-[#2E8BF7]/40 shadow-xl transform transition-all duration-300 hover:translate-y-[-4px]"
            onMouseEnter={() => setHoveredCard(0)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Grain filter */}
            <div className="absolute inset-0 bg-cover mix-blend-overlay opacity-15" style={{ backgroundImage: `url('data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E')` }}></div>

            <div className="flex items-center justify-between relative z-10 gap-1 pb-1">
              <div className="relative h-6 w-6 sm:h-10 sm:w-10 flex items-center justify-center bg-black/20 backdrop-blur-md rounded-lg sm:rounded-xl border border-white/10 shrink-0">
                <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </div>
              <span className="text-[6px] sm:text-[9px] font-mono tracking-wider sm:tracking-widest text-zinc-100 bg-black/20 backdrop-blur-md px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full uppercase font-bold text-center truncate">PRINCIPLE</span>
            </div>

            <div className="space-y-1 sm:space-y-3 relative z-10 mt-3 sm:mt-12 text-zinc-100">
              <span className="text-zinc-200 font-mono text-[6px] sm:text-[9px] tracking-widest uppercase font-bold block">Approach</span>
              <p className="font-display text-[9px] sm:text-xl md:text-2xl font-bold text-white leading-normal sm:leading-snug">
                Design experiences that command focus and tell deep structural stories.
              </p>
            </div>
          </div>

          {/* Card B: Retro styled Cream keycap */}
          <div 
            className="group relative rounded-2xl sm:rounded-[28px] overflow-hidden bg-white p-3 sm:p-8 min-h-[180px] sm:min-h-[320px] flex flex-col justify-between border-2 border-zinc-200 shadow-md transition-all duration-500 hover:border-[#12B4D1] transform hover:translate-y-[-4px]"
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="relative z-10 flex justify-between items-center text-[6px] sm:text-xs text-zinc-650 font-mono gap-1">
              <span className="truncate">(Tactile)</span>
              <span className="hidden sm:inline">EST. 2020</span>
            </div>

            {/* Stylized keycap block - using vintage monitor bone colors */}
            <div className="relative z-10 my-auto flex items-center justify-center py-2 sm:py-6">
              <div className="relative h-14 w-16 sm:h-28 sm:w-30 bg-[#E3DAC9] rounded-lg sm:rounded-[20px] shadow-[0_5px_10px_rgba(0,0,0,0.1),_inset_0_1px_2px_rgba(255,255,255,0.7),_inset_0_-2px_4px_rgba(0,0,0,0.2)] border border-[#C9C2B2] flex flex-col items-center justify-center p-1 sm:p-3 transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer group">
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-lg sm:rounded-t-[18px]"></div>
                
                <div className="w-full h-full border border-zinc-350 rounded-md sm:rounded-[14px] bg-[#FAF8F2] flex flex-col items-center justify-center p-1 sm:p-2">
                  <span className="text-[5px] sm:text-[9px] font-mono tracking-wider sm:tracking-widest text-[#2E8BF7] font-bold">KEY_SYS</span>
                  <span className="text-zinc-950 font-display text-[8px] sm:text-lg tracking-tight mt-0.5 sm:mt-1 font-bold">motion</span>
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#2E8BF7] mt-0.5 sm:mt-1 animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[6px] sm:text-xs font-mono text-zinc-550 gap-1">
              <span className="text-[#12B4D1] font-semibold truncate">CYBER LAB</span>
              <span className="text-zinc-600 group-hover:text-zinc-950 transition-colors hidden sm:flex items-center gap-1 cursor-pointer">
                Hover Keycap <ArrowRight size={12} />
              </span>
            </div>
          </div>

          {/* Card C: Core Skills / Tools (New customized skills display with loading-page colours) */}
          <div 
            className="group relative rounded-2xl sm:rounded-[28px] overflow-hidden bg-white text-zinc-900 p-3 sm:p-8 min-h-[180px] sm:min-h-[320px] flex flex-col justify-between border-2 border-zinc-200 shadow-md transform transition-all duration-300 hover:translate-y-[-4px] hover:border-[#2E8BF7]/30"
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex items-center justify-between mb-1 sm:mb-2 gap-1">
              <span className="text-[6px] sm:text-[9px] font-mono tracking-wider sm:tracking-widest text-zinc-600 uppercase font-black truncate">(Capabilities)</span>
              <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#2E8BF7] animate-pulse shrink-0"></div>
            </div>

            <div className="space-y-2 sm:space-y-4 my-auto">
              <div>
                <span className="text-[6px] sm:text-[10px] font-mono text-zinc-500 uppercase block mb-0.5 sm:mb-1.5">Design</span>
                <div className="flex flex-wrap gap-0.5 sm:gap-1">
                  {designSkills.slice(0, 3).map((skill) => (
                    <span 
                      key={skill.name} 
                      className={`text-[5.5px] sm:text-[10px] font-bold border px-1 sm:px-2 py-0.5 rounded ${skill.bg} ${skill.text} ${skill.border} truncate max-w-full`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[6px] sm:text-[10px] font-mono text-zinc-500 uppercase block mb-0.5 sm:mb-1.5">Tools</span>
                <div className="flex flex-wrap gap-0.5 sm:gap-1">
                  {designTools.slice(0, 3).map((tool) => (
                    <span 
                      key={tool.name} 
                      className={`text-[5.5px] sm:text-[9.5px] font-mono border px-1 sm:px-2.5 py-0.5 rounded font-bold ${tool.color} truncate`}
                    >
                      {tool.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex items-center justify-between border-t border-zinc-200 pt-2 mt-2 sm:pt-4 sm:mt-4">
              <span className="text-[6px] sm:text-[11px] font-bold text-zinc-700 flex items-center gap-1 truncate">
                🚀 Full Design
              </span>
            </div>
          </div>
        </div>

        {/* Section Split Row */}
        <div className="border-t border-zinc-205 pt-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-zinc-505">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#2E8BF7] font-bold">(Skills & Tools — 01)</span>
          </div>
          
          <p className="font-sans text-lg text-zinc-700 max-w-lg md:text-center font-medium leading-relaxed">
            Proficient in translating complex layouts and micro-behaviors into high-impact graphic assets and clean vector grids.
          </p>

          <div className="hidden md:block w-32"></div>
        </div>
      </motion.div>
    </section>
  );
}
