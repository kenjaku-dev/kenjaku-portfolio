'use client';

import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl"
    >
      <div className={`flex items-center justify-between gap-6 px-4 md:px-6 py-3 rounded-full border transition-all duration-500 ${
        scrolled ? 'bg-[#0A0A0A]/90 border-white/10 backdrop-blur-xl shadow-2xl shadow-indigo-500/10' : 'bg-transparent border-transparent'
      }`}>
        <a href="#home" className="text-xl font-bold tracking-tighter text-white flex items-center gap-1 pl-2">
          KENJAKU<span className="text-[#4F46E5]">.DEV</span>
        </a>

        <div className="hidden md:flex absolute inset-0 pointer-events-none items-center justify-center">
          <nav className="flex items-center bg-white/5 border border-white/10 px-8 py-3 rounded-full shadow-lg backdrop-blur-md gap-8 text-[10px] uppercase tracking-widest font-bold text-white/50 pointer-events-auto">
            <a href="#home" className="hover:text-white transition-colors">Home</a>
            <a href="#features" className="hover:text-white transition-colors">Expertise</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Feedback</a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <a href="https://github.com/kenjaku-dev" target="_blank" rel="noopener noreferrer" className="p-2 text-white/60 hover:text-white transition-colors hidden sm:block">
            <Github className="w-5 h-5" />
          </a>
          <a href="#contact" className="h-10 px-6 bg-white text-black text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 rounded-full overflow-hidden relative group">
            <span className="relative z-10 flex items-center gap-2 transition-colors group-hover:text-white">Let's Talk <ExternalLink className="w-3.5 h-3.5" /></span>
            <div className="absolute inset-0 w-full h-full bg-[#4F46E5] scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </a>
        </div>
      </div>
    </motion.header>
  );
}
