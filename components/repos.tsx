'use client';

import { motion } from 'motion/react';
import { Star, ArrowUpRight, Github, Code2, GitFork } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  forks_count: number;
}

export default function Repos() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch('https://api.github.com/users/kenjaku-dev/repos?sort=updated&per_page=6');
        if (res.ok) {
          const data = await res.json();
          // Filter out forks if preferred, or just take the top ones
          setRepos(data.slice(0, 6)); 
        } else {
          setRepos(getFallbackRepos());
        }
      } catch (error) {
        setRepos(getFallbackRepos());
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  function getFallbackRepos() {
    return [
      { id: 1, name: 'kenjaku-ui', description: 'A minimal, accessible component library based on Tailwind CSS and Radix UI primitives.', html_url: '#', stargazers_count: 142, forks_count: 12, language: 'TypeScript' },
      { id: 2, name: 'nexus-engine', description: 'High-performance Go backend for distributed systems.', html_url: '#', stargazers_count: 89, forks_count: 5, language: 'Go' },
      { id: 3, name: 'dotfiles', description: 'My personal macOS development environment configuration.', html_url: '#', stargazers_count: 45, forks_count: 3, language: 'Shell' },
      { id: 4, name: 'next-boilerplate', description: 'Enterprise-grade Next.js boilerplate with Prisma, tRPC, and Tailwind.', html_url: '#', stargazers_count: 210, forks_count: 40, language: 'TypeScript' }
    ];
  }

  return (
    <section id="projects" className="py-24 md:py-32 relative border-t border-white/5 bg-[#0A0A0A]">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[30%] -left-[10%] w-[30rem] h-[30rem] bg-[#4F46E5]/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h2 className="text-4xl md:text-6xl lg:text-[80px] font-black tracking-tighter text-white uppercase mb-6 leading-[0.85]">
              Open Source <br />
              <span className="text-white/30">Repositories.</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed max-w-xl">
              Explore my latest work on GitHub. From robust backend engines to polished frontend libraries.
            </p>
          </motion.div>
          
          <motion.a 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            href="https://github.com/kenjaku-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="h-14 shrink-0 flex items-center px-8 border border-white/10 text-white font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all gap-3"
          >
            <Github className="w-4 h-4" /> All Repositories
          </motion.a>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-[280px] bg-white/5 border border-white/10 rounded-2xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {repos.map((repo, idx) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group p-8 bg-gradient-to-b from-white/5 to-white/0 border border-white/10 rounded-2xl hover:border-white/20 hover:bg-white/5 transition-all relative flex flex-col min-h-[280px]"
              >
                <div className="absolute top-8 right-8 text-white/20 group-hover:text-white transition-colors duration-300">
                  <ArrowUpRight className="w-6 h-6 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#4F46E5]/20 flex items-center justify-center text-[#4F46E5]">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-white mb-1 group-hover:text-[#4F46E5] transition-colors">{repo.name}</h3>
                </div>
                
                <p className="text-white/50 text-base leading-relaxed mb-8 flex-grow">
                  {repo.description || 'A mysterious repository without a description. Dive into the code to find out more.'}
                </p>
                
                <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-white/40">
                  {repo.language && (
                    <div className="flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-[#4F46E5]"></span>
                       {repo.language}
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5" />
                    {repo.stargazers_count}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GitFork className="w-3.5 h-3.5" />
                    {repo.forks_count || 0}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
