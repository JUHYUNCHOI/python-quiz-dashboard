"use client"

import { LessonStep } from "./types"
import { InteractiveRenderer } from "./interactive-renderer"

interface InteractiveStepProps {
  step: LessonStep
  lang: "ko" | "en"
  onSuccess: () => void
}

export function InteractiveStep({ step, lang, onSuccess }: InteractiveStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <span className="px-3 py-1 rounded-full text-sm font-bold bg-purple-100 text-purple-700">🎮 체험</span>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{step.title}</h1>
      {step.description && <p className="text-gray-600">{step.description}</p>}
      <InteractiveRenderer step={step} lang={lang} onSuccess={onSuccess} />
    </div>
  )
}
