'use client';

import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#features', label: 'Expertise' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 2.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4"
    >
      <div 
        className={`pointer-events-auto flex items-center justify-between gap-2 md:gap-4 p-2 rounded-full transition-all duration-500 w-full max-w-5xl ${
          scrolled ? 'bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl shadow-indigo-500/10' : 'bg-transparent border border-transparent'
        }`}
      >
        {/* Logo Area */}
        <a 
          href="#home" 
          className="flex h-12 items-center px-6 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
        >
          <span className="text-lg font-black tracking-tighter text-white flex items-center">
             KENJAKU<span className="text-[#4F46E5] drop-shadow-[0_0_8px_rgba(79,70,229,0.5)]">.DEV</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex h-12 items-center px-4 rounded-full bg-white/5 border border-white/5 gap-1">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.label}
              href={link.href} 
              className="relative px-5 py-2 text-[10px] uppercase tracking-[0.2em] font-bold text-white/50 hover:text-white transition-colors overflow-hidden group"
            >
              <span className="relative z-10">{link.label}</span>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#4F46E5] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex h-12 items-center rounded-full bg-white/5 border border-white/5 p-1">
          <a 
            href="https://github.com/kenjaku-dev" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="h-10 w-10 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all hidden sm:flex"
          >
            <Github className="w-4 h-4" />
          </a>
          <a 
            href="#contact" 
            className="h-10 px-6 bg-white text-black text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 rounded-full overflow-hidden relative group ml-1"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#4F46E5] to-indigo-500 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            <span className="relative z-10 flex items-center gap-2 transition-colors group-hover:text-white">
              Let's Talk <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </a>
          {/* Mobile Menu Button */}
          <button 
            className="h-10 w-10 flex md:hidden items-center justify-center rounded-full text-white hover:bg-white/10 ml-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-24 left-4 right-4 p-4 rounded-3xl bg-[#0A0A0A]/95 border border-white/10 backdrop-blur-2xl shadow-2xl pointer-events-auto flex flex-col gap-2 md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a 
                key={link.label}
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-xs uppercase tracking-widest font-bold text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
