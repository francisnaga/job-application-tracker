'use client';

import { DashboardSkeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="container mx-auto px-6 py-8 md:px-10 md:py-12 animate-in fade-in duration-700">
      <DashboardSkeleton />
    </div>
  );
}
