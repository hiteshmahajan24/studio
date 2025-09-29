
'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { UserProfile, academicCourses, jobApplications } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, DonutChart, RadarChart, PolarGrid, PolarAngleAxis, Legend } from 'recharts';
import { allQuests, allEvents } from '@/lib/mock-data';

const skillsData = [
  { subject: 'Problem Solving', score: 85, fullMark: 100 },
  { subject: 'Data Structures', score: 70, fullMark: 100 },
  { subject: 'Algorithms', score: 75, fullMark: 100 },
  { subject: 'Web Dev', score: 90, fullMark: 100 },
  { subject: 'Databases', score: 60, fullMark: 100 },
  { subject: 'Communication', score: 95, fullMark: 100 },
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

export function StudentProgressDialog({ children, student }: { children: React.ReactNode, student: UserProfile }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const avatar = PlaceHolderImages.find((img) => img.id === student.avatarId);

  const applicationStatusData = jobApplications.reduce((acc, app) => {
    const status = app.status;
    const existing = acc.find(item => item.name === status);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: status, value: 1 });
    }
    return acc;
  }, [] as { name: string, value: number }[]);

  const questsCompleted = allQuests.filter(q => q.status === 'completed').length;
  const questsActive = allQuests.filter(q => q.status === 'active').length;
  const questData = [
    { name: 'Completed', value: questsCompleted },
    { name: 'Active', value: questsActive },
  ];

  const eventsAttended = 3;
  const eventsRegistered = 5;
   const eventData = [
    { name: 'Attended', value: eventsAttended },
    { name: 'Registered', value: eventsRegistered - eventsAttended },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl h-[90vh]">
        <DialogHeader className="flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            {avatar && <AvatarImage src={avatar.imageUrl} alt={student.name} data-ai-hint={avatar.imageHint} />}
            <AvatarFallback>{student.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <DialogTitle className="text-2xl text-left">{student.name}</DialogTitle>
            <DialogDescription className="text-left">
              {student.education.degree} ({student.education.year})
            </DialogDescription>
            <div className="flex flex-wrap gap-2 pt-2">
                {student.expertise.slice(0, 5).map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
            </div>
          </div>
        </DialogHeader>
        <div className="py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pr-4 h-full">
            
            <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle>Academic Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                        <RadarChart data={skillsData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <Tooltip contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }} />
                            <Radar name={student.name} dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                        </RadarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Skills Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie data={skillsData} dataKey="score" nameKey="subject" cx="50%" cy="50%" outerRadius={80} fill="hsl(var(--primary))" label={({ name }) => name}>
                                {skillsData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                             <Tooltip contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}/>
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Career Growth</CardTitle>
                </CardHeader>
                <CardContent>
                     <ResponsiveContainer width="100%" height={200}>
                        <DonutChart>
                            <Pie data={applicationStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} labelLine={false} label={({ name, value }) => `${name}: ${value}`}>
                                {applicationStatusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}/>
                        </DonutChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Platform Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                     <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={questData} layout="vertical" margin={{ left: 20 }}>
                            <XAxis type="number" />
                            <YAxis type="category" dataKey="name" width={60} />
                            <Tooltip contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }} cursor={{fill: 'hsl(var(--muted))'}} />
                            <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

        </div>
      </DialogContent>
    </Dialog>
  );
}
