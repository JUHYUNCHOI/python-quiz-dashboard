"use client"

/**
 * SiteFooter — 모든 페이지 공통 푸터.
 *
 * 광고 정책 요건: Privacy / Terms 가 모든 페이지에서 접근 가능해야 함.
 * Root layout 에 추가해 자동으로 모든 페이지 하단에 표시됨.
 *
 * 위치: bottom-nav (fixed) 위. BottomNav 가 있는 페이지에서도 스크롤 끝까지 가면
 * 푸터 보임. BottomNav 가 가리지 않도록 mb-16/mb-20 적당히 줌.
 */

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export function SiteFooter() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="mt-16 mb-20 sm:mb-6 border-t border-gray-200 bg-white/60">
      <div className="max-w-[1200px] mx-auto px-5 py-6 sm:py-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs sm:text-sm text-gray-500">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <span className="font-bold text-gray-700">{t("코드린", "Coderin")}</span>
          <span>© {year}</span>
        </div>
        <nav className="flex items-center justify-center sm:justify-end gap-4 sm:gap-6">
          <Link href="/privacy" className="hover:text-indigo-600 transition-colors">
            {t("개인정보처리방침", "Privacy")}
          </Link>
          <Link href="/terms" className="hover:text-indigo-600 transition-colors">
            {t("이용약관", "Terms")}
          </Link>
          <a
            href="mailto:julia.juhyun@gmail.com"
            className="hover:text-indigo-600 transition-colors"
          >
            {t("문의", "Contact")}
          </a>
        </nav>
      </div>
    </footer>
  )
}
