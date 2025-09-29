
'use client';

import * as React from 'react';
import {
  MoreHorizontal,
  PlusCircle,
  File,
  Upload,
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
import { ClientOnly } from '@/components/layout/client-only';
import { useToast } from '@/hooks/use-toast';

const alumniData = allUsers.filter(u => u.community === 'Alumni');

export default function AlumniDatabasePage() {
  const [allAlumni, setAllAlumni] = React.useState<UserProfile[]>(alumniData);
  const [displayedAlumni, setDisplayedAlumni] = React.useState<UserProfile[]>(alumniData);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [yearFilter, setYearFilter] = React.useState('all');
  const [majorFilter, setMajorFilter] = React.useState('all');
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const graduationYears = React.useMemo(() => ['all', ...Array.from(new Set(allAlumni.map(a => a.education.year)))].sort((a,b) => (b === 'all' ? 1 : a > b ? -1 : 1)), [allAlumni]);
  const majors = React.useMemo(() => ['all', ...Array.from(new Set(allAlumni.map(a => a.education.degree)))].sort(), [allAlumni]);


  React.useEffect(() => {
    const filtered = allAlumni.filter(alumnus => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
            (alumnus.name.toLowerCase().includes(searchTermLower) || 
             alumnus.title.toLowerCase().includes(searchTermLower) || 
             alumnus.education.degree.toLowerCase().includes(searchTermLower)) &&
            (yearFilter === 'all' || alumnus.education.year === yearFilter) &&
            (majorFilter === 'all' || alumnus.education.degree === majorFilter)
        );
    });
    setDisplayedAlumni(filtered);
  }, [searchTerm, yearFilter, majorFilter, allAlumni]);

  const handleAddAlumni = (newAlumnusData: Omit<UserProfile, 'id' | 'community' | 'leaderboardRank' | 'experience' | 'avatarId'>) => {
    const newAlumnus: UserProfile = {
      id: `user-${Date.now()}`,
      ...newAlumnusData,
      title: 'Alumni',
      avatarId: `mentor-${(Math.floor(Math.random() * 6) + 1)}`, // random avatar
      expertise: [],
      industry: 'N/A',
      bio: '',
      community: 'Alumni',
      leaderboardRank: 999,
      experience: [],
    };

    setAllAlumni(prevAlumni => [newAlumnus, ...prevAlumni]);

    toast({
        title: "Alumni Added!",
        description: `${newAlumnus.name} has been added to the database.`
    });
  }

  const handleExport = () => {
    const headers = ['Name', 'Title', 'Graduation Year', 'Major', 'Email'];
    const csvRows = [
      headers.join(','),
      ...displayedAlumni.map((alumnus) =>
        [
          `"${alumnus.name.replace(/"/g, '""')}"`,
          `"${alumnus.title.replace(/"/g, '""')}"`,
          alumnus.education.year,
          alumnus.education.degree,
          // This is a mock value, it would come from the user object in a real app
          `${alumnus.name.split(' ')[0].toLowerCase()}@nexus.edu`
        ].join(',')
      ),
    ];

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'alumni_database.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
        title: "Export Successful",
        description: "The current view of the alumni database has been exported."
    });
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const text = e.target?.result as string;
            const rows = text.split('\n').slice(1); // Skip header row
            const newAlumni: UserProfile[] = rows.map((row, index) => {
                const columns = row.split(',');
                if (columns.length < 4) return null;

                return {
                    id: `import-${Date.now()}-${index}`,
                    name: columns[0]?.trim(),
                    education: {
                        degree: columns[3]?.trim(),
                        university: 'Imported',
                        year: columns[2]?.trim()
                    },
                    title: columns[1]?.trim(),
                    community: 'Alumni',
                    avatarId: `mentor-${(Math.floor(Math.random() * 6) + 1)}`,
                    expertise: [],
                    industry: 'N/A',
                    bio: 'Imported via CSV.',
                    leaderboardRank: 999,
                    experience: [],
                };
            }).filter((a): a is UserProfile => a !== null && !!a.name);

            if (newAlumni.length > 0) {
              setAllAlumni(prev => [...newAlumni, ...prev]);
              toast({
                  title: "Import Successful",
                  description: `${newAlumni.length} alumni have been added to the database.`
              });
            } else {
              throw new Error("No valid data found in CSV.")
            }
        } catch (error) {
            toast({
                variant: 'destructive',
                title: "Import Failed",
                description: "Could not parse the CSV file. Please check the format and try again."
            });
        } finally {
            // Reset file input value to allow re-uploading the same file
            if(fileInputRef.current) fileInputRef.current.value = "";
        }
    };
    reader.readAsText(file);
  }


  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold">Alumni Database</h1>
        <p className="text-muted-foreground">Search, manage, and view all alumni in the network.</p>
      </div>
        <Card>
            <ClientOnly>
                <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                            <Input 
                                placeholder="Search by name, title, major..." 
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
                             <input type="file" ref={fileInputRef} onChange={handleFileImport} accept=".csv" className="hidden" />
                             <Button size="sm" variant="outline" onClick={handleImportClick}>
                                <Upload className="mr-2 h-3.5 w-3.5" />
                                Import
                            </Button>
                             <Button size="sm" variant="outline" onClick={handleExport}>
                                <File className="mr-2 h-3.5 w-3.5" />
                                Export
                            </Button>
                            <AddAlumniDialog onAddAlumni={handleAddAlumni}>
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
                            {displayedAlumni.map(alumnus => (
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
                     {displayedAlumni.length === 0 && (
                        <div className="text-center py-16">
                            <h3 className="text-lg font-semibold">No Alumni Found</h3>
                            <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria.</p>
                        </div>
                    )}
                </CardContent>
            </ClientOnly>
        </Card>
    </div>
  );
}

    