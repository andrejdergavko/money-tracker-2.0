export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          color: string | null
          id: number
          label: string
        }
        Insert: {
          color?: string | null
          id?: number
          label?: string
        }
        Update: {
          color?: string | null
          id?: number
          label?: string
        }
      }
      transactions: {
        Row: {
          amount: number
          amount_in_usd: number | null
          bank: string | null
          category_id: number | null
          currency: string
          date: string
          description: string | null
          id: number
        }
        Insert: {
          amount: number
          amount_in_usd?: number | null
          bank?: string | null
          category_id?: number | null
          currency: string
          date: string
          description?: string | null
          id?: number
        }
        Update: {
          amount?: number
          amount_in_usd?: number | null
          bank?: string | null
          category_id?: number | null
          currency?: string
          date?: string
          description?: string | null
          id?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
