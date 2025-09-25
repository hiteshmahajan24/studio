
'use client';

import { useParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { communities, communityPosts, allUsers } from '@/lib/mock-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PlusCircle, Rss, Users, Calendar } from 'lucide-react';
import Image from 'next/image';
import { PostCard } from '@/components/communities/post-card';

export default function CommunityPage() {
  const params = useParams();
  const communityId = params.communityId as string;
  const community = communities.find((c) => c.id === communityId);

  if (!community) {
    return <div className="text-center py-10">Community not found.</div>;
  }

  const communityImage = PlaceHolderImages.find((img) => img.id === community.id.replace('comm-', 'event-'));

  const members = allUsers.filter(user => user.community === community.name || (community.name === 'AI Innovators' && user.expertise.includes('AI/ML'))).slice(0, 8);

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden">
        <div className="h-48 w-full relative">
            {communityImage && (
                 <Image
                    src={communityImage.imageUrl}
                    alt={community.name}
                    data-ai-hint={communityImage.imageHint}
                    fill
                    className="object-cover"
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <CardHeader className="relative -mt-16 z-10 p-6 flex-col items-start text-white">
            <div className='p-3 bg-white/20 backdrop-blur-sm rounded-lg mb-2 border border-white/30'>
                <community.icon className="w-8 h-8 text-white" />
            </div>
          <CardTitle className="text-3xl font-bold">{community.name}</CardTitle>
          <CardDescription className="text-white/90 max-w-2xl">{community.description}</CardDescription>
            <div className="flex items-center gap-4 text-sm mt-2">
                <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    <span>{community.memberCount} Members</span>
                </div>
            </div>
        </CardHeader>
      </Card>

        <div className="flex justify-end">
            <Button>
                <PlusCircle className="mr-2" />
                Create Post
            </Button>
        </div>

      <Tabs defaultValue="feed">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="feed"><Rss className="mr-2"/> Feed</TabsTrigger>
          <TabsTrigger value="members"><Users className="mr-2"/> Members</TabsTrigger>
          <TabsTrigger value="events"><Calendar className="mr-2"/> Events</TabsTrigger>
        </TabsList>
        <TabsContent value="feed" className="mt-6">
          <div className="space-y-6">
            {communityPosts.map(post => (
                <PostCard key={post.id} post={post} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="members" className="mt-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {members.map(member => {
                    const avatar = PlaceHolderImages.find((img) => img.id === member.avatarId);
                    return (
                        <Card key={member.id} className="flex flex-col items-center p-4 text-center">
                            <Avatar className="h-20 w-20 mb-4">
                                {avatar && <AvatarImage src={avatar.imageUrl} alt={member.name} data-ai-hint={avatar.imageHint} />}
                                <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <p className="font-bold">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.title}</p>
                            <Button variant="outline" size="sm" className="mt-4">View Profile</Button>
                        </Card>
                    )
                })}
            </div>
        </TabsContent>
        <TabsContent value="events" className="mt-6">
            <div className="text-center py-16">
                <h3 className="text-lg font-semibold">No Community Events</h3>
                <p className="text-sm text-muted-foreground">
                    There are no events specific to this community right now.
                </p>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
