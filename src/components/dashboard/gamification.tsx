import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { user, earnedBadges } from "@/lib/mock-data";
import { Coins, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const statCards = [
  { title: "Knowledge Coins", value: user.knowledgeCoins.toLocaleString(), icon: Coins, progress: (user.knowledgeCoins / 2000) * 100, goal: "2,000 to redeem a course" },
  { title: "Leaderboard Rank", value: `#${user.leaderboardRank}`, icon: TrendingUp, progress: (1 - (user.leaderboardRank - 1) / 50) * 100, goal: "Top 10 to earn a badge" },
];

export function Gamification({ className }: { className?: string }) {
  const nextBadge = { name: "Community Helper", description: "Answer 5 questions in the forum.", progress: 60 };

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader>
        <CardTitle>Your Progress & Achievements</CardTitle>
        <CardDescription>See your achievements, track your goals, and climb the leaderboard.</CardDescription>
      </CardHeader>
      <CardContent className="grid flex-1 gap-8 md:grid-cols-3">
        {/* Stats Section */}
        <div className="grid gap-6 sm:grid-cols-2 md:col-span-2">
          {statCards.map((card) => (
            <div key={card.title} className="bg-muted/50 p-6 rounded-lg flex flex-col justify-between">
              <div>
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-medium">{card.title}</CardTitle>
                  <card.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="text-3xl font-bold">{card.value}</div>
              </div>
              <div className="mt-4">
                <Progress value={card.progress} className="h-2 bg-background" />
                <p className="text-xs text-muted-foreground mt-2">{card.goal}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Badges and Next Goal Section */}
        <div className="space-y-6 rounded-lg bg-muted/50 p-6">
            <div>
              <h3 className="text-base font-semibold mb-4">Earned Badges</h3>
              <TooltipProvider delayDuration={100}>
                  <div className="flex flex-wrap gap-4">
                  {earnedBadges.map((badge) => (
                      <Tooltip key={badge.id}>
                      <TooltipTrigger>
                          <Badge variant="outline" className="p-4 transition-transform hover:scale-110 hover:bg-accent/20 border-dashed border-accent/50">
                          <badge.Icon className="h-7 w-7 text-accent" />
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
             <div className="border-t border-border pt-6">
                <h3 className="text-base font-semibold mb-2">Next Badge: {nextBadge.name}</h3>
                <Progress value={nextBadge.progress} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground">{nextBadge.description}</p>
             </div>
        </div>
      </CardContent>
    </Card>
  );
}
