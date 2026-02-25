"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { registerAsTeacher } from "../actions"
import { Card } from "@/components/ui/card"
import { ShieldCheck, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TeacherRegisterPage() {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { isAuthenticated, profile, refreshProfile } = useAuth()
  const router = useRouter()

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <Card className="p-6 max-w-sm w-full text-center">
          <p className="text-gray-600 mb-4">선생님 등록을 위해 먼저 로그인해주세요.</p>
          <Link href="/login" className="text-orange-600 font-bold hover:underline">
            로그인하기
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
          <h2 className="text-lg font-bold mb-2">이미 선생님으로 등록되어 있어요!</h2>
          <Link href="/teacher" className="text-orange-600 font-bold hover:underline">
            대시보드로 가기
          </Link>
        </Card>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const result = await registerAsTeacher(code)

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
          <ArrowLeft className="w-4 h-4" /> 홈으로
        </Link>

        <div className="text-center mb-6">
          <ShieldCheck className="w-12 h-12 text-orange-500 mx-auto mb-3" />
          <h1 className="text-xl font-bold text-gray-800">선생님 등록</h1>
          <p className="text-sm text-gray-500 mt-1">등록 코드를 입력해주세요</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="등록 코드 입력"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-center text-lg tracking-widest"
            required
          />

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading || !code}
            className="w-full py-3 rounded-xl font-bold text-white bg-orange-500 hover:bg-orange-600 disabled:opacity-50 transition-all"
          >
            {isLoading ? "확인 중..." : "등록하기"}
          </button>
        </form>
      </Card>
    </div>
  )
}
