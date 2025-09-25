
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
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ClientButton } from "./client-button";

export function DashboardHeader({ studentName }: { studentName: string }) {
  const studentAvatar = PlaceHolderImages.find(
    (img) => img.id === "student-avatar"
  );

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold md:text-2xl">Welcome, {studentName.split(" ")[0]}!</h1>
      </div>
      <div className="flex flex-1 items-center justify-end gap-4 md:gap-2 lg:gap-4">
        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="w-full rounded-lg bg-muted pl-8 md:w-[200px] lg:w-[320px]" />
        </div>
        <ClientButton variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
        </ClientButton>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ClientButton variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-9 w-9">
                {studentAvatar && (
                  <AvatarImage src={studentAvatar.imageUrl} alt={studentAvatar.description} data-ai-hint={studentAvatar.imageHint} />
                )}
                <AvatarFallback>{studentName.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </ClientButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
