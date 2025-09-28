
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Handshake, Newspaper, Users } from "lucide-react";
import Link from "next/link";

export default function AlumniPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Alumni Dashboard</h1>
        <p className="text-muted-foreground">Connect with peers, mentor students, and share your expertise.</p>
      </div>
       <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Provide Mentorship</CardTitle>
            <CardDescription>Guide students and recent graduates on their career path.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
                <Link href="/mentorship">
                    <Handshake className="mr-2"/> View Mentees
                </Link>
            </Button>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>Share Your Experience</CardTitle>
            <CardDescription>Write articles about your journey, skills, and industry insights.</CardDescription>
          </CardHeader>
          <CardContent>
             <Button className="w-full" asChild>
                <Link href="/articles">
                    <Newspaper className="mr-2"/> Write an Article
                </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Alumni Network</CardTitle>
            <CardDescription>Connect with fellow alumni and expand your professional network.</CardDescription>
          </CardHeader>
          <CardContent>
             <Button className="w-full" asChild>
                <Link href="/networking">
                    <Users className="mr-2"/> Go to Networking Hub
                </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
