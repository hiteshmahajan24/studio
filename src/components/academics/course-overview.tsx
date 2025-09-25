
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { academicCourses } from "@/lib/mock-data";

export function CourseOverview() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Current Courses</CardTitle>
        <CardDescription>Your progress in your ongoing courses for the semester.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {academicCourses.map(course => (
          <div key={course.id}>
            <div className="flex justify-between items-center mb-1.5">
              <p className="font-semibold">{course.name}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-primary">{course.grade}</span>
                <span className="text-sm text-muted-foreground">({course.letterGrade})</span>
              </div>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
