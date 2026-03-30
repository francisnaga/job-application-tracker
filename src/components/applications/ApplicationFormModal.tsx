'use client';

import { useState } from 'react';
import { X, Building2, Briefcase, Link as LinkIcon, Calendar, AlignLeft, Send, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface ApplicationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  // If we pass an existing application, we are in edit mode
  initialData?: any;
}

export default function ApplicationFormModal({ isOpen, onClose, initialData }: ApplicationFormModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    company_name: initialData?.company_name || '',
    role_title: initialData?.role_title || '',
    status: initialData?.status || 'applied',
    job_link: initialData?.job_link || '',
    notes: initialData?.notes || '',
    applied_date: initialData?.applied_date || new Date().toISOString().split('T')[0],
    follow_up_date: initialData?.follow_up_date || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    // Get user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      if (initialData?.id) {
        // Update
        const { error } = await supabase
          .from('applications')
          .update(formData)
          .eq('id', initialData.id);
        if (error) throw error;
        toast.success('Pipeline updated successfully.');
      } else {
        // Insert
        const { error } = await supabase
          .from('applications')
          .insert([{ ...formData, user_id: user.id }]);
        if (error) throw error;
        toast.success('Strategic position logged.');
      }

      onClose();
      router.refresh();
    } catch (error) {
      console.error('Error saving application:', error);
      toast.error('Failed to commit record. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const statuses = ['applied', 'interview', 'offer', 'rejected'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center sm:p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity" 
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ y: '100%', opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: '100%', opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={cn(
              "bg-card relative w-full max-w-2xl md:rounded-[3rem] rounded-t-[3rem] shadow-premium-xl transition-transform",
              "max-h-[90vh] flex flex-col overflow-hidden border border-border"
            )}
          >
            <div className="flex items-center justify-between p-8 border-b border-border/50">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight text-foreground font-display">
                  {initialData ? 'Refine Record' : 'Log New Application'}
                </h2>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Global Identification Parameters</p>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-2xl bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-10 flex-1 space-y-10 no-scrollbar">
              <form id="app-form" onSubmit={handleSubmit} className="space-y-10 pb-20 md:pb-0">
                
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Target Entity</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/50">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <input
                        required
                        type="text"
                        value={formData.company_name}
                        onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                        className="block w-full pl-12 pr-4 py-4 bg-secondary/50 border-none rounded-2xl text-sm font-bold text-foreground focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground"
                        placeholder="Company Name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Deployment Role</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/50">
                        <Briefcase className="h-5 w-5" />
                      </div>
                      <input
                        required
                        type="text"
                        value={formData.role_title}
                        onChange={(e) => setFormData({ ...formData, role_title: e.target.value })}
                        className="block w-full pl-12 pr-4 py-4 bg-secondary/50 border-none rounded-2xl text-sm font-bold text-foreground focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground"
                        placeholder="Position/Title"
                      />
                    </div>
                  </div>
                </section>

                <div className="space-y-4">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Pipeline Status</label>
                  <div className="flex flex-wrap gap-2">
                    {statuses.map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setFormData({ ...formData, status })}
                        className={cn(
                          "flex-1 min-w-[100px] py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all border",
                          formData.status === status
                            ? status === 'offer' ? "bg-green-500 text-white border-green-500 shadow-lg shadow-green-500/20"
                            : status === 'interview' ? "bg-purple-500 text-white border-purple-500 shadow-lg shadow-purple-500/20"
                            : status === 'rejected' ? "bg-destructive text-white border-destructive shadow-lg shadow-destructive/20"
                            : "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                            : "bg-secondary/50 text-muted-foreground border-transparent hover:bg-secondary"
                        )}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Asset Link</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/50">
                      <LinkIcon className="h-5 w-5" />
                    </div>
                    <input
                      type="url"
                      value={formData.job_link}
                      onChange={(e) => setFormData({ ...formData, job_link: e.target.value })}
                      className="block w-full pl-12 pr-4 py-4 bg-secondary/50 border-none rounded-2xl text-sm font-bold text-foreground focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Initialization Date</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/50">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <input
                        type="date"
                        required
                        value={formData.applied_date}
                        onChange={(e) => setFormData({ ...formData, applied_date: e.target.value })}
                        className="block w-full pl-12 pr-4 py-4 bg-secondary/50 border-none rounded-2xl text-sm font-bold text-foreground focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Follow-up Milestone</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/50">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <input
                        type="date"
                        value={formData.follow_up_date}
                        onChange={(e) => setFormData({ ...formData, follow_up_date: e.target.value })}
                        className="block w-full pl-12 pr-4 py-4 bg-secondary/50 border-none rounded-2xl text-sm font-bold text-foreground focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>
                </section>

                <div className="space-y-2">
                  <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Internal Documentation</label>
                  <div className="relative">
                    <div className="absolute top-4 left-4 pointer-events-none text-muted-foreground/50">
                      <AlignLeft className="h-5 w-5" />
                    </div>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="block w-full pl-12 pr-4 py-4 bg-secondary/50 border-none rounded-2xl text-sm font-bold text-foreground focus:ring-2 focus:ring-primary/20 transition-all resize-none h-32 placeholder:text-muted-foreground"
                      placeholder="Add strategic notes or contact info..."
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="p-8 border-t border-border/50 bg-card flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={onClose}
                className="hidden sm:block px-8 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all"
              >
                Discard Changes
              </button>
              <button
                type="submit"
                form="app-form"
                disabled={isLoading}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-12 py-4 bg-primary text-primary-foreground rounded-2xl text-sm font-black uppercase tracking-widest shadow-premium shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-70"
              >
                {isLoading ? "Saving..." : (
                  <>
                    <Save className="w-4 h-4 mr-1" />
                    Commit Records
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
