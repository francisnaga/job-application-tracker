'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { loginWithGoogle } from './actions';
import { Mail, ArrowRight, Briefcase, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { Skeleton } from '@/components/ui/Skeleton';

function LoginContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-background">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="absolute top-8 left-8 z-50">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Career Home
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-md w-full"
      >
        <div className="surface p-10 md:p-12 space-y-10 shadow-premium-xl bg-card border-border/50">
          <div className="space-y-6">
            <BrandLogo size="lg" />
            <div className="space-y-2">
              <p className="text-muted-foreground font-medium leading-relaxed">
                Log in to your career dashboard.
              </p>
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-destructive/10 text-destructive text-sm p-4 rounded-xl border border-destructive/20 text-center font-bold"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-6">
            <button
              onClick={() => loginWithGoogle()}
              className={cn(
                "w-full flex items-center justify-center gap-3 px-8 py-4",
                "bg-foreground text-background rounded-2xl",
                "text-sm font-bold transition-all shadow-xl hover:shadow-foreground/10 active:scale-95 group"
              )}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="currentColor"
                  className="text-primary"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="currentColor"
                  className="text-foreground/50"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="currentColor"
                  className="text-foreground/30"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="currentColor"
                  className="text-foreground/70"
                />
              </svg>
              Continue with Google
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-4 text-muted-foreground font-black uppercase tracking-[0.2em]">
                  Sign in
                </span>
              </div>
            </div>

            <p className="text-center text-muted-foreground text-[10px] font-bold uppercase tracking-widest leading-loose">
              By signing in, you agree to our <br />
              <span className="text-foreground hover:underline cursor-pointer">Terms of Service</span> and <span className="text-foreground hover:underline cursor-pointer">Privacy Policy</span>.
            </p>
          </div>
        </div>

        <p className="mt-10 text-center text-muted-foreground text-sm font-medium">
          Don't have an account? <span className="text-primary font-bold cursor-pointer hover:underline" onClick={() => loginWithGoogle()}>Sign up now</span>
        </p>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 gap-8">
        <Skeleton className="w-14 h-14 rounded-2xl" />
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
