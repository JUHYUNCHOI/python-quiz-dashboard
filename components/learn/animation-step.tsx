"use client"

import { TryExceptFlow, ErrorTypesCards } from "@/components/animations"
import { LessonStep } from "./types"
import { useLanguage } from "@/contexts/language-context"

interface AnimationStepProps {
  step: LessonStep
}

export function AnimationStep({ step }: AnimationStepProps) {
  const { t } = useLanguage()
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <span className="px-3 py-1 rounded-full text-sm font-bold bg-cyan-100 text-cyan-700">{t("🎬 애니메이션", "🎬 Animation")}</span>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{step.question || step.title}</h1>
      {step.instruction && <p className="text-gray-600 text-lg">{step.instruction}</p>}
      {step.animationType === "tryExceptFlow" && <TryExceptFlow />}
      {step.animationType === "errorTypes" && <ErrorTypesCards />}
    </div>
  )
}
