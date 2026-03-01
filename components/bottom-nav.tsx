"use client"

import { Home, BookOpen, Trophy, User, LayoutDashboard, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"

export function BottomNav() {
  const pathname = usePathname()
  const { profile, isAuthenticated } = useAuth()
  const { t } = useLanguage()

  const studentNav = [
    { icon: Home, label: t("홈", "Home"), href: "/" },
    { icon: BookOpen, label: t("수업", "Lessons"), href: "/curriculum" },
    { icon: Users, label: t("내 반", "My Class"), href: "/join" },
    { icon: User, label: t("내정보", "Profile"), href: "/profile" },
  ]

  const teacherNav = [
    { icon: Home, label: t("홈", "Home"), href: "/" },
    { icon: BookOpen, label: t("수업", "Lessons"), href: "/curriculum" },
    { icon: LayoutDashboard, label: t("대시보드", "Dashboard"), href: "/teacher" },
    { icon: User, label: t("내정보", "Profile"), href: "/profile" },
  ]

  const guestNav = [
    { icon: Home, label: t("홈", "Home"), href: "/" },
    { icon: BookOpen, label: t("수업", "Lessons"), href: "/curriculum" },
    { icon: User, label: t("내정보", "Profile"), href: "/profile" },
  ]

  const navItems = !isAuthenticated
    ? guestNav
    : profile?.role === "teacher"
      ? teacherNav
      : studentNav

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white/95 backdrop-blur-sm z-50 safe-area-inset-bottom">
      <div className="container mx-auto flex justify-around px-2 py-2 md:py-3 max-w-2xl">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-colors rounded-lg px-4 py-2 min-w-[64px] min-h-[56px]",
                isActive ? "text-orange-600 bg-orange-50" : "text-gray-500 hover:text-orange-500 hover:bg-orange-50/50",
              )}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
