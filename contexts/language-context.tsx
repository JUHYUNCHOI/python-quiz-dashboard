"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'ko' | 'en'

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (ko: string, en: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('ko')

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language
    if (saved) setLangState(saved)
  }, [])

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    localStorage.setItem('language', newLang)
  }

  // 간단한 번역 헬퍼
  const t = (ko: string, en: string) => lang === 'ko' ? ko : en

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
