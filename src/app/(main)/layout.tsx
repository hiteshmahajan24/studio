
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
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

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  
  useEffect(() => {
    if (isUserLoading) return;

    if (!user) {
      router.push('/login');
      return;
    }

    const role = getUserRole(user.uid);
    router.push(roleRedirects[role]);

  }, [isUserLoading, user, router]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="h-8 w-8 animate-spin rounded-full" />
        <p>Loading...</p>
      </div>
    </div>
  );
}
