
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Search, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ClientButton } from "./client-button";
import { useRouter, useSearchParams } from "next/navigation";
import { user as mockUser, type UserRole } from "@/lib/mock-data";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { ProfileSettingsDialog } from "./profile-settings-dialog";
import { Separator } from "../ui/separator";

const notifications = [
    { title: "New Mentorship Request", description: "David Chen has requested you as a mentor.", time: "5m ago" },
    { title: "Welcome to Web Wizards!", description: "You have successfully joined the community.", time: "1h ago" },
    { title: "Quest Completed!", description: "You earned 100 Knowledge Coins for 'Career Kickstarter'.", time: "3h ago" },
    { title: "Application Viewed", description: "Innovate Inc. has viewed your application for Frontend Developer.", time: "1d ago" },
];


export function DashboardHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const role = searchParams.get('role') as UserRole;

  const handleLogout = async () => {
    router.push('/login');
  };

  const getUserNameForRole = (role: UserRole | null) => {
    if (!role || role === 'student') {
      return mockUser.name;
    }
    return `${role.charAt(0).toUpperCase() + role.slice(1)} User`;
  };

  const userName = getUserNameForRole(role);
  const avatarFallback = userName.split(' ').map(n => n[0]).join('');

  return (
    <header className="sticky top-0 z-30 flex h-auto flex-col gap-4 border-b bg-background/80 px-4 py-4 backdrop-blur-sm md:h-16 md:flex-row md:items-center md:justify-between md:px-6 md:py-0">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold md:text-2xl">Welcome, {userName}!</h1>
         <div className="flex items-center gap-2 md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <ClientButton variant="ghost" size="icon" className="rounded-full">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Toggle notifications</span>
                </ClientButton>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Notifications</SheetTitle>
                  <SheetDescription>
                    You have {notifications.length} unread notifications.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-4 space-y-4">
                  {notifications.map((item, index) => (
                    <div key={index} className="space-y-1">
                      <p className="font-semibold text-sm">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
            <ProfileSettingsDialog>
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <ClientButton variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-9 w-9">
                        <AvatarFallback>{avatarFallback}</AvatarFallback>
                    </Avatar>
                    </ClientButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild><ProfileSettingsDialog.Trigger>Profile</ProfileSettingsDialog.Trigger></DropdownMenuItem>
                    <DropdownMenuItem asChild><ProfileSettingsDialog.Trigger>Settings</ProfileSettingsDialog.Trigger></DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            </ProfileSettingsDialog>
        </div>
      </div>
      <div className="flex w-full items-center gap-4 md:w-auto md:flex-1 md:justify-end md:gap-2 lg:gap-4">
        <div className="relative flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="w-full rounded-lg bg-muted pl-8" />
        </div>
        <div className="hidden items-center gap-2 md:flex">
            <Sheet>
              <SheetTrigger asChild>
                <ClientButton variant="ghost" size="icon" className="rounded-full">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Toggle notifications</span>
                </ClientButton>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Notifications</SheetTitle>
                  <SheetDescription>
                    You have {notifications.length} unread notifications.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  {notifications.map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
            <ProfileSettingsDialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <ClientButton variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-9 w-9">
                        <AvatarFallback>{avatarFallback}</AvatarFallback>
                    </Avatar>
                    </ClientButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} asChild><ProfileSettingsDialog.Trigger>Profile</ProfileSettingsDialog.Trigger></DropdownMenuItem>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} asChild><ProfileSettingsDialog.Trigger>Settings</ProfileSettingsDialog.Trigger></DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ProfileSettingsDialog>
        </div>
      </div>
    </header>
  );
}
