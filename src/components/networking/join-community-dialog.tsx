
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
import { Community } from '@/lib/mock-data';
import { Coins, PartyPopper } from 'lucide-react';
import { useUserState } from '@/context/user-state-context';

type JoinCommunityDialogProps = {
  children: React.ReactNode;
  community: Community;
};

export function JoinCommunityDialog({ children, community }: JoinCommunityDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { toast } = useToast();
  const { knowledgeCoins, setKnowledgeCoins, joinCommunity } = useUserState();

  const handleJoin = () => {
    if (knowledgeCoins < community.joinCost) {
      toast({
        variant: 'destructive',
        title: 'Not Enough Coins!',
        description: `You need ${community.joinCost} Knowledge Coins to join ${community.name}.`,
      });
      return;
    }

    setKnowledgeCoins(knowledgeCoins - community.joinCost);
    joinCommunity(community.id);

    toast({
      title: 'Welcome to the Community!',
      description: `You have successfully joined ${community.name}. ${community.joinCost} coins have been deducted.`,
    });

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PartyPopper className="text-primary" />
            Join {community.name}
          </DialogTitle>
          <DialogDescription>
            You are about to join the <strong>{community.name}</strong> community.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 text-sm">
          <p>
            This community requires a one-time entry fee of{' '}
            <span className="font-semibold text-primary flex items-center gap-1">
              <Coins className="w-4 h-4 text-amber-400" /> {community.joinCost} Knowledge Coins
            </span>
            to ensure all members are engaged.
          </p>
          <p className="mt-4 text-muted-foreground">
            Your current balance is {knowledgeCoins} coins.
          </p>
        </div>
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleJoin} disabled={knowledgeCoins < community.joinCost}>
            Confirm and Join
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
