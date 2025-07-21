import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'customer' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: 'customer' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'customer' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      cars: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          stock_quantity: number
          image_url: string | null
          category: string
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price: number
          stock_quantity?: number
          image_url?: string | null
          category?: string
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price?: number
          stock_quantity?: number
          image_url?: string | null
          category?: string
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          total_amount: number
          status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
          stripe_session_id: string | null
          shipping_address: any | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          total_amount: number
          status?: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
          stripe_session_id?: string | null
          shipping_address?: any | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          total_amount?: number
          status?: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
          stripe_session_id?: string | null
          shipping_address?: any | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          car_id: string
          quantity: number
          price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          car_id: string
          quantity: number
          price: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          car_id?: string
          quantity?: number
          price?: number
          created_at?: string
        }
      }
      cart_items: {
        Row: {
          id: string
          user_id: string
          car_id: string
          quantity: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          car_id: string
          quantity?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          car_id?: string
          quantity?: number
          created_at?: string
        }
      }
    }
  }
}