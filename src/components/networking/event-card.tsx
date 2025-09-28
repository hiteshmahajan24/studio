
'use client';

import { Award, Badge, Calendar, Coins, Group, PersonStanding, Trophy, CheckCircle2, Users } from "lucide-react";
import { Badge as UiBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CollegeEvent, PlatformEvent } from "@/lib/events-data";
import { EventRegistrationDialog } from "./event-registration-dialog";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { format } from "date-fns";
import { useUserState } from "@/context/user-state-context";


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
    const eventImage = PlaceHolderImages.find(img => img.id === event.imageId);
    const { registeredEventIds } = useUserState();
    const isRegistered = registeredEventIds.includes(event.id);

    return (
        <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg group">
            <CardHeader className="p-0 relative h-40">
                {eventImage && (
                    <Image 
                        src={eventImage.imageUrl}
                        alt={event.title}
                        data-ai-hint={eventImage.imageHint}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                    <CardTitle className="text-xl leading-snug text-white">{event.title}</CardTitle>
                </div>
                <UiBadge variant="secondary" className="capitalize absolute top-3 right-3">
                    {categoryIcon[event.category.toLowerCase()] || <Trophy className="w-4 h-4" />}
                    <span className="ml-1.5">{event.category}</span>
                </UiBadge>
            </CardHeader>
            <CardContent className="flex-1 space-y-4 p-4">
                <CardDescription>{event.description}</CardDescription>
                
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>{format(new Date(event.date), 'MMM d, yyyy')}</span>
                    </div>
                     <div className="flex items-center gap-1.5">
                        {event.participationType === 'team' ? <Group className="w-4 h-4"/> : <PersonStanding className="w-4 h-4"/>}
                        <span className="capitalize">{event.participationType} Event</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        <span>{event.spotsLeft} spots left</span>
                    </div>
                </div>

                 <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Rewards</h4>
                    <div className="flex flex-wrap gap-4">
                        {rewards.map(reward => {
                            const rewardInfo = rewardIcons[reward as keyof typeof rewardIcons];
                            if (!rewardInfo) return null;
                            return (
                                <div key={reward} className="flex items-center gap-1.5 text-sm p-1.5 bg-muted/50 rounded-md">
                                    {rewardInfo.icon}
                                    <span className="font-medium">{rewardInfo.label}</span>
                                </div>
                            )
                        })}
                    </div>
                 </div>
            </CardContent>
            <Separator />
            <CardFooter className="p-4 bg-muted/20">
                {isRegistered ? (
                    <Button className="w-full" disabled variant="outline">
                        <CheckCircle2 className="mr-2 text-green-500" />
                        Registered
                    </Button>
                ) : (
                    <EventRegistrationDialog event={event}>
                        <Button className="w-full">Register Now</Button>
                    </EventRegistrationDialog>
                )}
            </CardFooter>
        </Card>
    )
}
