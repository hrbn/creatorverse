import { createClient } from '@supabase/supabase-js'
import type { Creator, CreatorPayload } from './types'

type Database = {
  public: {
    Tables: {
      creators: {
        Row: Creator
        Insert: CreatorPayload
        Update: Partial<CreatorPayload>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseApiKey = import.meta.env.VITE_SUPABASE_API_KEY

if (!supabaseUrl || !supabaseApiKey) {
  throw new Error('Missing Supabase configuration in Vite environment variables.')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseApiKey)
