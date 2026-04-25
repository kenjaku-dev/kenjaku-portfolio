'use client';

import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Omega brought entirely new perspectives to our architecture. The attention to detail in both UI and backend execution is unmatched.",
    name: "Alex Rivera",
    role: "Engineering Manager",
  },
  {
    quote: "Meticulous, fast, and incredibly reliable. Transformed our clunky MVP into a buttery smooth experience in a matter of weeks.",
    name: "Sarah Chen",
    role: "Startup Founder",
  },
  {
    quote: "A rare breed of developer who understands deep technical constraints without compromising design aesthetics.",
    name: "Johannes Bauer",
    role: "Lead Designer",
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-[#0A0A0A] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-6 uppercase">Colleague Feedback</h2>
          <p className="text-white/50 text-sm">What engineers, designers, and managers say about working with me.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 * idx }}
              className="p-8 bg-gradient-to-br from-[#4F46E5]/20 to-transparent border border-indigo-500/20 rounded-2xl relative overflow-hidden flex flex-col"
            >
              <div className="absolute -right-4 -top-4 opacity-5">
                 <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017C10.4647 13 10.017 12.5523 10.017 12V9C10.017 7.34315 11.3601 6 13.017 6H19.017C20.6738 6 22.017 7.34315 22.017 9V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM3 21L3 18C3 16.8954 3.89543 16 5 16H8C8.55228 16 9 15.5523 9 15V9C9 8.44772 8.55228 8 8 8H4C3.44772 8 3 8.44772 3 9V12C3 12.5523 2.55228 13 2 13H0L0 12V9C0 7.34315 1.34315 6 3 6H8C9.65685 6 11 7.34315 11 9V15C11 18.3137 8.3137 21 5 21H3Z" /></svg>
              </div>
              <p className="italic text-white/80 mb-8 text-sm font-serif leading-relaxed relative z-10 flex-grow">"{t.quote}"</p>
              
              <div className="flex items-center gap-3 relative z-10 w-full mt-auto">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/40">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white">{t.name}</h4>
                  <p className="text-[10px] text-[#4F46E5] uppercase font-bold">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
