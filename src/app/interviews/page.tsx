import { createClient } from '@/lib/supabase/server';
import InterviewsClient from './InterviewsClient';
import { redirect } from 'next/navigation';

export default async function InterviewsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: rounds } = await supabase
    .from('interview_rounds')
    .select('*, applications(company_name, role_title)')
    .order('round_date', { ascending: false });

  const { data: applications } = await supabase
    .from('applications')
    .select('id, company_name, role_title')
    .eq('status', 'interview');

  return <InterviewsClient user={user} initialRounds={rounds || []} applications={applications || []} />;
}
