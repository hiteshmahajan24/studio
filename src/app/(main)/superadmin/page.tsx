
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, UserCog } from "lucide-react";

export default function SuperAdminPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-destructive">Superadmin Panel</h1>
        <p className="text-muted-foreground">Global control over all platform data and users.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Manage All Users</CardTitle>
            <CardDescription>View, edit, and manage every user account on the platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="destructive">
              <UserCog className="mr-2" /> Access User Management
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Raw Data Access</CardTitle>
            <CardDescription>Directly interact with the entire Firestore database.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="destructive">
              <Database className="mr-2" /> Open Data Explorer
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
