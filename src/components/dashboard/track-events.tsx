import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { registeredEvents } from "@/lib/mock-data";
import { Calendar, MapPin, Ticket } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export function TrackEvents() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Registered Events</CardTitle>
        <CardDescription>Keep track of your upcoming events and workshops.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {registeredEvents.length > 0 ? (
          registeredEvents.slice(0, 2).map((event) => (
            <div key={event.id} className="flex items-start gap-4 p-3 bg-muted/50 rounded-lg">
              <div className="bg-background p-2 rounded-lg mt-1">
                  <Ticket className="w-5 h-5 text-primary"/>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                    <p className="font-semibold">{event.title}</p>
                    <Badge variant={event.type === 'Webinar' ? 'secondary' : 'outline'} className="capitalize text-xs">
                        {event.type}
                    </Badge>
                </div>
                <div className="text-sm text-muted-foreground space-y-1 mt-1">
                    <p className="flex items-center gap-2"><Calendar className="w-4 h-4"/> {format(event.date, "MMMM d, yyyy")}</p>
                    <p className="flex items-center gap-2"><MapPin className="w-4 h-4"/> {event.location}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">No registered events.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
