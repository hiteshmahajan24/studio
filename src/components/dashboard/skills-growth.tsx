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
import { skillPath } from "@/ai/flows/skill-path"
import { SkillsChart } from "./skills-chart"

const currentTechStack = ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"]

const skillsData = [
  { subject: "React", A: 85, fullMark: 100 },
  { subject: "Node.js", A: 70, fullMark: 100 },
  { subject: "SQL", A: 75, fullMark: 100 },
  { subject: "Communication", A: 90, fullMark: 100 },
  { subject: "System Design", A: 60, fullMark: 100 },
  { subject: "Teamwork", A: 95, fullMark: 100 },
]

export async function SkillsGrowth() {
  const { suggestedSkills } = await skillPath({
    currentSkills: currentTechStack,
    learningGoals: 'Become a senior full-stack developer with expertise in scalable systems and AI integration.'
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Skills & Growth</CardTitle>
        <CardDescription>
          Visualize your progress and discover new skills to learn.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
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

          <div className="mt-8">
            <h3 className="font-semibold flex items-center gap-2 mb-4">
              <Wand2 className="text-primary" />
              AI-Suggested Future Stack
            </h3>
            <div className="space-y-3">
              {suggestedSkills.map((item) => (
                <div key={item.name} className="p-3 bg-muted/50 rounded-lg">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
           <h3 className="font-semibold mb-4 text-center">Skills Snapshot</h3>
           <SkillsChart skillsData={skillsData} />
        </div>
      </CardContent>
    </Card>
  )
}
