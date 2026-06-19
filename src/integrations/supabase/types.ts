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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      bookshelf_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
      branding_settings: {
        Row: {
          accent_color: string | null
          address: string | null
          company_name: string
          contact_email: string | null
          contact_phone: string | null
          favicon_url: string | null
          id: number
          logo_url: string | null
          primary_color: string | null
          social_links: Json | null
          tagline: string | null
          updated_at: string
          whatsapp_number: string | null
        }
        Insert: {
          accent_color?: string | null
          address?: string | null
          company_name?: string
          contact_email?: string | null
          contact_phone?: string | null
          favicon_url?: string | null
          id?: number
          logo_url?: string | null
          primary_color?: string | null
          social_links?: Json | null
          tagline?: string | null
          updated_at?: string
          whatsapp_number?: string | null
        }
        Update: {
          accent_color?: string | null
          address?: string | null
          company_name?: string
          contact_email?: string | null
          contact_phone?: string | null
          favicon_url?: string | null
          id?: number
          logo_url?: string | null
          primary_color?: string | null
          social_links?: Json | null
          tagline?: string | null
          updated_at?: string
          whatsapp_number?: string | null
        }
        Relationships: []
      }
      candidate_applications: {
        Row: {
          consent_given: boolean
          created_at: string
          current_country: string | null
          desired_country: string | null
          education: string | null
          email: string
          full_name: string
          id: string
          nationality: string | null
          notes: string | null
          occupation: string | null
          phone: string | null
          status: string
          visa_type: string | null
          years_experience: number | null
        }
        Insert: {
          consent_given?: boolean
          created_at?: string
          current_country?: string | null
          desired_country?: string | null
          education?: string | null
          email: string
          full_name: string
          id?: string
          nationality?: string | null
          notes?: string | null
          occupation?: string | null
          phone?: string | null
          status?: string
          visa_type?: string | null
          years_experience?: number | null
        }
        Update: {
          consent_given?: boolean
          created_at?: string
          current_country?: string | null
          desired_country?: string | null
          education?: string | null
          email?: string
          full_name?: string
          id?: string
          nationality?: string | null
          notes?: string | null
          occupation?: string | null
          phone?: string | null
          status?: string
          visa_type?: string | null
          years_experience?: number | null
        }
        Relationships: []
      }
      consultation_bookings: {
        Row: {
          consent_given: boolean
          created_at: string
          destination_country: string | null
          email: string
          full_name: string
          id: string
          notes: string | null
          phone: string | null
          preferred_date: string | null
          preferred_time: string | null
          service_interest: string | null
          status: string
        }
        Insert: {
          consent_given?: boolean
          created_at?: string
          destination_country?: string | null
          email: string
          full_name: string
          id?: string
          notes?: string | null
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          service_interest?: string | null
          status?: string
        }
        Update: {
          consent_given?: boolean
          created_at?: string
          destination_country?: string | null
          email?: string
          full_name?: string
          id?: string
          notes?: string | null
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          service_interest?: string | null
          status?: string
        }
        Relationships: []
      }
      cta_clicks: {
        Row: {
          clicked_at: string
          cta_key: string
          id: string
          metadata: Json | null
          page_number: number | null
          publication_id: string | null
          session_token: string | null
        }
        Insert: {
          clicked_at?: string
          cta_key: string
          id?: string
          metadata?: Json | null
          page_number?: number | null
          publication_id?: string | null
          session_token?: string | null
        }
        Update: {
          clicked_at?: string
          cta_key?: string
          id?: string
          metadata?: Json | null
          page_number?: number | null
          publication_id?: string | null
          session_token?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cta_clicks_publication_id_fkey"
            columns: ["publication_id"]
            isOneToOne: false
            referencedRelation: "publications"
            referencedColumns: ["id"]
          },
        ]
      }
      download_events: {
        Row: {
          downloaded_at: string
          file_key: string | null
          id: string
          publication_id: string | null
          session_token: string | null
        }
        Insert: {
          downloaded_at?: string
          file_key?: string | null
          id?: string
          publication_id?: string | null
          session_token?: string | null
        }
        Update: {
          downloaded_at?: string
          file_key?: string | null
          id?: string
          publication_id?: string | null
          session_token?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "download_events_publication_id_fkey"
            columns: ["publication_id"]
            isOneToOne: false
            referencedRelation: "publications"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_inquiries: {
        Row: {
          company_name: string
          consent_given: boolean
          contact_name: string
          country: string | null
          created_at: string
          email: string
          hire_timeline: string | null
          id: string
          industry: string | null
          notes: string | null
          phone: string | null
          positions_needed: number | null
          status: string
        }
        Insert: {
          company_name: string
          consent_given?: boolean
          contact_name: string
          country?: string | null
          created_at?: string
          email: string
          hire_timeline?: string | null
          id?: string
          industry?: string | null
          notes?: string | null
          phone?: string | null
          positions_needed?: number | null
          status?: string
        }
        Update: {
          company_name?: string
          consent_given?: boolean
          contact_name?: string
          country?: string | null
          created_at?: string
          email?: string
          hire_timeline?: string | null
          id?: string
          industry?: string | null
          notes?: string | null
          phone?: string | null
          positions_needed?: number | null
          status?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          consent_given: boolean
          country: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          message: string | null
          payload: Json | null
          phone: string | null
          source: string
          status: string
        }
        Insert: {
          consent_given?: boolean
          country?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          message?: string | null
          payload?: Json | null
          phone?: string | null
          source: string
          status?: string
        }
        Update: {
          consent_given?: boolean
          country?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          message?: string | null
          payload?: Json | null
          phone?: string | null
          source?: string
          status?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          consent_given: boolean
          email: string
          full_name: string | null
          id: string
          source: string | null
          subscribed_at: string
          unsubscribed_at: string | null
        }
        Insert: {
          consent_given?: boolean
          email: string
          full_name?: string | null
          id?: string
          source?: string | null
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Update: {
          consent_given?: boolean
          email?: string
          full_name?: string | null
          id?: string
          source?: string | null
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Relationships: []
      }
      notification_preferences: {
        Row: {
          consultation_alert: boolean | null
          email_recipient: string | null
          employer_alert: boolean | null
          id: string
          new_lead_alert: boolean | null
          share_download_alert: boolean | null
          updated_at: string
          user_id: string
          view_milestone_alert: boolean | null
        }
        Insert: {
          consultation_alert?: boolean | null
          email_recipient?: string | null
          employer_alert?: boolean | null
          id?: string
          new_lead_alert?: boolean | null
          share_download_alert?: boolean | null
          updated_at?: string
          user_id: string
          view_milestone_alert?: boolean | null
        }
        Update: {
          consultation_alert?: boolean | null
          email_recipient?: string | null
          employer_alert?: boolean | null
          id?: string
          new_lead_alert?: boolean | null
          share_download_alert?: boolean | null
          updated_at?: string
          user_id?: string
          view_milestone_alert?: boolean | null
        }
        Relationships: []
      }
      page_views: {
        Row: {
          dwell_seconds: number | null
          id: string
          page_number: number
          publication_id: string | null
          session_token: string | null
          viewed_at: string
        }
        Insert: {
          dwell_seconds?: number | null
          id?: string
          page_number: number
          publication_id?: string | null
          session_token?: string | null
          viewed_at?: string
        }
        Update: {
          dwell_seconds?: number | null
          id?: string
          page_number?: number
          publication_id?: string | null
          session_token?: string | null
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "page_views_publication_id_fkey"
            columns: ["publication_id"]
            isOneToOne: false
            referencedRelation: "publications"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      publication_pages: {
        Row: {
          content: Json | null
          created_at: string
          id: string
          image_url: string | null
          layout_key: string | null
          page_number: number
          publication_id: string
          title: string | null
          updated_at: string
        }
        Insert: {
          content?: Json | null
          created_at?: string
          id?: string
          image_url?: string | null
          layout_key?: string | null
          page_number: number
          publication_id: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          content?: Json | null
          created_at?: string
          id?: string
          image_url?: string | null
          layout_key?: string | null
          page_number?: number
          publication_id?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "publication_pages_publication_id_fkey"
            columns: ["publication_id"]
            isOneToOne: false
            referencedRelation: "publications"
            referencedColumns: ["id"]
          },
        ]
      }
      publications: {
        Row: {
          access_password: string | null
          category_id: string | null
          cover_url: string | null
          created_at: string
          description: string | null
          download_allowed: boolean
          expiry_date: string | null
          id: string
          is_password_protected: boolean
          is_published: boolean
          language: string | null
          print_allowed: boolean
          published_at: string | null
          slug: string
          subtitle: string | null
          title: string
          updated_at: string
          watermark_enabled: boolean
        }
        Insert: {
          access_password?: string | null
          category_id?: string | null
          cover_url?: string | null
          created_at?: string
          description?: string | null
          download_allowed?: boolean
          expiry_date?: string | null
          id?: string
          is_password_protected?: boolean
          is_published?: boolean
          language?: string | null
          print_allowed?: boolean
          published_at?: string | null
          slug: string
          subtitle?: string | null
          title: string
          updated_at?: string
          watermark_enabled?: boolean
        }
        Update: {
          access_password?: string | null
          category_id?: string | null
          cover_url?: string | null
          created_at?: string
          description?: string | null
          download_allowed?: boolean
          expiry_date?: string | null
          id?: string
          is_password_protected?: boolean
          is_published?: boolean
          language?: string | null
          print_allowed?: boolean
          published_at?: string | null
          slug?: string
          subtitle?: string | null
          title?: string
          updated_at?: string
          watermark_enabled?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "publications_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "bookshelf_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      reader_sessions: {
        Row: {
          browser: string | null
          country: string | null
          device: string | null
          duration_seconds: number | null
          ended_at: string | null
          id: string
          publication_id: string | null
          referrer: string | null
          session_token: string
          started_at: string
        }
        Insert: {
          browser?: string | null
          country?: string | null
          device?: string | null
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          publication_id?: string | null
          referrer?: string | null
          session_token: string
          started_at?: string
        }
        Update: {
          browser?: string | null
          country?: string | null
          device?: string | null
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          publication_id?: string | null
          referrer?: string | null
          session_token?: string
          started_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reader_sessions_publication_id_fkey"
            columns: ["publication_id"]
            isOneToOne: false
            referencedRelation: "publications"
            referencedColumns: ["id"]
          },
        ]
      }
      security_settings: {
        Row: {
          allowed_domains: string[] | null
          default_password: string | null
          download_restricted: boolean | null
          id: number
          password_protection_enabled: boolean | null
          print_restricted: boolean | null
          updated_at: string
          watermark_text: string | null
        }
        Insert: {
          allowed_domains?: string[] | null
          default_password?: string | null
          download_restricted?: boolean | null
          id?: number
          password_protection_enabled?: boolean | null
          print_restricted?: boolean | null
          updated_at?: string
          watermark_text?: string | null
        }
        Update: {
          allowed_domains?: string[] | null
          default_password?: string | null
          download_restricted?: boolean | null
          id?: number
          password_protection_enabled?: boolean | null
          print_restricted?: boolean | null
          updated_at?: string
          watermark_text?: string | null
        }
        Relationships: []
      }
      share_events: {
        Row: {
          channel: string
          id: string
          publication_id: string | null
          session_token: string | null
          shared_at: string
        }
        Insert: {
          channel: string
          id?: string
          publication_id?: string | null
          session_token?: string | null
          shared_at?: string
        }
        Update: {
          channel?: string
          id?: string
          publication_id?: string | null
          session_token?: string | null
          shared_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "share_events_publication_id_fkey"
            columns: ["publication_id"]
            isOneToOne: false
            referencedRelation: "publications"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "editor" | "viewer"
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
    Enums: {
      app_role: ["admin", "editor", "viewer"],
    },
  },
} as const
