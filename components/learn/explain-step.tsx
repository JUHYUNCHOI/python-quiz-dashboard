"use client"

import { useState, useEffect, type ComponentType } from "react"
import { BookOpen, ChevronDown, ChevronUp, Eye } from "lucide-react"
import { LessonStep } from "./types"
import { renderContent } from "./render-content"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"
import registry from "./component-registry"

interface ExplainStepProps {
  step: LessonStep
}

export function ExplainStep({ step }: ExplainStepProps) {
  const { t, lang } = useLanguage()
  const [showReveal, setShowReveal] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [AnimComp, setAnimComp] = useState<ComponentType<any> | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [AnimComp2, setAnimComp2] = useState<ComponentType<any> | null>(null)

  // 첫 번째 컴포넌트 동적 로드
  useEffect(() => {
    if (!step.component) { setAnimComp(null); return }
    const entry = registry[step.component]
    if (!entry) return
    let cancelled = false
    entry.load().then((mod) => {
      if (cancelled) return
      const m = mod as Record<string, any>
      const Comp = entry.exportName ? m[entry.exportName] : m.default
      if (Comp) setAnimComp(() => Comp)
    }).catch(() => {})
    return () => { cancelled = true }
  }, [step.component])

  // 두 번째 컴포넌트 동적 로드 (선택적)
  useEffect(() => {
    if (!step.component2) { setAnimComp2(null); return }
    const entry = registry[step.component2]
    if (!entry) return
    let cancelled = false
    entry.load().then((mod) => {
      if (cancelled) return
      const m = mod as Record<string, any>
      const Comp = entry.exportName ? m[entry.exportName] : m.default
      if (Comp) setAnimComp2(() => Comp)
    }).catch(() => {})
    return () => { cancelled = true }
  }, [step.component2])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <span className="px-3 py-1 rounded-full text-sm font-bold bg-blue-100 text-blue-700">
          <BookOpen className="w-4 h-4 inline mr-1" />{t("설명", "Explain")}
        </span>
      </div>

      {/* 본문 설명 먼저 → 이해한 뒤 애니메이션으로 확인 (자연스러운 이야기 흐름) */}
      {step.content && <div className="text-lg md:text-xl space-y-3">{renderContent(step.content)}</div>}

      {AnimComp && (
        <div className="rounded-xl overflow-hidden">
          <AnimComp lang={lang} onSuccess={() => {}} />
        </div>
      )}

      {AnimComp2 && (
        <div className="rounded-xl overflow-hidden">
          <AnimComp2 lang={lang} onSuccess={() => {}} />
        </div>
      )}

      {/* 답 보기 접이식 영역 */}
      {step.reveal && (
        <div className="mt-4">
          <button
            onClick={() => setShowReveal(!showReveal)}
            className={cn(
              "w-full py-3 px-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2",
              showReveal
                ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                : "bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600 shadow-md hover:shadow-lg"
            )}
          >
            <Eye className="w-5 h-5" />
            {showReveal ? t("답 숨기기", "Hide Answer") : t("답 보기", "Show Answer")}
            {showReveal ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {showReveal && (
            <div className="mt-3 p-4 md:p-5 bg-amber-50 border-2 border-amber-200 rounded-2xl space-y-3 animate-fade-in">
              {renderContent(step.reveal)}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
