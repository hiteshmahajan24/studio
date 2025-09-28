
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function EmployerPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Employer Dashboard</h1>
        <p className="text-muted-foreground">Discover top talent and view student leaderboards.</p>
      </div>
       <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Find Top Candidates</CardTitle>
            <CardDescription>Browse profiles of skilled students and alumni ready for new opportunities.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
                <Link href="/networking?tab=people">
                    <Users className="mr-2"/> Browse Candidates
                </Link>
            </Button>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>View Leaderboard</CardTitle>
            <CardDescription>See who is leading the pack in skills, quests, and community engagement.</CardDescription>
          </CardHeader>
          <CardContent>
             <Button className="w-full" asChild>
                <Link href="/networking?tab=people">
                    <BarChart3 className="mr-2"/> View Leaderboard
                </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
