"use client"

import { useState } from "react"
import { Code, Trophy, Lightbulb, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import { PythonRunner } from "@/components/python/python-runner"
import { BlankCodeRunner } from "@/components/python/blank-code-runner"
import { LessonStep } from "./types"
import { useLanguage } from "@/contexts/language-context"
import { renderInlineMarkdown } from "./render-content"

interface TryItStepProps {
  step: LessonStep
  isCompleted: boolean
  hintLevel: number
  onHintLevelChange: (level: number) => void
  onSuccess: () => void
  /* 건너뛰기용 — 완료 처리만 하고 "맞혔다" 로는 안 친다.
     그래야 "나중에 다시 풀기" 목록에 남는다 (client-page.tsx:643 recordResolveLaterIfNeeded). */
  onUnlock?: () => void
  lessonId?: string
}

export function TryItStep({ step, isCompleted, hintLevel, onHintLevelChange, onSuccess, onUnlock, lessonId }: TryItStepProps) {
  /* 2026-09-06: 빈칸 없는 스텝의 힌트 게이트.
     어제 `attempts >= 1` 을 BlankCodeRunner 에만 걸었는데, 빈칸이 없으면
     PythonRunner 로 가고 힌트 UI 는 **여기서** 따로 그린다 — 거기엔 조건이 없어서
     한 글자도 안 쓰고 두 번 클릭이면 hint2(= 정답 전문)가 나왔다.
     pedagogy-reviewer 가 mission 승격 검토 중에 찾았다.
     "처음부터 쓰기" 를 mission 으로 올려도 답이 두 클릭 거리면 의미가 없다. */
  const [attempts, setAttempts] = useState(0)
  const hasBlanks = !!(step.initialCode && step.initialCode.includes('___'))
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={cn("px-3 py-1 rounded-full text-sm font-bold", step.type === "tryit" ? "bg-green-100 text-green-700" : "bg-purple-100 text-purple-700")}>
            {step.type === "tryit" && <><Code className="w-4 h-4 inline mr-1" />{t("실습", "Practice")}</>}
            {step.type === "mission" && <><Trophy className="w-4 h-4 inline mr-1" />{t("미션", "Mission")}</>}
          </span>
          {isCompleted && <span className="px-2 py-0.5 rounded text-xs bg-green-100 text-green-700 font-medium">{t("✅ 완료!", "✅ Done!")}</span>}
        </div>
        {/* 빈칸 모드가 아닐 때만 외부 힌트 UI 표시 (BlankCodeRunner는 자체 힌트 시스템 사용) */}
        {!hasBlanks && !isCompleted && (
          <div className="space-y-2">
            {hintLevel === 0 && (
              <button onClick={() => onHintLevelChange(1)} className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1">
                <Lightbulb className="w-4 h-4" /> {t("힌트 보기", "Show Hint")}
              </button>
            )}
            {hintLevel >= 1 && step.hint && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-sm text-amber-800"><Lightbulb className="w-4 h-4 inline mr-1 text-amber-600" /> {t("힌트 1: ", "Hint 1: ")}{renderInlineMarkdown(step.hint, "h1-")}</p>
                {hintLevel === 1 && step.hint2 && (
                  attempts >= 1 ? (
                    <button onClick={() => onHintLevelChange(2)} className="text-xs text-amber-600 hover:text-amber-700 mt-2 flex items-center gap-1">
                      <Eye className="w-3 h-3" /> {t("정답에 가까운 힌트 보기", "Show answer hint")}
                    </button>
                  ) : (
                    <p className="text-xs text-amber-500 mt-2 flex items-center gap-1" style={{ wordBreak: "keep-all", textWrap: "balance" }}>
                      <Eye className="w-3 h-3" />
                      {t("한 번 써서 실행해보면 다음 힌트가 열려요", "Write something and run once to unlock the next hint")}
                    </p>
                  )
                )}
              </div>
            )}
            {hintLevel >= 2 && step.hint2 && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <p className="text-sm text-orange-800 font-mono whitespace-pre-wrap"><Eye className="w-4 h-4 inline mr-1 text-orange-600" /> {t("힌트 2: ", "Hint 2: ")}{step.hint2}</p>
              </div>
            )}
          </div>
        )}
      </div>
      <div>
        {hasBlanks ? (
          <BlankCodeRunner
            key={step.id}
            storageKey={lessonId ? `${lessonId}-${step.id}` : step.id}
            initialCode={step.initialCode || ""}
            expectedOutput={step.expectedOutput}
            stdin={step.stdin}
            task={step.task}
            hint={step.hint}
            hint2={step.hint2}
            choices={step.choices}
            onSuccess={onSuccess}
            onSkip={onUnlock}
            minHeight={step.type === "mission" ? "140px" : "100px"}
            isStepDone={isCompleted}
          />
        ) : (
          <PythonRunner
            key={step.id}
            storageKey={lessonId ? `${lessonId}-${step.id}` : step.id}
            initialCode={step.initialCode || ""}
            expectedOutput={step.expectedOutput}
            stdin={step.stdin}
            task={step.task}
            hint={step.hint}
            onSuccess={onSuccess}
            onAttempt={() => setAttempts((a: number) => a + 1)}
            showExpectedOutput={step.type === "mission"}
            minHeight={step.type === "mission" ? "140px" : "100px"}
            requireCodeChange={false}
            isStepDone={isCompleted}
            requireCorrect={step.type === "mission"}
          />
        )}
      </div>
    </div>
  )
}
