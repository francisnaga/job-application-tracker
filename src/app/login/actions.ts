'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getURL } from '@/lib/utils';

export async function loginWithGoogle() {
  const supabase = await createClient();
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${getURL()}auth/callback`,
    },
  });

  if (error) {
    return redirect('/login?error=Could not authenticate with Google');
  }

  if (data.url) {
    redirect(data.url); // Use the redirect response from Supabase
  }
}
