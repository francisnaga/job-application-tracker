'use client';

import { AppLayout } from '@/components/layout/AppLayout';
import { Plus, Calendar, Clock, Star, MessageSquare, ChevronRight, Compass, ShieldCheck, TrendingUp, Filter, Search, Trash2, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import InterviewRoundFormModal from '@/components/interviews/InterviewRoundFormModal';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

interface InterviewsClientProps {
  user: any;
  initialRounds: any[];
  applications: any[];
}

export default function InterviewsClient({ user, initialRounds, applications }: InterviewsClientProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRound, setSelectedRound] = useState<any>(null);
  const [expandedFeedId, setExpandedFeedId] = useState<string | null>(null);

  const filteredRounds = initialRounds.filter(round => 
    round.applications?.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    round.round_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm('Purge this execution record? Performance data will be lost.')) return;
    
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    const { error } = await supabase.from('interview_rounds').delete().eq('id', id);
    if (!error) {
      router.refresh();
    }
  };

  const handleEdit = (round: any) => {
    setSelectedRound(round);
    setIsAddModalOpen(true);
  };

  const closeModals = () => {
    setIsAddModalOpen(false);
    setSelectedRound(null);
  };

  const toggleFeed = (id: string) => {
    setExpandedFeedId(expandedFeedId === id ? null : id);
  };

  return (
    <AppLayout>
      <div className="space-y-12 pb-20 pt-4">
        
        {/* Elite Header */}
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tighter text-foreground font-display leading-tight">
              Interview <br />
              <span className="text-primary italic">Execution</span>
            </h1>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Technical & Behavioral Performance Tracking
            </p>
          </div>

          <div className="flex items-center gap-4">
             <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Scan Rounds..." 
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

        {/* Interviews Timeline */}
        <div className="space-y-8 max-w-5xl">
          <AnimatePresence mode="popLayout">
            {filteredRounds.map((round, index) => (
              <motion.div
                key={round.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="surface p-10 bg-card border-border hover:border-primary/20 transition-all shadow-2xl flex flex-col group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                  <div className="flex items-start gap-8 flex-1">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex flex-col items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                      <span className="text-[10px] font-black uppercase tracking-tighter leading-none">{format(new Date(round.round_date), 'MMM')}</span>
                      <span className="text-2xl font-bold tracking-tight leading-none mt-1">{format(new Date(round.round_date), 'dd')}</span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-secondary/50 border border-border rounded-lg text-[9px] font-black uppercase tracking-widest text-muted-foreground">{round.round_name}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-xs font-bold text-foreground opacity-80">{round.applications?.company_name}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">{round.applications?.role_title}</h3>
                      <div className="flex items-center gap-6">
                         <div className="flex items-center gap-2">
                           <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                           <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{format(new Date(round.round_date), 'hh:mm a')}</span>
                         </div>
                         <div className="flex items-center gap-2">
                           <MessageSquare className="w-3.5 h-3.5 text-muted-foreground" />
                           <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{round.feedback ? 'Refined Log' : 'Missing Feedback'}</span>
                         </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                     <button 
                       onClick={() => toggleFeed(round.id)}
                       className="px-8 py-4 bg-secondary/50 border border-border rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all group/btn"
                     >
                       {expandedFeedId === round.id ? 'Close Intel' : 'Execution Feed'} <ChevronDown className={cn("w-3 h-3 inline ml-1 transition-transform", expandedFeedId === round.id && "rotate-180")} />
                     </button>
                     <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleEdit(round)}
                          className="p-3 rounded-xl hover:bg-secondary/50 text-muted-foreground transition-colors"
                        >
                          <Compass className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(round.id)}
                          className="p-3 rounded-xl hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                     </div>
                  </div>
                </div>

                {/* Expanded Feedback Feed */}
                <AnimatePresence>
                  {expandedFeedId === round.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-10 mt-10 border-t border-border">
                        <div className="p-8 bg-secondary/50 rounded-[2rem] border border-border space-y-4">
                           <p className="text-[9px] font-black uppercase tracking-widest text-primary">Performance Reflections</p>
                           <p className="text-sm font-medium text-muted-foreground leading-relaxed italic">
                             {round.feedback || 'Zero performance signals archived for this execution round. Initiate feedback logging to refine competitive strategy.'}
                           </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Zero State */}
          {filteredRounds.length === 0 && (
            <div className="py-32 flex flex-col items-center justify-center text-center space-y-8 grayscale opacity-40">
               <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center">
                 <ShieldCheck className="w-10 h-10 text-muted-foreground" />
               </div>
               <div className="space-y-3">
                 <p className="text-xl font-bold uppercase tracking-[0.3em] text-foreground">Zero Signals</p>
                 <p className="text-sm font-medium text-muted-foreground max-w-[300px] leading-relaxed italic">No active engagement sequences detected. Progress through your pipeline to trigger high-frequency execution rounds.</p>
               </div>
               <button 
                 onClick={() => setIsAddModalOpen(true)}
                 className="px-8 py-4 bg-primary/10 text-primary border border-primary/20 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
               >
                 Log Execution
               </button>
            </div>
          )}
        </div>

      </div>

      <InterviewRoundFormModal 
        isOpen={isAddModalOpen} 
        onClose={closeModals} 
        applications={applications}
        initialData={selectedRound}
      />
    </AppLayout>
  );
}
