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

export default function Splash() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    // Prevent scrolling while splash is active
    document.body.style.overflow = 'hidden';
    
    const startTime = Date.now();
    const duration = 2000; // 2 seconds for progress

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

    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = '';
    }, 2800);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0, opacity: 1 }}
          exit={{ 
            y: "-100vh", 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex flex-col justify-between overflow-hidden p-6 md:p-12 text-white"
        >
          {/* Top Section */}
          <div className="w-full flex justify-between items-start font-mono text-xs md:text-sm tracking-widest uppercase text-white/50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              KENJAKU.DEV // 2026
            </motion.div>
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.4 }}
               className="text-right"
            >
              LOC: TOKYO<br/>
              LAT: 35.6762<br/>
              LNG: 139.6503
            </motion.div>
          </div>

          {/* Middle Section: Big Percentage */}
          <div className="flex-1 flex flex-col items-center justify-center">
             <div className="relative overflow-hidden">
               <motion.div 
                 className="text-[12vw] leading-none font-black tracking-tighter"
                 initial={{ y: '100%' }}
                 animate={{ y: 0 }}
                 transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                 style={{ fontVariantNumeric: 'tabular-nums' }}
               >
                 {progress}%
               </motion.div>
             </div>
             
             <div className="h-6 mt-4 overflow-hidden">
               <AnimatePresence mode="popLayout">
                 <motion.div
                    key={textIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-[#4F46E5] font-mono text-sm tracking-widest uppercase"
                 >
                   {LOADING_TEXTS[textIndex]}
                 </motion.div>
               </AnimatePresence>
             </div>
          </div>

          {/* Bottom Section: Progress Bar */}
          <motion.div 
            className="w-full flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex justify-between font-mono text-xs tracking-widest text-white/50">
              <span>SYSTEM BOOT</span>
              <span>{progress === 100 ? 'READY' : 'LOADING'}</span>
            </div>
            <div className="h-[2px] w-full bg-white/10 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 bottom-0 bg-[#4F46E5]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </motion.div>

          {/* Background Glow */}
          <div className="absolute inset-0 pointer-events-none z-[-1]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-indigo-500/5 rounded-full blur-[120px] mix-blend-screen" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
