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
/* 파이썬 `#` 주석을 지운 코드만 돌려준다 — **따옴표 안의 `#` 은 주석이 아니다.**
   (`print(f"#{x}")` · `'#' * n` 을 주석으로 오판하면 멀쩡한 빈칸을 놓친다.)
   ⚠️ `scripts/check-step-solvable.py` 의 `code_only()` 와 **같은 규칙**이다. 같이 고쳐라. */
function codeWithoutComments(code: string): string {
  return code.split("\n").map(ln => {
    let q: string | null = null
    for (let i = 0; i < ln.length; i++) {
      const c = ln[i]
      if (q) {
        if (c === "\\") { i++; continue }
        if (c === q) q = null
      } else if (c === '"' || c === "'") {
        q = c
      } else if (c === "#") {
        return ln.slice(0, i)
      }
    }
    return ln
  }).join("\n")
}

/* ⛔ 2026-10-07 — 전에는 `initialCode.includes('___')` 하나였다. **주석인지 코드인지
     안 가려서**, 함수를 통째로 짜는 **자유 작성 미션이 빈칸 모드로 잘못 들어갔다.**
     학생이 채운 글자는 주석이라 **실행에 아무 영향이 없고**, 무엇을 써도 틀렸다고 나온다.
   실측(`python-qa`, 실행 채점 스텝 942개 전수):
     `lessons/lesson39/ch5.ts` 🏆 최종 미션 — 부르는 `회복()` 이 정의되지 않아 `NameError`
     `lesson19.ts` 실습 — 실제 `print()` 가 없어 **항상 빈 출력**
   둘 다 **영영 못 푸는** 상태였다. 그날 데이터는 고쳤지만, 여기를 안 고치면
   **다음에 누가 주석에 `___` 를 쓰면 또 난다.**
   ⚠️ 쓰는 곳은 `app/learn/[lessonId]` 뿐이다(복습은 `ReviewStepRenderer` 로 따로 간다 —
     이름이 비슷해 공용으로 오해하기 쉽다). */
  const hasBlanks = !!(step.initialCode && codeWithoutComments(step.initialCode).includes('___'))
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
