
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateInstituteDialog } from "@/components/superadmin/create-institute-dialog";
import { Building, Database, UserCog, Eye, Users, GraduationCap, User, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreatorViewPage() {
  const roleViews = [
    { role: 'Student', href: '/student/dashboard', icon: Users },
    { role: 'Admin', href: '/admin/dashboard', icon: UserCog },
    { role: 'Faculty', href: '/faculty/dashboard', icon: GraduationCap },
    { role: 'Alumni', href: '/alumni/dashboard', icon: User },
    { role: 'Employer', href: '/employer/dashboard', icon: Briefcase },
  ];

  return (
    <div className="p-4 md:p-8">
       <div className="mb-8 flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold text-destructive">Creator View</h1>
            <p className="text-muted-foreground">Global control panel for platform management.</p>
        </div>
        <Button asChild variant="outline">
            <Link href="/student/dashboard">Exit Creator View</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Building /> Institute Management</CardTitle>
            <CardDescription>Create and manage institute profiles and their administrators.</CardDescription>
          </CardHeader>
          <CardContent>
            <CreateInstituteDialog>
                <Button className="w-full">Create New Institute</Button>
            </CreateInstituteDialog>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><UserCog /> User Management</CardTitle>
            <CardDescription>View, edit, and manage every user account on the platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="destructive">
               Access User Management
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Database /> Raw Data Access</CardTitle>
            <CardDescription>Directly interact with the entire Firestore database.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="destructive">
              Open Data Explorer
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Eye /> Platform Impersonation</CardTitle>
          <CardDescription>View the platform from the perspective of different user roles. This is your "secret" role-switcher.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {roleViews.map(view => (
                 <Button key={view.role} asChild variant="outline" className="h-20 flex-col gap-2">
                    <Link href={view.href}>
                        <view.icon className="h-6 w-6" />
                        <span>View as {view.role}</span>
                    </Link>
                </Button>
            ))}
        </CardContent>
      </Card>

    </div>
  );
}
