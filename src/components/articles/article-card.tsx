
'use client';

import type { MockArticle } from '@/lib/mock-data';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { allUsers } from '@/lib/mock-data';
import { Badge } from '../ui/badge';
import { ThumbsUp, MessageSquare, Bookmark } from 'lucide-react';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';

type ArticleCardProps = {
  article: MockArticle;
};

export function ArticleCard({ article }: ArticleCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === article.imageId) as ImagePlaceholder;
  const author = allUsers.find(user => user.id === article.authorId);
  const authorAvatar = PlaceHolderImages.find(img => img.id === author?.avatarId);
  const { toast } = useToast();

  const handleBookmark = () => {
    toast({
      title: 'Article Bookmarked!',
      description: `"${article.title}" has been saved to your list.`,
    });
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full group">
      <CardHeader className="p-0 relative h-48">
        <Image
          src={image.imageUrl}
          alt={article.title}
          data-ai-hint={image.imageHint}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </CardHeader>
      <CardContent className="p-4 flex-1">
        <div className="flex flex-wrap gap-2 mb-2">
            {article.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
        </div>
        <h3 className="text-lg font-bold leading-snug line-clamp-2">{article.title}</h3>
      </CardContent>
      <CardFooter className="p-4 border-t flex-col items-start space-y-4">
        <div className='w-full flex items-center justify-between'>
            {author && (
                <div className='flex items-center gap-2'>
                    <Avatar className='w-8 h-8'>
                        {authorAvatar && <AvatarImage src={authorAvatar.imageUrl} alt={author.name} data-ai-hint={authorAvatar.imageHint} />}
                        <AvatarFallback>{author.name.slice(0,2)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className='text-sm font-semibold'>{author.name}</p>
                        <p className='text-xs text-muted-foreground'>{article.readTime} min read</p>
                    </div>
                </div>
            )}
            <Button variant="ghost" size="icon" onClick={handleBookmark}>
                <Bookmark className="w-5 h-5" />
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
