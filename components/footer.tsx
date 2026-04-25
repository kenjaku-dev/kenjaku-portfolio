'use client';

import { motion } from 'motion/react';
import { ArrowRight, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import React from 'react';

const MarqueeItem = () => (
  <div className="flex items-center gap-16 shrink-0 pr-16 select-none">
    <span className="text-6xl md:text-[140px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white/[0.08] to-white/[0.01] uppercase leading-none">KENJAKU</span>
    <span className="text-6xl md:text-[140px] font-black tracking-tighter text-[#4F46E5]/20 uppercase leading-none">.DEV</span>
  </div>
);

export default function Footer() {
  return (
    <footer id="contact" className="relative pt-32 pb-12 overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-[20%] left-[20%] w-[40rem] h-[40rem] bg-indigo-500/5 rounded-full blur-[120px] mix-blend-screen" />
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
          className="mb-24 md:mb-32 pb-24 md:pb-32 border-b border-white/5"
        >
          <h2 className="text-6xl md:text-[100px] font-black tracking-tighter text-white mb-8 max-w-4xl leading-[0.85] uppercase">
            Let's build <br /><span className="text-white/30">the future.</span>
          </h2>
          <div className="flex flex-col md:flex-row md:items-center gap-6 mt-12">
            <a href="mailto:kenjaku.dev@example.com" className="h-16 inline-flex items-center justify-center px-10 bg-[#4F46E5] text-white font-bold uppercase text-xs tracking-widest transition-all shadow-xl shadow-indigo-500/20 gap-3 w-max relative overflow-hidden group">
              <span className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              <span className="relative z-10 flex items-center gap-3">
                Get in touch
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            <p className="text-white/50 text-xs uppercase tracking-widest font-bold">Available for freelance opportunities</p>
          </div>
        </motion.div>

        {/* Footer Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="text-3xl font-bold tracking-tighter text-white flex items-center gap-1 mb-6 uppercase">
               KENJAKU<span className="text-[#4F46E5]">.DEV</span>
            </div>
            <p className="text-white/40 max-w-sm text-sm leading-relaxed">
              Crafting high-performance digital experiences through minimal design and robust engineering. 
            </p>
          </div>
          
          <div className="flex flex-col md:items-end gap-12 md:gap-0">
            <div className="flex flex-col gap-6 md:text-right">
              <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-2">Social Profiles</h4>
              <a href="https://github.com/kenjaku-dev" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors flex items-center md:justify-end gap-3 group">
                GitHub <Github className="w-4 h-4 text-[#4F46E5] group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="text-xs uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors flex items-center md:justify-end gap-3 group">
                Twitter <Twitter className="w-4 h-4 text-[#4F46E5] group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="text-xs uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors flex items-center md:justify-end gap-3 group">
                LinkedIn <Linkedin className="w-4 h-4 text-[#4F46E5] group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5 text-center md:text-left">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">© {new Date().getFullYear()} kenjaku-dev. All rights reserved.</p>
          <div className="flex items-center justify-center flex-wrap gap-8">
            <a href="#" className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold hover:text-[#4F46E5] transition-colors">Privacy Policy</a>
            <a href="#" className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold hover:text-[#4F46E5] transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
