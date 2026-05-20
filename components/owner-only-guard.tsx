"use client"

/**
 * OwnerOnlyGuard / useIsOwner — 완성도 떨어지는 섹션을 owner 만 보게 함.
 *
 * 용도: WIP 기능 (코딩 뱅크 / 새 Algorithm Lab 통합 등) 을 일반 학생에게서
 * 잠시 숨길 때 사용. 광고 유입 사용자가 빈 화면을 보지 않도록.
 *
 * 패턴:
 *  - 페이지 전체: `<OwnerOnlyGuard>...</OwnerOnlyGuard>` 로 감싸기
 *  - 일부 링크/카드만: `useIsOwner()` 훅으로 조건 렌더
 *
 * 해제 조건 (= 완성되면 한 줄로 풀어줌):
 *   guard 컴포넌트 안의 `EARLY_RETURN_DISABLED` 플래그를 true 로 바꾸면 즉시 공개.
 *   또는 페이지에서 guard wrapper 자체를 제거.
 */

import Link from "next/link"
import { Construction, Home } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"

// 단일 진실 — 다른 곳에서도 import 해서 동일 이메일 비교
export const OWNER_EMAIL = "julia.juhyun@gmail.com"

/**
 * 현재 로그인 사용자가 owner 인지 boolean 반환.
 * 인증 로딩 중에는 false (보수적 — 깜빡임 동안 숨김).
 */
export function useIsOwner(): boolean {
  const { user, isLoading } = useAuth()
  if (isLoading) return false
  return user?.email === OWNER_EMAIL
}

interface OwnerOnlyGuardProps {
  children: React.ReactNode
  /**
   * 차단 화면 제목 (선택). 기본: "준비 중인 기능 / Coming soon".
   * 페이지마다 약간씩 다른 메시지 주고 싶을 때.
   */
  title?: { ko: string; en: string }
  /**
   * 차단 화면 부제 (선택). 기본: "조금만 더 다듬고 곧 공개해요".
   */
  description?: { ko: string; en: string }
}

/**
 * Owner 가 아닌 사용자에게 "준비 중" 화면 보여주고 차단.
 * Owner 면 children 그대로 렌더.
 */
export function OwnerOnlyGuard({ children, title, description }: OwnerOnlyGuardProps) {
  const { user, isLoading } = useAuth()
  const { t } = useLanguage()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50 to-white">
        <div className="text-5xl animate-bounce">🦒</div>
      </div>
    )
  }

  if (!user || user.email !== OWNER_EMAIL) {
    const titleText = title
      ? t(title.ko, title.en)
      : t("준비 중인 기능이에요", "Coming soon")
    const descText = description
      ? t(description.ko, description.en)
      : t(
          "조금만 더 다듬고 곧 공개할게요. 그동안 다른 수업으로 먼저 시작해보세요.",
          "We're putting the finishing touches on this. In the meantime, jump into a lesson!"
        )

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50 to-white p-6">
        <div className="max-w-md w-full text-center bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-indigo-100">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-indigo-50 flex items-center justify-center">
            <Construction className="w-8 h-8 text-indigo-500" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">{titleText}</h1>
          <p className="text-sm text-gray-600 leading-relaxed mb-6">{descText}</p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Link
              href="/curriculum"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-colors"
            >
              <Home className="w-4 h-4" />
              {t("수업으로 가기", "Go to lessons")}
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold transition-colors"
            >
              {t("홈으로", "Home")}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
