'use server';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type PersonalizedRecommendationsOutput
} from "@/ai/flows/personalized-recommendations";
import { Button } from "@/components/ui/button";
import { Briefcase, FileText, Handshake, Lightbulb, Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import React from "react";
import { cn } from "@/lib/utils";

type RecommendationsProps = {
  recommendationsPromise: Promise<PersonalizedRecommendationsOutput>;
  className?: string;
};

const recommendationDetails: { [key: string]: { name: string, description: string } } = {
  mentor123: { name: 'Dr. Evelyn Reed', description: 'AI Research Scientist' },
  job456: { name: 'Frontend Developer', description: 'Innovate Inc.' },
  article789: { name: 'The Future of Web Components', description: 'TechReads' },
  projectABC: { name: 'Open Source Community Platform', description: 'Contribute to a growing project.' },
  // Add more mock details as needed
};

const recommendationIcons: Record<string, React.ElementType> = {
  mentor: Handshake,
  job: Briefcase,
  article: FileText,
  project: Lightbulb,
};

export async function Recommendations({ recommendationsPromise, className }: RecommendationsProps) {
  const { recommendations } = await recommendationsPromise;

  const getDetails = (type: string, id: string) => {
    return recommendationDetails[id] || { name: `${type.charAt(0).toUpperCase() + type.slice(1)}: ${id}`, description: "Click to learn more" };
  };

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader>
        <CardTitle>For You</CardTitle>
        <CardDescription>AI-powered recommendations based on your profile and activity.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-1">
        {recommendations.slice(0, 3).map((rec) => ( // Limit to 3 for a cleaner look
          <div key={rec.itemId} className="flex items-center justify-between gap-4 p-2.5 rounded-lg transition-colors hover:bg-muted/50">
            <div className="flex items-center gap-4">
              <div className="bg-muted p-2 rounded-full">
                {React.createElement(recommendationIcons[rec.type] || Info, { className: "w-5 h-5 text-muted-foreground" })}
              </div>
              <div className="truncate">
                <p className="font-semibold text-sm truncate">{getDetails(rec.type, rec.itemId).name}</p>
                <p className="text-xs text-muted-foreground truncate">{getDetails(rec.type, rec.itemId).description}</p>
              </div>
            </div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm">Why?</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">Reasoning</h4>
                            <p className="text-sm text-muted-foreground">{rec.reason}</p>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
