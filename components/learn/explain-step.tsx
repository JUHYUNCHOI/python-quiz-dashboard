"use client"

import { BookOpen } from "lucide-react"
import { LessonStep } from "./types"
import { renderContent } from "./render-content"

interface ExplainStepProps {
  step: LessonStep
}

export function ExplainStep({ step }: ExplainStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <span className="px-3 py-1 rounded-full text-sm font-bold bg-blue-100 text-blue-700">
          <BookOpen className="w-4 h-4 inline mr-1" />설명
        </span>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{step.title}</h1>
      {step.content && <div className="space-y-3">{renderContent(step.content)}</div>}
    </div>
  )
}
