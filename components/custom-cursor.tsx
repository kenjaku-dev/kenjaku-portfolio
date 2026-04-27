'use client';

import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsMounted(true);
    
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if it's an interactive element
      const isClickable = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        window.getComputedStyle(target).cursor === 'pointer';
        
      setIsHovered(isClickable);
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  // Prevent rendering on SSR or on touch devices
  if (!isMounted || (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)) {
    return null;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}} />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[10000] flex items-center justify-center mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          opacity: isHidden ? 0 : 1,
          scale: isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)',
          border: isHovered ? '1px solid transparent' : '1px solid rgba(255, 255, 255, 1)'
        }}
        transition={{ duration: 0.15 }}
      >
        <motion.div 
          className="w-1.5 h-1.5 bg-white rounded-full transition-opacity duration-150"
          animate={{ opacity: isHovered ? 0 : 1 }}
        />
      </motion.div>
    </>
  );
}
