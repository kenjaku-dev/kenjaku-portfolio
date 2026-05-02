'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

const LOADING_TEXTS = [
  "INITIALIZING KERNEL...",
  "LOADING ASSETS...",
  "ESTABLISHING SECURE CONNECTION...",
  "COMPILING MODULES...",
  "SYSTEM OPTIMAL."
];

const LOGS = [
  "Mounting core layout...",
  "Injecting dependencies...",
  "Warming up React cache...",
  "Compiling shaders...",
  "Resolving three.js models...",
  "Hydrating interactive nodes...",
  "Establishing secure WebSocket...",
  "Fetching localization data...",
  "Analyzing viewport dimensions...",
  "Scaling responsive assets...",
  "Optimizing font delivery...",
  "Bootstrapping animation engine...",
];

export default function Splash() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [activeLogs, setActiveLogs] = useState<string[]>([]);

  useEffect(() => {
    // Prevent scrolling while splash is active
    document.body.style.overflow = 'hidden';
    
    const startTime = Date.now();
    const duration = 2400;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(Math.floor(currentProgress));

      // Update text based on progress
      const currentTextIndex = Math.min(
        Math.floor((currentProgress / 100) * LOADING_TEXTS.length),
        LOADING_TEXTS.length - 1
      );
      setTextIndex(currentTextIndex);

      if (currentProgress < 100) {
        requestAnimationFrame(updateProgress);
      }
    };

    requestAnimationFrame(updateProgress);

    // Fast terminal logs
    const logInterval = setInterval(() => {
      setActiveLogs(prev => {
        const nextLog = LOGS[Math.floor(Math.random() * LOGS.length)];
        const newLogs = [...prev, `[${Date.now().toString().slice(-4)}] ${nextLog}`];
        if (newLogs.length > 8) newLogs.shift();
        return newLogs;
      });
    }, 150);

    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = '';
      clearInterval(logInterval);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(logInterval);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0, opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={{ 
            y: "-100vh", 
            opacity: 0,
            filter: "blur(20px)",
            scale: 1.1,
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col justify-between overflow-hidden p-6 md:p-12 text-white"
        >
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 pointer-events-none z-0 opacity-10" 
               style={{ 
                 backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                 backgroundSize: '4rem 4rem',
                 maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
               }} 
          />

          {/* Terminal Logs (Background) */}
          <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 font-mono text-[8px] md:text-10px leading-relaxed text-white/20 whitespace-nowrap z-0 pointer-events-none hidden sm:block">
            {activeLogs.map((log, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-1"
              >
                {log}
              </motion.div>
            ))}
          </div>

          {/* Top Section */}
          <div className="w-full flex justify-between items-start font-mono text-xs md:text-sm tracking-widest uppercase text-white/50 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="w-2 h-2 bg-[#4F46E5] animate-pulse rounded-sm" />
              KENJAKU.DEV // VERSION 4.2
            </motion.div>
            <motion.div
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
               className="text-right"
            >
              LOC: TOKYO<br/>
              LAT: 35.6762<br/>
              LNG: 139.6503
            </motion.div>
          </div>

          {/* Middle Section: Big Percentage */}
          <div className="flex-1 flex flex-col items-center justify-center relative z-10">
             <div className="relative overflow-visible">
               {/* Outline Text */}
               <motion.div 
                 className="text-[15vw] leading-none font-black tracking-tighter absolute inset-0 opacity-20"
                 style={{ WebkitTextStroke: '2px white', color: 'transparent', fontVariantNumeric: 'tabular-nums' }}
               >
                 {progress}%
               </motion.div>
               {/* Filled Text with Reveal */}
               <motion.div 
                 className="text-[15vw] leading-none font-black tracking-tighter mix-blend-difference"
                 style={{ fontVariantNumeric: 'tabular-nums' }}
               >
                 {progress}%
               </motion.div>
               
               <motion.div
                 className="absolute -inset-10 border border-[#4F46E5]/30 rounded-full"
                 animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               />
               <motion.div
                 className="absolute -inset-16 border border-white/10 rounded-full border-dashed"
                 animate={{ rotate: -360, scale: [1, 1.05, 1] }}
                 transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
               />
             </div>
             
             <div className="h-6 mt-16 overflow-hidden relative">
               <AnimatePresence mode="popLayout">
                 <motion.div
                    key={textIndex}
                    initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -20, opacity: 0, filter: "blur(5px)" }}
                    transition={{ duration: 0.3 }}
                    className="text-[#4F46E5] font-mono text-sm tracking-widest uppercase flex items-center gap-3"
                 >
                   <span className="opacity-50">[{textIndex + 1}/{LOADING_TEXTS.length}]</span>
                   {LOADING_TEXTS[textIndex]}
                 </motion.div>
               </AnimatePresence>
             </div>
          </div>

          {/* Bottom Section: Progress Bar */}
          <motion.div 
            className="w-full flex flex-col gap-4 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex justify-between font-mono text-[10px] tracking-widest text-white/50">
              <span>SYSTEM BOOT SEQUENCE</span>
              <span>{progress === 100 ? 'READY' : 'LOADING'}</span>
            </div>
            <div className="h-[1px] w-full bg-white/10 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#4F46E5] to-purple-500 shadow-[0_0_10px_rgba(79,70,229,0.8)]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </motion.div>

          {/* Background Glow */}
          <div className="absolute inset-0 pointer-events-none z-[-1] flex items-center justify-center">
            <motion.div 
              className="w-[40rem] h-[40rem] bg-indigo-500/10 rounded-full blur-[120px] mix-blend-screen"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
