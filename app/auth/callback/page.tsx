"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      const supabase = createClient()
      const { error } = await supabase.auth.exchangeCodeForSession(
        window.location.href
      )
      if (error) {
        router.replace("/login?error=auth_failed")
      } else {
        router.replace("/")
      }
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
