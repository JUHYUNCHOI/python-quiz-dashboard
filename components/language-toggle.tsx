"use client"

import { useLanguage } from '@/contexts/language-context'
import { cn } from '@/lib/utils'

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage()

  return (
    <div className={cn("flex items-center gap-1 bg-gray-100 rounded-full p-1", className)}>
      <button
        onClick={() => setLang('ko')}
        className={cn(
          "px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap",
          lang === 'ko'
            ? "bg-white text-indigo-600 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        )}
      >
        🇰🇷 <span className="hidden sm:inline">한국어</span><span className="sm:hidden">KO</span>
      </button>
      <button
        onClick={() => setLang('en')}
        className={cn(
          "px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap",
          lang === 'en'
            ? "bg-white text-indigo-600 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        )}
      >
        🇺🇸 <span className="hidden sm:inline">English</span><span className="sm:hidden">EN</span>
      </button>
    </div>
  )
}
