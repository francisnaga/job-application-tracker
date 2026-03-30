'use client';

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { format, subMonths, startOfMonth, isSameMonth } from 'date-fns';
import { cn } from '@/lib/utils';
import { Briefcase, Target, CheckCircle2, XCircle, TrendingUp, PieChart as PieIcon, Activity, Sparkles, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

interface AnalyticsClientProps {
  applications: any[];
}

export default function AnalyticsClient({ applications }: AnalyticsClientProps) {
  const total = applications.length;
  const interviews = applications.filter(a => a.status === 'interview').length;
  const offers = applications.filter(a => a.status === 'offer').length;
  const rejections = applications.filter(a => a.status === 'rejected').length;
  const applied = applications.filter(a => a.status === 'applied').length;

  const successRate = total > 0 ? Math.round((offers / total) * 100) : 0;
  const interviewRate = total > 0 ? Math.round((interviews / total) * 100) : 0;

  // Status Distribution for Pie Chart
  const statusData = [
    { name: 'Active', value: applied, color: '#6366f1' },
    { name: 'Interview', value: interviews, color: '#a855f7' },
    { name: 'Offers', value: offers, color: '#10b981' },
    { name: 'Closed', value: rejections, color: '#f43f5e' },
  ].filter(d => d.value > 0);

  // Growth Data (last 6 months)
  const last6Months = Array.from({ length: 6 }).map((_, i) => {
    const date = startOfMonth(subMonths(new Date(), i));
    const count = applications.filter(a => isSameMonth(new Date(a.applied_date), date)).length;
    return {
      month: format(date, 'MMM'),
      count,
    };
  }).reverse();

  const metrics = [
    { label: 'Total Applications', value: total, icon: Briefcase, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Interview Rate', value: `${interviewRate}%`, icon: Target, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Offer Rate', value: `${successRate}%`, icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Rejected', value: rejections, icon: XCircle, color: 'text-rose-500', bg: 'bg-rose-500/10' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12 pb-20"
    >
      <header className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter text-foreground font-display">Performance Metrics</h1>
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.25em] flex items-center gap-2">
          <Compass className="w-4 h-4 text-primary animate-spin-slow" />
          Your Application Analytics
        </p>
      </header>

      {/* Metric Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {metrics.map((m, i) => (
          <div key={i} className="surface p-8 bg-card border-border/10 flex flex-col justify-between group hover:border-primary/20 transition-all">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-8 shadow-sm transition-transform group-hover:scale-110", m.bg)}>
              <m.icon className={cn("w-5 h-5", m.color)} />
            </div>
            <div>
              <p className="text-4xl font-bold tracking-tighter text-foreground font-display leading-none">{m.value}</p>
              <p className="text-[10px] font-black text-muted-foreground uppercase mt-3 tracking-widest">{m.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Monthly Activity Chart (Bento Large) */}
        <div className="lg:col-span-12 surface p-10 border-border/10 flex flex-col md:flex-row gap-12 bg-card">
          <div className="md:w-1/3 space-y-8">
             <div className="space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-foreground leading-tight">Monthly Activity</h3>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed italic">Overview of your application volume over time.</p>
             </div>
             <div className="grid grid-cols-1 gap-4">
                <div className="p-5 rounded-2xl bg-secondary/30 border border-border/5 group hover:bg-secondary/50 transition-colors">
                   <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">Peak Period</p>
                   <p className="text-xl font-bold text-foreground">{last6Months.sort((a,b) => b.count - a.count)[0].count > 0 ? last6Months.sort((a,b) => b.count - a.count)[0].month : 'No data yet'}</p>
                </div>
                <div className="p-5 rounded-2xl bg-primary text-white shadow-xl shadow-primary/20">
                   <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-2">Search Status</p>
                   <p className="text-xl font-bold">{total > 0 ? (total > 10 ? 'High Output' : 'Active') : 'Ready to Start'}</p>
                </div>
             </div>
          </div>
          
          <div className="flex-1 h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={last6Months}>
                <defs>
                  <linearGradient id="velocityGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.1} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: 'var(--muted-foreground)' }}
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: 'var(--muted-foreground)' }}
                  dx={-15}
                />
                <Tooltip 
                  cursor={{ stroke: '#2563eb', strokeWidth: 1 }}
                  contentStyle={{ borderRadius: '1.25rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.8)', padding: '16px', background: '#000' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  fill="url(#velocityGrad)" 
                  stroke="#2563eb" 
                  strokeWidth={4} 
                  dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Breakdown (Bento Standard) */}
        <div className="lg:col-span-8 surface p-10 border-border/10 h-[450px] bg-card">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-bold text-foreground">Application Breakdown</h3>
            <PieIcon className="w-5 h-5 text-muted-foreground opacity-30" />
          </div>
          <div className="h-full w-full flex items-center justify-center">
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="42%"
                    innerRadius={90}
                    outerRadius={140}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '1.25rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)', background: '#000' }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    iconType="circle"
                    formatter={(value) => <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-2">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center text-muted-foreground py-20 text-center">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-6">
                  <PieIcon className="w-8 h-8 opacity-20" />
                </div>
                <p className="text-xs font-black uppercase tracking-widest leading-loose">Data insufficient for modeling.</p>
              </div>
            )}
          </div>
        </div>

        {/* Strategy / Conversion Card */}
        <div className="lg:col-span-4 surface p-10 border-border bg-primary text-primary-foreground flex flex-col justify-between group overflow-hidden relative shadow-2xl">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px] rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-700" />
           <div className="space-y-4 relative z-10">
             <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                <TrendingUp className="w-5 h-5 text-white" />
             </div>
             <h3 className="text-2xl font-bold tracking-tight text-white">Search Progress</h3>
             <p className="text-xs font-medium text-white/50 leading-relaxed uppercase tracking-widest">Your search statistics</p>
           </div>
           
           <div className="space-y-8 relative z-10">
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Interviews landed</p>
                   <p className="text-2xl font-bold font-display text-white">{interviewRate}%</p>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${interviewRate}%` }}
                     transition={{ duration: 1, delay: 0.5 }}
                     className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
                   />
                </div>
              </div>

               <div className="space-y-3">
                <div className="flex justify-between items-end">
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Offers landed</p>
                   <p className="text-2xl font-bold font-display text-white">{successRate}%</p>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${successRate}%` }}
                     transition={{ duration: 1, delay: 0.7 }}
                     className="h-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]" 
                   />
                </div>
              </div>
           </div>

           <button className="w-full py-5 bg-white text-primary rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/90 transition-all active:scale-95 relative z-10">
             Share Report
           </button>
        </div>
      </div>
    </motion.div>
  );
}
