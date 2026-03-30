'use client';

import { useState } from 'react';
import { X, FileText, Link as LinkIcon, Compass, Save, Layers, Archive, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface DocumentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
}

export default function DocumentFormModal({ isOpen, onClose, initialData }: DocumentFormModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    type: initialData?.type || 'Resume',
    url: initialData?.url || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      if (initialData?.id) {
        const { error } = await supabase
          .from('documents')
          .update(formData)
          .eq('id', initialData.id);
        if (error) throw error;
        toast.success("Strategic asset refined successfully.");
      } else {
        const { error } = await supabase
          .from('documents')
          .insert([{ ...formData, user_id: user.id }]);
        if (error) throw error;
        toast.success("Strategic asset successfully archived.");
      }
      
      onClose();
      router.refresh();
    } catch (error) {
      console.error('Error saving document:', error);
      toast.error('Failed to archive asset. Please check your connection or schema.');
    } finally {
      setIsLoading(false);
    }
  };

  const types = ['Resume', 'Portfolio', 'Cover Letter', 'Case Study', 'Certification', 'Other'];

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
                  {initialData ? 'Refine Asset' : 'Archive Strategic Asset'}
                </h2>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                   <ShieldCheck className="w-3 h-3 text-primary" />
                   Professional Metadata Parameter Tuning
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
              <form id="document-form" onSubmit={handleSubmit} className="space-y-10 pb-20 md:pb-0">
                
                <div className="space-y-2">
                  <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Asset Nomenclature</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/50">
                      <Archive className="h-5 w-5" />
                    </div>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="block w-full pl-12 pr-4 py-4 bg-secondary/50 border-none rounded-2xl text-sm font-bold text-foreground focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground"
                      placeholder="e.g. Senior Product Portfolio 2024"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Asset Classification</label>
                  <div className="flex flex-wrap gap-2 text-center">
                    {types.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setFormData({ ...formData, type: t })}
                        className={cn(
                          "flex-1 min-w-[120px] py-4 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border shrink-0",
                          formData.type === t
                            ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                            : "bg-secondary text-muted-foreground border-transparent hover:bg-secondary/70"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Strategic Asset Pointer (URL)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/50">
                      <LinkIcon className="h-5 w-5" />
                    </div>
                    <input
                      required
                      type="url"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      className="block w-full pl-12 pr-4 py-4 bg-secondary/50 border-none rounded-2xl text-sm font-bold text-foreground focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground"
                      placeholder="https://drive.google.com/..."
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
                Abort Protocol
              </button>
              <button
                type="submit"
                form="document-form"
                disabled={isLoading}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-12 py-4 bg-primary text-primary-foreground rounded-2xl text-sm font-black uppercase tracking-widest shadow-premium shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-70"
              >
                {isLoading ? "Synchronizing Asset..." : (
                  <>
                    <Save className="w-4 h-4 mr-1" />
                    Commit Asset
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
