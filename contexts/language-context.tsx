"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, type TranslationKey } from './translations'

export type Language = 'ko' | 'en'

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  /** 인라인 번역: t("한국어", "English") */
  t: (ko: string, en: string) => string
  /** 키 기반 번역: tk("common.next") */
  tk: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('ko')

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language
    if (saved && (saved === 'ko' || saved === 'en')) {
      setLangState(saved)
    }
  }, [])

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    localStorage.setItem('language', newLang)
  }

  // 인라인 번역 헬퍼 (기존 호환)
  const t = (ko: string, en: string) => lang === 'ko' ? ko : en

  // 키 기반 번역 헬퍼
  const tk = (key: TranslationKey): string => {
    const entry = translations[key]
    return entry[lang]
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tk }}>
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
