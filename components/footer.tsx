'use client';

import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import { ArrowRight, Github, Twitter, Linkedin, Mail, MapPin } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const MarqueeItem = () => (
  <div className="flex items-center gap-16 shrink-0 pr-16 select-none">
    <span className="text-6xl md:text-[140px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white/[0.08] to-white/[0.01] uppercase leading-none">KENJAKU</span>
    <span className="text-6xl md:text-[140px] font-black tracking-tighter text-[#4F46E5]/20 uppercase leading-none">.DEV</span>
  </div>
);

function TimeDisplay() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Tokyo', hour12: false }) + ' JST');
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-xs font-mono text-white/50 bg-white/5 px-4 py-2 rounded-full border border-white/10">
      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      <span>{time || "LOADING..."}</span>
      <MapPin className="w-3 h-3 ml-1 text-[#4F46E5]" />
    </div>
  );
}

export default function Footer() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <footer id="contact" className="relative pt-32 pb-12 overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-[20%] left-[20%] w-[40rem] h-[40rem] bg-indigo-500/5 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute top-[10%] right-[10%] w-[20rem] h-[20rem] bg-pink-500/5 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      {/* Background Marquee */}
      <div className="absolute top-10 left-0 right-0 w-full overflow-hidden pointer-events-none -rotate-2 scale-110">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          className="flex whitespace-nowrap"
        >
          <MarqueeItem />
          <MarqueeItem />
          <MarqueeItem />
          <MarqueeItem />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 mt-40">
        
        {/* Pre-footer CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-24 md:mb-32 pb-24 md:pb-32 border-b border-white/5 relative group"
          onMouseMove={handleMouseMove}
        >
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  400px circle at ${mouseX}px ${mouseY}px,
                  rgba(79, 70, 229, 0.15),
                  transparent 80%
                )
              `,
            }}
          />
          <div className="relative z-10">
            <h2 className="text-6xl md:text-[100px] font-black tracking-tighter text-white mb-8 max-w-4xl leading-[0.85] uppercase">
              Let's build <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-purple-500">the future.</span>
            </h2>
            <div className="flex flex-col md:flex-row md:items-center gap-6 mt-12">
              <a href="mailto:kenjaku.dev@example.com" className="h-16 inline-flex items-center justify-center px-10 bg-white text-black font-bold uppercase text-xs tracking-widest transition-all shadow-xl shadow-white/10 gap-3 w-max relative overflow-hidden group/btn hover:scale-105 active:scale-95 rounded-full">
                <span className="absolute inset-0 bg-gradient-to-r from-[#4F46E5] to-purple-600 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-in-out" />
                <span className="relative z-10 flex items-center gap-3 group-hover/btn:text-white transition-colors duration-300">
                  Get in touch
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </span>
              </a>
              <div className="flex flex-col gap-2">
                <p className="text-white/50 text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Available for freelance opportunities
                </p>
                <TimeDisplay />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 relative z-10">
          <div>
            <div className="text-3xl font-bold tracking-tighter text-white flex items-center gap-1 mb-6 uppercase group w-fit cursor-pointer">
               KENJAKU<span className="text-[#4F46E5] group-hover:text-purple-500 transition-colors">.DEV</span>
            </div>
            <p className="text-white/40 max-w-sm text-sm leading-relaxed font-mono">
              // DESIGN ENGINEER
              <br />
              // CREATIVE DEVELOPER
              <br />
              // SYSTEMS ARCHITECT
            </p>
          </div>
          
          <div className="flex flex-col md:items-end gap-12 md:gap-0">
            <div className="flex flex-col gap-6 md:text-right">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 mb-2">Connect</h4>
              <a href="https://github.com/kenjaku-dev" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors flex items-center md:justify-end gap-3 group">
                <span className="relative overflow-hidden inline-flex">
                  <span className="translate-y-0 group-hover:-translate-y-full transition-transform duration-300">GitHub</span>
                  <span className="absolute translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-[#4F46E5]">GitHub</span>
                </span>
                <Github className="w-4 h-4 text-[#4F46E5] group-hover:scale-125 transition-transform" />
              </a>
              <a href="#" className="text-xs uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors flex items-center md:justify-end gap-3 group">
                <span className="relative overflow-hidden inline-flex">
                  <span className="translate-y-0 group-hover:-translate-y-full transition-transform duration-300">Twitter</span>
                  <span className="absolute translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-[#4F46E5]">Twitter</span>
                </span>
                <Twitter className="w-4 h-4 text-[#4F46E5] group-hover:scale-125 transition-transform" />
              </a>
              <a href="#" className="text-xs uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors flex items-center md:justify-end gap-3 group">
                <span className="relative overflow-hidden inline-flex">
                  <span className="translate-y-0 group-hover:-translate-y-full transition-transform duration-300">LinkedIn</span>
                  <span className="absolute translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-[#4F46E5]">LinkedIn</span>
                </span>
                <Linkedin className="w-4 h-4 text-[#4F46E5] group-hover:scale-125 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10 text-center md:text-left relative z-10">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">
            © {new Date().getFullYear()} kenjaku-dev. <span className="hidden sm:inline">All rights reserved.</span>
          </p>
          <div className="flex items-center justify-center flex-wrap gap-8">
            <a href="#" className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold hover:text-white transition-colors">Terms</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
