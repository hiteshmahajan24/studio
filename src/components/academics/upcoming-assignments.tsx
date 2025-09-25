
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { upcomingAssignments } from "@/lib/mock-data";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

const priorityVariantMap: Record<string, 'destructive' | 'secondary' | 'outline'> = {
    'High': 'destructive',
    'Medium': 'secondary',
    'Low': 'outline',
};

export function UpcomingAssignments() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Upcoming Deadlines</CardTitle>
        <CardDescription>Assignments and exams that are due soon.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingAssignments
            .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
            .map(assignment => (
          <div key={assignment.id} className="flex items-start gap-4">
            <div className={cn("w-2 h-10 rounded-full mt-1", 
                assignment.priority === "High" && "bg-destructive",
                assignment.priority === "Medium" && "bg-amber-500",
                assignment.priority === "Low" && "bg-green-500",
            )} />
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <p className="font-semibold leading-tight">{assignment.title}</p>
                    <Badge variant={priorityVariantMap[assignment.priority]} className="capitalize text-xs shrink-0">
                        {assignment.priority}
                    </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{assignment.course}</p>
                <p className="text-xs text-muted-foreground mt-1">
                    Due {formatDistanceToNow(new Date(assignment.dueDate), { addSuffix: true })}
                </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
