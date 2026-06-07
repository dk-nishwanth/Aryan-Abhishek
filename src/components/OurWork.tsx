import React, { useState, useEffect } from 'react';
import { ArrowUpRight, X, ArrowRight, ShieldCheck, HeartHandshake, Globe, Trophy, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';

interface OurWorkProps {
  onSelectProject: (project: Project) => void;
}

export default function OurWork({ onSelectProject }: OurWorkProps) {
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [showExtendedGallery, setShowExtendedGallery] = useState<boolean>(false);

  // Carousel specific states
  const [activeIndex, setActiveIndex] = useState<number>(1); // Default to Step 02 (Disney Shopping) to look exactly like the user's reference image!
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Milestones count state
  const [milestones, setMilestones] = useState({ years: 0, projects: 0, clients: 0, satisfaction: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Satisfying autoplay state with automatic interaction-timer-reset
  useEffect(() => {
    if (showExtendedGallery) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 5);
    }, 4500);
    return () => clearInterval(interval);
  }, [showExtendedGallery, activeIndex]);

  useEffect(() => {
    // Elegant automatic counter increments on load
    const duration = 1500;
    const steps = 50;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setMilestones({
        years: Math.min(Math.floor((15 / steps) * step), 15),
        projects: Math.min(Math.floor((50 / steps) * step), 50),
        clients: Math.min(Math.floor((20 / steps) * step), 20),
        satisfaction: Math.min(Math.floor((100 / steps) * step), 100),
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  // Card details matcher
  const getCardConfig = (projectId: string) => {
    switch (projectId) {
      case 'behind-design':
        return {
          stepNum: 'Step 01',
          bgGradient: 'bg-gradient-to-b from-[#1E0921] to-[#0A020C]',
          borderColor: 'border-[#421A4C]/30 group-hover:border-[#9637AA]/70',
          textColor: 'text-purple-100',
          badgeStyle: 'bg-[#FFECEC] text-[#C0392B] border border-rose-300/30',
          badgeText: 'Stage 01: Concept',
          title: 'Solve Craft Silos with Graphic Stories',
          sub: 'Behind Design branding, typography & motion curves.',
          footerLeft: 'PODCAST SERIES & BRANDING',
          footerRight: '© 2022',
          glowStyle: 'shadow-[0_0_50px_rgba(110,68,255,0.15)]'
        };
      case 'disney-shopping':
        return {
          stepNum: 'Step 02',
          bgGradient: 'bg-[#FDFDFF]/95', // Pure, frosted eggshell background matching the image
          borderColor: 'border-zinc-200 group-hover:border-zinc-400',
          textColor: 'text-zinc-950',
          badgeStyle: 'bg-[#FFEAD7] text-[#D84C10] border border-[#FFD5BC]/50 font-bold',
          badgeText: 'Stage 02: Interface',
          title: 'Promise a real client result (with timeline)', // Replicating the exact title in the image!
          sub: 'Disney Shopping App interaction prototype & checkout.',
          footerLeft: 'DISNEY STORES APP',
          footerRight: '© 2021',
          glowStyle: 'shadow-[0_0_60px_rgba(255,140,80,0.25)]'
        };
      case 'artist-management':
        return {
          stepNum: 'Step 03',
          bgGradient: 'bg-gradient-to-b from-[#0A1613] to-[#030706]',
          borderColor: 'border-[#1b3b35]/40 group-hover:border-[#38d4bc]/70',
          textColor: 'text-emerald-100',
          badgeStyle: 'bg-[#EAFDF8] text-[#117A65] border border-emerald-300/30',
          badgeText: 'Stage 03: Live Tech',
          title: 'Command active event stages with live pipelines',
          sub: 'Artist management dashboard evaluation task.',
          footerLeft: 'EVENT DASHBOARD PLATFORM',
          footerRight: '© 2022',
          glowStyle: 'shadow-[0_0_50px_rgba(16,185,129,0.15)]'
        };
      case 'grace':
        return {
          stepNum: 'Step 04',
          bgGradient: 'bg-gradient-to-b from-[#1C1412] to-[#0A0706]',
          borderColor: 'border-[#3D2C28]/30 group-hover:border-[#B58D71]/60',
          textColor: 'text-amber-100/90',
          badgeStyle: 'bg-[#FDF2E9] text-[#935116] border border-orange-200/40',
          badgeText: 'Stage 04: Luxury Brand',
          title: 'Elevate luxury fashion segments with pride',
          sub: 'Grace boutique apparel system & packaging concept.',
          footerLeft: 'RAYMOND COUTURE SEGMENT',
          footerRight: '© 2021',
          glowStyle: 'shadow-[0_0_50px_rgba(243,156,18,0.12)]'
        };
      case 'wild-young':
        return {
          stepNum: 'Step 05',
          bgGradient: 'bg-gradient-to-b from-[#240516] to-[#0D0108]',
          borderColor: 'border-[#5C113B]/20 group-hover:border-[#D91475]/60',
          textColor: 'text-pink-100',
          badgeStyle: 'bg-[#FCE4D6] text-[#A93226] border border-rose-200/50',
          badgeText: 'Stage 05: Social Feed',
          title: 'Amplify young influencers with high-contrast motion',
          sub: 'Wild + Young digital marketing files & templates.',
          footerLeft: 'CREATIVE AGENCY CAMPAIGN',
          footerRight: '© 2022',
          glowStyle: 'shadow-[0_0_50px_rgba(236,72,153,0.16)]'
        };
      default:
        return {
          stepNum: 'Step 01',
          bgGradient: 'bg-zinc-900',
          borderColor: 'border-zinc-800',
          textColor: 'text-zinc-300',
          badgeStyle: 'bg-zinc-800 text-zinc-300',
          badgeText: 'Concept Stage',
          title: 'Project showcase details',
          sub: 'Visual story details and packaging.',
          footerLeft: 'PROJECT BRAND',
          footerRight: '© 2022',
          glowStyle: ''
        };
    }
  };

  // Render glowing art structures inside each card to mimic the image beautifully
  const renderProjectGraphic = (projectId: string, isActive: boolean) => {
    if (projectId === 'behind-design') {
      return (
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden h-full w-full">
          <svg className="w-[85%] h-[85%]" viewBox="0 0 200 200" fill="none">
            <defs>
              <linearGradient id="orangeSpir" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE07A" />
                <stop offset="35%" stopColor="#FF7B39" />
                <stop offset="70%" stopColor="#EA2E3F" />
                <stop offset="100%" stopColor="#7E0C30" />
              </linearGradient>
              <filter id="glowGold" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            <motion.path 
              d="M 50,165 C 35,130 165,145 150,110 C 135,75 65,85 150,55" 
              stroke="url(#orangeSpir)" 
              strokeWidth="11" 
              strokeLinecap="round" 
              filter="url(#glowGold)"
              animate={isActive ? { 
                y: [-3, 3, -3],
                rotate: [-0.5, 0.5, -0.5]
              } : {}}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.path 
              d="M 50,165 C 35,130 165,145 150,110 C 135,75 65,85 150,55" 
              stroke="#FFF4C5" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              opacity="0.6"
              animate={isActive ? { 
                y: [-3, 3, -3],
                rotate: [-0.5, 0.5, -0.5]
              } : {}}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-tr from-orange-600/10 to-transparent blur-3xl pointer-events-none" />
        </div>
      );
    }

    if (projectId === 'disney-shopping') {
      return (
        <div className="absolute inset-0 flex items-end justify-center select-none pointer-events-none overflow-hidden h-full w-full px-4">
          <svg className="w-[105%] h-[55%] pr-2 text-[#101014] relative z-20" viewBox="0 0 200 100" fill="none">
            <motion.path 
              d="M 12,78 Q 32,30 75,72 T 182,30" 
              stroke="currentColor" 
              strokeWidth="13" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              animate={isActive ? {
                d: [
                  "M 12,78 Q 32,30 75,72 T 182,30",
                  "M 12,76 Q 30,34 78,69 T 182,32",
                  "M 12,78 Q 32,30 75,72 T 182,30"
                ]
              } : {}}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.path 
              d="M 12,78 Q 32,30 75,72 T 182,30" 
              stroke="#2e8bf7" 
              strokeWidth="1" 
              strokeLinecap="round" 
              opacity="0.15"
            />
            <motion.path 
              d="M 30,85 Q 85,15 155,65" 
              stroke="currentColor" 
              strokeWidth="6" 
              strokeLinecap="round" 
              opacity="0.8"
              animate={isActive ? {
                d: [
                  "M 30,85 Q 85,15 155,65",
                  "M 30,83 Q 88,18 152,62",
                  "M 30,85 Q 85,15 155,65"
                ]
              } : {}}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-tr from-[#FF8E53]/15 via-[#FE567C]/5 to-transparent blur-3xl pointer-events-none" />
        </div>
      );
    }

    if (projectId === 'artist-management') {
      return (
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden h-full w-full">
          <div className="relative w-4/5 h-4/5 flex items-center justify-center">
            <motion.div 
              className="absolute rounded-full border border-emerald-500/10"
              style={{ width: '92%', height: '92%' }}
              animate={isActive ? { rotate: 360 } : {}}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]" />
              <div className="absolute bottom-1/2 left-0 w-1 h-1 rounded-full bg-emerald-400/40" />
            </motion.div>
            
            <motion.div 
              className="absolute rounded-full border border-emerald-400/30 flex items-center justify-center"
              style={{ width: '64%', height: '64%' }}
              animate={isActive ? { rotate: -360 } : {}}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-full h-[1px] bg-emerald-600/10" />
              <div className="h-full w-[1px] bg-emerald-600/10 absolute" />
              <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-[#10b981] shadow-[0_0_6px_#10b981]" />
            </motion.div>
            
            <div className="absolute font-mono text-[7px] md:text-[8px] text-emerald-400/50 mt-16 bg-black/45 px-2 py-0.5 rounded border border-emerald-500/10 backdrop-blur-sm">
              T-LATENCY: 4.2ms
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-emerald-500/5 blur-2xl pointer-events-none" />
          </div>
        </div>
      );
    }

    if (projectId === 'grace') {
      return (
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden h-full w-full">
          <div className="relative w-4/5 h-4/5">
            <svg className="w-full h-full text-zinc-600" viewBox="0 0 100 100" fill="none">
              <rect x="10" y="10" width="80" height="80" rx="4" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />
              <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
              
              <motion.g 
                animate={isActive ? { rotate: 45 } : {}}
                transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', repeatType: 'reverse' }}
                style={{ originX: '50px', originY: '50px' }}
              >
                <line x1="16" y1="16" x2="84" y2="84" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                <line x1="84" y1="16" x2="16" y2="84" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
              </motion.g>
            </svg>
            
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              animate={isActive ? { rotate: 360 } : {}}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              style={{ width: '56px', height: '56px' }}
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-[#d4af37] drop-shadow-[0_0_4px_#d4af37] text-xs font-semibold">
                ✦
              </div>
            </motion.div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-amber-500/5 blur-2xl pointer-events-none" />
          </div>
        </div>
      );
    }

    if (projectId === 'wild-young') {
      return (
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden h-full w-full">
          <svg className="w-[105%] h-[105%] text-rose-500" viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
            <motion.path 
              d="M -10,35 Q 25,65 50,35 T 110,65" 
              stroke="currentColor" 
              strokeWidth="3" 
              opacity="0.35"
              animate={isActive ? {
                d: [
                  "M -10,35 Q 25,65 50,35 T 110,65",
                  "M -10,42 Q 28,52 48,45 T 110,55",
                  "M -10,35 Q 25,65 50,35 T 110,65"
                ]
              } : {}}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.path 
              d="M -10,65 Q 25,25 50,65 T 110,25" 
              stroke="#ff007f" 
              strokeWidth="2.5" 
              opacity="0.4"
              animate={isActive ? {
                d: [
                  "M -10,65 Q 25,25 50,65 T 110,25",
                  "M -10,58 Q 22,35 52,55 T 110,38",
                  "M -10,65 Q 25,25 50,65 T 110,25"
                ]
              } : {}}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-pink-500/5 blur-2xl pointer-events-none" />
        </div>
      );
    }

    return null;
  };

  // Get dynamic transform horizontal spacing coordinates
  const getTranslateX = (offset: number) => {
    const isMobile = windowWidth < 768;
    const isTablet = windowWidth >= 768 && windowWidth < 1024;
    
    if (isMobile) {
      // 220px card width + 25px gap = 245px translation step
      // This places them perfectly side-by-side with zero overlap on mobile!
      return offset * 245;
    } else if (isTablet) {
      return offset * 300;
    } else {
      // Large layout
      return offset * 340;
    }
  };

  const coreProjects: Project[] = [
    {
      id: 'behind-design',
      title: 'Behind Design',
      subtitle: 'Branding, Art Direction, Motion Graphics',
      period: '2022',
      tags: ['Branding', 'Art Direction', 'Motion Graphics', 'Graphic Design'],
      description: '"Behind Design" is a branding project that aims to create a cohesive and engaging identity for a new podcast that promises to be a valuable resource for anyone interested in the world of design in India.',
      summary: 'An insightful series that fosters a supportive culture and community in the design field, specifically targeting aspiring regional designers who seek industry guidance.',
      challenges: [
        'Accessing regional design industry networks and information is notoriously difficult for Indian youth without active connects.',
        'Navigating career-specific design steps was historically siloed to online searches focusing primarily on Western markets.'
      ],
      solutions: [
        'Creating a tailored Indian design podcast to bridge the gap with highly informative long-form conversations that do not require visual strain.',
        'Curating social media visuals and slide boards targeting youth design aspirations.'
      ],
      color: 'from-[#4a154b] to-[#120514]',
      imageAccent: 'Podcast Series Identity'
    },
    {
      id: 'disney-shopping',
      title: 'Disney Shopping App',
      subtitle: 'UI/UX E-Commerce Concept',
      period: '2021',
      tags: ['UI/UX Design', 'UX Research', 'Mobile App'],
      description: 'This Project is a E-commerce Application for the existing Disney Shopping website which offers Disney official Merch.',
      summary: 'A personal concept app aligning clean categories, direct navigation, and interactive wishlist systems to make official physical Disney merchandise accessible to youth and gift-shoppers alike.',
      challenges: [
        "Disney's online store on disney.in remains largely unknown to the general public in contrast to their massive digital media products.",
        'Balancing varying buyer group needs from age 5 to young adults and parents in a combined layout.'
      ],
      solutions: [
        'Conducting UX competitor analysis against Souled Store, Archies, and Amazon to map missing features.',
        'Crafting clean product-centric grids, minimal interface cards, and intuitive onboarding screens.'
      ],
      color: 'from-[#003366] via-[#051c38] to-black',
      imageAccent: 'Disney Merch E-Comm'
    },
    {
      id: 'artist-management',
      title: 'Artist Management',
      subtitle: 'UI/UX & Web Interface (Tcules Task)',
      period: '2022',
      tags: ['UI/UX Design', 'Web Design', 'Dashboard'],
      description: 'An Event/Artist Management interface for the event organizers where the organizer can see the status of the information that they requested from each manager of the bands performing.',
      summary: 'A specialized dashboard interface built for organizers to track deliverables, bands data status, and band managers\' feedback circles synchronously.',
      challenges: [
        'Organizers struggle with scattered document approvals and status follow-ups pre-performance.',
        'Designing dense visual status pipelines that don\'t compromise screen responsiveness.'
      ],
      solutions: [
        'Creating unified status tracking columns with intuitive highlight alerts and task logs.',
        'Using cohesive, fast-loading grid elements constructed during placement evaluation.'
      ],
      color: 'from-[#1a1b2f] via-[#162a22] to-black',
      imageAccent: 'Artist Live Pipeline'
    }
  ];

  const extendedProjects: Project[] = [
    ...coreProjects,
    {
      id: 'grace',
      title: 'Grace',
      subtitle: 'Branding, Art Direction, Packaging',
      period: '2021',
      tags: ['Branding', 'Art Direction', 'Packaging'],
      description: 'Grace is a fashion branding project that focuses on luxury formal attires for females.',
      summary: 'Crafting an elegant luxury sister brand segment under the legacy Raymond heritage, focusing on female-only premium workwear and packaging details.',
      challenges: [
        'Women in metro markets face limited options for high-end formal wear within legacy male-skewed stores.',
        'Developing luxury visual packaging elements that communicate premium sister-alignment.'
      ],
      solutions: [
        'Introducing beautiful fabric bag templates, delicate tag systems, and high-quality rigid box mockups.',
        'Utilizing deep minimal tones and elegant serif-paired branding concepts.'
      ],
      color: 'from-[#a38c8c] via-[#2c2222] to-black',
      imageAccent: 'Raymond Womenswear Concept'
    },
    {
      id: 'wild-young',
      title: 'Wild + Young',
      subtitle: 'Branding, Motion Graphics, Social Media',
      period: '2022',
      tags: ['Branding', 'Motion Graphics', 'Social Media'],
      description: 'Wild + Young is an online marketing agency concept branding project that targets young influencers to manage them.',
      summary: 'Designing highly bold, vibrant and energetic brand identities, social reels, and interactive banners crafted for young trendsetting content creators.',
      challenges: [
        'Modern digital influencer agencies look overly corporate and fail to capture youth engagement.',
        'Balancing heavy-contrast neon motion layouts across different social video platforms.'
      ],
      solutions: [
        'Integrating hyper-vibrant neon palette aesthetics with customized vector graphics.',
        'Drafting engaging social layout announcements and seamless movement presets.'
      ],
      color: 'from-[#7a0f3d] via-[#450a29] to-black',
      imageAccent: 'Gen-Z Campaign Assets'
    }
  ];

  const filteredProjects = showExtendedGallery 
    ? extendedProjects.filter(p => {
        if (categoryFilter === 'All') return true;
        const filterLower = categoryFilter.toLowerCase();
        return p.tags.some(tag => {
          const tagLower = tag.toLowerCase();
          if (filterLower === 'ui/ux design') {
            return tagLower.includes('ui/ux') || tagLower.includes('interface') || tagLower.includes('layout') || tagLower.includes('web');
          }
          if (filterLower === 'motion design') {
            return tagLower.includes('motion') || tagLower.includes('animation') || tagLower.includes('video');
          }
          return tagLower.includes(filterLower);
        });
      })
    : coreProjects;

  return (
    <section id="projects" className="relative bg-[#FAF8F2] text-zinc-800 py-24 px-6 md:px-12 border-t border-zinc-200 overflow-hidden" style={{ backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto"
      >
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 mb-16 border-b border-zinc-200 pb-8">
          <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-zinc-900">
            My <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#205C9E] via-[#2e8bf7] to-[#12b4d1]">Projects</span>
          </h2>
          <span className="font-mono text-xs uppercase tracking-widest text-[#2e8bf7] font-bold opacity-90">(Projects — 05)</span>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
            {['All', 'UI/UX Design', 'Branding', 'Motion Design', 'Graphic Design'].map((cat) => {
              const isSelected = categoryFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setCategoryFilter(cat);
                    if (cat === 'All') {
                      setShowExtendedGallery(false);
                    } else {
                      setShowExtendedGallery(true);
                    }
                  }}
                  className={`text-xs font-mono px-4 py-2 rounded-full border transition-all whitespace-nowrap cursor-pointer ${
                    isSelected && (cat === 'All' ? !showExtendedGallery : showExtendedGallery)
                      ? 'bg-[#2E8BF7] text-white border-[#2E8BF7] shadow-md font-semibold'
                      : 'bg-white border-zinc-200 text-zinc-650 hover:bg-zinc-50 hover:text-zinc-900 hover:border-zinc-300'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {showExtendedGallery && (
            <button
              onClick={() => {
                setShowExtendedGallery(false);
                setCategoryFilter('All');
              }}
              className="text-xs font-mono text-zinc-550 hover:text-zinc-900 transition cursor-pointer"
            >
              Reset view
            </button>
          )}
        </div>

        {/* Master Project Layout (Preeminent 3D Stack Carousel) */}
        {!showExtendedGallery ? (
          <div>
            
            {/* The 3D Stack Viewport area */}
            <div className="relative py-12 flex flex-col items-center justify-center overflow-visible min-h-[440px] sm:min-h-[520px] md:min-h-[580px] w-full">
              
              {/* Mesh back glow for central card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-br from-[#2E8BF7]/8 via-[#12B4D1]/4 to-transparent blur-[100px] pointer-events-none -z-10" />

              {/* Deck container */}
              <div 
                className="relative w-full max-w-5xl h-[330px] sm:h-[440px] flex items-center justify-center overflow-visible" 
                style={{ perspective: '1100px', transformStyle: 'preserve-3d' }}
                id="workspace-carousel-3d-stack"
              >
                {extendedProjects.map((project, idx) => {
                  let offset = idx - activeIndex;
                  const count = extendedProjects.length;
                  
                  // Wrap-around math for continuous carousel
                  if (offset < -Math.floor(count / 2)) offset += count;
                  if (offset > Math.floor(count / 2)) offset -= count;
                  
                  const isActive = offset === 0;
                  const config = getCardConfig(project.id);
                  const translateX = getTranslateX(offset);
                  const halfWidth = windowWidth < 768 ? 110 : 162.5;

                  return (
                    <motion.div
                      key={project.id}
                      style={{
                        position: 'absolute',
                        zIndex: isActive ? 30 : Math.abs(offset) === 1 ? 20 : 10,
                        transformStyle: 'preserve-3d',
                        left: '50%',
                      }}
                      animate={{
                        x: translateX - halfWidth,
                        scale: windowWidth < 768 
                          ? (isActive ? 1.0 : 0.81) 
                          : (isActive ? 1.04 : Math.abs(offset) === 1 ? 0.82 : 0.65),
                        rotateY: windowWidth < 768 ? 0 : offset * 12,
                        z: windowWidth < 768 ? 0 : (isActive ? 60 : Math.abs(offset) === 1 ? -120 : -250),
                        opacity: windowWidth < 768
                          ? (isActive ? 1.0 : Math.abs(offset) === 1 ? 0.65 : 0)
                          : (isActive ? 1.0 : Math.abs(offset) === 1 ? 0.75 : 0),
                        filter: windowWidth < 768
                          ? 'blur(0px) brightness(1)'
                          : (isActive ? 'blur(0px) brightness(1)' : Math.abs(offset) === 1 ? 'blur(1.6px) brightness(0.85)' : 'blur(4px) brightness(0.5)'),
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 150,
                        damping: 22,
                        mass: 0.6
                      }}
                      whileHover={isActive ? { scale: 1.05, y: -4 } : {}}
                      className={`w-[220px] h-[300px] sm:w-[325px] sm:h-[430px] rounded-[24px] sm:rounded-[32px] border ${config.borderColor} ${config.bgGradient} cursor-pointer overflow-hidden p-4 sm:p-7 flex flex-col justify-between group transition-shadow duration-500 relative ${config.glowStyle}`}
                      onClick={() => {
                        if (isActive) {
                           onSelectProject(project);
                        } else {
                          setActiveIndex(idx);
                        }
                      }}
                      id={`project-card-3d-${project.id}`}
                    >
                      {/* Background noise and decorative graphic vectors */}
                      <div className="absolute inset-0 bg-cover opacity-[0.035] mix-blend-overlay pointer-events-none select-none" style={{ backgroundImage: `url('data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E')` }} />
                      
                      {/* Interactive graphic layers */}
                      {renderProjectGraphic(project.id, isActive)}

                      {/* Content Front (Properly padded) */}
                      <div className="flex flex-col h-full justify-between relative z-30">
                        
                        {/* Top Metadata Row */}
                        <div className="flex items-center justify-between">
                          <span className={`text-[7px] sm:text-[9.5px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-extrabold ${config.badgeStyle}`}>
                            {config.stepNum}
                          </span>
                          
                          <span className={`h-6 w-6 sm:h-8 sm:w-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                            isActive 
                              ? 'bg-[#2E8BF7]/10 border-[#2E8BF7]/20 hover:bg-[#2E8BF7]/20 text-[#2E8BF7]' 
                              : 'bg-zinc-100 border-zinc-200 text-zinc-500'
                          }`}>
                            <ArrowUpRight size={11} className="sm:w-3.5 sm:h-3.5" />
                          </span>
                        </div>

                        {/* Middle Text Grid */}
                        <div className="my-auto pt-6 pl-1 pr-1">
                          {/* Micro Header */}
                          <span className={`block text-[6.5px] sm:text-[9.5px] font-mono uppercase tracking-[0.2em] mb-2 font-bold ${isActive ? 'text-zinc-500' : 'text-zinc-600/60'}`}>
                            Aryan Abhishek // {project.subtitle.split(',')[0]}
                          </span>
                          
                          {/* Dominating Headline */}
                          <h4 className={`font-display text-sm sm:text-[22px] md:text-[23px] font-black tracking-tight leading-tight transition-transform duration-300 ${isActive ? 'line-clamp-none' : 'line-clamp-3'} ${
                            config.textColor
                          }`}>
                            {config.title}
                          </h4>
                          
                          {/* Subheading */}
                          {isActive && (
                            <p className="text-[9.5px] sm:text-[12.5px] font-sans text-zinc-650 mt-2.5 leading-relaxed line-clamp-2">
                              {config.sub}
                            </p>
                          )}
                        </div>

                        {/* Bottom Row */}
                        <div className={`flex justify-between items-center text-[7.5px] sm:text-[11px] font-mono tracking-widest ${isActive ? 'text-zinc-500' : 'text-zinc-500/65'} border-t pt-3 border-zinc-200/50`}>
                          <span>{config.footerLeft}</span>
                          <span>{config.footerRight}</span>
                        </div>

                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Slider interactive controls */}
              <div className="flex items-center justify-center gap-6 mt-12 relative z-30 select-none">
                
                {/* Previous trigger arrow */}
                <button
                  onClick={() => {
                    setActiveIndex((prev) => (prev - 1 + extendedProjects.length) % extendedProjects.length);
                  }}
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-650 hover:text-zinc-900 transition cursor-pointer shadow-sm"
                  title="Previous Project"
                  id="carousel-nav-prev"
                >
                  <ChevronLeft size={16} />
                </button>

                {/* Dot Bullet nodes */}
                <div className="flex items-center gap-2">
                  {extendedProjects.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setActiveIndex(idx);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === activeIndex 
                          ? 'w-6 bg-[#2E8BF7]' 
                          : 'w-1.5 bg-zinc-300 hover:bg-zinc-400'
                      }`}
                      title={`Go to slide ${idx + 1}`}
                      id={`carousel-bullet-${idx}`}
                    />
                  ))}
                </div>

                {/* Next trigger arrow */}
                <button
                  onClick={() => {
                    setActiveIndex((prev) => (prev + 1) % extendedProjects.length);
                  }}
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-650 hover:text-zinc-900 transition cursor-pointer shadow-sm"
                  title="Next Project"
                  id="carousel-nav-next"
                >
                  <ChevronRight size={16} />
                </button>

              </div>

              {/* Explore center details call to action */}
              <div className="mt-6 text-center select-none">
                <button 
                  onClick={() => onSelectProject(extendedProjects[activeIndex])}
                  className="text-xs font-mono font-bold text-[#2E8BF7] hover:text-[#12B4D1] transition flex items-center justify-center gap-1.5 cursor-pointer bg-white border border-zinc-200 py-2.5 px-6 rounded-full hover:bg-zinc-50 shadow-sm"
                >
                  Explore "{extendedProjects[activeIndex].title}" Case Study <ArrowRight size={13} />
                </button>
              </div>

            </div>

            {/* Third Row Section (Philosophy in visual card layout) */}
            <div className="bg-white rounded-[32px] p-8 md:p-12 mb-16 border border-zinc-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative overflow-hidden group shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-[#2E8BF7]/5 blur-[50px] pointer-events-none" />
              
              <div className="space-y-4 max-w-xl">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2 font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2E8BF7] animate-ping" />
                  Core Philosophy
                </span>
                <p className="font-display text-xl sm:text-2xl md:text-3xl font-medium leading-snug text-zinc-900">
                  "I handcraft visual identities and fluid motion loops with one strict objective: <span className="text-[#2e8bf7] font-semibold">create work that commands attention and stands the test of time.</span>"
                </p>
                <div className="flex items-center gap-4 pt-1 text-xs text-zinc-500 font-mono">
                  <span>Aryan Abhishek Design</span>
                  <span>•</span>
                  <span>Visual & Motion — Present</span>
                </div>
              </div>

              <div>
                <button 
                  onClick={() => setShowExtendedGallery(true)}
                  className="bg-[#2E8BF7] text-white px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide flex items-center gap-2 hover:bg-[#12B4D1] transition shadow-md shrink-0 cursor-pointer"
                >
                  See All Projects <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Extended full list view of all filterable portfolio items */
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-16">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group cursor-pointer bg-white border border-zinc-200 rounded-2xl p-4 sm:p-6 flex flex-col justify-between hover:border-[#2E8BF7]/40 transition-all duration-300 shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] sm:text-[10px] font-mono text-zinc-500 font-semibold">{project.period}</span>
                    <span className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-550 group-hover:bg-[#2E8BF7] group-hover:text-white group-hover:border-[#2e8bf7] transition-all duration-250">
                      <ArrowUpRight size={10} className="sm:w-3.5 sm:h-3.5" />
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-xs sm:text-lg text-zinc-900 mb-1.5 group-hover:text-[#2E8BF7] transition line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-zinc-600 text-[10px] sm:text-xs font-sans line-clamp-2 sm:line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mt-4">
                  {project.tags.slice(0, 2).map((t) => (
                    <span key={t} className="text-[8px] sm:text-[9px] font-mono bg-zinc-100 border border-zinc-200 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-zinc-650">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Milestone Statistics counters - exactly matches image labels */}
        <div className="border-t border-zinc-200 pt-16 mt-12">
          <div className="text-[10px] font-mono tracking-[0.25em] text-zinc-500 font-bold uppercase mb-8 font-extrabold">Agency Milestones</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: milestones.projects, label: 'Projects Completed', suffix: '+' },
              { num: milestones.clients, label: 'Clients Worldwide', suffix: '+' },
              { num: milestones.satisfaction, label: 'Customer Satisfaction', suffix: '%' },
            ].map((st, i) => (
              <div key={i} className="space-y-2 text-left border-l border-zinc-200 pl-6 py-2">
                <div className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 flex items-baseline">
                  {st.num}
                  <span className="text-[#2E8BF7] ml-0.5">{st.suffix}</span>
                </div>
                <div className="text-xs font-mono text-zinc-500 leading-tight">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </motion.div>
    </section>
  );
}
