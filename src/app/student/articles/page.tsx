
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { PenSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockArticles } from '@/lib/mock-data';
import { ArticleCard } from '@/components/articles/article-card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

export default function ArticlesPage() {
  const featuredArticles = [...mockArticles].slice(0, 6);
  const trendingArticles = [...mockArticles].sort((a, b) => b.likes - a.likes).slice(0, 6);
  const myArticles = mockArticles.filter(a => a.authorId === 'user-1');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Knowledge Hub</h1>
          <p className="text-muted-foreground">Read, write, and share knowledge with the community.</p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>
              <PenSquare className="mr-2" />
              Write an Article
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

      <Tabs defaultValue="featured">
        <TabsList>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
          <TabsTrigger value="my-articles">My Articles</TabsTrigger>
        </TabsList>
        <TabsContent value="featured" className="mt-6">
           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredArticles.map(article => (
                    <ArticleCard key={article.id} article={article} />
                ))}
           </div>
        </TabsContent>
         <TabsContent value="trending" className="mt-6">
           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {trendingArticles.map(article => (
                    <ArticleCard key={article.id} article={article} />
                ))}
           </div>
        </TabsContent>
        <TabsContent value="following" className="mt-6">
             <div className="text-center py-16">
                <h3 className="text-lg font-semibold">No Articles Found</h3>
                <p className="text-sm text-muted-foreground">
                    You are not following any authors yet.
                </p>
            </div>
        </TabsContent>
        <TabsContent value="my-articles" className="mt-6">
             {myArticles.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {myArticles.map(article => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
             ) : (
                <div className="text-center py-16">
                    <h3 className="text-lg font-semibold">No Articles Found</h3>
                    <p className="text-sm text-muted-foreground">
                        You haven't written any articles yet.
                    </p>
                </div>
             )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
