
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { allUsers } from '@/lib/mock-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { CommunityPost } from '@/lib/mock-data';
import { MessageSquare, ThumbsUp } from 'lucide-react';

type PostCardProps = {
    post: CommunityPost;
};

export function PostCard({ post }: PostCardProps) {
    const author = allUsers.find(user => user.id === post.authorId);
    if (!author) return null;

    const avatar = PlaceHolderImages.find(img => img.id === author.avatarId);

    return (
        <Card>
            <CardHeader className="flex-row items-center gap-4">
                <Avatar>
                    {avatar && <AvatarImage src={avatar.imageUrl} alt={author.name} data-ai-hint={avatar.imageHint} />}
                    <AvatarFallback>{author.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold">{author.name}</p>
                    <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm">{post.content}</p>
            </CardContent>
            <CardFooter className="flex items-center gap-4 border-t pt-4">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{post.likes} Likes</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.comments} Comments</span>
                </Button>
            </CardFooter>
        </Card>
    )
}
