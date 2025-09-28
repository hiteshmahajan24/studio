
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Quest } from "@/lib/mock-data";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { CheckCircle2, Shield, Gem } from 'lucide-react';
import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";


type QuestCardProps = {
    quest: Quest;
};

const categoryIcon: Record<string, React.ReactNode> = {
    'Weekly': <Shield className="w-4 h-4" />,
    'Community': <Shield className="w-4 h-4" />,
    'Special Event': <Gem className="w-4 h-4" />,
}

export function QuestCard({ quest }: QuestCardProps) {
    const isCompleted = quest.status === 'completed';
    const router = useRouter();

    const handleAction = () => {
        if (quest.ctaLink) {
            router.push(quest.ctaLink);
        }
    }

    return (
        <Card className={cn("flex flex-col", isCompleted && "bg-muted/50")}>
            <CardHeader>
                <div className="flex justify-between items-start">
                     <Badge variant={isCompleted ? "outline" : "secondary"} className="capitalize">
                        {categoryIcon[quest.category] || <Shield className="w-4 h-4" />}
                        <span className="ml-1.5">{quest.category}</span>
                    </Badge>
                    <div className="flex items-center gap-1.5 text-primary font-semibold">
                        <Gem />
                        <span>{quest.rewardPoints}</span>
                    </div>
                </div>
                <CardTitle className="pt-2">{quest.title}</CardTitle>
                <CardDescription>{quest.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                {isCompleted ? (
                     <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-semibold">Completed</span>
                    </div>
                ): (
                    <Progress value={quest.progress} className="h-2" />
                )}
            </CardContent>
            {!isCompleted && quest.ctaLink && (
                <CardFooter>
                    <Button className="w-full" onClick={handleAction}>
                        {quest.cta}
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
}
