import { createClient } from '@/lib/supabase/server';
import NetworkingClient from './NetworkingClient';
import { redirect } from 'next/navigation';

export default async function NetworkingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: contacts } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false });

  return <NetworkingClient user={user} contacts={contacts || []} />;
}
