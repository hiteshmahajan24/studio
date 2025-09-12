import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { user, earnedBadges } from "@/lib/mock-data";
import { Coins, TrendingUp, Shield, Gem } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const statCards = [
  { title: "Knowledge Coins", value: user.knowledgeCoins.toLocaleString(), icon: Coins, progress: 75, goal: "2,000 to redeem a course" },
  { title: "Leaderboard Rank", value: `#${user.leaderboardRank}`, icon: TrendingUp, progress: 30, goal: "Top 10 to earn a badge" },
];

export function Gamification({ className }: { className?: string }) {
  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
        <CardDescription>See your achievements and where you stand.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col lg:flex-row gap-8 flex-1">
        <div className="grid gap-6 sm:grid-cols-2 flex-1">
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
        <div className="lg:w-1/3 lg:border-l lg:pl-8">
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
      </CardContent>
    </Card>
  );
}
