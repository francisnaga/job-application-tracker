'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  LayoutGrid, 
  List, 
  MoreVertical, 
  ExternalLink, 
  Pencil, 
  Trash2, 
  Plus,
  ArrowUpDown,
  Download,
  Briefcase,
  Compass
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import ApplicationFormModal from '@/components/applications/ApplicationFormModal';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface ApplicationsClientProps {
  initialData: any[];
}

export default function ApplicationsClient({ initialData }: ApplicationsClientProps) {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<any>(null);

  const filteredApps = initialData.filter(app => {
    const matchesSearch = 
      app.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.role_title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return;
    
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    const { error } = await supabase.from('applications').delete().eq('id', id);
    if (!error) {
      router.refresh();
    }
  };

  const handleExport = () => {
    const headers = ['Company', 'Role', 'Status', 'Applied Date', 'Follow-up Date', 'Link', 'Notes'];
    const csvContent = [
      headers.join(','),
      ...initialData.map(app => [
        `"${app.company_name}"`,
        `"${app.role_title}"`,
        `"${app.status}"`,
        app.applied_date,
        app.follow_up_date || '',
        `"${app.job_link || ''}"`,
        `"${(app.notes || '').replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `job-applications-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'offer': return "bg-green-500/10 text-green-500 border-green-500/20";
      case 'interview': return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case 'rejected': return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-primary/10 text-primary border-primary/20";
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10 pb-20"
    >
      {/* Header with Search and Controls */}
      <section className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between surface p-8 border-border/10 bg-card">
        <div className="flex-1 flex items-center gap-6">
           <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search Pipeline..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-background border-white/5 rounded-2xl text-sm font-bold text-foreground focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50 backdrop-blur-xl"
              />
           </div>
           <div className="flex p-1.5 bg-background rounded-2xl border border-white/5">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-2 rounded-xl transition-all",
                  viewMode === 'grid' ? "bg-background shadow-lg text-primary" : "text-muted-foreground"
                )}
              >
                <LayoutGrid className="h-4.5 w-4.5" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={cn(
                  "p-2 rounded-xl transition-all",
                  viewMode === 'table' ? "bg-background shadow-lg text-primary" : "text-muted-foreground"
                )}
              >
                <List className="h-4.5 w-4.5" />
              </button>
           </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-6 py-3.5 bg-secondary hover:bg-secondary/70 text-foreground rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export History</span>
          </button>
          
          <button
            onClick={() => {
              setSelectedApp(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Position</span>
          </button>
        </div>
      </section>

      {/* Grid Content */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={viewMode}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.2 }}
        >
          {filteredApps.length === 0 ? (
            <div className="surface p-24 text-center border-border/10 flex flex-col items-center bg-card">
              <div className="w-20 h-20 bg-secondary/40 rounded-3xl flex items-center justify-center mb-6">
                <Search className="h-8 w-8 text-muted-foreground/30" />
              </div>
              <h3 className="text-2xl font-bold text-foreground tracking-tight">No traces found.</h3>
              <p className="text-muted-foreground font-medium max-w-xs mt-2 text-sm">Adjust your filters or log a new application to populate your workspace.</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredApps.map((app) => (
                <motion.div 
                  layout
                  key={app.id} 
                  className="group surface p-8 bg-card border-border/10 hover:border-primary/20 transition-all cursor-pointer relative overflow-hidden shadow-2xl"
                  onClick={() => {
                    setSelectedApp(app);
                    setIsModalOpen(true);
                  }}
                >
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-14 h-14 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg shadow-primary/10 group-hover:scale-110 transition-transform">
                      {app.company_name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedApp(app);
                          setIsModalOpen(true);
                        }}
                        className="p-2.5 text-muted-foreground hover:text-primary transition-all bg-secondary/50 rounded-xl"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(app.id);
                        }}
                        className="p-2.5 text-muted-foreground hover:text-destructive transition-all bg-secondary/50 rounded-xl"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-xl font-bold text-foreground tracking-tight leading-none group-hover:text-primary transition-colors">{app.role_title}</h3>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{app.company_name}</p>
                  </div>

                  <div className="mt-10 flex items-center justify-between border-t border-border/5 pt-6">
                    <span className={cn(
                      "px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border",
                      getStatusColor(app.status)
                    )}>
                      {app.status}
                    </span>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      {format(new Date(app.applied_date), 'MMM dd, yyyy')}
                    </span>
                  </div>
                  
                  {app.job_link && (
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="mt-6 flex items-center gap-2"
                    >
                      <a 
                        href={app.job_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline flex items-center gap-2"
                      >
                        Launch Listing <ExternalLink className="h-3 w-3" />
                      </a>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="surface border-border overflow-hidden bg-card shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-secondary/10 border-b border-border">
                    <th className="px-10 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Role Details</th>
                    <th className="px-10 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center">Status</th>
                    <th className="px-10 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-right">Applied On</th>
                    <th className="px-10 py-6 w-24"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredApps.map((app) => (
                    <tr 
                      key={app.id} 
                      className="group hover:bg-secondary/20 transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedApp(app);
                        setIsModalOpen(true);
                      }}
                    >
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-5">
                          <div className="w-11 h-11 bg-primary text-primary-foreground rounded-xl flex items-center justify-center font-bold shadow-md shadow-primary/10 group-hover:scale-105 transition-transform">
                            {app.company_name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-foreground tracking-tight leading-none group-hover:text-primary transition-colors">{app.role_title}</p>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-2">{app.company_name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8 text-center">
                        <span className={cn(
                          "inline-block px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border",
                          getStatusColor(app.status)
                        )}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-10 py-8 text-right text-[10px] font-bold text-muted-foreground whitespace-nowrap tracking-widest uppercase">
                        {format(new Date(app.applied_date), 'MMM dd, yyyy')}
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedApp(app);
                              setIsModalOpen(true);
                            }}
                            className="p-2 text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(app.id);
                            }}
                            className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <ApplicationFormModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setSelectedApp(null);
        }} 
        initialData={selectedApp}
      />
    </motion.div>
  );
}
