"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface CinBufferVisualizerProps {
  lang?: "ko" | "en"
}

// 버퍼 셀 하나
function BufferCell({ char, status, index }: { char: string; status: "waiting" | "reading" | "problem" | "removed" | "idle"; index: number }) {
  const bgMap = {
    waiting: "bg-sky-500/20 border-sky-400 text-sky-300",
    reading: "bg-emerald-500/30 border-emerald-400 text-emerald-300",
    problem: "bg-red-500/30 border-red-400 text-red-300 animate-pulse",
    removed: "bg-gray-700/50 border-gray-600 text-gray-500 line-through",
    idle: "bg-gray-800 border-gray-600 text-gray-500",
  }

  const label = char === "\\n" ? "↵" : char === " " ? "␣" : char

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: status === "removed" ? 0.4 : 1 }}
      exit={{ scale: 0, opacity: 0, y: -20 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
      className={`w-12 h-12 md:w-14 md:h-14 rounded-xl border-2 flex items-center justify-center font-mono text-lg md:text-xl font-black transition-all duration-300 ${bgMap[status]}`}
    >
      {label}
    </motion.div>
  )
}

// 시나리오 단계 정의
type ScenarioStep = {
  code: string
  codeHighlight: number  // 하이라이트할 코드 줄 (0-based)
  buffer: { char: string; status: "waiting" | "reading" | "problem" | "removed" | "idle" }[]
  variables: { name: string; value: string; highlight?: boolean; problem?: boolean }[]
  message: { ko: string; en: string }
  userInput?: { ko: string; en: string }
}

// 문제 시나리오 (cin.ignore 없이)
const problemScenario: ScenarioStep[] = [
  {
    code: "cin >> age;",
    codeHighlight: -1,
    buffer: [],
    variables: [
      { name: "age", value: "?" },
      { name: "name", value: "?" },
    ],
    message: {
      ko: "사용자가 나이를 입력합니다. 14를 치고 엔터를 눌러요!",
      en: "User enters age. They type 14 and press Enter!",
    },
    userInput: { ko: "키보드: 1  4  Enter↵", en: "Keyboard: 1  4  Enter↵" },
  },
  {
    code: "cin >> age;",
    codeHighlight: -1,
    buffer: [
      { char: "1", status: "waiting" },
      { char: "4", status: "waiting" },
      { char: "\\n", status: "waiting" },
    ],
    variables: [
      { name: "age", value: "?" },
      { name: "name", value: "?" },
    ],
    message: {
      ko: "입력한 내용이 버퍼(대기실)에 들어갔어요: 1, 4, 그리고 엔터(↵)",
      en: "Input goes into the buffer (waiting room): 1, 4, and Enter(↵)",
    },
  },
  {
    code: "cin >> age;",
    codeHighlight: 0,
    buffer: [
      { char: "1", status: "reading" },
      { char: "4", status: "reading" },
      { char: "\\n", status: "waiting" },
    ],
    variables: [
      { name: "age", value: "14", highlight: true },
      { name: "name", value: "?" },
    ],
    message: {
      ko: "cin >> 가 숫자 1, 4를 읽어서 age = 14! 그런데... 엔터(↵)는 안 읽고 남겨둬요!",
      en: "cin >> reads 1, 4 → age = 14! But... it leaves Enter(↵) behind!",
    },
  },
  {
    code: "getline(cin, name);",
    codeHighlight: 1,
    buffer: [
      { char: "\\n", status: "problem" },
    ],
    variables: [
      { name: "age", value: "14" },
      { name: "name", value: "?" },
    ],
    message: {
      ko: "이제 getline()이 이름을 읽으려 하는데... 버퍼에 엔터(↵)가 남아있어요!",
      en: "Now getline() tries to read name... but Enter(↵) is still in the buffer!",
    },
  },
  {
    code: "getline(cin, name);",
    codeHighlight: 1,
    buffer: [],
    variables: [
      { name: "age", value: "14" },
      { name: "name", value: '""  (빈 줄!)', problem: true },
    ],
    message: {
      ko: "getline()은 엔터(↵)까지 읽는 함수! 남은 엔터를 읽어서 → 빈 문자열이 됨! 이름을 입력할 기회도 없이 끝!",
      en: "getline() reads up to Enter! It reads the leftover Enter → empty string! No chance to type a name!",
    },
  },
]

