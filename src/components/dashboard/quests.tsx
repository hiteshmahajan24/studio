
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

export function Quests({ className }: { className?: string }) {
  const [quest, setQuest] = React.useState<AIQuestOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const { setKnowledgeCoins } = useUserState();

  const fetchQuest = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const studentProfile = `Name: ${user.name}, Skills: ${user.profile.skills.join(', ')}, Experience: ${user.profile.experience}`;
      const platformFeatures = ['find mentors', 'apply for jobs', 'join communities', 'read articles'];
      const newQuest = await generateAIQuest({ studentProfile, platformFeatures });
      setQuest(newQuest);
    } catch (e) {
      console.error(e);
      setError("Failed to generate a new quest. Please try again.");
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
        ) : error ? (
            <div className="flex flex-col items-center justify-center text-center text-destructive py-4">
                <AlertTriangle className="w-8 h-8 mb-2" />
                <p className="font-semibold">Error</p>
                <p className="text-sm">{error}</p>
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
            <Button size="lg" disabled={isLoading || !!error} onClick={handleCompleteQuest}>Complete Quest</Button>
        </div>
      </CardContent>
    </Card>
  );
}
