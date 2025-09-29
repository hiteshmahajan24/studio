
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { UserStateProvider } from "@/context/user-state-context";
import { Skeleton } from '@/components/ui/skeleton';
import type { UserRole } from '@/lib/mock-data';

function EmployerLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') as UserRole | null;
  const displayRole = role || 'employer';

  return (
    <UserStateProvider>
      <div className="flex min-h-screen w-full">
        <SidebarNav userRole={displayRole} />
        <div className="flex flex-1 flex-col sm:pl-16">
          <DashboardHeader />
          <main className="flex-1 space-y-8 p-4 md:p-6 lg:p-8">
              {children}
          </main>
        </div>
      </div>
    </UserStateProvider>
  );
}

export default function EmployerLayout({ children }: { children: React.ReactNode; }) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <EmployerLayoutContent>{children}</EmployerLayoutContent>
    </Suspense>
  )
}

function LoadingSkeleton() {
    return (
      <div className="flex min-h-screen w-full">
        <div className="fixed inset-y-0 left-0 z-40 hidden w-16 flex-col border-r bg-card sm:flex p-2 items-center gap-4">
          <Skeleton className="h-9 w-9 rounded-full" />
          <div className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
        </div>
        <div className="flex flex-1 flex-col sm:pl-16">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
            <Skeleton className="h-8 w-48 rounded-md" />
            <div className="flex flex-1 items-center justify-end gap-4 md:gap-2 lg:gap-4">
              <Skeleton className="h-8 w-[200px] lg:w-[320px] rounded-lg" />
              <Skeleton className="h-9 w-9 rounded-full" />
            </div>
          </header>
          <main className="flex-1 space-y-8 p-4 md:p-6 lg:p-8">
             <div className="space-y-8">
                 <div className="space-y-2">
                    <Skeleton className="h-8 w-1/3" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <Skeleton className="h-28 rounded-lg" />
                    <Skeleton className="h-28 rounded-lg" />
                    <Skeleton className="h-28 rounded-lg" />
                </div>
                 <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
                    <Skeleton className="lg:col-span-3 h-[400px] rounded-lg" />
                    <Skeleton className="lg:col-span-2 h-[400px] rounded-lg" />
                </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
