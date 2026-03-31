'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform, useInView, animate } from 'framer-motion';
import { 
  ArrowRight, Briefcase, TrendingUp, Target, 
  ShieldCheck, Sparkles, LayoutDashboard, Compass,
  BarChart2, FileText, User, Smartphone, Mail,
  Download, Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

// --- Helper Components ---

function VantageLogo() {
  return (
    <div className="flex items-center gap-3 md:gap-4 group cursor-pointer shrink-0">
      <div className="relative w-8 h-8 md:w-9 md:h-9 flex items-center justify-center">
        <svg viewBox="0 0 40 40" className="w-full h-full text-violet-500 fill-none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12L20 28L28 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="20" cy="12" r="3" fill="currentColor" />
        </svg>
      </div>
      <div className="flex flex-col -space-y-1">
        <span className="text-sm md:text-base font-semibold tracking-[0.2em] text-white uppercase">Vantage</span>
        <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.25em] text-slate-500">By Naga</span>
      </div>
    </div>
  );
}

function MockJobTable({ limit = 4, showFilter = false }) {
  const [activeTab, setActiveTab] = useState('All');
  
  const jobs = [
    { company: 'Google', role: 'Senior Designer', status: 'INTERVIEW', color: 'text-amber-500 bg-amber-500/10 border-amber-500/20' },
    { company: 'Stripe', role: 'Product Manager', status: 'OFFER', color: 'text-green-500 bg-green-500/10 border-green-500/20' },
    { company: 'Linear', role: 'Frontend Engineer', status: 'APPLIED', color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20' },
    { company: 'Vercel', role: 'Design Systems Lead', status: 'REJECTED', color: 'text-red-500 bg-red-500/10 border-red-500/20' },
  ];

  return (
    <div className="w-full space-y-4">
      {showFilter && (
        <div className="flex gap-2 p-1 bg-white/5 rounded-lg w-fit">
          {['All', 'Applied', 'Interview', 'Offer'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-3 py-1 text-[10px] font-bold rounded-md transition-all",
                activeTab === tab ? "bg-violet-600 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      )}
      <div className="space-y-2 bg-black/40 p-4 rounded-xl border border-white/[0.04] backdrop-blur-3xl overflow-hidden">
        {jobs.slice(0, limit).map((job, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * idx }}
            className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-0"
          >
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center text-[10px] font-bold text-slate-400 border border-white/[0.05]">
                {job.company[0]}
              </div>
              <div>
                <p className="text-xs font-bold text-white">{job.company}</p>
                <p className="text-[10px] text-slate-500 font-medium">{job.role}</p>
              </div>
            </div>
            <span className={cn("text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border", job.color)}>
              {job.status}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function HeroDashboardPreview() {
  return (
    <div className="relative group">
       <div className="absolute inset-0 bg-violet-600/20 blur-[100px] rounded-full opacity-30 group-hover:opacity-50 transition-opacity" />
       
       {/* Growth Stat Chip */}
       <motion.div 
         initial={{ scale: 0, y: 10 }}
         animate={{ scale: 1, y: 0 }}
         transition={{ delay: 1, type: 'spring' }}
         className="absolute -top-3 -right-5 z-20 bg-violet-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-2xl shadow-violet-600/40 border border-violet-500/50"
       >
         +84% GROWTH
       </motion.div>

       <motion.div 
         initial={{ opacity: 0, y: 20, scale: 0.95 }}
         animate={{ opacity: 1, y: 0, scale: 1 }}
         transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
         className="relative z-10 bg-[#0a0a0f] border border-white/[0.08] rounded-2xl shadow-[0_40px_80px_rgba(139,92,246,0.2)] overflow-hidden"
       >
          {/* macOS window chrome */}
          <div className="bg-[#1a1a2e] px-4 py-3 border-b border-white/[0.04] flex items-center gap-2">
             <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
             <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
             <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>

          <div className="flex h-[380px]">
             {/* Mini Sidebar */}
             <div className="w-32 border-right border-white/[0.04] p-4 flex flex-col gap-4 bg-white/[0.01]">
                <div className="w-8 h-8 rounded-lg bg-violet-500/20 mb-2" />
                <div className="space-y-4">
                  {['Dashboard', 'Applications', 'Analytics', 'Documents'].map((item, idx) => (
                    <div key={item} className={cn(
                      "text-[9px] font-bold px-2 py-1.5 rounded-md transition-colors",
                      idx === 1 ? "bg-violet-600/20 text-violet-400" : "text-slate-600"
                    )}>
                      {item}
                    </div>
                  ))}
                </div>
             </div>
             
             {/* Content Area */}
             <div className="flex-1 p-6 bg-black/20">
                <MockJobTable />
             </div>
          </div>
       </motion.div>
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

// --- Main Page Component ---

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-foreground overflow-x-hidden selection:bg-violet-500/30 font-sans">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full animate-pulse opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full animate-pulse delay-700 opacity-50" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-8 py-6 md:py-8 max-w-7xl mx-auto backdrop-blur-md">
        <VantageLogo />
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-700 hidden md:block">Theme</span>
            <div className="scale-75 origin-right">
              <ThemeToggle />
            </div>
          </div>
          <Link href="/login" className="px-6 md:px-8 py-2.5 md:py-3 bg-white text-black rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-xl shadow-white/10 active:scale-95 group flex items-center gap-2 whitespace-nowrap">
            Sign in <ArrowRight className="w-3.5 md:w-4 h-3.5 md:h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10">
        <section className="max-w-7xl mx-auto px-8 py-24 lg:pt-32 pb-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 space-y-12 text-center lg:text-left"
            >
              <div className="space-y-10">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 backdrop-blur-md">
                  <Sparkles className="w-4 h-4 text-violet-500" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-violet-500">Job Application Tracker</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05] font-display text-white">
                  Landing your dream <br />
                  <span className="text-violet-500">role</span> is now <br />
                  <span className="text-gradient">effortless.</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-2xl leading-relaxed mx-auto lg:mx-0">
                  Stop drowning in spreadsheets. Focus your job search with powerful insights and a beautifully designed dashboard.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                  <Link href="/login" className="w-full sm:w-auto px-12 py-5.5 bg-violet-600 text-white rounded-2xl text-lg font-black uppercase tracking-widest shadow-2xl shadow-violet-600/30 hover:shadow-violet-600/50 hover:-translate-y-1.5 transition-all active:scale-95 flex items-center justify-center gap-4">
                  Get started <ArrowRight className="w-5.5 h-5.5" />
                  </Link>
                  <div className="flex items-center -space-x-3.5">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-11 h-11 rounded-full border-2 border-[#0a0a0f] bg-secondary flex items-center justify-center overflow-hidden shadow-premium">
                        <img src={`https://i.pravatar.cc/100?u=${i+10}`} alt="user" className="w-full h-full object-cover opacity-90 grayscale hover:grayscale-0 transition-all duration-300" />
                      </div>
                    ))}
                    <div className="pl-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Managing 2k+ Roles</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Hero Dashboard Replaces AI Image */}
            <div className="lg:col-span-7">
               <HeroDashboardPreview />
            </div>
          </div>
        </section>

        {/* 1. Social Proof Marquee */}
        <section className="relative z-20 border-y border-white/[0.05] bg-[#0a0a0f] py-4 overflow-hidden">
          <style jsx>{`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-scroll {
              display: flex;
              width: fit-content;
              animation: scroll 35s linear infinite;
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
                  <span className="text-violet-500">🔐</span> Zero Data Leaks
                </span>
                <span className="mx-12 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
                  <span className="text-violet-500">📄</span> Built for Serious Job Seekers
                </span>
                <span className="mx-12 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
                  <span className="text-violet-500">🚀</span> First Apply to Signed Offer
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
              className="mb-16 space-y-4 text-center md:text-left"
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
                show: { transition: { staggerChildren: 0.08 } }
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {/* Application Tracking */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                className="md:col-span-2 md:row-span-2 group bg-[#111118] border border-white/[0.06] rounded-2xl p-8 hover:border-violet-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-300 overflow-hidden flex flex-col justify-between min-h-[520px]"
              >
                <div className="space-y-6">
                  <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center border border-violet-500/20 group-hover:scale-110 transition-transform">
                    <Briefcase className="w-6 h-6 text-violet-500" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-white tracking-tight">Application Tracking</h4>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-sm">Organize your search with a high-fidelity interface modeled after elite CRM tools.</p>
                  </div>
                </div>
                <MockJobTable limit={5} showFilter={true} />
              </motion.div>

              {/* Analytics */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                className="group bg-[#111118] border border-white/[0.06] rounded-2xl p-8 hover:border-violet-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center border border-violet-500/20 group-hover:scale-110 transition-transform">
                      <BarChart2 className="w-6 h-6 text-violet-500" />
                    </div>
                    <span className="text-[10px] font-black text-green-500 bg-green-500/10 px-2 py-1 rounded-md">↑ 23%</span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold text-white">Analytics</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Applications this month</p>
                  </div>
                </div>
                <div className="h-24 w-full flex items-end gap-1.5 mt-8 px-1">
                  {[40, 70, 45, 90, 65, 80, 50, 85].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      transition={{ delay: 0.5 + (i * 0.05), duration: 0.8 }}
                      className={cn(
                        "flex-1 rounded-t-lg transition-colors",
                        i === 7 ? "bg-violet-500" : "bg-white/10 group-hover:bg-violet-500/40"
                      )}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Document Hub */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                className="group bg-[#111118] border border-white/[0.06] rounded-2xl p-8 hover:border-violet-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center border border-violet-500/20 group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6 text-violet-500" />
                  </div>
                  <h4 className="text-xl font-bold text-white tracking-tight">Document Hub</h4>
                </div>
                <div className="flex flex-col gap-3 mt-6">
                  {[
                    { name: 'resume_v4.pdf', size: '124kb' },
                    { name: 'portfolio_2025.pdf', size: '2.1MB' },
                    { name: 'cover_letter_stripe.docx', size: '42kb' },
                  ].map(file => (
                    <div key={file.name} className="flex items-center justify-between group/file">
                       <div className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-slate-500" />
                        <span className="text-[10px] font-bold text-slate-400">{file.name}</span>
                       </div>
                       <div className="flex items-center gap-2">
                        <span className="text-[8px] text-slate-700 font-bold uppercase tracking-widest">{file.size}</span>
                        <Download className="w-3 h-3 text-slate-700 opacity-0 group-hover/file:opacity-100 transition-opacity cursor-pointer hover:text-violet-500" />
                       </div>
                    </div>
                  ))}
                  <div className="mt-4 p-4 border border-dashed border-white/10 rounded-xl flex items-center justify-center gap-2 group-hover:border-violet-500/30 transition-colors cursor-pointer bg-white/[0.01]">
                    <Plus className="w-3.5 h-3.5 text-slate-600" />
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Upload new</span>
                  </div>
                </div>
              </motion.div>

              {/* Identity Console */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                className="group bg-[#111118] border border-white/[0.06] rounded-2xl p-8 hover:border-violet-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center border border-violet-500/20 group-hover:scale-110 transition-transform">
                    <User className="w-6 h-6 text-violet-500" />
                  </div>
                  <button className="text-[10px] font-black text-violet-400 uppercase tracking-widest">Edit</button>
                </div>
                <div className="space-y-6 mt-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-xs font-bold text-white">N</div>
                    <div>
                      <h5 className="text-white font-bold text-sm">Naga</h5>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Senior Product Designer</p>
                    </div>
                  </div>
                  <div className="space-y-2 border-t border-white/[0.04] pt-4">
                     <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-slate-600">Target Salary:</span>
                        <span className="text-white">$120k–$150k</span>
                     </div>
                     <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-slate-600">Open to:</span>
                        <span className="text-white">Remote / Hybrid</span>
                     </div>
                  </div>
                </div>
              </motion.div>

              {/* Mobile Optimized */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                className="md:col-span-2 group bg-[#111118] border border-white/[0.06] rounded-2xl p-8 hover:border-violet-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-300 flex items-center justify-between gap-12"
              >
                <div className="space-y-6">
                  <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center border border-violet-500/20 group-hover:scale-110 transition-transform">
                    <Smartphone className="w-6 h-6 text-violet-500" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-white tracking-tight leading-tight">Mobile Optimized</h4>
                    <p className="text-slate-500 text-xs leading-relaxed max-w-sm">Zero-zoom iOS inputs. Gesture-native layouts. Built for on-the-go management.</p>
                  </div>
                </div>

                {/* CSS/SVG Phone Frame */}
                <div className="hidden sm:block shrink-0 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                   <div className="relative w-28 h-48 border-[3px] border-white/[0.08] rounded-[2.5rem] bg-black shadow-2xl overflow-hidden p-1">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-3 bg-black rounded-b-lg z-20" />
                      <div className="space-y-2 mt-6">
                         {[1, 2].map((i) => (
                           <div key={i} className="bg-white/5 p-2 rounded-lg space-y-1.5 border border-white/[0.04]">
                              <div className="w-1/2 h-1 bg-violet-500/40 rounded" />
                              <div className="w-full h-1 bg-white/[0.05] rounded" />
                           </div>
                         ))}
                         <div className="h-12 w-full bg-violet-600/20 rounded-lg mt-4 border border-violet-500/10" />
                      </div>
                   </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 3. Animated Stats Row */}
        <section className="border-y border-white/[0.06] py-24 bg-[#0a0a0f]">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-16">
            <StatBlock value={2400} label="Applications Tracked" icon={Briefcase} suffix="+" />
            <StatBlock value={94} label="Interviews Landed" icon={TrendingUp} suffix="k+" />
            <StatBlock value={3} label="Faster Job Search" icon={Sparkles} suffix="×" />
          </div>
        </section>

        {/* 4. How It Works — Fully Fixed */}
        <section className="py-24 bg-[#0a0a0f] overflow-hidden">
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
              {/* Connector Line - FIXED SCALE & POSITION */}
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
                className="absolute top-5 left-[15%] right-[15%] h-px border-t border-dashed border-violet-500/20 origin-left hidden md:block"
              />

              <motion.div 
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.2 } }
                }}
                className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10"
              >
                {[
                  { title: 'Add Your Applications', desc: 'Log a role in under 30 seconds. Paste a URL or fill manually.' },
                  { title: 'Track Every Stage', desc: 'Move applications: Applied → Interview → Offer. Add notes and contacts.' },
                  { title: 'Land the Offer', desc: 'Analytics show your response rate, busiest days, and what is working for you.' },
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
                      <p className="text-slate-500 text-sm leading-relaxed mx-auto max-w-[280px] font-medium">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* 5. CTA Banner — FIXED HEADLINE */}
        <section className="py-32 bg-gradient-to-br from-violet-950 via-[#0a0a0f] to-indigo-950">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="space-y-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                Your next role is one <br className="hidden md:block" /> dashboard away.
              </h2>
              <CTASubscription />
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer — SaaS Elevation */}
      <footer className="relative z-10 border-t border-white/[0.06] bg-[#0a0a0f]">
         <div className="max-w-7xl mx-auto px-8 py-20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 mb-16 px-1">
               <div className="md:col-span-4 space-y-6">
                  <VantageLogo />
                  <p className="text-slate-500 font-medium text-xs leading-relaxed max-w-xs">The elite career intelligence suite for senior professionals and engineers. Build your legacy with data-driven job searches.</p>
               </div>
               
               <div className="md:col-span-4 flex flex-col md:flex-row justify-center gap-12 md:gap-24">
                  <div className="space-y-6">
                     <h5 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Product</h5>
                     <div className="flex flex-col gap-4 text-xs font-bold text-slate-500">
                        <a href="#" className="hover:text-violet-400 transition-colors">Overview</a>
                        <a href="#" className="hover:text-violet-400 transition-colors">Changelog</a>
                        <a href="#" className="hover:text-violet-400 transition-colors">API</a>
                     </div>
                  </div>
                  <div className="space-y-6">
                     <h5 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Legal</h5>
                     <div className="flex flex-col gap-4 text-xs font-bold text-slate-500">
                        <a href="#" className="hover:text-violet-400 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-violet-400 transition-colors">Terms</a>
                        <a href="#" className="hover:text-violet-400 transition-colors">Cookie Policy</a>
                     </div>
                  </div>
                  <div className="space-y-6">
                     <h5 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Support</h5>
                     <div className="flex flex-col gap-4 text-xs font-bold text-slate-500">
                        <a href="#" className="hover:text-violet-400 transition-colors">Help Center</a>
                        <a href="#" className="hover:text-violet-400 transition-colors">Community</a>
                        <a href="#" className="hover:text-violet-400 transition-colors">Contact</a>
                     </div>
                  </div>
               </div>

               <div className="md:col-span-4 text-right">
                  <p className="text-slate-600 font-black text-[10px] uppercase tracking-widest">Built by Naga</p>
                  <p className="text-slate-800 text-[9px] mt-1 font-bold uppercase tracking-widest">In pursuit of excellence</p>
               </div>
            </div>

            <div className="pt-8 border-t border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-6">
               <p className="text-[10px] font-bold text-slate-700 uppercase tracking-[0.3em]">
                 © 2025 Vantage • ALL RIGHTS RESERVED.
               </p>
               <div className="flex gap-6 h-8 items-center grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all">
                  {/* Subtle Built With icons placeholder if ever needed */}
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
