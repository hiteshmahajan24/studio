
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
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Mentor } from '@/lib/mock-data';

type RequestSessionDialogProps = {
  children: React.ReactNode;
  mentor: Mentor;
};

export function RequestSessionDialog({ children, mentor }: RequestSessionDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [topic, setTopic] = React.useState('');
  const [message, setMessage] = React.useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!topic || !message) {
        toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please select a topic and write a message.",
        });
        return;
    }
    
    // In a real app, you would send this request to a backend service
    console.log({
        mentorId: mentor.id,
        topic,
        message,
    });
    
    toast({
        title: "Request Sent!",
        description: `Your request has been sent to ${mentor.name}.`,
    });
    
    setIsOpen(false);
    setTopic('');
    setMessage('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle>Request a Session with {mentor.name}</DialogTitle>
          <DialogDescription>
            Let {mentor.name.split(' ')[0]} know what you'd like to discuss.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="topic">I need help with...</Label>
            <Select onValueChange={setTopic} value={topic}>
              <SelectTrigger id="topic">
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent>
                {mentor.topics.map((topic) => (
                  <SelectItem key={topic} value={topic}>
                    {topic}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Your Message</Label>
            <Textarea
              id="message"
              placeholder={`e.g. "Hi ${mentor.name.split(' ')[0]}, I'd love to get your advice on..."`}
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit}>
            Send Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
