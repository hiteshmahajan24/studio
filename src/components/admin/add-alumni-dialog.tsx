
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
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Loader2 } from 'lucide-react';
import type { UserProfile } from '@/lib/mock-data';

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email." }),
    phone: z.string().optional(),
    address: z.string().optional(),
    education: z.object({
        year: z.coerce.number().min(1950, "Invalid year.").max(new Date().getFullYear() + 5, "Invalid year."),
        degree: z.string().min(2, { message: "Major is required." }),
        university: z.string().optional(),
    }),
    currentCompany: z.string().optional(),
    title: z.string().optional(),
});

type AddAlumniFormValues = Omit<UserProfile, 'id' | 'community' | 'leaderboardRank' | 'experience' | 'avatarId' | 'expertise' | 'industry' | 'bio'>;

type AddAlumniDialogProps = {
  children: React.ReactNode;
  onAddAlumni: (values: AddAlumniFormValues) => void;
};

export function AddAlumniDialog({ children, onAddAlumni }: AddAlumniDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
        email: "",
        phone: "",
        address: "",
        education: {
            year: new Date().getFullYear() - 1,
            degree: "",
            university: "Nexus University"
        },
        currentCompany: "",
        title: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // The 'title' field from the form is the main role, 'experience' will be empty for new manual entries.
    onAddAlumni({ ...values, title: values.title || 'Alumni' });

    setIsLoading(false);
    setIsOpen(false);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Alumni Manually</DialogTitle>
          <DialogDescription>
            Enter the details for a new alumni member to add them to the directory.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2 max-h-[70vh] overflow-y-auto pr-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="john.doe@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                            <Input placeholder="(123) 456-7890" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                            <Input placeholder="123 Main St, Anytown, USA" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="education.year"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Graduation Year</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="e.g., 2020" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="education.degree"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Major</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Computer Science" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="currentCompany"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Current Company</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Innovate Inc." {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Role/Title</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Software Engineer" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <DialogFooter className="pt-6">
                    <DialogClose asChild>
                        <Button type="button" variant="ghost">
                        Cancel
                        </Button>
                    </DialogClose>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Add Alumni
                    </Button>
                </DialogFooter>
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
