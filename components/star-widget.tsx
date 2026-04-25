'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Star } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function StarWidget() {
  const [stars, setStars] = useState(842); // Base cool number
  const [hasStarred, setHasStarred] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    // Check local storage so the star persists locally
    const stored = localStorage.getItem('kenjaku_starred');
    if (stored) {
      setHasStarred(true);
      setStars(843);
    }
  }, []);

  const handleStar = () => {
    if (hasStarred) return;
    setHasStarred(true);
    setStars(843);
    setShowParticles(true);
    localStorage.setItem('kenjaku_starred', 'true');
    setTimeout(() => setShowParticles(false), 1000); // cleanup particles
  };

  return (
    <motion.button 
      onClick={handleStar}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 3.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed bottom-8 left-8 z-50 flex items-center gap-3 px-5 py-3 rounded-full backdrop-blur-md border shadow-2xl transition-all duration-500 origin-bottom-left group ${
        hasStarred 
          ? 'bg-[#4F46E5]/10 border-[#4F46E5]/30 shadow-indigo-500/20' 
          : 'bg-[#0A0A0A]/90 border-white/10 hover:border-yellow-500/50 hover:shadow-yellow-500/10 cursor-pointer'
      }`}
      aria-label="Star this portfolio"
    >
      <div className="relative flex items-center justify-center">
        {hasStarred && (
           <div className="absolute inset-0 bg-[#4F46E5] blur-md opacity-40" />
        )}
        <Star 
          className={`w-5 h-5 transition-all duration-500 relative z-10 ${
            hasStarred 
              ? 'text-[#4F46E5] fill-[#4F46E5]' 
              : 'text-white/50 group-hover:text-yellow-500 group-hover:fill-yellow-500 group-hover:rotate-[72deg]'
          }`} 
        />
        {/* Explosion Particles */}
        <AnimatePresence>
          {showParticles && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                  animate={{ 
                    scale: [0, 1.5, 0], 
                    x: Math.cos(i * 60 * (Math.PI / 180)) * 40, 
                    y: Math.sin(i * 60 * (Math.PI / 180)) * 40,
                    opacity: [1, 1, 0]
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute w-1.5 h-1.5 bg-[#4F46E5] rounded-full pointer-events-none"
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-col items-start">
        <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors leading-none mb-1 ${
          hasStarred ? 'text-[#4F46E5]' : 'text-white/50'
        }`}>
          {hasStarred ? 'Starred!' : 'Star Me'}
        </span>
        <span className={`text-xs font-bold uppercase tracking-widest transition-colors leading-none ${
          hasStarred ? 'text-white' : 'text-white/80'
        }`}>
          {stars.toLocaleString()}
        </span>
      </div>
    </motion.button>
  );
}
