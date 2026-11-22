"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

/**
 * 밝은/어두운 테마 전환 버튼.
 *
 * 글자 없이 **해/달 하나**만 둔다 — 헤더 한 줄에 로고·언어토글·불꽃·티어·창고가
 * 이미 들어차 있어서(375px), 여기에 「다크 모드」라는 라벨을 더할 자리가 없다.
 * 대신 `title` 로 지금 상태를 말한다.
 *
 * 아이콘은 **지금 상태**가 아니라 **누르면 가는 곳**을 보여준다 — 밝을 때 달이
 * 뜨고, 어두울 때 해가 뜬다. 버튼은 결과를 예고하는 쪽이 덜 헷갈린다.
 *
 * `mounted` 가 필요한 이유: 테마는 localStorage 에 있어서 서버가 모른다.
 * 처음 그림을 서버 쪽과 다르게 그리면 hydration 이 깨지므로, 붙기 전엔
 * 자리만 잡아 둔다(크기 동일, 안 보임) — 그래야 헤더가 안 흔들린다.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const base = "flex items-center justify-center rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"

  if (!mounted) return <div className={cn(base, "invisible", className)} aria-hidden="true"><Moon className="h-5 w-5" /></div>

  const dark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      title={dark ? t("밝은 테마로", "Switch to light") : t("어두운 테마로", "Switch to dark")}
      aria-label={dark ? t("밝은 테마로", "Switch to light") : t("어두운 테마로", "Switch to dark")}
      className={cn(base, className)}
    >
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )
}
