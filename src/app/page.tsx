'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform, useInView, animate } from 'framer-motion';
import { 
  ArrowRight, Briefcase, TrendingUp, Target, 
  ShieldCheck, Sparkles, LayoutDashboard, Compass,
  BarChart2, FileText, User, Smartphone, Mail 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 font-sans">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/20 blur-[120px] rounded-full animate-pulse delay-700 opacity-50" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-8 py-6 md:py-8 max-w-7xl mx-auto backdrop-blur-sm">
        <div className="flex items-center gap-3 md:gap-3.5 group cursor-pointer shrink-0">
          <div className="w-9 h-9 md:w-10 md:h-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center shadow-lg shadow-primary/25 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
            <Compass className="w-5 md:w-5.5 h-5 md:h-5.5" />
          </div>
          <div className="flex flex-col -gap-1">
            <span className="text-xl md:text-2xl font-bold tracking-tighter font-display uppercase text-foreground">Vantage</span>
            <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.2em] text-primary/60 ml-0.5">By Naga</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/30 hidden md:block">Theme</span>
            <div className="scale-75 origin-right">
              <ThemeToggle />
            </div>
          </div>
          <Link href="/login" className="px-6 md:px-8 py-2.5 md:py-3 bg-foreground text-background rounded-full text-[10px] md:text-sm font-black uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-xl shadow-foreground/10 active:scale-95 group flex items-center gap-2 whitespace-nowrap">
            Sign in <ArrowRight className="w-3.5 md:w-4 h-3.5 md:h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-8 lg:pt-24 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 space-y-12 text-center lg:text-left"
            >
              <div>
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-10 backdrop-blur-md">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Job Application Tracker</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05] mb-10 font-display text-foreground">
                  Landing your dream <br />
                  <span className="text-primary italic">role</span> is now <br />
                  <span className="text-gradient">effortless.</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl mb-14 leading-relaxed mx-auto lg:mx-0">
                  Stop drowning in spreadsheets. Focus your job search with powerful insights and a beautifully designed dashboard.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                  <Link href="/login" className="w-full sm:w-auto px-12 py-5.5 bg-primary text-primary-foreground rounded-2xl text-lg font-black uppercase tracking-widest shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1.5 transition-all active:scale-95 flex items-center justify-center gap-4">
                  Get started <ArrowRight className="w-5.5 h-5.5" />
                  </Link>
                  <div className="flex items-center -space-x-3.5">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-11 h-11 rounded-full border-2 border-background bg-secondary flex items-center justify-center overflow-hidden shadow-premium">
                        <img src={`https://i.pravatar.cc/100?u=${i+10}`} alt="user" className="w-full h-full object-cover opacity-90 grayscale hover:grayscale-0 transition-all duration-300" />
                      </div>
                    ))}
                    <div className="pl-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Managing 2k+ Applications</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Hero Illustration (Right) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 relative group"
            >
               <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity duration-1000" />
               <motion.div 
                 animate={{ y: [0, -15, 0] }}
                 transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                 className="relative z-10 rounded-[2.5rem] p-0.5 overflow-hidden border border-border surface"
               >
                  <img 
                     src="/images/landing-hero.png" 
                     alt="Vantage Dashboard Visual" 
                     className="w-full h-auto rounded-[2.3rem] transition-transform duration-700 pointer-events-none block shadow-2xl shadow-black/20 dark:shadow-black"
                  />
               </motion.div>
               
               {/* Sharp Detail Badge */}
               <motion.div 
                  animate={{ x: [-5, 5, -5], y: [-5, 5, -5] }}
                  transition={{ duration: 8, repeat: Infinity }}
                  className="absolute -top-10 -left-10 w-28 h-28 glass border-border/50 rounded-2xl flex items-center justify-center shadow-premium-xl z-20 hidden lg:flex"
               >
                  <div className="text-center">
                    <p className="text-2xl font-bold font-display text-primary">+84%</p>
                    <p className="text-[7px] font-black text-muted-foreground/60 uppercase tracking-[0.25em] mt-1">Growth Speed</p>
                  </div>
               </motion.div>
            </motion.div>
          </div>
        </div>

        {/* 1. Social Proof Marquee */}
        <section className="relative z-20 border-y border-white/[0.06] bg-[#0a0a0f] py-5 overflow-hidden">
          <style jsx>{`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-scroll {
              display: flex;
              width: fit-content;
              animation: scroll 40s linear infinite;
            }
          `}</style>
          <div className="animate-scroll">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex shrink-0 items-center">
                <span className="mx-12 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
                  <span className="text-violet-500">⚡</span> 2,400+ Applications Tracked
                </span>
                <span className="mx-12 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
                  <span className="text-violet-500">🌍</span> Used in 40+ Countries
                </span>
                <span className="mx-12 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
                  <span className="text-violet-500">⭐</span> 4.9 Star Rating
                </span>
                <span className="mx-12 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
                  <span className="text-violet-500">🔒</span> 100% Private
                </span>
                <span className="mx-12 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
                  <span className="text-violet-500">🚀</span> Built for Speed
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Feature Bento Grid */}
        <section className="py-24 bg-[#0a0a0f]">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="mb-16 space-y-4"
            >
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-violet-500">Everything you need</h2>
              <h3 className="text-4xl font-bold text-white tracking-tight leading-tight">Focus on what matters.</h3>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.08
                  }
                }
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {/* Application Tracking */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
                }}
                className="md:col-span-2 md:row-span-2 group bg-[#111118] border border-white/[0.06] rounded-2xl p-8 hover:border-violet-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-300 flex flex-col justify-between min-h-[480px]"
              >
                <div className="space-y-6">
                  <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center border border-violet-500/20 group-hover:scale-110 transition-transform">
                    <Briefcase className="w-6 h-6 text-violet-500" />
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-2xl font-bold text-white tracking-tight">Application Tracking</h4>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-sm">Organize your search with a high-fidelity interface modeled after elite CRM tools.</p>
                  </div>
                </div>
                
                <div className="space-y-3 bg-black/40 p-5 rounded-2xl border border-white/[0.04] backdrop-blur-3xl">
                  {[
                    { company: 'Linear', role: 'Staff Engineer', status: 'Interview', color: 'text-amber-500 bg-amber-500/10' },
                    { company: 'Vercel', role: 'Frontend Lead', status: 'Offer', color: 'text-green-500 bg-green-500/10' },
                    { company: 'Ramp', role: 'Product Designer', status: 'Applied', color: 'text-indigo-500 bg-indigo-500/10' },
                  ].map((job, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-0">
                      <div className="flex gap-3 items-center">
                        <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.05]" />
                        <div>
                          <p className="text-xs font-bold text-white">{job.company}</p>
                          <p className="text-[10px] text-slate-500 font-medium">{job.role}</p>
                        </div>
                      </div>
                      <span className={cn("text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border border-white/[0.04]", job.color)}>
                        {job.status}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Analytics */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
                }}
                className="group bg-[#111118] border border-white/[0.06] rounded-2xl p-8 hover:border-violet-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center border border-violet-500/20 group-hover:scale-110 transition-transform">
                    <BarChart2 className="w-6 h-6 text-violet-500" />
                  </div>
                  <h4 className="text-xl font-bold text-white tracking-tight">Analytics</h4>
                </div>
                <div className="h-24 w-full flex items-end gap-1.5 px-1 mt-8">
                  {[40, 70, 45, 90, 65, 80, 50, 85].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      transition={{ delay: 0.5 + (i * 0.05), duration: 0.8 }}
                      className="flex-1 bg-violet-500/40 rounded-t-lg group-hover:bg-violet-500 transition-colors"
                    />
                  ))}
                </div>
              </motion.div>

              {/* Document Hub */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
                }}
                className="group bg-[#111118] border border-white/[0.06] rounded-2xl p-8 hover:border-violet-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center border border-violet-500/20 group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6 text-violet-500" />
                  </div>
                  <h4 className="text-xl font-bold text-white tracking-tight">Document Hub</h4>
                </div>
                <div className="flex flex-col gap-2 mt-8">
                  <span className="px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-[10px] font-bold text-slate-400 flex items-center justify-between group-hover:border-violet-500/20 transition-colors">
                    resume_v4.pdf <span className="text-[8px] text-violet-500">2.4MB</span>
                  </span>
                  <span className="px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-[10px] font-bold text-slate-400 flex items-center justify-between group-hover:border-violet-500/20 transition-colors">
                    portfolio_2024.pdf <span className="text-[8px] text-violet-500">4.1MB</span>
                  </span>
                </div>
              </motion.div>

              {/* Identity Console */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
                }}
                className="group bg-[#111118] border border-white/[0.06] rounded-2xl p-8 hover:border-violet-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center border border-violet-500/20 group-hover:scale-110 transition-transform">
                    <User className="w-6 h-6 text-violet-500" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold text-white tracking-tight">Identity Console</h4>
                    <p className="text-violet-400 text-[10px] font-black uppercase tracking-widest">$120k – $150k Target</p>
                  </div>
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed mt-4 italic font-medium">"Senior UX Engineer focused on high-performance design systems and interaction engineering..."</p>
              </motion.div>

              {/* Mobile Optimized */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
                }}
                className="md:col-span-2 group bg-[#111118] border border-white/[0.06] rounded-2xl p-8 hover:border-violet-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-300 flex items-center justify-between"
              >
                <div className="space-y-6">
                  <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center border border-violet-500/20 group-hover:scale-110 transition-transform">
                    <Smartphone className="w-6 h-6 text-violet-500" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-white tracking-tight">Mobile Optimized</h4>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-sm">A hand-crafted mobile experience with gesture-driven navigation and zero-latency interactions.</p>
                  </div>
                </div>
                <div className="hidden sm:block h-36 w-24 border-[3px] border-white/[0.08] rounded-[2rem] relative bg-black rotate-6 group-hover:rotate-0 transition-transform duration-700 shrink-0">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white/[0.05] rounded-full" />
                  <div className="mt-8 px-2.5 space-y-2">
                    <div className="h-4 w-full bg-violet-500/20 rounded-lg" />
                    <div className="h-2 w-3/4 bg-white/[0.05] rounded-full" />
                    <div className="h-2 w-1/2 bg-white/[0.05] rounded-full" />
                    <div className="h-10 w-full bg-white/[0.02] rounded-xl mt-4 border border-white/[0.04]" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 3. Animated Stats Row */}
        <section className="border-y border-white/[0.06] py-24 bg-[#0a0a0f]">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            <StatBlock value={2400} label="Applications Tracked" icon={Briefcase} suffix="+" />
            <StatBlock value={94} label="Interviews Landed" icon={TrendingUp} suffix="k+" />
            <StatBlock value={3} label="Faster Job Search" icon={Sparkles} suffix="×" />
          </div>
        </section>

        {/* 4. How It Works — Horizontal Timeline */}
        <section className="py-24 bg-[#0a0a0f]">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-center mb-24"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Three steps to your next role</h2>
            </motion.div>

            <div className="relative">
              {/* Connector Line */}
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
                className="absolute top-5 left-[15%] right-[15%] h-[1px] border-t border-dashed border-violet-500/30 origin-left hidden md:block"
              />

              <motion.div 
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.2 } }
                }}
                className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10"
              >
                {[
                  { title: 'Add Your Applications', desc: 'Connect your professional email or manually log any role you’ve pursued.' },
                  { title: 'Track Every Stage', desc: 'Monitor your progress through Screening, Technical, and Executive rounds.' },
                  { title: 'Land the Offer', desc: 'Review performance insights and close your next deal with confidence.' },
                ].map((step, i) => (
                  <motion.div 
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
                    }}
                    className="text-center space-y-6 px-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-violet-600 text-white font-bold flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(124,58,237,0.4)] relative z-20">
                      {i + 1}
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-xl font-bold text-white tracking-tight">{step.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed mx-auto max-w-[260px] font-medium">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* 5. CTA Banner */}
        <section className="py-32 bg-gradient-to-br from-violet-950 via-[#0a0a0f] to-indigo-950">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="space-y-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.1]">
                Your next role is one <br className="hidden md:block" /> dashboard away.
              </h2>
              <CTASubscription />
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] px-8 py-20 bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-6 group">
            <div className="w-12 h-12 bg-white text-[#0a0a0f] rounded-2xl flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform duration-500">
              <Compass className="w-6 h-6" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="font-bold tracking-tighter text-2xl uppercase text-white">Vantage</h2>
              <p className="text-slate-500 font-medium text-[10px] tracking-[0.3em] uppercase">By Naga • Build your legacy.</p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">
            <a href="#" className="hover:text-violet-500 transition-all">Privacy</a>
            <a href="#" className="hover:text-violet-500 transition-all">Terms</a>
            <a href="#" className="hover:text-violet-500 transition-all">Support</a>
          </div>

          <div className="pt-8 border-t border-white/[0.03] w-full text-center">
            <p className="text-[9px] font-bold text-slate-800 uppercase tracking-[0.4em]">
              © 2024 Vantage • Handcrafted with love
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatBlock({ value, label, icon: Icon, suffix = "" }: { value: number, label: string, icon: any, suffix?: string }) {
  const count = useMotionValue(0);
  const springValue = useSpring(count, { stiffness: 60, damping: 20 });
  const displayValue = useTransform(springValue, (current) => Math.round(current));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      animate(count, value, { duration: 2, ease: "easeOut" });
    }
  }, [isInView, value, count]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="text-center space-y-6"
    >
      <Icon className="w-6 h-6 text-violet-400 mx-auto" />
      <div className="space-y-1">
        <div className="text-6xl md:text-7xl font-bold text-white tracking-tighter tabular-nums">
          <motion.span>{displayValue}</motion.span>{suffix}
        </div>
        <p className="text-slate-500 text-[10px] font-black tracking-[0.3em] uppercase">{label}</p>
      </div>
    </motion.div>
  );
}

function CTASubscription() {
  const [email, setEmail] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  const handleSubscribe = () => {
    if (!email) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="max-w-md mx-auto w-full relative">
      <motion.div 
        animate={isShaking ? { x: [-4, 4, -4, 4, -4, 4, 0] } : {}}
        className="flex flex-col sm:flex-row gap-3"
      >
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your professional email" 
          className="flex-1 bg-white/5 border border-white/10 rounded-full px-8 py-4.5 text-white placeholder:text-slate-500 outline-none focus:border-violet-500 transition-all font-medium text-sm text-center sm:text-left"
        />
        <button 
          onClick={handleSubscribe}
          className="bg-violet-600 hover:bg-violet-500 rounded-full px-10 py-4.5 text-white font-bold text-xs tracking-[0.2em] uppercase transition-all shadow-xl shadow-violet-600/20 active:scale-95 whitespace-nowrap"
        >
          Sign Up
        </button>
      </motion.div>
    </div>
  );
}
