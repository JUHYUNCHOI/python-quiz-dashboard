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
          "px-3 py-1 rounded-full text-sm font-medium transition-all",
          lang === 'ko' 
            ? "bg-white text-indigo-600 shadow-sm" 
            : "text-gray-500 hover:text-gray-700"
        )}
      >
        🇰🇷 한국어
      </button>
      <button
        onClick={() => setLang('en')}
        className={cn(
          "px-3 py-1 rounded-full text-sm font-medium transition-all",
          lang === 'en' 
            ? "bg-white text-indigo-600 shadow-sm" 
            : "text-gray-500 hover:text-gray-700"
        )}
      >
        🇺🇸 English
      </button>
    </div>
  )
}
