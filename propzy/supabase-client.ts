import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
  // these two values come from your `.env` file
  process.env.PLASMO_PUBLIC_SUPABASE_URL!,
  process.env.PLASMO_PUBLIC_SUPABASE_ANON_KEY!
)
