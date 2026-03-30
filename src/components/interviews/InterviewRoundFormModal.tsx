'use client';

import { useState } from 'react';
import { X, Calendar, Clock, MessageSquare, Save, ChevronDown, ListCheck, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface InterviewRoundFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  applications: any[];
  initialData?: any;
}

export default function InterviewRoundFormModal({ isOpen, onClose, applications, initialData }: InterviewRoundFormModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    application_id: initialData?.application_id || '',
    round_name: initialData?.round_name || 'Technical',
    round_date: initialData?.round_date ? new Date(initialData.round_date).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
    feedback: initialData?.feedback || '',
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

      if (initialData?.id) {
        const { error } = await supabase
          .from('interview_rounds')
          .update(formData)
          .eq('id', initialData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('interview_rounds')
          .insert([{ ...formData, user_id: user.id }]);
        if (error) throw error;
      }
      
      onClose();
      router.refresh();
      toast.success(initialData?.id ? 'Interview updated.' : 'Interview added.');
    } catch (error) {
      console.error('Error saving round:', error);
      toast.error('Failed to save interview round. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const rounds = ['Screening', 'Technical', 'Behavioral', 'Panel', 'Design Case', 'Executive', 'Final'];

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
              "bg-card relative w-full max-w-2xl md:rounded-[3rem] rounded-t-[3rem] shadow-premium-xl transition-transform",
              "max-h-[90vh] flex flex-col overflow-hidden border border-border"
            )}
          >
            <div className="flex items-center justify-between p-8 border-b border-border/50">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight text-foreground font-display">
                  {initialData ? 'Edit Interview' : 'Log Interview'}
                </h2>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Interview Details</p>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-2xl bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-10 flex-1 space-y-10 no-scrollbar">
              <form id="round-form" onSubmit={handleSubmit} className="space-y-10 pb-20 md:pb-0">
                
                <div className="space-y-2">
                  <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Application</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/50">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <select
                      required
                      value={formData.application_id}
                      onChange={(e) => setFormData({ ...formData, application_id: e.target.value })}
                      className="block w-full pl-12 pr-10 py-4 bg-secondary/50 border-none rounded-2xl text-sm font-bold text-foreground focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select Application</option>
                      {applications.map((app) => (
                        <option key={app.id} value={app.id}>
                          {app.company_name} - {app.role_title}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-muted-foreground/50">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Interview Type</label>
                  <div className="flex flex-wrap gap-2">
                    {rounds.map((round) => (
                      <button
                        key={round}
                        type="button"
                        onClick={() => setFormData({ ...formData, round_name: round })}
                        className={cn(
                          "flex-1 min-w-[120px] py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border shrink-0",
                          formData.round_name === round
                            ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                            : "bg-secondary/50 text-muted-foreground border-transparent hover:bg-secondary"
                        )}
                      >
                        {round}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Interview Date & Time</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/50">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <input
                      required
                      type="datetime-local"
                      value={formData.round_date}
                      onChange={(e) => setFormData({ ...formData, round_date: e.target.value })}
                      className="block w-full pl-12 pr-4 py-4 bg-secondary/50 border-none rounded-2xl text-sm font-bold text-foreground focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Notes & Feedback</label>
                  <div className="relative">
                    <div className="absolute top-4 left-4 pointer-events-none text-muted-foreground/50">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <textarea
                      value={formData.feedback}
                      onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                      className="block w-full pl-12 pr-4 py-4 bg-secondary/50 border-none rounded-2xl text-sm font-bold text-foreground focus:ring-2 focus:ring-primary/20 transition-all resize-none h-40 placeholder:text-muted-foreground"
                      placeholder="Add performance notes, signals, or behavioral reflections..."
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
                Cancel
              </button>
              <button
                type="submit"
                form="round-form"
                disabled={isLoading}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-12 py-4 bg-primary text-primary-foreground rounded-2xl text-sm font-black uppercase tracking-widest shadow-premium shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-70"
              >
                {isLoading ? "Saving..." : (
                  <>
                    <Save className="w-4 h-4 mr-1" />
                    Save Interview
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
