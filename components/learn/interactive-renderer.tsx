"use client"

import React, { useEffect, useState } from "react"
import registry from "./component-registry"
import { LessonStep } from "./types"
import { useLanguage } from "@/contexts/language-context"

interface InteractiveRendererProps {
  step: LessonStep
  lang: "ko" | "en"
  onSuccess: () => void
}

export function InteractiveRenderer({ step, lang, onSuccess }: InteractiveRendererProps) {
  const { t } = useLanguage()
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null)
  const [error, setError] = useState<string | null>(null)

  const componentName = step.component

  useEffect(() => {
    setComponent(null)
    setError(null)

    if (!componentName) return

    const entry = registry[componentName]
    if (!entry) {
      setError(t(`알 수 없는 컴포넌트: "${componentName}"`, `Unknown component: "${componentName}"`))
      return
    }

    let cancelled = false

    entry.load()
      .then((mod) => {
        if (cancelled) return
        // named export 또는 default export
        const Comp = entry.exportName
          ? (mod as any)[entry.exportName]
          : (mod as any).default
        
        if (!Comp) {
          setError(t(`"${entry.exportName || 'default'}" export를 찾을 수 없습니다`, `Cannot find "${entry.exportName || 'default'}" export`))
          return
        }
        setComponent(() => Comp)
      })
      .catch((err) => {
        if (!cancelled) {
          setError(t(`로딩 실패: ${err.message}`, `Loading failed: ${err.message}`))
        }
      })

    return () => { cancelled = true }
  }, [componentName])

  if (!componentName) return null

  if (error) {
    return (
      <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 text-red-700 text-sm">
        ⚠️ {error}
      </div>
    )
  }

  if (!Component) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full" />
        <span className="ml-2 text-gray-500 text-sm">{t("로딩 중...", "Loading...")}</span>
      </div>
    )
  }

  // 레지스트리에서 props 매핑
  const entry = registry[componentName]
  const extraProps = entry?.props ? entry.props(step, lang, onSuccess) : {}

  return <Component {...extraProps} />
}

// animation 타입 렌더러 (Lesson 34 호환용)
export function AnimationRenderer({ step }: { step: LessonStep }) {
  const componentName = step.animationType
  if (!componentName) return null

  const entry = registry[componentName]
  if (!entry) return null

  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null)

  useEffect(() => {
    let cancelled = false
    entry.load().then((mod) => {
      if (cancelled) return
      const Comp = entry.exportName ? (mod as any)[entry.exportName] : (mod as any).default
      if (Comp) setComponent(() => Comp)
    })
    return () => { cancelled = true }
  }, [componentName])

  if (!Component) return null
  return <Component />
}
