import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let supabase: SupabaseClient | null = null

export const useSupabase = () => {
  if (!supabase) {
    const config = useRuntimeConfig()
    supabase = createClient(
      config.public.supabaseUrl as string,
      config.public.supabaseKey as string,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      }
    )
  }
  return supabase
}
