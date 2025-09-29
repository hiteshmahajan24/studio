
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
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { allUsers, type UserProfile } from '@/lib/mock-data';
import { AddFacultyDialog } from '@/components/admin/add-faculty-dialog';
import { ClientOnly } from '@/components/layout/client-only';
import { useToast } from '@/hooks/use-toast';

const facultyData = allUsers.filter(u => u.community === 'Faculty');

export default function FacultyDatabasePage() {
  const [allFaculty, setAllFaculty] = React.useState<UserProfile[]>(facultyData);
  const [displayedFaculty, setDisplayedFaculty] = React.useState<UserProfile[]>(facultyData);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [departmentFilter, setDepartmentFilter] = React.useState('all');
  const { toast } = useToast();

  const departments = React.useMemo(() => {
      const depts = new Set(allFaculty.map(f => f.experience[0]?.company === 'Innovate Inc.' ? 'Computer Science' : 'Humanities'));
      return ['all', ...Array.from(depts)];
  }, [allFaculty]);


  React.useEffect(() => {
    const filtered = allFaculty.filter(member => {
        const searchTermLower = searchTerm.toLowerCase();
        // This is mock logic, in a real app this would be a direct field
        const department = member.experience[0]?.company === 'Innovate Inc.' ? 'Computer Science' : 'Humanities';
        
        return (
            (member.name.toLowerCase().includes(searchTermLower) || 
             member.email.toLowerCase().includes(searchTermLower) ||
             member.title.toLowerCase().includes(searchTermLower)) &&
            (departmentFilter === 'all' || department === departmentFilter)
        );
    });
    setDisplayedFaculty(filtered);
  }, [searchTerm, departmentFilter, allFaculty]);

  const handleAddFaculty = (newFacultyData: any) => {
    // Note: The AddFacultyDialog is for "inviting". In a real app, this would trigger an email
    // and the user would appear after sign-up. Here, we just show a toast.
    toast({
        title: "Faculty Invited!",
        description: `An invitation has been sent to ${newFacultyData.name} at ${newFacultyData.email}.`,
    });
  }

  const handleExport = () => {
    const headers = ['Name', 'Email', 'Title', 'Department'];
    const csvRows = [
      headers.join(','),
      ...displayedFaculty.map((member) =>
        [
          `"${member.name.replace(/"/g, '""')}"`,
          member.email,
          `"${member.title.replace(/"/g, '""')}"`,
          `"${(member.experience[0]?.company === 'Innovate Inc.' ? 'Computer Science' : 'Humanities').replace(/"/g, '""')}"`,
        ].join(',')
      ),
    ];

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'faculty_database.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
        title: "Export Successful",
        description: "The current view of the faculty database has been exported."
    });
  };


  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold">Faculty Database</h1>
        <p className="text-muted-foreground">Search, manage, and onboard faculty members.</p>
      </div>
        <Card>
            <ClientOnly>
                <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                            <Input 
                                placeholder="Search by name, email, title..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="max-w-sm"
                            />
                             <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                                <SelectTrigger className="w-[220px]">
                                    <SelectValue placeholder="Filter by department" />
                                </SelectTrigger>
                                <SelectContent>
                                    {departments.map(dept => (
                                        <SelectItem key={dept} value={dept}>{dept === 'all' ? 'All Departments' : dept}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center gap-2">
                             <Button size="sm" variant="outline" onClick={handleExport}>
                                <File className="mr-2 h-3.5 w-3.5" />
                                Export
                            </Button>
                            <AddFacultyDialog onAddFaculty={handleAddFaculty}>
                                <Button size="sm">
                                    <PlusCircle className="mr-2 h-3.5 w-3.5" />
                                    Add Faculty
                                </Button>
                            </AddFacultyDialog>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {displayedFaculty.map(member => (
                                <TableRow key={member.id}>
                                    <TableCell className="font-medium">{member.name}</TableCell>
                                    <TableCell className="text-muted-foreground">{member.email}</TableCell>
                                    <TableCell>{member.title}</TableCell>
                                    {/* This is mock data, in a real app this would be a direct field */}
                                    <TableCell>{member.experience[0]?.company === 'Innovate Inc.' ? 'Computer Science' : 'Humanities'}</TableCell>
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
                                                <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                     {displayedFaculty.length === 0 && (
                        <div className="text-center py-16">
                            <h3 className="text-lg font-semibold">No Faculty Found</h3>
                            <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria.</p>
                        </div>
                    )}
                </CardContent>
            </ClientOnly>
        </Card>
    </div>
  );
}
