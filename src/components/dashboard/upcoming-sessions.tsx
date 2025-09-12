import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { upcomingSessions } from "@/lib/mock-data";
import { Calendar, Clock, User } from "lucide-react";
import { format } from "date-fns";

export function UpcomingSessions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Sessions</CardTitle>
        <CardDescription>Your scheduled mentorship and networking sessions.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingSessions.length > 0 ? (
          upcomingSessions.map((session) => (
            <div key={session.id} className="p-3 bg-muted/50 rounded-lg">
              <p className="font-semibold">{session.title}</p>
              <div className="text-sm text-muted-foreground space-y-1 mt-2">
                  <p className="flex items-center gap-2"><User className="w-4 h-4"/> {session.mentor}</p>
                  <p className="flex items-center gap-2"><Calendar className="w-4 h-4"/> {format(session.date, "MMMM d, yyyy 'at' p")}</p>
                  <p className="flex items-center gap-2"><Clock className="w-4 h-4"/> {session.duration} minutes</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">No upcoming sessions.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
