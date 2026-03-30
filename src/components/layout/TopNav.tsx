'use client';

import { Bell, Search, User, Inbox, HelpCircle, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function TopNav() {
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname.startsWith('/dashboard')) return 'Dashboard';
    if (pathname.startsWith('/applications')) return 'Applications';
    if (pathname.startsWith('/analytics')) return 'Analytics';
    if (pathname.startsWith('/profile')) return 'Profile';
    return 'Dashboard';
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 md:h-20 items-center justify-between gap-6 bg-background/80 backdrop-blur-xl px-8 border-b border-border/10 pb-1">
      <div className="flex items-center gap-6">
        {/* Mobile Brand */}
        <div className="flex items-center gap-3 md:hidden">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tighter">Tracker Pro</span>
        </div>

        {/* Desktop Breadcrumbs */}
        <div className="hidden lg:flex items-center gap-4">
           <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Career Hub</span>
              <ChevronRight className="w-3 h-3 text-muted-foreground/30" />
              <AnimatePresence mode="wait">
                <motion.span 
                  key={getTitle()}
                  initial={{ y: -5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 5, opacity: 0 }}
                  className="text-[10px] font-black text-foreground uppercase tracking-[0.2em]"
                >
                  {getTitle()}
                </motion.span>
              </AnimatePresence>
           </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Minimal Actions */}
        <div className="flex items-center gap-3 pr-2">
          <ThemeToggle />
          
          <button className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-secondary/50 text-muted-foreground hover:text-foreground transition-all hover:bg-secondary">
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-primary rounded-full shadow-lg shadow-primary/40 ring-2 ring-background" />
          </button>
        </div>

        <div className="w-[1px] h-6 bg-border hidden sm:block" />

        <Link 
          href="/profile"
          className="flex items-center gap-3 px-1.5 py-1.5 rounded-2xl bg-secondary/30 border border-border/5 hover:bg-secondary/50 transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-background border border-border/50 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
            <User className="w-4.5 h-4.5 text-muted-foreground" />
          </div>
          <span className="text-[10px] font-black text-foreground uppercase tracking-widest px-1 hidden sm:inline">My Profile</span>
        </Link>
      </div>
    </header>
  );
}
