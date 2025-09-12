import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Search } from "lucide-react";

export function Networking() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Networking Hub</CardTitle>
        <CardDescription>Connect with alumni, faculty, and other students.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between gap-4 p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-4">
              <div className="bg-muted p-2 rounded-full">
                <Users className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold">Explore the Hub</p>
                <p className="text-sm text-muted-foreground">Find and connect with peers and professionals.</p>
              </div>
            </div>
            <Button variant="outline">
                <Search className="mr-2 h-4 w-4" />
                Browse
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
