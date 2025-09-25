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
import type { UserProfile } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '../ui/badge';
import { Briefcase, GraduationCap, Handshake, Mail } from 'lucide-react';
import { Separator } from '../ui/separator';

type UserProfileDialogProps = {
  children: React.ReactNode;
  user: UserProfile;
};

export function UserProfileDialog({ children, user }: UserProfileDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const avatar = PlaceHolderImages.find((img) => img.id === user.avatarId);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
                {avatar && <AvatarImage src={avatar.imageUrl} alt={user.name} data-ai-hint={avatar.imageHint} />}
                <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <DialogTitle className="text-2xl">{user.name}</DialogTitle>
            <DialogDescription>{user.title}</DialogDescription>
            <Badge variant="secondary" className="capitalize w-fit mx-auto mt-2">{user.community}</Badge>
        </DialogHeader>
        <div className="py-4 space-y-6 max-h-[60vh] overflow-y-auto pr-4">
            <div className='space-y-2'>
                <p className='text-sm text-muted-foreground'>{user.bio}</p>
                 <div className="flex flex-wrap gap-2 pt-2">
                    {user.expertise.map((skill) => (
                        <Badge key={skill} variant="outline">
                        {skill}
                        </Badge>
                    ))}
                </div>
            </div>
            
            <Separator />

            {user.experience.length > 0 && (
                <div className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary" /> Experience</h4>
                    <div className="space-y-4">
                    {user.experience.map((exp, index) => (
                        <div key={index} className="pl-4">
                            <p className="font-semibold">{exp.role}</p>
                            <p className="text-sm">{exp.company}</p>
                            <p className="text-xs text-muted-foreground">{exp.period}</p>
                        </div>
                    ))}
                    </div>
                </div>
            )}
            
            {user.education && (
                 <div className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2"><GraduationCap className="w-5 h-5 text-primary" /> Education</h4>
                     <div className="pl-4">
                        <p className="font-semibold">{user.education.degree}</p>
                        <p className="text-sm">{user.education.university}</p>
                        <p className="text-xs text-muted-foreground">{user.education.year}</p>
                    </div>
                </div>
            )}

        </div>
        <DialogFooter>
          <Button type="button" variant="outline">
            <Mail className="mr-2" /> Message
          </Button>
          <Button type="submit">
            <Handshake className="mr-2" /> Connect
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
