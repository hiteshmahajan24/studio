import { SidebarNav } from "@/components/layout/sidebar-nav";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { user } from "@/lib/mock-data";
import { Recommendations } from "@/components/dashboard/recommendations";
import {
  getPersonalizedRecommendations,
  PersonalizedRecommendationsInput,
} from "@/ai/flows/personalized-recommendations";
import { generateAIQuest, AIQuestInput } from "@/ai/flows/ai-quest-generator";
import { Gamification } from "@/components/dashboard/gamification";
import { Quests } from "@/components/dashboard/quests";
import { JobTracking } from "@/components/dashboard/job-tracking";
import { Mentorship } from "@/components/dashboard/mentorship";
import { UpcomingSessions } from "@/components/dashboard/upcoming-sessions";
import { Suspense } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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
  const studentProfile: PersonalizedRecommendationsInput = {
    studentProfile: "A 3rd-year computer science student interested in web development, machine learning, and entrepreneurship. Actively contributes to open-source projects on GitHub.",
    studentActivity: "Viewed 5 articles on React, applied for 2 front-end developer jobs, and followed 3 mentors with expertise in AI.",
  };

  const questInput: AIQuestInput = {
    studentProfile: studentProfile.studentProfile,
    platformFeatures: ["articles", "projects", "jobs", "mentorship", "groups", "events"],
  };

  const recommendationsPromise = getPersonalizedRecommendations(studentProfile);
  const questPromise = generateAIQuest(questInput);

  return (
    <div className="flex min-h-screen w-full">
      <SidebarNav />
      <div className="flex flex-1 flex-col sm:pl-16">
        <DashboardHeader studentName={user.name} />
        <main className="flex-1 space-y-8 p-4 md:p-6 lg:p-8">
          
          <Gamification />
          
          <Suspense fallback={<LoadingSkeleton />}>
            <Recommendations recommendationsPromise={recommendationsPromise} />
          </Suspense>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3 space-y-8">
              <Suspense fallback={<LoadingSkeleton />}>
                <Mentorship />
              </Suspense>
              <Suspense fallback={<LoadingSkeleton />}>
                <JobTracking />
              </Suspense>
            </div>
            <div className="lg:col-span-2 space-y-8">
              <Suspense fallback={<LoadingSkeleton />}>
                <Quests questPromise={questPromise} />
              </Suspense>
              <Suspense fallback={<LoadingSkeleton />}>
                <UpcomingSessions />
              </Suspense>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
