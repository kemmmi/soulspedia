import { createClient } from "@supabase/supabase-js";

/**
 * Supabase client for use in Server Components and Server Actions.
 * Uses the public anon key — RLS policies govern what data is accessible.
 * Call once per request; do not share across requests.
 */
export function createSupabaseServer() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
