
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateInstituteDialog } from "@/components/superadmin/create-institute-dialog";
import { Building, Database, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreatorViewPage() {
  return (
    <div className="p-4 md:p-8">
       <div className="mb-8 flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold text-destructive">Creator View</h1>
            <p className="text-muted-foreground">Global control panel for platform management.</p>
        </div>
        <Button asChild variant="outline">
            <Link href="/dashboard">Exit Creator View</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
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
