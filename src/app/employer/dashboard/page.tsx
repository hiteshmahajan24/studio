
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BarChart3, Briefcase, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function EmployerPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Employer Dashboard</h1>
        <p className="text-muted-foreground">Discover top talent, manage job postings, and view student leaderboards.</p>
      </div>
       <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Find Top Candidates</CardTitle>
            <CardDescription>Browse profiles of skilled students and alumni ready for new opportunities.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
                <Link href="/employer/candidates?role=employer">
                    <Users className="mr-2"/> Browse Candidates
                </Link>
            </Button>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>View Leaderboard</CardTitle>
            <CardDescription>See who is leading in skills, quests, and community engagement.</CardDescription>
          </CardHeader>
          <CardContent>
             <Button className="w-full" asChild>
                <Link href="/employer/leaderboard?role=employer">
                    <BarChart3 className="mr-2"/> View Leaderboard
                </Link>
            </Button>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>Manage Job Postings</CardTitle>
            <CardDescription>Post new jobs and track applicants for your current open roles.</CardDescription>
          </CardHeader>
          <CardContent>
             <Button className="w-full" asChild>
                <Link href="/employer/jobs?role=employer">
                    <Briefcase className="mr-2"/> Manage Jobs
                </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
