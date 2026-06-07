import React, { useState, useEffect } from 'react';
import { ArrowUpRight, MessageSquare, Mail, Phone, Send, X, Shield, CheckCircle2, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onOpenContact: () => void;
}

export default function Header({ onOpenContact }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
    { name: 'Skills', id: 'about' }
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 flex items-center justify-between transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#FAF8F2]/90 backdrop-blur-sm border-b border-zinc-200 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)]' 
          : 'bg-transparent py-5'
      }`}>
        {/* Brand logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className={`font-display text-xl font-bold tracking-tight flex items-center gap-1 transition-colors duration-200 ${
            isScrolled ? 'text-zinc-950' : 'text-zinc-850'
          }`}>
            Aryan Abhishek<span className={`text-[10px] align-super font-sans font-normal relative -top-2 transition-colors duration-200 ${
              isScrolled ? 'text-zinc-500' : 'text-zinc-650'
            }`}>TM</span>
          </span>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.id)}
              className={`transition-colors duration-200 relative group py-1 ${
                isScrolled ? 'text-zinc-700 hover:text-[#2E8BF7]' : 'text-zinc-750 hover:text-zinc-950'
              }`}
            >
              {item.name}
              <span className={`absolute bottom-0 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full bg-[#2E8BF7]`}></span>
            </button>
          ))}
        </nav>

        {/* Side Action / Hamburger */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onOpenContact}
            className={`hidden sm:flex text-sm font-bold tracking-wide border-b pb-0.5 transition-all duration-200 items-center gap-1 group ${
              isScrolled 
                ? 'text-zinc-900 border-zinc-905 hover:text-[#2E8BF7] hover:border-[#2E8BF7]' 
                : 'text-zinc-850 border-zinc-850 hover:text-zinc-950 hover:border-[#2E8BF7]'
            }`}
          >
            Get Connected
            <ArrowUpRight size={14} className={`transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 text-zinc-500 group-hover:text-[#2E8BF7]`} />
          </button>

          {/* Hamburger trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden flex items-center justify-center p-2 rounded-full border transition-all ${
              isScrolled 
                ? 'bg-zinc-100 border-zinc-200 text-zinc-800 hover:text-zinc-950 hover:bg-zinc-200 shadow-sm' 
                : 'bg-white border-zinc-200 text-zinc-750 hover:text-zinc-950 hover:bg-zinc-50 shadow-sm'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Slide menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-sm h-full bg-[#FAF8F2] border-l border-zinc-200 p-8 pt-28 flex flex-col justify-between text-zinc-800 shadow-2xl"
            >
              <div className="space-y-8">
                <span className="block text-[10px] font-mono tracking-widest text-[#2E8BF7] uppercase font-extrabold">NAVIGATION</span>
                <nav className="flex flex-col space-y-5">
                  {navItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.id)}
                      className="text-left text-2xl font-display font-medium text-zinc-800 hover:text-[#2E8BF7] transition-colors duration-200 flex items-center justify-between group"
                    >
                      <span>{item.name}</span>
                      <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all text-[#2E8BF7]" />
                    </button>
                  ))}
                </nav>
              </div>

              <div className="space-y-6 pt-6 border-t border-zinc-200">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenContact();
                  }}
                  className="w-full py-4 rounded-xl bg-[#2E8BF7] hover:bg-[#12b4d1] text-white font-semibold text-sm tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  Get Connected <ArrowUpRight size={14} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
