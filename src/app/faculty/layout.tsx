
'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { useUser } from "@/firebase";
import { UserStateProvider } from "@/context/user-state-context";
import { Skeleton } from '@/components/ui/skeleton';
import { getUserRole } from '@/lib/mock-data';

function FacultyLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  const viewAsRole = searchParams.get('viewAs');
  const userRole = user ? getUserRole(user.uid) : null;
  
  useEffect(() => {
    if (isUserLoading) return;

    if (!user) {
      router.push('/login');
      return;
    }
    
    const isSuperAdminImpersonating = userRole === 'superadmin' && viewAsRole === 'faculty';

    if (userRole !== 'faculty' && !isSuperAdminImpersonating) {
      router.push('/login');
    }

  }, [isUserLoading, user, router, userRole, viewAsRole]);

  if (isUserLoading || !userRole) {
    return <LoadingSkeleton />;
  }

  const sidebarRole = (userRole === 'superadmin' && viewAsRole === 'faculty') ? 'faculty' : userRole;
  if (sidebarRole !== 'faculty') {
     return <LoadingSkeleton />;
  }

  return (
    <UserStateProvider>
      <div className="flex min-h-screen w-full">
        <SidebarNav userRole={sidebarRole} />
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


export default function FacultyLayout({ children }: { children: React.ReactNode; }) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <FacultyLayoutContent>{children}</FacultyLayoutContent>
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
            <Skeleton className="h-8 w-48" />
            <div className="flex flex-1 items-center justify-end gap-4 md:gap-2 lg:gap-4">
              <Skeleton className="h-8 w-[320px]" rounded-lg" />
              <Skeleton className="h-9 w-9 rounded-full" />
            </div>
          </header>
          <main className="flex-1 space-y-8 p-4 md:p-6 lg:p-8">
             <div className="space-y-8 animate-pulse">
                <Skeleton className="h-[100px]" />
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <Skeleton className="h-[200px]" />
                    <Skeleton className="h-[200px]" />
                    <Skeleton className="h-[200px]" />
                </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
