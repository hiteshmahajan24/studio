
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { PenSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockArticles } from '@/lib/mock-data';
import { ArticleCard } from '@/components/articles/article-card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

export default function AlumniArticlesPage() {
  const myArticles = mockArticles.filter(a => a.authorId.startsWith('mentor-')); // Simulate alumni articles

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Share Your Experience</h1>
          <p className="text-muted-foreground">Write articles to guide students and share your professional journey.</p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>
              <PenSquare className="mr-2" />
              Write a New Article
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Feature Not Implemented</AlertDialogTitle>
              <AlertDialogDescription>
                The article editor has not been implemented yet. This is a placeholder action.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Understood</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <Tabs defaultValue="my-articles">
        <TabsList>
          <TabsTrigger value="my-articles">My Articles</TabsTrigger>
          <TabsTrigger value="all-articles">Explore All Articles</TabsTrigger>
        </TabsList>
        <TabsContent value="my-articles" className="mt-6">
           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {myArticles.map(article => (
                    <ArticleCard key={article.id} article={article} />
                ))}
           </div>
           {myArticles.length === 0 && (
                <div className="text-center py-16">
                    <h3 className="text-lg font-semibold">You haven't written any articles yet.</h3>
                    <p className="text-sm text-muted-foreground">
                        Share your knowledge and start writing today.
                    </p>
                </div>
           )}
        </TabsContent>
        <TabsContent value="all-articles" className="mt-6">
           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mockArticles.slice(0,6).map(article => (
                    <ArticleCard key={article.id} article={article} />
                ))}
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
