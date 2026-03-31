'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, Plus, BarChart3, User, LayoutDashboard, Briefcase, TrendingUp, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import ApplicationFormModal from '@/components/applications/ApplicationFormModal';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Apps', href: '/applications', icon: Briefcase },
];

const rightNavItems = [
  { name: 'Docs', href: '/documents', icon: FileText },
  { name: 'Network', href: '/networking', icon: Users },
];

export function BottomNav() {
  const pathname = usePathname();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-t border-border pb-[env(safe-area-inset-bottom,1.5rem)] px-6">
        <div className="flex justify-between items-center h-[72px] relative">
          <div className="flex w-[40%] justify-around">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative flex flex-col items-center justify-center w-full py-2 gap-1.5 transition-all z-10",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className={cn("h-5.5 w-5.5 transition-transform", isActive && "scale-110")} />
                  <span className="text-[8px] font-black uppercase tracking-[0.2em]">{item.name}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="nav-glow"
                      className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_rgba(37,99,235,0.8)]"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex-1 flex justify-center -mt-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center justify-center w-15 h-15 bg-primary text-primary-foreground rounded-2xl shadow-2xl shadow-primary/40 hover:bg-primary/90 transition-all z-20 border-4 border-background"
            >
              <Plus className="h-7 w-7" />
            </motion.button>
          </div>

          <div className="flex w-[40%] justify-around">
            {rightNavItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative flex flex-col items-center justify-center w-full py-2 gap-1.5 transition-all z-10",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <item.icon className={cn("h-5.5 w-5.5 transition-transform", isActive && "scale-110")} />
                  <span className="text-[8px] font-black uppercase tracking-[0.2em]">{item.name}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="nav-glow"
                      className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_rgba(37,99,235,0.8)]"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <ApplicationFormModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </>
  );
}
