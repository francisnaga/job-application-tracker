'use client';

import { useState } from 'react';
import { 
  FileText, 
  ExternalLink, 
  Pencil, 
  Trash2, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Compass, 
  ShieldCheck, 
  Briefcase,
  Share2,
  MoreVertical,
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import DocumentFormModal from '@/components/documents/DocumentFormModal';
import { toast } from 'sonner';

interface DocumentsClientProps {
  initialData: any[];
}

export default function DocumentsClient({ initialData }: DocumentsClientProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);

  const filteredDocs = initialData.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (doc.type || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;
    
    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      
      const { error } = await supabase.from('documents').delete().eq('id', id);
      if (error) throw error;
      
      toast.success('Document deleted.');
      router.refresh();
    } catch (e) {
      toast.error('Failed to delete document.');
    }
  };

  const getDocTypeIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'resume': return <FileText className="w-5 h-5 text-primary" />;
      case 'portfolio': return <Compass className="w-5 h-5 text-purple-500" />;
      case 'cover letter': return <Briefcase className="w-5 h-5 text-indigo-500" />;
      default: return <Layers className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <AppLayout>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12 pb-20 pt-4"
      >
        {/* Elite Header */}
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
           <div className="space-y-4">
              <h1 className="text-5xl font-bold tracking-tighter text-foreground font-display leading-tight">
                Your <br />
                <span className="text-primary italic">Documents</span>
              </h1>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Manage your career files
              </p>
           </div>

           <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setSelectedDoc(null);
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                Add Document
              </button>
           </div>
        </header>

        {/* Search and Filters */}
        <section className="flex flex-col md:flex-row md:items-center gap-6 surface bg-card p-6 border-border">
           <div className="relative flex-1">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search Documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-secondary/50 border-none rounded-2xl text-sm font-bold text-foreground focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
              />
           </div>
           
           <div className="flex items-center gap-3 px-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {filteredDocs.length} Documents
           </div>
        </section>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           <AnimatePresence mode="popLayout">
              {filteredDocs.map((doc, i) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  className="group surface bg-card p-10 flex flex-col justify-between border-border hover:border-primary/20 hover:bg-secondary/20 transition-all relative overflow-hidden shadow-premium"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl pointer-events-none group-hover:bg-primary/10 transition-colors" />
                  
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                       <div className="w-14 h-14 bg-secondary/50 rounded-2xl flex items-center justify-center border border-border group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                          {getDocTypeIcon(doc.type)}
                       </div>
                       
                       <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => {
                              setSelectedDoc(doc);
                              setIsModalOpen(true);
                            }}
                            className="p-3 bg-background border border-border rounded-xl text-muted-foreground hover:text-primary transition-all"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(doc.id)}
                            className="p-3 bg-background border border-border rounded-xl text-muted-foreground hover:text-destructive transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                       </div>
                    </div>

                    <div className="space-y-2">
                       <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none flex items-center gap-2">
                          <span className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            doc.type === 'Resume' ? "bg-primary" : "bg-purple-500"
                          )} />
                          {doc.type || 'Undefined Asset'}
                       </p>
                       <h3 className="text-xl font-bold text-foreground tracking-tight leading-snug group-hover:text-primary transition-colors">{doc.name}</h3>
                    </div>
                  </div>

                  <div className="mt-10 pt-8 border-t border-border flex items-center justify-between">
                     <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Added {format(new Date(doc.created_at), 'MM.dd.yy')}</p>
                     
                     <a 
                       href={doc.url} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary border border-primary/20 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all"
                     >
                       Launch <ExternalLink className="w-3 h-3" />
                     </a>
                  </div>
                </motion.div>
              ))}
           </AnimatePresence>

           {filteredDocs.length === 0 && (
             <div className="col-span-full py-32 flex flex-col items-center justify-center surface bg-secondary/20 border-dashed border-border/50 text-center">
                <div className="w-20 h-20 bg-background border border-border rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                   <Layers className="w-8 h-8 text-muted-foreground opacity-20" />
                </div>
                <h3 className="text-2xl font-bold text-foreground tracking-tight">No documents added.</h3>
                <p className="text-sm font-medium text-muted-foreground max-w-sm mt-2 italic leading-relaxed">Keep your resumes, cover letters, and portfolios organized in one place.</p>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="mt-8 px-10 py-5 bg-card border border-border rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-foreground hover:bg-primary hover:text-primary-foreground transition-all active:scale-95"
                >
                  Add Document
                </button>
             </div>
           )}
        </div>
      </motion.div>

      <DocumentFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialData={selectedDoc}
      />
    </AppLayout>
  );
}
