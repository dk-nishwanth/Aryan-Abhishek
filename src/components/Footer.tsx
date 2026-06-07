import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Send, Copy, Mail, Phone, ArrowUp, ArrowRight, Info, Check, ExternalLink 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { InteractiveRobotSpline } from './ui/interactive-3d-robot';

interface FooterProps {
  onOpenContact: () => void;
}

export default function Footer({ onOpenContact }: FooterProps) {
  // Input fields for the sticky note form
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientMessage, setClientMessage] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Status for Formspree submit
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Pupil cursor tracking
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const [leftPupilOffset, setLeftPupilOffset] = useState({ x: 0, y: 0 });
  const [rightPupilOffset, setRightPupilOffset] = useState({ x: 0, y: 0 });

  // Scene URL for 3D Robot provided by the user
  const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

  // Track cursor movement on screen to make the eyes follow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Update eye pupil calculations
  useEffect(() => {
    const calculateOffset = (eyeRef: React.RefObject<HTMLDivElement>) => {
      if (!eyeRef.current) return { x: 0, y: 0 };
      const rect = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const dx = mousePosition.x - eyeCenterX;
      const dy = mousePosition.y - eyeCenterY;
      const angle = Math.atan2(dy, dx);
      
      const distance = Math.min(Math.hypot(dx, dy), 120);
      const maxDistance = 6; // max px pupil offset
      const ratio = distance / 120;
      const offsetLength = ratio * maxDistance;

      return {
        x: Math.cos(angle) * offsetLength,
        y: Math.sin(angle) * offsetLength,
      };
    };

    setLeftPupilOffset(calculateOffset(leftEyeRef));
    setRightPupilOffset(calculateOffset(rightEyeRef));
  }, [mousePosition]);

  // Form submission dispatcher inside footer
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientMessage) return;
    
    setIsSubmitting(true);
    setErrorMsg('');

    // Dynamically retrieve Formspree form ID from environment variables
    const formspreeId = (import.meta as any).env?.VITE_FORMSPREE_FORM_ID || "";

    if (!formspreeId) {
      // Fallback submission flow for preview/testing
      setTimeout(() => {
        setIsSubmitting(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setClientName('');
          setClientEmail('');
          setClientMessage('');
        }, 5000);
      }, 1200);
      return;
    }

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: clientName,
          email: clientEmail,
          message: clientMessage
        })
      });

      if (response.ok) {
        setIsSubmitting(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setClientName('');
          setClientEmail('');
          setClientMessage('');
        }, 5000);
      } else {
        const errData = await response.json();
        setErrorMsg(errData.error || 'Broadcast routing failed. Please try again.');
        setIsSubmitting(false);
      }
    } catch (err) {
      setErrorMsg('Network error. Check connection or try direct email.');
      setIsSubmitting(false);
    }
  };

  // Helper to copy data
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      id="contact-hub-section" 
      className="relative bg-[#FAF8F5] text-[#1C1917] pt-20 pb-12 px-4 sm:px-6 md:px-12 border-t-2 border-stone-800 overflow-hidden select-none" 
      style={{ 
        backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px)', 
        backgroundSize: '24px 24px' 
      }}
    >
      {/* Decorative vertical binding rings on the absolute left to simulate a designer notebook binder */}
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-transparent border-r-2 border-stone-800 opacity-20 pointer-events-none hidden md:flex flex-col justify-around py-12">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="w-6 h-3.5 bg-gradient-to-r from-stone-400 to-stone-600 rounded-full border border-stone-800 -translate-x-3 shadow-sm" />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto relative z-10"
      >
        
        {/* Section title & prompt */}
        <div className="mb-10 text-center md:text-left">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#2E8BF7] uppercase block mb-1 font-bold">
            EST. ABHISHEK INTEGRATED DISPATCH
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-stone-900 tracking-tight leading-none">
            Get in Touch / Contact Hub
          </h2>
          <p className="text-xs font-mono text-stone-500 mt-2 max-w-xl">
            Tether immediate visual pathways or log project memos directly inside the creative gateway below.
          </p>
        </div>

        {/* Majestic 2-Column / 3-Column Retro College Container Box */}
        <div 
          className="relative w-full bg-[#FAF8F5] border-2 border-stone-800 rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(40,40,40,1)] flex flex-col lg:flex-row mb-16"
          style={{
            backgroundImage: `
              linear-gradient(rgba(120, 110, 90, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: '100% 28px',
          }}
        >
          {/* Notebook pink margins border lines */}
          <div className="absolute left-6 md:left-12 top-0 bottom-0 w-0.5 bg-rose-300 opacity-40 pointer-events-none z-10" />

          {/* LEFT SUB-COLUMN: Channels & Active Stickers Collage */}
          <div className="flex-1 p-6 md:p-10 lg:p-12 relative border-b-2 lg:border-b-0 lg:border-r-2 border-stone-800 flex flex-col justify-between overflow-hidden">
            
            {/* Playful elements & Stickers floating absolute */}
            {/* Googly Eyes inside left segment */}
            <div className="absolute top-8 right-6 flex flex-col items-center z-25">
              <div className="flex gap-1 p-1 bg-white border-2 border-stone-800 rounded-full shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)] scale-90">
                {/* Left Eye */}
                <div
                  ref={leftEyeRef}
                  className="w-10 h-10 bg-white rounded-full border-2 border-stone-850 flex items-center justify-center relative overflow-hidden"
                >
                  <div
                    className="w-4.5 h-4.5 bg-stone-900 rounded-full absolute"
                    style={{
                      transform: `translate(${leftPupilOffset.x}px, ${leftPupilOffset.y}px)`,
                      transition: 'transform 0.05s ease-out',
                    }}
                  >
                    <div className="w-1 h-1 bg-white rounded-full absolute top-1 left-1" />
                  </div>
                </div>
                {/* Right Eye */}
                <div
                  ref={rightEyeRef}
                  className="w-10 h-10 bg-white rounded-full border-2 border-stone-850 flex items-center justify-center relative overflow-hidden"
                >
                  <div
                    className="w-4.5 h-4.5 bg-stone-900 rounded-full absolute"
                    style={{
                      transform: `translate(${rightPupilOffset.x}px, ${rightPupilOffset.y}px)`,
                      transition: 'transform 0.05s ease-out',
                    }}
                  >
                    <div className="w-1 h-1 bg-white rounded-full absolute top-1 left-1" />
                  </div>
                </div>
              </div>
              <span className="text-[7.5px] font-mono uppercase bg-yellow-200 border border-stone-800 px-1 py-0.5 mt-1 text-stone-850 font-extrabold rounded shadow-sm">
                STAY ACTIVE
              </span>
            </div>

            {/* Ladybugs Sticker */}
            <div className="absolute top-10 left-16 flex gap-1 pointer-events-none opacity-80 scale-90">
              <div className="relative">
                <div className="flex gap-1">
                  <svg width="18" height="18" viewBox="0 0 24 24" className="rotate-12 animate-pulse text-rose-600 fill-rose-600">
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 3.12a8 8 0 0 1 5.92 5.88h-5.92zm-2 0V11H5.08A8 8 0 0 1 11 5.12zm-5.92 7.88H11v5.88A8 8 0 0 1 5.08 13zm7.92 5.88V13h5.92a8 8 0 0 1-5.92 5.88z" stroke="currentColor" strokeWidth="1" />
                    <circle cx="8" cy="9" r="1.2" fill="black" />
                    <circle cx="16" cy="9" r="1.2" fill="black" />
                    <circle cx="8" cy="15" r="1.2" fill="black" />
                    <circle cx="16" cy="15" r="1.2" fill="black" />
                  </svg>
                  <span className="text-[9px] font-mono text-stone-400 font-bold -translate-y-2">♪</span>
                </div>
              </div>
            </div>

            {/* Flaming Heart Sticker */}
            <div className="absolute bottom-[23%] right-[22%] text-center cursor-pointer pointer-events-auto hover:rotate-12 transition z-20 scale-90">
              <div className="relative inline-block animate-pulse" style={{ animationDuration: '2.5s' }}>
                <div className="absolute -top-6 inset-x-0 flex justify-center gap-0.5">
                  <span className="w-0.5 h-6 bg-amber-500 rounded-full inline-block animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                  <span className="w-1 h-8 bg-orange-500 rounded-full inline-block animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                  <span className="w-1.5 h-9 bg-red-500 rounded-full inline-block animate-bounce" style={{ animationDelay: '0s' }}></span>
                  <span className="w-1 h-8 bg-orange-500 rounded-full inline-block animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
                <svg width="34" height="30" viewBox="0 0 24 24" className="text-red-500 fill-red-500 drop-shadow-[2px_2px_0_#1c1917] relative z-20">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="#1c1917" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* Lucky 777 Diamond Green Sticker */}
            <div className="absolute bottom-6 right-6 select-none pointer-events-auto rotate-12 hover:-rotate-12 transition scale-90 z-20">
              <div className="bg-[#40A855] border-2 border-stone-800 p-1.5 text-center text-white flex flex-col items-center justify-center shadow-[3px_3px_0px_rgba(0,0,0,1)] font-mono uppercase text-[8px] w-12 h-12 rounded-xl">
                <span className="font-black text-[#FFF066] text-xs">777</span>
                <span className="text-[7px] leading-none mt-0.5 font-bold">Luck</span>
              </div>
            </div>

            {/* Rolling Dice Sticker in footer */}
            <div className="absolute bottom-5 left-16 pointer-events-auto scale-90 hidden md:flex gap-2">
              <div className="w-9 h-9 bg-white border-2 border-stone-850 rounded-lg rotate-12 shadow-[2px_2px_0_rgba(0,0,0,1)] flex flex-col justify-between p-1 hover:rotate-6 transition">
                <div className="flex justify-between">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-900" />
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-900" />
                </div>
                <div className="flex justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-900" />
                </div>
                <div className="flex justify-between">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-900" />
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-900" />
                </div>
              </div>
            </div>

            {/* Core Address / Phone / Coordinates Big Listings */}
            <div className="space-y-4 pt-16 md:pt-20 max-w-lg z-20">
              {/* Row 1: PHONE */}
              <div
                onClick={() => handleCopy('+919873286730', 'Phone')}
                className="group cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between sm:gap-4 py-2 border-b border-dashed border-stone-300 md:ml-4 ml-0 hover:bg-[#F3EFE6]/50 transition rounded-lg px-2"
              >
                <div className="flex items-center gap-1">
                  <span className="font-display font-black text-xl sm:text-2xl text-stone-900 tracking-tight group-hover:text-[#2E8BF7] transition">
                    (1) PHONE
                  </span>
                </div>
                <div className="font-mono text-stone-700 font-bold text-xs sm:text-sm tracking-wide flex items-center gap-1.5">
                  <span>+91 98-732-867-30</span>
                  <span className="opacity-40 group-hover:opacity-100 transition text-[#2E8BF7]">
                    <Copy size={11} />
                  </span>
                </div>
              </div>

              {/* Row 2: EMAIL */}
              <div
                onClick={() => handleCopy('aryan19abhishek@gmail.com', 'Email')}
                className="group cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between sm:gap-4 py-2 border-b border-dashed border-stone-300 md:ml-4 ml-0 hover:bg-[#F3EFE6]/50 transition rounded-lg px-2"
              >
                <div className="flex items-center gap-1">
                  <span className="font-display font-black text-xl sm:text-2xl text-stone-900 tracking-tight group-hover:text-[#2E8BF7] transition">
                    (2) EMAIL
                  </span>
                </div>
                <div className="font-mono text-stone-700 font-bold text-xs sm:text-sm tracking-wide flex items-center gap-1.5 lowercase">
                  <span>aryan19abhishek@gmail.com</span>
                  <span className="opacity-40 group-hover:opacity-100 transition text-[#2E8BF7]">
                    <Copy size={11} />
                  </span>
                </div>
              </div>

              {/* Row 3: LINKEDIN */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col sm:flex-row sm:items-center justify-between sm:gap-4 py-2 border-b border-dashed border-stone-300 md:ml-4 ml-0 hover:bg-[#F3EFE6]/50 transition rounded-lg px-2 cursor-pointer block"
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
                className="group flex flex-col sm:flex-row sm:items-center justify-between sm:gap-4 py-2 border-b border-dashed border-stone-300 md:ml-4 ml-0 hover:bg-[#F3EFE6]/50 transition rounded-lg px-2 cursor-pointer block"
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
                 className="group cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between sm:gap-4 py-2 md:ml-4 ml-0 hover:bg-[#F3EFE6]/50 transition rounded-lg px-2"
              >
                <div className="flex items-center gap-1">
                  <span className="font-display font-black text-xl sm:text-2xl text-stone-900 tracking-tight group-hover:text-[#2E8BF7] transition">
                    (5) REFERENCES
                  </span>
                </div>
                <div className="font-mono text-stone-700 font-bold text-xs sm:text-sm tracking-wide flex items-center gap-1.5 uppercase">
                  <span>UPON REQUEST</span>
                  <span className="opacity-40 group-hover:opacity-100 transition text-[#2E8BF7]">
                    <Copy size={11} />
                  </span>
                </div>
              </div>
            </div>

            {/* Toast success indicator absolute inside details */}
            <AnimatePresence>
              {copiedText && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-6 left-12 md:left-24 bg-[#1C1917] text-white font-mono text-[9px] px-3 py-1.5 rounded-lg flex items-center gap-1.5 z-40 border border-stone-800 shadow-md shadow-black/20"
                >
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  <span>COPIED {copiedText.toUpperCase()}!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* MIDDLE COLUMN: Whobee spline robot visualization center section */}
          <div className="flex-1 min-h-[300px] border-b-2 lg:border-b-0 lg:border-r-2 border-stone-800 relative bg-[#E1EEFA]/30 flex flex-col justify-between overflow-hidden">
            {/* Pink binder lines behind the robot frame */}
            <div className="absolute left-6 md:left-12 top-0 bottom-0 w-0.5 bg-rose-300 opacity-20 pointer-events-none" />
            
            {/* The actual Interactive Spline Viewport */}
            <div className="flex-1 w-full relative z-10 select-auto">
              <InteractiveRobotSpline 
                scene={ROBOT_SCENE_URL} 
                className="w-full h-full min-h-[380px]"
              />
            </div>
          </div>

          {/* RIGHT SUB-COLUMN: Memo Stamp Direct Contact Form */}
          <div className="w-full lg:w-[350px] bg-[#FEFDF9] p-6 md:p-8 pt-12 flex flex-col justify-between relative overflow-hidden">
            
            {/* Sticky tape indicator */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-28 h-6 bg-amber-150/40 rotate-1 border border-dashed border-amber-300 opacity-90 pointer-events-none text-[8px] font-mono text-center pt-1.5 uppercase tracking-widest text-amber-850 font-bold">
              MEMO_TAPE
            </div>

            <div className="pt-8">
              <div className="text-center pb-4 border-b border-stone-200">
                <span className="text-[8px] font-mono font-bold tracking-widest text-[#2E8BF7] uppercase block">
                  [ SEND SECURE MEMO TRANSMISSION ]
                </span>
                <h3 className="font-display font-black text-2xl text-stone-900 mt-1">
                  Leave a Note
                </h3>
              </div>

              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center flex flex-col items-center justify-center space-y-4"
                >
                  {/* Delivered stamp element */}
                  <div className="w-20 h-20 rounded-full border-4 border-dashed border-[#2E8BF7] text-[#2E8BF7] p-1 flex items-center justify-center font-black rotate-12 animate-pulse font-mono tracking-wide text-[11px]">
                    DELIVERED
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-stone-900 text-sm uppercase">Log Deposited</h4>
                    <p className="text-[9.5px] font-mono text-stone-500 mt-1.5 max-w-[200px] leading-relaxed mx-auto">
                      Tremendous! Whispers of your message are floating up nicely. Response will sync within 24 hours.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 pt-4 relative">
                  {errorMsg && (
                    <div className="p-2 text-[10px] font-mono text-rose-700 bg-rose-50 border border-rose-300 rounded-lg">
                      ⚠️ {errorMsg}
                    </div>
                  )}

                  {/* Name field */}
                  <div className="space-y-0.5">
                    <label className="block text-[8px] font-mono font-black text-stone-500 uppercase tracking-widest">
                      (A) NAME / CALLSIGN
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      disabled={isSubmitting}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Liam Singh"
                      className="w-full bg-transparent border-b-2 border-stone-300 focus:border-[#2E8BF7] outline-none font-mono py-1 text-stone-850 placeholder-stone-450 text-xs transition focus:ring-0"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-0.5">
                    <label className="block text-[8px] font-mono font-black text-stone-500 uppercase tracking-widest">
                      (B) COMMUNION EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      disabled={isSubmitting}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="client@brand.com"
                      className="w-full bg-transparent border-b-2 border-stone-300 focus:border-[#2E8BF7] outline-none font-mono py-1 text-stone-850 placeholder-stone-450 text-xs transition focus:ring-0"
                    />
                  </div>

                  {/* Message brief */}
                  <div className="space-y-0.5">
                    <label className="block text-[8px] font-mono font-black text-stone-500 uppercase tracking-widest">
                      (C) PROJECT MEMO BRIEF
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={clientMessage}
                      disabled={isSubmitting}
                      onChange={(e) => setClientMessage(e.target.value)}
                      placeholder="Briefly log details of your helmet artwork, motion loops, or physical decals..."
                      className="w-full bg-transparent border-b-2 border-stone-300 focus:border-[#2E8BF7] outline-none font-mono py-1 text-stone-850 placeholder-stone-450 text-xs transition resize-none leading-relaxed focus:ring-0"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 mt-2 bg-[#2E8BF7] hover:bg-[#12B4D1] text-white border-2 border-stone-800 rounded-xl font-mono text-[10px] uppercase tracking-wider font-bold transition duration-250 shadow-[3px_3px_0px_0px_rgba(28,25,23,1)] hover:translate-y-[-1.5px] hover:shadow-[4.5px_4.5px_0px_0px_rgba(28,25,23,1)] active:translate-y-[1px] active:shadow-[1.5px_1.5px_0px_0px_rgba(28,25,23,1)] cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-3 w-3 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        TRANSMITTING...
                      </>
                    ) : (
                      <>
                        STAMP & TRANSMIT <Send size={9} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Warning footer inside form column */}
            <div className="mt-8 pt-4 border-t border-stone-200 flex items-start gap-1.5 text-[9px] font-mono text-stone-500">
              <Info size={11} className="text-stone-400 shrink-0 mt-0.5" />
              <p className="leading-snug">
                Every dispatch is heavily bound via secured handshakes. Normal response guidelines apply.
              </p>
            </div>

          </div>

        </div>

        {/* Lower layout link grid - matches original template columns strictly */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 relative z-10 pb-12 border-b border-stone-200">
          
          {/* Column A: Logo, desc and copyright */}
          <div className="md:col-span-5 space-y-6">
            <span className="font-display text-2xl font-black tracking-tight text-stone-900 flex items-center gap-1.5">
              Aryan Abhishek<span className="text-[9px] text-[#2E8BF7] font-sans font-extrabold relative -top-1.5">TM</span>
            </span>
            <p className="text-xs font-sans text-stone-600 leading-relaxed max-w-sm">
              Visual and Motion Designer crafting dynamic physical decal artworks, dynamic brand identities, and high-fidelity layouts that command attention.
            </p>
            <div className="text-[10px] font-mono text-stone-500 font-bold uppercase">
              Phone: +91 98-732-867-30
            </div>
            <div className="text-[10px] font-mono text-stone-500 font-bold uppercase">
              © {new Date().getFullYear()} Aryan Abhishek. Built with pixel precision.
            </div>
          </div>

          <div className="hidden md:block md:col-span-1" />

          {/* Column B: Navigate navigation links list */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono text-stone-500 uppercase tracking-widest font-extrabold">Navigation</h4>
            <ul className="space-y-2 text-xs font-medium text-stone-600">
              {[
                { name: 'Home', id: 'hero' },
                { name: 'Projects', id: 'projects' },
                { name: 'Experience', id: 'experience' },
                { name: 'Skills & Tools', id: 'about' }
              ].map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })}
                    className="hover:text-[#2E8BF7] transition cursor-pointer font-bold font-mono tracking-wider uppercase text-[10px]"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column C: Social Media labels tree */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono text-[#2E8BF7] uppercase tracking-widest font-extrabold">Connect Directly</h4>
            <ul className="space-y-2 text-xs font-medium text-stone-650">
              {[
                { name: 'Behance Portfolio', url: 'https://behance.net/aryanabhishek19' },
                { name: 'Personal Website', url: 'http://www.aryanabhishek.com' },
                { name: 'Write an Email', url: 'mailto:aryan19abhishek@gmail.com' },
                { name: 'Call +91 98-732-867-30', url: 'tel:+919873286730' }
              ].map((soc) => (
                <li key={soc.name}>
                  <a href={soc.url} target="_blank" rel="noreferrer" className="hover:text-[#2E8BF7] transition flex items-center gap-1.5 text-stone-600 hover:text-[#2e8bf7] font-bold font-mono tracking-wider uppercase text-[9.5px]">
                    {soc.name} <ExternalLink size={9} className="opacity-55" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Thick footer brand banner with scroll to top trigger as seen in layout */}
        <div className="pt-8 flex items-center justify-between text-stone-500 relative z-10 flex-wrap gap-4">
          <div className="font-display text-[9vw] md:text-[8vw] font-black tracking-tighter leading-none select-none text-stone-900 opacity-5">
            ABHISHEK™
          </div>

          {/* Scroll to top */}
          <button
            onClick={scrollToTop}
            className="h-11 w-11 rounded-full border-2 border-stone-800 hover:border-[#2E8BF7] bg-white hover:bg-stone-50 flex items-center justify-center text-stone-500 hover:text-[#2E8BF7] transition-all cursor-pointer shadow-[2px_2px_0 0 rgba(40,40,40,1)] hover:translate-y-[-1px]"
            title="Scroll to Top"
          >
            <ArrowUp size={16} />
          </button>
        </div>

      </motion.div>
    </footer>
  );
}
