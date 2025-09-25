'use client';

import * as React from 'react';
import type { UserProfile } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { UserProfileDialog } from './user-profile-dialog';

type UserCardProps = {
  user: UserProfile;
};

export function UserCard({ user }: UserCardProps) {
  const avatar = PlaceHolderImages.find((img) => img.id === user.avatarId);
  return (
    <UserProfileDialog user={user}>
        <Card className="flex flex-col hover:bg-muted/50 cursor-pointer transition-colors">
        <CardHeader className="flex-row items-center gap-4 pb-4">
            <Avatar className="h-16 w-16">
            {avatar && <AvatarImage src={avatar.imageUrl} alt={user.name} data-ai-hint={avatar.imageHint} />}
            <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <CardDescription>{user.title}</CardDescription>
                 <Badge variant="outline" className="mt-2 capitalize">{user.community}</Badge>
            </div>
        </CardHeader>
        <CardContent className="flex-1">
            <div className="flex flex-wrap gap-2">
            {user.expertise.slice(0, 3).map((skill) => (
                <Badge key={skill} variant="secondary">
                {skill}
                </Badge>
            ))}
            {user.expertise.length > 3 && <Badge variant="outline">+{user.expertise.length - 3}</Badge>}
            </div>
        </CardContent>
        <Separator />
        <CardFooter className="p-4">
            <Button variant="outline" className="w-full">
                View Profile
            </Button>
        </CardFooter>
        </Card>
    </UserProfileDialog>
  );
}
