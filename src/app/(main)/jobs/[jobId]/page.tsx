
'use client';

import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Briefcase, MapPin, Zap } from 'lucide-react';
import { openOpportunities, user } from '@/lib/mock-data';
import { QuickApplyDialog } from '@/components/jobs/quick-apply-dialog';
import * as React from 'react';
import { useToast } from '@/hooks/use-toast';

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const jobId = params.jobId as string;
  
  // This state management would typically be in a global context or passed down
  const [appliedJobIds, setAppliedJobIds] = React.useState(new Set<string>());

  const job = openOpportunities.find((job) => job.id === jobId);

  const handleApplySuccess = (appliedJobId: string) => {
    setAppliedJobIds(prev => new Set(prev).add(appliedJobId));
    toast({
        title: 'Applied Successfully!',
        description: 'You will be notified before the first round.',
    });
    // In a real app, you might also add to a global state for applications
  };

  if (!job) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold">Job Not Found</h2>
        <p className="text-muted-foreground">The job listing you are looking for does not exist or has been removed.</p>
        <Button onClick={() => router.push('/jobs')} className="mt-4">
          <ArrowLeft className="mr-2" />
          Back to Jobs
        </Button>
      </div>
    );
  }

  const isApplied = appliedJobIds.has(job.id);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
       <div>
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2" /> Back
        </Button>
      </div>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-3xl font-bold">{job.title}</CardTitle>
                <CardDescription className="text-lg">{job.company}</CardDescription>
            </div>
            <Badge variant="secondary" className="text-base">{job.type}</Badge>
          </div>
          <div className="flex items-center gap-4 pt-2 text-muted-foreground">
             <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>{job.type}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h3 className="font-semibold text-lg mb-2">Job Description</h3>
                <p className="text-muted-foreground prose prose-sm dark:prose-invert max-w-none">
                    {job.description}
                </p>
            </div>
             <div>
                <h3 className="font-semibold text-lg mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                </div>
            </div>
        </CardContent>
        <CardFooter>
            <QuickApplyDialog preselectedJobId={job.id} onApplySuccess={handleApplySuccess}>
                <Button className="w-full text-lg py-6" disabled={isApplied}>
                    {isApplied ? 'Applied' : <><Zap className="mr-2" /> Quick Apply</>}
                </Button>
            </QuickApplyDialog>
        </CardFooter>
      </Card>
    </div>
  );
}
