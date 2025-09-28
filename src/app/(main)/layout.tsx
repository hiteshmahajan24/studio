
'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { useUser } from "@/firebase";
import { UserStateProvider } from "@/context/user-state-context";
import { Skeleton } from '@/components/ui/skeleton';
import { getUserRole } from '@/lib/mock-data';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isUserLoading) return; // Wait until user status is resolved

    if (!user) {
      router.push('/login');
      return;
    }

    // Get user role and determine the correct dashboard path
    const role = getUserRole(user.uid);
    const dashboardPaths: { [key: string]: string } = {
      student: '/dashboard',
      admin: '/admin',
      faculty: '/faculty',
      alumni: '/alumni',
      employer: '/employer',
      superadmin: '/superadmin'
    };
    const expectedPath = dashboardPaths[role] || '/dashboard';
    
    // Allow access to sub-paths but redirect from root if role doesn't match
    const allowedBasePaths = ['/mentorship', '/jobs', '/networking', '/quests', '/academics', '/articles', '/communities'];
    const isAllowedSubPath = allowedBasePaths.some(p => pathname.startsWith(p));

    if (pathname === '/dashboard' && role !== 'student') {
        router.replace(expectedPath);
    } else if (pathname === '/admin' && role !== 'admin') {
        router.replace(expectedPath);
    } else if (pathname === '/faculty' && role !== 'faculty') {
        router.replace(expectedPath);
    } else if (pathname === '/alumni' && role !== 'alumni') {
        router.replace(expectedPath);
    } else if (pathname === '/employer' && role !== 'employer') {
        router.replace(expectedPath);
    } else if (pathname === '/superadmin' && role !== 'superadmin') {
        router.replace(expectedPath);
    } else if (pathname === '/' || (!isAllowedSubPath && pathname !== expectedPath)) {
        // If at root or a dashboard path that isn't theirs, redirect.
        router.replace(expectedPath);
    }

  }, [isUserLoading, user, router, pathname]);

  if (isUserLoading || !user) {
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
  
  const role = getUserRole(user.uid);

  return (
    <UserStateProvider>
      <div className="flex min-h-screen w-full">
        <SidebarNav userRole={role} />
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
