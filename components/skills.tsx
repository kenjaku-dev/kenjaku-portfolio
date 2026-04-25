'use client';

import { motion } from 'motion/react';
import { LayoutTemplate, Server, Wrench, Code2, Database, Cloud } from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: <LayoutTemplate className="w-5 h-5 text-indigo-400" />,
    skills: [
      { name: 'TypeScript', level: '100%' },
      { name: 'React', level: '95%' },
      { name: 'Next.js', level: '95%' },
      { name: 'Tailwind CSS', level: '90%' },
      { name: 'Framer Motion', level: '85%' },
    ]
  },
  {
    title: 'Backend Systems',
    icon: <Server className="w-5 h-5 text-indigo-400" />,
    skills: [
      { name: 'Node.js', level: '90%' },
      { name: 'PostgreSQL', level: '85%' },
      { name: 'GraphQL', level: '80%' },
      { name: 'Go', level: '75%' },
      { name: 'Redis', level: '80%' },
    ]
  },
  {
    title: 'DevOps & Tools',
    icon: <Wrench className="w-5 h-5 text-indigo-400" />,
    skills: [
      { name: 'Git & GitHub', level: '95%' },
      { name: 'Docker', level: '85%' },
      { name: 'AWS', level: '70%' },
      { name: 'Vercel', level: '90%' },
      { name: 'Linux', level: '85%' },
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 relative border-t border-white/5 bg-[#0A0A0A]">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] right-[10%] w-[30rem] h-[30rem] bg-indigo-500/5 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase mb-6"
          >
            Technical Arsenal.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/50 text-lg leading-relaxed max-w-2xl"
          >
            A curated stack of tools and technologies I use to architect robust, scalable, and beautifully crafted applications.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-8 rounded-2xl border border-white/10 bg-white/5 flex flex-col group hover:border-[#4F46E5]/30 transition-colors"
            >
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/5">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#4F46E5]/20 transition-all duration-500">
                  {category.icon}
                </div>
                <h3 className="font-bold uppercase text-xs tracking-widest text-white">{category.title}</h3>
              </div>

              <div className="flex flex-col gap-6">
                {category.skills.map((skill, skillIdx) => (
                  <div key={skillIdx} className="group/skill">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs uppercase tracking-wider font-bold text-white/70 group-hover/skill:text-white transition-colors">{skill.name}</span>
                      <span className="text-[10px] text-[#4F46E5] font-bold tracking-widest">{skill.level}</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: skill.level }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, delay: 0.3 + (skillIdx * 0.1), ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-indigo-600 to-[#4F46E5] rounded-full relative"
                      >
                         <div className="absolute top-0 right-0 w-4 h-full bg-white/30 blur-[2px]" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
