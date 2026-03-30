'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'rounded';
}

export function Skeleton({ className, variant = 'rectangular' }: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-white/5",
        variant === 'circular' ? "rounded-full" : variant === 'rounded' ? "rounded-2xl" : "rounded-lg",
        className
      )}
    >
      <motion.div
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-full h-full"
      />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500 pt-4">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div className="space-y-4">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-14 w-48 rounded-2xl" />
          <Skeleton className="h-14 w-14 rounded-2xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[200px]">
        <Skeleton className="md:col-span-8 md:row-span-2 rounded-[2rem]" />
        <Skeleton className="md:col-span-4 rounded-[2rem]" />
        <Skeleton className="md:col-span-4 rounded-[2rem]" />
        <Skeleton className="md:col-span-6 md:row-span-2 rounded-[2rem]" />
        <div className="md:col-span-6 grid grid-cols-2 gap-8">
          <Skeleton className="rounded-[2rem]" />
          <Skeleton className="rounded-[2rem]" />
        </div>
      </div>
    </div>
  );
}

export function NetworkingSkeleton() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500 pt-4 px-6 md:px-0">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div className="space-y-4">
          <Skeleton className="h-12 w-80" />
          <Skeleton className="h-4 w-56" />
        </div>
        <Skeleton className="h-14 w-40 rounded-2xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-[280px] rounded-[2rem]" />
        ))}
      </div>
    </div>
  );
}
