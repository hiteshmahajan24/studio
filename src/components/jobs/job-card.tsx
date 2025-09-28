
'use client';

import * as React from 'react';
import type { OpenOpportunity } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, MapPin, Zap, CheckCircle } from 'lucide-react';
import { QuickApplyDialog } from './quick-apply-dialog';

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
        <p className="text-sm text-muted-foreground line-clamp-3">{job.description}</p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{job.location}</span>
        </div>
        <div>
            <h4 className='text-xs font-semibold mb-2'>Skills</h4>
             <div className="flex flex-wrap gap-2">
                {job.skills.map(skill => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
            </div>
        </div>
      </CardContent>
      <CardFooter>
        {isApplied ? (
             <Button className="w-full" variant="outline" disabled>
                <CheckCircle className="mr-2 text-green-500" /> Applied
            </Button>
        ) : (
            <QuickApplyDialog preselectedJobId={job.id} onApplySuccess={onApplySuccess}>
                <Button className="w-full">
                    <Zap className="mr-2" /> View & Apply
                </Button>
            </QuickApplyDialog>
        )}
      </CardFooter>
    </Card>
  );
}
