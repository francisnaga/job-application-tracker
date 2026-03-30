import { createClient } from '@/lib/supabase/server';
import ProfileClient from './ProfileClient';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch expanded profile metadata
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch application pulse
  const { count } = await supabase
    .from('applications')
    .select('*', { count: 'exact', head: true });

  return <ProfileClient user={user} profile={profile} appCount={count || 0} />;
}
