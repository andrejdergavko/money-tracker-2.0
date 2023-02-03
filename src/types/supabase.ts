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
          color: string
          id: number
          label: string
        }
        Insert: {
          color: string
          id?: number
          label?: string
        }
        Update: {
          color?: string
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
          original_csv_row: string | null
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
          original_csv_row?: string | null
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
          original_csv_row?: string | null
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
