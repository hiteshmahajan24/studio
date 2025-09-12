import { SidebarNav } from "@/components/layout/sidebar-nav";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { user, mockRecommendations, mockAIQuest } from "@/lib/mock-data";
import { Recommendations } from "@/components/dashboard/recommendations";
import { Gamification } from "@/components/dashboard/gamification";
import { Quests } from "@/components/dashboard/quests";
import { JobTracking } from "@/components/dashboard/job-tracking";
import { Mentorship } from "@/components/dashboard/mentorship";
import { UpcomingSessions } from "@/components/dashboard/upcoming-sessions";
import { Suspense } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Networking } from "@/components/dashboard/networking";
import { SkillsGrowth } from "@/components/dashboard/skills-growth";
import { WellnessNook } from "@/components/dashboard/wellness-nook";

function LoadingSkeleton({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <Skeleton className="h-6 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
    </Card>
  );
}

export default async function Home() {
  const recommendationsPromise = Promise.resolve(mockRecommendations);
  const questPromise = Promise.resolve(mockAIQuest);

  return (
    <div className="flex min-h-screen w-full">
      <SidebarNav />
      <div className="flex flex-1 flex-col sm:pl-16">
        <DashboardHeader studentName={user.name} />
        <main className="flex-1 space-y-8 p-4 md:p-6 lg:p-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Suspense fallback={<LoadingSkeleton className="lg:col-span-4" />}>
              <Gamification className="md:col-span-2 lg:col-span-4" />
            </Suspense>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
             <Suspense fallback={<LoadingSkeleton className="lg:col-span-2"/>}>
              <Recommendations recommendationsPromise={recommendationsPromise} />
            </Suspense>
            <div className="space-y-8">
              <Suspense fallback={<LoadingSkeleton />}>
                <Quests questPromise={questPromise} />
              </Suspense>
               <Suspense fallback={<LoadingSkeleton />}>
                <WellnessNook />
              </Suspense>
            </div>
          </div>
          
          <Suspense fallback={<LoadingSkeleton className="lg:col-span-4"/>}>
            <SkillsGrowth />
          </Suspense>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Suspense fallback={<LoadingSkeleton />}>
                <Mentorship />
              </Suspense>
              <Suspense fallback={<LoadingSkeleton />}>
                <UpcomingSessions />
              </Suspense>
               <Suspense fallback={<LoadingSkeleton />}>
                <Networking />
              </Suspense>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
              <Suspense fallback={<LoadingSkeleton />}>
                <JobTracking />
              </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}
