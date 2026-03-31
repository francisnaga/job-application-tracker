'use client';

import { cn } from '@/lib/utils';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showText?: boolean;
}

export function BrandLogo({ className, size = 'md', showText = true }: BrandLogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8 md:w-9 md:h-9',
    lg: 'w-12 h-12',
    hero: 'w-20 h-20 md:w-24 md:h-24'
  };

  const textSizes = {
    sm: 'text-xs tracking-[0.15em]',
    md: 'text-sm md:text-base tracking-[0.2em]',
    lg: 'text-xl tracking-[0.25em]',
    hero: 'text-3xl md:text-4xl tracking-[0.3em]'
  };

  const subTextSizes = {
    sm: 'text-[6px]',
    md: 'text-[8px] md:text-[9px]',
    lg: 'text-[10px]',
    hero: 'text-xs md:text-sm'
  };

  return (
    <div className={cn("flex items-center gap-3 md:gap-4 group cursor-pointer shrink-0", className)}>
      <div className={cn("relative flex items-center justify-center", sizeClasses[size])}>
        <svg viewBox="0 0 40 40" className="w-full h-full text-primary fill-none transition-transform duration-500 group-hover:rotate-12" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12L20 28L28 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="20" cy="12" r="3" fill="currentColor" />
        </svg>
      </div>
      
      {showText && (
        <div className="flex flex-col -space-y-1">
          <span className={cn("font-semibold text-foreground uppercase", textSizes[size])}>
            Vantage
          </span>
          <span className={cn("font-black uppercase tracking-[0.25em] text-muted-foreground/60 transition-colors group-hover:text-primary", subTextSizes[size])}>
            By Naga
          </span>
        </div>
      )}
    </div>
  );
}
