"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { joinClassByCode } from "../teacher/actions"
import { Card } from "@/components/ui/card"
import { Users, ArrowLeft, Check } from "lucide-react"
import Link from "next/link"

export default function JoinClassPage() {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <Card className="p-6 max-w-sm w-full text-center">
          <Users className="w-12 h-12 text-orange-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-4">반에 참가하려면 먼저 로그인해주세요.</p>
          <Link href="/login" className="text-orange-600 font-bold hover:underline">
            로그인하기
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
      setSuccess(true)
      setTimeout(() => router.push("/curriculum"), 1500)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <Card className="p-6 max-w-sm w-full text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-1">참가 완료!</h2>
          <p className="text-sm text-gray-500">학습 페이지로 이동합니다...</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <Card className="p-6 max-w-sm w-full">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4">
          <ArrowLeft className="w-4 h-4" /> 홈으로
        </Link>

        <div className="text-center mb-6">
          <Users className="w-12 h-12 text-orange-500 mx-auto mb-3" />
          <h1 className="text-xl font-bold text-gray-800">반 참가하기</h1>
          <p className="text-sm text-gray-500 mt-1">선생님이 알려준 코드를 입력하세요</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="참가 코드 6자리"
            maxLength={6}
            className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-center text-2xl font-mono font-bold tracking-[0.3em] uppercase"
            required
          />

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading || code.length < 6}
            className="w-full py-3 rounded-xl font-bold text-white bg-orange-500 hover:bg-orange-600 disabled:opacity-50 transition-all"
          >
            {isLoading ? "참가 중..." : "참가하기"}
          </button>
        </form>
      </Card>
    </div>
  )
}
