'use client';

import { AppLayout } from '@/components/layout/AppLayout';
import { Plus, Search, User, Mail, Link as LinkIcon, Calendar, MoreHorizontal, Building2, Phone, Filter, ChevronRight, Compass, Users, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import ContactFormModal from '@/components/networking/ContactFormModal';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

interface NetworkingClientProps {
  user: any;
  contacts: any[];
}

export default function NetworkingClient({ user, contacts }: NetworkingClientProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm('Abort this alliance? Signal will be terminated permanently.')) return;
    
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    const { error } = await supabase.from('contacts').delete().eq('id', id);
    if (!error) {
      router.refresh();
    }
  };

  const handleEdit = (contact: any) => {
    setSelectedContact(contact);
    setIsAddModalOpen(true);
  };

  const closeModals = () => {
    setIsAddModalOpen(false);
    setSelectedContact(null);
  };

  return (
    <AppLayout>
      <div className="space-y-12 pb-20 pt-4">
        
        {/* Elite Header */}
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tighter text-foreground font-display leading-tight">
              Network <br />
              <span className="text-primary italic">Intelligence</span>
            </h1>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Strategic Referral Management
            </p>
          </div>

          <div className="flex items-center gap-4">
             <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Analyze Field..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-secondary/10 border-white/5 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none w-64 md:w-80 backdrop-blur-xl text-foreground placeholder:text-muted-foreground"
                />
             </div>
             <button 
               onClick={() => setIsAddModalOpen(true)}
               className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30 active:scale-95 group"
             >
                <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
             </button>
          </div>
        </header>

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredContacts.map((contact, index) => (
              <motion.div
                key={contact.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className="surface p-8 flex flex-col justify-between group hover:border-primary/30 transition-all border-border bg-card shadow-2xl min-h-[280px]"
              >
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-all">
                      <User className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEdit(contact)}
                        className="p-2 rounded-xl hover:bg-secondary/50 text-muted-foreground transition-colors"
                      >
                        <Compass className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(contact.id)}
                        className="p-2 rounded-xl hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">{contact.name}</h3>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-2">
                       {contact.role || 'Strategic Asset'} @ <span className="text-foreground">{contact.company_name || 'Autonomous'}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    {contact.linkedin_url && (
                      <a href={contact.linkedin_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center hover:bg-primary transition-all group/icon">
                        <LinkIcon className="w-4 h-4 text-muted-foreground group-hover/icon:text-primary-foreground" />
                      </a>
                    )}
                    {contact.email && (
                      <a href={`mailto:${contact.email}`} className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center hover:bg-primary transition-all group/icon">
                        <Mail className="w-4 h-4 text-muted-foreground group-hover/icon:text-primary-foreground" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="pt-6 border-t border-border flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                     <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mt-0.5">
                       {contact.last_contact_date ? `Last Signal: ${format(new Date(contact.last_contact_date), 'MMM d')}` : 'Offline'}
                     </span>
                   </div>
                   <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all opacity-0 group-hover:opacity-100 group-hover:translate-x-1" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Zero State */}
          {filteredContacts.length === 0 && (
            <div className="md:col-span-12 py-32 flex flex-col items-center justify-center text-center space-y-8 grayscale opacity-40">
               <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center">
                 <Users className="w-10 h-10 text-muted-foreground" />
               </div>
               <div className="space-y-3">
                 <p className="text-xl font-bold uppercase tracking-[0.3em] text-foreground">Aura Offline</p>
                 <p className="text-sm font-medium text-muted-foreground max-w-[300px] leading-relaxed italic">Expand your field of influence. Strategic connections are the fuel for modern career velocity.</p>
               </div>
               <button 
                 onClick={() => setIsAddModalOpen(true)}
                 className="px-8 py-4 bg-primary/10 text-primary border border-primary/20 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
               >
                 Initiate Connection
               </button>
            </div>
          )}
        </div>

      </div>

      <ContactFormModal 
        isOpen={isAddModalOpen} 
        onClose={closeModals} 
        initialData={selectedContact}
      />
    </AppLayout>
  );
}
