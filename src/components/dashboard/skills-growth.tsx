"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wand2, Edit } from "lucide-react"

const skillsData = [
  { subject: "React", A: 85, fullMark: 100 },
  { subject: "Node.js", A: 70, fullMark: 100 },
  { subject: "SQL", A: 75, fullMark: 100 },
  { subject: "Communication", A: 90, fullMark: 100 },
  { subject: "System Design", A: 60, fullMark: 100 },
  { subject: "Teamwork", A: 95, fullMark: 100 },
]

const currentTechStack = ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"]

const aiSuggestedStack = [
  { name: "Rust", reason: "High performance, a good complement to Node.js for backend services." },
  { name: "Kubernetes", reason: "Essential for modern DevOps and scaling applications." },
  { name: "AI/ML", reason: "Growing field with high demand, complements your data skills." },
]

export function SkillsGrowth() {
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
              {aiSuggestedStack.map((item) => (
                <div key={item.name} className="p-3 bg-muted/50 rounded-lg">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
           <h3 className="font-semibold mb-4 text-center">Skills Growth</h3>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsData}>
              <defs>
                <linearGradient id="skillGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(var(--foreground))" }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                name="Alex"
                dataKey="A"
                stroke="hsl(var(--primary))"
                fill="url(#skillGradient)"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
