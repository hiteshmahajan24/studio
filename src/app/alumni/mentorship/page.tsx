
'use client';

import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { allUsers } from "@/lib/mock-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Check, UserCheck, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialMentorshipRequests = allUsers.filter(u => u.community === 'Student').slice(3, 5);
const currentMentees = allUsers.filter(u => u.community === 'Student').slice(0, 3);

export default function ProvideMentorshipPage() {
    const { toast } = useToast();
    const [mentorshipRequests, setMentorshipRequests] = React.useState(initialMentorshipRequests);

    const handleRequest = (requestId: string, name: string, accepted: boolean) => {
        toast({
            title: `Request ${accepted ? 'Accepted' : 'Declined'}`,
            description: `You have ${accepted ? 'accepted' : 'declined'} the mentorship request from ${name}.`
        });
        setMentorshipRequests(prev => prev.filter(req => req.id !== requestId));
    }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Provide Mentorship</h1>
        <p className="text-muted-foreground">Manage mentorship requests and connect with your mentees.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <UserCheck className="text-primary"/>
                    Pending Requests
                </CardTitle>
                <CardDescription>Review and respond to new mentorship requests from students.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {mentorshipRequests.map(request => {
                    const avatar = PlaceHolderImages.find(img => img.id === request.avatarId);
                    return (
                        <div key={request.id} className="p-3 bg-muted/50 rounded-lg flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-12 w-12">
                                    {avatar && <AvatarImage src={avatar.imageUrl} alt={request.name} data-ai-hint={avatar.imageHint} />}
                                    <AvatarFallback>{request.name.slice(0,2)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{request.name}</p>
                                    <p className="text-sm text-muted-foreground">Wants to discuss "Career Advice".</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button size="icon" variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20 hover:text-green-500" onClick={() => handleRequest(request.id, request.name, true)}>
                                    <Check className="h-4 w-4"/>
                                </Button>
                                <Button size="icon" variant="destructive" onClick={() => handleRequest(request.id, request.name, false)}>
                                    <X className="h-4 w-4"/>
                                </Button>
                            </div>
                        </div>
                    )
                })}
                 {mentorshipRequests.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-sm text-muted-foreground">No pending requests.</p>
                    </div>
                )}
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Current Mentees</CardTitle>
                <CardDescription>Your active list of students you are mentoring.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {currentMentees.map(mentee => {
                    const avatar = PlaceHolderImages.find(img => img.id === mentee.avatarId);
                    return (
                        <div key={mentee.id} className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                {avatar && <AvatarImage src={avatar.imageUrl} alt={mentee.name} data-ai-hint={avatar.imageHint} />}
                                <AvatarFallback>{mentee.name.slice(0,2)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold text-sm">{mentee.name}</p>
                                <p className="text-xs text-muted-foreground">{mentee.education.degree}</p>
                            </div>
                        </div>
                    )
                })}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
