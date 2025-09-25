
'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown, Handshake, Search, Star } from 'lucide-react';
import { allMentors } from '@/lib/mock-data';
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
import { RequestSessionDialog } from '@/components/mentorship/request-session-dialog';

function MentorCard({ mentor, featured = false }: { mentor: typeof allMentors[0]; featured?: boolean }) {
  const avatar = PlaceHolderImages.find((img) => img.id === mentor.avatarId);
  return (
    <Card className={featured ? 'border-primary border-2' : ''}>
      <CardHeader className="flex flex-row items-start gap-4">
        <Avatar className="h-16 w-16">
          {avatar && <AvatarImage src={avatar.imageUrl} alt={mentor.name} data-ai-hint={avatar.imageHint} />}
          <AvatarFallback>{mentor.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">{mentor.name}</CardTitle>
            {featured && <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20"><Star className="mr-1.5" /> Featured</Badge>}
          </div>
          <CardDescription>{mentor.title}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {mentor.expertise.map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">{mentor.bio}</p>
        <RequestSessionDialog mentor={mentor}>
            <Button className="w-full">
                <Handshake className="mr-2" /> Request a Session
            </Button>
        </RequestSessionDialog>
      </CardContent>
    </Card>
  );
}

export default function MentorshipPage() {
  const searchParams = useSearchParams();
  const queryFromWellnessNook = searchParams.get('q');

  const [searchTerm, setSearchTerm] = React.useState(queryFromWellnessNook || '');
  const [expertiseFilter, setExpertiseFilter] = React.useState('all');
  const [industryFilter, setIndustryFilter] = React.useState('all');
  const [communityFilter, setCommunityFilter] = React.useState('all');

  const expertiseAreas = React.useMemo(() => {
    const allExpertise = allMentors.flatMap((mentor) => mentor.expertise);
    return ['all', ...Array.from(new Set(allExpertise))];
  }, []);

  const industries = React.useMemo(() => {
    const allIndustries = allMentors.map((mentor) => mentor.industry);
    return ['all', ...Array.from(new Set(allIndustries))];
  }, []);

  const communities = React.useMemo(() => {
    const allCommunities = allMentors.map((mentor) => mentor.community);
    return ['all', ...Array.from(new Set(allCommunities))];
  }, []);
  
  const featuredMentor = allMentors.find(m => m.id === 'mentor-2');
  
  const filteredMentors = allMentors.filter((mentor) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      mentor.id !== featuredMentor?.id &&
      (mentor.name.toLowerCase().includes(searchTermLower) ||
        mentor.title.toLowerCase().includes(searchTermLower) ||
        mentor.expertise.some(skill => skill.toLowerCase().includes(searchTermLower)) ||
        mentor.bio.toLowerCase().includes(searchTermLower)
      ) &&
      (expertiseFilter === 'all' || mentor.expertise.includes(expertiseFilter)) &&
      (industryFilter === 'all' || mentor.industry === industryFilter) &&
      (communityFilter === 'all' || mentor.community === communityFilter)
    );
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Find a Mentor</h1>
        <p className="text-muted-foreground">
          Connect with experienced professionals for guidance and support.
        </p>
      </div>

      {featuredMentor && (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2"><Crown className="text-amber-400"/> Mentor of the Week</h2>
            <MentorCard mentor={featuredMentor} featured />
        </div>
      )}

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, title, expertise..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-1 gap-4 md:flex-initial flex-wrap">
              <Select value={expertiseFilter} onValueChange={setExpertiseFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by expertise" />
                </SelectTrigger>
                <SelectContent>
                  {expertiseAreas.map((area) => (
                    <SelectItem key={area} value={area} className="capitalize">
                      {area === 'all' ? 'All Expertise' : area}
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
          {filteredMentors.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredMentors.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <h3 className="text-lg font-semibold">No Mentors Found</h3>
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
