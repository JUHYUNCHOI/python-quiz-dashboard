"use client"

import { useState } from "react"
import { BookOpen, ChevronDown, ChevronUp, Eye } from "lucide-react"
import { LessonStep } from "./types"
import { renderContent } from "./render-content"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

interface ExplainStepProps {
  step: LessonStep
}

export function ExplainStep({ step }: ExplainStepProps) {
  const { t } = useLanguage()
  const [showReveal, setShowReveal] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <span className="px-3 py-1 rounded-full text-sm font-bold bg-blue-100 text-blue-700">
          <BookOpen className="w-4 h-4 inline mr-1" />{t("설명", "Explain")}
        </span>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{step.title}</h1>
      {step.content && <div className="space-y-3">{renderContent(step.content)}</div>}

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
