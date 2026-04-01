"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { joinClassByCode } from "../teacher/actions"
import { Card } from "@/components/ui/card"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Users, ArrowLeft, Check } from "lucide-react"
import Link from "next/link"

export default function JoinClassPage() {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [joinedCode, setJoinedCode] = useState("")
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-5xl animate-bounce">🦒</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <Card className="p-6 max-w-sm w-full text-center">
          <Users className="w-12 h-12 text-orange-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-4">{t("반에 참가하려면 먼저 로그인해주세요.", "Please login first to join a class.")}</p>
          <Link href="/login?returnTo=/join" className="text-orange-600 font-bold hover:underline">
            {t("로그인하기", "Login")}
          </Link>
        </Card>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const result = await joinClassByCode(code.trim())

    if (result.error) {
      setError(result.error)
      setIsLoading(false)
    } else {
      setJoinedCode(code.trim().toUpperCase())
      setSuccess(true)
      setTimeout(() => router.push("/curriculum"), 3000)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <Card className="p-6 max-w-sm w-full text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">{t("반 참가 완료! 🎉", "Joined! 🎉")}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {t(`코드 `, `Code `)}
              <span className="font-mono font-black text-orange-500">{joinedCode}</span>
              {t(" 반에 합류했어요", " class joined")}
            </p>
          </div>
          <button
            onClick={() => router.push("/curriculum")}
            className="w-full py-3 rounded-xl font-bold text-white bg-orange-500 hover:bg-orange-600 transition-all"
          >
            {t("학습 시작하기 →", "Start Learning →")}
          </button>
          <p className="text-xs text-gray-400">{t("잠시 후 자동으로 이동해요", "Auto-redirecting soon...")}</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50">
      <Header />
      <div className="flex items-center justify-center p-4 pb-28 pt-8">
      <Card className="p-6 max-w-sm w-full">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4">
          <ArrowLeft className="w-4 h-4" /> {t("홈으로", "Home")}
        </Link>

        <div className="text-center mb-6">
          <Users className="w-12 h-12 text-orange-500 mx-auto mb-3" />
          <h1 className="text-xl font-bold text-gray-800">{t("반 참가하기", "Join Class")}</h1>
          <p className="text-sm text-gray-500 mt-1">{t("선생님이 알려준 코드를 입력하세요", "Enter the code from your teacher")}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder={t("참가 코드 6자리", "6-digit join code")}
            maxLength={6}
            className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-center text-2xl font-mono font-bold tracking-[0.3em] uppercase"
            required
          />

          {error && (
            <div className="text-center space-y-1">
              <p className="text-sm text-red-500">{error}</p>
              <p className="text-xs text-gray-400">{t("선생님께 6자리 코드를 다시 확인해주세요", "Please ask your teacher for the 6-digit code")}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || code.length < 6}
            className="w-full py-3 rounded-xl font-bold text-white bg-orange-500 hover:bg-orange-600 disabled:opacity-50 transition-all"
          >
            {isLoading ? t("참가 중...", "Joining...") : t("참가하기", "Join")}
          </button>
        </form>
      </Card>
      </div>
      <BottomNav />
    </div>
  )
}
