import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Handshake } from "lucide-react";
import Link from "next/link";

const suggestedMentors = [
  { id: "mentor-1", name: "Dr. Evelyn Reed", title: "AI Research Scientist", avatarId: "mentor-1" },
  { id: "mentor-2", name: "David Chen", title: "Principal Engineer @ Tech Solutions", avatarId: "mentor-2" },
  { id: "mentor-3", name: "Sarah Jones", title: "UX Design Lead", avatarId: "mentor-3" },
];

export function Mentorship() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Find a Mentor</CardTitle>
        <CardDescription>Connect with experienced professionals for guidance.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestedMentors.map((mentor) => {
          const avatar = PlaceHolderImages.find((img) => img.id === mentor.avatarId);
          return (
            <div key={mentor.name} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 truncate">
                <Avatar>
                  {avatar && <AvatarImage src={avatar.imageUrl} alt={mentor.name} data-ai-hint={avatar.imageHint} />}
                  <AvatarFallback>{mentor.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="truncate">
                  <p className="font-semibold truncate">{mentor.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{mentor.title}</p>
                </div>
              </div>
               <Button variant="outline" size="sm" className="shrink-0" asChild>
                <Link href={`/mentorship`}>
                  <Handshake className="mr-2 h-4 w-4" />
                  Connect
                </Link>
              </Button>
            </div>
          );
        })}
         <Button variant="ghost" className="w-full" asChild>
            <Link href="/mentorship">View More Mentors</Link>
         </Button>
      </CardContent>
    </Card>
  );
}
