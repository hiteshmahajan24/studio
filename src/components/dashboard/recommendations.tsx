
'use server';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getPersonalizedRecommendations } from "@/ai/flows/personalized-recommendations";
import { user } from "@/lib/mock-data";
import { RecommendationsClient } from "./recommendations-client";

type RecommendationsProps = {
  className?: string;
};

export async function Recommendations({ className }: RecommendationsProps) {
  
  const studentProfile = `Name: ${user.name}, Skills: ${user.profile.skills.join(', ')}, Experience: ${user.profile.experience}`;
  const studentActivity = "Viewed articles on web development, applied for a frontend role, contacted a mentor in the software industry.";

  let initialRecommendations;
  let initialError;

  try {
    initialRecommendations = await getPersonalizedRecommendations({ studentProfile, studentActivity });
  } catch (e) {
    console.error(e);
    initialError = "Failed to load initial recommendations.";
    initialRecommendations = { recommendations: [] };
  }


  return (
    <Card className={cn("flex flex-col", className)}>
      <RecommendationsClient 
        initialRecommendations={initialRecommendations.recommendations} 
        initialError={initialError}
        studentProfile={studentProfile}
        studentActivity={studentActivity}
      />
    </Card>
  );
}
