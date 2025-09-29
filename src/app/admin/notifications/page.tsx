
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send } from 'lucide-react';

export default function NotificationsPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());
        console.log("Sending notification:", data);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast({
            title: "Notification Sent!",
            description: `Your announcement has been scheduled to be sent to ${data.audience}.`
        });

        setIsLoading(false);
        event.currentTarget.reset();
    };

  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold">Send Notifications</h1>
        <p className="text-muted-foreground">Broadcast announcements to different user groups on the platform.</p>
      </div>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
            <CardTitle>Compose Announcement</CardTitle>
            <CardDescription>Craft your message and select the target audience.</CardDescription>
        </CardHeader>
        <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
                 <div className="space-y-2">
                    <Label htmlFor="audience">Target Audience</Label>
                    <Select name="audience" defaultValue="all" required>
                        <SelectTrigger id="audience">
                            <SelectValue placeholder="Select an audience" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Users</SelectItem>
                            <SelectItem value="students">Students Only</SelectItem>
                            <SelectItem value="faculty">Faculty Only</SelectItem>
                            <SelectItem value="alumni">Alumni Only</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" placeholder="e.g., Upcoming System Maintenance" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" name="message" placeholder="Write your detailed announcement here..." rows={8} required />
                </div>
                <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                         {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                         <Send className="mr-2" />
                        Send Notification
                    </Button>
                </div>
            </form>
        </CardContent>
      </Card>
    </div>
  );
}
