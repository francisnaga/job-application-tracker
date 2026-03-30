'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, TrendingUp, Target, ShieldCheck, Sparkles, LayoutDashboard, Compass } from 'lucide-react';
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
            Sign In <ArrowRight className="w-3.5 md:w-4 h-3.5 md:h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 lg:pt-24 pb-32">
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
                   alt="Elite Career Dashboard Visual" 
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

        {/* Feature Bento Grid */}
        <div className="mt-40 grid grid-cols-1 md:grid-cols-12 gap-8 lg:h-[650px]">
          {/* Card 1: Dashboard Preview */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="md:col-span-8 surface bg-card group relative overflow-hidden flex flex-col justify-end p-12 lg:p-14 border-border/50 hover:border-primary/20 transition-all shadow-premium"
          >
             <div className="absolute top-0 right-0 w-3/4 h-3/4 opacity-10 pointer-events-none">
                <div className="w-full h-full border border-primary/30 rounded-tl-[100px] border-dashed animate-pulse ring-1 ring-primary/20" />
             </div>
             <div className="space-y-6 relative z-10">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 group-hover:rotate-6 transition-transform">
                   <LayoutDashboard className="w-8 h-8 text-primary shadow-glow" />
                </div>
                <h3 className="text-4xl font-bold tracking-tight text-foreground">Visual Dashboard</h3>
                <p className="text-muted-foreground text-xl max-w-sm leading-relaxed">View all your applications, interview stages, and notes perfectly organized.</p>
             </div>
          </motion.div>

          {/* Card 2: Metrics */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.1 }}
             className="md:col-span-4 surface p-12 lg:p-14 flex flex-col justify-between bg-primary/5 hover:bg-primary border-primary/10 hover:border-primary transition-all group shadow-premium"
          >
             <TrendingUp className="w-14 h-14 text-primary group-hover:text-primary-foreground transition-colors" />
             <div className="space-y-4">
                <p className="text-6xl font-bold tracking-tighter font-display text-foreground group-hover:text-primary-foreground transition-colors">94k+</p>
                <div className="space-y-1">
                   <p className="font-black uppercase tracking-[0.25em] text-[10px] text-primary group-hover:text-primary-foreground/80 transition-colors">Interviews Landed</p>
                   <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/50 transition-colors">Track your applications and land your dream job faster.</p>
                </div>
             </div>
          </motion.div>

          {/* Card 3: Security */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.2 }}
             className="md:col-span-5 surface p-12 lg:p-14 flex flex-col gap-10 bg-card border-border/50 shadow-premium"
          >
             <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center border border-green-500/20 shadow-glow">
                <ShieldCheck className="w-8 h-8 text-green-500" />
             </div>
             <div className="space-y-4">
                <h3 className="text-3xl font-bold tracking-tight text-foreground">Secure & Private</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">Your job search history is yours. We keep your data safe and private.</p>
             </div>
          </motion.div>

          {/* Card 4: Target */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.3 }}
             className="md:col-span-7 surface p-12 lg:p-14 group border-border/50 flex items-center justify-between shadow-premium bg-gradient-to-br from-card to-background"
          >
             <div className="max-w-xs space-y-6">
                <h3 className="text-3xl font-bold tracking-tight text-foreground">Never Forget</h3>
                 <p className="text-muted-foreground text-lg leading-relaxed">Keep track of every follow-up date and interview block.</p>
             </div>
             <div className="w-32 h-32 rounded-full border-2 border-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:border-primary/50 transition-all duration-700 bg-primary/5">
                <Target className="w-12 h-12 text-primary animate-pulse shadow-glow" />
             </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/10 px-8 py-20 bg-background/50 backdrop-blur-xl mt-32">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-6 group">
             <div className="w-12 h-12 bg-foreground text-background rounded-2xl flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform duration-500">
               <Compass className="w-6 h-6" />
             </div>
             <div className="text-center space-y-2">
               <h2 className="font-bold tracking-tighter text-2xl uppercase text-foreground">Vantage</h2>
               <p className="text-muted-foreground font-medium text-[10px] tracking-[0.3em] uppercase">By Naga • Build your legacy.</p>
             </div>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">
            <a href="#" className="hover:text-primary transition-all">Privacy</a>
            <a href="#" className="hover:text-primary transition-all">Terms</a>
            <a href="#" className="hover:text-primary transition-all">Support</a>
          </div>

          <div className="pt-8 border-t border-border/10 w-full text-center">
             <p className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-[0.4em]">
               © 2024 Vantage • Handcrafted with love
             </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

