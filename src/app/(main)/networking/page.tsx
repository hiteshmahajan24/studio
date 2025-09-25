'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { allEvents, CollegeEvent, PlatformEvent } from '@/lib/events-data';
import { EventCard } from '@/components/networking/event-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { CommunityCard } from '@/components/networking/community-card';
import { communities, allUsers } from '@/lib/mock-data';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserCard } from '@/components/networking/user-card';
import { cn } from '@/lib/utils';

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
  
  const [searchTerm, setSearchTerm] = React.useState('');
  const [communityFilter, setCommunityFilter] = React.useState('all');
  const [industryFilter, setIndustryFilter] = React.useState('all');

  const [platformEvents, setPlatformEvents] = React.useState<(PlatformEvent | CollegeEvent)[]>([]);
  const [collegeEvents, setCollegeEvents] = React.useState<(PlatformEvent | CollegeEvent)[]>([]);

  React.useEffect(() => {
    setPlatformEvents(allEvents.filter(e => e.hostType === 'platform'));
    setCollegeEvents(allEvents.filter(e => e.hostType === 'college'));
  }, []);

  const industries = React.useMemo(() => {
    const allIndustries = allUsers.map((user) => user.industry);
    return ['all', ...Array.from(new Set(allIndustries))];
  }, []);

  const communitiesList = React.useMemo(() => {
    const allCommunities = allUsers.map((user) => user.community);
    return ['all', ...Array.from(new Set(allCommunities))];
  }, []);

  const filteredUsers = allUsers.filter((user) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      (user.name.toLowerCase().includes(searchTermLower) ||
        user.title.toLowerCase().includes(searchTermLower) ||
        user.expertise.some(skill => skill.toLowerCase().includes(searchTermLower))) &&
      (communityFilter === 'all' || user.community === communityFilter) &&
      (industryFilter === 'all' || user.industry === industryFilter)
    );
  });

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
          <TabsTrigger value="communities">Communities</TabsTrigger>
          <TabsTrigger value="people">People</TabsTrigger>
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
        <TabsContent value="people" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>People Directory</CardTitle>
              <CardDescription>Find and connect with students, faculty, and alumni.</CardDescription>
              <div className="flex flex-col gap-4 md:flex-row pt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, skill..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex flex-1 gap-4 md:flex-initial flex-wrap">
                  <Select value={communityFilter} onValueChange={setCommunityFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Filter by community" />
                    </SelectTrigger>
                    <SelectContent>
                      {communitiesList.map((c) => (
                        <SelectItem key={c} value={c} className="capitalize">
                          {c === 'all' ? 'All Communities' : c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={industryFilter} onValueChange={setIndustryFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Filter by industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry} className="capitalize">
                          {industry === 'all' ? 'All Industries' : industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredUsers.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredUsers.map((user) => (
                    <UserCard key={user.id} user={user} />
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center">
                  <h3 className="text-lg font-semibold">No People Found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
