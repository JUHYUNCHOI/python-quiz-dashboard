"use client"

import type React from "react"
import { BookOpen, User, Brain, Trophy, Target } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"

export type NavItem = {
  icon: React.ComponentType<{ className?: string }>
  label: string
  href: string
  exact?: boolean
}

// 학생/게스트 공용 네비 — 모바일 탭바(BottomNav)와 데스크탑 사이드바(DesktopSidebar)가 함께 사용.
// 아이가 이름만 보고 바로 아는 5개로 정리(2026-06-29):
//  - 뺀 것: 지도(/journey, '할 것'과 겹침) · 알고리즘(/algo, 어려운 말 — '할 것' 경로 안에서 등장)
//  - 바꾼 것: 실전 → 대회 (USACO·MCC 대회라 더 명확)
//  (제거 페이지는 URL·'할 것' 경로로 여전히 접근 가능 — 라우트는 그대로)
export function useNavItems(): NavItem[] {
  const { isAuthenticated } = useAuth()
  const { t } = useLanguage()

  const nav: NavItem[] = [
    { icon: Target,   label: t("할 것", "Next"),     href: "/course/next" },
    { icon: BookOpen, label: t("수업", "Lessons"),   href: "/curriculum"  },
    { icon: Brain,    label: t("연습", "Practice"),  href: "/course/ladder" },
    { icon: Trophy,   label: t("대회", "Contest"),   href: "/quest"       },
    { icon: User,     label: t("내정보", "Profile"), href: "/profile"     },
  ]

  // 현재는 학생/게스트 동일. (게스트도 '할 것'부터 바로 시작 가능)
  void isAuthenticated
  return nav
}

export function isNavActive(item: NavItem, pathname: string): boolean {
  return item.exact
    ? pathname === item.href
    : pathname === item.href || pathname.startsWith(item.href + "/")
}
