import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl) {
  throw new Error('Missing VITE_SUPABASE_URL environment variable. Please add it to your .env.local file.')
}

if (!supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable. Please add it to your .env.local file.')
}

// Validate URL format
try {
  new URL(supabaseUrl)
} catch (error) {
  throw new Error(`Invalid VITE_SUPABASE_URL format: ${supabaseUrl}. Please check your Supabase project URL.`)
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Database types for TypeScript
export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          unique_id: string
          name: string
          email: string
          phone: string | null
          role: 'customer' | 'provider' | 'company' | 'admin'
          avatar: string | null
          location: string | null
          id_number: string | null
          kra_pin: string | null
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          unique_id?: string
          name: string
          email: string
          phone?: string | null
          role?: 'customer' | 'provider' | 'company' | 'admin'
          avatar?: string | null
          location?: string | null
          id_number?: string | null
          kra_pin?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          unique_id?: string
          name?: string
          email?: string
          phone?: string | null
          role?: 'customer' | 'provider' | 'company' | 'admin'
          avatar?: string | null
          location?: string | null
          id_number?: string | null
          kra_pin?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      jitenge_accounts: {
        Row: {
          id: string
          user_id: string
          balance: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          balance?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          balance?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}