// 해결 시나리오 (cin.ignore 사용)
const solutionScenario: ScenarioStep[] = [
  {
    code: "cin >> age;",
    codeHighlight: 0,
    buffer: [
      { char: "\\n", status: "waiting" },
    ],
    variables: [
      { name: "age", value: "14", highlight: true },
      { name: "name", value: "?" },
    ],
    message: {
      ko: "아까처럼 cin >>가 14를 읽고, 엔터(↵)가 남아있어요. 이번엔...",
      en: "Just like before, cin >> reads 14, and Enter(↵) remains. But this time...",
    },
  },
  {
    code: "cin.ignore();",
    codeHighlight: 1,
    buffer: [
      { char: "\\n", status: "removed" },
    ],
    variables: [
      { name: "age", value: "14" },
      { name: "name", value: "?" },
    ],
    message: {
      ko: "cin.ignore()가 남은 엔터(↵)를 쓱 치워줍니다! 버퍼 청소 완료!",
      en: "cin.ignore() sweeps away the leftover Enter(↵)! Buffer cleaned!",
    },
  },
  {
    code: "cin.ignore();",
    codeHighlight: 1,
    buffer: [],
    variables: [
      { name: "age", value: "14" },
      { name: "name", value: "?" },
    ],
    message: {
      ko: "버퍼가 깨끗해졌어요! 이제 getline()이 제대로 동작할 수 있어요!",
      en: "Buffer is clean! Now getline() can work properly!",
    },
  },
  {
    code: "getline(cin, name);",
    codeHighlight: 2,
    buffer: [
      { char: "주", status: "waiting" },
      { char: "현", status: "waiting" },
      { char: "\\n", status: "waiting" },
    ],
    variables: [
      { name: "age", value: "14" },
      { name: "name", value: "?" },
    ],
    message: {
      ko: "사용자가 '주현'을 입력하면 버퍼에 들어가고...",
      en: "User types 'Juhyun' and it goes into the buffer...",
    },
    userInput: { ko: "키보드: 주  현  Enter↵", en: "Keyboard: J  u  h  y  u  n  Enter↵" },
  },
  {
    code: "getline(cin, name);",
    codeHighlight: 2,
    buffer: [],
    variables: [
      { name: "age", value: "14" },
      { name: "name", value: '"주현"', highlight: true },
    ],
    message: {
      ko: "getline()이 정상적으로 '주현'을 읽었어요! cin.ignore() 덕분!",
      en: "getline() successfully reads 'Juhyun'! Thanks to cin.ignore()!",
    },
  },
]

const problemCode = [
  'cin >> age;          // 숫자 읽기',
  'getline(cin, name);  // 이름 읽기',
]

const solutionCode = [
  'cin >> age;          // 숫자 읽기',
  'cin.ignore();        // 엔터 제거!',
  'getline(cin, name);  // 이름 읽기',
]

