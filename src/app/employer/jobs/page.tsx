'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { openOpportunities } from '@/lib/mock-data';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const myJobPostings = openOpportunities.filter(job => job.company === 'Innovate Inc.' || job.company === 'Data Driven Co.');

function JobRow({ job }: { job: typeof myJobPostings[0] }) {
  const [applicantCount, setApplicantCount] = React.useState<number | null>(null);

  React.useEffect(() => {
    // Generate the random number only on the client, after the initial render.
    setApplicantCount(Math.floor(Math.random() * 50) + 5);
  }, []);

  return (
    <TableRow key={job.id}>
      <TableCell className="font-medium">{job.title}</TableCell>
      <TableCell className="hidden sm:table-cell">
        <Badge variant="outline">{job.type}</Badge>
      </TableCell>
      <TableCell className="text-muted-foreground hidden md:table-cell">{job.location}</TableCell>
      <TableCell className="font-medium">
        {applicantCount !== null ? applicantCount : '...'}
      </TableCell>
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
            <DropdownMenuItem>Edit Posting</DropdownMenuItem>
            <DropdownMenuItem>View Applicants</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Close Posting</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}


export default function ManageJobsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Job Postings</h1>
          <p className="text-muted-foreground">Post new opportunities and manage your existing listings.</p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2" /> Post New Job
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Feature Not Implemented</AlertDialogTitle>
              <AlertDialogDescription>
                The form to create a new job posting has not been implemented yet. This is a placeholder action.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Understood</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Active Postings</CardTitle>
          <CardDescription>An overview of jobs your company has posted on the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead className="hidden sm:table-cell">Type</TableHead>
                <TableHead className="hidden md:table-cell">Location</TableHead>
                <TableHead>Applicants</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myJobPostings.map((job) => (
                <JobRow key={job.id} job={job} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
