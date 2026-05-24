/**
 * 학생 UI 에서 사용할 effective isTeacher 값.
 *
 * Owner (julia.juhyun@gmail.com) 는 DB 에 role="teacher" 로 저장돼 있지만,
 * 학생 화면 (Portal / Curriculum / Learn / Practice / Coding Bank 등) 에서는
 * 일반 학생과 동일하게 보이게 함.
 *
 * /teacher /admin 등 명시적 관리자 라우트는 별도 가드로 그대로 접근 가능.
 *
 * 사용:
 *   // 학생 UI 에서:
 *   const isTeacher = useEffectiveIsTeacher()  // owner 면 false
 *
 *   // 관리자 화면 (/teacher, /admin) 에서:
 *   const isTeacher = profile?.role === "teacher"  // owner 도 true
 */

"use client"

import { useAuth } from "@/contexts/auth-context"
import { OWNER_EMAIL } from "@/components/owner-only-guard"

export function useEffectiveIsTeacher(): boolean {
  const { user, profile } = useAuth()
  const rawTeacher = profile?.role === "teacher"
  const isOwner = user?.email === OWNER_EMAIL
  // owner 는 학생 view 우선
  return rawTeacher && !isOwner
}

/**
 * 라우팅 결정 (auth callback / / 진입 등) 용.
 * 진짜 선생님은 /teacher 로 보내지만 owner 는 /portal (학생 view) 로.
 */
export function shouldRouteAsTeacher(email: string | undefined, role: string | undefined): boolean {
  if (!email || !role) return false
  if (email === OWNER_EMAIL) return false  // owner = 학생 화면이 default
  return role === "teacher"
}
