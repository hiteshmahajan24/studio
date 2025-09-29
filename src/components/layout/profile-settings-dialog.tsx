
'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger as DialogPrimitiveTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { user as mockUser } from '@/lib/mock-data';

const DialogTrigger = React.forwardRef<
  React.ElementRef<typeof DialogPrimitiveTrigger>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitiveTrigger>
>(({ ...props }, ref) => <DialogPrimitiveTrigger ref={ref} {...props} />);
DialogTrigger.displayName = DialogPrimitiveTrigger.displayName;

export function ProfileSettingsDialog({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  
  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    toast({
        title: "Settings Saved",
        description: "Your changes have been saved successfully.",
    });
  }

  return (
    <Dialog>
      {children}
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Profile & Settings</DialogTitle>
          <DialogDescription>
            Manage your account settings and preferences.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="profile" className="w-full py-4">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="mt-6">
                <form className="space-y-4" onSubmit={handleSaveChanges}>
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue={mockUser.name} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="alex.martinez@student.nexus.edu" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="password">New Password</Label>
                        <Input id="password" type="password" placeholder="••••••••" />
                    </div>
                    <DialogFooter className="pt-4">
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save changes
                        </Button>
                    </DialogFooter>
                </form>
            </TabsContent>
            <TabsContent value="appearance" className="mt-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Theme</Label>
                        <p className="text-sm text-muted-foreground">
                            The application is currently in dark mode. Theme switching is not yet implemented.
                        </p>
                    </div>
                    <DialogFooter className="pt-4">
                         <Button type="submit" disabled>
                            Save changes
                        </Button>
                    </DialogFooter>
                </div>
            </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

// Attach the trigger to the main component for easier composition
ProfileSettingsDialog.Trigger = DialogTrigger;
