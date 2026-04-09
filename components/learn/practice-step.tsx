"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { Keyboard, Copy, CheckCheck, Lightbulb, Eye, X, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { LessonStep } from "./types"
import { CodeBlock } from "@/components/ui/code-block"
import { renderContent } from "./render-content"
import { motion, AnimatePresence } from "framer-motion"
import { CppRunner } from "@/components/cpp/cpp-runner"

interface PracticeStepProps {
  step: LessonStep
  lang?: "ko" | "en"
  onSuccess?: () => void
  onUnlock?: () => void  // 3회 실패 시: XP 없이 다음만 활성화
  lessonId?: string
  userId?: string
  isCompleted?: boolean
}

function extractSkeleton(_code: string): string {
  return `#include <iostream>
using namespace std;

int main() {

    return 0;
}`
}

export function PracticeStep({ step, lang = "ko", onSuccess, onUnlock, lessonId, userId, isCompleted = false }: PracticeStepProps) {
  const [done, setDone] = useState(false)
  const [failCount, setFailCount] = useState(0)
  const [hintOpen, setHintOpen] = useState(false)
  const [showSkeleton, setShowSkeleton] = useState(false)
  const [copiedSkeleton, setCopiedSkeleton] = useState(false)
  const [copiedFull, setCopiedFull] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    setDone(false)
    setFailCount(0)
    setHintOpen(false)
    setShowSkeleton(false)
    setCopiedSkeleton(false)
    setCopiedFull(false)
  }, [step.id])

  useEffect(() => {
    if (isCompleted) setDone(true)
  }, [isCompleted, step.id])

  const isEn = lang === "en"
  const skeleton = step.starterCode ?? step.initialCode ?? (step.code ? extractSkeleton(step.code) : "")
  const hasExpected = !!step.expectedOutput
  const hintLevel = Math.min(failCount, 3)

  const handleCopySkeleton = async () => {
    await navigator.clipboard.writeText(skeleton)
    setCopiedSkeleton(true)
    setTimeout(() => setCopiedSkeleton(false), 2000)
  }

  const handleCopyFull = async () => {
    await navigator.clipboard.writeText(step.code!)
    setCopiedFull(true)
    setTimeout(() => setCopiedFull(false), 2000)
  }

  const handleRunSuccess = () => {
    setDone(true)
    setHintOpen(false)
    onSuccess?.()
  }

  const handleRunError = () => {
    const next = failCount + 1
    setFailCount(next)
    setHintOpen(true)
    if (next >= 3) {
      setDone(true)   // 완료 UI 표시
      onUnlock?.()    // XP 없이 다음 버튼만 활성화
    }
  }

  const hintColor = hintLevel === 1
    ? { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-800", badge: "text-amber-700 border-amber-300 bg-amber-50" }
    : hintLevel === 2
    ? { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-800", badge: "text-orange-700 border-orange-300 bg-orange-50" }
    : { bg: "bg-red-50", border: "border-red-200", text: "text-red-800", badge: "text-red-700 border-red-300 bg-red-50" }

  return (
    <>
      <div className="space-y-4 md:space-y-5">

        {/* 배지 + 제목 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-sm font-bold bg-teal-100 text-teal-700">
              <Keyboard className="w-4 h-4 inline mr-1" />
              {isEn ? "Try It Yourself" : "직접 해보기"}
            </span>
            {/* 힌트 버튼 — 실패 후 표시 */}
            {failCount > 0 && !done && (
              <button
                onClick={() => setHintOpen(true)}
                className={cn(
                  "flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border transition-colors",
                  hintColor.badge
                )}
              >
                💡 {isEn ? `Hint ${hintLevel}` : `힌트 ${hintLevel}`}
              </button>
            )}
          </div>
          <h1 className="text-xl md:text-3xl font-bold text-gray-900">{step.title}</h1>
        </div>

        {/* 과제 설명 */}
        {step.content && (
          <div className="space-y-2">{renderContent(step.content)}</div>
        )}

        {/* 에디터 */}
        <CppRunner
          key={step.id + (skeleton ?? "")}
          initialCode={skeleton || `#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}`}
          expectedOutput={step.expectedOutput}
          stdin={step.stdin}
          onSuccess={handleRunSuccess}
          onError={handleRunError}
          isEn={isEn}
          submissionMode={!!userId}
          lessonId={lessonId}
          stepId={step.id}
          stepTitle={step.title}
          userId={userId}
          isCompleted={done}
        />

        {/* expectedOutput 없는 경우 — 자유 완료 */}
        {!done && !hasExpected && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => { setDone(true); onSuccess?.() }}
            className="w-full py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-teal-400 to-cyan-500 shadow-md"
          >
            {isEn ? "✅ Done!" : "✅ 다했어요!"}
          </motion.button>
        )}

        {/* 완료 상태 */}
        {done && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="w-full py-4 rounded-xl text-base font-bold text-center text-teal-700 bg-teal-50 border-2 border-teal-200">
              {isEn ? "✅ Great job! Move on →" : "✅ 잘했어요! 다음으로 넘어가세요 →"}
            </div>
          </motion.div>
        )}
      </div>

      {/* ── 힌트 Bottom Sheet ── */}
      {mounted && createPortal(
        <AnimatePresence>
          {hintOpen && (
            <>
              {/* 백드롭 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setHintOpen(false)}
                className="fixed inset-0 bg-black/40 z-40"
              />

              {/* 시트 */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl max-h-[80vh] flex flex-col"
              >
                {/* 핸들 */}
                <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
                  <div className="w-10 h-1 rounded-full bg-gray-300" />
                </div>

                {/* 헤더 */}
                <div className={cn("flex items-center justify-between px-4 py-3 border-b flex-shrink-0", hintColor.border)}>
                  <div className="flex items-center gap-2">
                    {hintLevel <= 2
                      ? <Lightbulb className={cn("w-5 h-5", hintLevel === 1 ? "text-amber-500" : "text-orange-500")} />
                      : <Eye className="w-5 h-5 text-red-500" />
                    }
                    <span className={cn("font-bold text-base", hintColor.text)}>
                      {hintLevel === 1 && (isEn ? "Hint — Approach" : "힌트 — 접근 방법")}
                      {hintLevel === 2 && (isEn ? "Hint — Code Skeleton" : "힌트 — 코드 뼈대")}
                      {hintLevel >= 3 && (isEn ? "Answer Code" : "정답 코드")}
                    </span>
                  </div>
                  <button onClick={() => setHintOpen(false)} className="p-1 rounded-full hover:bg-gray-100">
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {/* 힌트 내용 */}
                <div className="overflow-y-auto flex-1 px-4 py-4 space-y-4">

                  {/* 힌트 텍스트 — 레벨 1, 2 */}
                  {hintLevel <= 2 && (
                    <p className={cn("text-base leading-relaxed", hintColor.text)}>
                      {step.hint || (isEn
                        ? "Think about what variables you need and which loop structure fits best."
                        : "어떤 변수가 필요한지, 어떤 반복문 구조가 맞는지 생각해보세요.")}
                    </p>
                  )}

                  {/* 코드 뼈대 — 레벨 2 */}
                  {hintLevel === 2 && skeleton && (
                    <div>
                      <button
                        onClick={() => setShowSkeleton(!showSkeleton)}
                        className="w-full flex items-center justify-between px-3 py-2.5 bg-orange-100 rounded-xl text-sm text-orange-800 font-bold mb-2"
                      >
                        <span>{isEn ? "Show starter code" : "시작 코드 보기"}</span>
                        <ChevronRight className={cn("w-4 h-4 transition-transform", showSkeleton && "rotate-90")} />
                      </button>
                      {showSkeleton && (
                        <div className="relative rounded-xl overflow-hidden">
                          <CodeBlock code={skeleton} language="cpp" />
                          <button
                            onClick={handleCopySkeleton}
                            className="absolute top-2 right-2 px-2 py-1 rounded text-xs bg-white/90 text-gray-600 border border-gray-200 flex items-center gap-1"
                          >
                            {copiedSkeleton ? <CheckCheck className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {copiedSkeleton ? (isEn ? "Copied!" : "복사됨!") : (isEn ? "Copy" : "복사")}
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 정답 코드 — 레벨 3: 바로 펼쳐서 표시 */}
                  {hintLevel >= 3 && step.code && (
                    <div className="relative rounded-xl overflow-hidden">
                      <CodeBlock code={step.code} language="cpp" />
                      <button
                        onClick={handleCopyFull}
                        className="absolute top-2 right-2 px-2 py-1 rounded text-xs bg-white/90 text-gray-600 border border-gray-200 flex items-center gap-1"
                      >
                        {copiedFull ? <CheckCheck className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copiedFull ? (isEn ? "Copied!" : "복사됨!") : (isEn ? "Copy" : "복사")}
                      </button>
                    </div>
                  )}
                </div>

                {/* 하단 버튼 */}
                <div className="px-4 py-4 border-t border-gray-100 flex-shrink-0 space-y-2">
                  {/* 레벨 1, 2: 닫고 다시 시도 */}
                  {hintLevel <= 2 && (
                    <button
                      onClick={() => setHintOpen(false)}
                      className="w-full py-3.5 rounded-xl text-base font-bold bg-teal-600 text-white hover:bg-teal-500"
                    >
                      {isEn ? "Got it — try again!" : "알겠어요, 다시 해볼게요!"}
                    </button>
                  )}
                  {/* 레벨 3: 정답 확인 후 넘어가기 (크게) */}
                  {hintLevel >= 3 && (
                    <>
                      <button
                        onClick={() => setHintOpen(false)}
                        className="w-full py-3.5 rounded-xl text-base font-bold bg-teal-600 text-white hover:bg-teal-500"
                      >
                        {isEn ? "Got it — try again!" : "이해했어요, 다시 써볼게요!"}
                      </button>
                      <button
                        onClick={() => { setDone(true); setHintOpen(false); onSuccess?.() }}
                        className="w-full py-3.5 rounded-xl text-base font-bold bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200"
                      >
                        {isEn ? "→ Move to next problem" : "→ 다음 문제로 넘어갈게요"}
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
