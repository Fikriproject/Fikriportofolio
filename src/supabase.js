import { createClient } from '@supabase/supabase-js';

// Access environment variables using import.meta.env for Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'; 
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_URL === 'https://placeholder.supabase.co') {
  console.warn("Catatan: VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY belum diisi dengan akun Supabase asli di file .env. Website tetap berjalan secara offline/mock.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);