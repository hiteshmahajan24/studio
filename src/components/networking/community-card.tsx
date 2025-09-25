
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { Community } from '@/lib/mock-data';
import { Users, Trophy } from 'lucide-react';
import Link from 'next/link';

type CommunityCardProps = {
  community: Community;
};

export function CommunityCard({ community }: CommunityCardProps) {
  return (
    <Link href={`/communities/${community.id}`} className="block h-full">
        <Card className="flex flex-col h-full transition-all border-2 border-transparent hover:border-primary hover:shadow-lg">
        <CardHeader>
            <div className="flex items-start justify-between">
            <CardTitle className="flex items-center gap-3">
                <div className='p-2 bg-muted rounded-md'>
                    <community.icon className="w-6 h-6 text-primary" />
                </div>
                {community.name}
            </CardTitle>
            </div>
            <CardDescription className="pt-2">{community.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 space-y-4">
            <div className="flex justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{community.memberCount} Members</span>
                </div>
                <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <span>Top: {community.topContributors.join(', ')}</span>
                </div>
            </div>
        </CardContent>
        <Separator />
        <CardFooter className="p-4">
            <p className="text-sm font-semibold text-primary w-full text-center">View Community</p>
        </CardFooter>
        </Card>
    </Link>
  );
}
