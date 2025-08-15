// Supabase client configuration
// Fill the env vars in your .env file:
// REACT_APP_SUPABASE_URL=...
// REACT_APP_SUPABASE_ANON_KEY=...
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase env vars are not set. Please configure REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY in your .env')
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')
