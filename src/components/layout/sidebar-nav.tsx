
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  BarChart3,
  Building,
  UserCog,
  Eye,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { UserRole } from '@/lib/mock-data';

const navItemsByRole = {
  student: [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/mentorship', icon: Handshake, label: 'Mentorship' },
    { href: '/jobs', icon: Briefcase, label: 'Jobs' },
    { href: '/networking', icon: Users, label: 'Networking' },
    { href: '/quests', icon: Shield, label: 'Quests' },
    { href: '/academics', icon: GraduationCap, label: 'Academics' },
    { href: '/articles', icon: FileText, label: 'Articles' },
  ],
  admin: [
    { href: '/admin', icon: LayoutDashboard, label: 'Admin Dashboard' },
    { href: '/admin/manage-alumni', icon: Database, label: 'Manage Alumni' },
    { href: '/admin/manage-faculty', icon: UserPlus, label: 'Manage Faculty' },
    { href: '/admin/notifications', icon: Bell, label: 'Send Notifications' },
    { href: '/admin/events', icon: Briefcase, label: 'Manage Events' },
  ],
  faculty: [
    { href: '/faculty', icon: LayoutDashboard, label: 'Faculty Dashboard' },
    { href: '/faculty/students', icon: Users, label: 'View Students' },
    { href: '/faculty/assignments', icon: FileText, label: 'Create Assignments' },
    { href: '/mentorship', icon: Handshake, label: 'Provide Mentorship' },
  ],
  alumni: [
    { href: '/alumni', icon: LayoutDashboard, label: 'Alumni Dashboard' },
    { href: '/mentorship', icon: Handshake, label: 'Provide Mentorship' },
    { href: '/networking', icon: Users, label: 'Alumni Network' },
    { href: '/articles', icon: FileText, label: 'Share Experience' },
  ],
  employer: [
    { href: '/employer', icon: LayoutDashboard, label: 'Employer Dashboard' },
    { href: '/employer/candidates', icon: Users, label: 'Find Candidates' },
    { href: '/employer/leaderboard', icon: BarChart3, label: 'Leaderboard' },
  ],
  superadmin: [ // The main nav for superadmin is now simple.
    { href: '/creator-view', icon: UserCog, label: 'Creator View' },
  ]
};

const LogoIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 transition-transform group-hover:scale-110"
    >
      <path d="m12 3-8.85 3.93a1 1 0 0 0-.15 1.76l8.85 4.38a1 1 0 0 0 .3 0l8.85-4.38a1 1 0 0 0-.15-1.76L12 3Z" />
      <path d="M20.85 8.68 12 13.06l-8.85-4.38" />
      <path d="m12 21 8.85-4.38a1 1 0 0 0 .15-1.76L12 10.5l-8.85 4.38a1 1 0 0 0-.15 1.76L12 21Z" />
    </svg>
  );

export function SidebarNav({ userRole, actualRole }: { userRole: UserRole, actualRole: UserRole | null }) {
  const pathname = usePathname();
  // If we are impersonating a role, show that role's nav items. Otherwise, show the actual role's items.
  const navItems = navItemsByRole[userRole] || navItemsByRole.student;

  // The logo now always links to the primary dashboard for the current view.
  const logoHref = actualRole === 'superadmin' && userRole === 'superadmin' 
    ? '/creator-view' 
    : navItemsByRole[userRole]?.[0]?.href || '/dashboard';

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-16 flex-col border-r bg-card sm:flex">
       <TooltipProvider delayDuration={100}>
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href={logoHref}
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <LogoIcon />
          <span className="sr-only">NexusConnect</span>
        </Link>
          {navItems.map((item) => (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                    // Use a simple startsWith check for active state
                    pathname.startsWith(item.href) && "bg-accent text-accent-foreground"
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
