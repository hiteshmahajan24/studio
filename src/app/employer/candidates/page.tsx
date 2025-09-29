
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { allUsers } from '@/lib/mock-data';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserCard } from '@/components/networking/user-card';

export default function BrowseCandidatesPage() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [roleFilter, setRoleFilter] = React.useState('all');
    const [industryFilter, setIndustryFilter] = React.useState('all');

    const roles = ['all', 'Student', 'Alumni'];

    const industries = React.useMemo(() => {
        const allIndustries = allUsers
            .filter(user => user.community === 'Student' || user.community === 'Alumni')
            .map((user) => user.industry);
        return ['all', ...Array.from(new Set(allIndustries))];
      }, []);

    const filteredUsers = allUsers.filter((user) => {
        const isCandidate = user.community === 'Student' || user.community === 'Alumni';
        if (!isCandidate) return false;
        
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
        <h1 className="text-3xl font-bold">Browse Candidates</h1>
        <p className="text-muted-foreground">Find the best talent for your open roles.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Talent Directory</CardTitle>
          <CardDescription>Search and filter to discover promising students and experienced alumni.</CardDescription>
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
              <h3 className="text-lg font-semibold">No Candidates Found</h3>
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
