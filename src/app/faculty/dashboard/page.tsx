
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FileText, Handshake, BookOpen, UserCheck, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { allUsers, academicCourses } from "@/lib/mock-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";

const facultyStats = [
  { name: 'Total Students', value: '124', icon: Users },
  { name: 'Courses Taught', value: '4', icon: BookOpen },
  { name: 'Mentorship Requests', value: '3', icon: UserCheck, isWarning: true },
];

const myMentees = allUsers.filter(u => u.community === 'Student').slice(0,3);

export default function FacultyPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Faculty Dashboard</h1>
        <p className="text-muted-foreground">Monitor student progress, manage courses, and provide mentorship.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {facultyStats.map(stat => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
               {stat.isWarning && <p className="text-xs text-destructive">Pending Action</p>}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <Card className="md:col-span-2">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>My Courses</CardTitle>
                        <CardDescription>An overview of your currently assigned courses.</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/faculty/assignments"><PlusCircle className="mr-2"/> New Assignment</Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Course Name</TableHead>
                            <TableHead>Enrolled Students</TableHead>
                            <TableHead>Avg. Progress</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {academicCourses.map(course => (
                            <TableRow key={course.id}>
                                <TableCell className="font-medium">{course.name}</TableCell>
                                <TableCell>65</TableCell>
                                <TableCell>{course.progress}%</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href="/faculty/assignments">Manage</Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Mentorship</CardTitle>
                <CardDescription>Manage requests and current mentees.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <Button className="w-full" asChild>
                    <Link href="/faculty/mentorship">
                        <Handshake className="mr-2"/> View 3 Pending Requests
                    </Link>
                </Button>
                <div className="space-y-3 pt-2">
                    <h4 className="text-sm font-medium text-muted-foreground">Current Mentees</h4>
                    {myMentees.map(mentee => {
                        const avatar = PlaceHolderImages.find(img => img.id === mentee.avatarId);
                        return (
                            <div key={mentee.id} className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                    {avatar && <AvatarImage src={avatar.imageUrl} data-ai-hint={avatar.imageHint} />}
                                    <AvatarFallback>{mentee.name.slice(0,2)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold text-sm">{mentee.name}</p>
                                    <p className="text-xs text-muted-foreground">{mentee.education.degree}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
