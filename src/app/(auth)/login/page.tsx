
'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ClientOnly } from '@/components/layout/client-only';
import { type UserRole } from '@/lib/mock-data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
  email: z.string().optional(),
  password: z.string().optional(),
});

const availableRoles: UserRole[] = ['student', 'admin', 'faculty', 'alumni', 'employer', 'superadmin'];


export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState<UserRole>('student');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const getRedirectPath = (role: UserRole) => {
    const paths: { [key in UserRole]: string } = {
      student: '/student/dashboard',
      admin: '/admin/dashboard',
      faculty: '/faculty/dashboard',
      alumni: '/alumni/dashboard',
      employer: '/employer/dashboard',
      superadmin: '/creator-view',
    };
    // Pass the role as a query parameter to be used by the layout
    return `${paths[role]}?role=${role}`;
  };

  function onSubmit() {
    setIsLoading(true);
    const redirectPath = getRedirectPath(selectedRole);
    router.push(redirectPath);
  }

  return (
    <ClientOnly>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Select a Role</CardTitle>
          <CardDescription>
            Choose a role to view the corresponding dashboard. No password needed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                  <Label>Select a Role to View As</Label>
                  <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
                      <SelectTrigger>
                          <SelectValue placeholder="Select a role..." />
                      </SelectTrigger>
                      <SelectContent>
                          {availableRoles.map(role => (
                              <SelectItem key={role} value={role} className="capitalize">{role}</SelectItem>
                          ))}
                      </SelectContent>
                  </Select>
              </div>
               <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="any@email.com" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password (optional)</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="any password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Continue as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
              </Button>
            </form>
          </Form>

          <div className="mt-4 text-center text-sm">
            This is a simplified login for demonstration purposes.
          </div>
        </CardContent>
      </Card>
    </ClientOnly>
  );
}
