
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";

const gradePoints: Record<string, number> = {
  'O': 10.0,
  'A+': 9.0,
  'A': 8.0,
  'B+': 7.0,
  'B': 6.0,
  'C': 5.0,
  'P': 4.0,
  'F': 0.0,
};

type Course = {
  id: number;
  name: string;
  credits: number;
  grade: string;
};

export function GpaCalculator() {
  const [courses, setCourses] = React.useState<Course[]>([
    { id: 1, name: 'Advanced Algorithms', credits: 3, grade: 'A+' },
    { id: 2, name: 'Operating Systems', credits: 3, grade: 'A' },
    { id: 3, name: 'Linear Algebra', credits: 3, grade: 'O' },
  ]);
  const [gpa, setGpa] = React.useState(0);

  const calculateGpa = React.useCallback(() => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      if (course.credits > 0 && course.grade in gradePoints) {
        totalPoints += gradePoints[course.grade] * course.credits;
        totalCredits += course.credits;
      }
    });

    setGpa(totalCredits > 0 ? totalPoints / totalCredits : 0);
  }, [courses]);

  React.useEffect(() => {
    calculateGpa();
  }, [calculateGpa]);

  const handleCourseChange = (id: number, field: keyof Omit<Course, 'id'>, value: string | number) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, [field]: value } : course
    ));
  };
  
  const addCourse = () => {
    const newId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
    setCourses([...courses, { id: newId, name: `Course ${courses.length + 1}`, credits: 3, grade: 'O' }]);
  };

  const removeCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle>GPA Calculator</CardTitle>
          <CardDescription>Estimate your semester or cumulative GPA.</CardDescription>
        </div>
        <div className="text-right">
            <p className="text-sm text-muted-foreground">Calculated GPA</p>
            <p className="text-4xl font-bold text-primary">{gpa.toFixed(2)}</p>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%]">Course Name</TableHead>
              <TableHead>Credits</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map(course => (
              <TableRow key={course.id}>
                <TableCell>
                  <Input 
                    value={course.name} 
                    onChange={(e) => handleCourseChange(course.id, 'name', e.target.value)}
                    placeholder="e.g., Intro to CS"
                  />
                </TableCell>
                <TableCell>
                  <Input 
                    type="number" 
                    value={course.credits} 
                    onChange={(e) => handleCourseChange(course.id, 'credits', parseInt(e.target.value) || 0)}
                    min="0"
                    max="6"
                  />
                </TableCell>
                <TableCell>
                   <Select value={course.grade} onValueChange={(value) => handleCourseChange(course.id, 'grade', value)}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.keys(gradePoints).map(grade => (
                                <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </TableCell>
                 <TableCell className="text-right">
                   <Button variant="ghost" size="icon" onClick={() => removeCourse(course.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                   </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button variant="outline" className="mt-4 w-full" onClick={addCourse}>
          <PlusCircle className="mr-2" /> Add Course
        </Button>
      </CardContent>
    </Card>
  );
}