export function CinBufferVisualizer({ lang = "ko" }: CinBufferVisualizerProps) {
  const [phase, setPhase] = useState<"problem" | "solution">("problem")
  const [stepIdx, setStepIdx] = useState(0)
  const bottomRef = useRef<HTMLDivElement>(null)

  const scenario = phase === "problem" ? problemScenario : solutionScenario
  const codeLines = phase === "problem" ? problemCode : solutionCode
  const current = scenario[stepIdx]
  const isLast = stepIdx === scenario.length - 1

  const isEn = lang === "en"

  useEffect(() => {
    requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
    })
  }, [stepIdx, phase])

  const handleNext = () => {
    if (isLast) {
      if (phase === "problem") {
        setPhase("solution")
        setStepIdx(0)
      }
    } else {
      setStepIdx(s => s + 1)
    }
  }

  const handleReset = () => {
    setPhase("problem")
    setStepIdx(0)
  }

  const t = {
    buffer: isEn ? "Buffer (Waiting Room)" : "버퍼 (대기실)",
    empty: isEn ? "empty" : "비어있음",
    variables: isEn ? "Variables" : "변수 상태",
    next: isEn ? "Next" : "다음",
    seefix: isEn ? "Now see the fix! →" : "이번엔 해결 방법을 볼까요? →",
    done: isEn ? "Success! Try again?" : "성공! 다시 해볼까요?",
    problem: isEn ? "❌ Without cin.ignore()" : "❌ cin.ignore() 없이",
    solution: isEn ? "✅ With cin.ignore()" : "✅ cin.ignore() 사용",
    step: isEn ? "Step" : "단계",
  }

  return (
    <div className="w-full space-y-4">
      {/* 탭 */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => { setPhase("problem"); setStepIdx(0) }}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
            phase === "problem"
              ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          {t.problem}
        </button>
        <button
          onClick={() => { setPhase("solution"); setStepIdx(0) }}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
            phase === "solution"
              ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          {t.solution}
        </button>
      </div>

      <div className="bg-gray-900 rounded-2xl p-5 md:p-7 space-y-5">
        {/* 진행 단계 */}
        <div className="flex items-center gap-2 justify-center">
          {scenario.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === stepIdx
                  ? phase === "problem" ? "bg-red-400 scale-125" : "bg-emerald-400 scale-125"
                  : i < stepIdx
                    ? "bg-gray-500"
                    : "bg-gray-700"
              }`}
            />
          ))}
          <span className="text-gray-500 text-xs ml-2">{t.step} {stepIdx + 1}/{scenario.length}</span>
        </div>

        {/* 코드 영역 */}
        <div className="bg-gray-800 rounded-xl p-4 font-mono text-sm md:text-base space-y-1">
          {codeLines.map((line, i) => (
            <div
              key={i}
              className={`px-3 py-1.5 rounded-lg transition-all duration-300 ${
                current.codeHighlight === i
                  ? phase === "problem"
                    ? "bg-red-500/20 text-red-300 border-l-4 border-red-400"
                    : "bg-emerald-500/20 text-emerald-300 border-l-4 border-emerald-400"
                  : "text-gray-400"
              }`}
            >
              {line}
            </div>
          ))}
        </div>

        {/* 사용자 입력 표시 */}
        <AnimatePresence mode="wait">
          {current.userInput && (
            <motion.div
              key={`input-${stepIdx}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 justify-center"
            >
              <span className="text-lg">⌨️</span>
              <span className="px-4 py-2 bg-indigo-500/20 border border-indigo-400/40 rounded-xl text-indigo-300 font-mono text-sm font-bold">
                {isEn ? current.userInput.en : current.userInput.ko}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 버퍼 시각화 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">📦</span>
            <span className="text-gray-300 text-sm font-bold">{t.buffer}</span>
          </div>
          <div className="bg-gray-800/60 border-2 border-dashed border-gray-600 rounded-xl p-4 min-h-[5rem] flex items-center justify-center gap-3">
            <AnimatePresence mode="sync">
              {current.buffer.length === 0 ? (
                <motion.span
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  className="text-gray-600 text-sm italic"
                >
                  ({t.empty})
                </motion.span>
              ) : (
                current.buffer.map((cell, i) => (
                  <BufferCell key={`${phase}-${stepIdx}-${i}`} char={cell.char} status={cell.status} index={i} />
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 변수 상태 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">💾</span>
            <span className="text-gray-300 text-sm font-bold">{t.variables}</span>
          </div>
          <div className="flex gap-3 justify-center">
            {current.variables.map((v, i) => (
              <motion.div
                key={`${v.name}-${stepIdx}`}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className={`px-5 py-3 rounded-xl border-2 font-mono text-sm md:text-base transition-all duration-300 ${
                  v.problem
                    ? "bg-red-500/20 border-red-400 text-red-300"
                    : v.highlight
                      ? "bg-emerald-500/20 border-emerald-400 text-emerald-300"
                      : "bg-gray-800 border-gray-600 text-gray-400"
                }`}
              >
                <span className="text-gray-500 text-xs block mb-1">{v.name}</span>
                <span className="font-bold text-lg">{v.value}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 설명 메시지 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`msg-${phase}-${stepIdx}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`text-center text-base md:text-lg font-bold px-4 py-4 rounded-xl ${
              current.variables.some(v => v.problem)
                ? "bg-red-500/10 text-red-300 border border-red-500/30"
                : current.variables.some(v => v.highlight)
                  ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                  : "bg-gray-800/50 text-gray-200"
            }`}
          >
            {isEn ? current.message.en : current.message.ko}
          </motion.div>
        </AnimatePresence>

        {/* 다음 버튼 */}
        <div className="flex justify-center">
          {phase === "problem" && isLast ? (
            <button
              onClick={handleNext}
              className="px-8 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-black text-base transition-all hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30 flex items-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              {t.seefix}
            </button>
          ) : phase === "solution" && isLast ? (
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-300 font-bold text-sm transition-all flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
              {t.done}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className={`px-8 py-3 rounded-full font-black text-base transition-all hover:scale-105 flex items-center gap-2 ${
                phase === "problem"
                  ? "bg-sky-500 hover:bg-sky-400 text-white hover:shadow-lg hover:shadow-sky-500/30"
                  : "bg-emerald-500 hover:bg-emerald-400 text-white hover:shadow-lg hover:shadow-emerald-500/30"
              }`}
            >
              {t.next}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}
        </div>

        <div ref={bottomRef} />
      </div>
    </div>
  )
}
