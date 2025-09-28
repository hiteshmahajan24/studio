'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { jobApplications, openOpportunities, type JobApplication, user } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { PlusCircle, Download, Zap, Briefcase, Search, CheckCircle } from 'lucide-react';
import { AddApplicationForm } from '@/components/jobs/add-application-form';
import { QuickApplyDialog } from '@/components/jobs/quick-apply-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { JobCard } from '@/components/jobs/job-card';
import { useToast } from '@/hooks/use-toast';

const statusVariantMap: Record<JobApplication['status'], 'secondary' | 'default' | 'outline' | 'destructive'> = {
  Applied: 'outline',
  'Under Review': 'secondary',
  Interview: 'default',
  Offered: 'outline',
  Rejected: 'destructive',
};

const statusColorMap: Record<JobApplication['status'], string> = {
  Applied: 'border-primary/50 text-primary',
  'Under Review': '',
  Interview: 'bg-primary/90 text-primary-foreground',
  Offered: 'border-green-500/50 bg-green-500/10 text-green-500',
  Rejected: '',
};

function JobApplicationTracker({ applications, onAddApplication, handleExport }: { applications: JobApplication[], onAddApplication: (app: Omit<JobApplication, 'id'>) => void, handleExport: () => void }) {
  return (
    <Card>
      <CardHeader className='flex-row items-center justify-between'>
        <div>
          <CardTitle>My Applications</CardTitle>
          <CardDescription>A complete list of your job applications.</CardDescription>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}><Download className="mr-2" /> Export</Button>
            <AddApplicationForm onAddApplication={onAddApplication}>
              <Button><PlusCircle className="mr-2" /> Add Application</Button>
            </AddApplicationForm>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Date Applied</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-medium">{app.company}</TableCell>
                <TableCell>{app.title}</TableCell>
                <TableCell>
                  <Badge variant={statusVariantMap[app.status]} className={cn('capitalize', statusColorMap[app.status])}>
                    {app.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">{app.dateApplied}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}


function JobFinder({ onApplySuccess, appliedJobIds }: { onApplySuccess: (jobId: string, company: string, title: string) => void, appliedJobIds: Set<string>}) {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [typeFilter, setTypeFilter] = React.useState('all');
    const [locationFilter, setLocationFilter] = React.useState('all');

    const jobTypes = ['all', ...Array.from(new Set(openOpportunities.map(job => job.type)))];
    const locations = ['all', ...Array.from(new Set(openOpportunities.map(job => job.location)))];

    const filteredJobs = openOpportunities.filter(job => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
            (job.title.toLowerCase().includes(searchTermLower) || job.company.toLowerCase().includes(searchTermLower) || job.skills.some(skill => skill.toLowerCase().includes(searchTermLower))) &&
            (typeFilter === 'all' || job.type === typeFilter) &&
            (locationFilter === 'all' || job.location === locationFilter)
        )
    });

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-4 md:flex-row">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by title, company, skill..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-1 gap-4 md:flex-initial flex-wrap">
                            <Select value={typeFilter} onValueChange={setTypeFilter}>
                                <SelectTrigger className="w-full md:w-[180px]">
                                    <SelectValue placeholder="Filter by type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {jobTypes.map((type) => (
                                        <SelectItem key={type} value={type} className="capitalize">{type === 'all' ? 'All Job Types' : type}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={locationFilter} onValueChange={setLocationFilter}>
                                <SelectTrigger className="w-full md:w-[180px]">
                                    <SelectValue placeholder="Filter by location" />
                                </SelectTrigger>
                                <SelectContent>
                                    {locations.map((location) => (
                                        <SelectItem key={location} value={location} className="capitalize">{location === 'all' ? 'All Locations' : location}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                     {filteredJobs.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredJobs.map(job => (
                                <JobCard 
                                    key={job.id} 
                                    job={job} 
                                    onApplySuccess={onApplySuccess}
                                    isApplied={appliedJobIds.has(job.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="py-16 text-center">
                            <h3 className="text-lg font-semibold">No Jobs Found</h3>
                            <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default function JobsPage() {
  const [applications, setApplications] = React.useState(jobApplications);
  const { toast } = useToast();
  const [appliedJobIds, setAppliedJobIds] = React.useState(new Set<string>());

  const handleExport = () => {
    const headers = ['Company', 'Role', 'Status', 'Date Applied'];
    const csvRows = [
      headers.join(','),
      ...applications.map((app) =>
        [`"${app.company.replace(/"/g, '""')}"`, `"${app.title.replace(/"/g, '""')}"`, app.status, app.dateApplied].join(',')
      ),
    ];

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.href) {
      URL.revokeObjectURL(link.href);
    }
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'job_applications.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const addApplication = (newApplication: Omit<JobApplication, 'id'>) => {
    setApplications((prev) =>
      [{ ...newApplication, id: String(Date.now()) }, ...prev].sort(
        (a, b) => new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime()
      )
    );
  };

  const handleApplySuccess = (jobId: string, company: string, title: string) => {
    setAppliedJobIds(prev => new Set(prev).add(jobId));
    addApplication({
        company: company,
        title: title,
        status: 'Applied',
        dateApplied: new Date().toISOString().split('T')[0]
    });
    toast({
        title: 'Applied Successfully!',
        description: 'You will be notified before the first round.',
        action: (
            <div className="p-2 bg-green-500 rounded-full text-white">
                <CheckCircle className="h-5 w-5" />
            </div>
        )
    });
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Career Center</h1>
          <p className="text-muted-foreground">Find opportunities and track your application progress.</p>
        </div>
         <QuickApplyDialog onApplySuccess={handleApplySuccess} preselectedJobId={null}>
            <Button variant="outline"><Zap className="mr-2" /> AI Quick Apply</Button>
        </QuickApplyDialog>
      </div>

      <Tabs defaultValue="find-jobs">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="find-jobs"><Briefcase className="mr-2"/> Find Jobs</TabsTrigger>
          <TabsTrigger value="my-applications">My Applications</TabsTrigger>
        </TabsList>
        <TabsContent value="find-jobs" className="mt-6">
            <JobFinder onApplySuccess={handleApplySuccess} appliedJobIds={appliedJobIds} />
        </TabsContent>
        <TabsContent value="my-applications" className="mt-6">
            <JobApplicationTracker applications={applications} onAddApplication={addApplication} handleExport={handleExport} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
