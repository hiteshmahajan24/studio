
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { user, earnedBadges } from "@/lib/mock-data";
import { Coins, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useUserState } from "@/context/user-state-context";

const statCards = [
  { title: "Knowledge Coins", valueKey: 'knowledgeCoins', icon: Coins, description: "Earn coins by completing quests and engaging.", goal: "2,000 to redeem a course", goalValue: 2000 },
  { title: "Leaderboard Rank", valueKey: 'leaderboardRank', icon: TrendingUp, description: "Climb the ranks by earning points from activities.", goal: "Top 10 to earn a badge", goalValue: 50, rank: true },
];

export function Gamification({ className }: { className?: string }) {
  const nextBadge = { name: "Community Helper", description: "Answer 5 questions in the forum.", progress: 60 };
  const { knowledgeCoins } = useUserState();

  const dynamicStats = {
      knowledgeCoins: knowledgeCoins,
      leaderboardRank: user.leaderboardRank,
  }

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader>
        <CardTitle>Your Progress & Achievements</CardTitle>
        <CardDescription>See your achievements, track your goals, and climb the leaderboard.</CardDescription>
      </CardHeader>
      <CardContent className="grid flex-1 gap-6 md:grid-cols-2">
        {/* Stats Section */}
        <div className="grid gap-6 sm:grid-cols-2">
          {statCards.map((card) => {
            const value = dynamicStats[card.valueKey as keyof typeof dynamicStats];
            const progress = card.rank ? (1 - (value - 1) / card.goalValue) * 100 : (value / card.goalValue) * 100;
            return (
                <div key={card.title} className="bg-muted/50 p-4 rounded-lg flex flex-col justify-between">
                <div className="flex-1">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-1">
                    <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                    <card.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">{card.rank ? `#${value}` : value.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
                </div>
                <div className="mt-4">
                    <Progress value={progress} className="h-1.5 bg-background" />
                    <p className="text-xs text-muted-foreground mt-1.5">{card.goal}</p>
                </div>
                </div>
            );
          })}
        </div>

        {/* Badges and Next Goal Section */}
        <div className="space-y-4 rounded-lg bg-muted/50 p-4">
            <div>
              <h3 className="text-sm font-semibold mb-2">Earned Badges</h3>
              <p className="text-xs text-muted-foreground mb-3">Collect unique badges by reaching milestones and participating in events.</p>
              <TooltipProvider delayDuration={100}>
                  <div className="flex flex-wrap gap-3">
                  {earnedBadges.map((badge) => (
                      <Tooltip key={badge.id}>
                      <TooltipTrigger>
                          <Badge variant="outline" className="p-3 transition-transform hover:scale-110 hover:bg-accent/20 border-dashed border-accent/50">
                          <badge.Icon className="h-6 w-6 text-accent" />
                          </Badge>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                          <p className="font-semibold">{badge.name}</p>
                          <p className="text-sm text-muted-foreground">{badge.description}</p>
                      </TooltipContent>
                      </Tooltip>
                  ))}
                  </div>
              </TooltipProvider>
            </div>
             <div className="border-t border-border pt-4">
                <h3 className="text-sm font-semibold mb-1.5">Suggested Next Badge: {nextBadge.name}</h3>
                <p className="text-xs text-muted-foreground mb-1.5">{nextBadge.description}</p>
                <Progress value={nextBadge.progress} className="h-1.5" />
             </div>
        </div>
      </CardContent>
    </Card>
  );
}
