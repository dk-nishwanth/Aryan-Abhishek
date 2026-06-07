import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Copy, Check, Info } from 'lucide-react';

interface RetroContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; message: string }) => Promise<void>;
  isSubmitting: boolean;
  success: boolean;
  errorMsg?: string;
}

export default function RetroContactModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  success,
  errorMsg,
}: RetroContactModalProps) {
  // Input fields for the sticky note form
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientMessage, setClientMessage] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Pupil cursor tracking
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const [leftPupilOffset, setLeftPupilOffset] = useState({ x: 0, y: 0 });
  const rightPupilOffsetRef = useRef({ x: 0, y: 0 });
  const [rightPupilOffset, setRightPupilOffset] = useState({ x: 0, y: 0 });

  // Track cursor movement on modal body to make the eyes follow
  useEffect(() => {
    if (!isOpen) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isOpen]);

  // Update eye pupil calculations
  useEffect(() => {
    if (!isOpen) return;

    const calculateOffset = (eyeRef: React.RefObject<HTMLDivElement>) => {
      if (!eyeRef.current) return { x: 0, y: 0 };
      const rect = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const dx = mousePosition.x - eyeCenterX;
      const dy = mousePosition.y - eyeCenterY;
      const angle = Math.atan2(dy, dx);
      
      const distance = Math.min(Math.hypot(dx, dy), 120);
      const maxDistance = 6; // max px offset
      const ratio = distance / 120;
      const offsetLength = ratio * maxDistance;

      return {
        x: Math.cos(angle) * offsetLength,
        y: Math.sin(angle) * offsetLength,
      };
    };

    setLeftPupilOffset(calculateOffset(leftEyeRef));
    setRightPupilOffset(calculateOffset(rightEyeRef));
  }, [mousePosition, isOpen]);

  // Form submission dispatcher
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientMessage) return;
    onSubmit({
      name: clientName,
      email: clientEmail,
      message: clientMessage,
    });
  };

  // Helper to copy data
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-md select-none">
      {/* Container holding the notebook card and sticky note */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="relative w-full max-w-5xl bg-[#FAF8F5] border-2 border-stone-800 rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(40,40,40,1)] text-[#1C1917] flex flex-col lg:flex-row focus:outline-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(120, 110, 90, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '100% 28px',
        }}
      >
        {/* Header toolbar / Title */}
        <div className="absolute top-0 left-0 right-0 h-11 bg-[#F1EDE4] border-b-2 border-stone-800 px-4 flex items-center justify-between z-30 font-mono text-xs text-stone-600 font-bold">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 border border-stone-850"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-stone-850"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-stone-850"></span>
            <span className="ml-2 uppercase tracking-widest text-[9px]">CONTACT_COMPOSITION_V3.0.SYS</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-stone-200 rounded transition text-stone-700 cursor-pointer"
            title="Close Sheet"
          >
            <X size={15} />
          </button>
        </div>

        {/* Left Side: Creative Retro Collage Details Panel */}
        <div className="flex-1 p-6 sm:p-10 lg:p-14 pt-16 relative border-b-2 lg:border-b-0 lg:border-r-2 border-stone-800 flex flex-col justify-between overflow-hidden">
          {/* Notebook vertical margins (Pink binder line) */}
          <div className="absolute left-8 lg:left-12 top-0 bottom-0 w-0.5 bg-rose-300 opacity-60 pointer-events-none" />

          {/* Floaters & Stickers */}
          {/* A. Googly Eyes top-right */}
          <div className="absolute top-16 right-8 flex gap-2 items-center pointer-events-auto">
            <div className="flex flex-col items-center">
              <div className="flex gap-1.5 p-1 bg-white border-2 border-stone-800 rounded-full shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                {/* Left Eye */}
                <div
                  ref={leftEyeRef}
                  className="w-12 h-12 bg-white rounded-full border-2 border-stone-850 flex items-center justify-center relative overflow-hidden"
                >
                  <div
                    className="w-5 h-5 bg-stone-900 rounded-full absolute"
                    style={{
                      transform: `translate(${leftPupilOffset.x}px, ${leftPupilOffset.y}px)`,
                      transition: 'transform 0.05s ease-out',
                    }}
                  >
                    <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-1 left-1" />
                  </div>
                </div>
                {/* Right Eye */}
                <div
                  ref={rightEyeRef}
                  className="w-12 h-12 bg-white rounded-full border-2 border-stone-850 flex items-center justify-center relative overflow-hidden"
                >
                  <div
                    className="w-5 h-5 bg-stone-900 rounded-full absolute"
                    style={{
                      transform: `translate(${rightPupilOffset.x}px, ${rightPupilOffset.y}px)`,
                      transition: 'transform 0.05s ease-out',
                    }}
                  >
                    <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-1 left-1" />
                  </div>
                </div>
              </div>
              <span className="text-[8px] font-mono uppercase bg-yellow-250 border border-stone-800 px-1.5 py-0.5 mt-1 text-stone-700 font-bold rounded shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                STAY ACTIVE
              </span>
            </div>
          </div>

          {/* B. Ladybugs and music notes on the top-left */}
          <div className="absolute top-16 left-16 flex gap-2 pointer-events-none">
            <div className="relative">
              {/* Ladybugs Illustration */}
              <div className="flex gap-2">
                <svg width="22" height="22" viewBox="0 0 24 24" className="rotate-12 animate-pulse text-rose-600 fill-rose-600">
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 3.12a8 8 0 0 1 5.92 5.88h-5.92zm-2 0V11H5.08A8 8 0 0 1 11 5.12zm-5.92 7.88H11v5.88A8 8 0 0 1 5.08 13zm7.92 5.88V13h5.92a8 8 0 0 1-5.92 5.88z" stroke="currentColor" strokeWidth="1" />
                  <circle cx="8" cy="9" r="1.2" fill="black" />
                  <circle cx="16" cy="9" r="1.2" fill="black" />
                  <circle cx="8" cy="15" r="1.2" fill="black" />
                  <circle cx="16" cy="15" r="1.2" fill="black" />
                </svg>
                <svg width="18" height="18" viewBox="0 0 24 24" className="-rotate-12 animate-bounce hover:scale-125 transition text-rose-600 fill-rose-600">
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 3.12a8 8 0 0 1 5.92 5.88h-5.92zm-2 0V11H5.08A8 8 0 0 1 11 5.12zm-5.92 7.88H11v5.88A8 8 0 0 1 5.08 13zm7.92 5.88V13h5.92a8 8 0 0 1-5.92 5.88z" stroke="currentColor" strokeWidth="1" />
                  <circle cx="7" cy="10" r="1" fill="black" />
                  <circle cx="15" cy="15" r="1" fill="black" />
                </svg>
              </div>
              {/* Music notes rising */}
              <div className="absolute -top-7 left-3 space-x-1 flex text-stone-500 animate-pulse text-xs font-mono font-bold">
                <span>♫</span>
                <span className="scale-75 translate-y-1 block animate-bounce">♪</span>
                <span className="translate-y-2 block">♬</span>
              </div>
            </div>
          </div>

          {/* C. UFO Beaming Cow - Hover Float vector sticker in center */}
          <div className="absolute top-[35%] right-[10%] w-44 hover:scale-105 transition duration-500 origin-center pointer-events-auto flex flex-col items-center">
            <div className="animate-bounce" style={{ animationDuration: '4.5s' }}>
              {/* Saucer */}
              <svg width="100" height="42" viewBox="0 0 110 46" className="drop-shadow-[3px_4px_0px_rgba(0,0,0,1)]">
                <ellipse cx="55" cy="28" rx="50" ry="12" fill="#1F996B" stroke="#000" strokeWidth="2.5" />
                <path d="M30,24 C30,12 80,12 80,24" fill="#E3FFF2" stroke="#000" strokeWidth="2.5" />
                <ellipse cx="55" cy="24" rx="36" ry="7" fill="#2ED197" stroke="#000" strokeWidth="1.5" />
                <circle cx="20" cy="28" r="2.5" fill="#FFE555" stroke="#000" strokeWidth="1" />
                <circle cx="35" cy="30" r="2.5" fill="#FFE555" stroke="#000" strokeWidth="1" />
                <circle cx="55" cy="31" r="2.5" fill="#FFE555" stroke="#000" strokeWidth="1" />
                <circle cx="75" cy="30" r="2.5" fill="#FFE555" stroke="#000" strokeWidth="1" />
                <circle cx="90" cy="28" r="2.5" fill="#FFE555" stroke="#000" strokeWidth="1" />
              </svg>
              {/* Tractor beam */}
              <div className="w-[64px] h-[100px] bg-gradient-to-b from-[#2ED197]/50 to-transparent mx-auto clip-triangle relative flex items-center justify-center -mt-1 border-stone-800">
                {/* Floating mini pixel cow silhouette */}
                <div className="absolute top-1/3 animate-spin" style={{ animationDuration: '18s' }}>
                  <span className="text-xl inline-block drop-shadow-[1px_1px_0px_rgba(0,0,0,0.5)]">🐄</span>
                </div>
              </div>
            </div>
            {/* Tiny description */}
            <span className="text-[8px] font-mono text-stone-400 -mt-2 tracking-widest uppercase font-bold text-center">TRACTOR_BEAM.STK</span>
          </div>

          {/* D. Flaming Heart Sticker */}
          <div className="absolute bottom-[28%] right-[40%] text-center cursor-pointer pointer-events-auto hover:rotate-6 transition">
            <div className="relative inline-block animate-pulse" style={{ animationDuration: '2s' }}>
              {/* Flame vectors behind heart */}
              <div className="absolute -top-7 inset-x-0 flex justify-center gap-1">
                <span className="w-1 h-7 bg-amber-500 rounded-full inline-block animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                <span className="w-1.5 h-9 bg-orange-500 rounded-full inline-block animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                <span className="w-2 h-11 bg-red-500 rounded-full inline-block animate-bounce" style={{ animationDelay: '0s' }}></span>
                <span className="w-1.5 h-9 bg-orange-500 rounded-full inline-block animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                <span className="w-1 h-7 bg-amber-500 rounded-full inline-block animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              </div>
              {/* Heart shape */}
              <svg width="46" height="42" viewBox="0 0 24 24" className="text-red-600 fill-red-600 drop-shadow-[2.5px_2.5px_0_#1c1917] relative z-10 antialiased">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="#1c1917" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          {/* E. Green 777 Luck diamond sticker bottom-right */}
          <div className="absolute bottom-6 right-6 select-none pointer-events-auto rotate-12 hover:-rotate-12 transition group">
            <div className="bg-[#40A855] border-2 border-stone-800 p-2 text-center text-white flex flex-col items-center justify-center shadow-[3px_3px_0px_rgba(0,0,0,1)] font-mono uppercase text-[9px] w-14 h-14 rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 group-hover:left-full left-0 w-full h-full transition-all duration-700 ease-out -skew-x-12 pointer-events-none" />
              <span className="font-extrabold text-[#FFF066] drop-shadow-sm text-xs leading-none">777</span>
              <span className="tracking-tighter font-semibold text-[8px] mt-0.5 leading-none">Luck</span>
            </div>
          </div>

          {/* Main big list containing (1) PHONE (2) EMAIL (3) LINKEDIN... */}
          <div className="space-y-4 md:space-y-5 lg:space-y-6 pt-12 md:pt-16 max-w-lg z-20">
            {/* Headline */}
            <div className="pb-4">
              <span className="text-[10px] font-mono text-blue-650 font-bold uppercase tracking-widest bg-blue-100 border border-blue-200 px-2.5 py-0.5 rounded-full md:ml-4 ml-0">
                Exquisite Dispatch Hub
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-stone-900 mt-2 leading-none md:ml-4 ml-0">
                Tether Channels
              </h2>
            </div>

            {/* Row 1: PHONE */}
            <div
              onClick={() => handleCopy('+919873286730', 'Phone')}
              className="group cursor-pointer flex flex-col md:flex-row md:items-center justify-between md:gap-4 py-2 border-b border-dashed border-stone-300 md:ml-4 ml-0 hover:bg-[#F3EFE6]/50 transition rounded-lg px-2"
            >
              <div className="flex items-center gap-1">
                <span className="font-display font-black text-xl sm:text-2xl text-stone-900 tracking-tight group-hover:text-[#2E8BF7] transition">
                  (1) PHONE
                </span>
              </div>
              <div className="font-mono text-stone-700 font-bold text-xs sm:text-sm tracking-wide flex items-center gap-1.5">
                <span>+91 98-732-867-30</span>
                <span className="opacity-0 group-hover:opacity-100 transition text-[#2E8BF7]">
                  <Copy size={12} />
                </span>
              </div>
            </div>

            {/* Row 2: EMAIL */}
            <div
              onClick={() => handleCopy('aryan19abhishek@gmail.com', 'Email')}
              className="group cursor-pointer flex flex-col md:flex-row md:items-center justify-between md:gap-4 py-2 border-b border-dashed border-stone-300 md:ml-4 ml-0 hover:bg-[#F3EFE6]/50 transition rounded-lg px-2"
            >
              <div className="flex items-center gap-1">
                <span className="font-display font-black text-xl sm:text-2xl text-stone-900 tracking-tight group-hover:text-[#2E8BF7] transition">
                  (2) EMAIL
                </span>
              </div>
              <div className="font-mono text-stone-700 font-bold text-xs sm:text-sm tracking-wide flex items-center gap-1.5 lowercase">
                <span>aryan19abhishek@gmail.com</span>
                <span className="opacity-0 group-hover:opacity-100 transition text-[#2E8BF7]">
                  <Copy size={12} />
                </span>
              </div>
            </div>

            {/* Row 3: LINKEDIN */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col md:flex-row md:items-center justify-between md:gap-4 py-2 border-b border-dashed border-stone-300 md:ml-4 ml-0 hover:bg-[#F3EFE6]/50 transition rounded-lg px-2 cursor-pointer block"
            >
              <div className="flex items-center gap-1">
                <span className="font-display font-black text-xl sm:text-2xl text-stone-900 tracking-tight group-hover:text-[#2E8BF7] transition">
                  (3) LINKEDIN
                </span>
              </div>
              <div className="font-mono text-stone-700 font-bold text-xs sm:text-sm tracking-wide flex items-center gap-1.5 uppercase">
                <span>WWW.LINKEDIN.COM</span>
                <span className="text-stone-400 group-hover:translate-x-0.5 transition">→</span>
              </div>
            </a>

            {/* Row 4: INSTAGRAM */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col md:flex-row md:items-center justify-between md:gap-4 py-2 border-b border-dashed border-stone-300 md:ml-4 ml-0 hover:bg-[#F3EFE6]/50 transition rounded-lg px-2 cursor-pointer block"
            >
              <div className="flex items-center gap-1">
                <span className="font-display font-black text-xl sm:text-2xl text-stone-900 tracking-tight group-hover:text-[#2E8BF7] transition">
                  (4) INSTAGRAM
                </span>
              </div>
              <div className="font-mono text-stone-700 font-bold text-xs sm:text-sm tracking-wide flex items-center gap-1.5">
                <span>@ARYAN.ABHISHEK</span>
                <span className="text-stone-400 group-hover:translate-x-0.5 transition">→</span>
              </div>
            </a>

            {/* Row 5: REFERENCES */}
            <div
              onClick={() => handleCopy('References available upon formal request', 'References')}
              className="group cursor-pointer flex flex-col md:flex-row md:items-center justify-between md:gap-4 py-2 md:ml-4 ml-0 hover:bg-[#F3EFE6]/50 transition rounded-lg px-2"
            >
              <div className="flex items-center gap-1">
                <span className="font-display font-black text-xl sm:text-2xl text-stone-900 tracking-tight group-hover:text-[#2E8BF7] transition">
                  (5) REFERENCES
                </span>
              </div>
              <div className="font-mono text-stone-700 font-bold text-xs sm:text-sm tracking-wide flex items-center gap-1.5 uppercase">
                <span>UPON REQUEST</span>
                <span className="opacity-0 group-hover:opacity-100 transition text-[#2E8BF7]">
                  <Copy size={12} />
                </span>
              </div>
            </div>
          </div>

          {/* Copy notification banner */}
          <AnimatePresence>
            {copiedText && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-6 left-16 bg-[#1C1917] text-white font-mono text-[10px] px-3 py-1.5 rounded-lg flex items-center gap-1.5 z-40 border border-stone-800 shadow-lg"
              >
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                <span>COPIED {copiedText.toUpperCase()} TO CLIPBOARD!</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* F. Shaded Dice Illustration bottom-left corner */}
          <div className="mt-12 md:mt-24 flex gap-4 pointer-events-auto select-none md:ml-4 ml-0 pb-4">
            <div className="relative">
              {/* Die 1 */}
              <div className="w-11 h-11 bg-white border-2 border-stone-850 rounded-lg rotate-12 shadow-[2.5px_2.5px_0_rgba(0,0,0,1)] flex flex-col justify-between p-1.5 hover:rotate-6 transition duration-300 cursor-grab transform active:scale-95">
                <div className="flex justify-between">
                  <span className="w-2 h-2 rounded-full bg-stone-900"></span>
                  <span className="w-2 h-2 rounded-full bg-stone-900"></span>
                </div>
                <div className="flex justify-center">
                  <span className="w-2 h-2 rounded-full bg-stone-900"></span>
                </div>
                <div className="flex justify-between">
                  <span className="w-2 h-2 rounded-full bg-stone-900"></span>
                  <span className="w-2 h-2 rounded-full bg-stone-900"></span>
                </div>
              </div>
              {/* Die 2 */}
              <div className="absolute left-6 -top-5 w-10 h-10 bg-white border-2 border-stone-850 rounded-lg -rotate-12 shadow-[2px_2px_0_rgba(0,0,0,1)] flex flex-col justify-between p-1.5 hover:rotate-0 transition duration-300 cursor-grab transform active:scale-95">
                <div className="flex justify-start">
                  <span className="w-2 h-2 rounded-full bg-stone-900"></span>
                </div>
                <div className="flex justify-center">
                  <span className="w-2 h-2 rounded-full bg-stone-900"></span>
                </div>
                <div className="flex justify-end">
                  <span className="w-2 h-2 rounded-full bg-stone-900"></span>
                </div>
              </div>
            </div>
            <div className="text-[10px] font-mono text-stone-500 font-semibold self-end ml-4 mb-1">
              EST. ABHISHEK LABS v3
            </div>
          </div>
        </div>

        {/* Right Side: Retro Typewriter Index / Memo Card Contact Form */}
        <div className="w-full lg:w-[410px] bg-[#FEFDF9] p-6 sm:p-10 lg:p-12 pt-16 flex flex-col justify-between relative overflow-hidden">
          {/* Decorative sticky tape at the top of the form */}
          <div className="absolute top-14 left-1/2 -translate-x-1/2 w-32 h-7 bg-amber-100/65 rotate-2 border border-dashed border-amber-300 opacity-95 pointer-events-none text-[8px] font-mono text-center pt-1 uppercase tracking-widest text-amber-800 font-bold">
            STICKY_TAPE
          </div>

          <div>
            <div className="text-center pt-8 pb-6 border-b border-stone-200">
              <span className="text-[9px] font-mono font-bold tracking-widest text-[#2E8BF7] uppercase block">
                [ LETTER TRANSMISSION DISPATCH ]
              </span>
              <h3 className="font-display font-extrabold text-2xl text-stone-900 mt-1">
                Leave a Note
              </h3>
              <p className="text-[11px] font-mono text-stone-550 mt-1 max-w-xs mx-auto">
                Fill the memo slip below to tether with Aryan immediately.
              </p>
            </div>

            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center flex flex-col items-center justify-center space-y-4"
              >
                {/* Success stamp */}
                <div className="w-24 h-24 rounded-full border-4 border-dashed border-[#2E8BF7] text-[#2E8BF7] p-2 flex items-center justify-center font-black rotate-12 animate-pulse font-mono tracking-wider text-xs">
                  DELIVERED
                </div>
                <div>
                  <h4 className="font-display font-black text-stone-900 text-lg uppercase">
                    Signal Broadcasted
                  </h4>
                  <p className="text-[10px] font-mono text-stone-550 mt-2 max-w-[240px] leading-relaxed mx-auto">
                    Outstanding! Your brief message is stamped and floating up the cloud. Aryan will respond within 24 standard cycles.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 pt-6 relative">
                {errorMsg && (
                  <div className="p-3 text-[11px] font-mono text-rose-700 bg-rose-50 border border-rose-300 rounded-lg">
                    ⚠️ {errorMsg}
                  </div>
                )}

                {/* Name */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono font-black text-stone-500 uppercase tracking-widest">
                    (A) IDENTIFIER / NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    disabled={isSubmitting}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Liam Singh, etc."
                    className="w-full bg-transparent border-b-2 border-stone-300 focus:border-[#2E8BF7] outline-none font-mono py-2 text-stone-850 placeholder-stone-400 text-xs transition focus:ring-0"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono font-black text-stone-500 uppercase tracking-widest">
                    (B) DIRECT COMMUNION EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    disabled={isSubmitting}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="client@brand.com"
                    className="w-full bg-transparent border-b-2 border-stone-300 focus:border-[#2E8BF7] outline-none font-mono py-2 text-stone-850 placeholder-stone-400 text-xs transition focus:ring-0"
                  />
                </div>

                {/* Statement of Intent */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono font-black text-stone-500 uppercase tracking-widest">
                    (C) LOG / PROJECT DETAIL BRIEF
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={clientMessage}
                    disabled={isSubmitting}
                    onChange={(e) => setClientMessage(e.target.value)}
                    placeholder="Briefly log details of your helmet artwork, visual elements, or user workflows..."
                    className="w-full bg-transparent border-b-2 border-stone-300 focus:border-[#2E8BF7] outline-none font-mono py-2 text-stone-850 placeholder-stone-400 text-xs transition resize-none leading-relaxed focus:ring-0"
                  />
                </div>

                {/* Interactive Ink-Stamp Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 mt-2 bg-[#2E8BF7] hover:bg-[#12B4D1] text-white border-2 border-stone-800 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition duration-300 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(28,25,23,1)] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Broadcasting...
                    </>
                  ) : (
                    <>
                      STAMP & TRANSMIT <Send size={11} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Bottom guidelines footer info */}
          <div className="mt-12 pt-6 border-t border-stone-200 flex items-start gap-2 text-[10px] font-mono text-stone-500">
            <Info size={13} className="text-stone-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Every transmission is bound via secured client handshakes. Safe telemetry. Standard response delays apply.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
