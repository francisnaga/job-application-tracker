'use client';

import { useState } from 'react';
import { X, User, Briefcase, DollarSign, MessageSquare, Save, Link as LinkIcon, Globe, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: any;
}

export default function ProfileEditModal({ isOpen, onClose, initialData }: ProfileEditModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: initialData?.first_name || '',
    last_name: initialData?.last_name || '',
    bio: initialData?.bio || '',
    target_role: initialData?.target_role || '',
    target_salary: initialData?.target_salary || '',
    linkedin_url: initialData?.linkedin_url || '',
    portfolio_url: initialData?.portfolio_url || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Unauthorized');

      const { error } = await supabase
        .from('profiles')
        .update(formData)
        .eq('id', user.id);
      
      if (error) throw error;
      
      onClose();
      router.refresh();
    } catch (error) {
      console.error('Error updating identity:', error);
      alert('Failed to update strategic identity.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center sm:p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" 
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ y: '100%', opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: '100%', opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={cn(
              "bg-card relative w-full max-w-3xl md:rounded-[3rem] rounded-t-[3rem] shadow-premium-xl transition-transform",
              "max-h-[90vh] flex flex-col overflow-hidden border border-border"
            )}
          >
            <div className="flex items-center justify-between p-8 border-b border-border/50">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight text-foreground font-display">Refine Strategic Identity</h2>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                   <ShieldCheck className="w-3 h-3 text-primary" />
                   Professional Metadata Synchronization
                </p>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-2xl bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-10 flex-1 space-y-10 no-scrollbar">
              <form id="profile-form" onSubmit={handleSubmit} className="space-y-10 pb-20 md:pb-0">
                
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">First Name</label>
                    <input
                      type="text"
                      value={formData.first_name}
                      onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                      className="block w-full px-6 py-4 bg-secondary/50 border-none rounded-2xl text-sm font-bold text-foreground focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Last Name</label>
                    <input
                      type="text"
                      value={formData.last_name}
                      onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                      className="block w-full px-6 py-4 bg-secondary/50 border-none rounded-2xl text-sm font-bold text-foreground focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Target Role</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/50">
                        <Briefcase className="h-5 w-5" />
                      </div>
                      <input
                        type="text"
                        value={formData.target_role}
                        onChange={(e) => setFormData({ ...formData, target_role: e.target.value })}
                        className="block w-full pl-12 pr-4 py-4 bg-secondary/50 border-none rounded-2xl text-sm font-bold text-foreground focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground"
                        placeholder="e.g. Senior Software Engineer"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Target Salary</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/50">
                        <DollarSign className="h-5 w-5" />
                      </div>
                      <input
                        type="text"
                        value={formData.target_salary}
                        onChange={(e) => setFormData({ ...formData, target_salary: e.target.value })}
                        className="block w-full pl-12 pr-4 py-4 bg-secondary/50 border-none rounded-2xl text-sm font-bold text-foreground focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground"
                        placeholder="e.g. $150k - $180k"
                      />
                    </div>
                  </div>
                </section>

                <div className="space-y-2">
                  <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Identity Summary (Bio)</label>
                  <div className="relative">
                    <div className="absolute top-4 left-4 pointer-events-none text-muted-foreground/50">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="block w-full pl-12 pr-4 py-4 bg-secondary/50 border-none rounded-2xl text-sm font-bold text-foreground focus:ring-2 focus:ring-primary/20 transition-all resize-none h-40 placeholder:text-muted-foreground"
                      placeholder="Brief professional overview..."
                    />
                  </div>
                </div>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">LinkedIn URL</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/50">
                        <LinkIcon className="h-5 w-5" />
                      </div>
                      <input
                        type="url"
                        value={formData.linkedin_url}
                        onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                        className="block w-full pl-12 pr-4 py-4 bg-secondary/50 border-none rounded-2xl text-sm font-bold text-foreground focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="https://linkedin.com/..."
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Portfolio Hub</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/50">
                        <Globe className="h-5 w-5" />
                      </div>
                      <input
                        type="url"
                        value={formData.portfolio_url}
                        onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })}
                        className="block w-full pl-12 pr-4 py-4 bg-secondary/50 border-none rounded-2xl text-sm font-bold text-foreground focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="https://naga.design/..."
                      />
                    </div>
                  </div>
                </section>
              </form>
            </div>

            <div className="p-8 border-t border-border/50 bg-card flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={onClose}
                className="hidden sm:block px-8 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all"
              >
                Abort Log
              </button>
              <button
                type="submit"
                form="profile-form"
                disabled={isLoading}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-12 py-4 bg-primary text-primary-foreground rounded-2xl text-sm font-black uppercase tracking-widest shadow-premium shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-70"
              >
                {isLoading ? "Synchronizing Identity..." : (
                  <>
                    <Save className="w-4 h-4 mr-1" />
                    Commit Refinement
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
