import { createClient } from '@/lib/supabase/server';
import DocumentsClient from './DocumentsClient';
import { redirect } from 'next/navigation';

export default async function DocumentsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch all documents
  const { data: documents } = await supabase
    .from('documents')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return <DocumentsClient initialData={documents || []} />;
}
