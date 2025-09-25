'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { allEvents, CollegeEvent, PlatformEvent } from '@/lib/events-data';
import { EventCard } from '@/components/networking/event-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';

type EventCategory = 'All' | 'Competition' | 'Hackathon' | 'Workshop';

function EventList({ events, category }: { events: (PlatformEvent | CollegeEvent)[], category: EventCategory }) {
  const filteredEvents = category === 'All' 
    ? events 
    : events.filter(event => event.category === category);

  if (filteredEvents.length === 0) {
    return (
      <div className="py-16 text-center">
        <h3 className="text-lg font-semibold">No Events Found</h3>
        <p className="text-sm text-muted-foreground">
          There are currently no events in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredEvents.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default function NetworkingPage() {
  const [platformCategory, setPlatformCategory] = React.useState<EventCategory>('All');
  const [collegeCategory, setCollegeCategory] = React.useState<EventCategory>('All');

  const platformEvents = allEvents.filter(e => e.hostType === 'platform');
  const collegeEvents = allEvents.filter(e => e.hostType === 'college');
  
  const categories: EventCategory[] = ['All', 'Competition', 'Hackathon', 'Workshop'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Networking Hub</h1>
        <p className="text-muted-foreground">
          Engage with events, communities, and people across the institution.
        </p>
      </div>

      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="communities" disabled>Communities</TabsTrigger>
          <TabsTrigger value="people" disabled>People</TabsTrigger>
        </TabsList>
        <TabsContent value="events" className="mt-6">
          <Tabs defaultValue="platform" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="platform">Platform Events</TabsTrigger>
              <TabsTrigger value="college">College Events</TabsTrigger>
            </TabsList>
            <TabsContent value="platform" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform-Hosted Events</CardTitle>
                  <CardDescription>Participate in challenges and workshops hosted by NexusConnect to earn exclusive rewards.</CardDescription>
                   <div className="flex items-center gap-2 pt-2">
                    {categories.map(cat => (
                      <Button 
                        key={cat} 
                        variant={platformCategory === cat ? 'default' : 'outline'}
                        onClick={() => setPlatformCategory(cat)}
                      >
                        {cat}
                      </Button>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <EventList events={platformEvents} category={platformCategory} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="college" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>College-Hosted Events</CardTitle>
                  <CardDescription>Compete in official university events for prize money and recognition.</CardDescription>
                  <div className="flex items-center gap-2 pt-2">
                    {categories.map(cat => (
                      <Button 
                        key={cat} 
                        variant={collegeCategory === cat ? 'default' : 'outline'}
                        onClick={() => setCollegeCategory(cat)}
                      >
                        {cat}
                      </Button>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <EventList events={collegeEvents} category={collegeCategory} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}
