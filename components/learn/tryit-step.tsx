"use client"

import { Code, Trophy, Lightbulb, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import { PythonRunner } from "@/components/python/python-runner"
import { LessonStep } from "./types"

interface TryItStepProps {
  step: LessonStep
  isCompleted: boolean
  hintLevel: number
  onHintLevelChange: (level: number) => void
  onSuccess: () => void
}

export function TryItStep({ step, isCompleted, hintLevel, onHintLevelChange, onSuccess }: TryItStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={cn("px-3 py-1 rounded-full text-sm font-bold", step.type === "tryit" ? "bg-green-100 text-green-700" : "bg-purple-100 text-purple-700")}>
            {step.type === "tryit" && <><Code className="w-4 h-4 inline mr-1" />실습</>}
            {step.type === "mission" && <><Trophy className="w-4 h-4 inline mr-1" />미션</>}
          </span>
          {isCompleted && <span className="px-2 py-0.5 rounded text-xs bg-green-100 text-green-700 font-medium">✅ 완료!</span>}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{step.title}</h1>
        {!isCompleted && (
          <div className="space-y-2">
            {hintLevel === 0 && (
              <button onClick={() => onHintLevelChange(1)} className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                <Lightbulb className="w-4 h-4" /> 힌트 보기
              </button>
            )}
            {hintLevel >= 1 && step.hint && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-sm text-amber-800"><Lightbulb className="w-4 h-4 inline mr-1 text-amber-600" /> 힌트 1: {step.hint}</p>
                {hintLevel === 1 && step.hint2 && (
                  <button onClick={() => onHintLevelChange(2)} className="text-xs text-amber-600 hover:text-amber-700 mt-2 flex items-center gap-1">
                    <Eye className="w-3 h-3" /> 정답에 가까운 힌트 보기
                  </button>
                )}
              </div>
            )}
            {hintLevel >= 2 && step.hint2 && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <p className="text-sm text-orange-800 font-mono"><Eye className="w-4 h-4 inline mr-1 text-orange-600" /> 힌트 2: {step.hint2}</p>
              </div>
            )}
          </div>
        )}
      </div>
      <div>
        <PythonRunner initialCode={step.initialCode || ""} expectedOutput={step.type === "mission" ? step.expectedOutput : undefined} task={step.task} hint={step.hint} onSuccess={onSuccess} showExpectedOutput={step.type === "mission"} minHeight={step.type === "mission" ? "160px" : "140px"} />
      </div>
    </div>
  )
}
