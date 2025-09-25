
import { CourseOverview } from '@/components/academics/course-overview';
import { GpaCalculator } from '@/components/academics/gpa-calculator';
import { UpcomingAssignments } from '@/components/academics/upcoming-assignments';

export default function AcademicsPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold">Academics Dashboard</h1>
        <p className="text-muted-foreground">Track your courses, assignments, and GPA.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <CourseOverview />
        </div>
        <div className="lg:col-span-1">
            <UpcomingAssignments />
        </div>
      </div>
      
      <div>
        <GpaCalculator />
      </div>

    </div>
  );
}
