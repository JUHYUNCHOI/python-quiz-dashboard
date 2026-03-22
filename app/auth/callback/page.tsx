"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    let handled = false
    const handleCallback = async () => {
      if (handled) return
      handled = true

      const supabase = createClient()

      // 네이티브 앱: 시스템 브라우저에서 돌아왔을 때 딥링크로 세션 처리
      try {
        const { Capacitor } = await import("@capacitor/core")
        if (Capacitor.isNativePlatform()) {
          const { App } = await import("@capacitor/app")
          const { Browser } = await import("@capacitor/browser")

          // 시스템 브라우저 닫기
          await Browser.close()

          // 딥링크 URL에서 코드 교환
          App.addListener("appUrlOpen", async ({ url }: { url: string }) => {
            const { error } = await supabase.auth.exchangeCodeForSession(url)
            if (error) {
              router.replace("/login?error=auth_failed")
              return
            }
            const raw = sessionStorage.getItem("loginReturnTo")
            sessionStorage.removeItem("loginReturnTo")
            const returnTo = raw && raw.startsWith("/") && !raw.startsWith("//") ? raw : "/"
            router.replace(returnTo)
          })
          return
        }
      } catch {
        // Capacitor 없는 환경(웹)이면 아래 웹 처리로 진행
      }

      // 웹: URL의 code를 세션으로 교환
      const { error } = await supabase.auth.exchangeCodeForSession(
        window.location.href
      )

      if (error) {
        // StrictMode 더블 렌더링 등으로 코드 재사용 시 세션이 이미 있을 수 있음
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          router.replace("/login?error=auth_failed")
          return
        }
      }

      const raw = sessionStorage.getItem("loginReturnTo")
      sessionStorage.removeItem("loginReturnTo")
      const returnTo = raw && raw.startsWith("/") && !raw.startsWith("//") ? raw : "/"
      router.replace(returnTo)
    }
    handleCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-mint-50">
      <div className="text-center">
        <div className="text-[60px] animate-bounce mb-4">🦒</div>
        <p className="text-gray-600 font-medium">로그인 처리 중...</p>
      </div>
    </div>
  )
}
