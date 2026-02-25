// Supabase DB 테이블 타입 정의

export interface Profile {
  id: string
  role: "student" | "teacher"
  display_name: string
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Class {
  id: string
  teacher_id: string
  name: string
  join_code: string
  is_active: boolean
  created_at: string
}

export interface ClassMember {
  id: string
  class_id: string
  student_id: string
  joined_at: string
}

export interface LessonProgress {
  id: string
  user_id: string
  lesson_id: string
  variant: string | null
  progress_type: "learn" | "review"
  progress_data: Record<string, unknown>
  completed: boolean
  score: number
  updated_at: string
}

export interface GamificationData {
  user_id: string
  total_xp: number
  daily_streak: number
  last_active_date: string
  sessions_today: number
  updated_at: string
}

export interface UserPreferences {
  user_id: string
  language: "ko" | "en"
  sound_muted: boolean
  library_variants: Record<string, string>
  updated_at: string
}
