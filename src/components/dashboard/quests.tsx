'use server';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type AIQuestOutput } from "@/ai/flows/ai-quest-generator";
import { Button } from "@/components/ui/button";
import { Coins, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type QuestsProps = {
  questPromise: Promise<AIQuestOutput>;
};

export async function Quests({ questPromise }: QuestsProps) {
  const quest = await questPromise;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>AI Daily Quest</CardTitle>
          <Zap className="w-6 h-6 text-primary" />
        </div>
        <CardDescription>Complete quests to earn Knowledge Coins and grow your skills.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col flex-1 justify-between">
        <div>
            <h3 className="font-semibold text-lg">{quest.questTitle}</h3>
            <p className="text-sm text-muted-foreground mt-2">{quest.questDescription}</p>
        </div>
        <div className="flex justify-between items-center pt-2">
            <Badge variant="secondary" className="flex items-center gap-2 py-2 px-3">
                <Coins className="w-5 h-5 text-amber-400" />
                <span className="font-semibold text-base">{quest.knowledgeCoinsReward} Coins</span>
            </Badge>
            <Button size="lg">Start Quest</Button>
        </div>
      </CardContent>
    </Card>
  );
}
