import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, ShieldCheck, Sparkles, Check, Play, Square, Volume2, MoveRight, Sliders, Eye, RefreshCw, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';

interface ProjectDetailsPageProps {
  project: Project;
  onBack: () => void;
  onOpenContact: () => void;
}

export default function ProjectDetailsPage({ project, onBack, onOpenContact }: ProjectDetailsPageProps) {
  // Common states
  const [copiedLink, setCopiedLink] = useState(false);

  // 1. Royal Enfield Customizer States
  const [helmetColor, setHelmetColor] = useState<string>('#131318');
  const [decalStyle, setDecalStyle] = useState<string>('Minimal Stripe');
  const [visorTint, setVisorTint] = useState<string>('Iridescent');
  const [interiorFabric, setInteriorFabric] = useState<string>('Perforated Leather');

  // 2. Zaave Fintech States
  const [fintechCardGradient, setFintechCardGradient] = useState<string>('from-blue-600 to-indigo-900');
  const [marketingTagline, setMarketingTagline] = useState<string>('Fast Transactions');
  const [isAnimating, setIsAnimating] = useState(false);
  const [transactionType, setTransactionType] = useState('Instant Credit');

  // 3. Kalamkaar / Raftaar States
  const [posterTheme, setPosterTheme] = useState<string>('Blood Crimson');
  const [fontSize, setFontSize] = useState<string>('text-5xl');
  const [trackerValue, setTrackerValue] = useState(78); // Millions of streams

  // 4. Boult Audio Storyboard States
  const [currentKeyframe, setCurrentKeyframe] = useState<number>(0);
  const [isPlayingAd, setIsPlayingAd] = useState<boolean>(false);

  // 5. Murf.ai AI Voice Wave States
  const [inputText, setInputText] = useState<string>('Experience high fidelity neural voice parameters');
  const [voiceVolume, setVoiceVolume] = useState<number>(85);
  const [isGeneratingWave, setIsGeneratingWave] = useState(false);
  const [waveSpeed, setWaveSpeed] = useState<string>('normal');

  // 6. Represent & Trinity Gaming States
  const [statMetric, setStatMetric] = useState<string>('Registrations');
  const [customGoal, setCustomGoal] = useState<number>(250);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [project.id]);

  // Boult Ad frame animation timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingAd) {
      interval = setInterval(() => {
        setCurrentKeyframe((prev) => (prev + 1) % 4);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isPlayingAd]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#E1EEFA]/35 text-zinc-900 selection:bg-[#2E8BF7] selection:text-white antialiased">
      
      {/* Detail header top-rail bar */}
      <div className="fixed top-0 left-0 w-full z-40 bg-[#E1EEFA]/95 backdrop-blur-md border-b border-zinc-200 py-4 px-6 md:px-12 flex items-center justify-between text-zinc-900 shadow-sm">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500 hover:text-[#2E8BF7] transition cursor-pointer font-bold"
        >
          <ArrowLeft size={14} className="transform group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#2E8BF7] animate-pulse"></span>
          <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-650 font-bold">Project Workspace: {project.title}</span>
        </div>

        <button
          onClick={onOpenContact}
          className="text-xs font-semibold text-white bg-[#2E8BF7] hover:bg-[#12B4D1] px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer shadow-md"
        >
          Initiate Project Brief
        </button>
      </div>

      <div className="pt-24 max-w-7xl mx-auto px-6 md:px-12 pb-24">
        
        {/* Intro Meta Headers */}
        <div className="mb-12 mt-6">
          <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-mono text-zinc-500">
            <span className="text-[#2E8BF7] font-bold uppercase">{project.period}</span>
            <span>•</span>
            <span className="bg-[#2E8BF7]/10 text-[#2E8BF7] border border-[#2E8BF7]/20 rounded-full px-2.5 py-0.5 font-semibold">Case Study</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-zinc-950 mt-1 mb-4 leading-none">
            {project.title}
          </h1>
          <p className="font-sans text-xl sm:text-2xl text-zinc-700 max-w-3xl font-medium leading-relaxed">
            {project.subtitle}
          </p>
        </div>

        {/* Big Graphic Cover Panel */}
        <div className={`relative w-full rounded-[32px] overflow-hidden bg-gradient-to-br ${project.color} border border-zinc-200 aspect-video md:aspect-[2.39/1] flex flex-col justify-between p-8 md:p-12 shadow-md mb-16 group`}>
          {/* Subtle noise grid overlay */}
          <div className="absolute inset-0 bg-cover mix-blend-overlay opacity-10 pointer-events-none" style={{ backgroundImage: `url('data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E')` }}></div>

          <div className="absolute top-8 right-8 flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-xs text-white backdrop-blur-md pointer-events-none">
            <Sparkles size={12} className="text-[#E5FE40] animate-spin" style={{ animationDuration: '6s' }} />
            <span className="font-mono text-[9px] uppercase tracking-wider">DESIGN STUDIO LAB</span>
          </div>

          {/* Centered Decorative Abstract Visual Graphic */}
          <div className="my-auto flex items-center justify-center select-none pointer-events-none">
            <div className="text-center">
              <span className="text-[11vw] md:text-[8vw] font-display font-black tracking-tighter text-white/5 leading-none block">
                {project.id.toUpperCase().replace('-', ' ')}
              </span>
              {project.imageAccent && (
                <span className="font-mono text-xs text-white/40 tracking-[0.3em] uppercase block -mt-4">{project.imageAccent}</span>
              )}
            </div>
          </div>

          <div className="flex justify-between items-end text-xs text-zinc-400 font-mono relative z-10 w-full mt-auto">
            <span>METRIC: STABLE v2.10</span>
            <span>© ARYAN ABHISHEK • {new Date().getFullYear()}</span>
          </div>
        </div>

        {/* Content Structure Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
          
          {/* Left Metadata list column (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-zinc-200 rounded-[24px] p-8 space-y-6 shadow-sm">
            <h3 className="font-display font-bold text-lg text-zinc-950 border-b border-zinc-100 pb-4">Project Parameters</h3>
            
            <div>
              <span className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-1">Time Period</span>
              <p className="text-sm font-sans font-semibold text-zinc-800">{project.period}</p>
            </div>

            <div>
              <span className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-1">Target Roles & Creative Spheres</span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-mono text-zinc-700 bg-[#2E8BF7]/5 border border-[#2E8BF7]/10 px-3 py-1 rounded-full font-semibold">{tag}</span>
                ))}
              </div>
            </div>

            <div>
              <span className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-1">Structural Alignment</span>
              <p className="text-sm font-sans text-zinc-600 leading-relaxed">
                High-fidelity asset formatting tailored for multi-channel distributions and hardware prints.
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-100">
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-between text-xs font-mono text-[#2E8BF7] hover:text-[#12B4D1] hover:underline cursor-pointer bg-transparent border-none"
              >
                <span>{copiedLink ? 'Copied Share Link!' : 'Copy Reference URL'}</span>
                <ArrowRight size={14} className="transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Summary and Brief (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
                The Brief & Artistic Vision
              </h2>
              <p className="font-sans text-lg text-zinc-700 leading-relaxed font-normal">
                {project.description}
              </p>
              <p className="font-sans text-lg text-zinc-700 leading-relaxed font-normal">
                {project.summary}
              </p>
            </div>

            {/* Direct Side-by-side Challenges and Resolution Cards */}
            {project.challenges && project.challenges.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-zinc-200">
                <div className="bg-[#2E8BF7]/5 border border-[#2E8BF7]/10 p-6 rounded-2xl space-y-3 shadow-sm">
                  <span className="text-[10px] font-mono tracking-widest text-[#2E8BF7] uppercase font-bold flex items-center gap-2">
                    <ShieldCheck size={14} /> Critical Challenge
                  </span>
                  <ul className="space-y-2 text-sm text-zinc-650 font-medium">
                    {project.challenges.map((ch, idx) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <span className="text-[#2E8BF7] font-bold shrink-0">•</span>
                        <span>{ch}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#fbfcfa] border border-emerald-100 p-6 rounded-2xl space-y-3 shadow-sm">
                  <span className="text-[10px] font-mono tracking-widest text-emerald-700 uppercase font-bold flex items-center gap-2">
                    <Sparkles size={14} /> Our Design Resolution
                  </span>
                  <ul className="space-y-2 text-sm text-zinc-750 font-medium">
                    {project.solutions.map((sol, idx) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <span className="text-emerald-650 font-bold shrink-0">✓</span>
                        <span>{sol}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Custom Rich Case Study Documentation Panel */}
        <div className="mb-16 space-y-12 border-t border-zinc-200/65 pt-16">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono tracking-widest text-[#2E8BF7] font-bold uppercase">CASE STUDY DEEP-DIVE</span>
            <h2 className="font-display text-3xl sm:text-4xl text-zinc-950 font-bold tracking-tight">Complete Documentation</h2>
          </div>

          {project.id === 'behind-design' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Problem Statement Card */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-red-700 bg-red-50 px-3.5 py-1 w-fit rounded-full border border-red-200/50">
                  <span>PROBLEM STATEMENT</span>
                </div>
                <h3 className="font-display font-bold text-xl text-zinc-900 leading-snug">The Indian Design Information Gap</h3>
                <p className="text-sm font-sans text-zinc-650 leading-relaxed">
                  When looking into design as an option after High-School, it was extremely difficult to look up region-specific context because of a lack of direct industry connects. India's career route is relatively unpopular compared to ubiquitous options like engineering. Most online information focuses on Western markets (like the US).
                </p>
                <p className="text-xs text-zinc-500 font-sans italic border-l-2 border-[#2E8BF7] pl-3">
                  "Designers and aspiring designers in India have to scour the Internet for immense periods to find relevant, region-specific guidance."
                </p>
              </div>

              {/* Why a Podcast? Card */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-3.5 py-1 w-fit rounded-full border border-indigo-200/50">
                  <span>WHY A PODCAST?</span>
                </div>
                <h3 className="font-display font-bold text-xl text-zinc-900 leading-snug">Spoken Portals & High Accessibility</h3>
                <p className="text-sm font-sans text-zinc-650 leading-relaxed">
                  Unlike video streams or readable tutorials, podcast formats allow users to learn without screen fatigue—ideal on walks, transit, or daily routines. They provide longer-form regional storytelling suitable for diving deep into complex career routes.
                </p>
                <div className="bg-[#E1EEFA]/30 p-4 rounded-xl text-xs space-y-1.5 border border-zinc-200/40">
                  <div className="font-bold text-xs text-zinc-850">India's Podcast Market Growth:</div>
                  <p className="text-zinc-650 leading-relaxed">
                    Third-largest listener base globally behind only the US and China, projected to rise past 17.61 million active listeners. From 4 million in 2016 to an estimated 90 million in 2022.
                  </p>
                </div>
              </div>

              {/* Core Philosophy, Mission, Vision Bento Row */}
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-[#120514] to-[#250a29] text-white rounded-2xl p-6 space-y-3 shadow-md">
                  <span className="text-[10px] font-mono text-purple-350 font-bold uppercase tracking-wider block">01 / PHILOSOPHY</span>
                  <p className="text-sm font-sans font-medium text-purple-100 leading-relaxed">
                    Create a supportive culture and active community of helpfulness and design awareness across regional borders, from aspiring designers to veterans.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-[#0c1324] to-[#121c33] text-white rounded-2xl p-6 space-y-3 shadow-md">
                  <span className="text-[10px] font-mono text-blue-350 font-bold uppercase tracking-wider block">02 / MISSION</span>
                  <p className="text-sm font-sans font-medium text-blue-100 leading-relaxed">
                    Aspire to nurture and grow a creative cohort, delivering the direct geographical value and industry insights that clarify Indian creative avenues.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-[#081f21] to-[#0e3538] text-white rounded-2xl p-6 space-y-3 shadow-md">
                  <span className="text-[10px] font-mono text-teal-350 font-bold uppercase tracking-wider block">03 / VISION</span>
                  <p className="text-sm font-sans font-medium text-teal-100 leading-relaxed">
                    Proffering conversational value of such high calibre, practical utility, and guidance that listeners find a real-world boost in their livelihoods.
                  </p>
                </div>
              </div>

              {/* Target Audience Profiling */}
              <div className="md:col-span-2 bg-[#FAF8F2] border border-zinc-200 rounded-3xl p-8 space-y-6">
                <h3 className="font-display font-extrabold text-2xl text-zinc-900">Target Audience Profile & Dynamics</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-1 bg-white p-4.5 rounded-xl border border-zinc-200">
                    <span className="text-[9px] font-mono text-zinc-400 block uppercase">Age Demographics</span>
                    <span className="text-sm font-bold text-zinc-800">17–24 Age Group</span>
                    <p className="text-[11px] text-zinc-500 font-medium">Aspiring creatives seeking career routes pre and post High-School.</p>
                  </div>

                  <div className="space-y-1 bg-white p-4.5 rounded-xl border border-zinc-200">
                    <span className="text-[9px] font-mono text-zinc-400 block uppercase">Employment Status</span>
                    <span className="text-sm font-bold text-zinc-800">Unemployed, Employees</span>
                    <p className="text-[11px] text-zinc-500 font-medium font-sans">Varying levels of self-employed freelancers or students wanting to break in.</p>
                  </div>

                  <div className="space-y-1 bg-white p-4.5 rounded-xl border border-zinc-200">
                    <span className="text-[9px] font-mono text-zinc-400 block uppercase">Social Isolation</span>
                    <span className="text-sm font-bold text-zinc-800">Lacking Local Advice</span>
                    <p className="text-[11px] text-zinc-500 font-medium">Lacks physical networks, placing sole reliance on digital forums.</p>
                  </div>

                  <div className="space-y-1 bg-white p-4.5 rounded-xl border border-zinc-200">
                    <span className="text-[9px] font-mono text-zinc-400 block uppercase">Hopes & Obstacles</span>
                    <span className="text-sm font-bold text-zinc-800">Skill Monetization Hub</span>
                    <p className="text-[11px] text-zinc-500 font-medium font-sans">Conquering financial insecurity and the lack of guidance step-by-step.</p>
                  </div>
                </div>

                <div className="border-t border-zinc-200 pt-5 mt-4">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-2">Core Content Needs & Requests:</span>
                  <div className="flex flex-wrap gap-2">
                    {['New market trends', 'Useful industry tools', 'Upgrading design skills', 'Educational case studies', 'Career monetization tips', 'Client onboarding guidance'].map((item) => (
                      <span key={item} className="text-xs bg-white text-zinc-700 px-3 py-1.5 rounded-lg border border-zinc-200 font-semibold text-zinc-650">
                        ✦ {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {project.id === 'disney-shopping' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Product Context Card */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[#D84C10] bg-[#FFEAD7] px-3.5 py-1 w-fit rounded-full border border-[#FFD5BC]">
                  <span>DISNEY DIVISION MAPPING</span>
                </div>
                <h3 className="font-display font-bold text-xl text-zinc-900 leading-snug">The E-commerce Opportunity</h3>
                <p className="text-sm font-sans text-zinc-650 leading-relaxed">
                  The Walt Disney Company divides into two master entities: **Disney Media & Entertainment Distribution** (with platforms like Disney+ Hotstar) and **Disney Parks, Experiences, and Products**. While Disney has physical store products and a website segment in India (disney.in), it is mostly unknown to general buyers.
                </p>
                <p className="text-xs text-zinc-650 font-sans italic border-l-2 border-[#D84C10] pl-3">
                  This conceptual mobile shopping app delivers the magic directly to fans, bypassing the scattered offline shops or complicated website paths.
                </p>
              </div>

              {/* Competitor Landscape */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-3.5 py-1 w-fit rounded-full border border-blue-200">
                  <span>COMPETITOR DYNAMICS</span>
                </div>
                <h3 className="font-display font-bold text-xl text-zinc-900 leading-snug">Sizing Up the Merch Market</h3>
                <p className="text-sm font-sans text-zinc-650 leading-relaxed">
                  Competitors are broad because Disney commodities range from small accessories and toys to high-end apparel and collectables. Key competitors analyzed:
                </p>
                <div className="grid grid-cols-2 gap-3 mt-2 text-xs">
                  <div className="bg-zinc-50 p-2.5 rounded-lg border border-zinc-150">
                    <span className="font-bold text-zinc-800 block">1. The Souled Store</span>
                    <span className="text-zinc-550">Casual licensed pop culture apparel specialists.</span>
                  </div>
                  <div className="bg-zinc-50 p-2.5 rounded-lg border border-zinc-150">
                    <span className="font-bold text-zinc-800 block">2. Archies Shop</span>
                    <span className="text-zinc-550">Traditional gift, greeting, and souvenir giant.</span>
                  </div>
                  <div className="bg-zinc-50 p-2.5 rounded-lg border border-zinc-150">
                    <span className="font-bold text-zinc-800 block">3. Amazon India</span>
                    <span className="text-zinc-550">Massive general inventory but lacks themed flow.</span>
                  </div>
                  <div className="bg-zinc-50 p-2.5 rounded-lg border border-zinc-150">
                    <span className="font-bold text-zinc-800 block">4. Offline Retail</span>
                    <span className="text-zinc-550">Hard to browse in smaller towns; limited catalogs.</span>
                  </div>
                </div>
              </div>

              {/* Customer clusters */}
              <div className="md:col-span-2 bg-[#FAF8F2] border border-[#FFD5BC]/60 rounded-3xl p-8 space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="font-display font-extrabold text-2xl text-zinc-900">Target Buyer Persona Analysis</h3>
                    <p className="text-sm text-zinc-550">Defining demographic segments and active needs for Disney themed merchandise.</p>
                  </div>
                  <span className="text-xs font-mono py-1 px-3 bg-white border border-zinc-200 rounded-full font-bold">AGE INDEX: 5 to 25 Years</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-5 rounded-xl border border-zinc-200 space-y-2">
                    <div className="font-bold text-zinc-850">1. Instant Speed React</div>
                    <p className="text-xs text-zinc-650 leading-relaxed font-sans">
                      Youth prioritize extremely fast-loading product views, secure payment gateways, and lightning-fast checkout steps.
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-zinc-200 space-y-2">
                    <div className="font-bold text-zinc-850">2. Simple Hierarchy</div>
                    <p className="text-xs text-zinc-650 leading-relaxed font-sans">
                      Clear visual categories mapped out by theme (Mickey, Marvel, Pixar) make navigation intuitive for any age.
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-zinc-200 space-y-2">
                    <div className="font-bold text-zinc-850">3. Gift Finding Filters</div>
                    <p className="text-xs text-zinc-650 leading-relaxed font-sans">
                      Wishlist persistence and price filter options cater heavily to gift-shoppers looking for clean themed products.
                    </p>
                  </div>
                </div>
              </div>

              {/* User Experience screens breakdown */}
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white border border-zinc-200 rounded-2xl p-6 space-y-3">
                  <span className="text-[10px] font-mono text-orange-600 font-bold block bg-orange-100/30 px-2 py-0.5 w-fit rounded">STAGE 1</span>
                  <h4 className="font-bold text-zinc-900">Onboarding, Login & Signup</h4>
                  <p className="text-xs text-zinc-650 leading-relaxed font-sans">
                    Greeting screens incorporate high-contrast character cards, creating a beautiful and nostalgic welcome sequence.
                  </p>
                </div>

                <div className="bg-white border border-zinc-200 rounded-2xl p-6 space-y-3">
                  <span className="text-[10px] font-mono text-blue-600 font-bold block bg-blue-100/30 px-2 py-0.5 w-fit rounded">STAGE 2</span>
                  <h4 className="font-bold text-zinc-900">Easy Home Pages Structure</h4>
                  <p className="text-xs text-zinc-650 leading-relaxed font-sans">
                    Clean buttons and high-fidelity banner spacing maximize screen real estate, ensuring features scale perfectly on any device.
                  </p>
                </div>

                <div className="bg-white border border-zinc-200 rounded-2xl p-6 space-y-3">
                  <span className="text-[10px] font-mono text-teal-600 font-bold block bg-teal-100/30 px-2 py-0.5 w-fit rounded">STAGE 3</span>
                  <h4 className="font-bold text-zinc-900">Categorized Product Pages</h4>
                  <p className="text-xs text-zinc-650 leading-relaxed font-sans">
                    A highly simplistic layout focusing on clear prices, product badges, and a direct checkout toggle suited for immediate purchase.
                  </p>
                </div>
              </div>
            </div>
          )}

          {project.id === 'artist-management' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Placement Task description */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-3.5 py-1 w-fit rounded-full border border-emerald-100">
                  <span>PLACEMENT PORTFOLIO TASK</span>
                </div>
                <h3 className="font-display font-bold text-xl text-zinc-900 leading-snug">Evaluation Deliverables Task</h3>
                <p className="text-sm font-sans text-zinc-650 leading-relaxed">
                  Developed as a premier UI/UX placement evaluation interface representing real event coordination. The app serves as a centralized hub for busy event organizers to instantly supervise technical requirements.
                </p>
                <p className="text-xs text-zinc-550 italic font-mono bg-zinc-50 p-3 rounded-lg border">
                  "Designed for instant visibility of document approvals requested from each manager of performing bands."
                </p>
              </div>

              {/* Status workflow */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-8 space-y-4 shadow-sm animate-fade-in">
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-zinc-650 bg-zinc-100 px-3.5 py-1 w-fit rounded-full border border-zinc-200">
                  <span>OPERATIONAL ADVANTAGES</span>
                </div>
                <h3 className="font-display font-bold text-xl text-zinc-900 leading-snug">Streamlining Backstage Communication</h3>
                <p className="text-sm font-sans text-zinc-650 leading-relaxed">
                  Organizing musical concerts requires heavy backstage coordination. Band managers frequently delay inputs regarding set times, tech specs, or riders. This centralized board coordinates those documents effortlessly:
                </p>
                <ul className="space-y-2 text-xs text-zinc-650 font-sans font-medium pl-1">
                  <li className="flex items-start gap-2">
                    <span className="text-[#2E8BF7] font-bold">●</span>
                    <span>Shows status (pending, approved, in-review) at high visibility.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2E8BF7] font-bold">●</span>
                    <span>Removes the need for countless chats and scattered emails.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {project.id === 'grace' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Concept Précis */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-3.5 py-1 w-fit rounded-full border border-amber-200/50">
                  <span>BRAND GOAL & SECTOR HOLES</span>
                </div>
                <h3 className="font-display font-bold text-xl text-zinc-900 leading-snug">Women's Formal Wear Inequality</h3>
                <p className="text-sm font-sans text-zinc-650 leading-relaxed">
                  Historically, specialized women's formal wears are relegated to tiny, secondary corners inside large men's formal brands. Finding stylish options within top local stores in metropolitan regions remains a significant hurdle.
                </p>
                <p className="text-xs text-[#935116] italic font-semibold leading-relaxed border-l-2 border-amber-500 pl-3">
                  "Grace bridges this gap, establishing a female-first luxury brand experience, incorporating gorgeous boutique paper-bags and luxury box stamps."
                </p>
              </div>

              {/* Sister Brand Model */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-rose-500 bg-rose-50 px-3.5 py-1 w-fit rounded-full border border-rose-100">
                  <span>SISTER BRAND ALIGNMENT</span>
                </div>
                <h3 className="font-display font-bold text-xl text-zinc-900 leading-snug">Raymond Legacy Extension</h3>
                <p className="text-sm font-sans text-zinc-650 leading-relaxed">
                  By nesting Grace as an equal sister under the legacy Raymond Men's couture catalog, the design benefits from a heritage associated with top craftsmanship while strictly catering to women's aesthetic parameters.
                </p>
                <div className="bg-[#FAF8F2] p-4.5 rounded-xl border border-zinc-200 text-xs font-mono space-y-1">
                  <div className="font-bold text-zinc-800">Materials and Rigid Packaging Details:</div>
                  <p className="text-zinc-650 leading-relaxed font-sans mt-1">
                    Refined luxury ivory fiber boxes, silk lining inserts, bespoke tag designs, and personalized Gold Raymond logo stamps.
                  </p>
                </div>
              </div>
            </div>
          )}

          {project.id === 'wild-young' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Concept Cards */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-pink-600 bg-pink-50 px-3.5 py-1 w-fit rounded-full border border-pink-200">
                  <span>INFLUENCER MANAGEMENT AGENCY</span>
                </div>
                <h3 className="font-display font-bold text-xl text-zinc-900 leading-snug">Modern Marketing Branding</h3>
                <p className="text-sm font-sans text-zinc-650 leading-relaxed">
                  Wild + Young targets high-energy Gen-Z digital content creators and influencers. The branding is intentionally constructed with high-contrast neon geometries, fluid motion curves, and hyper-modern marketing templates.
                </p>
              </div>

              <div className="bg-white border border-zinc-200 rounded-3xl p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-purple-600 bg-purple-50 px-3.5 py-1 w-fit rounded-full border border-purple-200">
                  <span>CAMPAIGN DECK METRICS</span>
                </div>
                <h3 className="font-display font-bold text-xl text-zinc-900 leading-snug">Youth Engagement Channels</h3>
                <p className="text-sm font-sans text-zinc-650 leading-relaxed">
                  By matching raw neon curves with dynamic video backgrounds, Wild + Young enables influencers to rapidly deploy stylized templates on social media, guaranteeing higher visual engagement metrics.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Master Project Specific Dynamic Showcase */}
        <section className="bg-white/80 backdrop-blur-md border border-zinc-200 rounded-[32px] p-6 md:p-10 mb-16 shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-150 pb-6 mb-8">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#2E8BF7] font-bold uppercase">(Interactive Playground)</span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-950 mt-1">Live Asset Laboratory</h2>
            </div>
            <span className="text-[10px] font-mono text-zinc-400 uppercase bg-[#E1EEFA]/40 border border-zinc-200 px-3 py-1 rounded-full font-bold">
              EST. ABHISHEK LABS v3.0
            </span>
          </div>

          {/* Render individual workspaces depends on project.id */}
          
          {/* Workspace A: Behind Design Podcast Interactive Player */}
          {project.id === 'behind-design' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 flex flex-col items-center justify-center bg-zinc-950 border border-purple-950/40 rounded-2xl p-8 min-h-[350px] relative overflow-hidden text-white">
                <div className="absolute inset-0 bg-cover mix-blend-overlay opacity-10" style={{ backgroundImage: `url('data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E')` }}></div>
                
                {/* Visualizing the Indian design podcast player deck */}
                <div className="relative w-72 bg-[#120514]/90 border border-purple-900/30 rounded-2xl p-6 shadow-2xl flex flex-col gap-5 z-10 w-full max-w-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono tracking-widest text-[#E5FE40] bg-[#E5FE40]/10 border border-[#E5FE40]/20 px-2.5 py-1 rounded-full uppercase">LIVE EPISODE STREAM</span>
                    <span className="text-[10px] font-mono text-zinc-400">{visorTint.toUpperCase()}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-xl bg-gradient-to-tr from-purple-800 to-indigo-950 border border-purple-500/20 flex flex-col items-center justify-center relative shadow-md">
                      <svg className="w-8 h-8 text-white/90 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M10 9l5 3-5 3V9z" />
                      </svg>
                      <span className="text-[7px] font-mono absolute bottom-1 text-zinc-300">HQ</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-bold text-sm text-white truncate">
                        {decalStyle === 'Minimal Stripe' ? '01 • Demographics of Design' : decalStyle === 'Racing Wings' ? '02 • Siloed Corporate Design' : '03 • Regional Creative Mentors'}
                      </h4>
                      <p className="text-zinc-400 text-[10px] font-mono mt-0.5 truncate">Hosted by Aryan Abhishek & Guests</p>
                    </div>
                  </div>

                  {/* Sound Wave Equalizer Display */}
                  <div className="bg-black/40 border border-white/5 rounded-xl p-4 flex flex-col gap-2">
                    <div className="flex justify-between items-center text-[8px] font-mono text-zinc-500">
                      <span>AUDIO WAVEFORM ({interiorFabric})</span>
                      <span>ACTIVE PLAYBACK</span>
                    </div>
                    
                    <div className="flex justify-between items-center h-12 w-full px-1 pt-1">
                      {[...Array(16)].map((_, idx) => {
                        const heights = {
                          'Minimal Stripe': [35, 60, 40, 85, 30, 70, 45, 95, 60, 30, 80, 50, 65, 40, 55, 30],
                          'Racing Wings': [75, 40, 85, 60, 95, 30, 70, 50, 80, 40, 60, 95, 45, 85, 35, 55],
                          'Modern Stealth': [25, 45, 50, 40, 30, 50, 60, 45, 35, 55, 40, 30, 45, 50, 35, 25]
                        }[decalStyle as 'Minimal Stripe' | 'Racing Wings' | 'Modern Stealth'] || [40, 50, 60, 40, 50, 60, 40, 50, 60, 40, 50, 60, 40, 50, 60, 40];
                        
                        return (
                          <div 
                            key={idx} 
                            className="w-[3px] bg-gradient-to-t from-purple-600 to-[#E5FE40] rounded-sm transition-all duration-500"
                            style={{ height: `${heights[idx] || 30}%` }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                    <span>STATUS: BROADCASTING</span>
                    <span>v1.0 AUD</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h4 className="font-display font-bold text-lg text-zinc-950 mb-1">Podcast Live Player Experience</h4>
                  <p className="text-zinc-500 text-xs leading-relaxed">
                    Test different regional episodes, playback speeds, and dynamic audio quality configurations aligned to modern community-driven streaming layouts.
                  </p>
                </div>

                <div className="space-y-4 bg-zinc-50 rounded-xl p-5 border border-zinc-200">
                  <div>
                    <label className="block text-[9px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">Select Podcast Episode</label>
                    <select 
                      value={decalStyle}
                      onChange={(e) => setDecalStyle(e.target.value)}
                      className="bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs w-full focus:outline-none focus:ring-1 focus:ring-purple-600"
                    >
                      <option value="Minimal Stripe">Episode 01: Demographics of Design in India</option>
                      <option value="Racing Wings">Episode 02: Siloed Careers & Corporate Design</option>
                      <option value="Modern Stealth">Episode 03: The Power of Regional Creative Mentorship</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">Playback Speed</label>
                      <select 
                        value={visorTint}
                        onChange={(e) => setVisorTint(e.target.value)}
                        className="bg-white border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs w-full focus:outline-none focus:ring-1 focus:ring-purple-600"
                      >
                        <option value="Iridescent">1.0x Standard</option>
                        <option value="Dark Smoke">1.25x Dynamic</option>
                        <option value="Clear Classic">1.5x Fast Seeker</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[9px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">Audio Rendering Quality</label>
                      <select 
                        value={interiorFabric}
                        onChange={(e) => setInteriorFabric(e.target.value)}
                        className="bg-white border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs w-full focus:outline-none focus:ring-1 focus:ring-purple-600"
                      >
                        <option value="Perforated Leather">High-Fidelity Stereo</option>
                        <option value="Brushed Velvet">Adaptive Lossless</option>
                        <option value="Sweat-Wicking Mesh">Standard Compression</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 bg-zinc-100/50 border border-zinc-200/60 p-3 rounded-lg">
                  <span className="h-2 w-2 rounded-full bg-[#2d3fe3] animate-ping" />
                  <span>DEMOGRAPHIC: 70% TARGET AUDIENCE LIKED EPISODE</span>
                </div>
              </div>
            </div>
          )}

          {/* Workspace B: Disney Shopping App UI Simulator */}
          {project.id === 'disney-shopping' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 flex flex-col items-center justify-center bg-zinc-950 border border-zinc-800 rounded-2xl p-8 min-h-[350px] relative overflow-hidden">
                <div className="absolute top-4 left-4 flex space-x-1 z-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                </div>

                {/* Simulated Smartphone */}
                <motion.div 
                  animate={isAnimating ? { scale: [1, 1.03, 1] } : {}}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-72 h-[340px] bg-zinc-900 rounded-[32px] p-4 shadow-2xl text-white flex flex-col justify-between relative overflow-hidden border-4 border-zinc-800"
                >
                  {/* Speaker Grill */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-zinc-850 rounded-full flex items-center justify-center">
                    <div className="w-8 h-1 bg-zinc-700 rounded-full"></div>
                  </div>

                  {/* App Screen Content depending on active view-state */}
                  <div className="flex-1 mt-4 rounded-[20px] overflow-hidden flex flex-col bg-zinc-950 p-4 border border-zinc-800 relative justify-between">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="font-mono text-[8px] tracking-widest text-[#E5FE40] uppercase">DISNEY MERCH v1.0</span>
                      <div className="h-1.5 w-1.5 rounded-full bg-[#E5FE40] animate-pulse"></div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center items-center my-4 text-center">
                      {transactionType === 'Instant Credit' ? (
                        <>
                          <div className="w-12 h-12 bg-[#002b5c] rounded-full flex items-center justify-center mb-3 border border-blue-500/30">
                            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                            </svg>
                          </div>
                          <span className="text-[9px] font-mono text-zinc-500 uppercase">Onboarding Screen</span>
                          <h5 className="font-display font-semibold text-xs text-white max-w-[140px] mt-1 leading-tight">Welcome to the Disney Experience</h5>
                        </>
                      ) : transactionType === 'Zero Collateral' ? (
                        <>
                          <div className="w-full bg-zinc-900 p-2.5 rounded-xl border border-zinc-800 mb-2 text-left">
                            <span className="text-[8px] font-mono text-zinc-500 uppercase">SEARCH MERCHANDISE</span>
                            <div className="text-[11px] font-medium text-white truncate mt-0.5">{marketingTagline}</div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 w-full">
                            <div className="bg-zinc-900 p-2 rounded-lg text-center border border-white/5">
                              <div className="h-8 bg-zinc-800 rounded mb-1"></div>
                              <span className="text-[7px] text-zinc-400">Hoodies</span>
                            </div>
                            <div className="bg-zinc-900 p-2 rounded-lg text-center border border-white/5">
                              <div className="h-8 bg-zinc-800 rounded mb-1"></div>
                              <span className="text-[7px] text-zinc-400">Toys & Figures</span>
                            </div>
                          </div>
                        </>
                      ) : transactionType === 'Swift Remit' ? (
                        <>
                          <span className="text-[7px] font-mono text-blue-400 uppercase tracking-widest mb-1">PRODUCT DETAIL</span>
                          <h6 className="font-display font-semibold text-sm leading-tight max-w-[170px]">{marketingTagline || 'Mickey Sweatshirt'}</h6>
                          <div className="text-[12px] text-[#E5FE40] font-mono font-bold mt-1">₹1,899</div>
                          <div className="mt-3 w-full bg-blue-600 rounded-lg py-1.5 text-center text-[10px] font-bold">Add to Wishlist</div>
                        </>
                      ) : (
                        <>
                          <svg className="w-8 h-8 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                          </svg>
                          <span className="text-[9px] font-mono text-zinc-500 uppercase mt-2">Active Cart</span>
                          <div className="text-[10px] font-semibold mt-1">1 Item • Processing Checkout</div>
                        </>
                      )}
                    </div>

                    <div className="flex justify-between items-center text-[8px] font-mono text-zinc-500 pt-2 border-t border-white/5">
                      <span>THEME INDIGO</span>
                      <span>SECURE TRANSACTION</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h4 className="font-display font-bold text-lg text-zinc-950 mb-1">Disney E-Commerce Layout Kit</h4>
                  <p className="text-zinc-500 text-xs leading-relaxed">
                    Examine active UI user journeys, responsive screen sizing, product search overlays, and checkout state transitions built under Disney brand parameters.
                  </p>
                </div>

                <div className="space-y-4 bg-zinc-50 rounded-xl p-5 border border-zinc-200">
                  <div>
                    <label className="block text-[9px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">Active merchandise search term</label>
                    <input 
                      type="text" 
                      value={marketingTagline}
                      onChange={(e) => setMarketingTagline(e.target.value)}
                      maxLength={24}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-blue-600 outline-none font-medium text-zinc-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">Interactive App Screens</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { key: 'Instant Credit', label: 'Onboarding Screen' },
                        { key: 'Zero Collateral', label: 'Home Categories' },
                        { key: 'Swift Remit', label: 'Product Detail' },
                        { key: 'Direct Wallet', label: 'Cart Checkout' }
                      ].map((op) => (
                        <button
                          key={op.key}
                          onClick={() => setTransactionType(op.key)}
                          className={`text-[9px] font-mono py-1.5 rounded-lg border transition-colors cursor-pointer ${transactionType === op.key ? 'bg-[#002b5c] text-white border-[#002b5c] font-bold' : 'bg-white text-zinc-650 border-zinc-200 hover:bg-zinc-100'}`}
                        >
                          {op.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsAnimating(true);
                      setTimeout(() => setIsAnimating(false), 500);
                    }}
                    disabled={isAnimating}
                    className="w-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-mono font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition shadow-md disabled:bg-zinc-300 disabled:cursor-not-allowed"
                  >
                    <Play size={12} />
                    Animate Transition Screen
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Workspace C: Artist Management App Dashboard */}
          {project.id === 'artist-management' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className={`lg:col-span-7 flex flex-col justify-between rounded-2xl p-8 min-h-[350px] relative overflow-hidden border transition-all duration-300 ${
                posterTheme === 'Blood Crimson' ? 'bg-[#0b1411] border-emerald-950/45 text-white' : posterTheme === 'Classic Gold' ? 'bg-[#12140f] border-lime-950/45 text-white' : 'bg-[#0f1115] border-zinc-800 text-white'
              }`}>
                {/* Background graphic elements simulating artist pipeline */}
                <div className="w-full flex justify-between items-center text-xs font-mono opacity-50 border-b border-white/5 pb-4">
                  <span>LIVE ORGANIZER CONTROL PANEL</span>
                  <span>TCULES PLACEMENT v1.0</span>
                </div>

                <div className="my-10 space-y-4">
                  <span className="text-[10px] pin font-mono text-[#E5FE40] border border-[#E5FE40]/20 bg-[#E5FE40]/5 px-3 py-1 rounded-full uppercase tracking-[0.25em] font-bold">
                    PERFORMER DELIVERABLES
                  </span>
                  
                  <h3 className="font-display font-black tracking-tight text-3xl sm:text-4xl leading-none uppercase max-w-lg transition-all duration-300">
                    {trackerValue}% approved
                  </h3>
                  
                  {/* Status List depending on Filter theme */}
                  <div className="bg-black/30 p-4 border border-white/5 rounded-xl text-left space-y-2 max-w-sm mx-auto">
                    <div className="flex justify-between items-center text-[10px] font-mono border-b border-white/5 pb-1">
                      <span>DELIVERABLE</span>
                      <span>STATUS</span>
                    </div>
                    {posterTheme === 'Blood Crimson' ? (
                      <>
                        <div className="flex justify-between text-xs font-mono text-zinc-300">
                          <span>1. Interior Fabric Select</span>
                          <span className="text-amber-400 font-bold">● PENDING</span>
                        </div>
                        <div className="flex justify-between text-xs font-mono text-zinc-300">
                          <span>2. Fabric Flame Test</span>
                          <span className="text-amber-400 font-bold">● PENDING</span>
                        </div>
                      </>
                    ) : posterTheme === 'Classic Gold' ? (
                      <>
                        <div className="flex justify-between text-xs font-mono text-zinc-300">
                          <span>1. Decal Vector Outline</span>
                          <span className="text-green-400 font-bold">✓ APPROVED</span>
                        </div>
                        <div className="flex justify-between text-xs font-mono text-zinc-300">
                          <span>2. Shell Size Validation</span>
                          <span className="text-green-400 font-bold">✓ APPROVED</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between text-xs font-mono text-zinc-300">
                          <span>1. Visor Safety Check</span>
                          <span className="text-purple-400 font-bold">✦ IN REVIEW</span>
                        </div>
                        <div className="flex justify-between text-xs font-mono text-zinc-300">
                          <span>2. Graphic Tint Layer</span>
                          <span className="text-purple-400 font-bold">✦ IN REVIEW</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="w-full flex justify-between text-[10px] font-mono text-zinc-500 border-t border-white/5 pt-4">
                  <span>DENSITY VIEW: {fontSize === 'text-4xl' ? 'STANDARD GRID' : fontSize === 'text-5xl' ? 'COMPACT LIST' : 'DENSE TIMELINE'}</span>
                  <span>PRESETS APPLIED</span>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h4 className="font-display font-bold text-lg text-zinc-950 mb-1">Artist Deliverables Workspace</h4>
                  <p className="text-zinc-500 text-xs leading-relaxed">
                    Toggle different band communication statuses, timeline density grids, and update completion percentages to maintain live event milestones.
                  </p>
                </div>

                <div className="space-y-4 bg-zinc-50 rounded-xl p-5 border border-zinc-200">
                  <div>
                    <label className="block text-[9px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">Deliverable Filter Group</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { key: 'Blood Crimson', label: 'Pending' },
                        { key: 'Classic Gold', label: 'Approved' },
                        { key: 'Hyper Blue', label: 'In Review' }
                      ].map((theme) => (
                        <button
                          key={theme.key}
                          onClick={() => setPosterTheme(theme.key)}
                          className={`text-[9px] font-mono py-1.5 rounded-lg border transition-colors cursor-pointer ${posterTheme === theme.key ? 'bg-zinc-950 text-white border-zinc-950 font-bold' : 'bg-white text-zinc-650 border-zinc-200 hover:bg-zinc-100'}`}
                        >
                          {theme.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">Deliverables Completion ({trackerValue}%)</label>
                    <input 
                      type="range"
                      min={0} 
                      max={100} 
                      value={trackerValue}
                      onChange={(e) => setTrackerValue(Number(e.target.value))}
                      className="w-full accent-zinc-950 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">View Layout Density</label>
                    <div className="flex space-x-2">
                      {[
                        { size: 'text-4xl', label: 'Standard' },
                        { size: 'text-5xl', label: 'Compact' },
                        { size: 'text-6xl', label: 'Dense' }
                      ].map((t) => (
                        <button
                          key={t.size}
                          onClick={() => setFontSize(t.size)}
                          className={`flex-1 text-[10px] font-mono py-1 border rounded-md transition cursor-pointer ${fontSize === t.size ? 'bg-zinc-900 text-white border-zinc-900 font-bold' : 'bg-white border-zinc-200 hover:bg-zinc-50 text-zinc-600'}`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-xs text-emerald-950 leading-relaxed">
                  "Streamlining approvals directly affects back-of-house workflow. By compiling managers' status into color-coded timelines, we trim communication friction."
                </div>
              </div>
            </div>
          )}

          {/* Workspace D: Grace Fashion Packaging Box Simulator */}
          {project.id === 'grace' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 flex flex-col items-center justify-between bg-zinc-950 border border-zinc-900 rounded-2xl p-8 min-h-[350px] text-white">
                <div className="w-full flex justify-between items-center text-xs font-mono opacity-50 border-b border-white/5 pb-4">
                  <span>RAYMOND SEGMENT: GRACE</span>
                  <span>MATERIAL SELECTION PREVIEW</span>
                </div>

                <div className="my-8 flex justify-center items-center">
                  <div className="relative w-44 h-44 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center shadow-2xl relative overflow-hidden">
                    {/* Visualizing luxurious packaging material textures and branding stamp */}
                    <div className="absolute inset-2 rounded-xl border border-dashed border-white/15 animate-pulse"></div>
                    
                    <div className="text-center z-10 p-4">
                      {currentKeyframe === 0 && <span className="text-xs font-serif italic text-amber-100 block">Elegance Ivory</span>}
                      {currentKeyframe === 1 && <span className="text-xs font-serif italic text-emerald-200 block">Sustainable Linen Silk</span>}
                      {currentKeyframe === 2 && <span className="text-xs font-serif italic text-purple-200 block">Royal Textured Velvet</span>}
                      {currentKeyframe === 3 && <span className="text-xs font-serif italic text-rose-200 block">Letterpress Cotton Rose</span>}
                      <h4 className="font-display font-medium text-lg text-[#E5FE40] mt-2 tracking-widest uppercase">G R A C E</h4>
                      <p className="text-[7.5px] font-mono text-zinc-500 mt-1 uppercase">Womenswear Collection</p>
                    </div>

                    <div className="absolute bottom-2 bg-zinc-950/80 border border-white/10 px-3 py-0.5 rounded-full text-[8px] font-mono text-zinc-300">
                      PRESET {currentKeyframe + 1} / 4 • {['Ivory', 'Linen', 'Velvet', 'Rose'][currentKeyframe]} Finish
                    </div>
                  </div>
                </div>

                {/* Simulated ribbon tag and luxury ribbon alignment */}
                <div className="w-full space-y-2">
                  <div className="flex justify-between text-[9px] font-mono text-zinc-500">
                    <span>FINISH COMPLIANCE RATIO</span>
                    <span>PREMIUM GRADE COMPLIANT</span>
                  </div>
                  <div className="h-1 bg-zinc-800 rounded-full w-full overflow-hidden flex">
                    <div 
                      className="bg-[#E5FE40] h-full transition-all duration-300"
                      style={{ width: `${(currentKeyframe + 1) * 25}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h4 className="font-display font-bold text-lg text-zinc-950 mb-1">Luxury Packaging Design Box Editor</h4>
                  <p className="text-zinc-500 text-xs leading-relaxed">
                    Test different luxury segment boxes, stamp options, and fabric ribbon finishes compiled to ensure high premium buyer engagement.
                  </p>
                </div>

                <div className="space-y-4 bg-zinc-50 rounded-xl p-5 border border-zinc-200 font-mono">
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-zinc-400 mb-2">Select finish material</span>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[0, 1, 2, 3].map((frameIdx) => (
                        <button
                          key={frameIdx}
                          onClick={() => {
                            setCurrentKeyframe(frameIdx);
                            setIsPlayingAd(false);
                          }}
                          className={`text-xs py-2 border rounded-md transition cursor-pointer ${currentKeyframe === frameIdx ? 'bg-zinc-950 text-[#E5FE40] border-zinc-950 font-bold' : 'bg-white border-zinc-200 hover:bg-zinc-100 text-zinc-650'}`}
                        >
                          M{frameIdx + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-zinc-200 pt-3">
                    <span className="block text-[9px] uppercase tracking-widest text-zinc-400 mb-1.5">Auto-Rotation Box Animation</span>
                    <button
                      onClick={() => setIsPlayingAd(!isPlayingAd)}
                      className="w-full bg-zinc-950 text-white hover:bg-zinc-850 py-2.5 rounded-lg text-xs font-bold font-mono tracking-wider flex items-center justify-center gap-2 cursor-pointer transition"
                    >
                      {isPlayingAd ? <><Square size={11} className="fill-[#E5FE40] stroke-none" /> STOP AUTO ROTATE</> : <><Play size={11} className="fill-[#E5FE40] stroke-none" /> LAUNCH ROTATING</>}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Workspace E: Wild + Young Social Campaign Sandbox */}
          {project.id === 'wild-young' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 flex flex-col justify-between bg-[#15020c] border border-pink-950/40 rounded-2xl p-8 min-h-[350px] text-white">
                <div className="w-full flex justify-between items-center text-xs font-mono opacity-50 border-b border-pink-500/10 pb-4">
                  <span>WILD + YOUNG INFLUENCER GROUP</span>
                  <span>CAMPAIGN WAVE MODULATOR</span>
                </div>

                {/* Reactive Wave Vector Animation */}
                <div className="my-10 flex h-20 items-center justify-center space-x-1">
                  {[...Array(30)].map((_, idx) => {
                    const baseHeight = 12 + Math.sin(idx * 0.5) * 45;
                    const scaleHeight = isGeneratingWave 
                      ? waveSpeed === 'fast' ? Math.max(10, baseHeight * 1.5) : Math.max(8, baseHeight * 1.1)
                      : 8;
                    return (
                      <div 
                        key={idx}
                        className="w-[2.5px] bg-[#E5FE40] rounded-full transition-all"
                        style={{ 
                          height: `${scaleHeight}px`,
                          transitionDuration: isGeneratingWave ? '0.15s' : '0.4s',
                          animation: isGeneratingWave ? `pulse 0.8s infinite alternate` : 'none',
                          animationDelay: `${idx * 0.04}s`
                        }}
                      />
                    );
                  })}
                </div>

                <div className="bg-pink-950/20 border border-pink-500/15 rounded-xl p-3 text-xs text-pink-200 font-mono text-center">
                  "{inputText || 'Stay Wild, Stay Curious'}"
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h4 className="font-display font-bold text-lg text-zinc-950 mb-1 font-sans">Campaign Energy Sandbox</h4>
                  <p className="text-zinc-500 text-xs leading-relaxed">
                    Test key slogans, wave frequency visualizer speeds, and energetic Gen-Z target brand curves for active campaigns.
                  </p>
                </div>

                <div className="space-y-4 bg-zinc-50 rounded-xl p-5 border border-zinc-200">
                  <div>
                    <label className="block text-[9px] font-mono uppercase tracking-widest text-zinc-400 mb-1 font-bold">Campaign Ad Copy</label>
                    <input 
                      type="text"
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-pink-400 outline-none font-sans text-zinc-850"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-mono uppercase tracking-widest text-zinc-400 mb-1">Visual Pitch</label>
                      <select 
                        value={waveSpeed}
                        onChange={(e) => setWaveSpeed(e.target.value)}
                        className="bg-white border border-zinc-200 rounded-lg px-2 py-1.5 text-xs w-full focus:outline-none"
                      >
                        <option value="normal">Normal Frequency</option>
                        <option value="fast">Energetic (1.5x)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-mono uppercase tracking-widest text-zinc-400 mb-1">Social Pulse Rate ({voiceVolume}%)</label>
                      <input 
                        type="range"
                        min="20"
                        max="100"
                        className="w-full accent-zinc-950 mt-1 cursor-pointer"
                        value={voiceVolume}
                        onChange={(e) => setVoiceVolume(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsGeneratingWave(true);
                      setTimeout(() => setIsGeneratingWave(false), 3000);
                    }}
                    disabled={isGeneratingWave}
                    className="w-full bg-zinc-950 text-white hover:bg-zinc-850 py-3 rounded-lg text-xs font-mono font-bold tracking-wider flex items-center justify-center gap-2 cursor-pointer transition disabled:bg-zinc-300 disabled:cursor-not-allowed"
                  >
                    <Volume2 size={13} className="text-[#E5FE40]" />
                    {isGeneratingWave ? 'CALCULATING FREQUENCY...' : 'SIMULATE CAMPAIGN WAVE'}
                  </button>
                </div>
              </div>
            </div>
          )}


        </section>

        {/* Project Navigation Footer CTA */}
        <div className="border-t border-zinc-200 pt-16 mt-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#2E8BF7] uppercase font-bold">Have an identity challenge?</span>
            <h3 className="font-display font-extrabold text-3xl text-zinc-950 mt-1">Let's craft your custom story</h3>
            <p className="text-zinc-500 text-sm mt-1 max-w-xl">
              Collaborate directly with Aryan Abhishek to execute dynamic artworks or high-fidelity user workflows.
            </p>
          </div>

          <div className="flex gap-4 shrink-0">
            <button
              onClick={onBack}
              className="px-6 py-3.5 border border-zinc-300 hover:border-zinc-400 bg-white hover:bg-[#E1EEFA]/40 rounded-full font-semibold text-xs uppercase tracking-wider font-mono text-zinc-700 cursor-pointer transition shadow-sm"
            >
              Other Cases
            </button>
            <button
              onClick={onOpenContact}
              className="px-8 py-3.5 bg-[#2E8BF7] hover:bg-[#12B4D1] text-white rounded-full font-bold text-xs uppercase tracking-wider font-mono cursor-pointer transition shadow-md flex items-center gap-2"
            >
              Book Consultation <MoveRight size={13} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
