
'use client';

import * as React from 'react';
import {
  MoreHorizontal,
  PlusCircle,
  File,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { allUsers, type UserProfile } from '@/lib/mock-data';
import { AddAlumniDialog } from '@/components/admin/add-alumni-dialog';

const alumniData = allUsers.filter(u => u.community === 'Alumni');

export default function AlumniDatabasePage() {
  const [alumni, setAlumni] = React.useState<UserProfile[]>(alumniData);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [yearFilter, setYearFilter] = React.useState('all');
  const [majorFilter, setMajorFilter] = React.useState('all');

  const graduationYears = React.useMemo(() => ['all', ...Array.from(new Set(alumniData.map(a => a.education.year)))], []);
  const majors = React.useMemo(() => ['all', ...Array.from(new Set(alumniData.map(a => a.education.degree)))], []);


  React.useEffect(() => {
    const filtered = alumniData.filter(alumnus => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
            (alumnus.name.toLowerCase().includes(searchTermLower) || alumnus.title.toLowerCase().includes(searchTermLower)) &&
            (yearFilter === 'all' || alumnus.education.year === yearFilter) &&
            (majorFilter === 'all' || alumnus.education.degree === majorFilter)
        );
    });
    setAlumni(filtered);
  }, [searchTerm, yearFilter, majorFilter]);


  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold">Alumni Database</h1>
        <p className="text-muted-foreground">Search, manage, and view all alumni in the network.</p>
      </div>
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                        <Input 
                            placeholder="Search by name, title..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-sm"
                        />
                        <Select value={yearFilter} onValueChange={setYearFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by year" />
                            </SelectTrigger>
                            <SelectContent>
                                {graduationYears.map(year => (
                                    <SelectItem key={year} value={year}>{year === 'all' ? 'All Years' : year}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
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
                    <div className="flex items-center gap-2">
                         <Button size="sm" variant="outline">
                            <File className="mr-2 h-3.5 w-3.5" />
                            Export
                        </Button>
                        <AddAlumniDialog>
                            <Button size="sm">
                                <PlusCircle className="mr-2 h-3.5 w-3.5" />
                                Add Alumni
                            </Button>
                        </AddAlumniDialog>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Graduation Year</TableHead>
                            <TableHead>Major</TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {alumni.map(alumnus => (
                            <TableRow key={alumnus.id}>
                                <TableCell className="font-medium">{alumnus.name}</TableCell>
                                <TableCell>{alumnus.title}</TableCell>
                                <TableCell>{alumnus.education.year}</TableCell>
                                <TableCell>{alumnus.education.degree}</TableCell>
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
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                 {alumni.length === 0 && (
                    <div className="text-center py-16">
                        <h3 className="text-lg font-semibold">No Alumni Found</h3>
                        <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
