
import { redirect } from 'next/navigation';

export default function SuperAdminPage() {
  // Superadmin dashboard is now replaced by the dedicated Creator View page.
  // This page will redirect any direct access attempts.
  redirect('/creator-view');
}
