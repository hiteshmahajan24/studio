
'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { allEvents, CollegeEvent, PlatformEvent } from '@/lib/events-data';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { format } from 'date-fns';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

export default function ManageEventsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Manage Events</h1>
        <p className="text-muted-foreground">Oversee all platform and college-hosted events.</p>
      </div>
      <Card>
        <CardHeader>
            <div className='flex justify-end'>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button>
                      <PlusCircle className='mr-2'/>
                      Create New Event
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Feature Not Implemented</AlertDialogTitle>
                      <AlertDialogDescription>
                        The form to create a new event has not been implemented yet. This is a placeholder action.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Understood</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Host</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Spots Left</TableHead>
                <TableHead>
                    <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{event.category}</Badge>
                  </TableCell>
                   <TableCell>
                    <Badge variant={event.hostType === 'platform' ? 'default' : 'outline'} className='capitalize'>{event.hostType}</Badge>
                  </TableCell>
                  <TableCell>{format(new Date(event.date), 'MMM d, yyyy')}</TableCell>
                  <TableCell>{event.spotsLeft}</TableCell>
                  <TableCell>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>View Registrations</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Cancel Event</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
