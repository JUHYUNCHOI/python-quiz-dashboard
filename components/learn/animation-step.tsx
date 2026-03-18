"use client"

import { useState, useEffect, type ComponentType } from "react"
import { TryExceptFlow, ErrorTypesCards } from "@/components/animations"
import { LessonStep } from "./types"
import { useLanguage } from "@/contexts/language-context"
import registry from "./component-registry"

interface AnimationStepProps {
  step: LessonStep
}

export function AnimationStep({ step }: AnimationStepProps) {
  const { t, lang } = useLanguage()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [DynamicComponent, setDynamicComponent] = useState<ComponentType<any> | null>(null)

  // 레지스트리 기반 동적 로드
  useEffect(() => {
    if (!step.component) {
      setDynamicComponent(null)
      return
    }
    const entry = registry[step.component]
    if (!entry) return

    let cancelled = false
    entry.load().then((mod) => {
      if (cancelled) return
      const m = mod as Record<string, any>
      const Comp = entry.exportName ? m[entry.exportName] : m.default
      if (Comp) setDynamicComponent(() => Comp)
    }).catch(() => {})
    return () => { cancelled = true }
  }, [step.component])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <span className="px-3 py-1 rounded-full text-sm font-bold bg-cyan-100 text-cyan-700">{t("🎬 애니메이션", "🎬 Animation")}</span>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{step.question || step.title}</h1>
      {step.instruction && <p className="text-gray-600 text-lg">{step.instruction}</p>}
      {step.description && <p className="text-gray-600 text-lg">{step.description}</p>}

      {/* 레지스트리 기반 컴포넌트 */}
      {DynamicComponent && (
        <div className="rounded-xl overflow-hidden bg-white border border-gray-200 p-4">
          <DynamicComponent lang={lang} onSuccess={() => {}} />
        </div>
      )}

      {/* 레거시 하드코딩 (기존 레슨 호환) */}
      {step.animationType === "tryExceptFlow" && <TryExceptFlow />}
      {step.animationType === "errorTypes" && <ErrorTypesCards />}
    </div>
  )
}
