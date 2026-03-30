import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { BottomNav } from './BottomNav';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex w-full bg-background overflow-hidden selection:bg-primary/30">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full md:ml-72 relative">
        <TopNav />
        <main className="flex-1 overflow-y-auto pb-24 md:pb-8 p-6 lg:p-10">
          <div className="mx-auto max-w-7xl w-full">
            {children}
          </div>
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
