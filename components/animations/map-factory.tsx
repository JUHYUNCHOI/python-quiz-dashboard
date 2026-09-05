"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, RotateCcw, Factory } from "lucide-react"

// ============================================
// MapFactory - map() 공장 시각화
// ============================================
export function MapFactoryVisualizer({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const isEn = lang === "en"
  /* 2026-09-05: 자동재생을 걷어내고 ◀▶ 수동으로 바꿨다.
     학생: "1초마다 휙휙 넘어가면 이해하기도 전에 다음 게 나와. 멈출 수가 없어."
     선생님도 전에 "자동은 뭐지? 우리 시뮬 스타일이랑 넘 달라" 라고 하셨다
     (memory/feedback_sim_style_consistency.md).
     본보기 = components/animations/py-split-join-visualizer.tsx */
  const [step, setStep] = useState(0)

  const inputItems = ["'1'", "'2'", "'3'", "'4'"]
  const outputItems = ["1", "2", "3", "4"]

  // 0 = 시작 전, 1~4 = 하나씩 처리됨
  const totalSteps = inputItems.length
  const processedItems = Array.from({ length: step }, (_, i) => i)

  const BEATS = isEn
    ? [
        "Four pieces of text are lined up. Still text, not numbers.",
        "The first '1' passes through int. Out comes the number 1.",
        "'2' goes through the same way. We did not tell it to.",
        "'3' too. The machine does the same job to whatever comes in.",
        "All four are numbers now. That is what map did.",
      ]
    : [
        "글자 네 개가 벨트에 줄 서 있어요. 아직 글자예요.",
        "첫 번째 '1' 이 int 기계를 지나요. 숫자 1 이 되어 나와요.",
        "'2' 도 똑같이 지나가요. 우리가 하나씩 시킨 게 아니에요.",
        "'3' 도요. 들어온 것마다 기계가 같은 일을 해요.",
        "네 개가 다 숫자가 됐어요. 이게 map 이 한 일이에요.",
      ]
  
  return (
    <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{isEn ? "🏭 map() factory" : "🏭 map() 공장"}</h3>
        <p className="text-gray-600">{isEn ? "string → integer conversion!" : "문자열 → 정수 변환!"}</p>
        <code className="text-sm bg-gray-800 text-yellow-300 px-3 py-1 rounded-lg mt-2 inline-block">
          list(map(int, ["'1'", "'2'", "'3'", "'4'"]))
        </code>
      </div>
      
      {/* 공장 시각화 */}
      <div className="relative h-64 bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
        {/* 입력 컨베이어 벨트 */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          <span className="text-xs font-bold text-gray-500 mb-1">{isEn ? "📥 Input" : "📥 입력"}</span>
          {inputItems.map((item, idx) => (
            <motion.div
              key={`input-${idx}`}
              initial={{ opacity: 1, x: 0 }}
              animate={{
                opacity: processedItems.includes(idx) ? 0 : 1,
                x: processedItems.includes(idx) ? 80 : 0,
              }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 bg-amber-100 border-2 border-amber-400 rounded-lg flex items-center justify-center font-mono text-sm font-bold text-amber-700"
            >
              {item}
            </motion.div>
          ))}
        </div>
        
        {/* 공장 */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{
              scale: step > 0 && step <= inputItems.length ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 0.3 }}
            className="w-32 h-32 bg-purple-600 rounded-2xl flex flex-col items-center justify-center shadow-xl"
          >
            <Factory className="w-10 h-10 text-white mb-1" />
            <span className="text-white font-bold text-lg">int</span>
            <span className="text-purple-200 text-xs">{isEn ? "the machine" : "기계"}</span>
          </motion.div>
          
          {/* 처리 중인 아이템 */}
          <AnimatePresence>
            {step > 0 && step <= inputItems.length && (
              <motion.div
                key={`processing-${step}`}
                initial={{ opacity: 0, y: -30, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.5 }}
                transition={{ duration: 0.3 }}
                className="absolute -top-8 left-1/2 -translate-x-1/2"
              >
                <div className="w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center font-mono text-sm font-bold text-white animate-bounce">
                  {inputItems[step - 1]}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* 출력 컨베이어 벨트 */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          <span className="text-xs font-bold text-gray-500 mb-1">{isEn ? "📤 Output" : "📤 출력"}</span>
          {outputItems.map((item, idx) => (
            <motion.div
              key={`output-${idx}`}
              initial={{ opacity: 0, scale: 0.5, x: -80 }}
              animate={{
                opacity: processedItems.includes(idx) ? 1 : 0,
                scale: processedItems.includes(idx) ? 1 : 0.5,
                x: processedItems.includes(idx) ? 0 : -80,
              }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-12 h-12 bg-green-100 border-2 border-green-500 rounded-lg flex items-center justify-center font-mono text-lg font-bold text-green-700"
            >
              {item}
            </motion.div>
          ))}
        </div>
        
        {/* 화살표들 */}
        <div className="absolute left-20 top-1/2 -translate-y-1/2 text-2xl text-gray-400">
          →
        </div>
        <div className="absolute right-20 top-1/2 -translate-y-1/2 text-2xl text-gray-400">
          →
        </div>
      </div>
      
      {/* 결과 */}
      {step >= totalSteps && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 bg-green-100 border-2 border-green-400 rounded-xl p-4 text-center"
        >
          <p className="text-green-700 font-bold text-lg mb-2">{isEn ? "✅ Conversion complete!" : "✅ 변환 완료!"}</p>
          <code className="bg-gray-800 text-green-400 px-4 py-2 rounded-lg text-lg">
            [1, 2, 3, 4]
          </code>
        </motion.div>
      )}
      
      {/* 말풍선 — 한 단계 한 문장. 아래 정적 설명 블록은 걷어냈다:
          시뮬이 보여주는 걸 글로 또 말하면 "설명 두 번" 이 된다 (ux-reviewer). */}
      <div
        className="mt-4 min-h-[52px] rounded-xl border-2 border-purple-200 bg-white px-4 py-3 text-[15px] leading-relaxed text-gray-800"
        style={{ wordBreak: "keep-all", textWrap: "balance" }}
      >
        {BEATS[step]}
      </div>

      {/* ◀ ▶ — 자동재생 없음 */}
      <div className="flex items-center justify-center gap-3 mt-4">
        <button
          onClick={() => setStep((v) => Math.max(0, v - 1))}
          disabled={step === 0}
          className="rounded-lg bg-white p-2 text-purple-700 shadow disabled:opacity-30"
          aria-label={isEn ? "Previous step" : "이전 단계"}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="font-mono text-sm text-gray-600">
          {step + 1} / {totalSteps + 1}
        </span>
        <button
          onClick={() => setStep((v) => Math.min(totalSteps, v + 1))}
          disabled={step === totalSteps}
          className="rounded-lg bg-white p-2 text-purple-700 shadow disabled:opacity-30"
          aria-label={isEn ? "Next step" : "다음 단계"}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <button
          onClick={() => setStep(0)}
          className="ml-2 rounded-lg bg-white p-2 text-gray-500 shadow"
          aria-label={isEn ? "Back to start" : "처음으로"}
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
