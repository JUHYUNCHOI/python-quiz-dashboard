"use client"

import { LessonStep } from "./types"
import { InteractiveRenderer } from "./interactive-renderer"
import { useLanguage } from "@/contexts/language-context"

interface InteractiveStepProps {
  step: LessonStep
  lang: "ko" | "en"
  onSuccess: () => void
}

export function InteractiveStep({ step, lang, onSuccess }: InteractiveStepProps) {
  const { t } = useLanguage()
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <span className="px-3 py-1 rounded-full text-sm font-bold bg-purple-100 text-purple-700">{t("🎮 체험", "🎮 Interactive")}</span>
      </div>
      {step.description && <p className="text-lg md:text-xl text-gray-800">{step.description}</p>}
      <InteractiveRenderer step={step} lang={lang} onSuccess={onSuccess} />
    </div>
  )
}
