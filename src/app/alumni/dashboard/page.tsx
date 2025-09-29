
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Handshake, Newspaper, Users, Briefcase, PlusCircle, Check, X } from "lucide-react";
import Link from "next/link";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { allUsers } from "@/lib/mock-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import * as React from 'react';

const alumniStats = [
  { name: 'Mentees Guided', value: '5', icon: Handshake },
  { name: 'Articles Shared', value: '3', icon: Newspaper },
  { name: 'Network Connections', value: '128', icon: Users },
  { name: 'Job Referrals', value: '8', icon: Briefcase },
];

const engagementData = [
    { name: 'Jan', total: 2 },
    { name: 'Feb', total: 4 },
    { name: 'Mar', total: 5 },
    { name: 'Apr', total: 7 },
    { name: 'May', total: 6 },
    { name: 'Jun', total: 9 },
];

const initialMentorshipRequests = allUsers.filter(u => u.community === 'Student').slice(0, 2);
const spotlightAlumni = allUsers.filter(u => u.community === 'Alumni').slice(1, 4);

export default function AlumniPage() {
  const { toast } = useToast();
  const [mentorshipRequests, setMentorshipRequests] = React.useState(initialMentorshipRequests);

  const handleRequest = (requestId: string, name: string, accepted: boolean) => {
      toast({
          title: `Request ${accepted ? 'Accepted' : 'Declined'}`,
          description: `You have ${accepted ? 'accepted' : 'declined'} the mentorship request from ${name}.`
      });
      // Visually remove the request from the list
      setMentorshipRequests(prev => prev.filter(req => req.id !== requestId));
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Alumni Dashboard</h1>
        <p className="text-muted-foreground">Give back, expand your network, and share your expertise.</p>
      </div>

       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {alumniStats.map(stat => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

       <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Your Engagement</CardTitle>
            <CardDescription>An overview of your contributions to the community.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={engagementData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Bar dataKey="total" name="Contributions" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Share Your Expertise</CardTitle>
            <CardDescription>Contribute to the community's growth.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full">
                <PlusCircle className="mr-2" /> Post a Job Opening
            </Button>
            <Button variant="outline" className="w-full" asChild>
                <Link href="/alumni/articles">
                    <Newspaper className="mr-2" /> Write an Article
                </Link>
            </Button>
            <Button variant="outline" className="w-full">
                <Users className="mr-2" /> Refer a Candidate
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Pending Mentorship Requests</CardTitle>
                <CardDescription>Review and respond to students seeking guidance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {mentorshipRequests.length > 0 ? mentorshipRequests.map(request => (
                    <div key={request.id} className="p-3 bg-muted/50 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-3">
                             <Avatar className="h-10 w-10">
                                <AvatarImage src={PlaceHolderImages.find(img => img.id === request.avatarId)?.imageUrl} alt={request.name} />
                                <AvatarFallback>{request.name.slice(0,2)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold text-sm">{request.name}</p>
                                <p className="text-xs text-muted-foreground">Wants to discuss "Career Advice".</p>
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
                )) : (
                  <div className="text-center py-8">
                    <p className="text-sm text-muted-foreground">No pending requests.</p>
                  </div>
                )}
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Alumni Spotlight</CardTitle>
                <CardDescription>Connect with other professionals in your network.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {spotlightAlumni.map(alumnus => (
                    <div key={alumnus.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                             <Avatar className="h-10 w-10">
                                <AvatarImage src={PlaceHolderImages.find(img => img.id === alumnus.avatarId)?.imageUrl} alt={alumnus.name} />
                                <AvatarFallback>{alumnus.name.slice(0,2)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold text-sm">{alumnus.name}</p>
                                <p className="text-xs text-muted-foreground">{alumnus.title}</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/alumni/networking">
                                Connect
                            </Link>
                        </Button>
                    </div>
                ))}
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
