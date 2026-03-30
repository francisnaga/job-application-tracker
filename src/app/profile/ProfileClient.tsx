'use client';

import { AppLayout } from '@/components/layout/AppLayout';
import { 
  User, 
  Mail, 
  Shield, 
  LogOut, 
  ChevronRight, 
  ExternalLink, 
  Globe, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  FileText,
  Save,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ProfileEditModal from '@/components/profile/ProfileEditModal';

interface ProfileClientProps {
  user: any;
  profile: any;
  appCount: number;
}

export default function ProfileClient({ user, profile, appCount }: ProfileClientProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Stats for the Bento Hub
  const metrics = [
    { label: 'Applications', value: appCount, icon: Briefcase, color: 'text-primary' },
    { label: 'Identity Status', value: profile?.target_role ? 'Optimized' : 'Draft', icon: Shield, color: 'text-green-500' },
    { label: 'Market Tier', value: profile?.target_salary || '$0k', icon: DollarSign, color: 'text-purple-500' },
  ];

  return (
    <AppLayout>
      <div className="space-y-12 pb-20 pt-4 max-w-5xl mx-auto">
        
        {/* Elite Header */}
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tighter text-foreground font-display leading-tight">
              Your <br />
              <span className="text-primary italic">Profile</span>
            </h1>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Professional Metadata Management
            </p>
          </div>

          <div className="flex items-center gap-4">
             <button 
               onClick={() => setIsModalOpen(true)}
               className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30 active:scale-95"
             >
                <User className="w-4 h-4" />
                Refine Identity
             </button>
          </div>
        </header>

        {/* Identity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* User Core Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-4 surface p-10 flex flex-col items-center text-center space-y-6 bg-card border-border shadow-2xl overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full pointer-events-none" />
            
            <div className="w-24 h-24 bg-secondary/50 rounded-[2.5rem] flex items-center justify-center border border-border group-hover:scale-110 transition-transform duration-500">
               <User className="w-10 h-10 text-primary" />
            </div>

            <div className="space-y-2">
               <h2 className="text-2xl font-bold text-foreground tracking-tight">{profile?.first_name || user.email?.split('@')[0]}</h2>
               <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none">{profile?.target_role || 'Senior Candidate'}</p>
            </div>

            <div className="flex gap-3 pt-4">
                 <a href={profile.linkedin_url} target="_blank" className="p-3 bg-secondary/50 border border-border rounded-xl hover:bg-primary/10 transition-colors">
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                 </a>
               {profile?.portfolio_url && (
                 <a href={profile.portfolio_url} target="_blank" className="p-3 bg-secondary/50 border border-border rounded-xl hover:bg-primary/10 transition-colors">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                 </a>
               )}
            </div>
          </motion.div>

          {/* Metrics Bento Row */}
          <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="surface p-8 flex flex-col justify-between hover:bg-secondary/50 transition-all border-border bg-card"
              >
                <div className={cn("w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center border border-border", m.color)}>
                  <m.icon className="w-5 h-5" />
                </div>
                <div>
                   <p className="text-3xl font-bold text-foreground font-display tracking-tighter">{m.value}</p>
                   <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-2">{m.label}</p>
                </div>
              </motion.div>
            ))}

            {/* Strategic Summary Box */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="md:col-span-3 surface p-10 bg-card border-border flex flex-col justify-between"
            >
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-foreground tracking-tight">Executive Summary</h3>
                    <Compass className="w-5 h-5 text-primary opacity-30" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground leading-relaxed italic max-w-2xl">
                    {profile?.bio || "Add a bio to highlight your professional experience and career goals."}
                  </p>
               </div>
               
               <div className="hidden md:flex items-center gap-2 mt-4 opacity-50">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/20">Active</span>
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Verified Professional</span>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-30" />
               </div>
            </motion.div>
          </div>

          {/* Action Sections */}
          <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8">
             <section className="space-y-4">
                <p className="px-4 text-[10px] font-black uppercase text-muted-foreground tracking-[0.3em]">Communication</p>
                <div className="surface bg-card border-border overflow-hidden divide-y divide-border">
                   <div className="p-6 flex items-center justify-between group hover:bg-secondary/50 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-secondary/50 rounded-xl flex items-center justify-center">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="text-left">
                          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Email Coordinates</p>
                          <p className="text-sm font-bold text-foreground">{user.email}</p>
                        </div>
                      </div>
                   </div>
                </div>
             </section>

             <section className="space-y-4">
                <p className="px-4 text-[10px] font-black uppercase text-muted-foreground tracking-[0.3em]">Account Settings</p>
                <form action="/auth/sign-out" method="POST">
                   <button type="submit" className="w-full surface bg-card border-border p-6 flex items-center justify-between group hover:bg-destructive/10 transition-all text-left">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-destructive/10 rounded-xl flex items-center justify-center">
                          <LogOut className="w-4 h-4 text-destructive" />
                        </div>
                        <div className="text-left">
                          <p className="text-[10px] font-black text-destructive uppercase tracking-widest mb-1">Current Session</p>
                          <p className="text-sm font-bold text-foreground group-hover:text-destructive transition-colors">Initiate Sign Out</p>
                        </div>
                     </div>
                     <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-destructive transition-all" />
                   </button>
                </form>
             </section>
          </div>
        </div>

      </div>

      <ProfileEditModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={profile}
      />
    </AppLayout>
  );
}
