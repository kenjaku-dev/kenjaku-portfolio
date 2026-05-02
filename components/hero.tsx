'use client';

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowDownRight } from 'lucide-react';

export default function Hero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="home" className="relative min-h-[100svh] flex flex-col justify-center pt-20 overflow-hidden">
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[40rem] h-[40rem] bg-indigo-500/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[10%] right-[10%] w-[30rem] h-[30rem] bg-purple-500/10 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 pt-24 lg:pt-0">
        <div className="flex flex-col items-start gap-6 max-w-2xl xl:max-w-3xl shrink-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5, ease: "easeOut" }}
            className="text-[#4F46E5] font-mono text-sm tracking-[0.3em] uppercase"
          >
            Full Stack Architect
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-[80px] lg:text-[110px] leading-[0.85] font-black tracking-tighter mb-4"
          >
            CRAFTING<br />DIGITAL<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/50 to-white/10">
              LEGACIES.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.7, ease: "easeOut" }}
            className="max-w-md text-lg text-white/50 leading-relaxed"
          >
            Building high-performance applications with precision. Specializing in React, Node.js, and Cloud Infrastructure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.8, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-4 mt-10"
          >
            <a href="#features" className="h-14 flex items-center px-10 bg-[#4F46E5] text-white font-bold uppercase text-xs tracking-widest hover:-translate-y-1 transition-transform shadow-xl shadow-indigo-500/20">
              View Portfolio
            </a>
            <a href="#contact" className="h-14 flex items-center px-10 border border-white/10 text-white font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all">
              Let's Talk
            </a>
          </motion.div>
        </div>

        {/* Profile Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 2.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px] lg:flex-1 flex justify-center lg:justify-end perspective-[1000px]"
        >
          <motion.div 
            className="relative w-full aspect-square group"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d"
            }}
          >
            {/* Glow / Shadow behind */}
            <div 
              className="absolute inset-0 bg-gradient-to-tr from-[#4F46E5] to-indigo-900 rounded-3xl blur-[80px] opacity-20 group-hover:opacity-50 transition-opacity duration-700" 
              style={{ transform: "translateZ(-50px)" }} 
            />
            
            {/* Decorative expanded borders */}
            <div 
              className="absolute -inset-4 md:-inset-6 border border-white/5 rounded-3xl scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700 delay-100" 
              style={{ transform: "translateZ(-20px)" }} 
            />
            
            {/* Main Image Base */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A0A] shadow-2xl group-hover:shadow-[0_20px_50px_rgba(79,70,229,0.3)] transition-shadow duration-700" style={{ transform: "translateZ(0px)" }}>
              <img 
                src="https://github.com/kenjaku-dev.png" 
                alt="Kenjaku Dev"
                className="w-full h-full object-cover filter grayscale opacity-70 mix-blend-luminosity transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:mix-blend-normal group-hover:scale-110"
              />
              
              {/* Inner Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80 pointer-events-none" />
            </div>

            {/* Floating Availability Badge */}
            <div 
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 md:-left-10 md:translate-x-0 md:bottom-10 bg-[#0A0A0A] border border-white/10 px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 backdrop-blur-xl z-20 transition-all duration-500 delay-200"
              style={{ transform: "translateZ(50px)" }}
            >
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-white whitespace-nowrap">Available For Work</span>
            </div>
            
            {/* Tech Stack Badge */}
            <div 
              className="absolute -top-5 right-1/2 translate-x-1/2 md:-right-10 md:translate-x-0 md:top-10 bg-[#0A0A0A] border border-white/10 p-3 rounded-2xl shadow-2xl backdrop-blur-xl z-20 flex gap-3 mix-blend-screen overflow-hidden transition-all duration-500 delay-300"
              style={{ transform: "translateZ(60px)" }}
            >
               <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold text-white/50">TS</div>
               <div className="w-8 h-8 rounded-lg bg-[#4F46E5] flex items-center justify-center text-sm font-bold text-white relative overflow-hidden">
                 <div className="absolute inset-0 bg-white/20 animate-pulse" />
                 Ω
               </div>
            </div>
            
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative vertical line */}
      <motion.div 
        initial={{ height: 0 }}
        animate={{ height: "8rem" }}
        transition={{ duration: 1, delay: 3.3, ease: "easeInOut" }}
        className="absolute bottom-0 left-6 md:left-12 w-px bg-gradient-to-t from-white/20 to-transparent hidden md:block"
      />
    </section>
  );
}
