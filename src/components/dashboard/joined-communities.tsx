
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { communities } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useUserState } from "@/context/user-state-context";

export function JoinedCommunities({ className }: { className?: string }) {
  const { joinedCommunityIds } = useUserState();
  
  const joined = communities.filter(c => joinedCommunityIds.includes(c.id));

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader>
        <CardTitle>Your Communities</CardTitle>
        <CardDescription>Shortcuts to your joined communities.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between space-y-4">
        {joined.length > 0 ? (
            <div className="space-y-3">
                {joined.map((community) => (
                    <Link key={community.id} href={`/communities/${community.id}`} passHref>
                        <div className="flex items-center justify-between gap-4 p-3 rounded-lg transition-colors bg-muted/50 hover:bg-muted cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-background rounded-md">
                                <community.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm">{community.name}</p>
                                <p className="text-xs text-muted-foreground">{community.memberCount} members</p>
                            </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                    </Link>
                ))}
          </div>
        ) : (
          <div className="text-center text-sm text-muted-foreground flex-1 flex flex-col items-center justify-center">
            <p>You haven't joined any communities yet.</p>
            <p className="text-xs">Explore communities in the Networking Hub!</p>
          </div>
        )}
         <Button variant="outline" asChild>
            <Link href="/networking">Explore Communities</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
