
'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useUser } from "@/firebase";
import { getUserRole, type UserRole } from '@/lib/mock-data';
import { Skeleton } from '@/components/ui/skeleton';

const roleRedirects: { [key in UserRole]: string } = {
  student: '/student/dashboard',
  admin: '/admin/dashboard',
  faculty: '/faculty/dashboard',
  alumni: '/alumni/dashboard',
  employer: '/employer/dashboard',
  superadmin: '/creator-view',
};

function MainLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const viewAs = searchParams.get('viewAs');

  useEffect(() => {
    if (isUserLoading) return;

    if (!user) {
      router.push('/login');
      return;
    }

    const role = getUserRole(user.uid);

    // If superadmin is trying to view as another role, let them proceed.
    // The specific role layout will handle the final authorization.
    if (role === 'superadmin' && viewAs) {
      const targetPath = roleRedirects[viewAs as UserRole] || roleRedirects.student;
      const newUrl = `${targetPath}?${searchParams.toString()}`;
      if (pathname !== targetPath) {
        router.push(newUrl);
      }
      return;
    }
    
    // For any other user, redirect to their default dashboard.
    const redirectPath = roleRedirects[role] || roleRedirects.student;
    if(pathname !== redirectPath) {
       router.push(redirectPath);
    }
   
  }, [isUserLoading, user, router, pathname, viewAs, searchParams]);

  if(isUserLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-8 w-8 animate-spin rounded-full" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Render children if redirection hasn't happened yet or if it's not needed.
  // This helps prevent flashes of content before redirection.
  return <>{children}</>;
}


export default function MainLayout({ children }: { children: React.ReactNode; }) {
  return (
    <Suspense fallback={<div className="flex min-h-screen w-full items-center justify-center">Loading...</div>}>
      <MainLayoutContent>{children}</MainLayoutContent>
    </Suspense>
  )
}
