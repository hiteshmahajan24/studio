
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { allEvents, CollegeEvent, PlatformEvent } from '@/lib/events-data';
import { EventCard } from '@/components/networking/event-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommunityCard } from '@/components/networking/community-card';
import { communities, allUsers } from '@/lib/mock-data';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserCard } from '@/components/networking/user-card';

const platformEvents = allEvents.filter(e => e.hostType === 'platform');

export default function AlumniNetworkingPage() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [roleFilter, setRoleFilter] = React.useState('all');
    const [industryFilter, setIndustryFilter] = React.useState('all');

    const roles = ['all', 'Student', 'Alumni', 'Faculty'];

    const industries = React.useMemo(() => {
        const allIndustries = allUsers.map((user) => user.industry);
        return ['all', ...Array.from(new Set(allIndustries))];
      }, []);

    const filteredUsers = allUsers.filter((user) => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
          (user.name.toLowerCase().includes(searchTermLower) ||
            user.title.toLowerCase().includes(searchTermLower) ||
            user.expertise.some(skill => skill.toLowerCase().includes(searchTermLower))) &&
          (roleFilter === 'all' || user.community === roleFilter) &&
          (industryFilter === 'all' || user.industry === industryFilter)
        );
      });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Alumni Network</h1>
        <p className="text-muted-foreground">Engage with events, communities, and people across the platform.</p>
      </div>
      <Tabs defaultValue="people" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="communities">Communities</TabsTrigger>
          <TabsTrigger value="people">People</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Collaborative Events</CardTitle>
              <CardDescription>Participate in challenges and workshops to share your expertise and connect with innovators.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {platformEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communities" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Explore Communities</CardTitle>
                    <CardDescription>Join groups of like-minded peers and professionals to learn, share, and grow together.</CardDescription>
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
              <CardDescription>Find and connect with students, faculty, and fellow alumni.</CardDescription>
              <div className="flex flex-col gap-4 pt-4 md:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, skill..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex flex-1 flex-wrap gap-4 sm:flex-nowrap md:flex-initial">
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((c) => (
                        <SelectItem key={c} value={c} className="capitalize">
                          {c === 'all' ? 'All Roles' : c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={industryFilter} onValueChange={setIndustryFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
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
