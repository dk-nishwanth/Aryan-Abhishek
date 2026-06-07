import React, { useState, useRef, useEffect } from 'react';
import { Plus, Minus, ArrowUpRight, ShieldCheck, Sparkles, Paintbrush, Layers, Flame, Trophy, Briefcase } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { TextRotate, TextRotateRef } from './ui/text-rotate';

const dwanImages = [
  {
    url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop",
    title: "Kalamkaar Music / Raftaar",
    desc: "Crafted aesthetic graphic announcements, milestone illustrations, and promotional banners for hip-hop albums."
  },
  {
    url: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600&auto=format&fit=crop",
    title: "Trinity Gaming Media",
    desc: "Engineered ultra-engaging esports posters, stream overlay screens, and tournament visuals."
  },
  {
    url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
    title: "Represent Management Deck",
    desc: "Designed analytics-focused statistical posters, brand integration visual elements, and influencer cards."
  }
];

const boultImages = [
  {
    url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
    title: "E-Commerce Launch Reels",
    desc: "Designed product animation loops, high-impact audio spectrum visuals, and social media media reels."
  },
  {
    url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop",
    title: "Interactive Storyboarding",
    desc: "Drafted concept directions and frames to drive sleek product video commercial reels."
  }
];

const murfImages = [
  {
    url: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=600&auto=format&fit=crop",
    title: "SaaS Application Explainer Loops",
    desc: "Authored premium micro-animations demonstrating the speech synthesis AI model's parameters."
  },
  {
    url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=600&auto=format&fit=crop",
    title: "Modern Web Page Layouts",
    desc: "Configured corporate website pages with sophisticated grid alignments and crisp vector decals."
  }
];

const exambazaarImages = [
  {
    url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop",
    title: "Ad Campaign Visual Assets",
    desc: "Drafted high-converting search/social display banners, course banners, and visual layouts."
  },
  {
    url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop",
    title: "Educational Content Graphics",
    desc: "Created complex infographic diagrams, vectors, and reference layouts for examination dashboards."
  }
];

interface MiniItemProps {
  index: number;
  image: string;
  title: string;
  onInView: (index: number, inView: boolean) => void;
  key?: string | number;
}

function MiniPortfolioItem({ index, image, title, onInView }: MiniItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    margin: "0px -30% 0px -30%",
  });

  useEffect(() => {
    if (isInView) {
      onInView(index, isInView);
    }
  }, [isInView, index, onInView]);

  return (
    <div
      ref={ref}
      className="shrink-0 w-[240px] h-32 snap-center rounded-xl overflow-hidden border-2 border-stone-800 bg-stone-100 relative shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-transform duration-200"
    >
      <img
        src={image}
        alt={title}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950 via-stone-900/45 to-transparent p-2">
        <p className="text-[9px] font-mono font-bold text-white uppercase tracking-wider truncate">
          {title}
        </p>
      </div>
    </div>
  );
}

