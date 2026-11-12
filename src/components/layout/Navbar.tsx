import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, Phone, MessageSquare, Sparkles } from 'lucide-react';
import { Logo } from '../common/Logo';
import { ACADEMY_INFO } from '../../data/cmsData';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Players', path: '/players' },
    { name: 'Team', path: '/team' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'Bhoomi', path: '/bhoomi', highlight: true },
    { name: 'News', path: '/news' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Unified Fixed Header Container */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* Top Announcement & Quick Contact Strip */}
        <div className="bg-[#F8F9F6] text-gray-600 text-[11px] py-1.5 px-4 border-b border-gray-200 hidden md:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#287B54]/10 text-[#174D3A] font-bold uppercase tracking-wider text-[10px]">
                <Sparkles className="w-3 h-3 text-[#287B54]" /> Admissions Open 2025–26
              </span>
              <span className="text-gray-500 font-medium">Padukone-Dravid Centre for Sports Excellence, Bengaluru</span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <a 
                href={`https://wa.me/${ACADEMY_INFO.whatsapp}?text=Hello%20RBTA%20Team%2C%20I%20would%20like%20to%20enquire%20about%20tennis%20programs.`}
                target="_blank" 
                rel="noreferrer" 
                className="text-[#174D3A] hover:text-[#287B54] hover:underline flex items-center gap-1 font-semibold"
              >
                <MessageSquare className="w-3 h-3 text-[#287B54]" /> WhatsApp
              </a>
              <span className="text-gray-300">|</span>
              <a href={`tel:${ACADEMY_INFO.phone}`} className="text-gray-700 hover:text-black flex items-center gap-1 font-semibold">
                <Phone className="w-3 h-3 text-[#287B54]" /> {ACADEMY_INFO.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className={`transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-md py-2.5' 
            : 'bg-white border-b border-gray-200/90 shadow-xs py-3.5'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              {/* Logo */}
              <div className="shrink-0 flex items-center">
                <Logo lightMode={false} />
              </div>

              {/* Desktop Navigation Links */}
              <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) => `
                      px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 whitespace-nowrap shrink-0
                      ${link.highlight 
                        ? 'text-[#174D3A] font-bold bg-[#287B54]/10 hover:bg-[#287B54]/20' 
                        : 'text-gray-700 hover:text-[#174D3A] hover:bg-gray-100'}
                      ${isActive ? 'text-white bg-[#174D3A] hover:text-white hover:bg-[#174D3A] font-bold shadow-xs' : ''}
                    `}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </nav>

              {/* Right Action: Apply / Enquire */}
              <div className="hidden sm:flex items-center gap-3 shrink-0">
                <Link
                  to="/admissions"
                  className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs bg-[#287B54] hover:bg-[#174D3A] text-white shadow-md hover:shadow-lg transition-all duration-300 border border-[#287B54]/20 whitespace-nowrap shrink-0"
                >
                  <span>Apply / Enquire</span>
                  <ChevronRight className="w-4 h-4 text-[#D2E635] group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              {/* Mobile Hamburger Button */}
              <div className="flex items-center gap-2 lg:hidden">
                <Link
                  to="/admissions"
                  className="px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-[#287B54] hover:bg-[#174D3A] text-white sm:hidden whitespace-nowrap"
                >
                  Apply
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors"
                  aria-label="Toggle Navigation Menu"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white border-l border-gray-200 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-gray-200">
                <Logo lightMode={false} size="sm" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Links */}
              <nav className="mt-6 flex flex-col space-y-1">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) => `
                    px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all flex items-center justify-between
                    ${isActive ? 'bg-[#174D3A] text-white font-bold' : 'text-gray-800 hover:bg-gray-100'}
                  `}
                >
                  <span>Home</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </NavLink>

                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) => `
                      px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all flex items-center justify-between
                      ${link.highlight ? 'text-[#174D3A] bg-[#287B54]/10 font-bold' : 'text-gray-800 hover:bg-gray-100'}
                      ${isActive ? 'bg-[#174D3A] text-white font-bold' : ''}
                    `}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </NavLink>
                ))}
              </nav>

              {/* Quick Contact & Admission CTA */}
              <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
                <Link
                  to="/admissions"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs bg-[#287B54] hover:bg-[#174D3A] text-white shadow-lg"
                >
                  <span>Apply for Assessment Trial</span>
                  <ChevronRight className="w-4 h-4 text-[#D2E635]" />
                </Link>

                <a
                  href={`https://wa.me/${ACADEMY_INFO.whatsapp}?text=Hello%20RBTA%20Team%2C%20I%20would%20like%20to%20enquire%20about%20tennis%20programs.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold text-[#174D3A] bg-gray-50 border border-gray-300 hover:bg-gray-100"
                >
                  <MessageSquare className="w-4 h-4 text-[#287B54]" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="pt-6 border-t border-gray-200 text-xs text-gray-500">
              <p className="font-semibold text-gray-900">Rohan Bopanna Tennis Academy</p>
              <p className="mt-1 text-[11px] leading-relaxed">Padukone-Dravid Centre for Sports Excellence, Bengaluru</p>
              <p className="mt-2 text-[#174D3A] font-mono font-semibold">{ACADEMY_INFO.phone}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
