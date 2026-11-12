import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  ArrowRight, 
  Trophy, 
  Sparkles, 
  Dumbbell, 
  Activity, 
  Heart, 
  Maximize2, 
  CheckCircle2, 
  Flame, 
  Target, 
  Zap, 
  ShieldCheck, 
  Award,
  ChevronDown,
  Calendar,
  Clock,
  RotateCw,
  Play,
  Pause,
  Volume2,
  VolumeX
} from 'lucide-react';
import { 
  PROGRAMS_DATA, 
  COACHES_DATA, 
  FACILITIES_DATA, 
  NEWS_ARTICLES, 
  PARTNERS_DATA, 
  ACADEMY_INFO, 
  VERIFIED_STATS, 
  TESTIMONIALS_DATA
} from '../data/cmsData';
import { Lightbox } from '../components/common/Lightbox';
import { Quote, Star, Users } from 'lucide-react';

// Animated Count-Up component for reading the verified metrics
interface AnimatedCounterProps {
  value: string;
  triggerKey?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, triggerKey = 0 }) => {
  const numericMatch = value.match(/\d+/);
  const targetNumber = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const suffix = value.replace(/\d+/, '');

  const [displayNumber, setDisplayNumber] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = React.useRef<HTMLSpanElement>(null);

  // Intersection Observer: start counting when visible in viewport
  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Animate count whenever visible or triggerKey updates
  useEffect(() => {
    if (!isVisible && triggerKey === 0) return;

    let animFrameId: number;
    let startTimestamp: number | null = null;
    
    // Duration scaled to target number so smaller numbers tick cleanly and 300+ rolls smoothly
    const duration = targetNumber > 50 ? 1800 : targetNumber > 15 ? 1300 : 900;
    
    // Set to 0 so the rolling count starts visibly
    setDisplayNumber(0);

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const nextVal = Math.round(easeOut * targetNumber);
      setDisplayNumber(nextVal);

      if (progress < 1) {
        animFrameId = window.requestAnimationFrame(step);
      } else {
        setDisplayNumber(targetNumber);
      }
    };

    // Small delay (80ms) so 0 is rendered and the rolling count is clearly visible
    const timer = setTimeout(() => {
      animFrameId = window.requestAnimationFrame(step);
    }, 80);

    return () => {
      clearTimeout(timer);
      if (animFrameId) window.cancelAnimationFrame(animFrameId);
    };
  }, [isVisible, targetNumber, triggerKey]);

  return (
    <span ref={counterRef} className="tabular-nums font-black inline-block">
      {displayNumber}{suffix}
    </span>
  );
};

