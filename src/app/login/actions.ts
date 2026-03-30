'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';

export async function loginWithGoogle() {
  const supabase = await createClient();
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const origin = `${protocol}://${host}`;
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return redirect('/login?error=Could not authenticate with Google');
  }

  if (data.url) {
    redirect(data.url); // Use the redirect response from Supabase
  }
}
