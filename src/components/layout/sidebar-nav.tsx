'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  Briefcase,
  FileText,
  Handshake,
  LayoutDashboard,
  Users,
  Settings,
  Shield,
  GraduationCap,
  Bell,
  Database,
  UserPlus,
  Trophy,
  Calendar,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { UserRole } from '@/lib/mock-data';

const navItemsByRole = {
  student: [
    { href: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/student/mentorship', icon: Handshake, label: 'Mentorship' },
    { href: '/student/jobs', icon: Briefcase, label: 'Jobs' },
    { href: '/student/networking', icon: Users, label: 'Networking' },
    { href: '/student/quests', icon: Shield, label: 'Quests' },
    { href: '/student/academics', icon: GraduationCap, label: 'Academics' },
    { href: '/student/articles', icon: FileText, label: 'Articles' },
  ],
  admin: [
    { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Admin Dashboard' },
    { href: '/admin/manage-alumni', icon: Database, label: 'Alumni Database' },
    { href: '/admin/manage-faculty', icon: UserPlus, label: 'Manage Faculty' },
    { href: '/admin/notifications', icon: Bell, label: 'Send Notifications' },
    { href: '/admin/events', icon: Calendar, label: 'Manage Events' },
  ],
  faculty: [
    { href: '/faculty/dashboard', icon: LayoutDashboard, label: 'Faculty Dashboard' },
    { href: '/faculty/students', icon: Users, label: 'View Students' },
    { href: '/faculty/assignments', icon: FileText, label: 'Create Assignments' },
    { href: '/faculty/mentorship', icon: Handshake, label: 'Provide Mentorship' },
  ],
  alumni: [
    { href: '/alumni/dashboard', icon: LayoutDashboard, label: 'Alumni Dashboard' },
    { href: '/alumni/mentorship', icon: Handshake, label: 'Provide Mentorship' },
    { href: '/alumni/networking', icon: Users, label: 'Alumni Network' },
    { href: '/alumni/articles', icon: FileText, label: 'Share Experience' },
  ],
  employer: [
    { href: '/employer/dashboard', icon: LayoutDashboard, label: 'Employer Dashboard' },
    { href: '/employer/candidates', icon: Users, label: 'Browse Candidates' },
    { href: '/employer/jobs', icon: Briefcase, label: 'Manage Jobs' },
    { href: '/employer/leaderboard', icon: Trophy, label: 'Leaderboard' },
  ],
  superadmin: [], // Superadmin has a separate view
};

export function SidebarNav({ userRole }: { userRole: UserRole }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const navItems = navItemsByRole[userRole] || [];
  
  const logoHref = `/${userRole}/dashboard`;

  const currentParams = new URLSearchParams(searchParams.toString());
  currentParams.set('role', userRole);
  
  const getHref = (baseHref: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('role', userRole);
      return `${baseHref}?${params.toString()}`;
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-16 flex-col border-r bg-card sm:flex">
       <TooltipProvider delayDuration={100}>
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
       <Link
          href={getHref(logoHref)}
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Handshake className="h-5 w-5 transition-transform group-hover:scale-110" />
          <span className="sr-only">Alumni Setu</span>
        </Link>
        
          {navItems.map((item) => (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <Link
                  href={getHref(item.href)}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                    pathname === item.href && "bg-accent text-accent-foreground"
                    )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
      </nav>
      </TooltipProvider>
    </aside>
  );
}