export const HomePage: React.FC = () => {
  // Interactive state
  const [activePathwayIndex, setActivePathwayIndex] = useState(0);

  // Hero Video State
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Interactive counter triggers (per card and global)
  const [counterTriggers, setCounterTriggers] = useState<number[]>([1, 1, 1, 1]);
  const [globalCounterTrigger, setGlobalCounterTrigger] = useState(0);

  const triggerStatCounter = (index: number) => {
    setCounterTriggers((prev) => {
      const next = [...prev];
      next[index] = (next[index] || 0) + 1;
      return next;
    });
  };

  // Lightbox state for facilities
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const facilityGallery = FACILITIES_DATA.map((fac) => ({
    url: fac.image,
    title: fac.title,
    caption: fac.shortDesc
  }));

  const openFacilityLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };



  // News items for Section 8 (3 cards side by side)
  const newsArticles = NEWS_ARTICLES.slice(0, 3);

  const activeProgram = PROGRAMS_DATA[activePathwayIndex];

  return (
    <div className="w-full bg-[#F8F9F6] text-[#202723]">
      {/* ================================================== */}
      {/* SECTION 1 — CINEMATIC HERO */}
      {/* ================================================== */}
      <section className="relative min-h-screen flex items-center justify-start overflow-hidden bg-[#0A1220] text-white">
        {/* Full-width cinematic tennis video background with reduced overlays for clarity */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            poster="https://res.cloudinary.com/byde2j9a/image/upload/v1794477137/boidirpct44fbp93ufgw_u4fypu.avif"
            className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.05] scale-100"
          >
            <source
              src="https://res.cloudinary.com/byde2j9a/video/upload/v1794479219/Animate_scene_over_10_seconds_f9cd8cdc_shbsf8.mp4"
              type="video/mp4"
            />
            <img
              src="https://res.cloudinary.com/byde2j9a/image/upload/v1794477137/boidirpct44fbp93ufgw_u4fypu.avif"
              alt="Rohan Bopanna Tennis Academy"
              className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.05]"
            />
          </video>
          {/* Reduced overlay colors: subtle left gradient for text contrast and soft bottom vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1320]/75 via-[#0B1320]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320]/70 via-transparent to-black/20" />
          
          {/* Subtle court lines motif */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute bottom-20 left-10 right-10 h-[1px] bg-white"></div>
            <div className="absolute top-1/2 left-1/4 bottom-0 w-[1px] bg-white"></div>
          </div>
        </div>

        {/* Content Container on the LEFT with generous clearance below the fixed header */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-36 sm:pt-44 md:pt-48 lg:pt-52 pb-16 sm:pb-24">
          <div className="max-w-2xl lg:max-w-3xl">
            {/* Eyebrow */}
            <div className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#D2E635] mb-4 sm:mb-5 drop-shadow-sm">
              ROHAN BOPANNA TENNIS ACADEMY • BENGALURU
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-['Sora'] text-white leading-[1.08] text-balance drop-shadow-md">
              Shaping the Future <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-[#D2E635]">
                of India's Tennis
              </span>{" "}
              Champions.
            </h1>

            {/* Supporting Text */}
            <p className="mt-5 text-base sm:text-lg text-gray-100 leading-relaxed font-normal max-w-xl drop-shadow-sm">
              Serve Big. Play Smart. Win Bold. Elite international coaching, sports science, and high-performance tournament pathways at the Padukone-Dravid Centre for Sports Excellence.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/programs"
                className="px-7 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm bg-gradient-to-r from-[#287B54] to-[#1E6041] hover:from-[#349E6D] hover:to-[#287B54] text-white shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 border border-[#D2E635]/40 hover:scale-[1.02]"
              >
                <span>Explore Our Programs</span>
                <ChevronRight className="w-4 h-4 text-[#D2E635]" />
              </Link>
              <Link
                to="/admissions"
                className="px-7 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 hover:border-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Join RBTA</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
            </div>
          </div>

          {/* Integrated Hero Stats Bar - Active Rolling Count */}
          <div className="mt-12 sm:mt-16 pt-8 border-t border-white/15 max-w-5xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {VERIFIED_STATS.map((stat, i) => (
                <div 
                  key={i} 
                  onMouseEnter={() => triggerStatCounter(i)}
                  onClick={() => triggerStatCounter(i)}
                  className="cursor-pointer p-4 sm:p-5 rounded-2xl bg-white/[0.07] backdrop-blur-md border border-white/10 hover:border-[#D2E635]/70 hover:bg-white/[0.14] transition-all duration-300 group shadow-lg select-none"
                  title="Hover or click to recount"
                >
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Sora'] text-[#D2E635] tracking-tight drop-shadow-sm group-hover:scale-105 transition-transform origin-left">
                    <AnimatedCounter 
                      value={stat.value} 
                      triggerKey={(counterTriggers[i] || 0) + globalCounterTrigger} 
                    />
                  </div>
                  <div className="text-xs uppercase font-extrabold tracking-wider text-white mt-1.5 font-['Sora'] flex items-center justify-between">
                    <span>{stat.label}</span>
                    <RotateCw className="w-3 h-3 text-[#D2E635]/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-[11px] text-gray-300/80 mt-0.5 leading-snug line-clamp-1">
                    {stat.subtext}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Video Playback & Sound Control Pill */}
        <div className="absolute bottom-6 right-6 z-20 hidden md:flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs text-gray-300 shadow-xl select-none">
          <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#D2E635] mr-1">
            <span className={`w-1.5 h-1.5 rounded-full bg-[#D2E635] ${isPlaying ? 'animate-ping' : ''}`} />
            Live Court View
          </span>
          <button
            onClick={togglePlay}
            className="p-1 hover:text-white transition-colors cursor-pointer"
            aria-label={isPlaying ? "Pause video" : "Play video"}
            title={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <span className="text-white/20">|</span>
          <button
            onClick={toggleMute}
            className="p-1 hover:text-white transition-colors cursor-pointer"
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            title={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-gray-400" /> : <Volume2 className="w-3.5 h-3.5 text-[#D2E635]" />}
          </button>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 2 — ABOUT RBTA (Editorial Split-Screen) */}
      {/* ================================================== */}
      <section className="py-20 lg:py-28 bg-[#F8F9F6] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Large Tennis Training Photograph */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] max-h-[600px] w-full">
                <img
                  src="https://rohanbopannatennisacademy.com/wp-content/uploads/2025/05/rbta-rohan-bopanna.jpg"
                  alt="Rohan Bopanna coaching an Indian junior tennis champion on court"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101D32]/80 via-transparent to-transparent" />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white">
                  <div className="text-[#D2E635] text-xs font-mono uppercase tracking-wider font-bold">
                    The Padukone-Dravid CSE Base
                  </div>
                  <div className="text-sm font-semibold mt-1">
                    10+ Championship Courts • Biomechanics Lab • Full Residential Campus
                  </div>
                </div>
              </div>

              {/* Decorative Tennis Ball Accent Badge */}
              <div className="absolute -top-4 -right-4 hidden sm:flex items-center justify-center w-24 h-24 rounded-2xl bg-[#174D3A] text-white shadow-xl border-2 border-[#D2E635] p-3 text-center">
                <div>
                  <div className="text-xl font-black font-['Sora'] text-[#D2E635]">100%</div>
                  <div className="text-[9px] uppercase tracking-wider font-semibold">Athlete Centric</div>
                </div>
              </div>
            </div>

            {/* Right: Editorial Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#287B54]">
                <span className="w-8 h-[2px] bg-[#287B54]"></span>
                <span>Our Philosophy</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Sora'] text-[#101D32] leading-tight">
                More Than a Tennis Academy.
              </h2>

              <p className="text-base sm:text-lg text-[#57655F] leading-relaxed">
                Founded by professional tennis player Rohan Bopanna, RBTA combines expert coaching, sports science, physical conditioning and competitive exposure to develop complete tennis players.
              </p>

              {/* Three Expressive Pillars (Not generic cards) */}
              <div className="space-y-5 pt-4">
                <div className="group pl-5 border-l-4 border-[#287B54] hover:border-[#D2E635] transition-all">
                  <h3 className="text-xl sm:text-2xl font-black font-['Sora'] tracking-tight text-[#101D32] group-hover:text-[#287B54] transition-colors">
                    FITNESS FIRST.
                  </h3>
                  <p className="text-sm text-[#57655F] mt-1 leading-relaxed">
                    Physical conditioning is the engine of modern tennis. We build relentless cardiovascular endurance, explosive lateral recovery, and joint durability so athletes remain powerful deep into three-set battles.
                  </p>
                </div>

                <div className="group pl-5 border-l-4 border-[#174D3A] hover:border-[#D2E635] transition-all">
                  <h3 className="text-xl sm:text-2xl font-black font-['Sora'] tracking-tight text-[#101D32] group-hover:text-[#174D3A] transition-colors">
                    RIGHT BASICS.
                  </h3>
                  <p className="text-sm text-[#57655F] mt-1 leading-relaxed">
                    Clean kinetic biomechanics, balanced contact points, and disciplined footwork. We teach sound fundamentals that never break down under national and international tournament pressure.
                  </p>
                </div>

                <div className="group pl-5 border-l-4 border-[#101D32] hover:border-[#D2E635] transition-all">
                  <h3 className="text-xl sm:text-2xl font-black font-['Sora'] tracking-tight text-[#101D32] group-hover:text-[#287B54] transition-colors">
                    PLAY SMART.
                  </h3>
                  <p className="text-sm text-[#57655F] mt-1 leading-relaxed">
                    Tennis is physical chess. Guided by Rohan Bopanna’s tour-proven doubles and singles intellect, players develop tactical problem-solving, situational composure, and acute court geometry awareness.
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs bg-[#101D32] hover:bg-[#174D3A] text-white transition-all shadow-md hover:shadow-lg"
                >
                  <span>Discover RBTA</span>
                  <ArrowRight className="w-4 h-4 text-[#D2E635]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 3 — PLAYER DEVELOPMENT PATHWAY (Horizontal Progressive) */}
      {/* ================================================== */}
      <section className="py-20 lg:py-28 bg-[#101D32] text-white relative overflow-hidden">
        {/* Subtle background textures */}
        <div className="court-grid-pattern absolute inset-0 opacity-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D2E635] inline-block mb-2 font-mono">
                From Grassroots to ATP/WTA Tour
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Sora'] text-white">
                Every Champion Starts Somewhere.
              </h2>
            </div>
            <p className="mt-4 md:mt-0 text-sm text-gray-300 max-w-md">
              Our 7-stage pathway provides age-appropriate, science-backed progression, ensuring seamless technical and physical evolution at each developmental milestone.
            </p>
          </div>

          {/* Interactive Horizontal Pathway Timeline Tabs */}
          <div className="relative mb-10 overflow-x-auto pb-4 no-scrollbar">
            <div className="flex items-center min-w-[750px] justify-between relative">
              {/* Connecting line */}
              <div className="absolute top-6 left-6 right-6 h-[2px] bg-white/20 z-0" />
              
              {PROGRAMS_DATA.map((prog, idx) => {
                const isActive = activePathwayIndex === idx;
                return (
                  <button
                    key={prog.id}
                    onClick={() => setActivePathwayIndex(idx)}
                    className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
                  >
                    {/* Circle Node */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm font-['Sora'] transition-all duration-300 ${
                      isActive 
                        ? 'bg-[#D2E635] text-[#101D32] scale-110 shadow-lg ring-4 ring-[#287B54]' 
                        : 'bg-[#174D3A] text-white hover:bg-[#287B54] border border-white/20'
                    }`}>
                      {prog.order}
                    </div>

                    {/* Step label */}
                    <span className={`mt-3 text-xs font-bold uppercase tracking-wider text-center transition-colors max-w-[90px] ${
                      isActive ? 'text-[#D2E635]' : 'text-gray-400 group-hover:text-white'
                    }`}>
                      {prog.name.replace(' Program', '').replace(' Pathway', '')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Pathway Detail Feature Panel */}
          <div className="bg-[#0B1320] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Photo & Spec - Full Container Bleed */}
              <div className="lg:col-span-5 relative min-h-[340px] sm:min-h-[400px] lg:min-h-full overflow-hidden">
                <img
                  src={activeProgram.image}
                  alt={activeProgram.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320]/80 via-[#0B1320]/20 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#287B54] text-[#D2E635] shadow-md">
                    Stage {activeProgram.order} • {activeProgram.level}
                  </span>
                  <div className="text-xl font-bold font-['Sora'] text-white mt-2 drop-shadow-sm">
                    {activeProgram.ageGroup}
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#D2E635] font-mono font-bold">
                    {activeProgram.ballType}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-['Sora'] text-white mt-1">
                    {activeProgram.name}
                  </h3>
                  <p className="text-sm font-medium text-gray-300 italic mt-1">
                    "{activeProgram.tagline}"
                  </p>

                  <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed">
                    {activeProgram.fullDesc}
                  </p>

                  {/* Program Key Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/10">
                    <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider">Court Size</div>
                      <div className="text-xs font-semibold text-white mt-0.5 truncate">{activeProgram.courtSize}</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider">Coach Ratio</div>
                      <div className="text-xs font-semibold text-white mt-0.5">{activeProgram.coachRatio}</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg border border-white/5 col-span-2 sm:col-span-1">
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider">Weekly Training</div>
                      <div className="text-xs font-semibold text-[#D2E635] mt-0.5">{activeProgram.weeklyCommitment}</div>
                    </div>
                  </div>

                  {/* Highlights checklist */}
                  <div className="mt-6">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#D2E635] mb-2 font-['Sora']">
                      Key Training Objectives:
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
                      {activeProgram.objectives.slice(0, 4).map((obj, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#287B54] shrink-0 mt-0.5" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom actions */}
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-gray-400">
                    Next Intake: <span className="text-white font-semibold">Batches enrolling now</span>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Link
                      to={`/programs/${activeProgram.id}`}
                      className="flex-1 sm:flex-initial text-center px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      Program Details
                    </Link>
                    <Link
                      to="/admissions"
                      className="flex-1 sm:flex-initial text-center px-5 py-2.5 rounded-lg bg-[#287B54] hover:bg-[#349E6D] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Enquire Now</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#D2E635]" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 4 — THE RBTA ADVANTAGE (Asymmetrical Layout) */}
      {/* ================================================== */}
      <section className="py-20 lg:py-28 bg-[#EFF2EF] text-[#202723]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#287B54] inline-block mb-2 font-mono">
              The 360-Degree Performance Model
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Sora'] text-[#101D32]">
              Developing the Complete Athlete.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#57655F]">
              Elite tennis today is won through multi-disciplinary science. At RBTA, our athletes do not just hit tennis balls—they build an indestructible athletic foundation across 8 core dimensions.
            </p>
          </div>

          {/* Asymmetrical composition: 1 prominent action photo + 8 distinctive capabilities */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Prominent Athlete Training Photo with editorial stats */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-xl border border-gray-300 min-h-[420px] lg:min-h-[640px]">
              <img
                src="https://rohanbopannatennisacademy.com/wp-content/uploads/2025/05/coaching-philosophy-rbt.jpg"
                alt="RBTA athletes during high performance Indian tennis agility and strength conditioning"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101D32] via-[#101D32]/40 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#287B54] text-[#D2E635] text-xs font-bold uppercase tracking-wider">
                  <Activity className="w-3.5 h-3.5" /> Biomechanics & S&C
                </div>
                <h3 className="text-2xl font-bold font-['Sora']">
                  Integrated with CSE Sports Science
                </h3>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                  Every player's kinetic chain is screened to eliminate injury risks and maximize racquet-head velocity.
                </p>
              </div>
            </div>

            {/* Right: Asymmetrical capability blocks */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Capability 1 */}
              <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#174D3A]/10 text-[#174D3A] flex items-center justify-center mb-3">
                  <Trophy className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold font-['Sora'] text-[#101D32]">
                  Professional Tennis Coaching
                </h4>
                <p className="text-xs sm:text-sm text-[#57655F] mt-1.5 leading-relaxed">
                  Led by Rohan Bopanna, Scott Davidoff, and Balachandran Manikkath. Periodized tactical training focused on weapon development and tour patterns.
                </p>
              </div>

              {/* Capability 2 */}
              <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#287B54]/10 text-[#287B54] flex items-center justify-center mb-3">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold font-['Sora'] text-[#101D32]">
                  Strength & Conditioning
                </h4>
                <p className="text-xs sm:text-sm text-[#57655F] mt-1.5 leading-relaxed">
                  Tennis-specific rotational power, kinetic chain acceleration, and deceleration mechanics built in CSE's 20,000 sq ft performance arena.
                </p>
              </div>

              {/* Capability 3 */}
              <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#101D32]/10 text-[#101D32] flex items-center justify-center mb-3">
                  <Activity className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold font-['Sora'] text-[#101D32]">
                  Sports Science & Biomechanics
                </h4>
                <p className="text-xs sm:text-sm text-[#57655F] mt-1.5 leading-relaxed">
                  High-speed motion capture, force plates, and VO2 Max cardiopulmonary testing in partnership with the Abhinav Bindra Targeting Performance center.
                </p>
              </div>

              {/* Capability 4 */}
              <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-teal-800/10 text-teal-800 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold font-['Sora'] text-[#101D32]">
                  Physiotherapy & Recovery
                </h4>
                <p className="text-xs sm:text-sm text-[#57655F] mt-1.5 leading-relaxed">
                  Hot and cold contrast plunge pools, NormaTec pneumatic compression, sports massage, and daily joint prehab overseen by tour physios.
                </p>
              </div>

              {/* Capability 5 */}
              <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-amber-700/10 text-amber-700 flex items-center justify-center mb-3">
                  <Target className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold font-['Sora'] text-[#101D32]">
                  Sports Psychology & Composure
                </h4>
                <p className="text-xs sm:text-sm text-[#57655F] mt-1.5 leading-relaxed">
                  Pressure-state inoculation, emotional resets between points, breathwork protocols, and match visualization methods.
                </p>
              </div>

              {/* Capability 6 */}
              <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-emerald-700/10 text-emerald-700 flex items-center justify-center mb-3">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold font-['Sora'] text-[#101D32]">
                  Athlete Nutrition Plans
                </h4>
                <p className="text-xs sm:text-sm text-[#57655F] mt-1.5 leading-relaxed">
                  Tailored caloric and macro profiles, hydration indexing, match-day fueling strategies, and healthy dining at the CSE cafeteria.
                </p>
              </div>

              {/* Capability 7 */}
              <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-indigo-700/10 text-indigo-700 flex items-center justify-center mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold font-['Sora'] text-[#101D32]">
                  Competitive Exposure
                </h4>
                <p className="text-xs sm:text-sm text-[#57655F] mt-1.5 leading-relaxed">
                  On-site AITA tournaments at CSE, structured ITF Junior travel schedules, and coaching support at major national championships.
                </p>
              </div>

              {/* Capability 8 */}
              <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#287B54]/10 text-[#287B54] flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold font-['Sora'] text-[#101D32]">
                  Performance Technology
                </h4>
                <p className="text-xs sm:text-sm text-[#57655F] mt-1.5 leading-relaxed">
                  Radar telemetry for serve speed, high-frame-rate stroke analysis, match charting metrics, and digital player logs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ================================================== */}
      {/* SECTION 6 — BHOOMI FOUNDATION (Distinct, Emotional Styling) */}
      {/* ================================================== */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-[#174D3A] via-[#0E3326] to-[#101D32] text-white relative overflow-hidden">
        {/* Warm glow circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#287B54]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D2E635]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#D2E635]/40 text-[#D2E635] text-xs font-bold uppercase tracking-widest">
                <Heart className="w-3.5 h-3.5 fill-[#D2E635]" />
                <span>The Bhoomi Program • Social Impact</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Sora'] text-white leading-tight">
                Talent Has No Boundaries. <br />
                <span className="text-[#D2E635]">Opportunity Shouldn't Either.</span>
              </h2>

              <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-light">
                Through the Bhoomi Program, talented children from underprivileged backgrounds receive opportunities to develop their tennis abilities while continuing their education and receiving residential support.
              </p>

              {/* 6 Key Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3">
                <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                  <div className="text-[#D2E635] font-bold text-sm font-['Sora']">100% Tennis Scholarships</div>
                  <div className="text-xs text-gray-300 mt-1">Full coaching fees & tournament equipment covered</div>
                </div>
                <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                  <div className="text-[#D2E635] font-bold text-sm font-['Sora']">Formal Education</div>
                  <div className="text-xs text-gray-300 mt-1">Accredited English-medium schooling & private tutoring</div>
                </div>
                <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                  <div className="text-[#D2E635] font-bold text-sm font-['Sora']">Residential Support</div>
                  <div className="text-xs text-gray-300 mt-1">Safe on-campus housing, wardens & athlete nutrition</div>
                </div>
                <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                  <div className="text-[#D2E635] font-bold text-sm font-['Sora']">Talent Scouting</div>
                  <div className="text-xs text-gray-300 mt-1">Outreach across rural schools in Karnataka & beyond</div>
                </div>
                <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                  <div className="text-[#D2E635] font-bold text-sm font-['Sora']">Tournament Travel</div>
                  <div className="text-xs text-gray-300 mt-1">All AITA national tour expenses funded</div>
                </div>
                <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                  <div className="text-[#D2E635] font-bold text-sm font-['Sora']">Medical & Physio</div>
                  <div className="text-xs text-gray-300 mt-1">Full access to CSE sports recovery & wellness</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <Link
                  to="/bhoomi"
                  className="px-6 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs bg-[#D2E635] text-[#101D32] hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Discover Bhoomi</span>
                  <ChevronRight className="w-4 h-4 text-[#101D32]" />
                </Link>
                <Link
                  to="/bhoomi#support"
                  className="px-6 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Support the Foundation</span>
                  <Heart className="w-4 h-4 text-[#D2E635]" />
                </Link>
              </div>
            </div>

            {/* Right: Authentic Photograph & Impact Quote */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 aspect-[4/5]">
                <img
                  src="https://rohanbopannatennisacademy.com/wp-content/uploads/2025/05/bhoomi-program-rbt.jpg"
                  alt="Bhoomi Foundation young Indian tennis scholar athletes at RBTA Bengaluru"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                  <p className="text-sm italic text-gray-200">
                    "Bhoomi didn’t just teach me how to serve; it gave me an education, a safe home, and the belief that I can play for India."
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="font-bold text-[#D2E635] font-['Sora']">Kavya M., Age 14</span>
                    <span className="text-gray-300 font-mono">Ranked #14 India U14</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 7 — FACILITIES AND TECHNOLOGY (Asymmetrical Gallery + Lightbox) */}
      {/* ================================================== */}
      <section className="py-20 lg:py-28 bg-[#F8F9F6] text-[#202723]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#287B54] inline-block mb-2 font-mono">
                Padukone–Dravid Centre for Sports Excellence • Bengaluru
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Sora'] text-[#101D32]">
                Where Preparation Meets Performance.
              </h2>
            </div>
            <Link
              to="/facilities"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#287B54] hover:underline"
            >
              <span>Explore All Facilities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Balanced 6-Facility Grid Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FACILITIES_DATA.slice(0, 6).map((facility, index) => {
              const isFirst = index === 0;
              return (
                <div
                  key={facility.id}
                  onClick={() => openFacilityLightbox(index)}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 border bg-[#101D32] min-h-[340px] sm:min-h-[380px] flex flex-col justify-between ${
                    isFirst ? 'border-[#287B54]/60 ring-2 ring-[#D2E635]/20' : 'border-gray-200/80 hover:border-[#287B54]/50'
                  }`}
                >
                  {/* Photo container */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                      src={facility.image}
                      alt={facility.title}
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    {/* Multi-stop gradient overlay for photo vibrancy and text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320] via-[#0B1320]/50 to-transparent group-hover:via-[#0B1320]/35 transition-colors" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0B1320]/60 via-transparent to-transparent opacity-50" />
                  </div>

                  {/* Top Badges & Maximize Action */}
                  <div className="relative z-10 p-5 sm:p-6 flex items-center justify-between w-full mb-auto">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-[#D2E635] border border-white/15 shadow-sm">
                        {facility.category}
                      </span>
                      {isFirst && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#287B54] text-white">
                          Flagship
                        </span>
                      )}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110 border border-white/20">
                      <Maximize2 className="w-3.5 h-3.5 text-[#D2E635]" />
                    </div>
                  </div>

                  {/* Bottom Text Content */}
                  <div className="relative z-10 p-5 sm:p-6 text-white space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold font-['Sora'] tracking-tight group-hover:text-[#D2E635] transition-colors leading-snug drop-shadow-sm">
                      {facility.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-200/90 leading-relaxed drop-shadow-xs line-clamp-2">
                      {facility.shortDesc}
                    </p>
                    
                    {/* Key Highlights */}
                    {facility.highlights && facility.highlights.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
                        {facility.highlights.slice(0, 2).map((h, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-medium text-gray-300 bg-white/10 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 8 — NEWS AND ACHIEVEMENTS (Editorial Magazine) */}
      {/* ================================================== */}
      <section className="py-20 lg:py-28 bg-[#EFF2EF] text-[#202723]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#287B54] inline-block mb-2 font-mono">
                Tournament Updates & Insights
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Sora'] text-[#101D32]">
                Inside the World of RBTA.
              </h2>
            </div>
            <Link
              to="/news"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#287B54] hover:underline"
            >
              <span>View All News & Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 3 Containers Side by Side Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {newsArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col justify-between h-full hover:-translate-y-1"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#101D32] text-[#D2E635] shadow-md">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7">
                    <div className="flex items-center gap-3 text-xs text-gray-500 font-mono mb-2.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#287B54]" /> {article.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#287B54]" /> {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold font-['Sora'] text-[#101D32] group-hover:text-[#287B54] transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="mt-3 text-sm text-[#57655F] leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 sm:px-7 pb-6 pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                  <span className="text-xs font-medium text-gray-500">By {article.author}</span>
                  <Link
                    to="/news"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#287B54] hover:text-[#174D3A] transition-colors group-hover:translate-x-0.5"
                  >
                    <span>Read Story</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#287B54]" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* TESTIMONIALS SECTION (Endorsed by Champions) */}
      {/* ================================================== */}
      <section className="py-20 lg:py-28 bg-[#101D32] text-white relative overflow-hidden">
        {/* Subtle court lines background motif */}
        <div className="court-grid-pattern absolute inset-0 opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D2E635] font-mono">
              Voices of Excellence • Verified Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Sora'] text-white mt-2">
              Endorsed by Grand Slam Champions.
            </h2>
            <p className="mt-3 text-sm text-gray-300">
              Hear what international tennis legends and junior athlete parents say about the training environment at RBTA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS_DATA.map((t) => (
              <div
                key={t.id}
                className="bg-[#0B1320] rounded-2xl p-8 border border-white/10 hover:border-[#287B54] transition-all flex flex-col justify-between shadow-xl relative"
              >
                <div>
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-[#287B54] opacity-50" />
                  </div>

                  {t.highlight && (
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#D2E635] mb-3">
                      "{t.highlight}"
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-3.5">
                  {t.avatar && (
                    <img
                      src={t.avatar}
                      alt={t.author}
                      className="w-11 h-11 rounded-full object-cover border-2 border-[#287B54]"
                    />
                  )}
                  <div>
                    <h4 className="text-sm font-bold font-['Sora'] text-white">
                      {t.author}
                    </h4>
                    <p className="text-[11px] text-[#287B54] font-medium leading-tight mt-0.5">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 9 — PARTNERS AND SPONSORS */}
      {/* ================================================== */}
      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#287B54] font-mono">
              Institutional & Equipment Affiliations
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-['Sora'] text-[#101D32] mt-2">
              Together, We Build the Future of Tennis.
            </h2>
            <p className="mt-3 text-sm text-[#57655F]">
              RBTA collaborates with premier sporting institutions, equipment leaders, and governing bodies to deliver elite athlete outcomes.
            </p>
          </div>

          {/* Verified Partner Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-stretch">
            {PARTNERS_DATA.map((partner) => (
              <div
                key={partner.id}
                className="p-6 rounded-xl bg-[#F8F9F6] border border-gray-200 flex flex-col items-center justify-center text-center hover:border-[#287B54] transition-colors group"
              >
                <div className="font-['Sora'] font-black text-sm sm:text-base tracking-wider text-[#101D32] group-hover:text-[#287B54] transition-colors">
                  {partner.logoText}
                </div>
                {partner.logoSubtext && (
                  <div className="text-[9px] uppercase tracking-wider text-gray-500 font-mono mt-1">
                    {partner.logoSubtext}
                  </div>
                )}
                <div className="mt-3 text-[10px] text-gray-400">
                  {partner.category}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/partners"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#101D32] hover:bg-[#174D3A] text-white transition-colors"
            >
              <span>Become a Partner or CSR Supporter</span>
              <ArrowRight className="w-4 h-4 text-[#D2E635]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 10 — FINAL CTA (Full-width Cinematic Photo) */}
      {/* ================================================== */}
      <section className="relative py-24 sm:py-32 bg-[#101D32] text-white overflow-hidden">
        {/* Full-width cinematic tennis background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/indian_junior_tennis_match_1794462960399.jpg"
            alt="Indian national junior tennis championship match play"
            className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1320] via-[#101D32]/80 to-[#174D3A]/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#287B54]/60 border border-[#349E6D] text-[#D2E635] text-xs font-bold uppercase tracking-widest mb-6">
            Admissions Open For 2025–26
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-['Sora'] text-white leading-tight">
            Your Journey to Tennis Excellence Starts Here.
          </h2>

          <p className="mt-6 text-base sm:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto font-light">
            Explore our programs and discover the right development pathway for your tennis ambitions.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/programs"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm bg-[#D2E635] text-[#101D32] hover:bg-white transition-all shadow-xl hover:scale-105"
            >
              Explore Programs
            </Link>
            <Link
              to="/admissions"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Enquire Now</span>
              <ChevronRight className="w-4 h-4 text-[#D2E635]" />
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox for facilities */}
      <Lightbox
        isOpen={lightboxOpen}
        currentIndex={lightboxIndex}
        images={facilityGallery}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % facilityGallery.length)}
        onPrev={() => setLightboxIndex((prev) => (prev - 1 + facilityGallery.length) % facilityGallery.length)}
      />


    </div>
  );
};
