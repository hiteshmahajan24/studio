
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
import { useToast } from '@/hooks/use-toast';
import { CollegeEvent, PlatformEvent } from '@/lib/events-data';
import { PartyPopper } from 'lucide-react';
import { useUserState } from '@/context/user-state-context';


type EventRegistrationDialogProps = {
  children: React.ReactNode;
  event: PlatformEvent | CollegeEvent;
};

export function EventRegistrationDialog({ children, event }: EventRegistrationDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { toast } = useToast();
  const { registerForEvent } = useUserState();

  const handleRegister = () => {
    registerForEvent(event.id);
    
    toast({
        title: "Registration Successful!",
        description: `You're all set for "${event.title}".`,
    });
    
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PartyPopper className="text-primary"/>
            Confirm Your Registration
          </DialogTitle>
          <DialogDescription>
            You are about to register for the event: <strong>{event.title}</strong>.
          </DialogDescription>
        </DialogHeader>
        <div className='py-4 text-sm text-muted-foreground'>
            Are you sure you want to proceed? This will confirm your spot in the event.
        </div>
        <DialogFooter className='sm:justify-between'>
            <DialogClose asChild>
                <Button type="button" variant="ghost">
                Cancel
                </Button>
            </DialogClose>
            <Button type="button" onClick={handleRegister}>
                Confirm Registration
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
