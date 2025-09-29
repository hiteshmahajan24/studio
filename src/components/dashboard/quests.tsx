
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, Zap, RefreshCw, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { generateAIQuest } from '@/ai/flows/ai-quest-generator';
import type { AIQuestOutput } from '@/ai/flows/ai-quest-generator.types';
import { user } from '@/lib/mock-data';
import { Skeleton } from '../ui/skeleton';
import { useUserState } from '@/context/user-state-context';

const mockQuests: AIQuestOutput[] = [
    { questTitle: "Connect with a Mentor", questDescription: "Find a mentor in the 'Tech' industry and send them a connection request to learn more about their career path.", knowledgeCoinsReward: 30 },
    { questTitle: "Explore Your Network", questDescription: "Find and view the profile of three alumni working in your field of interest.", knowledgeCoinsReward: 25 },
    { questTitle: "Sharpen Your Skills", questDescription: "Read an article about a technology you want to learn and save it to your bookmarks.", knowledgeCoinsReward: 20 },
    { questTitle: "Career Explorer", questDescription: "Find an internship opportunity on the job board and view its details.", knowledgeCoinsReward: 35 },
];

let mockQuestIndex = 0;

export function Quests({ className }: { className?: string }) {
  const [quest, setQuest] = React.useState<AIQuestOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const { setKnowledgeCoins } = useUserState();

  const fetchQuest = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const studentProfile = `Name: ${user.name}, Skills: ${user.profile.skills.join(', ')}, Experience: ${user.profile.experience}`;
      const platformFeatures = ['find mentors', 'apply for jobs', 'join communities', 'read articles'];
      const newQuest = await generateAIQuest({ studentProfile, platformFeatures });
      setQuest(newQuest);
    } catch (e) {
      console.error("AI Quest generation failed. Falling back to mock quest.", e);
      // Fallback to mock data
      mockQuestIndex = (mockQuestIndex + 1) % mockQuests.length;
      setQuest(mockQuests[mockQuestIndex]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchQuest();
  }, [fetchQuest]);

  const handleCompleteQuest = () => {
    if (quest) {
        setKnowledgeCoins(prev => prev + quest.knowledgeCoinsReward);
        // Fetch a new quest after completing the current one
        fetchQuest();
    }
  }

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>AI Daily Quest</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={fetchQuest} disabled={isLoading}>
                <RefreshCw className={cn("w-5 h-5", isLoading && "animate-spin")} />
            </Button>
            <Zap className="w-6 h-6 text-primary" />
          </div>
        </div>
        <CardDescription>Complete quests to earn Knowledge Coins and grow your skills.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col flex-1 justify-between">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-6 w-3/4 rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
          </div>
        ) : quest ? (
          <div>
            <h3 className="font-semibold text-lg">{quest.questTitle}</h3>
            <p className="text-sm text-muted-foreground mt-2">{quest.questDescription}</p>
          </div>
        ) : null}

        <div className="flex justify-between items-center pt-2">
            <Badge variant="secondary" className="flex items-center gap-2 py-2 px-3">
                <Coins className="w-5 h-5 text-amber-400" />
                {isLoading ? (
                    <Skeleton className="h-6 w-16" />
                ) : (
                    <span className="font-semibold text-base">{quest?.knowledgeCoinsReward} Coins</span>
                )}
            </Badge>
            <Button size="lg" disabled={isLoading} onClick={handleCompleteQuest}>Complete Quest</Button>
        </div>
      </CardContent>
    </Card>
  );
}
