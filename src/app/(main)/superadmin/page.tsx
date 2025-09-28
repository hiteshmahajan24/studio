
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, UserCog, Building } from "lucide-react";
import { CreateInstituteDialog } from "@/components/superadmin/create-institute-dialog";

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
            <CardTitle className="flex items-center gap-2"><Building /> Institute Management</CardTitle>
            <CardDescription>Create and manage institute profiles and their administrators.</CardDescription>
          </CardHeader>
          <CardContent>
            <CreateInstituteDialog>
                <Button className="w-full">Create New Institute</Button>
            </CreateInstituteDialog>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><UserCog /> User Management</CardTitle>
            <CardDescription>View, edit, and manage every user account on the platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="destructive">
               Access User Management
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Database /> Raw Data Access</CardTitle>
            <CardDescription>Directly interact with the entire Firestore database.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="destructive">
              Open Data Explorer
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
