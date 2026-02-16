export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      about_gallery: {
        Row: {
          created_at: string | null
          id: string
          image_url: string
          is_active: boolean | null
          sort_order: number | null
          title: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_url: string
          is_active?: boolean | null
          sort_order?: number | null
          title?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          image_url?: string
          is_active?: boolean | null
          sort_order?: number | null
          title?: string | null
        }
        Relationships: []
      }
      activity_logs: {
        Row: {
          action: string
          admin_email: string | null
          id: number
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          admin_email?: string | null
          id?: number
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          admin_email?: string | null
          id?: number
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          last_login: string | null
          permissions: Json | null
          role: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          last_login?: string | null
          permissions?: Json | null
          role?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          last_login?: string | null
          permissions?: Json | null
          role?: string | null
        }
        Relationships: []
      }
      compliances: {
        Row: {
          created_at: string | null
          file_url: string
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          file_url: string
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          file_url?: string
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          read_at: string | null
          status: string | null
          subject: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          read_at?: string | null
          status?: string | null
          subject: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          read_at?: string | null
          status?: string | null
          subject?: string
        }
        Relationships: []
      }
      downloads: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          download_url: string | null
          downloads_count: number | null
          file_size: string | null
          file_type: string
          file_url: string | null
          id: number
          is_published: boolean | null
          size: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          download_url?: string | null
          downloads_count?: number | null
          file_size?: string | null
          file_type: string
          file_url?: string | null
          id?: number
          is_published?: boolean | null
          size?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          download_url?: string | null
          downloads_count?: number | null
          file_size?: string | null
          file_type?: string
          file_url?: string | null
          id?: number
          is_published?: boolean | null
          size?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          phone: string | null
          resume_url: string | null
          status: string | null
          vacancy_id: number | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          phone?: string | null
          resume_url?: string | null
          status?: string | null
          vacancy_id?: number | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          resume_url?: string | null
          status?: string | null
          vacancy_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_vacancy_id_fkey"
            columns: ["vacancy_id"]
            isOneToOne: false
            referencedRelation: "vacancies"
            referencedColumns: ["id"]
          },
        ]
      }
      members: {
        Row: {
          address: string | null
          business_name: string | null
          business_type: string | null
          cnic: string | null
          created_at: string | null
          email: string | null
          full_name: string
          id: string
          membership_code: string | null
          membership_expiry: string | null
          membership_type: string | null
          mobile_number: string | null
          ntn: string | null
          photo_url: string | null
          status: string | null
        }
        Insert: {
          address?: string | null
          business_name?: string | null
          business_type?: string | null
          cnic?: string | null
          created_at?: string | null
          email?: string | null
          full_name: string
          id?: string
          membership_code?: string | null
          membership_expiry?: string | null
          membership_type?: string | null
          mobile_number?: string | null
          ntn?: string | null
          photo_url?: string | null
          status?: string | null
        }
        Update: {
          address?: string | null
          business_name?: string | null
          business_type?: string | null
          cnic?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string
          id?: string
          membership_code?: string | null
          membership_expiry?: string | null
          membership_type?: string | null
          mobile_number?: string | null
          ntn?: string | null
          photo_url?: string | null
          status?: string | null
        }
        Relationships: []
      }
      permissions: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      registrations: {
        Row: {
          application_id: string | null
          business_address: string | null
          cnic: string | null
          company_name: string | null
          created_at: string | null
          designation: string | null
          email: string | null
          full_name: string
          id: string
          membership_type: string
          ntn: string | null
          phone: string
          photo_url: string | null
          reviewed_at: string | null
          status: string | null
          tracking_id: string | null
        }
        Insert: {
          application_id?: string | null
          business_address?: string | null
          cnic?: string | null
          company_name?: string | null
          created_at?: string | null
          designation?: string | null
          email?: string | null
          full_name: string
          id?: string
          membership_type: string
          ntn?: string | null
          phone: string
          photo_url?: string | null
          reviewed_at?: string | null
          status?: string | null
          tracking_id?: string | null
        }
        Update: {
          application_id?: string | null
          business_address?: string | null
          cnic?: string | null
          company_name?: string | null
          created_at?: string | null
          designation?: string | null
          email?: string | null
          full_name?: string
          id?: string
          membership_type?: string
          ntn?: string | null
          phone?: string
          photo_url?: string | null
          reviewed_at?: string | null
          status?: string | null
          tracking_id?: string | null
        }
        Relationships: []
      }
      role_permissions: {
        Row: {
          permission_id: number
          role_id: number
        }
        Insert: {
          permission_id: number
          role_id: number
        }
        Update: {
          permission_id?: number
          role_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      service_requests: {
        Row: {
          created_at: string | null
          description: string | null
          email: string | null
          full_name: string
          id: string
          notes: string | null
          phone: string | null
          service_type: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          email?: string | null
          full_name: string
          id?: string
          notes?: string | null
          phone?: string | null
          service_type: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          email?: string | null
          full_name?: string
          id?: string
          notes?: string | null
          phone?: string | null
          service_type?: string
          status?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          reference_id: string | null
          title: string
          type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          reference_id?: string | null
          title: string
          type: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          reference_id?: string | null
          title?: string
          type?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          role_id: number
          user_id: string
        }
        Insert: {
          role_id: number
          user_id: string
        }
        Update: {
          role_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      vacancies: {
        Row: {
          applicants_count: number | null
          created_at: string | null
          deadline: string | null
          department: string | null
          description: string | null
          id: number
          location: string | null
          posted_date: string | null
          requirements: string | null
          status: string | null
          title: string
          type: string | null
        }
        Insert: {
          applicants_count?: number | null
          created_at?: string | null
          deadline?: string | null
          department?: string | null
          description?: string | null
          id?: number
          location?: string | null
          posted_date?: string | null
          requirements?: string | null
          status?: string | null
          title: string
          type?: string | null
        }
        Update: {
          applicants_count?: number | null
          created_at?: string | null
          deadline?: string | null
          department?: string | null
          description?: string | null
          id?: number
          location?: string | null
          posted_date?: string | null
          requirements?: string | null
          status?: string | null
          title?: string
          type?: string | null
        }
        Relationships: []
      }
      verification_requests: {
        Row: {
          company_name: string
          created_at: string | null
          details: Json | null
          id: number
          ntn: string
          status: string | null
        }
        Insert: {
          company_name: string
          created_at?: string | null
          details?: Json | null
          id?: number
          ntn: string
          status?: string | null
        }
        Update: {
          company_name?: string
          created_at?: string | null
          details?: Json | null
          id?: number
          ntn?: string
          status?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
  | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
    DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
    DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
  ? R
  : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
    DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
    DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R
    }
  ? R
  : never
  : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema["Tables"]
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I
  }
  ? I
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Insert: infer I
  }
  ? I
  : never
  : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema["Tables"]
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U
  }
  ? U
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Update: infer U
  }
  ? U
  : never
  : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
  | keyof DefaultSchema["Enums"]
  | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
  : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
  | keyof DefaultSchema["CompositeTypes"]
  | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
  : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
