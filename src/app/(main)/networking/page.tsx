'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { allEvents, CollegeEvent, PlatformEvent } from '@/lib/events-data';
import { EventCard } from '@/components/networking/event-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { CommunityCard } from '@/components/networking/community-card';
import { communities } from '@/lib/mock-data';

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
        <TabsList className="h-auto justify-start gap-4 border-b border-border bg-transparent p-0">
          <TabsTrigger value="events" className="data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent bg-transparent px-0 pb-2 text-base font-semibold text-muted-foreground data-[state=active]:text-foreground">Events</TabsTrigger>
          <TabsTrigger value="communities" className="data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent bg-transparent px-0 pb-2 text-base font-semibold text-muted-foreground data-[state=active]:text-foreground">Communities</TabsTrigger>
          <TabsTrigger value="people" disabled className="px-0 pb-2">People</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="mt-6">
          <Tabs defaultValue="platform" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted/70">
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
        <TabsContent value="communities" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Explore Communities</CardTitle>
                    <CardDescription>Join groups of like-minded peers to learn, share, and grow together.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {communities.map((community) => (
                        <CommunityCard key={community.id} community={community} />
                    ))}
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
