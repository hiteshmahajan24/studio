
'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInAnonymously, updateProfile } from 'firebase/auth';
import { useAuth } from '@/firebase';
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
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ClientOnly } from '@/components/layout/client-only';
import { getUserRole } from '@/lib/mock-data';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

// Map emails to UIDs for role-based redirect simulation
const emailToUidMap: { [email: string]: string } = {
  'student@nexus.com': 'student-user-id',
  'admin@nexus.com': 'admin-user-id',
  'faculty@nexus.com': 'faculty-user-id',
  'alumni@nexus.com': 'alumni-user-id',
  'employer@nexus.com': 'employer-user-id',
  'CreaterOfBlood@nexus.com': 'superadmin-user-id',
};

const roleEmails = Object.keys(emailToUidMap);

export default function LoginPage() {
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isGuestLoading, setIsGuestLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const getRedirectPath = (uid: string) => {
    const role = getUserRole(uid);
    const paths: { [key: string]: string } = {
      student: '/dashboard',
      admin: '/admin',
      faculty: '/faculty',
      alumni: '/alumni',
      employer: '/employer',
      superadmin: '/superadmin',
    };
    return paths[role] || '/dashboard';
  };

  const handleLoginSuccess = (userCredential: any) => {
    const user = userCredential.user;
    // Use the actual UID from Firebase for role mapping in the layout
    const redirectPath = getRedirectPath(user.uid);
    router.push(redirectPath);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      handleLoginSuccess(userCredential);
    } catch (error: any) {
      // If login fails because the user doesn't exist, and it's a special role email, create the user.
      if (error.code === 'auth/invalid-credential' && roleEmails.includes(values.email.toLowerCase())) {
        try {
          const newUserCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
          // Set display name based on role
          const role = getUserRole(emailToUidMap[values.email.toLowerCase()]);
          await updateProfile(newUserCredential.user, {
            displayName: `${role.charAt(0).toUpperCase() + role.slice(1)} User`,
          });
          toast({
            title: `Created ${role} account!`,
            description: 'This special account has been created for you.',
          });
          handleLoginSuccess(newUserCredential);
        } catch (createError: any) {
          console.error('Auto-signup Error:', createError);
          toast({
            variant: 'destructive',
            title: 'Setup Failed',
            description: createError.message || 'Could not create the special role account.',
          });
        }
      } else {
        console.error('Login Error:', error);
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: error.message || 'An unexpected error occurred. Please try again.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGuestLogin() {
    setIsGuestLoading(true);
    try {
        const userCredential = await signInAnonymously(auth);
        await updateProfile(userCredential.user, {
            displayName: "Guest User"
        });
        toast({
            title: 'Welcome, Guest!',
            description: 'You are now browsing as a guest.',
        });
        router.push('/dashboard');
    } catch (error: any) {
        console.error('Guest Login Error:', error);
        toast({
            variant: 'destructive',
            title: 'Guest Login Failed',
            description: error.message || 'Could not sign in as guest. Please try again.',
        });
    } finally {
        setIsGuestLoading(false);
    }
  }

  return (
    <ClientOnly>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Use a role-specific email to see different dashboards.
            <br />
            (e.g., admin@nexus.com, student@nexus.com, etc.)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading || isGuestLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Login
              </Button>
            </form>
          </Form>
          
          <div className="relative my-4">
            <Separator />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 bg-card text-sm text-muted-foreground">
              OR
            </div>
          </div>
          
          <Button variant="outline" className="w-full" onClick={handleGuestLogin} disabled={isLoading || isGuestLoading}>
              {isGuestLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Continue as Guest
          </Button>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </ClientOnly>
  );
}
