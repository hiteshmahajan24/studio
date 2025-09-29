
'use client';

import * as React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, FileText, Handshake, Lightbulb, Info, RefreshCw, AlertTriangle, Users } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from '../ui/skeleton';
import { getPersonalizedRecommendations } from '@/ai/flows/personalized-recommendations';
import type { PersonalizedRecommendationsOutput } from '@/ai/flows/personalized-recommendations.types';
import { allMentors, openOpportunities, communities, user, mockArticles, allUsers } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type Recommendation = PersonalizedRecommendationsOutput['recommendations'][0];

const recommendationDetails: { [key: string]: { name: string, description: string, href: string, avatarId?: string } } = {
  ...allMentors.reduce((acc, mentor) => {
    acc[mentor.id] = { name: mentor.name, description: mentor.title, href: `/student/mentorship?q=${encodeURIComponent(mentor.expertise[0])}`, avatarId: mentor.avatarId };
    return acc;
  }, {} as { [key: string]: any }),
  ...openOpportunities.reduce((acc, job) => {
    acc[job.id] = { name: job.title, description: job.company, href: `/student/jobs/${job.id}` };
    return acc;
  }, {} as { [key: string]: any }),
  ...communities.reduce((acc, community) => {
    acc[community.id] = { name: community.name, description: `${community.memberCount} members`, href: `/student/communities/${community.id}` };
    return acc;
  }, {} as { [key: string]: any }),
  ...mockArticles.reduce((acc, article) => {
    const author = allUsers.find(u => u.id === article.authorId);
    acc[article.id] = { name: article.title, description: `By ${author?.name || 'Unknown'}`, href: `/student/articles/${article.id}`, avatarId: author?.avatarId };
    return acc;
  }, {} as { [key: string]: any }),
};

const mockRecommendations: Recommendation[] = [
    { type: 'mentor', itemId: 'mentor-2', reason: "David Chen's expertise in System Design directly aligns with your interest in cloud architecture." },
    { type: 'job', itemId: 'job1', reason: "This Frontend Developer role is a great fit for your strong React and Next.js skills." },
    { type: 'article', itemId: 'article-1', reason: "Since you use React, this deep dive into Server Components would be a great read." },
    { type: 'community', itemId: 'comm-2', reason: "Joining the 'AI Innovators' community will connect you with peers who share your passion for machine learning." },
];

const recommendationIcons: Record<string, React.ElementType> = {
  mentor: Handshake,
  job: Briefcase,
  article: FileText,
  project: Lightbulb,
  community: Users,
};

export function RecommendationsClient({ className }: { className?: string }) {
  const [recommendations, setRecommendations] = React.useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchRecommendations = React.useCallback(async () => {
    setIsLoading(true);
    try {
        const studentProfile = `Name: ${user.name}, Skills: ${user.profile.skills.join(', ')}, Experience: ${user.profile.experience}`;
        const studentActivity = "Viewed articles on web development, applied for a frontend role, contacted a mentor in the software industry.";
        const result = await getPersonalizedRecommendations({ studentProfile, studentActivity });
        setRecommendations(result.recommendations);
    } catch (e) {
      console.error("AI Recommendation generation failed. Falling back to mock recommendations.", e);
      // Fallback to mock data
      setRecommendations(mockRecommendations);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  const getDetails = (id: string) => {
    return recommendationDetails[id] || { name: `Item ${id}`, description: "Click to learn more", href: '#' };
  };

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>For You</CardTitle>
           <Button variant="ghost" size="icon" onClick={fetchRecommendations} disabled={isLoading}>
                <RefreshCw className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
        </div>
        <CardDescription>AI-powered recommendations based on your profile and activity.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-1">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-2.5">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                    </div>
                </div>
            ))}
          </div>
        ) : (
          recommendations.slice(0, 4).map((rec) => {
            const details = getDetails(rec.itemId);
            const RecIcon = recommendationIcons[rec.type] || Info;
            const avatarImg = PlaceHolderImages.find(img => img.id === details.avatarId);
            return (
                <div key={rec.itemId} className="flex items-center justify-between gap-4 p-2.5 rounded-lg transition-colors hover:bg-muted/50">
                    <Link href={`${details.href}?role=student`} className="flex items-center gap-4 flex-1 truncate">
                        {details.avatarId && avatarImg ? (
                             <Avatar className='h-10 w-10'>
                                <AvatarImage src={avatarImg.imageUrl} alt={details.name} data-ai-hint={avatarImg.imageHint} />
                                <AvatarFallback>{details.name.slice(0,2)}</AvatarFallback>
                            </Avatar>
                        ) : (
                            <div className="bg-muted p-2 rounded-full">
                                <RecIcon className="w-5 h-5 text-muted-foreground" />
                            </div>
                        )}
                        <div className="truncate">
                            <p className="font-semibold text-sm truncate">{details.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{details.description}</p>
                        </div>
                    </Link>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm">Why?</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">Reasoning</h4>
                                    <p className="text-sm text-muted-foreground">{rec.reason}</p>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            )
          })
        )}
      </CardContent>
    </Card>
  );
}
