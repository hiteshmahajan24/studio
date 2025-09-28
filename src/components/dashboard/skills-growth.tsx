
'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wand2, Edit, AlertTriangle } from "lucide-react"
import { skillPath, type SkillPathOutput } from "@/ai/flows/skill-path"
import { SkillsChartClient } from "./skills-chart-client"
import { cn } from "@/lib/utils"
import { Skeleton } from '../ui/skeleton';

const currentTechStack = ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"]

const skillsData = [
  { subject: "React", A: 85, fullMark: 100 },
  { subject: "Node.js", A: 70, fullMark: 100 },
  { subject: "SQL", A: 75, fullMark: 100 },
  { subject: "Communication", A: 90, fullMark: 100 },
  { subject: "System Design", A: 60, fullMark: 100 },
  { subject: "Teamwork", A: 95, fullMark: 100 },
]

export function SkillsGrowth({ className }: { className?: string }) {
  const [skillPathResult, setSkillPathResult] = React.useState<SkillPathOutput | null>(null);
  const [skillPathError, setSkillPathError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchSkills = async () => {
      setIsLoading(true);
      setSkillPathError(null);
      try {
        const result = await skillPath({
          currentSkills: currentTechStack,
          learningGoals: "Transition into a full-stack role with a focus on cloud-native technologies and AI integration.",
        });
        setSkillPathResult(result);
      } catch (error) {
        console.error("Failed to fetch skill path:", error);
        setSkillPathError("Could not load AI skill suggestions.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSkills();
  }, []);
  
  const suggestedSkills = skillPathResult?.suggestedSkills;

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader>
        <CardTitle>Your Skills & Growth</CardTitle>
        <CardDescription>
          Visualize your progress and discover new skills to learn.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid flex-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col justify-between">
            <div>
            <h3 className="font-semibold mb-4">Current Tech Stack</h3>
            <div className="flex flex-wrap gap-2 mb-4">
                {currentTechStack.map((tech) => (
                <Badge key={tech} variant="secondary">
                    {tech}
                </Badge>
                ))}
            </div>
            <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit Stack
            </Button>
            </div>

            <div className="mt-8">
                <h3 className="font-semibold flex items-center gap-2 mb-4">
                <Wand2 className="text-primary" />
                AI-Suggested Future Stack
                </h3>
                {isLoading ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="p-3 bg-muted/50 rounded-lg space-y-2">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-3 w-full" />
                      </div>
                    ))}
                  </div>
                ) : skillPathError ? (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5" />
                    <div>
                      <p className="font-semibold">Error</p>
                      <p>{skillPathError}</p>
                    </div>
                  </div>
                ) : suggestedSkills ? (
                  <div className="space-y-3">
                    {suggestedSkills.slice(0, 3).map((item) => (
                        <div key={item.name} className="p-3 bg-muted/50 rounded-lg">
                        <p className="font-semibold text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.reason}</p>
                        </div>
                    ))}
                  </div>
                ) : null}
            </div>
        </div>

        <div className="h-full min-h-[300px]">
          <SkillsChartClient skillsData={skillsData} />
        </div>
      </CardContent>
    </Card>
  )
}
