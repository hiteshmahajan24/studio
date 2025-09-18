
import { Recommendations } from "@/components/dashboard/recommendations";
import { Gamification } from "@/components/dashboard/gamification";
import { Quests } from "@/components/dashboard/quests";
import { JobTracking } from "@/components/dashboard/job-tracking";
import { Mentorship } from "@/components/dashboard/mentorship";
import { UpcomingSessions } from "@/components/dashboard/upcoming-sessions";
import { Networking } from "@/components/dashboard/networking";
import { SkillsGrowth } from "@/components/dashboard/skills-growth";
import { WellnessNook } from "@/components/dashboard/wellness-nook";
import { TrackEvents } from "@/components/dashboard/track-events";

export default function DashboardPage() {
  return (
    <>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <Gamification className="lg:col-span-3" />
        <Recommendations className="lg:col-span-2" />
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        <SkillsGrowth />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <WellnessNook className="aspect-square" />
        <Quests className="aspect-square" />
      </div>

      <div className="grid grid-cols-1 gap-8">
        <JobTracking />
      </div>

      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-2">
        <div className="grid grid-cols-1 gap-8">
          <Mentorship />
          <Networking />
        </div>
        <div className="grid grid-cols-1 gap-8">
          <UpcomingSessions />
          <TrackEvents />
        </div>
      </div>
    </>
  );
}
