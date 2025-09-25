'use client';

import { Award, Badge, Coins, Group, PersonStanding, Trophy } from "lucide-react";
import { Badge as UiBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CollegeEvent, PlatformEvent } from "@/lib/events-data";
import { EventRegistrationDialog } from "./event-registration-dialog";


type EventCardProps = {
    event: PlatformEvent | CollegeEvent;
}

const categoryIcon: Record<string, React.ReactNode> = {
    'competition': <Trophy className="w-4 h-4" />,
    'hackathon': <Coins className="w-4 h-4" />,
    'workshop': <Award className="w-4 h-4" />,
}

const rewardIcons = {
    'knowledge-coins': { icon: <Coins className="w-4 h-4 text-amber-400" />, label: 'Coins' },
    'unique-badge': { icon: <Badge className="w-4 h-4 text-accent" />, label: 'Badge' },
    'certificate': { icon: <Award className="w-4 h-4 text-primary" />, label: 'Certificate' },
    'prize-money': { icon: <Trophy className="w-4 h-4 text-green-500" />, label: 'Prize' },
}

export function EventCard({ event }: EventCardProps) {

    const rewards = event.hostType === 'platform' ? event.rewards : event.rewards;

    return (
        <Card className="flex flex-col">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-xl leading-snug">{event.title}</CardTitle>
                    <UiBadge variant="secondary" className="capitalize shrink-0">
                        {categoryIcon[event.category.toLowerCase()] || <Trophy className="w-4 h-4" />}
                        <span className="ml-1.5">{event.category}</span>
                    </UiBadge>
                </div>
                <CardDescription>{event.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                    {event.participationType === 'team' ? <Group className="mr-2"/> : <PersonStanding className="mr-2"/>}
                    <span className="capitalize">{event.participationType} Event</span>
                </div>
                 <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Rewards</h4>
                    <div className="flex flex-wrap gap-4">
                        {rewards.map(reward => {
                            const rewardInfo = rewardIcons[reward as keyof typeof rewardIcons];
                            if (!rewardInfo) return null;
                            return (
                                <div key={reward} className="flex items-center gap-1.5 text-sm">
                                    {rewardInfo.icon}
                                    <span className="font-medium">{rewardInfo.label}</span>
                                </div>
                            )
                        })}
                    </div>
                 </div>
            </CardContent>
            <Separator />
            <CardFooter className="p-4">
                <EventRegistrationDialog event={event}>
                    <Button className="w-full">Register</Button>
                </EventRegistrationDialog>
            </CardFooter>
        </Card>
    )
}
