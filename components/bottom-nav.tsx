"use client"

import { Home, BookOpen, User, LayoutDashboard, Puzzle, Brain, ClipboardList } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"

type NavItem = {
  icon: React.ComponentType<{ className?: string }>
  label: string
  href: string
  exact?: boolean
}

export function BottomNav() {
  const pathname = usePathname()
  const { profile, isAuthenticated } = useAuth()
  const { t } = useLanguage()

  const studentNav: NavItem[] = [
    { icon: Home,    label: t("홈", "Home"),         href: "/portal"     },
    { icon: BookOpen,label: t("수업", "Lessons"),    href: "/curriculum" },
    { icon: Brain,   label: t("연습", "Practice"),    href: "/quiz/setup" },
    { icon: Puzzle,  label: t("알고리즘", "Algo"),   href: "/algorithm"  },
    { icon: User,    label: t("내정보", "Profile"),  href: "/profile"    },
  ]

  const teacherNav: NavItem[] = [
    { icon: LayoutDashboard, label: t("대시보드", "Dashboard"), href: "/teacher", exact: true },
    { icon: BookOpen, label: t("수업", "Lessons"), href: "/curriculum" },
    { icon: ClipboardList, label: t("숙제", "Homework"), href: "/teacher/homework" },
    { icon: User, label: t("내정보", "Profile"), href: "/profile" },
  ]

  const guestNav: NavItem[] = [
    { icon: Home,     label: t("홈", "Home"),      href: "/"           },
    { icon: BookOpen, label: t("수업", "Lessons"),  href: "/curriculum" },
    { icon: Puzzle,   label: t("알고리즘", "Algo"),  href: "/algorithm"  },
    { icon: User,     label: t("내정보", "Profile"), href: "/profile"    },
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
          const isActive = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(item.href + "/")

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-colors rounded-lg px-2 py-2 min-w-[52px] min-h-[56px]",
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
