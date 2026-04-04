"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { registerAsTeacher } from "../actions"
import { Card } from "@/components/ui/card"
import { ShieldCheck, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TeacherRegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showConfirm, setShowConfirm] = useState(false)
  const { isAuthenticated, isLoading: authLoading, profile, refreshProfile } = useAuth()
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
          <p className="text-gray-600 mb-4">{t("선생님 전환을 위해 먼저 로그인해주세요.", "Please login first.")}</p>
          <Link href="/login" className="text-orange-600 font-bold hover:underline">
            {t("로그인하기", "Login")}
          </Link>
        </Card>
      </div>
    )
  }

  if (profile?.role === "teacher") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <Card className="p-6 max-w-sm w-full text-center">
          <ShieldCheck className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <h2 className="text-lg font-bold mb-2">{t("이미 선생님으로 등록되어 있어요!", "You're already a teacher!")}</h2>
          <Link href="/teacher" className="text-orange-600 font-bold hover:underline">
            {t("대시보드로 가기", "Go to Dashboard")}
          </Link>
        </Card>
      </div>
    )
  }

  const handleRegister = async () => {
    setError("")
    setIsLoading(true)
    const result = await registerAsTeacher()
    if (result.error) {
      setError(result.error)
      setIsLoading(false)
    } else {
      await refreshProfile()
      router.push("/teacher")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <Card className="p-6 max-w-sm w-full">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4">
          <ArrowLeft className="w-4 h-4" /> {t("홈으로", "Home")}
        </Link>

        <div className="text-center mb-6">
          <div className="text-5xl mb-3">📋</div>
          <h1 className="text-xl font-bold text-gray-800">{t("선생님으로 전환", "Switch to Teacher")}</h1>
          <p className="text-sm text-gray-500 mt-2">
            {t(
              "선생님 계정으로 전환하면 반을 만들고\n학생 진도와 과제를 관리할 수 있어요.",
              "As a teacher, you can create classes\nand manage student progress."
            )}
          </p>
        </div>

        <div className="bg-orange-50 rounded-xl p-4 mb-4 space-y-2 text-sm text-gray-600">
          <div className="flex items-start gap-2">
            <span>✅</span>
            <span>{t("반 만들기 & 학생 초대", "Create classes & invite students")}</span>
          </div>
          <div className="flex items-start gap-2">
            <span>✅</span>
            <span>{t("레슨 진도 & 과제 현황 확인", "Track lesson progress & homework")}</span>
          </div>
          <div className="flex items-start gap-2">
            <span>✅</span>
            <span>{t("학부모 리포트 링크 생성", "Generate parent report links")}</span>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center mb-3">{error}</p>
        )}

        <button
          onClick={() => setShowConfirm(true)}
          disabled={isLoading}
          className="w-full py-3 rounded-xl font-bold text-white bg-orange-500 hover:bg-orange-600 disabled:opacity-50 transition-all"
        >
          {t("선생님으로 전환하기", "Switch to Teacher")}
        </button>

        {/* 확인 모달 */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <Card className="p-6 max-w-sm w-full space-y-4">
              <div className="text-center">
                <div className="text-4xl mb-2">⚠️</div>
                <h3 className="text-base font-black text-gray-800">{t("선생님으로 전환할까요?", "Switch to Teacher?")}</h3>
                <p className="text-sm text-gray-500 mt-2">
                  {t("이후 설정에서 되돌리기 어렵습니다. 정말 전환하시겠어요?", "This is hard to undo later. Are you sure?")}
                </p>
              </div>
              {error && <p className="text-sm text-red-500 text-center">{error}</p>}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 font-bold text-gray-600 hover:bg-gray-50"
                >
                  {t("취소", "Cancel")}
                </button>
                <button
                  onClick={handleRegister}
                  disabled={isLoading}
                  className="flex-1 py-2.5 rounded-xl font-bold text-white bg-orange-500 hover:bg-orange-600 disabled:opacity-50"
                >
                  {isLoading ? t("처리 중...", "Processing...") : t("전환하기", "Switch")}
                </button>
              </div>
            </Card>
          </div>
        )}
      </Card>
    </div>
  )
}
