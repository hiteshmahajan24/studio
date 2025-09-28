
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
  DialogClose,
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
import { File, Loader2, Wand2, CheckCircle, Pencil } from "lucide-react";
import { quickApply } from "@/ai/flows/quick-apply";
import type { QuickApplyOutput, QuickApplyInput } from "@/ai/flows/quick-apply.types";
import { Checkbox } from "../ui/checkbox";

type QuickApplyDialogProps = {
    children: React.ReactNode;
    preselectedJobId: string | null;
    onApplySuccess: (jobId: string, company: string, title: string) => void;
}

export function QuickApplyDialog({ children, preselectedJobId, onApplySuccess }: QuickApplyDialogProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [step, setStep] = React.useState(1);
    const [selectedJobId, setSelectedJobId] = React.useState<string | null>(preselectedJobId);
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [aiResponse, setAiResponse] = React.useState<QuickApplyOutput | null>(null);

    // State for document selection
    const [selectedResumeId, setSelectedResumeId] = React.useState(user.profile.resumes[0]?.id || '');
    const [selectedCertificateIds, setSelectedCertificateIds] = React.useState<string[]>([]);
    
    React.useEffect(() => {
        if (preselectedJobId && isOpen) {
            setSelectedJobId(preselectedJobId);
        }
    }, [preselectedJobId, isOpen])

    const selectedJob = openOpportunities.find(job => job.id === selectedJobId);

    const handleJobSelect = (jobId: string) => {
        setSelectedJobId(jobId);
    }
    
    const handleGenerate = async () => {
        if (!selectedJob) return;

        setIsGenerating(true);
        try {
            const selectedResume = user.profile.resumes.find(r => r.id === selectedResumeId);
            const selectedCertificates = user.profile.certificates.filter(c => selectedCertificateIds.includes(c.id));

            // Create a temporary profile with only the selected documents for the AI
            const tempProfile = {
                ...user.profile,
                resumes: selectedResume ? [selectedResume] : [],
                certificates: selectedCertificates
            };

            const response = await quickApply({
                studentProfile: tempProfile,
                jobDetails: { ...selectedJob, title: selectedJob.title, company: selectedJob.company, description: selectedJob.description },
            } as QuickApplyInput);
            setAiResponse(response);
            setStep(3); // Go to review step
        } catch (error) {
            console.error("Error generating application:", error);
            // Optionally, show an error toast
        } finally {
            setIsGenerating(false);
        }
    }

    const handleApplyNow = () => {
        if (selectedJob) {
            onApplySuccess(selectedJob.id, selectedJob.company, selectedJob.title);
        }
        setStep(4); // Go to success step
    }

    const resetDialog = () => {
        setStep(1);
        setSelectedJobId(preselectedJobId || null);
        setIsGenerating(false);
        setAiResponse(null);
        setSelectedResumeId(user.profile.resumes[0]?.id || '');
        setSelectedCertificateIds([]);
    }

    const closeAndReset = () => {
        setIsOpen(false);
        // Delay reset to allow closing animation
        setTimeout(() => {
            resetDialog();
        }, 300);
    }

    const descriptionText: Record<number, string> = {
        1: preselectedJobId ? `Quick apply for the ${selectedJob?.title} role.` : "Select an open opportunity to apply for.",
        2: `Select documents to generate an AI cover letter for the ${selectedJob?.title} role.`,
        3: `Review your AI-generated application for ${selectedJob?.title}.`,
        4: "Your application has been submitted successfully!"
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
                closeAndReset();
            }
        }}>
          <DialogTrigger asChild>
            {children}
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>AI-Powered Quick Apply</DialogTitle>
              <DialogDescription>
                {descriptionText[step]}
              </DialogDescription>
            </DialogHeader>

            {step === 1 && (
                <div className="py-4 space-y-4">
                    {!preselectedJobId && (
                        <>
                            <Label htmlFor="job-select">Select a Job Posting</Label>
                            <Select onValueChange={handleJobSelect} value={selectedJobId || ''}>
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
                        </>
                    )}
                    {selectedJob && (
                        <div className="p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground max-h-48 overflow-y-auto">
                           <h4 className="font-semibold text-foreground mb-2">Job Description</h4>
                           {selectedJob.description}
                        </div>
                    )}
                </div>
            )}

            {step === 2 && (
                 <div className="py-4 space-y-6 max-h-[60vh] overflow-y-auto pr-4">
                     <div className="space-y-3">
                         <Label>Select one resume</Label>
                         <Select value={selectedResumeId} onValueChange={setSelectedResumeId}>
                             <SelectTrigger>
                                 <SelectValue placeholder="Select a resume..." />
                             </SelectTrigger>
                             <SelectContent>
                                 {user.profile.resumes.map(resume => (
                                     <SelectItem key={resume.id} value={resume.id}>{resume.name}</SelectItem>
                                 ))}
                             </SelectContent>
                         </Select>
                     </div>
                      <div className="space-y-3">
                         <Label>Select relevant certificates (up to 2)</Label>
                         <div className="space-y-2">
                             {user.profile.certificates.map(cert => (
                                 <div key={cert.id} className="flex items-center space-x-2">
                                     <Checkbox 
                                        id={`cert-${cert.id}`} 
                                        checked={selectedCertificateIds.includes(cert.id)}
                                        onCheckedChange={(checked) => {
                                            setSelectedCertificateIds(prev => 
                                                checked 
                                                ? [...prev, cert.id] 
                                                : prev.filter(id => id !== cert.id)
                                            )
                                        }}
                                        disabled={!selectedCertificateIds.includes(cert.id) && selectedCertificateIds.length >= 2}
                                     />
                                     <label htmlFor={`cert-${cert.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                         {cert.name}
                                     </label>
                                 </div>
                             ))}
                         </div>
                     </div>
                 </div>
            )}

            {step === 3 && selectedJob && aiResponse && (
                <div className="py-4 space-y-6 max-h-[60vh] overflow-y-auto pr-4">
                    <div className="space-y-2">
                        <Label htmlFor="ai-summary" className="flex items-center gap-2"><Wand2 className="text-primary"/> AI-Generated Cover Letter</Label>
                        <Textarea id="ai-summary" defaultValue={aiResponse.coverLetter} rows={12} />
                    </div>
                     <div className="space-y-3">
                        <Label className="flex items-center gap-2">Attached Documents</Label>
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
                        <Button variant="link" size="sm" className="p-0 h-auto" onClick={() => setStep(2)}>
                            <Pencil className="mr-2" /> Change Documents
                        </Button>
                    </div>
                </div>
            )}

            {step === 4 && (
                <div className="py-8 text-center flex flex-col items-center gap-4">
                    <CheckCircle className="w-16 h-16 text-green-500" />
                    <p className="text-muted-foreground">Your application for the {selectedJob?.title} role at {selectedJob?.company} has been submitted.</p>
                </div>
            )}
            
            <DialogFooter className="pt-4">
                {step === 1 && <Button onClick={() => setStep(2)} disabled={!selectedJobId}>
                    Select Documents
                </Button>}
                 {step === 2 && (
                     <>
                        <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                        <Button onClick={handleGenerate} disabled={isGenerating || !selectedResumeId}>
                            {isGenerating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Generating...</> : "Generate with AI"}
                        </Button>
                    </>
                 )}
                {step === 3 && (
                    <>
                        <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
                        <Button onClick={handleApplyNow}>Apply Now</Button>
                    </>
                )}
                 {step === 4 && (
                    <DialogClose asChild>
                        <Button onClick={closeAndReset}>Done</Button>
                    </DialogClose>
                )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
}
