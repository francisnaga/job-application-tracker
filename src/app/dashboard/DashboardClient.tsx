'use client';

import { AppLayout } from '@/components/layout/AppLayout';
import { Briefcase, CalendarCheck, Medal, XCircle, TrendingUp, ArrowUpRight, Plus, BarChart3, ChevronRight, Compass, ShieldCheck, Layers } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { format, subDays, isAfter, startOfDay, eachDayOfInterval } from 'date-fns';
import { motion } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  ResponsiveContainer, 
  XAxis, 
  Tooltip as ChartTooltip 
} from 'recharts';

interface DashboardClientProps {
  user: any;
  applications: any[];
  profile?: any;
  documentCount?: number;
}

export default function DashboardClient({ user, applications, profile, documentCount = 0 }: DashboardClientProps) {
  const total = applications.length;
  const interviews = applications.filter(a => a.status === 'interview').length;
  const offers = applications.filter(a => a.status === 'offer').length;
  const rejections = applications.filter(a => a.status === 'rejected').length;

  // Real Chart Data Generation
  const last7Days = eachDayOfInterval({
    start: subDays(new Date(), 6),
    end: new Date(),
  });

  const chartData = last7Days.map(day => {
    const dateStr = format(day, 'yyyy-MM-dd');
    const count = applications.filter(a => a.applied_date === dateStr).length;
    return {
      name: format(day, 'EEE'),
      apps: count,
    };
  });

  // Follow-up Logic
  const today = startOfDay(new Date());
  const threeDaysFromNow = new Date();
  threeDaysFromNow.setDate(today.getDate() + 3);

  const upcomingFollowups = applications.filter(a => {
    if (!a.follow_up_date) return false;
    const fDate = new Date(a.follow_up_date);
    return isAfter(fDate, subDays(today, 1)) && !isAfter(fDate, threeDaysFromNow);
  });

  return (
    <AppLayout>
      <div className="space-y-12 pb-20 pt-4">
        
        {/* Elite Greeting Header */}
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tighter text-foreground font-display leading-tight">
              Good morning, <br />
              <span className="text-primary">{user.email?.split('@')[0]}</span>
            </h1>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Strategic Pipeline Operational
            </p>
          </div>

          <div className="flex items-center gap-4">
             <div className="surface bg-secondary/10 px-6 py-3 rounded-2xl flex items-center gap-3 border-white/5 backdrop-blur-xl">
               <div className="w-1.5 h-1.5 rounded-full bg-primary" />
               <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                 Upcoming: <span className="text-foreground">{upcomingFollowups.length} Priority</span>
               </span>
             </div>
             <Link href="/applications" className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30 active:scale-95 group">
                <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
             </Link>
          </div>
        </header>

        {/* Bento Intelligence Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[220px]">
          
          {/* Main Chart Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-8 md:row-span-2 surface p-10 flex flex-col relative overflow-hidden group bg-card border-border shadow-2xl"
          >
            <div className="flex items-center justify-between mb-12 z-10">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-foreground tracking-tight">Search Velocity</h3>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Active Search Volume • Last 7 Days</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center border border-border">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
              </div>
            </div>

            <div className="flex-1 -mx-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 800, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <ChartTooltip 
                    cursor={{ stroke: '#2563eb', strokeWidth: 1 }}
                    contentStyle={{ borderRadius: '1.25rem', background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', padding: '16px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="apps" 
                    stroke="#2563eb" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorApps)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Quick Stat: Total Applications */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-4 surface p-10 flex flex-col justify-between group hover:border-primary/30 transition-all border-border bg-card overflow-hidden relative shadow-2xl"
          >
            <div className="flex justify-between items-start relative z-10">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform border border-primary/20">
                <Briefcase className="w-7 h-7 text-primary" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all group-hover:text-primary translate-x-1 -translate-y-1" />
            </div>
            <div className="relative z-10">
              <p className="text-7xl font-bold tracking-tighter text-foreground font-display">{total}</p>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.25em] mt-3">Active Pipeline</p>
            </div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
          </motion.div>

          {/* Offer Conversion Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4 surface p-10 flex flex-col justify-between border-green-500/10 bg-card transition-all hover:border-green-500/30 shadow-2xl"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center border border-green-500/20">
                <Medal className="w-6 h-6 text-green-500" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase text-green-500 tracking-widest">Target Met</span>
              </div>
            </div>
            <div>
              <p className="text-6xl font-bold tracking-tighter text-foreground font-display">{offers}</p>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.25em] mt-3">Offers Secured</p>
            </div>
          </motion.div>

          {/* Activity Feed Group */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-6 md:row-span-2 surface p-0 border-border overflow-hidden flex flex-col bg-card shadow-2xl"
          >
            <div className="p-10 pb-6 flex items-center justify-between border-b border-border">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-foreground tracking-tight">Recent Activity</h3>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Latest Updates</p>
              </div>
              <Link href="/applications" className="text-[10px] font-black text-primary group-hover:text-primary-foreground/80 uppercase tracking-widest bg-primary/5 px-4 py-2 rounded-xl border border-border hover:bg-primary hover:text-primary-foreground transition-all">View All</Link>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-2 no-scrollbar">
              {applications.slice(0, 5).map((app) => (
                <div key={app.id} className="p-5 rounded-2xl hover:bg-secondary/50 transition-all flex items-center justify-between group cursor-pointer border border-transparent hover:border-border">
                  <div className="flex items-center gap-5">
                    <div className="w-13 h-13 rounded-2xl bg-secondary/50 text-foreground flex items-center justify-center font-bold text-xl border border-border group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                      {app.company_name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground leading-tight group-hover:text-primary transition-colors">{app.role_title}</p>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-2">{app.company_name}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all opacity-0 group-hover:opacity-100 group-hover:translate-x-1" />
                </div>
              ))}
              {applications.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-20 grayscale opacity-40">
                  <Compass className="w-12 h-12 mb-6 animate-spin-slow" />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-center max-w-[200px] leading-relaxed">System Ready. No Activity.</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Secondary Stats Cluster */}
          <div className="md:col-span-6 grid grid-cols-2 gap-8 h-full">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.4 }}
               className="surface p-10 flex flex-col justify-between hover:bg-secondary/50 transition-all border-border bg-card shadow-2xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center border border-border">
                <CalendarCheck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-5xl font-bold text-foreground font-display tracking-tighter">{interviews}</p>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-3">Interviews</p>
              </div>
            </motion.div>
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.5 }}
               className="surface p-10 flex flex-col justify-between hover:bg-destructive/5 transition-all border-border bg-card shadow-2xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center border border-destructive/20">
                <XCircle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-5xl font-bold text-foreground font-display tracking-tighter">{rejections}</p>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-3">Closed</p>
              </div>
            </motion.div>
          </div>

          {/* Intelligence Suite Section: Profile & Documents */}
          <div className="md:col-span-6 grid grid-cols-2 gap-8 h-full mt-4 md:mt-0">
            <Link href="/profile">
              <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.6 }}
                 className="surface p-10 flex flex-col justify-between hover:bg-green-500/5 hover:border-green-500/30 transition-all border-border bg-card shadow-2xl h-full group"
              >
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center border border-green-500/20 group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-6 h-6 text-green-500" />
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground tracking-tight leading-tight">
                    {profile?.target_role ? 'Optimized' : 'Draft'}
                  </p>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-3">Identity Status</p>
                </div>
              </motion.div>
            </Link>

            <Link href="/documents">
              <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.7 }}
                 className="surface p-10 flex flex-col justify-between hover:bg-purple-500/5 hover:border-purple-500/30 transition-all border-border bg-card shadow-2xl h-full group"
              >
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:scale-110 transition-transform">
                  <Layers className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-5xl font-bold text-foreground font-display tracking-tighter">{documentCount}</p>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-3">Your Documents</p>
                </div>
              </motion.div>
            </Link>
          </div>


          {/* Action Call for Zero States */}
          {applications.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:col-span-12 surface p-14 bg-primary text-primary-foreground flex flex-col md:flex-row items-center justify-between gap-12 border-none shadow-3xl shadow-primary/20 mt-8"
            >
               <div className="space-y-5 max-w-xl text-center md:text-left">
                  <h4 className="text-4xl font-bold tracking-tighter leading-none text-primary-foreground">Your next career move starts here.</h4>
                  <p className="text-primary-foreground/80 font-medium text-xl leading-relaxed">Organize your search simply. Log your first application to see your activity.</p>
               </div>
               <Link href="/applications" className="px-12 py-6 bg-primary-foreground text-primary rounded-2xl text-xl font-bold shadow-2xl hover:scale-105 hover:bg-white transition-all active:scale-95 whitespace-nowrap">
                 Log First Role
               </Link>
            </motion.div>
          )}

        </div>
      </div>
    </AppLayout>
  );
}
