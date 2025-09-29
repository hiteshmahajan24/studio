
'use client';

import * as React from 'react';
import { MoreHorizontal, PlusCircle, File, Upload, Loader2, AlertTriangle, Wand2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { allUsers, type UserProfile } from '@/lib/mock-data';
import { AddAlumniDialog } from '@/components/admin/add-alumni-dialog';
import { ClientOnly } from '@/components/layout/client-only';
import { useToast } from '@/hooks/use-toast';
import { mapCsvToAlumni } from '@/ai/flows/map-csv-to-alumni';

const alumniData = allUsers.filter(u => u.community === 'Alumni');

export default function AlumniDatabasePage() {
  const [allAlumni, setAllAlumni] = React.useState<UserProfile[]>(alumniData);
  const [displayedAlumni, setDisplayedAlumni] = React.useState<UserProfile[]>(alumniData);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [yearFilter, setYearFilter] = React.useState('all');
  const [majorFilter, setMajorFilter] = React.useState('all');
  const [isImporting, setIsImporting] = React.useState(false);
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const graduationYears = React.useMemo(() => ['all', ...Array.from(new Set(allAlumni.map(a => a.education.year)))].sort((a,b) => (b === 'all' ? 1 : a > b ? -1 : 1)), [allAlumni]);
  const majors = React.useMemo(() => ['all', ...Array.from(new Set(allAlumni.map(a => a.education.degree)))].sort(), [allAlumni]);


  React.useEffect(() => {
    const filtered = allAlumni.filter(alumnus => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
            (alumnus.name.toLowerCase().includes(searchTermLower) || 
             alumnus.email.toLowerCase().includes(searchTermLower) ||
             (alumnus.currentCompany || '').toLowerCase().includes(searchTermLower) ||
             alumnus.title.toLowerCase().includes(searchTermLower) || 
             alumnus.education.degree.toLowerCase().includes(searchTermLower)) &&
            (yearFilter === 'all' || alumnus.education.year === yearFilter) &&
            (majorFilter === 'all' || alumnus.education.degree === majorFilter)
        );
    });
    setDisplayedAlumni(filtered);
  }, [searchTerm, yearFilter, majorFilter, allAlumni]);

  const handleAddAlumni = (newAlumnusData: any) => {
    const newAlumnus: UserProfile = {
      id: `user-${Date.now()}`,
      ...newAlumnusData,
      title: newAlumnusData.title || 'Alumni',
      avatarId: `mentor-${(Math.floor(Math.random() * 6) + 1)}`, // random avatar
      expertise: [],
      industry: 'N/A',
      bio: 'Manually added by admin.',
      community: 'Alumni',
      leaderboardRank: 999,
      experience: newAlumnusData.currentCompany ? [{ role: newAlumnusData.title, company: newAlumnusData.currentCompany, period: 'Present' }] : [],
    };

    setAllAlumni(prevAlumni => [newAlumnus, ...prevAlumni]);

    toast({
        title: "Alumni Added!",
        description: `${newAlumnus.name} has been added to the database.`
    });
  }

  const handleExport = () => {
    const headers = ['Name', 'Email', 'Phone', 'Address', 'Graduation Year', 'Major', 'Company', 'Role'];
    const csvRows = [
      headers.join(','),
      ...displayedAlumni.map((alumnus) =>
        [
          `"${alumnus.name.replace(/"/g, '""')}"`,
          alumnus.email,
          alumnus.phone || '',
          `"${alumnus.address?.replace(/"/g, '""') || ''}"`,
          alumnus.education.year,
          alumnus.education.degree,
          `"${alumnus.currentCompany?.replace(/"/g, '""') || ''}"`,
          `"${alumnus.title.replace(/"/g, '""')}"`,
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
    
    setIsImporting(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
        const text = e.target?.result as string;
        try {
            const { alumni: parsedAlumni } = await mapCsvToAlumni({ csvData: text });

            if (!parsedAlumni || parsedAlumni.length === 0) {
              throw new Error("AI could not parse any records from the CSV.");
            }

            const newAlumni: UserProfile[] = parsedAlumni.map((record, index) => ({
                id: `import-ai-${Date.now()}-${index}`,
                name: record.name,
                email: record.email,
                phone: record.phone,
                address: record.address,
                education: {
                    degree: record.major,
                    university: 'Imported',
                    year: String(record.graduationYear)
                },
                currentCompany: record.currentCompany,
                title: record.role || 'Alumni',
                community: 'Alumni',
                avatarId: `mentor-${(Math.floor(Math.random() * 6) + 1)}`,
                expertise: [],
                industry: 'N/A',
                bio: 'Imported via AI-parsed CSV.',
                leaderboardRank: 999,
                experience: record.currentCompany ? [{ role: record.role || 'Alumni', company: record.currentCompany, period: 'Present' }] : [],
            }));

            setAllAlumni(prev => [...newAlumni, ...prev]);
            toast({
                title: "AI Import Successful",
                description: `${newAlumni.length} alumni have been intelligently parsed and added.`
            });

        } catch (aiError) {
            console.warn("AI Import failed, attempting fallback standard import:", aiError);
            try {
                // Fallback Logic: Simple CSV parsing
                const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
                if (lines.length < 2) throw new Error("CSV has no data rows for fallback.");

                const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
                const nameIndex = headers.indexOf('name');
                const emailIndex = headers.indexOf('email');
                const yearIndex = headers.indexOf('graduation year');
                const majorIndex = headers.indexOf('major');
                
                if (nameIndex === -1 || emailIndex === -1) {
                    throw new Error("Fallback failed: CSV must contain 'Name' and 'Email' columns.");
                }

                const newAlumni: UserProfile[] = lines.slice(1).map((line, index) => {
                    const values = line.split(',');
                    return {
                        id: `import-fallback-${Date.now()}-${index}`,
                        name: values[nameIndex] || 'Unknown',
                        email: values[emailIndex] || 'Unknown',
                        education: {
                            degree: majorIndex > -1 ? values[majorIndex] : 'N/A',
                            university: 'Imported',
                            year: yearIndex > -1 ? values[yearIndex] : 'N/A',
                        },
                        community: 'Alumni',
                        title: 'Alumni',
                        avatarId: `mentor-${(Math.floor(Math.random() * 6) + 1)}`,
                        expertise: [],
                        industry: 'N/A',
                        bio: 'Imported via fallback CSV method.',
                        leaderboardRank: 999,
                        experience: [],
                    };
                });
                
                setAllAlumni(prev => [...newAlumni, ...prev]);
                toast({
                  title: "Fallback Import Successful",
                  description: `AI parsing failed, but ${newAlumni.length} records were added using standard import.`
                });

            } catch (fallbackError) {
                console.error("AI and Fallback Imports both failed:", fallbackError);
                const errorMessage = fallbackError instanceof Error ? fallbackError.message : "Could not parse the file. Please check format and try again.";
                toast({
                    variant: 'destructive',
                    title: "Import Failed",
                    description: errorMessage,
                });
            }
        } finally {
            setIsImporting(false);
            if(fileInputRef.current) fileInputRef.current.value = "";
        }
    };
    reader.readAsText(file);
  }


  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold">Alumni Database</h1>
        <p className="text-muted-foreground">Search, manage, and import alumni from the network.</p>
      </div>
        <Card>
            <ClientOnly>
                <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                            <Input 
                                placeholder="Search by name, email, company..." 
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
                             <Button size="sm" variant="outline" onClick={handleImportClick} disabled={isImporting}>
                                {isImporting ? <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" /> : <Wand2 className="mr-2 h-3.5 w-3.5" />}
                                AI Import
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
                                <TableHead>Email</TableHead>
                                <TableHead>Company</TableHead>
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
                                    <TableCell className="text-muted-foreground">{alumnus.email}</TableCell>
                                    <TableCell>{alumnus.currentCompany || 'N/A'}</TableCell>
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

    

    