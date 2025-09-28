
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { allQuests, user } from '@/lib/mock-data';
import { QuestCard } from '@/components/quests/quest-card';

export default function QuestsPage() {
    const activeQuests = allQuests.filter(q => q.status === 'active');
    const completedQuests = allQuests.filter(q => q.status === 'completed');
    const specialQuests = allQuests.filter(q => q.category === 'Special Event');

  return (
    <div className="space-y-8">
       <Card className="bg-primary/10 border-primary/20">
        <CardHeader className='flex-row items-center justify-between'>
            <div>
                <CardTitle className="text-3xl font-bold">Quest Center</CardTitle>
                <CardDescription>Complete quests to earn points, unlock badges, and grow your skills.</CardDescription>
            </div>
            <div className='text-right'>
                <p className='text-sm text-muted-foreground'>Total Quest Points</p>
                <p className='text-4xl font-bold text-primary'>{user.questPoints.toLocaleString()}</p>
            </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="active">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Quests</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="special">Special Events</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeQuests.map(quest => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="completed" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {completedQuests.map(quest => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="special" className="mt-6">
           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {specialQuests.map(quest => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
