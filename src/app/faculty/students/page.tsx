
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { allUsers, type UserProfile } from "@/lib/mock-data";
import { StudentProgressDialog } from '@/components/faculty/student-progress-dialog';

const studentData = allUsers.filter(u => u.community === 'Student');

export default function ViewStudentsPage() {
  const [students, setStudents] = React.useState<UserProfile[]>(studentData);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [majorFilter, setMajorFilter] = React.useState('all');

  const majors = React.useMemo(() => ['all', ...Array.from(new Set(studentData.map(s => s.education.degree)))], []);

  React.useEffect(() => {
    const filtered = studentData.filter(student => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
            (student.name.toLowerCase().includes(searchTermLower) || 
             student.email.toLowerCase().includes(searchTermLower)) &&
            (majorFilter === 'all' || student.education.degree === majorFilter)
        );
    });
    setStudents(filtered);
  }, [searchTerm, majorFilter]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Student Directory</h1>
        <p className="text-muted-foreground">Select a student to view their progress dashboard.</p>
      </div>
      <Card>
        <CardHeader>
           <CardTitle>All Students</CardTitle>
           <CardDescription>A directory of all students currently on the platform.</CardDescription>
          <div className="flex flex-col gap-4 pt-4 md:flex-row">
            <Input
              placeholder="Search by name, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:max-w-sm"
            />
            <Select value={majorFilter} onValueChange={setMajorFilter}>
              <SelectTrigger className="w-full md:w-[220px]">
                <SelectValue placeholder="Filter by major" />
              </SelectTrigger>
              <SelectContent>
                {majors.map(major => (
                  <SelectItem key={major} value={major}>{major === 'all' ? 'All Majors' : major}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Email</TableHead>
                <TableHead>Major</TableHead>
                <TableHead className="hidden md:table-cell">Graduation Year</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map(student => (
                <StudentProgressDialog key={student.id} student={student}>
                  <TableRow className="cursor-pointer">
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell className="text-muted-foreground hidden sm:table-cell">{student.email}</TableCell>
                    <TableCell>{student.education.degree}</TableCell>
                    <TableCell className="hidden md:table-cell">{student.education.year}</TableCell>
                  </TableRow>
                </StudentProgressDialog>
              ))}
            </TableBody>
          </Table>
           {students.length === 0 && (
              <div className="text-center py-16">
                  <h3 className="text-lg font-semibold">No Students Found</h3>
                  <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria.</p>
              </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
