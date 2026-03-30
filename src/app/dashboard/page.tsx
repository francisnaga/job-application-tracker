import { createClient } from '@/lib/supabase/server';
import DashboardClient from './DashboardClient';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: applications } = await supabase
    .from('applications')
    .select('*')
    .order('applied_date', { ascending: false });

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { count: documentCount } = await supabase
    .from('documents')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id);

  return <DashboardClient 
           user={user} 
           applications={applications || []} 
           profile={profile} 
           documentCount={documentCount || 0} 
         />;
}
