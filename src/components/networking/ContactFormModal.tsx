'use client';

import { useState } from 'react';
import { X, User, Briefcase, Link as LinkIcon, Mail, Calendar, Save, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
}

export default function ContactFormModal({ isOpen, onClose, initialData }: ContactFormModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    role: initialData?.role || '',
    company_name: initialData?.company_name || '',
    linkedin_url: initialData?.linkedin_url || '',
    email: initialData?.email || '',
    last_contact_date: initialData?.last_contact_date || new Date().toISOString().split('T')[0],
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
          .from('contacts')
          .update(formData)
          .eq('id', initialData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('contacts')
          .insert([{ ...formData, user_id: user.id }]);
        if (error) throw error;
      }
      
      onClose();
      router.refresh();
      toast.success(initialData?.id ? 'Contact updated.' : 'Contact added.');
    } catch (error) {
      console.error('Error saving contact:', error);
      toast.error('Failed to save contact. Please try again.');
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
              "bg-card relative w-full max-w-2xl md:rounded-[3rem] rounded-t-[3rem] shadow-premium-xl transition-transform",
              "max-h-[90vh] flex flex-col overflow-hidden border border-border"
            )}
          >
            <div className="flex items-center justify-between p-8 border-b border-border/50">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight text-foreground font-display">
                  {initialData ? 'Edit Contact' : 'Add Contact'}
                </h2>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Contact Details</p>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-2xl bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-10 flex-1 space-y-10 no-scrollbar">
              <form id="contact-form" onSubmit={handleSubmit} className="space-y-10 pb-20 md:pb-0">
                
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/50">
                        <User className="h-5 w-5" />
                      </div>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="block w-full pl-12 pr-4 py-4 bg-secondary/50 border-none rounded-2xl text-sm font-bold text-foreground focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground"
                        placeholder="Full Name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Company</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/50">
                        <Briefcase className="h-5 w-5" />
                      </div>
                      <input
                        type="text"
                        value={formData.company_name}
                        onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                        className="block w-full pl-12 pr-4 py-4 bg-secondary/50 border-none rounded-2xl text-sm font-bold text-foreground focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground"
                        placeholder="Company / Entity"
                      />
                    </div>
                  </div>
                </section>

                <div className="space-y-2">
                  <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Job Title</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="block w-full px-6 py-4 bg-secondary/50 border-none rounded-2xl text-sm font-bold text-foreground focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground"
                    placeholder="Engineering Lead / Recruiter / VP"
                  />
                </div>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/50">
                        <Mail className="h-5 w-5" />
                      </div>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="block w-full pl-12 pr-4 py-4 bg-secondary/50 border-none rounded-2xl text-sm font-bold text-foreground focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground"
                        placeholder="name@domain.com"
                      />
                    </div>
                  </div>

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
                        className="block w-full pl-12 pr-4 py-4 bg-secondary/50 border-none rounded-2xl text-sm font-bold text-foreground focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground"
                        placeholder="https://linkedin.com/..."
                      />
                    </div>
                  </div>
                </section>

                <div className="space-y-2">
                  <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Last Contacted</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/50">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <input
                      type="date"
                      value={formData.last_contact_date}
                      onChange={(e) => setFormData({ ...formData, last_contact_date: e.target.value })}
                      className="block w-full pl-12 pr-4 py-4 bg-secondary/50 border-none rounded-2xl text-sm font-bold text-foreground focus:ring-2 focus:ring-primary/20 transition-all"
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
                form="contact-form"
                disabled={isLoading}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-12 py-4 bg-primary text-primary-foreground rounded-2xl text-sm font-black uppercase tracking-widest shadow-premium shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-70"
              >
                {isLoading ? "Saving..." : (
                  <>
                    <Save className="w-4 h-4 mr-1" />
                    Save Contact
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
