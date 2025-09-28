
'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { useUser } from "@/firebase";
import { UserStateProvider } from "@/context/user-state-context";
import { Skeleton } from '@/components/ui/skeleton';
import { getUserRole, type UserRole } from '@/lib/mock-data';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [viewAsRole, setViewAsRole] = useState<UserRole | null>(null);
  const actualRole = user ? getUserRole(user.uid) : null;
  const currentRole = viewAsRole || actualRole;
  
  useEffect(() => {
    const viewAs = searchParams.get('viewAs') as UserRole;
    if (actualRole === 'superadmin' && viewAs) {
      if (['student', 'admin', 'faculty', 'alumni', 'employer'].includes(viewAs)) {
        setViewAsRole(viewAs);
      }
    } else {
      setViewAsRole(null);
    }
  }, [searchParams, actualRole]);

  useEffect(() => {
    if (isUserLoading) return;

    if (!user) {
      router.push('/login');
      return;
    }

    const role = getUserRole(user.uid);
    const dashboardPaths: { [key: string]: string } = {
      student: '/dashboard',
      admin: '/admin',
      faculty: '/faculty',
      alumni: '/alumni',
      employer: '/employer',
    };
    
    // If superadmin lands in this layout without impersonating, redirect them.
    if (role === 'superadmin' && !viewAsRole) {
      router.replace('/creator-view');
      return;
    }

    // For other roles, if they land on a main dashboard that isn't theirs, redirect.
    if (role !== 'superadmin') {
        const mainDashboardPaths = Object.values(dashboardPaths);
        const expectedPath = dashboardPaths[role];
        if (mainDashboardPaths.includes(pathname) && pathname !== expectedPath) {
            router.replace(expectedPath);
        } else if (pathname === '/' && user) {
            router.replace(expectedPath);
        }
    }
  }, [isUserLoading, user, router, pathname, viewAsRole, actualRole]);

  if (isUserLoading || !currentRole) {
    return (
      <div className="flex min-h-screen w-full">
        <div className="fixed inset-y-0 left-0 z-40 hidden w-16 flex-col border-r bg-card sm:flex p-2 items-center gap-4">
          <Skeleton className="h-9 w-9 rounded-full" />
          <div className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
        </div>
        <div className="flex flex-1 flex-col sm:pl-16">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
            <Skeleton className="h-8 w-48" />
            <div className="flex flex-1 items-center justify-end gap-4 md:gap-2 lg:gap-4">
              <Skeleton className="h-8 w-[320px] rounded-lg" />
              <Skeleton className="h-9 w-9 rounded-full" />
            </div>
          </header>
          <main className="flex-1 space-y-8 p-4 md:p-6 lg:p-8">
            <LoadingState />
          </main>
        </div>
      </div>
    );
  }

  // If a superadmin is trying to access a non-creator page without impersonating,
  // we show a loading screen until the redirect to /creator-view completes.
  if (actualRole === 'superadmin' && !viewAsRole) {
    return (
        <div className="flex min-h-screen w-full items-center justify-center">
            <p>Redirecting to Creator View...</p>
        </div>
    );
  }

  return (
    <UserStateProvider>
      <div className="flex min-h-screen w-full">
        <SidebarNav userRole={currentRole} actualRole={actualRole} />
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

function LoadingState() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <Skeleton className="lg:col-span-3 h-[300px]" />
        <Skeleton className="lg:col-span-2 h-[300px]" />
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="lg:col-span-3 h-[350px]" />
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Skeleton className="h-[250px]" />
        <Skeleton className="h-[250px]" />
      </div>
    </div>
  )
}
