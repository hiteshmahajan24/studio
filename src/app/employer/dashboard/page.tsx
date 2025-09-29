
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BarChart3, Briefcase, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const employerStats = [
    { name: 'Total Candidates', value: '1,100+', icon: Users, href: '/employer/candidates' },
    { name: 'Active Job Postings', value: '2', icon: Briefcase, href: '/employer/jobs' },
    { name: 'Leaderboard Talent', value: 'Top 10', icon: BarChart3, href: '/employer/leaderboard' },
];

const majorDistributionData = [
    { name: 'CS', count: 450 },
    { name: 'Statistics', count: 200 },
    { name: 'Electrical Eng.', count: 150 },
    { name: 'Mechanical Eng.', count: 100 },
    { name: 'Humanities', count: 200 },
];

export default function EmployerPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Employer Dashboard</h1>
        <p className="text-muted-foreground">Discover top talent, manage job postings, and view student leaderboards.</p>
      </div>

       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {employerStats.map(stat => (
            <Link key={stat.name} href={`${stat.href}?role=employer`}>
                <Card className="hover:bg-muted/50 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    </CardContent>
                </Card>
            </Link>
        ))}
      </div>

       <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Candidate Major Distribution</CardTitle>
            <CardDescription>An overview of the academic majors of students on the platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={majorDistributionData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
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
            <CardTitle>Recruitment Actions</CardTitle>
            <CardDescription>Engage with the talent pool.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" asChild>
                <Link href="/employer/jobs?role=employer">
                    <PlusCircle className="mr-2" /> Post a New Job
                </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
                <Link href="/employer/candidates?role=employer">
                    <Users className="mr-2" /> Browse All Candidates
                </Link>
            </Button>
             <Button variant="outline" className="w-full" asChild>
                <Link href="/employer/leaderboard?role=employer">
                    <BarChart3 className="mr-2"/> View Leaderboard
                </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
