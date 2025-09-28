
'use client';

import * as React from 'react';
import type { OpenOpportunity } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, MapPin, Zap, CheckCircle, Eye } from 'lucide-react';
import { QuickApplyDialog } from './quick-apply-dialog';
import Link from 'next/link';

type JobCardProps = {
  job: OpenOpportunity;
  onApplySuccess: (jobId: string, company: string, title: string) => void;
  isApplied: boolean;
};

export function JobCard({ job, onApplySuccess, isApplied }: JobCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className='flex justify-between items-start'>
            <div>
                <CardTitle className="text-lg">{job.title}</CardTitle>
                <CardDescription>{job.company}</CardDescription>
            </div>
            <Badge variant="outline" className="capitalize shrink-0">{job.type}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{job.location}</span>
        </div>
        <div>
            <h4 className='text-xs font-semibold mb-2'>Skills</h4>
             <div className="flex flex-wrap gap-2">
                {job.skills.slice(0, 3).map(skill => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
                {job.skills.length > 3 && <Badge variant="outline">+{job.skills.length - 3} more</Badge>}
            </div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2">
        <Button variant="outline" asChild>
            <Link href={`/jobs/${job.id}`}>
                <Eye className="mr-2" /> View Details
            </Link>
        </Button>
        {isApplied ? (
             <Button variant="secondary" disabled>
                <CheckCircle className="mr-2" /> Applied
            </Button>
        ) : (
            <QuickApplyDialog preselectedJobId={job.id} onApplySuccess={onApplySuccess}>
                <Button>
                    <Zap className="mr-2" /> Quick Apply
                </Button>
            </QuickApplyDialog>
        )}
      </CardFooter>
    </Card>
  );
}
