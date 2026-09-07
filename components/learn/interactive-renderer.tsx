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
  //
  // ⚠️ props 가 없는 항목에도 lang 은 넘긴다. 2026-09-07 이전엔 `: {}` 였고,
  //    그 결과 lang 을 제대로 처리하는 컴포넌트인데도 레지스트리에 props 한 줄이
  //    없다는 이유로 영어 트랙 학생이 한국어 화면을 봤다. 레지스트리 133개 중
  //    props 를 쓴 건 66개뿐이었고, 나머지에 묻혀 있던 게 54개다 —
  //    syntax-builder(빌더 44개, ko/en 277쌍이 이미 다 있었다) 포함.
  //    lang 을 안 받는 컴포넌트에 이 prop 이 가도 그냥 무시된다.
  const entry = registry[componentName]
  const extraProps = entry?.props ? entry.props(step, lang, onSuccess) : { lang }

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
