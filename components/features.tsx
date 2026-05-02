'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import React, { ReactNode } from 'react';
import { Terminal, Layout,  Zap, Shield, Github, Code2 } from 'lucide-react';

function TiltCard({ children, className }: { children: ReactNode, className: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

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
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      className={`perspective-[1000px] w-full h-full ${className}`}
    >
      <div 
        className="w-full h-full transform-gpu transition-all duration-300" 
        style={{ transform: "translateZ(0px)" }}
      >
        {children}
      </div>
    </motion.div>
  );
}

const features = [
  {
    title: 'Frontend Architecture',
    description: 'Building scalable, maintainable component libraries and systems using React, Next.js, and TypeScript.',
    icon: <Layout className="w-6 h-6" />,
    className: 'md:col-span-2 md:row-span-2 bg-white/5',
  },
  {
    title: 'High Performance',
    description: 'Obsessed with Core Web Vitals, optimal rendering patterns, and achieving 100/100 Lighthouse scores.',
    icon: <Zap className="w-5 h-5" />,
    className: 'bg-white/5',
  },
  {
    title: 'Backend Systems',
    description: 'REST and GraphQL APIs built with Node.js, focused on speed and reliability.',
    icon: <Terminal className="w-5 h-5" />,
    className: 'bg-white/5',
  },
  {
    title: 'Secure by Design',
    description: 'Implementing best practices in authentication, authorization, and data protection.',
    icon: <Shield className="w-5 h-5" />,
    className: 'bg-emerald-500/20',
  },
  {
    title: 'Clean Code',
    description: 'Writing code that is readable, tested, and self-documenting. A joy for other devs to read.',
    icon: <Code2 className="w-5 h-5" />,
    className: 'md:col-span-2 bg-indigo-500/10',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 md:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
           <div className="max-w-2xl">
             <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.6 }}
               className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase mb-6"
             >
               My Expertise.
             </motion.h2>
             <motion.p 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.6, delay: 0.1 }}
               className="text-white/50 text-lg leading-relaxed"
             >
               Leveraging modern web technologies to build fast, secure, and highly interactive applications from the ground up.
             </motion.p>
           </div>
           
           <motion.a 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              href="https://github.com/kenjaku-dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-colors shrink-0"
            >
              <Github className="w-4 h-4" /> View 6+ Repositories
           </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4 md:h-[600px] perspective-[1000px]">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative ${feature.className.includes('md:col-span-2') ? 'md:col-span-2' : ''} ${feature.className.includes('md:row-span-2') ? 'md:row-span-2' : ''}`}
            >
              <TiltCard className="h-full w-full">
                <div className={`w-full h-full p-6 rounded-2xl border border-white/10 flex flex-col hover:border-[#4F46E5]/40 transition-colors group ${feature.className.replace(/md:col-span-2|md:row-span-2/g, '')} backdrop-blur-sm shadow-xl`}>
                  <div 
                    className="w-10 h-10 rounded-lg bg-[#4F46E5]/20 flex items-center justify-center text-[#4F46E5] mb-auto group-hover:scale-110 transition-transform duration-500"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    {feature.icon}
                  </div>
                  <div className="mt-8" style={{ transform: "translateZ(40px)" }}>
                    <h3 className="font-bold mb-2 uppercase text-xs tracking-wider text-white">{feature.title}</h3>
                    <p className="text-xs text-white/50 leading-relaxed group-hover:text-white/80 transition-colors">{feature.description}</p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
