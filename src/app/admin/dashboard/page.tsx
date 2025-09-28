
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage faculty, alumni, events, and platform notifications.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Manage Faculty</CardTitle>
            <CardDescription>Onboard new faculty and manage existing profiles.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <PlusCircle className="mr-2" /> Add Faculty
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Manage Alumni</CardTitle>
            <CardDescription>Import and manage the alumni database.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full">Import CSV/Excel</Button>
            <Button variant="outline" className="w-full">
              <PlusCircle className="mr-2" /> Add Alumni Manually
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Create Events</CardTitle>
            <CardDescription>Organize institutional events and alumni meetups.</CardDescription>
          </CardHeader>
          <CardContent>
             <Button className="w-full">
              <PlusCircle className="mr-2" /> New Event
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
