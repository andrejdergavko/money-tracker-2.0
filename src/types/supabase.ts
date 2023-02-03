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
          label: string
          uuid: string
        }
        Insert: {
          color: string
          label?: string
          uuid?: string
        }
        Update: {
          color?: string
          label?: string
          uuid?: string
        }
      }
      transactions: {
        Row: {
          amount: number
          amount_in_usd: number | null
          bank: string | null
          category_uuid: string | null
          currency: string
          date: string
          description: string | null
          original_csv_row: string | null
          uuid: string
        }
        Insert: {
          amount: number
          amount_in_usd?: number | null
          bank?: string | null
          category_uuid?: string | null
          currency: string
          date: string
          description?: string | null
          original_csv_row?: string | null
          uuid?: string
        }
        Update: {
          amount?: number
          amount_in_usd?: number | null
          bank?: string | null
          category_uuid?: string | null
          currency?: string
          date?: string
          description?: string | null
          original_csv_row?: string | null
          uuid?: string
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
