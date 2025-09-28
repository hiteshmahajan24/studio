
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FileText, Handshake } from "lucide-react";
import Link from "next/link";

export default function FacultyPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Faculty Dashboard</h1>
        <p className="text-muted-foreground">Monitor student progress, manage assignments, and provide mentorship.</p>
      </div>

       <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>View Students</CardTitle>
            <CardDescription>See academic and platform progress for your students.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
                <Link href="/student/academics">
                    <Users className="mr-2"/> Student Progress
                </Link>
            </Button>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>Create Assignments</CardTitle>
            <CardDescription>Add and manage assignments for your courses.</CardDescription>
          </CardHeader>
          <CardContent>
             <Button className="w-full" asChild>
                <Link href="/student/academics">
                    <FileText className="mr-2"/> Manage Assignments
                </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Provide Mentorship</CardTitle>
            <CardDescription>Offer guidance and accept mentorship requests.</CardDescription>
          </CardHeader>
          <CardContent>
             <Button className="w-full" asChild>
                <Link href="/student/mentorship">
                    <Handshake className="mr-2"/> View Requests
                </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
