"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { Keyboard, Copy, CheckCheck, Eye, Lightbulb, X, ChevronRight } from "lucide-react"
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
}

function normalize(s: string) {
  return s.trim().replace(/\s+/g, " ").toLowerCase()
}

function extractSkeleton(code: string): string {
  const lines = code.split("\n")
  const skeleton: string[] = []
  let inMain = false
  let depth = 0
  let skippedLogic = false
  for (const line of lines) {
    const trimmed = line.trim()
    if (!inMain && (trimmed.startsWith("#") || trimmed.startsWith("using") || trimmed === "")) {
      skeleton.push(line); continue
    }
    if (!inMain && trimmed.includes("main(")) {
      inMain = true; skeleton.push(line); depth = 1; continue
    }
    if (inMain) {
      depth += (line.match(/\{/g) || []).length
      depth -= (line.match(/\}/g) || []).length
      if (depth === 0 || trimmed === "return 0;" || trimmed === "}") {
        if (!skippedLogic) { skeleton.push("    // 👉 여기에 코드를 작성하세요"); skippedLogic = true }
        skeleton.push(line)
      }
    }
  }
  return skeleton.join("\n")
}

export function PracticeStep({ step, lang = "ko", onSuccess }: PracticeStepProps) {
  const [done, setDone] = useState(false)
  const [failCount, setFailCount] = useState(0)
  const [copiedSkeleton, setCopiedSkeleton] = useState(false)
  const [copiedFull, setCopiedFull] = useState(false)
  const [hintOpen, setHintOpen] = useState(false)
  const [showSkeleton, setShowSkeleton] = useState(false)
  const [showFullCode, setShowFullCode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // step이 바뀌면 모든 상태 리셋
  useEffect(() => {
    setDone(false)
    setFailCount(0)
    setCopiedSkeleton(false)
    setCopiedFull(false)
    setHintOpen(false)
    setShowSkeleton(false)
    setShowFullCode(false)
  }, [step.id])

  const isEn = lang === "en"
  const skeleton = step.code ? extractSkeleton(step.code) : ""
  const hasExpected = !!step.expectedOutput

  // 현재 힌트 레벨 (failCount 기준, 최대 3)
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
    onSuccess?.()
  }

  const handleRunError = () => {
    const next = failCount + 1
    setFailCount(next)
    setShowSkeleton(false)
    setShowFullCode(false)
    setHintOpen(true) // 틀리면 힌트 시트 자동 오픈
  }

  const handleCloseHint = () => {
    setHintOpen(false)
    setShowSkeleton(false)
    setShowFullCode(false)
  }

  return (
    <>
      {/* ── 메인 콘텐츠 ── */}
      <div className="space-y-4 md:space-y-6">

        {/* 배지 + 제목 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-sm font-bold bg-teal-100 text-teal-700">
              <Keyboard className="w-4 h-4 inline mr-1" />
              {isEn ? "Try It Yourself" : "직접 해보기"}
            </span>
            {/* 힌트 레벨 뱃지 — 데스크톱, 실패 후에만 표시 */}
            {failCount > 0 && !done && (
              <button
                onClick={() => setHintOpen(true)}
                className={cn(
                  "hidden md:flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border transition-colors",
                  hintLevel === 1 && "bg-amber-50 text-amber-700 border-amber-300",
                  hintLevel === 2 && "bg-orange-50 text-orange-700 border-orange-300",
                  hintLevel >= 3 && "bg-red-50 text-red-700 border-red-300",
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
          <div className="space-y-2 md:space-y-3">{renderContent(step.content)}</div>
        )}

        {/* C++ 코드 에디터 + 실행 (모바일/데스크톱 공통) */}
        {!done && step.code && (
          <CppRunner
            key={step.id}
            initialCode={skeleton || `#include <iostream>\nusing namespace std;\n\nint main() {\n    // 👉 여기에 코드를 작성하세요\n    return 0;\n}`}
            expectedOutput={step.expectedOutput}
            onSuccess={handleRunSuccess}
            onError={handleRunError}
            isEn={isEn}
          />
        )}

        {/* code도 expectedOutput도 없는 경우 — 자유 완료 */}
        {!done && !step.code && !hasExpected && (
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-3"
          >
            {step.expectedOutput && (
              <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm border border-green-600">
                <div className="text-green-400 text-xs font-bold mb-2">✅ {isEn ? "Correct output!" : "정확한 출력!"}</div>
                <div className="text-green-400 whitespace-pre-line">{step.expectedOutput}</div>
              </div>
            )}
            <div className="w-full py-4 rounded-xl text-base font-bold text-center text-teal-700 bg-teal-50 border-2 border-teal-200">
              {isEn ? "✅ Great job! Move on →" : "✅ 잘했어요! 다음으로 넘어가세요 →"}
            </div>
          </motion.div>
        )}
      </div>

      {/* ── 힌트 Bottom Sheet (portal → document.body) ── */}
      {mounted && createPortal(
        <AnimatePresence>
          {hintOpen && (
            <>
              {/* 백드롭 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseHint}
                className="fixed inset-0 bg-black/40 z-40"
              />

              {/* 시트 */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl max-h-[75vh] flex flex-col"
              >
                {/* 핸들 바 */}
                <div className="flex justify-center pt-3 pb-1">
                  <div className="w-10 h-1 rounded-full bg-gray-300" />
                </div>

                {/* 헤더 */}
                <div className={cn(
                  "flex items-center justify-between px-4 py-3 border-b",
                  hintLevel === 1 && "border-amber-200",
                  hintLevel === 2 && "border-orange-200",
                  hintLevel >= 3 && "border-red-200",
                )}>
                  <div className="flex items-center gap-2">
                    {hintLevel <= 2
                      ? <Lightbulb className={cn("w-4 h-4", hintLevel === 1 ? "text-amber-600" : "text-orange-600")} />
                      : <Eye className="w-4 h-4 text-red-600" />
                    }
                    <span className={cn(
                      "font-bold text-sm",
                      hintLevel === 1 && "text-amber-800",
                      hintLevel === 2 && "text-orange-800",
                      hintLevel >= 3 && "text-red-800",
                    )}>
                      {hintLevel === 1 && (isEn ? "💡 Hint 1: Approach" : "💡 힌트 1: 접근 방법")}
                      {hintLevel === 2 && (isEn ? "💡 Hint 2: Code skeleton" : "💡 힌트 2: 코드 뼈대")}
                      {hintLevel >= 3 && (isEn ? "💡 Hint 3: Full answer" : "💡 힌트 3: 정답 코드")}
                    </span>
                  </div>
                  <button onClick={handleCloseHint} className="p-1 rounded-full hover:bg-gray-100">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* 힌트 내용 (스크롤) */}
                <div className="overflow-y-auto flex-1 px-4 py-3 space-y-3">

                  {/* 힌트 1: 접근 방법 */}
                  {hintLevel >= 1 && (
                    <p className="text-gray-800 text-sm leading-relaxed">
                      {step.hint || (isEn
                        ? "Think about what variables you need and which loop structure fits best."
                        : "어떤 변수가 필요한지, 어떤 반복문 구조가 맞는지 생각해보세요.")}
                    </p>
                  )}

                  {/* 힌트 2: 코드 뼈대 */}
                  {hintLevel >= 2 && skeleton && (
                    <div>
                      <button
                        onClick={() => setShowSkeleton(!showSkeleton)}
                        className="w-full flex items-center justify-between px-3 py-2 bg-orange-50 rounded-lg text-sm text-orange-800 font-medium mb-1"
                      >
                        <span>{isEn ? "Code skeleton" : "코드 뼈대 보기"}</span>
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

                  {/* 힌트 3: 정답 코드 */}
                  {hintLevel >= 3 && step.code && (
                    <div>
                      <button
                        onClick={() => setShowFullCode(!showFullCode)}
                        className="w-full flex items-center justify-between px-3 py-2 bg-red-50 rounded-lg text-sm text-red-800 font-medium mb-1"
                      >
                        <span>{isEn ? "Full answer code" : "정답 코드 보기"}</span>
                        <ChevronRight className={cn("w-4 h-4 transition-transform", showFullCode && "rotate-90")} />
                      </button>
                      {showFullCode && (
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
                  )}
                </div>

                {/* 하단 액션 */}
                <div className="px-4 py-3 border-t border-gray-100 space-y-2">
                  <button
                    onClick={handleCloseHint}
                    className="w-full py-3 rounded-xl text-sm font-bold bg-teal-600 text-white hover:bg-teal-500"
                  >
                    {isEn ? "Got it, back to work!" : "확인했어요, 다시 해볼게요!"}
                  </button>
                  {/* 3번 실패 후 — 넘어가기 허용 */}
                  {hintLevel >= 3 && (
                    <button
                      onClick={() => { setDone(true); onSuccess?.() }}
                      className="w-full py-2.5 rounded-xl text-sm font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 border border-gray-200"
                    >
                      {isEn ? "→ I checked the answer, move on" : "→ 정답 확인했어요, 다음으로 넘어갈게요"}
                    </button>
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
