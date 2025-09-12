import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { user, earnedBadges } from "@/lib/mock-data";
import { Coins, TrendingUp, Shield, Gem } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const statCards = [
  { title: "Knowledge Coins", value: user.knowledgeCoins.toLocaleString(), icon: Coins },
  { title: "Leaderboard Rank", value: `#${user.leaderboardRank}`, icon: TrendingUp },
  { title: "Silver Cards Given", value: "5", icon: Shield },
  { title: "Gold Cards Received", value: "2", icon: Gem },
];

export function Gamification() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              {card.title === 'Knowledge Coins' && <p className="text-xs text-muted-foreground">Redeem for perks</p>}
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Your Badges</CardTitle>
          <CardDescription>Recognition for your achievements and contributions.</CardDescription>
        </CardHeader>
        <CardContent>
          <TooltipProvider delayDuration={100}>
            <div className="flex flex-wrap gap-4">
              {earnedBadges.map((badge) => (
                <Tooltip key={badge.id}>
                  <TooltipTrigger>
                    <Badge variant="outline" className="p-3 transition-transform hover:scale-110 hover:bg-accent/20">
                      <badge.Icon className="h-6 w-6" />
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-semibold">{badge.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </CardContent>
      </Card>
    </div>
  );
}
