import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Heart, Folder, Mail, FileText, Calendar, Trash2, 
  HelpCircle, AlertTriangle, MessageSquare, Sparkles, Smile, ArrowRight, User 
} from 'lucide-react';

interface WelcomeScreenProps {
  onEnter: (userName: string) => void;
}

const FUN_FACTS = [
  "I style custom decal artworks for actual Royal Enfield motorcycles! 🏍️",
  "This portfolio is set up to load at maximum fluid framerates. ⚡",
  "I balance strict typography grids with visual playfulness. 📐",
  "My bestie is a white bulldog who keeps watch during 3AM renders! 🐶",
  "Every hover interaction is custom-transitioned individually! ✨",
  "I build fully hand-crafted custom SVGs for interactive details. 💻",
  "My design weapon of choice is a combination of Figma, Spline, and custom code. 🎨"
];

export default function WelcomeScreen({ onEnter }: WelcomeScreenProps) {
  const [userName, setUserName] = useState('');
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [showFactTooltip, setShowFactTooltip] = useState(false);
  const [isDogBouncing, setIsDogBouncing] = useState(false);
  const [isSelfieBouncing, setIsSelfieBouncing] = useState(false);
  const [showDogBubble, setShowDogBubble] = useState(false);
  const [showSelfieBubble, setShowSelfieBubble] = useState(false);
  const [showPackDetails, setShowPackDetails] = useState(false);

  // Rotate fun facts automatically or keep on click
  const cycleFact = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentFactIndex((prev) => (prev + 1) % FUN_FACTS.length);
    setShowFactTooltip(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEnter(userName || 'Guest Explorer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[linear-gradient(90deg,rgba(191,227,255,0.45)_50%,transparent_50%)] bg-[size:24px_24px] bg-[#E1EEFA] flex items-center justify-center p-4 md:p-8 select-none font-sans">
      
      {/* Outer mock-up tablet/screen border frame to match the photo exactly */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-5xl bg-white border-8 border-white rounded-[40px] shadow-2xl overflow-hidden relative"
        id="welcome-device-frame"
      >
        
        {/* Soft, warm clay-cream colored canvas inside the frame */}
        <div className="relative w-full min-h-[560px] md:min-h-[640px] bg-[#FAF8F2] p-6 md:p-10 flex flex-col justify-between overflow-hidden">
          
          {/* 1. HUGE "hello!" BACKGROUND TEXT */}
          <div className="absolute inset-0 flex items-start justify-center pt-8 md:pt-12 select-none pointer-events-none z-0 overflow-hidden">
            <h1 className="text-[110px] sm:text-[150px] md:text-[200px] font-black tracking-tighter leading-none bg-gradient-to-b from-[#2E8BF7] via-[#4BA4FF] to-[#DCEEFF] bg-clip-text text-transparent opacity-85 translate-y-[-10px]">
              hello!
            </h1>
          </div>

          {/* 2. TOP DECORATION ELEMENTS (SPARKLES & FUN FACT BADGE) */}
          <div className="relative z-10 flex justify-between items-start w-full">
            
            {/* Left top: FUN FACT GREEN TAPED BADGE */}
            <div className="relative">
              {/* Animated Sparkles above Fun Fact badge */}
              <div className="absolute -top-6 -left-2 flex space-x-1 text-amber-400 animate-pulse">
                <Sparkles size={16} className="rotate-12" />
                <Sparkles size={10} className="-rotate-12 mt-2" />
              </div>

              <div className="flex flex-col items-start gap-1">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  onClick={cycleFact}
                  className="bg-[#0FA958] text-white text-[12px] md:text-sm font-bold font-mono py-1.5 px-4 cursor-pointer shadow-md rounded-[4px] relative origin-bottom-left flex items-center gap-1.5 border-b-2 border-green-800"
                  style={{ transform: "rotate(-4deg)" }}
                >
                  <span className="w-2 h-2 rounded-full bg-green-200 animate-ping"></span>
                  Fun Fact
                </motion.div>
                
                {/* Fact explanation dialog bubble on hover/click */}
                <AnimatePresence>
                  {showFactTooltip && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className="absolute left-0 mt-3 top-full w-60 p-3 bg-white text-zinc-800 text-xs rounded-xl shadow-lg border border-zinc-200 z-30"
                    >
                      <div className="absolute -top-2 left-6 w-4 h-4 bg-white transform rotate-45 border-l border-t border-zinc-200" />
                      <p className="font-medium relative z-10 leading-relaxed font-sans">{FUN_FACTS[currentFactIndex]}</p>
                      <button 
                        onClick={(e) => cycleFact(e)}
                        className="text-[10px] text-zinc-400 font-bold tracking-wider uppercase mt-2 hover:text-[#0FA958] font-mono flex items-center gap-1 transition"
                      >
                        Next Fact <ArrowRight size={10} />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right top decoration helper text */}
            <div className="hidden md:flex flex-col text-right font-mono text-[9px] text-zinc-400 tracking-wider">
              <span>DESIGNER & MOTION ARTIST PORTFOLIO</span>
              <span>EST. © 2026 INDIAN ARTWORK LAB</span>
            </div>
          </div>

          {/* 3. CENTERED RETRO COMPUTER MONITOR & PEDESTAL STAND */}
          <div className="my-auto py-12 md:py-6 flex flex-col justify-center items-center relative z-10">
            
            {/* Retro PC Housing Wrapper */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 100 }}
              className="relative z-10"
            >
              {/* Outer CRT monitor case styled with vintage high-fidelity bezels */}
              <div id="retro-monitor" className="w-[305px] h-[255px] sm:w-[350px] sm:h-[265px] bg-[#E3DAC9] border-t-4 border-l-4 border-[#FDFBF7] border-b-8 border-r-8 border-[#C9C2B2] rounded-[24px] p-3 sm:p-4 flex flex-col justify-between shadow-xl relative">
                
                {/* Little vintage branding dot or LED */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1.5 bg-[#B8B0A0] rounded-full"></div>

                {/* Main computer CRT screen screen section (Cohesive blue-themed retro desktop) */}
                <div className="relative flex-1 bg-gradient-to-tr from-[#124CAE] via-[#2E8BF7] to-[#80B9FF] rounded-[14px] p-2 flex flex-col justify-between overflow-hidden border-4 border-t-[#B0A796] border-l-[#B0A796] border-b-[#EDE7DB] border-r-[#EDE7DB] shadow-inner">
                  
                  {/* Subtle pixel line scanner grid background for CRT vibes */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.12)_50%)] bg-[size:100%_4px] pointer-events-none z-10"></div>
                  
                  {/* Internal Grid of Elements */}
                  <div className="flex h-full gap-2 relative z-0">
                    
                    {/* Retro icon side column L */}
                    <div className="flex flex-col justify-between items-center py-2 text-white scale-[0.8] origin-left">
                      <div className="flex flex-col items-center gap-0.5 group cursor-pointer">
                        <Search size={15} strokeWidth={2.5} className="group-hover:scale-110 transition text-amber-200" />
                        <span className="text-[7.5px] font-mono tracking-tighter opacity-80 uppercase">Find</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5 group cursor-pointer">
                        <Heart size={15} strokeWidth={2.5} className="group-hover:scale-110 transition text-red-200" />
                        <span className="text-[7.5px] font-mono tracking-tighter opacity-80 uppercase">Love</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5 group cursor-pointer">
                        <Folder size={15} strokeWidth={2.5} className="group-hover:scale-110 transition text-cyan-200" />
                        <span className="text-[7.5px] font-mono tracking-tighter opacity-80 uppercase">Vault</span>
                      </div>
                    </div>

                    {/* CENTRAL TYPEWRITER POPUP WINDOW (Old OS style) */}
                    <div className="flex-1 bg-white border-[3px] border-black rounded-[8px] p-2 sm:p-3 flex flex-col justify-between shadow-[4px_4px_0px_#000000] relative my-auto h-auto min-h-[148px] sm:min-h-[155px] pb-1.5 sm:pb-3 overflow-visible">
                      
                      {/* Window Title Bar */}
                      <div className="flex items-center justify-between border-b-2 border-black pb-1 mb-1 sm:pb-1.5 sm:mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-red-400 border border-black"></span>
                          <span className="w-2 h-2 rounded-full bg-yellow-400 border border-black"></span>
                          <span className="w-2 h-2 rounded-full bg-green-400 border border-black"></span>
                        </div>
                        <span className="text-[9.5px] sm:text-[11px] font-mono font-bold tracking-tight text-zinc-900 mx-auto -translate-x-3">
                          welcome.exe
                        </span>
                      </div>

                      {/* Monospace interaction text */}
                      <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between gap-1">
                        <div className="space-y-0.5">
                          <p className="text-[11px] sm:text-[13px] font-mono font-black text-black leading-tight">
                            This is your guided <br className="hidden sm:block" />
                            tour of me <br />
                            <span className="text-[8.5px] sm:text-[10.5px] font-bold text-zinc-500 block mt-0.5 opacity-90">(i would love to know your name)</span>
                          </p>
                          
                          {/* Interactive Name Input Field */}
                          <div className="relative mt-1 flex items-center border-[2px] border-black rounded-lg px-2 py-0.5 sm:py-1 bg-zinc-50 focus-within:bg-white transition-colors">
                            <User size={11} className="text-zinc-500 mr-1 flex-shrink-0" />
                            <input 
                              type="text"
                              value={userName}
                              onChange={(e) => setUserName(e.target.value)}
                              placeholder="Enter your name..."
                              className="w-full text-[10px] sm:text-[11px] font-mono font-bold text-zinc-800 bg-transparent focus:outline-none placeholder-zinc-400 border-none p-0 h-4 min-h-0"
                            />
                            <div className="w-1.5 h-3 bg-zinc-400 absolute right-2 animate-pulse pointer-events-none"></div>
                          </div>
                        </div>

                        {/* ENTER/BEGIN BUTTON */}
                        <button 
                          type="submit"
                          className="mt-1.5 bg-[#2E8BF7] hover:bg-[#124CAE] active:translate-y-0.5 border-2 border-black text-white text-[10px] font-mono font-black py-1 px-3 rounded-lg shadow-[2px_2px_0px_#000000] focus:outline-none transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:shadow-none"
                        >
                          ENTER PORTFOLIO ↵
                        </button>
                      </form>
                    </div>

                    {/* Retro icon side column R */}
                    <div className="flex flex-col justify-between items-center py-2 text-white scale-[0.8] origin-right">
                      <div className="flex flex-col items-center gap-0.5 group cursor-pointer">
                        <Mail size={15} strokeWidth={2.5} className="group-hover:scale-110 transition text-yellow-200" />
                        <span className="text-[7.5px] font-mono tracking-tighter opacity-80 uppercase">Mail</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5 group cursor-pointer">
                        <FileText size={15} strokeWidth={2.5} className="group-hover:scale-110 transition text-emerald-200" />
                        <span className="text-[7.5px] font-mono tracking-tighter opacity-80 uppercase">CV</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5 group cursor-pointer">
                        <Trash2 size={15} strokeWidth={2.5} className="group-hover:scale-110 transition text-red-200" />
                        <span className="text-[7.5px] font-mono tracking-tighter opacity-80 uppercase">Trash</span>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Disk slots or power buttons styled at bottom bezel */}
                <div className="flex items-center justify-between px-2 pt-2.5">
                  <div className="flex gap-1">
                    <div className="w-8 h-1 bg-[#B8B0A0] rounded-sm"></div>
                    <div className="w-3 h-1 bg-[#B8B0A0] rounded-sm"></div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#5FB870] border border-[#52945E] shadow-inner animate-pulse"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B8B0A0]"></div>
                  </div>
                </div>

              </div>
              
              {/* Green pillar/pedestal Cylinder stand directly below computer as requested */}
              <div className="w-36 h-20 bg-gradient-to-r from-[#59AF41] to-[#76C759] rounded-b-xl border-x-4 border-b-4 border-[#3F802D] mx-auto -mt-2 shadow-lg relative z-0 flex flex-col justify-end pb-3 items-center">
                {/* 3D cylindrical base lip */}
                <div className="absolute top-0 inset-x-0 h-4 bg-[#76C759] border-b-2 border-[#3F802D] rounded-t-full opacity-60"></div>
                <div className="text-[9px] font-mono text-[#254F1A] tracking-widest leading-none font-black text-center">
                  C_STAND
                </div>
              </div>

            </motion.div>
          </div>

          {/* 4. LEFT HAND SIDE COLUMNS AND POLAROID COMPONENT */}
          <div className="absolute left-4 md:left-10 bottom-6 md:bottom-12 z-20 flex flex-col items-start gap-3">
            
            {/* Selfie Polaroid, angled slightly layout */}
            <motion.div 
              animate={{ 
                rotate: isSelfieBouncing ? [-12, -4, -14, -12] : -12,
                y: isSelfieBouncing ? [0, -10, 0] : 0
              }}
              transition={{ duration: 0.5 }}
              onClick={() => {
                setIsSelfieBouncing(true);
                setShowSelfieBubble(true);
                setTimeout(() => setIsSelfieBouncing(false), 500);
                setTimeout(() => setShowSelfieBubble(false), 3000);
              }}
              className="w-28 sm:w-36 bg-white p-2.5 pb-6 border border-zinc-200/50 shadow-xl rounded-sm cursor-pointer relative"
              style={{ originX: 0.5, originY: 0.5 }}
            >
              <div className="relative aspect-[1/1] overflow-hidden rounded bg-[#DCE6FC] border border-zinc-100 flex items-center justify-center">
                {/* Responsive Vector Portrait Artwork matching the photo showing a portrait with a blue bucket hat */}
                <div className="w-full h-full relative flex items-center justify-center pt-2">
                  {/* Backdrop */}
                  <div className="absolute inset-0 bg-[#EBF1FE] rounded-full scale-[0.8] opacity-80"></div>
                  
                  {/* Portrait features inside polaroid */}
                  <div className="relative w-16 h-20 flex flex-col justify-end items-center">
                    {/* Hair */}
                    <div className="absolute top-2 w-10 h-10 rounded-full bg-[#1A1110]"></div>
                    {/* Face */}
                    <div className="w-8 h-8 rounded-full bg-[#FCE1C8] relative z-10 flex flex-col justify-center items-center">
                      {/* Rosy Cheeks */}
                      <div className="absolute left-1 right-1 flex justify-between px-0.5">
                        <div className="w-1.5 h-1.5 bg-rose-300 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-rose-300 rounded-full"></div>
                      </div>
                      {/* Smiling Eyes */}
                      <div className="flex gap-2.5 pb-0.5">
                        <span className="text-[6px] font-black text-zinc-800 leading-none">◠</span>
                        <span className="text-[6px] font-black text-zinc-800 leading-none">◠</span>
                      </div>
                      {/* Big Mouth Smile */}
                      <div className="w-2.5 h-1 border-b-2 border-zinc-800 rounded-b-full"></div>
                    </div>

                    {/* Cute blue bucket hat on top! */}
                    <div className="absolute top-2 z-20 flex flex-col items-center">
                      <div className="w-9 h-5 bg-[#5D96EB] rounded-t-lg relative">
                        {/* Hat detail line */}
                        <div className="absolute bottom-1 inset-y-0.5 inset-x-0 border-b border-white opacity-40"></div>
                      </div>
                      <div className="w-11 h-2 bg-[#5D96EB] rounded-b-md -mt-0.5 shadow-sm"></div>
                    </div>

                    {/* Yellow jacket shirt collars */}
                    <div className="w-10 h-6 bg-[#FFAA2C] rounded-t-[12px] -mt-1 relative z-10"></div>
                  </div>
                </div>

                {/* Click me mini icon */}
                <span className="absolute bottom-1 right-1 text-zinc-300 pointer-events-none">
                  <Smile size={10} />
                </span>
              </div>

              {/* Speech bubble popup */}
              <AnimatePresence>
                {showSelfieBubble && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    className="absolute -top-12 left-0 right-0 mx-auto w-24 p-1.5 bg-zinc-900 text-[9px] text-white rounded-lg text-center font-mono leading-tight z-30"
                  >
                    That's me! 🎨
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Handwritten style cursive label underneath */}
              <div className="text-center font-mono text-[9px] text-zinc-500 font-bold mt-2.5 uppercase tracking-wider">
                Artist view
              </div>
            </motion.div>

            {/* Neon Blue circular badge with User overlay icon as shown in image bottom left */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: -15 }}
              onClick={() => {
                setIsSelfieBouncing(true);
                setTimeout(() => setIsSelfieBouncing(false), 500);
              }}
              className="h-10 w-10 flex items-center justify-center rounded-full bg-[#2E8BF7] text-white shadow-lg cursor-pointer hover:bg-[#124CAE] border-2 border-white -mt-2 ml-4 animate-bounce shrink-0"
              style={{ animationDuration: '4s' }}
            >
              <User size={18} className="text-white fill-current" />
            </motion.div>

          </div>

          {/* 5. RIGHT HAND SIDE COLUMNS AND POLAROID COMPONENT */}
          <div className="absolute right-4 md:right-10 bottom-6 md:bottom-12 z-20 flex flex-col items-end gap-3.5">
            
            {/* Polaroid dog bestie, angled slightly */}
            <motion.div 
              animate={{ 
                rotate: isDogBouncing ? [14, 4, 18, 14] : 14,
                y: isDogBouncing ? [0, -10, 0] : 0
              }}
              transition={{ duration: 0.5 }}
              onClick={() => {
                setIsDogBouncing(true);
                setShowDogBubble(true);
                setTimeout(() => setIsDogBouncing(false), 500);
                setTimeout(() => setShowDogBubble(false), 3000);
              }}
              className="w-28 sm:w-36 bg-white p-2.5 pb-6 border border-zinc-200/50 shadow-xl rounded-sm cursor-pointer relative"
              style={{ originX: 0.5, originY: 0.5 }}
            >
              <div className="relative aspect-[1/1] overflow-hidden rounded bg-[#FFA82E] border border-zinc-100 flex items-center justify-center">
                {/* CSS Styled cute white bulldog portrait illustration with soft ears & nose as shown in image */}
                <div className="relative w-16 h-16 flex flex-col justify-center items-center">
                  
                  {/* Bulldog outer head */}
                  <div className="w-14 h-12 bg-white rounded-t-[18px] rounded-b-[12px] relative shadow-sm flex flex-col items-center">
                    {/* Pink inside of floppy ears */}
                    <div className="absolute -top-1 -left-2 w-4 h-6 bg-pink-100 rounded-l-full transform -rotate-[35deg] border-t-4 border-l-4 border-white"></div>
                    <div className="absolute -top-1 -right-2 w-4 h-6 bg-pink-100 rounded-r-full transform rotate-[35deg] border-t-4 border-r-4 border-white"></div>

                    {/* Bulldog eyes */}
                    <div className="flex gap-4.5 justify-center w-full mt-3.5 px-3">
                      <div className="w-2.5 h-2.5 bg-[#4A3B32] rounded-full flex items-center justify-center relative">
                        <div className="w-1 h-1 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                      </div>
                      <div className="w-2.5 h-2.5 bg-[#4A3B32] rounded-full flex items-center justify-center relative">
                        <div className="w-1 h-1 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                      </div>
                    </div>

                    {/* Bulldog heavy folded snout muzzle */}
                    <div className="w-9 h-6 bg-[#EDEDED] rounded-xl -mt-1 relative z-10 flex flex-col items-center justify-center">
                      <div className="w-3.5 h-2 bg-zinc-800 rounded-full mt-0.5"></div>
                      {/* Bulldog line */}
                      <div className="w-0.5 h-1.5 bg-zinc-600"></div>
                      {/* Pink tongue poking out */}
                      <div className="w-3 h-2 bg-rose-400 rounded-b-xl absolute bottom-0"></div>
                    </div>
                  </div>

                  {/* Red collar check */}
                  <div className="w-10 h-2 bg-red-500 rounded-full -mt-2 z-0"></div>
                </div>

                <span className="absolute bottom-1 right-1 text-orange-200 pointer-events-none">
                  <Sparkles size={11} />
                </span>
              </div>

              {/* Speech bubble popup */}
              <AnimatePresence>
                {showDogBubble && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    className="absolute -top-12 left-0 right-0 mx-auto w-24 p-1.5 bg-zinc-900 text-[9px] text-white rounded-lg text-center font-mono leading-tight z-30"
                  >
                    Woof! Bark! 🐾
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Handwritten caption "my bestie" inside polaroid bottom footer bar */}
              <div className="text-center font-mono text-[9px] text-zinc-500 font-bold mt-2.5 uppercase tracking-wider">
                My bestie
              </div>
            </motion.div>

            {/* Red Alert warning hazard circle sticker as shown in image bottom mid right */}
            <motion.div
              whileHover={{ scale: 1.15, rotate: 15 }}
              onClick={() => {
                setIsDogBouncing(true);
                setTimeout(() => setIsDogBouncing(false), 500);
              }}
              className="h-9 w-9 flex items-center justify-center rounded-full bg-[#E12D39] text-white shadow-lg cursor-pointer hover:bg-red-700 border-2 border-white translate-x-[-24px] z-20"
            >
              <AlertTriangle size={15} className="text-white fill-current animate-pulse" />
            </motion.div>

            {/* Post-it / Sticky note blue card bottom right pinned "MY STARTER PACK" */}
            <div className="relative">
              {/* Yellow pushpin element with drop shadow */}
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-yellow-400 rounded-full border border-yellow-500 shadow-md z-30 flex items-center justify-center">
                <span className="w-1 h-1 bg-white rounded-full"></span>
              </div>

              <motion.div
                whileHover={{ scale: 1.05, rotate: 1 }}
                onClick={() => setShowPackDetails(!showPackDetails)}
                className="w-24 sm:w-28 bg-[#12B4D1] text-white p-3 pt-6 min-h-[70px] shadow-lg rounded-sm cursor-pointer relative origin-top z-10 hover:shadow-xl border-t border-cyan-300"
                style={{ transform: "rotate(-6deg)" }}
              >
                <div className="space-y-1">
                  <h4 className="font-mono text-[8px] sm:text-[9.5px] font-black text-center text-cyan-900 uppercase leading-none tracking-tight">
                    MY STARTER
                  </h4>
                  <p className="font-mono text-[8px] sm:text-[9.5px] font-black text-center text-white uppercase leading-none tracking-tight">
                    PACK
                  </p>
                </div>
              </motion.div>

              {/* Starter pack dialog tooltip toggle */}
              <AnimatePresence>
                {showPackDetails && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className="absolute right-0 bottom-full mb-3 w-48 p-3 bg-white text-zinc-800 text-xs rounded-xl shadow-xl border border-zinc-200 z-30"
                  >
                    <div className="absolute -bottom-2 right-10 w-4 h-4 bg-white transform rotate-45 border-r border-b border-zinc-200" />
                    <p className="font-mono font-bold text-[#12B4D1] text-[10px] tracking-wide mb-1 uppercase">Aryan's Pack:</p>
                    <ul className="space-y-1 text-[10px] list-disc pl-3 text-zinc-600 font-mono">
                      <li>Strong Dark Espresso ☕</li>
                      <li>Vector Illustration Lab 🖋️</li>
                      <li>Vaporwave keycaps 📟</li>
                      <li>Figma Components 🛠️</li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </motion.div>
    </div>
  );
}
