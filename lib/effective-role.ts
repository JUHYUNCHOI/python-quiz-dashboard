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

/**
 * 학생 UI 에서 사용할 effective isTeacher 값.
 *
 * 동작:
 * - 학생 (profile.role !== "teacher") → 항상 false
 * - 일반 선생님 → default true (선생님 뷰), `teacher-as-student=true` 토글 시 false
 * - Owner (julia) → default false (학생 뷰), `teacher-as-student=false` 토글 시 true
 *
 * 즉 owner 는 *반대* default 를 가짐. 같은 토글로 양쪽 다 전환 가능.
 *
 * 이렇게 하면:
 * - julia 가 기본 학생 뷰 (디자인 통일)
 * - julia 가 선생님 작업 필요할 땐 profile 에서 토글 → 선생님 뷰
 * - /teacher, /admin 등 라우트는 profile.role 검사로 모두 통과 (어디든 접근 가능)
 */
export function useEffectiveIsTeacher(): boolean {
  const { user, profile } = useAuth()
  const rawTeacher = profile?.role === "teacher"
  if (!rawTeacher) return false

  const isOwner = user?.email === OWNER_EMAIL
  if (typeof window === "undefined") return !isOwner

  const flag = localStorage.getItem("teacher-as-student")
  if (flag === "true") return false   // 강제 학생 뷰
  if (flag === "false") return true   // 강제 선생님 뷰
  // 미설정: owner = 학생 뷰 default, 일반 선생님 = 선생님 뷰 default
  return !isOwner
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
