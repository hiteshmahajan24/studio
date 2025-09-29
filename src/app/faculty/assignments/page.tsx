
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { academicCourses } from "@/lib/mock-data";
import { Calendar as CalendarIcon, Loader2, Send } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

export default function CreateAssignmentPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const form = event.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        if (!data.course || !data.title || !data.description || !date) {
            toast({
                variant: "destructive",
                title: "Incomplete Form",
                description: "Please fill out all fields before creating.",
            });
            setIsLoading(false);
            return;
        }

        console.log("Creating assignment:", { ...data, dueDate: date });
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast({
            title: "Assignment Created!",
            description: `The assignment "${data.title}" has been created for ${data.course}.`
        });

        setIsLoading(false);
        form.reset();
        setDate(undefined);
    };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Create Assignment</h1>
        <p className="text-muted-foreground">Post a new assignment for one of your courses.</p>
      </div>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Assignment Details</CardTitle>
          <CardDescription>Fill out the form to create a new assignment.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Select name="course" required>
                <SelectTrigger id="course">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {academicCourses.map(course => (
                    <SelectItem key={course.id} value={course.name}>{course.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Assignment Title</Label>
              <Input id="title" name="title" placeholder="e.g., Problem Set 5" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Provide instructions and details for the assignment..." rows={6} required />
            </div>
             <div className="space-y-2">
                <Label htmlFor="due-date">Due Date</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                        >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Send className="mr-2" />
                Create Assignment
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
