'use client';

import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Building, GraduationCap, Mail, MessageSquare, Search, UserPlus } from 'lucide-react';
import { allUsers } from '@/lib/mock-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

type User = typeof allUsers[0];

function UserProfileCard({ user }: { user: User }) {
  const avatar = PlaceHolderImages.find((img) => img.id === user.avatarId);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            {avatar && <AvatarImage src={avatar.imageUrl} alt={user.name} data-ai-hint={avatar.imageHint} />}
            <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <CardDescription>{user.title}</CardDescription>
              </div>
              <Badge variant={user.community === 'Alumni' ? 'secondary' : (user.community === 'Faculty' ? 'outline' : 'default')} className="capitalize">
                {user.community}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
           <p className="text-sm text-muted-foreground line-clamp-2 h-[40px]">{user.bio}</p>
           <div className="flex gap-2">
            <Button className="w-full" onClick={() => setIsProfileOpen(true)}>View Profile</Button>
            <Button variant="outline" className="shrink-0 px-3">
              <UserPlus className="w-4 h-4" />
            </Button>
           </div>
        </CardContent>
      </Card>
      <UserProfileSheet open={isProfileOpen} onOpenChange={setIsProfileOpen} user={user} />
    </>
  );
}

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

function UserProfileSheet({ open, onOpenChange, user }: { open: boolean, onOpenChange: (open: boolean) => void, user: User }) {
    const avatar = PlaceHolderImages.find((img) => img.id === user.avatarId);
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-xl lg:max-w-2xl overflow-y-auto">
            <SheetHeader className="text-left mb-6">
                <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24">
                        {avatar && <AvatarImage src={avatar.imageUrl} alt={user.name} data-ai-hint={avatar.imageHint} />}
                        <AvatarFallback className="text-4xl">{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <SheetTitle className="text-3xl font-bold">{user.name}</SheetTitle>
                        <SheetDescription className="text-lg">{user.title}</SheetDescription>
                        <div className="flex gap-2 mt-4">
                            <Button><Mail className="mr-2"/> Contact</Button>
                            <Button variant="outline"><MessageSquare className="mr-2"/> Message</Button>
                        </div>
                    </div>
                </div>
            </SheetHeader>
            
            <div className="space-y-8">
                <div>
                    <h3 className="text-lg font-semibold mb-2">About</h3>
                    <p className="text-sm text-muted-foreground">{user.bio}</p>
                </div>
                <Separator />
                <div>
                    <h3 className="text-lg font-semibold mb-4">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {user.expertise.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                    </div>
                </div>
                <Separator />
                 <div>
                    <h3 className="text-lg font-semibold mb-4">Experience</h3>
                    <div className="space-y-6">
                        {user.experience.map((exp, index) => (
                            <div key={index} className="flex gap-4">
                                <div className="p-3 bg-muted rounded-full h-fit">
                                    <Briefcase className="w-5 h-5 text-muted-foreground"/>
                                </div>
                                <div>
                                    <p className="font-semibold">{exp.role}</p>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span>{exp.company}</span>
                                        <span className="font-bold">&middot;</span>
                                        <span>{exp.period}</span>
                                    </div>
                                    <p className="text-sm mt-2">{exp.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Separator />
                <div>
                    <h3 className="text-lg font-semibold mb-4">Education</h3>
                    <div className="flex gap-4">
                        <div className="p-3 bg-muted rounded-full h-fit">
                            <GraduationCap className="w-5 h-5 text-muted-foreground"/>
                        </div>
                        <div>
                            <p className="font-semibold">{user.education.degree}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>{user.education.university}</span>
                                <span className="font-bold">&middot;</span>
                                <span>{user.education.year}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SheetContent>
        </Sheet>
    )
}


export default function NetworkingPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [industryFilter, setIndustryFilter] = React.useState('all');
  const [communityFilter, setCommunityFilter] = React.useState('all');

  const industries = React.useMemo(() => {
    const allIndustries = allUsers.map((user) => user.industry);
    return ['all', ...Array.from(new Set(allIndustries))];
  }, []);

  const communities = React.useMemo(() => {
    const allCommunities = allUsers.map((user) => user.community);
    return ['all', ...Array.from(new Set(allCommunities))];
  }, []);

  const filteredUsers = allUsers.filter((user) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      (user.name.toLowerCase().includes(searchTermLower) ||
        user.title.toLowerCase().includes(searchTermLower) ||
        user.expertise.some(skill => skill.toLowerCase().includes(searchTermLower))) &&
      (industryFilter === 'all' || user.industry === industryFilter) &&
      (communityFilter === 'all' || user.community === communityFilter)
    );
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Networking Hub</h1>
        <p className="text-muted-foreground">
          Connect with peers, alumni, and faculty across the institution.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, title, skill..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-1 gap-4 md:flex-initial flex-wrap">
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
               <Select value={communityFilter} onValueChange={setCommunityFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by community" />
                </SelectTrigger>
                <SelectContent>
                  {communities.map((community) => (
                    <SelectItem key={community} value={community} className="capitalize">
                      {community === 'all' ? 'All Communities' : community}
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
                <UserProfileCard key={user.id} user={user} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <h3 className="text-lg font-semibold">No Connections Found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
