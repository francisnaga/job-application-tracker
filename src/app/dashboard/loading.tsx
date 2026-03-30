import { DashboardSkeleton } from '@/components/ui/Skeleton';
import { AppLayout } from '@/components/layout/AppLayout';

export default function Loading() {
  return (
    <AppLayout>
      <DashboardSkeleton />
    </AppLayout>
  );
}
