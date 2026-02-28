"use client"

import { useState } from "react"
import { Keyboard, Check, Copy, CheckCheck, ChevronUp, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import { LessonStep } from "./types"
import { CodeBlock } from "@/components/ui/code-block"
import { renderContent } from "./render-content"
import { motion, AnimatePresence } from "framer-motion"

interface PracticeStepProps {
  step: LessonStep
  lang?: "ko" | "en"
}

export function PracticeStep({ step, lang = "ko" }: PracticeStepProps) {
  const [done, setDone] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showCode, setShowCode] = useState(false)

  const isEn = lang === "en"

  const handleCopy = async () => {
    if (step.code) {
      await navigator.clipboard.writeText(step.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-6">
      {/* 배지 + 제목 */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-sm font-bold bg-teal-100 text-teal-700">
            <Keyboard className="w-4 h-4 inline mr-1" />
            {isEn ? "Try It Yourself" : "직접 해보기"}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{step.title}</h1>
      </div>

      {/* 과제 설명 */}
      {step.content && (
        <div className="space-y-3">{renderContent(step.content)}</div>
      )}

      {/* 예상 출력 (항상 보임 — 목표를 보여줌) */}
      {step.expectedOutput && (
        <div className="bg-slate-800 rounded-xl p-4 font-mono text-sm border border-slate-300">
          <div className="text-slate-400 text-xs mb-2">
            {isEn ? "Expected Output" : "예상 출력 (Expected Output)"}
          </div>
          <div className="text-green-400 whitespace-pre-line">{step.expectedOutput}</div>
        </div>
      )}

      {/* 힌트 메시지 — 코드 안 열었을 때만 */}
      {step.code && !showCode && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800">
          💡 {isEn
            ? "Try writing the code yourself first! If you get stuck, click below to see the solution."
            : "먼저 직접 코드를 작성해보세요! 막히면 아래 버튼을 눌러 정답 코드를 확인할 수 있어요."}
        </div>
      )}

      {/* 코드 토글 */}
      {step.code && (
        <div>
          <button
            onClick={() => setShowCode(!showCode)}
            className={cn(
              "w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all",
              showCode
                ? "bg-teal-50 text-teal-700 border-2 border-teal-200 hover:bg-teal-100"
                : "bg-gray-100 text-gray-600 border-2 border-dashed border-gray-300 hover:bg-gray-200 hover:text-gray-800"
            )}
          >
            {showCode ? (
              <>
                <ChevronUp className="w-4 h-4" />
                {isEn ? "Hide Code" : "코드 접기"}
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                {isEn ? "Show Answer Code" : "정답 코드 보기"}
              </>
            )}
          </button>

          <AnimatePresence>
            {showCode && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="relative mt-3">
                  <div className="rounded-2xl overflow-hidden border-2 border-teal-200">
                    <CodeBlock code={step.code} language="cpp" />
                  </div>
                  {/* 복사 버튼 */}
                  <button
                    onClick={handleCopy}
                    className={cn(
                      "absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all",
                      copied
                        ? "bg-teal-500 text-white"
                        : "bg-white/90 text-gray-600 hover:bg-teal-50 hover:text-teal-700 border border-gray-200"
                    )}
                  >
                    {copied ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? (isEn ? "Copied!" : "복사됨!") : (isEn ? "Copy Code" : "코드 복사")}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* 완료 버튼 */}
      {!done ? (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setDone(true)}
          className="w-full py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
        >
          <Check className="w-5 h-5" />
          {isEn ? "Done!" : "다했어요!"}
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full py-4 rounded-xl text-base font-bold text-center text-teal-700 bg-teal-50 border-2 border-teal-200"
        >
          {isEn ? "✅ Great job! Move on to the next step →" : "✅ 잘했어요! 다음으로 넘어가세요 →"}
        </motion.div>
      )}
    </div>
  )
}
