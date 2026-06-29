"use client"

import type React from "react"
import { Home, BookOpen, User, Puzzle, Brain, Trophy, Map } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"

export type NavItem = {
  icon: React.ComponentType<{ className?: string }>
  label: string
  href: string
  exact?: boolean
}

// 학생/게스트 공용 네비 항목 — 모바일 탭바(BottomNav)와 데스크탑 사이드바(DesktopSidebar)가 함께 사용.
// (항목 구성은 기존 BottomNav 와 동일하게 유지 — IA 통합은 별도 단계)
export function useNavItems(): NavItem[] {
  const { isAuthenticated } = useAuth()
  const { t } = useLanguage()

  const studentNav: NavItem[] = [
    { icon: Map,     label: t("지도", "Map"),        href: "/journey"    },
    { icon: BookOpen,label: t("수업", "Lessons"),    href: "/curriculum" },
    { icon: Brain,   label: t("연습", "Practice"),   href: "/course/ladder" },
    { icon: Puzzle,  label: t("알고리즘", "Algo"),   href: "/algo"       },
    { icon: Trophy,  label: t("실전", "Contest"),    href: "/quest"      },
    { icon: User,    label: t("내정보", "Profile"),  href: "/profile"    },
  ]

  const guestNav: NavItem[] = [
    { icon: Home,     label: t("홈", "Home"),       href: "/"           },
    { icon: BookOpen, label: t("수업", "Lessons"),  href: "/curriculum" },
    { icon: Puzzle,   label: t("알고리즘", "Algo"), href: "/algo"       },
    { icon: Trophy,   label: t("실전", "Contest"),  href: "/quest"      },
    { icon: User,     label: t("내정보", "Profile"), href: "/profile"   },
  ]

  return !isAuthenticated ? guestNav : studentNav
}

export function isNavActive(item: NavItem, pathname: string): boolean {
  return item.exact
    ? pathname === item.href
    : pathname === item.href || pathname.startsWith(item.href + "/")
}
