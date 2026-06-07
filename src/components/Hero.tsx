import React, { useRef, useState, useEffect } from 'react';
import { 
  ArrowDown, Sparkles, MoveRight, HelpCircle, AlertTriangle, 
  Search, Heart, Folder, Mail, FileText, Trash2, User, Smile 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LampContainer } from './ui/lamp';

interface HeroProps {
  onOpenContact: () => void;
}

export default function Hero({ onOpenContact }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Retro interactive state hooks matching Welcome Screen
  const [activeTab, setActiveTab] = useState<'decals' | 'motion' | 'code'>('decals');
  const [isSelfieBouncing, setIsSelfieBouncing] = useState(false);
  const [isDogBouncing, setIsDogBouncing] = useState(false);
  const [showSelfieBubble, setShowSelfieBubble] = useState(false);
  const [showDogBubble, setShowDogBubble] = useState(false);
  const [showPackDetails, setShowPackDetails] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Only add mouse move listener on non-mobile devices
    if (isMobile) return;

    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame for smooth updates
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        // Normalized offset from -0.5 to 0.5
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[90vh] bg-[linear-gradient(90deg,rgba(191,227,255,0.45)_50%,transparent_50%)] bg-[size:24px_24px] bg-[#E1EEFA]/30 overflow-hidden w-full flex items-center pt-28 pb-16 border-b border-zinc-200"
    >
      <div className="relative w-full h-full px-6 md:px-12 flex flex-col justify-between bg-transparent min-h-0 z-10">
        
        {/* Dynamic Background Noise & Grain Glows - only on desktop */}
        {!isMobile && (
          <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
            <div 
              className="absolute right-[-5%] top-[-5%] w-[65%] h-[75%] rounded-full bg-gradient-to-br from-[#2E8BF7]/20 via-[#12B4D1]/15 to-[#FFA82E]/10 blur-[120px] transition-transform duration-500"
              style={{
                transform: `translate(${mousePosition.x * 40}px, ${mousePosition.y * 40}px)`,
              }}
            />
            <div 
              className="absolute left-[-5%] bottom-[-5%] w-[50%] h-[55%] rounded-full bg-[#0FA958]/10 blur-[100px] transition-transform duration-700"
              style={{
                transform: `translate(${mousePosition.y * -30}px, ${mousePosition.x * -30}px)`,
              }}
            />
          </div>
        )}

        {/* Decorative vertical/horizontal thin tech grid lines matching welcome screen frames */}
        <div className="absolute inset-0 z-0 grid grid-cols-12 pointer-events-none opacity-[0.06]">
          <div className="border-r border-zinc-300 h-full col-start-2"></div>
          <div className="border-r border-zinc-300 h-full col-start-6"></div>
          <div className="border-r border-zinc-300 h-full col-start-10"></div>
        </div>

        {/* Main Grid Section: Left Column Headers, Right Column Retro-machine Terminal */}
        <div className="relative z-20 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center flex-1 my-auto">
          
          {/* LEFT COLUMN: Texts & Editorial CTA Elements */}
          <div className="lg:col-span-6 flex flex-col space-y-6 text-left relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col space-y-2.5"
            >
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2E8BF7] animate-ping"></span>
                <span className="text-[11px] font-mono tracking-[0.25em] text-[#2E8BF7] bg-white border border-zinc-200 px-3 py-1 rounded-full uppercase font-bold">
                  Visual & Motion Designer
                </span>
              </div>
              
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-[4.2rem] font-medium leading-[1.1] tracking-tight text-zinc-950 mt-1">
                Crafting dynamic visual structures, decal artworks & high-fidelity motion loops.
              </h1>
            </motion.div>

            {/* Subheading description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="text-sm sm:text-base text-zinc-700 max-w-xl font-sans leading-relaxed"
            >
              Interactive digital designer specializing in premium layout grids, custom retro operating systems, and fluid bezier easing pipelines.
            </motion.p>

            {/* Action Buttons & Scroll Indicator Row */}
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <button
                  onClick={onOpenContact}
                  className="group relative inline-flex items-center justify-center bg-[#2E8BF7] text-white px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide gap-3 overflow-hidden shadow-[0_4px_30px_rgba(46,139,247,0.25)] hover:bg-[#12B4D1] transition-all duration-300 cursor-pointer"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Let's Collaborate 
                    <MoveRight size={16} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-white/20 transition-transform duration-300 ease-out"></div>
                </button>
              </motion.div>

              <motion.button
                onClick={scrollToProjects}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xs font-mono text-zinc-600 hover:text-[#2E8BF7] flex items-center gap-2 transition-colors group cursor-pointer bg-transparent border-none outline-none py-2"
              >
                <span className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center bg-white/80 transform group-hover:translate-y-0.5 transition-transform duration-300">
                  <ArrowDown size={12} className="text-zinc-600 group-hover:text-[#2E8BF7]" />
                </span>
                <span>(Explore Projects)</span>
              </motion.button>
            </div>
          </div>

          {/* RIGHT COLUMN: Retro OS Terminal Setup matching Welcome Screen, customized in light cream-bone vintage style */}
          <div className="lg:col-span-6 flex flex-col justify-center items-center py-6 relative z-10 w-full overflow-visible select-none">
            
            {/* Ambient Backlight Glow under terminal */}
            <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-[#2E8BF7]/20 via-[#12B4D1]/15 to-transparent blur-[80px] pointer-events-none"></div>

            {/* Left side floating element: Cyber Selfie Polaroid */}
            <div className="absolute left-[-20px] sm:left-[0px] lg:left-[-35px] bottom-[-20px] sm:bottom-[10px] z-30">
              <motion.div 
                animate={{ 
                  rotate: isSelfieBouncing ? [-6, 2, -8, -6] : -6,
                  y: isSelfieBouncing ? [0, -8, 0] : 0
                }}
                transition={{ duration: 0.5 }}
                onClick={() => {
                  setIsSelfieBouncing(true);
                  setShowSelfieBubble(true);
                  setTimeout(() => setIsSelfieBouncing(false), 500);
                  setTimeout(() => setShowSelfieBubble(false), 3000);
                }}
                className="w-24 sm:w-32 bg-white p-2 pb-5 border-2 border-zinc-200/80 shadow-[0_12px_28px_rgba(0,0,0,0.06)] rounded-sm cursor-pointer relative"
                style={{ originX: 0.5, originY: 0.5 }}
              >
                {/* Image Section */}
                <div className="relative aspect-[1/1] overflow-hidden rounded bg-[#EBF4FC] border border-zinc-250 flex items-center justify-center">
                  <div className="w-full h-full relative flex items-center justify-center pt-2">
                    {/* Retro cyber background circle */}
                    <div className="absolute inset-0 bg-white/60 rounded-full scale-[0.8] opacity-90 border border-[#2E8BF7]/25"></div>
                    
                    {/* Illustration details */}
                    <div className="relative w-14 h-16 flex flex-col justify-end items-center">
                      {/* Hair */}
                      <div className="absolute top-1.5 w-9 h-9 rounded-full bg-zinc-900"></div>
                      {/* Face */}
                      <div className="w-7 h-7 rounded-full bg-[#D4A373] relative z-10 flex flex-col justify-center items-center">
                        {/* Rosy neon cheek spots */}
                        <div className="absolute left-1 right-1 flex justify-between px-0.5">
                          <div className="w-1.5 h-1.5 bg-[#2E8BF7] rounded-full opacity-60"></div>
                          <div className="w-1.5 h-1.5 bg-[#2E8BF7] rounded-full opacity-60"></div>
                        </div>
                        {/* Glowing Visor Sunglasses */}
                        <div className="absolute top-1.5 w-6 h-2 bg-black border border-[#2E8BF7] rounded flex items-center justify-center shadow-[0_0_8px_rgba(46,139,247,0.4)]">
                          <span className="text-[4.5px] font-mono font-black text-[#2E8BF7] leading-none tracking-tighter">OS_1</span>
                        </div>
                        {/* Smiling mouth */}
                        <div className="w-2 h-1 border-b border-zinc-950 rounded-b-full mt-1.5"></div>
                      </div>

                      {/* Cool graphic bucket hat in dark-gray with cyan neon brim */}
                      <div className="absolute top-1 z-20 flex flex-col items-center">
                        <div className="w-8 h-4.5 bg-zinc-800 rounded-t-md relative border border-zinc-650">
                          <div className="absolute bottom-0.5 inset-x-0 border-b border-[#2E8BF7]/40"></div>
                        </div>
                        <div className="w-10 h-1.5 bg-zinc-800 border border-zinc-650 rounded-b-sm -mt-0.5"></div>
                      </div>

                      {/* Jacket sleeve */}
                      <div className="w-9 h-5 bg-[#2E8BF7] rounded-t-lg -mt-1 relative z-10 border-t border-cyan-400/20"></div>
                    </div>
                  </div>

                  <span className="absolute bottom-1 right-1 text-[#2E8BF7]">
                    <Smile size={10} />
                  </span>
                </div>

                {/* Bubble details */}
                <AnimatePresence>
                  {showSelfieBubble && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -10 }}
                      className="absolute -top-12 left-0 right-0 mx-auto w-24 p-1.5 bg-zinc-90 w bg-white border-2 border-black text-[8px] text-[#2E8BF7] rounded-lg text-center font-mono leading-tight z-40 shadow-xl"
                    >
                      COSMIC LOG // IN
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="text-center font-mono text-[8px] text-zinc-550 font-bold mt-2 uppercase tracking-wider">
                  COSMIC VIEWS
                </div>
              </motion.div>
            </div>

            {/* Right side floating element: Cyber Bulldog Polaroid */}
            <div className="absolute right-[-20px] sm:right-[0px] lg:right-[-32px] top-[-10px] sm:top-[20px] z-30">
              <motion.div 
                animate={{ 
                  rotate: isDogBouncing ? [8, -2, 12, 8] : 8,
                  y: isDogBouncing ? [0, -8, 0] : 0
                }}
                transition={{ duration: 0.5 }}
                onClick={() => {
                  setIsDogBouncing(true);
                  setShowDogBubble(true);
                  setTimeout(() => setIsDogBouncing(false), 500);
                  setTimeout(() => setShowDogBubble(false), 3000);
                }}
                className="w-24 sm:w-32 bg-white p-2 pb-5 border-2 border-zinc-200/80 shadow-[0_12px_28px_rgba(0,0,0,0.06)] rounded-sm cursor-pointer relative"
                style={{ originX: 0.5, originY: 0.5 }}
              >
                {/* Image Section */}
                <div className="relative aspect-[1/1] overflow-hidden rounded bg-[#FFE4E6] border border-zinc-250 flex items-center justify-center">
                  <div className="relative w-14 h-14 flex flex-col justify-center items-center">
                    
                    {/* Dog avatar head */}
                    <div className="w-12 h-10.5 bg-white rounded-t-2xl rounded-b relative shadow-sm flex flex-col items-center">
                      {/* Floppy ears */}
                      <div className="absolute -top-1 -left-1.5 w-3.5 h-5 bg-[#FFE4E6] rounded-l-full transform -rotate-[35deg] border-t-2 border-l-2 border-zinc-200"></div>
                      <div className="absolute -top-1 -right-1.5 w-3.5 h-5 bg-[#FFE4E6] rounded-r-full transform rotate-[35deg] border-t-2 border-r-2 border-zinc-200"></div>

                      {/* Spiky wrap glasses */}
                      <div className="absolute top-3 w-10 h-2 leading-none bg-[#2E8BF7] rounded-sm transform scale-x-110 shadow-[0_0_8px_rgba(46,139,247,0.3)] flex items-center justify-center relative border border-white">
                        <span className="text-[4px] text-white font-mono font-bold uppercase tracking-widest">CYBER</span>
                      </div>

                      {/* Snout */}
                      <div className="w-8 h-5 bg-zinc-100 rounded-lg absolute bottom-0.5 z-10 flex flex-col items-center justify-center">
                        <div className="w-2.5 h-1.5 bg-zinc-800 rounded-full"></div>
                        <div className="w-2 h-1 bg-[#FF5A5A] rounded-b-xl mt-0.5"></div>
                      </div>
                    </div>

                    {/* Laser collar */}
                    <div className="w-9 h-1.5 bg-red-600 rounded-full -mt-2.5 z-0 shadow-[0_0_6px_rgba(220,38,38,0.5)]"></div>
                  </div>

                  <span className="absolute bottom-1 right-1 text-[#FFA82E]">
                    <Sparkles size={10} />
                  </span>
                </div>

                {/* Dog speech popup bubble */}
                <AnimatePresence>
                  {showDogBubble && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -10 }}
                      className="absolute -top-12 left-0 right-0 mx-auto w-24 p-1.5 bg-white border-2 border-black text-[8px] text-[#FFA82E] rounded-lg text-center font-mono leading-tight z-40 shadow-xl"
                    >
                      SYS_VITE ACTIVE 🐾
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="text-center font-mono text-[8px] text-zinc-550 font-bold mt-2 uppercase tracking-wider">
                  BUDDY VITE
                </div>
              </motion.div>
            </div>

            {/* Cyber Starter Pack Post-it sticker floating right-bottom */}
            <div className="absolute right-[0px] sm:right-[30px] lg:right-[-10px] bottom-[-20px] sm:bottom-[-10px] z-30">
              <div className="relative">
                {/* Yellow glowing futuristic pin dot */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#FFA82E] rounded-full border border-orange-500 shadow-[0_0_8px_#FFA82E] z-30 flex items-center justify-center">
                  <span className="w-1 h-1 bg-white rounded-full"></span>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  onClick={() => setShowPackDetails(!showPackDetails)}
                  className="w-20 sm:w-24 bg-[#0FA958] text-white p-2.5 pt-5 min-h-[60px] shadow-2xl rounded border-t border-green-300 cursor-pointer relative origin-top z-10"
                  style={{ transform: "rotate(5deg)" }}
                >
                  <div className="space-y-0.5">
                    <h4 className="font-mono text-[7px] sm:text-[8px] font-black text-center text-green-950 uppercase leading-none tracking-tight">
                      CYBER
                    </h4>
                    <p className="font-mono text-[7.5px] sm:text-[8px] font-black text-center text-white uppercase leading-none tracking-tight font-sans">
                      PACK
                    </p>
                  </div>
                </motion.div>

                {/* Pack Detail Tooltip */}
                <AnimatePresence>
                  {showPackDetails && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      className="absolute right-0 bottom-full mb-3 w-44 p-2.5 bg-white border-2 border-black text-zinc-900 text-xs rounded-xl shadow-2xl z-40"
                    >
                      <div className="absolute -bottom-1.5 right-6 w-3.3 h-3.3 bg-white border-r-2 border-b-2 border-black transform rotate-45" />
                      <p className="font-mono font-bold text-[#0FA958] text-[9.5px] tracking-wide mb-1 uppercase">Terminal Pack:</p>
                      <ul className="space-y-1 text-[9px] list-disc pl-3 text-zinc-650 font-mono">
                        <li>Espresso Double ☕</li>
                        <li>Decal Vector Curves 📐</li>
                        <li>Framer Motion Core ⚙️</li>
                        <li>TypeScript Pipelines ⌨️</li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* MASTER RETRO MACHINE MONITOR PORT (Bone/Cream vintage computer casing) */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 100 }}
              className="relative z-10"
              id="hero-dark-monitor"
            >
              {/* Retro CNC frame box */}
              <div className="w-[285px] h-[225px] sm:w-[340px] sm:h-[265px] bg-[#E3DAC9] border-t-4 border-l-4 border-[#FDFBF7] border-b-8 border-r-8 border-[#C9C2B2] rounded-[28px] p-4 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.15)] border border-[#C9C2B2]/20 relative">
                
                {/* Brand LED center */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1.5 bg-[#B8B0A0] rounded-full"></div>

                {/* CRT screen inside */}
                <div className="relative flex-1 bg-gradient-to-tr from-[#124CAE] via-[#2E8BF7] to-[#80B9FF] rounded-[16px] p-2.5 flex flex-col justify-between overflow-hidden border-4 border-t-[#B0A796] border-l-[#B0A796] border-b-[#EDE7DB] border-r-[#EDE7DB] shadow-inner">
                  
                  {/* Subtle scan grid overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px] pointer-events-none z-10 opacity-70"></div>
                  
                  {/* Internal Grid columns */}
                  <div className="flex h-full gap-2 relative z-0">
                    
                    {/* Left icon rail (Light theme style icons with absolute high visibility overlay) */}
                    <div className="flex flex-col justify-between items-center py-2 text-white scale-[0.8] origin-left select-none font-bold">
                      <div className="flex flex-col items-center gap-0.5 cursor-pointer hover:text-amber-250 transition">
                        <Search size={14} className="text-white" />
                        <span className="text-[7px] font-mono tracking-tighter uppercase opacity-90">FIND</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5 cursor-pointer hover:text-red-200 transition">
                        <Heart size={14} className="text-white" />
                        <span className="text-[7px] font-mono tracking-tighter uppercase opacity-90">LOVE</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5 cursor-pointer hover:text-emerald-200 transition">
                        <Folder size={14} className="text-white" />
                        <span className="text-[7px] font-mono tracking-tighter uppercase opacity-90">DATA</span>
                      </div>
                    </div>

                    {/* MAIN INTERACTIVE WINDOW (Old OS style, black-on-white high contrast matching welcome.exe window!) */}
                    <div className="flex-1 bg-white border-[3px] border-black rounded-lg p-2.5 flex flex-col justify-between shadow-[4px_4px_0px_#000000] relative my-auto h-[135px] sm:h-[155px]">
                      
                      {/* Title bar of popup */}
                      <div className="flex items-center justify-between border-b-2 border-black pb-1 mb-1">
                        <div className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 border border-black"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 border border-black"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 border border-black"></span>
                        </div>
                        <span className="text-[8.5px] sm:text-[9.5px] font-mono font-bold text-zinc-900 mx-auto -translate-x-2">
                          workspace.exe
                        </span>
                      </div>

                      {/* Display Log panel */}
                      <div className="flex-1 flex flex-col justify-between pt-1">
                        
                        {/* Dynamic Log description based on selected tabs */}
                        <div className="space-y-1">
                          
                          {activeTab === 'decals' && (
                            <div className="text-[9.5px] sm:text-[10px] font-mono leading-snug text-zinc-950">
                              <p className="text-zinc-500 font-bold">// DECAL ART SYSTEMS</p>
                              <p className="text-[#124CAE] font-bold">&gt; Mapped Classic Royal Enfield</p>
                              <p>&gt; Custom vector bezier curves</p>
                              <p className="text-[#0FA958] font-bold">&gt; Status: COMPLETE 🗸</p>
                            </div>
                          )}

                          {activeTab === 'motion' && (
                            <div className="text-[9.5px] sm:text-[10px] font-mono leading-snug text-zinc-950">
                              <p className="text-zinc-500 font-bold">// MOTION GRAPHIC CYCLES</p>
                              <p className="text-[#D84C10] font-bold">&gt; 240fps fluid easing loops</p>
                              <p>&gt; Infinite visual cycle engine</p>
                              <p className="text-amber-600 font-bold">&gt; Status: RENDERING ⚙️</p>
                            </div>
                          )}

                          {activeTab === 'code' && (
                            <div className="text-[9.5px] sm:text-[10px] font-mono leading-snug text-zinc-950">
                              <p className="text-zinc-500 font-bold">// TECH BUNDLE PIPELINES</p>
                              <p>&gt; Vite + React HMR sandbox</p>
                              <p>&gt; Strict type safety compiler</p>
                              <p className="text-[#2E8BF7] font-bold">&gt; Status: PORT 3000 ONLINE ●</p>
                            </div>
                          )}

                        </div>

                        {/* Interactive Selection Tabs representing retro-terminal choices! */}
                        <div className="grid grid-cols-3 gap-1 mt-2 pt-1 border-t-2 border-black">
                          <button
                            onClick={() => setActiveTab('decals')}
                            className={`text-[7.5px] font-mono py-1 rounded transition-colors text-center cursor-pointer border ${
                              activeTab === 'decals'
                                ? 'bg-[#2E8BF7] text-white border-black font-black shadow-[1.5px_1.5px_0px_#000]'
                                : 'bg-zinc-100 text-zinc-700 hover:text-black border-zinc-300'
                            }`}
                          >
                            1:DECALS
                          </button>
                          
                          <button
                            onClick={() => setActiveTab('motion')}
                            className={`text-[7.5px] font-mono py-1 rounded transition-colors text-center cursor-pointer border ${
                              activeTab === 'motion'
                                ? 'bg-[#2E8BF7] text-white border-black font-black shadow-[1.5px_1.5px_0px_#000]'
                                : 'bg-zinc-100 text-zinc-700 hover:text-black border-zinc-300'
                            }`}
                          >
                            2:MOTION
                          </button>

                          <button
                            onClick={() => setActiveTab('code')}
                            className={`text-[7.5px] font-mono py-1 rounded transition-colors text-center cursor-pointer border ${
                              activeTab === 'code'
                                ? 'bg-[#2E8BF7] text-white border-black font-black shadow-[1.5px_1.5px_0px_#000]'
                                : 'bg-zinc-100 text-zinc-700 hover:text-black border-zinc-300'
                            }`}
                          >
                            3:CODE
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right icon rail */}
                    <div className="flex flex-col justify-between items-center py-2 text-white scale-[0.8] origin-right select-none font-bold">
                      <div className="flex flex-col items-center gap-0.5 cursor-pointer hover:text-yellow-300 transition" onClick={onOpenContact}>
                        <Mail size={14} className="text-white" />
                        <span className="text-[7px] font-mono tracking-tighter uppercase opacity-90">MAIL</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5 cursor-pointer hover:text-cyan-200 transition" onClick={onOpenContact}>
                        <FileText size={14} className="text-white" />
                        <span className="text-[7px] font-mono tracking-tighter uppercase opacity-90">CV_SH</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5 cursor-pointer hover:text-red-300 transition">
                        <Trash2 size={14} className="text-white" />
                        <span className="text-[7px] font-mono tracking-tighter uppercase opacity-90">TRASH</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Slots row at bottom beaker */}
                <div className="flex items-center justify-between px-1 pt-2">
                  <div className="flex gap-1">
                    <div className="w-7 h-1 bg-[#B8B0A0] rounded-sm"></div>
                    <div className="w-2.5 h-1 bg-[#B8B0A0] rounded-sm"></div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#0FA958] shadow-[0_0_8px_#0FA958] animate-pulse"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B8B0A0]"></div>
                  </div>
                </div>

              </div>
              
              {/* Cream-cased support pedestal */}
              <div className="w-28 h-14 bg-gradient-to-r from-[#D7CEBD] to-[#C0B9A9] rounded-b-xl border-x-4 border-b-4 border-[#A19A8B] mx-auto -mt-2 shadow-lg relative z-0 flex flex-col justify-end pb-2 items-center">
                <div className="absolute top-0 inset-x-0 h-2 bg-white/20 border-b border-black/10 rounded-t-full opacity-30"></div>
                <div className="text-[8px] font-mono text-zinc-650 tracking-widest font-bold leading-none">
                  SYS_STAND
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Giant Backdrop brand typographic accent at bottom - MADE EXTREMELY READABLE */}
        <div className="relative w-full overflow-hidden mt-12 lg:mt-8">
          <div className="max-w-7xl mx-auto px-0 md:px-6 relative h-[14vw] md:h-[12vw] flex items-end">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 60, delay: 0.2 }}
              className="w-full flex justify-between items-baseline select-none pointer-events-none"
            >
              <h2 className="w-full text-[14vw] md:text-[13vw] font-display font-black tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-zinc-950 via-[#124CAE] to-[#2E8BF7] opacity-[0.95]">
                ABHISHEK
              </h2>
            </motion.div>

            {/* Glowing system tag on the side */}
            <div className="absolute right-0 bottom-1/4 w-[24vw] h-[14vw] rounded-2xl md:rounded-[40px] bg-gradient-to-tr from-[#2E8BF7]/20 via-[#12B4D1]/10 to-[#12B4D1]/5 opacity-60 blur-[1px] shadow-2xl overflow-hidden hidden md:block border border-zinc-200">
              <div className="absolute inset-0 bg-cover mix-blend-overlay opacity-20" style={{ backgroundImage: `url('data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E')` }}></div>
              <div className="absolute top-4 left-6 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-zinc-250">
                <Sparkles size={11} className="text-[#2E8BF7] animate-pulse" />
                <span className="text-[9px] font-mono tracking-wider text-zinc-800 font-bold">DEV_SHELL v1.1</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
