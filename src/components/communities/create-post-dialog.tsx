
'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Label } from '../ui/label';

type CreatePostDialogProps = {
  children: React.ReactNode;
};

export function CreatePostDialog({ children }: CreatePostDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [content, setContent] = React.useState('');
  const { toast } = useToast();

  const handlePost = () => {
    if (content.trim().length < 10) {
      toast({
        variant: 'destructive',
        title: 'Post is too short',
        description: 'Please write at least 10 characters for your post.',
      });
      return;
    }

    // In a real app, you'd send this to a server
    console.log('New Post Content:', content);

    toast({
      title: 'Post Created!',
      description: 'Your post has been successfully added to the feed.',
    });

    setContent('');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create a new post</DialogTitle>
          <DialogDescription>
            Share your thoughts, ask a question, or start a discussion with the community.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label htmlFor="post-content" className="sr-only">
            Post Content
          </Label>
          <Textarea
            id="post-content"
            placeholder="What's on your mind?"
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" onClick={handlePost}>
            Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
