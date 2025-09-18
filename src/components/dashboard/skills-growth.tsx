import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wand2, Edit } from "lucide-react"
import { mockSuggestedSkills } from "@/lib/mock-data"
import { SkillsChart } from "./skills-chart"
import { cn } from "@/lib/utils"

const currentTechStack = ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"]

const skillsData = [
  { subject: "React", A: 85, fullMark: 100 },
  { subject: "Node.js", A: 70, fullMark: 100 },
  { subject: "SQL", A: 75, fullMark: 100 },
  { subject: "Communication", A: 90, fullMark: 100 },
  { subject: "System Design", A: 60, fullMark: 100 },
  { subject: "Teamwork", A: 95, fullMark: 100 },
]

export async function SkillsGrowth({ className }: { className?: string }) {
  const { suggestedSkills } = await Promise.resolve(mockSuggestedSkills);

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader>
        <CardTitle>Your Skills & Growth</CardTitle>
        <CardDescription>
          Visualize your progress and discover new skills to learn.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 justify-between">
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
            <div className="space-y-3">
              {suggestedSkills.slice(0, 2).map((item) => (
                <div key={item.name} className="p-3 bg-muted/50 rounded-lg">
                  <p className="font-semibold text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.reason}</p>
                </div>
              ))}
            </div>
          </div>
      </CardContent>
    </Card>
  )
}
