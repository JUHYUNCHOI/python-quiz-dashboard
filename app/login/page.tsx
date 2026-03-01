"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { Suspense } from "react"
import { Mail } from "lucide-react"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/contexts/language-context"

function LoginContent() {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailMode, setEmailMode] = useState<"login" | "signup">("login")
  const [emailError, setEmailError] = useState("")
  const [emailSuccess, setEmailSuccess] = useState("")
  const searchParams = useSearchParams()
  const error = searchParams.get("error")
  const { t } = useLanguage()

  const handleOAuthLogin = async (provider: "kakao" | "google") => {
    setIsLoading(provider)
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      console.error("Login error:", error)
      setIsLoading(null)
    }
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailError("")
    setEmailSuccess("")
    setIsLoading("email")

    const supabase = createClient()

    if (emailMode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) {
        setEmailError(error.message)
      } else {
        setEmailSuccess("확인 이메일을 보냈어요. 메일함을 확인해주세요!")
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        setEmailError(
          error.message === "Invalid login credentials"
            ? "이메일 또는 비밀번호가 틀렸어요"
            : error.message
        )
      } else {
        window.location.href = "/"
      }
    }

    setIsLoading(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-8">
        {/* 언어 선택 */}
        <div className="flex justify-center">
          <LanguageToggle />
        </div>

        {/* 로고 */}
        <div className="text-center">
          <div className="text-[80px] leading-none mb-2">🦒</div>
          <h1 className="text-2xl font-bold text-gray-800">{t("파이린", "Pyrin")}</h1>
          <p className="text-sm text-gray-500 mt-1">{t("재미있게 배우는 코딩", "Learn coding the fun way")}</p>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
            <p className="text-sm text-red-600">
              로그인에 실패했어요. 다시 시도해주세요.
            </p>
          </div>
        )}

        {/* 로그인 버튼들 */}
        <div className="space-y-3">
          {/* 구글 */}
          <button
            onClick={() => handleOAuthLogin("google")}
            disabled={!!isLoading}
            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl font-bold text-gray-700 bg-white border border-gray-200 transition-all hover:bg-gray-50 active:scale-[0.98] disabled:opacity-50"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M19.6 10.23c0-.68-.06-1.36-.17-2.02H10v3.83h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.89-1.74 2.98-4.3 2.98-7.33Z" fill="#4285F4"/>
              <path d="M10 20c2.7 0 4.96-.9 6.62-2.44l-3.24-2.5c-.9.6-2.04.95-3.38.95-2.6 0-4.8-1.76-5.58-4.12H1.08v2.58A9.99 9.99 0 0 0 10 20Z" fill="#34A853"/>
              <path d="M4.42 11.89A6.01 6.01 0 0 1 4.1 10c0-.66.11-1.3.32-1.89V5.53H1.08A9.99 9.99 0 0 0 0 10c0 1.61.39 3.14 1.08 4.47l3.34-2.58Z" fill="#FBBC05"/>
              <path d="M10 3.96c1.47 0 2.78.5 3.82 1.5l2.86-2.86C14.96.99 12.7 0 10 0A9.99 9.99 0 0 0 1.08 5.53l3.34 2.58C5.2 5.72 7.4 3.96 10 3.96Z" fill="#EA4335"/>
            </svg>
            {isLoading === "google" ? t("로그인 중...", "Signing in...") : t("Google로 시작하기", "Continue with Google")}
          </button>

          {/* 이메일 로그인 토글 */}
          {!showEmailForm ? (
            <button
              onClick={() => setShowEmailForm(true)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-gray-500 bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-all"
            >
              <Mail className="w-4 h-4" />
              {t("이메일로 로그인", "Sign in with email")}
            </button>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
              <div className="flex gap-2 mb-1">
                <button
                  onClick={() => { setEmailMode("login"); setEmailError("") }}
                  className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    emailMode === "login" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {t("로그인", "Login")}
                </button>
                <button
                  onClick={() => { setEmailMode("signup"); setEmailError("") }}
                  className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    emailMode === "signup" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {t("회원가입", "Sign up")}
                </button>
              </div>

              <form onSubmit={handleEmailAuth} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("이메일", "Email")}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                  required
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("비밀번호 (6자 이상)", "Password (min 6 chars)")}
                  minLength={6}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                  required
                />

                {emailError && (
                  <p className="text-xs text-red-500">{emailError}</p>
                )}
                {emailSuccess && (
                  <p className="text-xs text-green-600">{emailSuccess}</p>
                )}

                <button
                  type="submit"
                  disabled={!!isLoading}
                  className="w-full py-2.5 rounded-lg font-bold text-white bg-orange-500 hover:bg-orange-600 disabled:opacity-50 transition-all text-sm"
                >
                  {isLoading === "email"
                    ? t("처리 중...", "Processing...")
                    : emailMode === "login" ? t("로그인", "Login") : t("회원가입", "Sign up")
                  }
                </button>
              </form>
            </div>
          )}

          {/* 둘러보기 */}
          <Link
            href="/"
            className="block w-full text-center px-6 py-3 rounded-xl font-medium text-gray-500 bg-white border border-gray-200 hover:bg-gray-50 transition-all"
          >
            {t("로그인 없이 둘러보기", "Browse without login")}
          </Link>
        </div>

        <p className="text-xs text-center text-gray-400">
          {t(
            "로그인하면 학습 기록이 저장되고\n다른 기기에서도 이어할 수 있어요",
            "Sign in to save your progress\nand continue on any device"
          ).split('\n').map((line, i) => (
            <span key={i}>{line}{i === 0 && <br />}</span>
          ))}
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-[80px]">🦒</div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}
