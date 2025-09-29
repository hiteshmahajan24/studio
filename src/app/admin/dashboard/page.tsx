
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Users, GraduationCap, Handshake, Briefcase } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { AddFacultyDialog } from "@/components/admin/add-faculty-dialog";
import { AddAlumniDialog } from "@/components/admin/add-alumni-dialog";

const userStats = [
  { name: 'Total Users', value: '1,250', icon: Users },
  { name: 'Active Students', value: '850', icon: GraduationCap },
  { name: 'Mentorship Sessions', value: '312', icon: Handshake },
  { name: 'Job Applications', value: '540', icon: Briefcase },
];

const userDistributionData = [
    { role: 'Student', count: 850 },
    { role: 'Alumni', count: 250 },
    { role: 'Faculty', count: 50 },
    { role: 'Employer', count: 100 },
];

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage faculty, alumni, events, and platform notifications.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {userStats.map(stat => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>User Role Distribution</CardTitle>
            <CardDescription>An overview of the different user types on the platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userDistributionData}>
                <XAxis dataKey="role" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your institute's members.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AddFacultyDialog>
                <Button className="w-full">
                    <PlusCircle className="mr-2" /> Add Faculty
                </Button>
            </AddFacultyDialog>
            <AddAlumniDialog>
                <Button variant="outline" className="w-full">
                    <PlusCircle className="mr-2" /> Add Alumni
                </Button>
            </AddAlumniDialog>
            <Button variant="outline" className="w-full">
              <PlusCircle className="mr-2" /> New Event
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
