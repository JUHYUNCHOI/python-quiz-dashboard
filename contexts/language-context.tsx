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
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      // 우선순위: URL ?lang=en > localStorage > 기본값(ko)
      // 영어 광고로 유입된 사용자 대응 — 광고 URL 에 ?lang=en 붙여서 첫 화면부터 영어로 보여줌.
      let resolved: Language | null = null

      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search)
        const fromUrl = params.get('lang')
        if (fromUrl === 'ko' || fromUrl === 'en') {
          resolved = fromUrl
          // 한 번 받은 후엔 localStorage 에 박아둠 → 다음 페이지부터도 유지
          try { localStorage.setItem('language', resolved) } catch {}
        }
      }

      if (!resolved) {
        const saved = localStorage.getItem('language') as Language
        if (saved === 'ko' || saved === 'en') resolved = saved
      }

      if (resolved) setLangState(resolved)
    } catch {
      // localStorage 접근 불가 시 기본값(ko) 유지
    }
    setIsLoaded(true)
  }, [])

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    try { localStorage.setItem('language', newLang) } catch {}

    // Supabase에도 저장 (로그인 상태일 때)
    syncLangToSupabase(newLang)
  }

  // 인라인 번역 헬퍼 (기존 호환)
  const t = (ko: string, en: string) => lang === 'ko' ? ko : en

  // 키 기반 번역 헬퍼
  const tk = (key: TranslationKey): string => {
    const entry = translations[key]
    return entry[lang]
  }

  // localStorage에서 언어 설정 로드될 때까지 렌더링 방지 (깜빡임 방지)
  if (!isLoaded) return null

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

// Supabase 동기화 (AuthProvider 없이 동작해야 하므로 직접 호출)
async function syncLangToSupabase(lang: Language) {
  try {
    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase.from('user_preferences').upsert({
      user_id: user.id,
      language: lang,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' })
  } catch {
    // 실패 시 무시
  }
}
