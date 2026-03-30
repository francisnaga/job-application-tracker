'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, BarChart3, LogOut, Briefcase, User, Search, Settings, Compass, Users, TrendingUp, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Applications', href: '/applications', icon: Briefcase },
  { name: 'Networking', href: '/networking', icon: Users },
  { name: 'Interviews', href: '/interviews', icon: Calendar },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Analytics', href: '/analytics', icon: TrendingUp },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <aside className="hidden w-72 md:flex flex-col fixed left-0 top-0 h-screen z-40 bg-card border-r border-border/10 overflow-hidden">
      {/* Brand Header */}
      <div className="p-10 pb-12">
        <Link href="/dashboard" className="flex items-center gap-3.5 group">
          <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/25 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
            <Compass className="w-5.5 h-5.5" />
          </div>
          <div className="flex flex-col -gap-1">
            <span className="text-2xl font-bold tracking-tighter font-display uppercase">Vantage</span>
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-primary/60 ml-0.5">By Naga</span>
          </div>
        </Link>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 px-6 space-y-12">
        <section className="space-y-1">
          <p className="px-4 text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em] mb-4">Workspace</p>
          <nav className="space-y-1.5">
            {navigation.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative group flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all",
                    isActive
                      ? "text-primary bg-primary/10 shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3.5 h-4.5 w-4.5 transition-transform group-hover:scale-110",
                      isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </section>

        <section className="space-y-1">
           <p className="px-4 text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em] mb-4">Settings</p>
           <Link
             href="/profile"
             className={cn(
               "flex items-center px-4 py-3 text-sm font-bold rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all",
               pathname === '/profile' && "text-primary bg-primary/10"
             )}
           >
             <Settings className="mr-3.5 h-4.5 w-4.5" />
             Account Options
           </Link>
        </section>
      </div>

      {/* Profile / Context Footer */}
      <div className="p-6 mt-auto">
         <div className="surface bg-secondary/30 p-4 flex items-center justify-between border-transparent">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-background border border-border/50 flex items-center justify-center">
                <User className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="max-w-[100px]">
                <p className="text-[10px] font-black text-muted-foreground uppercase truncate">Active</p>
                <p className="text-xs font-bold text-foreground truncate">My Account</p>
              </div>
            </div>
            <button 
              onClick={handleSignOut}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all group"
              title="Sign Out"
            >
              <LogOut className="w-4.5 h-4.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
         </div>
      </div>
    </aside>
  );
}
