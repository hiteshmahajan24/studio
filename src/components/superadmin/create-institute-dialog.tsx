
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
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
    instituteName: z.string().min(3, { message: "Institute name must be at least 3 characters." }),
    instituteLocation: z.string().min(2, { message: "Location is required." }),
    adminName: z.string().min(2, { message: "Admin name is required." }),
    adminEmail: z.string().email({ message: "Please enter a valid email for the admin." }),
});

type CreateInstituteDialogProps = {
  children: React.ReactNode;
};

export function CreateInstituteDialog({ children }: CreateInstituteDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        instituteName: "",
        instituteLocation: "",
        adminName: "",
        adminEmail: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    console.log("Creating new institute with values:", values);
    
    // Simulate an API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Here you would typically call a server action or API endpoint
    // to create the institute and the admin user in your database.

    toast({
        title: "Institute Created!",
        description: `${values.instituteName} has been created, and an invite has been sent to ${values.adminEmail}.`,
    });

    setIsLoading(false);
    setIsOpen(false);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a New Institute</DialogTitle>
          <DialogDescription>
            Enter the details for the new institute and its primary administrator.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
                <FormField
                    control={form.control}
                    name="instituteName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Institute Name</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Nexus University" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="instituteLocation"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., New York, NY" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <div className="border-t pt-4 mt-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Primary Administrator</h3>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="adminName"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Admin Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Jane Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="adminEmail"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Admin Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="admin@nexus.edu" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <DialogFooter className="pt-6">
                <DialogClose asChild>
                    <Button type="button" variant="ghost">
                    Cancel
                    </Button>
                </DialogClose>
                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Institute
                </Button>
                </DialogFooter>
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
