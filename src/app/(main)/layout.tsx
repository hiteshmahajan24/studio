
'use client';

import { SidebarNav } from "@/components/layout/sidebar-nav";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { user } from "@/lib/mock-data";
import { UserStateProvider } from "@/context/user-state-context";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserStateProvider>
      <div className="flex min-h-screen w-full">
        <SidebarNav />
        <div className="flex flex-1 flex-col sm:pl-16">
          <DashboardHeader studentName={user.name} />
          <main className="flex-1 space-y-8 p-4 md:p-6 lg:p-8">
              {children}
          </main>
        </div>
      </div>
    </UserStateProvider>
  );
}
