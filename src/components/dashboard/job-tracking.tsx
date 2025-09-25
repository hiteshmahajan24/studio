import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { jobApplications, type JobApplication } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

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

export function JobTracking() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Application Tracker</CardTitle>
        <CardDescription>Keep track of your job applications.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobApplications.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-medium">{app.company}</TableCell>
                <TableCell>{app.title}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={statusVariantMap[app.status]} className={cn('capitalize', statusColorMap[app.status])}>
                    {app.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
