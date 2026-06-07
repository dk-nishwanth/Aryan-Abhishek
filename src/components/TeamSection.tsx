import React, { useState } from 'react';
import { Star, Shield, ArrowRight, UserCheck, Settings, CheckCircle2, Award, Zap, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TeamSectionProps {
  onOpenContact: () => void;
}

export default function TeamSection({ onOpenContact }: TeamSectionProps) {
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [budget, setBudget] = useState('$10k - $25k');
  const [timeline, setTimeline] = useState('4-8 Weeks');
  const [servicesNeeded, setServicesNeeded] = useState<string[]>(['Identity Prep']);
  const [plannerSubmitted, setPlannerSubmitted] = useState(false);

  const togglePlannerService = (srv: string) => {
    if (servicesNeeded.includes(srv)) {
      setServicesNeeded(servicesNeeded.filter(s => s !== srv));
    } else {
      setServicesNeeded([...servicesNeeded, srv]);
    }
  };

  const handlePlannerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPlannerSubmitted(true);
    setTimeout(() => {
      setPlannerSubmitted(false);
      setPlannerOpen(false);
      setStep(1);
    }, 4500);
  };

  return (
    <section id="team" className="relative bg-[#08090E] text-zinc-300 py-24 px-6 md:px-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-6 mb-12 border-b border-zinc-900 pb-8">
          <div className="space-y-3">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-white">
              Man Behind <br className="hidden sm:inline" /> The Work
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-4 text-left md:text-right">
            <span className="font-mono text-xs uppercase tracking-widest text-[#2E8BF7] font-bold">(Team — 04)</span>
            
            {/* Team avatar block identical to layout */}
            <div className="flex items-center gap-3 bg-zinc-950/40 border border-zinc-850 p-2.5 rounded-2xl">
              <div className="h-6 w-6 rounded-full bg-[#E5FE40] border border-black flex items-center justify-center font-mono text-[9px] font-black">
                AA
              </div>
              <p className="text-[10.5px] font-mono text-zinc-400 leading-none">
                Meticulous execution. Every single curve, intentional.
              </p>
            </div>
          </div>
        </div>

        {/* Triple Block Grid (Matches layout exactly) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Block A: Designer portrait card */}
          <div className="group relative rounded-[28px] overflow-hidden bg-[#121217] border border-zinc-800 md:col-span-1 p-8 min-h-[360px] flex flex-col justify-between transition-all duration-300 hover:border-zinc-750 shadow-md">
            {/* Soft inner photo style background shadow */}
            <div className="absolute inset-0 z-0 opacity-20 bg-cover grayscale group-hover:scale-105 transition-all duration-500" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=500')` }}></div>
            {/* Overlay to darken background */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30 z-0"></div>

            <div className="flex justify-between items-center relative z-10">
              <span className="text-[10px] font-mono tracking-widest text-[#E5FE40] uppercase">VISUAL DESIGNER</span>
              <div className="h-2.5 w-2.5 rounded-full bg-indigo-500 animate-pulse" />
            </div>

            <div className="relative z-10 pt-16">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-1">DESIGN & MOTION</span>
              <h3 className="font-display text-2xl font-bold text-white tracking-tight">Aryan Abhishek</h3>
              <p className="text-xs font-sans text-zinc-300 mt-2 leading-relaxed">
                Meticulous visual communicator crafting dynamic decal artwork layouts for Royal Enfield and brand interactions that demand attention.
              </p>
            </div>
          </div>

          {/* Block B: Education parameters matching resume */}
          <div className="group relative rounded-[28px] overflow-hidden bg-gradient-to-br from-[#121215] to-[#1c1c24] p-8 min-h-[360px] flex flex-col justify-between border border-zinc-800 shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
            {/* Grain graphic */}
            <div className="absolute inset-0 bg-cover mix-blend-overlay opacity-10" style={{ backgroundImage: `url('data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E')` }}></div>

            <div className="relative z-10 flex justify-between items-center text-xs font-mono">
              <span className="bg-[#E5FE40] text-black font-bold px-2.5 py-1 rounded-full uppercase tracking-widest text-[9px]">EDUCATION</span>
              <Award size={16} className="text-[#E5FE40]" />
            </div>

            <div className="relative z-10 space-y-2 mt-4 text-white">
              <h4 className="text-zinc-400 font-mono text-[10px] tracking-widest uppercase">Bachelors in Design</h4>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight leading-tight">
                Unitedworld Institute of Design (UID)
              </h3>
              <p className="text-[10px] font-mono text-zinc-400">2019 - 2023 | Ahmedabad, India</p>
              
              <ul className="text-[10.5px] text-zinc-300 space-y-1 pt-2 list-disc pl-3 font-sans leading-normal">
                <li>Worked on, participated and created a video for CUMULUS International Association of Universities and Colleges of Art, Design and Media - CUMULUS Breadcrumb.</li>
                <li>Worked & helped in various installations and displays during Visual Communication Department Exhibition/Fest - MODUS 2021.</li>
              </ul>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#E5FE40] uppercase tracking-wider pt-2 border-t border-zinc-850">
              <span>VIS COMM SPECIALIST</span>
              <span>GRADUATED 2023</span>
            </div>
          </div>

          {/* Block C: Core design stats representing Indian visual layout work */}
          <div className="group relative rounded-[28px] overflow-hidden bg-[#121217] text-white p-8 min-h-[360px] flex flex-col justify-between border border-zinc-805 shadow-xl transition-all duration-300 hover:translate-y-[-2px]">
            <div className="flex justify-between items-center text-xs font-mono text-zinc-500">
              <span>(Design Focus)</span>
              <span className="text-[#2E8BF7] font-bold flex items-center gap-1">
                <CheckCircle2 size={12} /> VERIFIED PORTFOLIO
              </span>
            </div>

            <div className="space-y-2 my-auto">
              <h3 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-white animate-pulse">
                100%
              </h3>
              <p className="text-xs font-mono tracking-widest uppercase font-bold text-zinc-400">
                Craft Quality
              </p>
              <p className="text-xs font-sans text-zinc-400 leading-relaxed">
                Seamless combination of core industry design standards with dynamic front-end layout executions and tactile physical artwork details.
              </p>
            </div>

            {/* Custom Trustpilot stylized icon/banner exactly as visual layout */}
            <div className="flex justify-between items-center border-t border-zinc-850 pt-4 mt-auto">
              <span className="text-[11px] font-bold tracking-tight text-zinc-200 flex items-center gap-1 font-mono">
                ⚙️ Pro Design Stack
              </span>
              <span className="text-[10px] font-mono text-zinc-550">
                Figma • Creative Cloud
              </span>
            </div>
          </div>

        </div>

        {/* Lower Banner Callout strip - identical text and layout */}
        <div className="bg-[#0C0E14] rounded-[32px] p-8 md:p-12 border border-zinc-800 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
          
          <div className="space-y-2 max-w-2xl relative z-10">
            <p className="font-display text-lg sm:text-xl md:text-2xl text-zinc-200 font-medium leading-relaxed">
              Whether you're launching something new or reshaping what exists, we're here to help you stand out—with clarity, creativity, and edge.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <button
              onClick={() => setPlannerOpen(true)}
              className="bg-[#2E8BF7] text-white px-8 py-4 rounded-full font-bold text-sm tracking-wide flex items-center gap-2 hover:bg-[#12B4D1] transition-all transform hover:scale-103 duration-300 shadow-md cursor-pointer"
            >
              Start Your Project <ArrowRight size={14} />
            </button>
          </div>
        </div>

      </div>

      {/* Interactive Project Planner Sheet */}
      <AnimatePresence>
        {plannerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPlannerOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg rounded-[32px] bg-[#141419] border border-white/10 p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[150px] h-[150px] rounded-full bg-indigo-500/10 blur-[50px] uppercase font-mono text-[9px] text-zinc-500/20 text-right p-6 pointer-events-none">PLANNER OS</div>
              
              <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6">
                <div>
                  <h3 className="font-display font-bold text-xl text-white">Project Planner</h3>
                  <p className="text-zinc-500 text-xs mt-0.5">Determine scope, budget, and trajectory</p>
                </div>
                <button 
                  onClick={() => setPlannerOpen(false)}
                  className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition"
                >
                  <Settings size={16} />
                </button>
              </div>

              {plannerSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-[#E5FE40]/15 border border-[#E5FE40]/20 text-[#E5FE40] flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 size={32} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xl text-white">Proposal Matrix Configured</h4>
                    <p className="text-zinc-400 text-xs max-w-xs mx-auto mt-2 leading-relaxed">
                      We aligned your budget parameters of <strong className="text-[#E5FE40]">{budget}</strong> and selected scopes. Our design deck has been generated.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handlePlannerSubmit} className="space-y-6">
                  {/* Step Indicators */}
                  <div className="flex space-x-2">
                    {[1, 2].map((s) => (
                      <div key={s} className={`h-1.5 grow rounded-full transition-all duration-300 ${step >= s ? 'bg-[#E5FE40]' : 'bg-white/10'}`} />
                    ))}
                  </div>

                  {step === 1 && (
                    <div className="space-y-4">
                      <div>
                        <span className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">1. Select Creative Focus Scopes</span>
                        <div className="grid grid-cols-2 gap-2">
                          {['Identity Prep', 'UI/UX Visuals', 'Vite Frontends', 'SEO Structuring'].map((srv) => {
                            const selected = servicesNeeded.includes(srv);
                            return (
                              <button
                                type="button"
                                key={srv}
                                onClick={() => togglePlannerService(srv)}
                                className={`text-xs font-mono p-3 rounded-xl border text-left flex justify-between items-center transition ${
                                  selected 
                                    ? 'bg-indigo-500/15 border-[#E5FE40] text-white' 
                                    : 'bg-white/5 border-white/5 text-zinc-400 hover:border-white/10'
                                }`}
                              >
                                {srv}
                                {selected && <Zap size={10} className="text-[#E5FE40]" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <span className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">2. Budget Scope</span>
                        <div className="grid grid-cols-3 gap-2">
                          {['$10k - $25k', '$25k - $50k', '$50k+'].map((bg) => (
                            <button
                              type="button"
                              key={bg}
                              onClick={() => setBudget(bg)}
                              className={`text-xs font-mono p-2.5 rounded-lg border text-center transition ${
                                budget === bg 
                                  ? 'bg-[#E5FE40] text-black border-[#E5FE40]' 
                                  : 'bg-white/5 border-white/10 text-zinc-400 hover:border-white/20'
                              }`}
                            >
                              {bg}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/5 flex justify-end">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="bg-white/10 hover:bg-white/20 text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-1"
                        >
                          Next Step <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <div>
                        <span className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">3. Desired Timeline</span>
                        <div className="grid grid-cols-2 gap-2">
                          {['3-4 Weeks', '4-8 Weeks', '8+ Weeks'].map((tim) => (
                            <button
                              type="button"
                              key={tim}
                              onClick={() => setTimeline(tim)}
                              className={`text-xs font-mono p-3 rounded-xl border text-left transition ${
                                timeline === tim 
                                  ? 'bg-zinc-800 border-white text-white' 
                                  : 'bg-white/5 border-white/5 text-zinc-400'
                              }`}
                            >
                              {tim}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">4. Your Email</span>
                        <input 
                          type="email" 
                          required 
                          placeholder="client@enterprise.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E5FE40] text-white"
                        />
                      </div>

                      <div className="pt-4 border-t border-white/5 flex justify-between">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="text-xs font-mono text-zinc-500 hover:text-white"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="bg-[#E5FE40] text-black text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-white transition"
                        >
                          Submit Requirements
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
