
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

type Recommendation = PersonalizedRecommendationsOutput['recommendations'][0];

const recommendationDetails: { [key: string]: { name: string, description: string, href: string } } = {
  // Mentors
  ...allMentors.reduce((acc, mentor) => {
    acc[mentor.id] = { name: mentor.name, description: mentor.title, href: `/mentorship?q=${encodeURIComponent(mentor.expertise[0])}` };
    return acc;
  }, {} as { [key: string]: { name: string, description: string, href: string } }),
  // Jobs
  ...openOpportunities.reduce((acc, job) => {
    acc[job.id] = { name: job.title, description: job.company, href: '/jobs' };
    return acc;
  }, {} as { [key: string]: { name: string, description: string, href: string } }),
  // Communities
  ...communities.reduce((acc, community) => {
    acc[community.id] = { name: community.name, description: `${community.memberCount} members`, href: `/communities/${community.id}` };
    return acc;
  }, {} as { [key: string]: { name: string, description: string, href: string } }),
  // Articles
  ...mockArticles.reduce((acc, article) => {
    const author = allUsers.find(u => u.id === article.authorId);
    acc[article.id] = { name: article.title, description: `By ${author?.name || 'Unknown'}`, href: `/articles/${article.id}` };
    return acc;
  }, {} as { [key: string]: { name: string, description: string, href: string } }),
};


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
  const [error, setError] = React.useState<string | null>(null);

  const fetchRecommendations = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
        const studentProfile = `Name: ${user.name}, Skills: ${user.profile.skills.join(', ')}, Experience: ${user.profile.experience}`;
        const studentActivity = "Viewed articles on web development, applied for a frontend role, contacted a mentor in the software industry.";
        const result = await getPersonalizedRecommendations({ studentProfile, studentActivity });
        setRecommendations(result.recommendations);
    } catch (e) {
      console.error(e);
      setError("Failed to generate new recommendations. Please try again.");
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
            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
          </div>
        ) : error ? (
            <div className="flex flex-col items-center justify-center text-center text-destructive py-4">
                <AlertTriangle className="w-8 h-8 mb-2" />
                <p className="font-semibold">Error</p>
                <p className="text-sm">{error}</p>
            </div>
        ) : (
          recommendations.slice(0, 4).map((rec) => {
            const details = getDetails(rec.itemId);
            return (
                <div key={rec.itemId} className="flex items-center justify-between gap-4 p-2.5 rounded-lg transition-colors hover:bg-muted/50">
                    <Link href={details.href} className="flex items-center gap-4 flex-1 truncate">
                        <div className="bg-muted p-2 rounded-full">
                        {React.createElement(recommendationIcons[rec.type] || Info, { className: "w-5 h-5 text-muted-foreground" })}
                        </div>
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
