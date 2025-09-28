
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Community } from '@/lib/mock-data';
import { Users, Coins, ArrowRight } from 'lucide-react';
import { JoinCommunityDialog } from './join-community-dialog';
import { Button } from '../ui/button';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useUserState } from '@/context/user-state-context';
import Link from 'next/link';

type CommunityCardProps = {
  community: Community;
};

export function CommunityCard({ community }: CommunityCardProps) {
  const communityImage = PlaceHolderImages.find((img) => img.id === community.imageId);
  const { joinedCommunityIds } = useUserState();
  const isJoined = joinedCommunityIds.includes(community.id);

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg group">
       <CardHeader className="p-0 relative h-32">
         {communityImage && (
            <Image
                src={communityImage.imageUrl}
                alt={community.name}
                data-ai-hint={communityImage.imageHint}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
         )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
             <div className='p-2 bg-white/20 backdrop-blur-sm rounded-lg mb-2 border border-white/30 w-fit'>
                <community.icon className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-xl text-white">{community.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4 space-y-3">
        <CardDescription>{community.description}</CardDescription>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{community.memberCount} Members</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t bg-muted/20">
        {isJoined ? (
             <Button asChild className="w-full" variant="secondary">
                <Link href={`/communities/${community.id}`}>
                    View Community <ArrowRight className="ml-2" />
                </Link>
            </Button>
        ) : (
            <JoinCommunityDialog community={community}>
                <Button className="w-full">
                    <Coins className="mr-2 text-amber-400"/>
                    Join for {community.joinCost} Coins
                </Button>
            </JoinCommunityDialog>
        )}
      </CardFooter>
    </Card>
  );
}
