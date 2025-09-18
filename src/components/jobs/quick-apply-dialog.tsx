"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { openOpportunities, user } from "@/lib/mock-data";
import { File, Loader2, Wand2 } from "lucide-react";

type QuickApplyDialogProps = {
    children: React.ReactNode;
}

const mockAiSummary = `To the Hiring Manager at Innovate Inc.,

I am writing to express my enthusiastic interest in the Frontend Developer position, which I discovered through the NexusConnect platform. With a solid background of over three years in web development and a deep specialization in modern frontend technologies like React and Next.js, I am confident that my skills and experience align perfectly with the requirements of this role.

Throughout my career, I have been passionate about building high-quality, scalable, and intuitive user interfaces. My experience includes significant contributions to several open-source projects where I honed my abilities in collaborative development and detail-oriented work. I am proficient in TypeScript and have hands-on experience with cloud platforms like GCP, which I believe would be a valuable asset to your team.

I am particularly drawn to Innovate Inc.'s reputation for creativity and cutting-edge solutions, and I am eager to contribute my expertise to your projects.

Attached, you will find my resume, which provides a comprehensive overview of my project history and technical abilities, along with my Advanced React Certification. Thank you for your time and consideration. I look forward to the possibility of discussing this opportunity further.

Sincerely,
Alex Martinez`;

const mockSelectedDocuments = [user.profile.resumes[0], user.profile.certificates[0]];

export function QuickApplyDialog({ children }: QuickApplyDialogProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [step, setStep] = React.useState(1);
    const [selectedJobId, setSelectedJobId] = React.useState<string | null>(null);
    const [isGenerating, setIsGenerating] = React.useState(false);

    const selectedJob = openOpportunities.find(job => job.id === selectedJobId);

    const handleJobSelect = (jobId: string) => {
        setSelectedJobId(jobId);
    }

    const handleNext = () => {
        if (step === 1 && selectedJobId) {
            setIsGenerating(true);
            // Simulate AI generation
            setTimeout(() => {
                setStep(2);
                setIsGenerating(false);
            }, 1500);
        }
    }

    const handleBack = () => {
        if (step === 2) {
            setStep(1);
            setSelectedJobId(null);
        }
    }
  
    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            // Reset state on close
            if (!open) {
                setTimeout(() => {
                    setStep(1);
                    setSelectedJobId(null);
                    setIsGenerating(false);
                }, 300);
            }
        }}>
          <DialogTrigger asChild>
            {children}
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>AI-Powered Quick Apply</DialogTitle>
              <DialogDescription>
                {step === 1 ? "Select an open opportunity to apply for." : `Review your AI-generated application for ${selectedJob?.title}.`}
              </DialogDescription>
            </DialogHeader>

            {step === 1 && (
                <div className="py-4 space-y-4">
                    <Label htmlFor="job-select">Select a Job Posting</Label>
                    <Select onValueChange={handleJobSelect}>
                        <SelectTrigger id="job-select">
                            <SelectValue placeholder="Choose an opportunity..." />
                        </SelectTrigger>
                        <SelectContent>
                            {openOpportunities.map(job => (
                                <SelectItem key={job.id} value={job.id}>
                                    {job.title} - {job.company}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {selectedJob && (
                        <div className="p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
                           <h4 className="font-semibold text-foreground mb-2">Job Description</h4>
                           {selectedJob.description}
                        </div>
                    )}
                </div>
            )}

            {step === 2 && selectedJob && (
                <div className="py-4 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="ai-summary" className="flex items-center gap-2"><Wand2 className="text-primary"/> AI-Generated Cover Letter</Label>
                        <Textarea id="ai-summary" defaultValue={mockAiSummary} rows={14} />
                    </div>
                     <div className="space-y-3">
                        <Label className="flex items-center gap-2">Suggested Documents</Label>
                        <div className="space-y-2">
                        {mockSelectedDocuments.map(doc => (
                            <div key={doc.id} className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg text-sm">
                               <File className="w-4 h-4 text-muted-foreground" /> 
                               <span>{doc.name}</span>
                            </div>
                        ))}
                        </div>
                        <Button variant="link" size="sm" className="p-0 h-auto">Change Documents</Button>
                    </div>
                </div>
            )}
            
            <DialogFooter className="pt-4">
                {step === 1 && <Button onClick={handleNext} disabled={!selectedJobId || isGenerating}>
                    {isGenerating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Generating...</> : "Generate Application"}
                </Button>}
                {step === 2 && (
                    <>
                        <Button variant="ghost" onClick={handleBack}>Back</Button>
                        <Button>Apply Now</Button>
                    </>
                )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
}
