
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { allUsers, UserProfile } from '@/lib/mock-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Crown, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserProfileDialog } from '@/components/networking/user-profile-dialog';

const leaderboardData = allUsers
  .filter(u => u.community === 'Student')
  .sort((a, b) => a.leaderboardRank - b.leaderboardRank)
  .slice(0, 10);

const getRankChange = (rank: number) => {
    if (rank <= 3) return <ArrowUp className="text-green-500" />;
    if (rank > 7) return <ArrowDown className="text-red-500" />;
    return null;
}

const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-amber-400';
    if (rank === 2) return 'text-slate-400';
    if (rank === 3) return 'text-amber-700';
    return 'text-muted-foreground';
}

export default function LeaderboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Talent Leaderboard</h1>
        <p className="text-muted-foreground">Discover the most active and engaged students on the platform.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Top 10 Students</CardTitle>
          <CardDescription>Based on quest completions, community engagement, and mentorship activities.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Major</TableHead>
                <TableHead>Points</TableHead>
                <TableHead className="text-right">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((user, index) => {
                const avatar = PlaceHolderImages.find(img => img.id === user.avatarId);
                const rank = index + 1;
                return (
                    <UserProfileDialog key={user.id} user={user}>
                        <TableRow className="cursor-pointer">
                            <TableCell>
                                <div className={cn("text-lg font-bold flex items-center gap-2", getRankColor(rank))}>
                                    {rank <= 3 && <Crown className="w-5 h-5" />}
                                    {rank}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-4">
                                <Avatar>
                                    {avatar && <AvatarImage src={avatar.imageUrl} alt={user.name} />}
                                    <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{user.name}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{user.education.degree}</TableCell>
                            <TableCell className="font-semibold">{(10000 - (rank * 450) + Math.floor(Math.random() * 200)).toLocaleString()}</TableCell>
                            <TableCell className="flex justify-end">{getRankChange(rank)}</TableCell>
                        </TableRow>
                    </UserProfileDialog>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
