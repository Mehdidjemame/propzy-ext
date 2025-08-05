import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.PLASMO_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.PLASMO_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl) throw new Error("SUPABASE_URL is required")
if (!supabaseAnonKey) throw new Error("SUPABASE_ANON_KEY is required")

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
