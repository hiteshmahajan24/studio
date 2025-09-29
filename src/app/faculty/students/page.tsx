
'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { allUsers, type UserProfile } from "@/lib/mock-data";
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

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
        <p className="text-muted-foreground">Search and manage student profiles.</p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <Input
                placeholder="Search by name, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Select value={majorFilter} onValueChange={setMajorFilter}>
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Filter by major" />
                </SelectTrigger>
                <SelectContent>
                  {majors.map(major => (
                    <SelectItem key={major} value={major}>{major === 'all' ? 'All Majors' : major}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Major</TableHead>
                <TableHead>Graduation Year</TableHead>
                <TableHead>
                    <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map(student => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell className="text-muted-foreground">{student.email}</TableCell>
                  <TableCell>{student.education.degree}</TableCell>
                  <TableCell>{student.education.year}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Send Message</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
