import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { jobApplications, type JobApplication } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { PlusCircle, Upload, Download } from "lucide-react";

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
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold">Job Application Tracker</h1>
            <p className="text-muted-foreground">Manage and monitor all your job applications in one place.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline"><Download className="mr-2" /> Export</Button>
            <Button><PlusCircle className="mr-2" /> Add Application</Button>
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
              {jobApplications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.company}</TableCell>
                  <TableCell>{app.title}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariantMap[app.status]} className={cn('capitalize', statusColorMap[app.status])}>
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {/* Placeholder for date */}
                    {new Date().toLocaleDateString()}
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
