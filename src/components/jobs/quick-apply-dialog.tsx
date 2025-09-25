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
import { quickApply } from "@/ai/flows/quick-apply";
import type { QuickApplyOutput, QuickApplyInput } from "@/ai/flows/quick-apply";

type QuickApplyDialogProps = {
    children: React.ReactNode;
}

export function QuickApplyDialog({ children }: QuickApplyDialogProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [step, setStep] = React.useState(1);
    const [selectedJobId, setSelectedJobId] = React.useState<string | null>(null);
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [aiResponse, setAiResponse] = React.useState<QuickApplyOutput | null>(null);

    const selectedJob = openOpportunities.find(job => job.id === selectedJobId);

    const handleJobSelect = (jobId: string) => {
        setSelectedJobId(jobId);
    }

    const handleNext = async () => {
        if (step === 1 && selectedJob) {
            setIsGenerating(true);
            try {
                const response = await quickApply({
                    studentProfile: user.profile,
                    jobDetails: selectedJob,
                } as QuickApplyInput);
                setAiResponse(response);
                setStep(2);
            } catch (error) {
                console.error("Error generating application:", error);
                // Optionally, show an error toast to the user
            } finally {
                setIsGenerating(false);
            }
        }
    }

    const handleBack = () => {
        if (step === 2) {
            setStep(1);
            setSelectedJobId(null);
            setAiResponse(null);
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
                    setAiResponse(null);
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

            {step === 2 && selectedJob && aiResponse && (
                <div className="py-4 space-y-6 max-h-[60vh] overflow-y-auto pr-4">
                    <div className="space-y-2">
                        <Label htmlFor="ai-summary" className="flex items-center gap-2"><Wand2 className="text-primary"/> AI-Generated Cover Letter</Label>
                        <Textarea id="ai-summary" defaultValue={aiResponse.coverLetter} rows={14} />
                    </div>
                     <div className="space-y-3">
                        <Label className="flex items-center gap-2">Suggested Documents</Label>
                        <div className="space-y-2">
                        {aiResponse.suggestedDocuments.map(doc => (
                            <div key={doc.id} className="flex flex-col gap-1 p-3 bg-muted/50 rounded-lg text-sm">
                               <div className="flex items-center gap-3 font-semibold">
                                 <File className="w-4 h-4 text-muted-foreground" /> 
                                 <span>{doc.name}</span>
                               </div>
                               <p className="text-xs text-muted-foreground pl-7">{doc.reason}</p>
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
