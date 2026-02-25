"use server"

import { createClient } from "@/lib/supabase/server"

// 선생님 등록 (비밀 코드 확인)
export async function registerAsTeacher(secretCode: string) {
  const expectedCode = process.env.TEACHER_SECRET_CODE
  if (!expectedCode || secretCode !== expectedCode) {
    return { error: "잘못된 등록 코드입니다" }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "로그인이 필요합니다" }

  const { error } = await supabase
    .from("profiles")
    .update({ role: "teacher", updated_at: new Date().toISOString() })
    .eq("id", user.id)

  if (error) return { error: "등록에 실패했습니다" }
  return { success: true }
}

// 반 생성
export async function createClass(name: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "로그인이 필요합니다" }

  // 선생님 확인
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "teacher") return { error: "선생님만 반을 만들 수 있습니다" }

  // 참가 코드 생성
  const { data: joinCode } = await supabase.rpc("generate_join_code")

  const { data, error } = await supabase
    .from("classes")
    .insert({
      teacher_id: user.id,
      name,
      join_code: joinCode,
    })
    .select()
    .single()

  if (error) return { error: "반 생성에 실패했습니다" }
  return { success: true, data }
}

// 반 비활성화/활성화 토글
export async function toggleClassActive(classId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "로그인이 필요합니다" }

  const { data: cls } = await supabase
    .from("classes")
    .select("is_active, teacher_id")
    .eq("id", classId)
    .single()

  if (!cls || cls.teacher_id !== user.id) return { error: "권한이 없습니다" }

  const { error } = await supabase
    .from("classes")
    .update({ is_active: !cls.is_active })
    .eq("id", classId)

  if (error) return { error: "변경에 실패했습니다" }
  return { success: true, isActive: !cls.is_active }
}

// 반 참가 (학생)
export async function joinClassByCode(code: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "로그인이 필요합니다" }

  try {
    const { data, error } = await supabase.rpc("join_class_by_code", {
      p_code: code.toUpperCase(),
    })

    if (error) {
      return { error: "유효하지 않은 참가 코드입니다" }
    }
    return { success: true, classId: data }
  } catch {
    return { error: "참가에 실패했습니다" }
  }
}