export default function ServicesAccordion() {
  const [activeId, setActiveId] = useState<string>('re');
  const [localActiveIdx, setLocalActiveIdx] = useState<number>(0);
  const localTextRotateRef = useRef<TextRotateRef>(null);
  const textRotateRef = useRef<TextRotateRef>(null);

  // Reset local interactive sub-index when active ID changes
  useEffect(() => {
    setLocalActiveIdx(0);
    localTextRotateRef.current?.jumpTo(0);
  }, [activeId]);

  // Interactive helmet visual customization states (for Royal Enfield) using loading page colors
  const [helmetColor, setHelmetColor] = useState<string>('#2E8BF7');
  const [decalStyle, setDecalStyle] = useState<string>('Minimal Stripe');
  const [interiorFabric, setInteriorFabric] = useState<string>('Perforated Leather');

  // Interactive fintech card layouts (for Zaave) using loading page screen gradients
  const [fintechCardGradient, setFintechCardGradient] = useState<string>('from-[#205C9E] via-[#2E8BF7] to-[#12B4D1]');
  const [marketingTagline, setMarketingTagline] = useState<string>('Transact Slick');

  const experiences = [
    {
      id: 're',
      number: '01.',
      role: 'Assistant Manager - Design (Helmets)',
      company: 'Royal Enfield',
      period: 'Aug 2023 - Present',
      location: 'Gurugram, India • On-site',
      description: "Handled all Visual aspects of Helmets made by Royal Enfield including Decal Artworks and Graphics to go over the Helmet's Interiors, Fabric, and Shell Selection.",
      tags: ['Decal Artworks', 'Graphics Layouts', 'Interiors & Fabric', 'Shell Selection', 'Helmets Design']
    },
    {
      id: 'zaave',
      number: '02.',
      role: 'UI/UX & Motion Designer',
      company: 'Zaave',
      period: 'Jan 2023 - July 2023',
      location: 'Remote',
      description: "Creating Visuals for a Fintech startup. Illustrations for Marketing and Website/App. Growing Social Media presence.",
      tags: ['Fintech UI/UX', 'Marketing Illustrations', 'Website/App Visuals', 'Social Media Growth']
    },
    {
      id: 'dwan',
      number: '03.',
      role: 'Visual/Motion Designer',
      company: 'Dwan Media',
      period: 'April, 2021 - Jan 2023',
      location: 'Remote',
      description: "Worked as a multi-faceted designer for a digital Content & Marketing agency. Spearheaded: (1) Kalamkaar Music/Raftaar: crafting engagement and announcement posts for music releases and milestones; (2) Represent Management: creating statistic infographics, events, brand related motion graphics, and posters; (3) Trinity Gaming: working on social media engagement posts and contest announcements.",
      tags: ['Social Content', 'Kalamkaar Music / Raftaar', 'Represent Management', 'Trinity Gaming']
    },
    {
      id: 'boult',
      number: '04.',
      role: 'Motion Design Intern',
      company: 'Boult Audio',
      period: 'June, 2022 - July 2022',
      location: 'Gurugram, India • On-site',
      description: "Helping animate visuals into animations for Social Media and E-commerce. Helping in storyboarding and editing of product videos. Edited videos for social media.",
      tags: ['Social Motion', 'E-Commerce Reels', 'Storyboarding', 'Video Editing']
    },
    {
      id: 'murf',
      number: '05.',
      role: 'Motion/UI Designer',
      company: 'Murf.ai',
      period: 'December, 2020 - May, 2021',
      location: 'Remote',
      description: "Worked on Motion Graphics explaining different features of the website's application. Created Layouts for the webpages of the murf.ai website. Made Banners and Social Media Posts for the same.",
      tags: ['Motion Graphics', 'Webpage Layouts', 'murf.ai website', 'Social Media Banners']
    },
    {
      id: 'exambazaar',
      number: '06.',
      role: 'Graphic Design Intern',
      company: 'Exambazaar',
      period: 'December, 2020 - February, 2021',
      location: 'Remote',
      description: "Graphic Design Intern creating digital layouts, educational assets, social media infographics, and visual campaign elements.",
      tags: ['Graphic layouts', 'Campaign Assets', 'Visual Assets']
    }
  ];

  const activeCompanyImages = 
    activeId === 'dwan' ? dwanImages :
    activeId === 'boult' ? boultImages :
    activeId === 'murf' ? murfImages :
    activeId === 'exambazaar' ? exambazaarImages : [];

  const handleLocalInView = (index: number, inView: boolean) => {
    if (inView) {
      setLocalActiveIdx(index);
      localTextRotateRef.current?.jumpTo(index);
    }
  };

  return (
    <section id="experience" className="relative bg-[#FAF8F2] text-zinc-800 py-24 px-6 md:px-12 border-t border-zinc-200 border-b border-zinc-200" style={{ backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto"
      >
        {/* Section title & Header Text Rotator */}
        <div className="mb-4 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 mb-2">
            Work <br className="sm:hidden" /><span className="bg-clip-text text-transparent bg-gradient-to-r from-[#205C9E] via-[#2E8BF7] to-[#12B4D1]">Experience</span>
          </h2>
          
          <div className="flex items-center gap-2 font-mono text-[9px] text-[#2E8BF7] font-bold bg-[#2E8BF7]/10 px-3.5 py-1.5 border border-[#2E8BF7]/20 rounded-full w-fit">
            <span className="text-zinc-500 uppercase tracking-wide">ROLE DECK:</span>
            <TextRotate
              ref={textRotateRef}
              texts={experiences.map(e => e.company.toUpperCase())}
              mainClassName="inline-flex text-[#2E8BF7] uppercase tracking-wider font-extrabold font-mono"
              splitLevelClassName="overflow-hidden"
              staggerFrom={"first"}
              animatePresenceMode="wait"
              loop={true}
              auto={false}
              staggerDuration={0.01}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ type: "spring", damping: 18, stiffness: 220 }}
              onNext={(idx) => {
                const nextExp = experiences[idx];
                if (nextExp) {
                  setActiveId(nextExp.id);
                }
              }}
            />
          </div>
        </div>

        {/* Section Meta Info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-zinc-200 pb-12 mb-16 text-zinc-500">
          <span className="font-mono text-xs uppercase tracking-widest text-[#2E8BF7] font-bold">(Ex — 02)</span>
          <p className="font-sans text-xl md:text-2xl text-zinc-750 max-w-xl font-medium leading-normal">
            A design journey rooted in premium aesthetics, meticulous detail, and functional beauty.
          </p>
        </div>

        {/* Accordion List + Live Panel Design Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Accordion controls (Left 7 Columns) */}
          <div className="lg:col-span-7 space-y-4">
            {experiences.map((exp) => {
              const isOpen = activeId === exp.id;
              const itemImages = 
                exp.id === 'dwan' ? dwanImages :
                exp.id === 'boult' ? boultImages :
                exp.id === 'murf' ? murfImages :
                exp.id === 'exambazaar' ? exambazaarImages : [];

              return (
                <div 
                  key={exp.id} 
                  className={`border-b border-zinc-200 pb-8 pt-6 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                >
                  <button
                    onClick={() => {
                      const nextId = isOpen ? '' : exp.id;
                      setActiveId(nextId);
                      if (nextId) {
                        const idx = experiences.findIndex(e => e.id === nextId);
                        if (idx !== -1 && textRotateRef.current) {
                          textRotateRef.current.jumpTo(idx);
                        }
                      }
                    }}
                    className="w-full flex justify-between items-center text-left py-4 focus:outline-none cursor-pointer"
                  >
                    <div className="flex items-start space-x-4 sm:space-x-6">
                      <span className="font-mono text-xs text-zinc-400 w-6 sm:w-8 mt-1.5">{exp.number}</span>
                      <div>
                        <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 tracking-tight leading-snug group-hover:text-[#2E8BF7] transition-colors duration-200">
                          {exp.role}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2 text-xs font-mono text-zinc-500">
                          <span className="text-[#2E8BF7] font-bold uppercase">{exp.company}</span>
                          <span>•</span>
                          <span>{exp.period}</span>
                          <span className="hidden sm:inline">•</span>
                          <span className="text-zinc-400 hidden sm:inline">{exp.location}</span>
                        </div>
                      </div>
                    </div>
                    <span className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 text-zinc-600 transition-all duration-200 shrink-0 shadow-sm">
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden pl-10 sm:pl-14"
                      >
                        {/* Period & Location Pill for ultra small viewports */}
                        <div className="flex sm:hidden text-[10px] font-mono text-zinc-400 mb-2 uppercase tracking-wide">
                          📍 {exp.location}
                        </div>

                        <p className="text-zinc-650 font-sans text-sm sm:text-md leading-relaxed max-w-xl mb-6">
                          {exp.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-2">
                          {exp.tags.map((tag) => (
                            <span 
                              key={tag}
                              className="text-[10px] sm:text-xs font-mono text-zinc-650 bg-white border border-zinc-200 rounded-full px-3.5 py-1.5 transition-colors duration-200 hover:border-zinc-400 hover:text-zinc-900 cursor-default shadow-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* ======================================================== */}
                        {/* EXCLUSIVE MOBILE HIGH-FIDELITY INTERACTIVE PANELS       */}
                        {/* ======================================================== */}
                        
                        {/* 1. Mobile Helmet Customizer Panel (Royal Enfield) */}
                        {exp.id === 're' && (
                          <div className="block lg:hidden mt-6 bg-[#FCFBF7] border-2 border-stone-850 rounded-2xl p-5 shadow-[4px_4px_0_rgba(28,25,23,1)] relative overflow-hidden">
                            <span className="absolute -right-4 -top-4 w-12 h-12 bg-zinc-900/5 rotate-45 transform pointer-events-none" />
                            <div className="flex items-center justify-between border-b border-zinc-200 pb-3 mb-4">
                              <div className="flex items-center gap-1.5">
                                <Paintbrush size={12} className="text-[#2E8BF7]" />
                                <span className="text-[9px] font-mono tracking-wider text-[#2E8BF7] font-extrabold uppercase">HELMET DESIGN SECUTION</span>
                              </div>
                              <span className="text-[8px] font-mono text-zinc-500 font-extrabold px-1.5 py-0.5 bg-zinc-200/50 rounded">M-RENDER v1</span>
                            </div>

                            <div className="flex flex-col items-center justify-center py-2">
                              <div className="relative w-36 h-36 bg-white border border-stone-200 rounded-full flex flex-col items-center justify-center p-4 shadow-[inset_0_2px_6px_rgba(0,0,0,0.03)] transition-all">
                                <svg className="w-24 h-24 text-zinc-850 transition-all duration-300" viewBox="0 0 100 100" fill="none">
                                  {/* Helmet outer shell */}
                                  <path 
                                    d="M15,50 C15,20 85,20 85,50 C85,60 80,75 50,85 C20,75 15,60 15,50 Z" 
                                    fill={helmetColor} 
                                    className="transition-all duration-300"
                                    stroke="#1c1917" 
                                    strokeWidth="3.5"
                                  />
                                  {/* Custom decal stripe overlay based on selection */}
                                  {decalStyle === 'Minimal Stripe' && (
                                    <path d="M50,22 C45,28 45,68 50,83 M53,22 C48,28 48,68 53,83" stroke="#2E8BF7" strokeWidth="2.5" />
                                  )}
                                  {decalStyle === 'Racing Wings' && (
                                    <>
                                      <path d="M22,35 C35,42 42,50 50,48" stroke="#ffffff" strokeWidth="3" />
                                      <path d="M78,35 C65,42 58,50 50,48" stroke="#ffffff" strokeWidth="3" />
                                    </>
                                  )}
                                  {decalStyle === 'Modern Stealth' && (
                                    <path d="M15,50 C30,55 70,55 85,50" stroke="#12B4D1" strokeWidth="4" strokeDasharray="3 3" />
                                  )}
                                  {/* Visor shield gloss */}
                                  <path d="M25,40 C35,32 65,32 75,40 C75,52 65,58 50,58 C35,58 25,52 25,40 Z" fill="rgba(255,255,255,0.25)" stroke="#1c1917" strokeWidth="1.5" />
                                  <path d="M30,38 Q50,48 70,38" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                                </svg>
                                <p className="text-[7.5px] font-mono text-zinc-500 mt-2 font-bold uppercase">{decalStyle} • {interiorFabric}</p>
                              </div>
                            </div>

                            <div className="space-y-3.5 mt-3 pt-3.5 border-t border-zinc-200">
                              <div>
                                <span className="block text-[7.5px] font-mono uppercase tracking-wider text-zinc-400 mb-1 font-bold">Pick Colorway</span>
                                <div className="flex space-x-2">
                                  {['#1E3A8A', '#0FA958', '#2E8BF7', '#FFA82E', '#12B4D1'].map((color) => (
                                    <button
                                      key={color}
                                      onClick={() => setHelmetColor(color)}
                                      className={`h-6 w-6 rounded-full border ${helmetColor === color ? 'border-[#2E8BF7] scale-110 shadow-md ring-2 ring-white' : 'border-zinc-300'} cursor-pointer transition-transform duration-100`}
                                      style={{ backgroundColor: color }}
                                    />
                                  ))}
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-2 mt-2">
                                <div>
                                  <label className="block text-[7.5px] font-mono uppercase tracking-wider text-zinc-400 mb-1 font-bold">Decal Graphic</label>
                                  <select 
                                    value={decalStyle}
                                    onChange={(e) => setDecalStyle(e.target.value)}
                                    className="bg-white border-2 border-stone-850 text-stone-900 rounded-lg px-2 py-1.5 text-[9px] w-full focus:outline-none focus:border-[#2E8BF7] font-semibold"
                                  >
                                    <option value="Minimal Stripe justify-between">Minimal Stripe</option>
                                    <option value="Racing Wings">Racing Bold</option>
                                    <option value="Modern Stealth">Stealth Series</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-[7.5px] font-mono uppercase tracking-wider text-zinc-400 mb-1 font-bold">Interior Fabric</label>
                                  <select 
                                    value={interiorFabric}
                                    onChange={(e) => setInteriorFabric(e.target.value)}
                                    className="bg-white border-2 border-stone-850 text-stone-900 rounded-lg px-2 py-1.5 text-[9px] w-full focus:outline-none focus:border-[#2E8BF7] font-semibold"
                                  >
                                    <option value="Perforated Leather">Leather</option>
                                    <option value="Brushed Velvet">Velvet</option>
                                    <option value="Sweat-Wicking Poly">Poly Fibre</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 2. Mobile fintech ad unit customizer (Zaave) */}
                        {exp.id === 'zaave' && (
                          <div className="block lg:hidden mt-6 bg-[#FCFBF7] border-2 border-stone-850 rounded-2xl p-5 shadow-[4px_4px_0_rgba(28,25,23,1)] relative overflow-hidden">
                            <span className="absolute -right-4 -top-4 w-12 h-12 bg-violet-900/5 rotate-45 transform pointer-events-none" />
                            <div className="flex items-center justify-between border-b border-zinc-200 pb-3 mb-4">
                              <div className="flex items-center gap-1.5">
                                <Layers size={12} className="text-violet-600" />
                                <span className="text-[9px] font-mono tracking-wider text-violet-600 font-extrabold uppercase">Live Interactive Ad Demo</span>
                              </div>
                              <span className="text-[8px] font-mono text-zinc-500 font-extrabold px-1.5 py-0.5 bg-zinc-200/50 rounded">FINTECH AD</span>
                            </div>

                            <div className="flex items-center justify-center py-2 mb-3">
                              <div className={`w-full max-w-[280px] h-32 bg-gradient-to-tr ${fintechCardGradient} rounded-xl p-4 shadow-lg text-white flex flex-col justify-between border border-white/10 relative overflow-hidden transition-all duration-300`}>
                                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
                                
                                <div className="flex justify-between items-start">
                                  <span className="font-mono text-[8px] tracking-widest uppercase opacity-75 font-semibold">ZAAVE GOLD</span>
                                  <div className="w-6 h-4 bg-yellow-400/20 rounded border border-yellow-400/30"></div>
                                </div>

                                <p className="font-display text-base font-bold tracking-tight leading-tight mt-1 truncate">
                                  {marketingTagline}
                                </p>

                                <div className="flex justify-between items-baseline text-[7px] font-mono text-zinc-200">
                                  <span>CARD v1.02</span>
                                  <span>FINTECH SECURED</span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3.5 pt-3.5 border-t border-zinc-200">
                              <div>
                                <span className="block text-[7.5px] font-mono uppercase tracking-wider text-zinc-400 mb-1 font-bold">Pick Card Palette</span>
                                <div className="flex space-x-2">
                                  {[
                                    { grad: 'from-[#1A365D] via-[#2E8BF7] to-[#12B4D1]', label: 'Cosmic Blue' },
                                    { grad: 'from-[#2E8BF7] via-[#4BA4FF] to-[#DCEEFF]', label: 'Giant Hello' },
                                    { grad: 'from-[#59AF41] to-[#76C759]', label: 'Green Stand' },
                                    { grad: 'from-[#12B4D1] to-zinc-900', label: 'Dark Edition' }
                                  ].map((item) => (
                                    <button
                                      key={item.label}
                                      onClick={() => setFintechCardGradient(item.grad)}
                                      className={`h-6 w-6 rounded-lg border ${fintechCardGradient === item.grad ? 'border-[#2E8BF7] scale-110 shadow-md ring-2 ring-white' : 'border-zinc-300'} cursor-pointer transform transition-transform`}
                                      style={{ backgroundImage: `linear-gradient(to bottom right, ${item.grad.includes('via-') ? '#2E8BF7, #12B4D1' : item.grad.replace('from-', '').replace('to-', '')})` }}
                                      title={item.label}
                                    />
                                  ))}
                                </div>
                              </div>

                              <div>
                                <label className="block text-[7.5px] font-mono tracking-wide uppercase text-zinc-400 mb-1 font-extrabold">Active Display Slogan</label>
                                <input 
                                  type="text" 
                                  value={marketingTagline}
                                  onChange={(e) => setMarketingTagline(e.target.value)}
                                  maxLength={18}
                                  className="w-full bg-white border-2 border-stone-850 text-stone-900 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#2E8BF7] font-semibold"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 3. Mobile Journey Track Carousel (Dwan, Boult, Murf, Exambazaar) */}
                        {itemImages.length > 0 && (
                          <div className="block lg:hidden mt-6 bg-[#FCFBF7] border-2 border-stone-850 rounded-2xl p-4 shadow-[4px_4px_0_rgba(28,25,23,1)] relative overflow-hidden">
                            <div className="flex items-center justify-between border-b border-zinc-200 pb-3 mb-3">
                              <div className="flex items-center gap-1.5">
                                <Briefcase size={12} className="text-[#2E8BF7]" />
                                <span className="text-[9px] font-mono tracking-wider text-[#2E8BF7] font-extrabold uppercase">JOURNEY TRACKER</span>
                              </div>
                              <span className="text-[8px] font-mono text-zinc-500 font-extrabold uppercase">{exp.company}</span>
                            </div>

                            <div className="bg-stone-50 border border-zinc-200 rounded-xl p-3 mb-4">
                              <span className="text-[7px] font-mono uppercase tracking-widest text-[#2E8BF7] font-bold block">
                                [ SELECTED INITIATIVE / CASE ]
                              </span>
                              <div className="h-6 mt-0.5 flex items-center">
                                <span className="text-xs font-display font-black text-stone-900 uppercase">
                                  {itemImages[localActiveIdx]?.title || "Case visual outputs"}
                                </span>
                              </div>
                              <p className="text-[10px] font-sans text-zinc-650 leading-relaxed font-semibold mt-1">
                                {itemImages[localActiveIdx]?.desc}
                              </p>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-[7.5px] font-mono uppercase tracking-wider text-zinc-500 font-bold">PORTFOLIO TRACK PIECES</span>
                                <span className="text-[7.5px] text-[#2E8BF7] font-mono font-black animate-pulse uppercase tracking-wider">SWIPE IMAGE →</span>
                              </div>
                              <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-none scroll-smooth">
                                {itemImages.map((img, index) => (
                                  <MiniPortfolioItem
                                    key={img.url}
                                    index={index}
                                    image={img.url}
                                    title={img.title}
                                    onInView={handleLocalInView}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Live Sandbox Display (Right 5 Columns) - HIDDEN ON MOBILE FOR PRISTINE DIRECT INLINE FLOW */}
          <div className="hidden lg:flex lg:flex-col lg:col-span-5">
            <div className="sticky top-28 bg-white border border-zinc-200 rounded-[32px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] relative overflow-hidden min-h-[480px] flex flex-col justify-between">
              
              {/* Background ambient shade */}
              <div className="absolute inset-0 z-0 pointer-events-none opacity-5 bg-radial-gradient from-[#2E8BF7]/10 via-transparent" />

              {/* Royal Enfield customizer - Show helmet rendering simulation */}
              {activeId === 're' && (
                <div className="space-y-6 relative z-10 w-full">
                  <div className="flex items-center justify-between border-b border-zinc-150 pb-4">
                    <div className="flex items-center gap-2">
                      <Paintbrush size={16} className="text-[#2E8BF7]" />
                      <span className="text-xs font-mono tracking-widest text-[#2E8BF7] uppercase font-bold">HELMET DESIGN LAB</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-450">Layout Rendering</span>
                  </div>

                  {/* Interactive Helmet Graphic Mockup */}
                  <div className="flex justify-center items-center py-6">
                    <div className="relative w-48 h-48 bg-[#FAF8F2] border border-zinc-200 rounded-full flex flex-col items-center justify-center p-6 shadow-[inset_0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300">
                      {/* Stylized geometric representation of a professional premium helmet shell with decal stripes */}
                      <svg className="w-32 h-32 text-zinc-850 transition-all duration-500" viewBox="0 0 100 100" fill="none">
                        {/* Helmet outer shell */}
                        <path 
                          d="M15,50 C15,20 85,20 85,50 C85,60 80,75 50,85 C20,75 15,60 15,50 Z" 
                          fill={helmetColor} 
                          className="transition-all duration-300"
                          stroke="#1a1a1a" 
                          strokeWidth="3.5"
                        />
                        {/* Custom decal stripe overlay based on selection */}
                        {decalStyle === 'Minimal Stripe' && (
                          <path d="M50,22 C45,28 45,68 50,83 M53,22 C48,28 48,68 53,83" stroke="#2E8BF7" strokeWidth="2.5" />
                        )}
                        {decalStyle === 'Racing Wings' && (
                          <>
                            <path d="M22,35 C35,42 42,50 50,48" stroke="#ffffff" strokeWidth="3" />
                            <path d="M78,35 C65,42 58,50 50,48" stroke="#ffffff" strokeWidth="3" />
                          </>
                        )}
                        {decalStyle === 'Modern Stealth' && (
                          <path d="M15,50 C30,55 70,55 85,50" stroke="#12B4D1" strokeWidth="4" strokeDasharray="3 3" />
                        )}
                        {/* Visor shield gloss */}
                        <path d="M25,40 C35,32 65,32 75,40 C75,52 65,58 50,58 C35,58 25,52 25,40 Z" fill="rgba(255,255,255,0.25)" stroke="#222" strokeWidth="1.5" />
                        <path d="M30,38 Q50,48 70,38" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                      </svg>
                      
                      <div className="text-center mt-3 select-none">
                        <span className="text-[10px] font-mono uppercase font-black tracking-widest text-zinc-800">ROYAL ENFIELD ELITE</span>
                        <p className="text-[8px] font-mono text-zinc-500 mt-0.5">{decalStyle} / {interiorFabric}</p>
                      </div>
                    </div>
                  </div>

                  {/* Helmet Customizer control panels */}
                  <div className="space-y-3 pt-2 bg-[#FAF8F2] p-4 rounded-2xl border border-zinc-200 shadow-sm">
                    <div>
                      <label className="block text-[8px] font-mono uppercase tracking-wider text-zinc-500 mb-1 font-bold">Pick Colorway</label>
                      <div className="flex space-x-1.5">
                        {['#1E3A8A', '#0FA958', '#2E8BF7', '#FFA82E', '#12B4D1'].map((color) => (
                          <button
                            key={color}
                            onClick={() => setHelmetColor(color)}
                            className={`h-5 w-5 rounded-full border ${helmetColor === color ? 'border-[#2E8BF7] scale-110 shadow-md ring-2 ring-white' : 'border-zinc-300'} cursor-pointer`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div>
                        <label className="block text-[8px] font-mono uppercase tracking-wider text-zinc-500 mb-1 font-bold">Decal Graphic</label>
                        <select 
                          value={decalStyle}
                          onChange={(e) => setDecalStyle(e.target.value)}
                          className="bg-white border border-zinc-250 text-zinc-850 rounded-lg px-2 py-1.5 text-[10px] w-full focus:outline-none focus:border-[#2E8BF7]/40 shadow-sm"
                        >
                          <option value="Minimal Stripe" className="bg-white">Minimal Stripe (Blue)</option>
                          <option value="Racing Wings" className="bg-white">Racing Bold (White)</option>
                          <option value="Modern Stealth" className="bg-white">Stealth Series</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[8px] font-mono uppercase tracking-wider text-zinc-500 mb-1 font-bold">Interior Material</label>
                        <select 
                          value={interiorFabric}
                          onChange={(e) => setInteriorFabric(e.target.value)}
                          className="bg-white border border-zinc-250 text-zinc-850 rounded-lg px-2 py-1.5 text-[10px] w-full focus:outline-none focus:border-[#2E8BF7]/40 shadow-sm"
                        >
                          <option value="Perforated Leather" className="bg-white">Perforated Leather</option>
                          <option value="Brushed Velvet" className="bg-white">Brushed Velvet</option>
                          <option value="Sweat-Wicking Poly" className="bg-white">Sweat-Wicking Poly</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Zaave Fintech customization rendering */}
              {activeId === 'zaave' && (
                <div className="space-y-6 relative z-10 w-full">
                  <div className="flex items-center justify-between border-b border-zinc-150 pb-4">
                    <div className="flex items-center gap-2">
                      <Layers size={16} className="text-violet-600" />
                      <span className="text-xs font-mono tracking-widest text-violet-600 uppercase font-bold">ZAAVE INTERACTIVE AD</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 font-semibold">Slick UI & Animation</span>
                  </div>

                  {/* Interactive card layout */}
                  <div className="flex items-center justify-center py-6">
                    <div className={`w-64 h-36 bg-gradient-to-tr ${fintechCardGradient} rounded-2xl p-5 shadow-2xl text-white flex flex-col justify-between transition-all duration-300 relative overflow-hidden border border-white/10 group`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
                      
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-[9px] tracking-widest uppercase opacity-75 font-semibold">ZAAVE GOLD</span>
                        <div className="w-7 h-5 bg-yellow-400/20 rounded border border-yellow-400/30"></div>
                      </div>

                      <p className="font-display text-lg font-bold tracking-tight leading-tight mt-1.5 text-white">
                        {marketingTagline}
                      </p>

                      <div className="flex justify-between items-baseline text-[7px] font-mono text-zinc-150 mt-2">
                        <span>CARD v1.02</span>
                        <span>FINTECH PARTNER</span>
                      </div>
                    </div>
                  </div>

                  {/* Customization controls */}
                  <div className="space-y-3 pt-2 bg-[#FAF8F2] p-4 rounded-xl border border-zinc-200 shadow-sm">
                    <div>
                      <span className="block text-[8px] font-mono uppercase tracking-wider text-zinc-500 mb-1 font-bold">Pick Palette</span>
                      <div className="flex space-x-1.5">
                        {[
                          { grad: 'from-[#1A365D] via-[#2E8BF7] to-[#12B4D1]', label: 'Cosmic Blue' },
                          { grad: 'from-[#2E8BF7] via-[#4BA4FF] to-[#DCEEFF]', label: 'Giant Hello' },
                          { grad: 'from-[#59AF41] to-[#76C759]', label: 'C_Stand' },
                          { grad: 'from-[#12B4D1] to-zinc-900', label: 'Starter Pack' }
                        ].map((item) => (
                          <button
                            key={item.label}
                            onClick={() => setFintechCardGradient(exp => item.grad)}
                            className={`h-5 w-5 rounded-lg border ${fintechCardGradient === item.grad ? 'border-[#2E8BF7] scale-115 font-bold shadow-md ring-1 ring-white' : 'border-zinc-300'}`}
                            style={{ backgroundImage: `linear-gradient(to bottom right, ${item.grad.includes('via-') ? '#2E8BF7, #12B4D1' : item.grad.replace('from-', '').replace('to-', '')})` }}
                            title={item.label}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-[8px] font-mono uppercase tracking-wider text-zinc-500 mb-1 font-bold">Display Ad Slogan</label>
                      <input 
                        type="text" 
                        value={marketingTagline}
                        onChange={(e) => setMarketingTagline(e.target.value)}
                        maxLength={18}
                        className="w-full bg-white border border-zinc-250 text-zinc-800 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#2E8BF7]/40 shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* General dynamic experience slider when non-visual/other items are selected */}
              {activeId !== 're' && activeId !== 'zaave' && activeId !== '' && (
                <div className="space-y-5 relative z-10 w-full">
                  <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} className="text-[#2E8BF7]" />
                      <span className="text-xs font-mono tracking-widest text-[#2E8BF7] uppercase font-bold">JOURNEY DISPLAY TRACK</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">
                      {experiences.find(e => e.id === activeId)?.company}
                    </span>
                  </div>

                  {/* Rotator container display */}
                  <div className="bg-[#FAF8F2] border border-zinc-200 rounded-2xl p-4 min-h-[148px] flex flex-col justify-between shadow-[inset_0_1px_4px_rgba(0,0,0,0.02)]">
                    <div>
                      <span className="text-[8px] font-mono uppercase tracking-widest text-[#2E8BF7] font-extrabold block">
                        [ SELECTED INITIATIVE / BRIEF ]
                      </span>
                      <div className="h-10 mt-1 flex items-center">
                        <TextRotate
                          ref={localTextRotateRef}
                          texts={activeCompanyImages.map(img => img.title)}
                          mainClassName="text-sm font-display font-black text-stone-900 uppercase tracking-tight"
                          splitLevelClassName="overflow-hidden"
                          staggerFrom={"first"}
                          animatePresenceMode="wait"
                          loop={true}
                          auto={false}
                          staggerDuration={0.01}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ type: "spring", duration: 0.4 }}
                        />
                      </div>
                    </div>

                    <p className="text-[11px] font-sans text-zinc-650 leading-relaxed font-semibold mt-2 min-h-[44px]">
                      {activeCompanyImages[localActiveIdx]?.desc || "Visual layouts & campaign assets"}
                    </p>
                  </div>

                  {/* Horizontal visual slider */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-mono uppercase tracking-wider text-zinc-500 font-bold">PORTFOLIO TRACK PIECES</span>
                      <span className="text-[8.5px] font-mono text-zinc-400 font-extrabold animate-pulse">SWIPE / SCROLL →</span>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none scroll-smooth">
                      {activeCompanyImages.map((img, index) => (
                        <MiniPortfolioItem
                          key={img.url}
                          index={index}
                          image={img.url}
                          title={img.title}
                          onInView={handleLocalInView}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Additional context footer link */}
                  <div className="bg-[#FAF8F2] border border-zinc-250 p-3.5 rounded-2xl text-[10.5px] text-zinc-500 leading-relaxed font-mono shadow-sm">
                    💡 <strong className="text-zinc-800">SCROLL THE IMAGE CAROUSEL</strong> above to auto-rotate key milestones and details.
                  </div>
                </div>
              )}

              {/* General static fallback when no service accordion is selected */}
              {activeId === '' && (
                <div className="h-full flex flex-col justify-center items-center text-center space-y-4 py-12">
                  <div className="h-16 w-16 rounded-full bg-[#2E8BF7]/5 border border-[#2E8BF7]/25 flex items-center justify-center text-[#2E8BF7] animate-pulse">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-md text-zinc-800">Operational Alignment</h4>
                    <p className="text-zinc-500 text-xs mt-1 max-w-xs leading-normal font-sans">
                      Expand any career timeline item on the left to activate visual schematic designs.
                    </p>
                  </div>
                </div>
              )}

              {/* Status footer inside card */}
              <div className="mt-6 pt-4 border-t border-zinc-200 flex items-center justify-between text-[11px] font-mono text-zinc-400 font-extrabold pb-1">
                <span>VER v4.41 • ABHISHEK ACTIVE</span>
                <span>SECURED CORE</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
