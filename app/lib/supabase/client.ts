import { createClient, SupabaseClient } from "@supabase/supabase-js";

// For client-side requests
export const createSupabaseClient = (): SupabaseClient => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};
