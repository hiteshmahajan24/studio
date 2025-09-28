
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { BrainCircuit, Users } from 'lucide-react';
import Image from 'next/image';

export function WellnessNook({ className }: { className?: string }) {
    const wellnessImage = PlaceHolderImages.find((img) => img.id === "wellness-bg");
    const router = useRouter();
    const [problemDescription, setProblemDescription] = React.useState('');
    const [isOpen, setIsOpen] = React.useState(false);

    const handleFindMentors = () => {
        if (problemDescription) {
            const params = new URLSearchParams({ q: problemDescription });
            router.push(`/student/mentorship?${params.toString()}`);
        } else {
            router.push('/student/mentorship');
        }
        setIsOpen(false);
    }

    return (
        <Card className={cn("relative overflow-hidden flex flex-col", className)}>
            {wellnessImage && (
                 <Image
                    src={wellnessImage.imageUrl}
                    alt={wellnessImage.description}
                    data-ai-hint={wellnessImage.imageHint}
                    fill
                    className="object-cover object-center"
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <CardContent className="relative z-10 flex h-full flex-col justify-between p-6 text-white">
                <div>
                    <BrainCircuit className="h-8 w-8 mb-2" />
                    <h3 className="text-lg font-semibold">Mind Refresher</h3>
                    <p className="text-sm text-white/80">
                        Feeling stressed? Take a 5-minute break for a guided breathing exercise.
                    </p>
                </div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="secondary" className="mt-4 w-full">
                            <Users className="mr-2 h-4 w-4" />
                            Talk to a Mentor
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                        <DialogTitle>Connect with a Mentor</DialogTitle>
                        <DialogDescription>
                            Tell us what's on your mind. We'll suggest the best mentor for you.
                        </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="emotion" className="text-right">
                                I'm feeling
                                </Label>
                                <Select>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select an emotion..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="stressed">Stressed</SelectItem>
                                        <SelectItem value="stuck">Stuck</SelectItem>
                                        <SelectItem value="anxious">Anxious</SelectItem>
                                        <SelectItem value="unmotivated">Unmotivated</SelectItem>
                                        <SelectItem value="curious">Curious</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="problem" className="text-right">
                                About
                                </Label>
                                <Textarea
                                id="problem"
                                placeholder="e.g., 'my career in Java', 'switching to product management'"
                                className="col-span-3"
                                value={problemDescription}
                                onChange={(e) => setProblemDescription(e.target.value)}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleFindMentors}>Find Mentors</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}
