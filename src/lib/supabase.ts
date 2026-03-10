import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://elblnwvpmtydixpnywpn.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_u44l_aKSr0qw6A19PbOy8Q_1Z_1piVW";

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase credentials missing. Please check your environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
