'use client';

import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [isMounted, setIsMounted] = useState(false);
  const [hoverState, setHoverState] = useState<'default' | 'pointer' | 'text'>('default');
  const [isHidden, setIsHidden] = useState(false);

  // Outer circle (delayed spring)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Inner dot (faster spring or instant)
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  
  // Spring configurations (smooth and buttery)
  const springConfigOuter = { damping: 30, stiffness: 200, mass: 0.8 };
  const springConfigInner = { damping: 40, stiffness: 600, mass: 0.1 };
  
  const outerXSpring = useSpring(cursorX, springConfigOuter);
  const outerYSpring = useSpring(cursorY, springConfigOuter);
  
  const innerXSpring = useSpring(dotX, springConfigInner);
  const innerYSpring = useSpring(dotY, springConfigInner);

  useEffect(() => {
    setIsMounted(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      
      dotX.set(e.clientX - 4);
      dotY.set(e.clientY - 4);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const clickableTags = ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'];
      const isClickable = 
        clickableTags.includes(target.tagName) ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        window.getComputedStyle(target).cursor === 'pointer';

      // Check if it's text
      const cursorType = window.getComputedStyle(target).cursor;
      const isText = cursorType === 'text';
        
      if (isClickable) setHoverState('pointer');
      else if (isText) setHoverState('text');
      else setHoverState('default');
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
  }, [cursorX, cursorY, dotX, dotY]);

  if (!isMounted || (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)) {
    return null;
  }

  const variantsOuter = {
    default: {
      scale: 1,
      backgroundColor: 'rgba(255, 255, 255, 0)',
      border: '1px solid rgba(255, 255, 255, 0.5)',
      opacity: 1
    },
    pointer: {
      scale: 2,
      backgroundColor: 'rgba(255, 255, 255, 1)',
      border: '1px solid rgba(255, 255, 255, 1)',
      opacity: 1
    },
    text: {
      scale: 1.5,
      backgroundColor: 'rgba(255, 255, 255, 1)',
      border: '1px solid rgba(255, 255, 255, 1)',
      opacity: 1
    }
  };

  const variantsInner = {
    default: {
      scale: 1,
      opacity: 1,
    },
    pointer: {
      scale: 0,
      opacity: 0,
    },
    text: {
      scale: 0,
      opacity: 0,
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}} />
      
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[10000] flex items-center justify-center mix-blend-difference box-border"
        style={{
          x: outerXSpring,
          y: outerYSpring,
        }}
        variants={variantsOuter}
        initial="default"
        animate={isHidden ? { opacity: 0 } : hoverState}
        transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
      />
      
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[10001] mix-blend-difference"
        style={{
          x: innerXSpring,
          y: innerYSpring,
        }}
        variants={variantsInner}
        initial="default"
        animate={isHidden ? { opacity: 0 } : hoverState}
        transition={{ type: "spring", stiffness: 500, damping: 25, mass: 0.1 }}
      />
    </>
  );
}
