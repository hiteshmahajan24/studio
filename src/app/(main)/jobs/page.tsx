"use client";

import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { jobApplications, type JobApplication } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { PlusCircle, Download, Zap } from "lucide-react";
import { AddApplicationForm } from "@/components/jobs/add-application-form";
import { QuickApplyDialog } from "@/components/jobs/quick-apply-dialog";

const statusVariantMap: Record<JobApplication['status'], 'secondary' | 'default' | 'outline' | 'destructive'> = {
    'Applied': 'outline',
    'Under Review': 'secondary',
    'Interview': 'default',
    'Offered': 'outline', 
    'Rejected': 'destructive',
};

const statusColorMap: Record<JobApplication['status'], string> = {
    'Applied': 'border-primary/50 text-primary',
    'Under Review': '',
    'Interview': 'bg-primary/90 text-primary-foreground',
    'Offered': 'border-green-500/50 bg-green-500/10 text-green-500',
    'Rejected': ''
};

export default function JobsPage() {
  const [applications, setApplications] = React.useState(jobApplications);

  const handleExport = () => {
    const headers = ["Company", "Role", "Status", "Date Applied"];
    const csvRows = [
      headers.join(','),
      ...applications.map(app => 
        [
          `"${app.company.replace(/"/g, '""')}"`,
          `"${app.title.replace(/"/g, '""')}"`,
          app.status,
          app.dateApplied
        ].join(',')
      )
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
    setApplications(prev => [
        { ...newApplication, id: String(Date.now()) },
        ...prev
    ].sort((a,b) => new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime()));
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold">Job Application Tracker</h1>
            <p className="text-muted-foreground">Manage and monitor all your job applications in one place.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}><Download className="mr-2" /> Export</Button>
            <QuickApplyDialog>
              <Button variant="outline"><Zap className="mr-2" /> Quick Apply</Button>
            </QuickApplyDialog>
            <AddApplicationForm onAddApplication={addApplication}>
              <Button><PlusCircle className="mr-2" /> Add Application</Button>
            </AddApplicationForm>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Applications</CardTitle>
          <CardDescription>A complete list of your job applications.</CardDescription>
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
                  <TableCell className="text-right text-muted-foreground">
                    {app.dateApplied}
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
