"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function NotFound() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center p-6">
      <div className="text-center max-w-sm">
        <div className="text-8xl mb-6 animate-bounce inline-block">🦒</div>
        <h1 className="text-2xl font-black text-gray-800 mb-2">{t("페이지를 찾을 수 없어요", "Page Not Found")}</h1>
        <p className="text-gray-500 mb-8 text-sm leading-relaxed">
          {t("기린이 이 페이지를 아무리 목을 늘여도 찾을 수가 없대요.", "Even the giraffe's long neck couldn't find this page.")}<br />
          {t("주소를 확인해주세요.", "Please check the URL.")}
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-colors"
        >
          {t("홈으로 돌아가기", "Back to Home")}
        </Link>
        <p className="mt-4 text-xs text-gray-400">Error 404</p>
      </div>
    </div>
  )
}
