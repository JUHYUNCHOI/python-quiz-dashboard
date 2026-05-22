"use client"

import React, { useState, useEffect, useRef } from "react"

// ============================================
// HelloWorldBuilder: C++ Hello World 조립 퍼즐
// 코드 블록을 올바른 순서로 배치하여 프로그램 완성
// ============================================

interface HelloWorldBuilderProps {
  lang?: "ko" | "en"
  onComplete?: () => void
}

interface CodeBlock {
  id: string
  code: string
  indent: number
  label: { ko: string; en: string }
}

const CORRECT_ORDER: CodeBlock[] = [
  {
    id: "include",
    code: '#include <iostream>',
    indent: 0,
    label: { ko: "입출력 도구 가져오기", en: "Import I/O tools" },
  },
  {
    id: "namespace",
    code: "using namespace std;",
    indent: 0,
    label: { ko: "std:: 생략하기", en: "Skip typing std::" },
  },
  {
    id: "main",
    code: "int main() {",
    indent: 0,
    label: { ko: "프로그램 시작점", en: "Program entry point" },
  },
  {
    id: "cout",
    code: '    cout << "Hello!" << endl;',
    indent: 1,
    label: { ko: "화면에 출력!", en: "Print to screen!" },
  },
  {
    id: "return",
    code: "    return 0;",
    indent: 1,
    label: { ko: "정상 종료 신호", en: "Success signal" },
  },
  {
    id: "brace",
    code: "}",
    indent: 0,
    label: { ko: "main 함수 끝", en: "End of main" },
  },
]

// Fisher-Yates 셔플
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function HelloWorldBuilder({ lang = "ko" }: HelloWorldBuilderProps) {
  const [slots, setSlots] = useState<(string | null)[]>(
    Array(CORRECT_ORDER.length).fill(null)
  )
  const [available, setAvailable] = useState<string[]>(() =>
    shuffle(CORRECT_ORDER.map((b) => b.id))
  )
  const [phase, setPhase] = useState<
    "building" | "wrong" | "compiling" | "success"
  >("building")
  const [wrongSlots, setWrongSlots] = useState<Set<number>>(new Set())
  const [compileProgress, setCompileProgress] = useState(0)
  const [showLabels, setShowLabels] = useState(false)
  const [terminalText, setTerminalText] = useState("")
  const terminalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const t = {
    title: lang === "ko" ? "Hello World를 조립해보자!" : "Build Hello World!",
    instruction:
      lang === "ko"
        ? "아래 블록을 클릭해서 올바른 순서로 코드를 완성하세요!"
        : "Click the blocks below to build the code in the right order!",
    available: lang === "ko" ? "코드 블록" : "Code Blocks",
    editor: lang === "ko" ? "코드 에디터" : "Code Editor",
    check: lang === "ko" ? "실행해보기!" : "Run it!",
    compiling: lang === "ko" ? "컴파일 중..." : "Compiling...",
    wrongOrder:
      lang === "ko"
        ? "순서가 틀렸어요! 빨간 블록을 클릭하면 제거됩니다"
        : "Wrong order! Click red blocks to remove them",
    success: lang === "ko" ? "완벽해요! 🎉" : "Perfect! 🎉",
    terminal: lang === "ko" ? "터미널 출력" : "Terminal Output",
    reset: lang === "ko" ? "다시 해보기" : "Try Again",
    slotHint: lang === "ko" ? "여기를 채우세요" : "Fill here",
  }

  // 다음 빈 슬롯 인덱스
  const nextEmptySlot = slots.findIndex((s) => s === null)

  // 블록 클릭 → 다음 빈 슬롯에 배치
  const handleBlockClick = (blockId: string) => {
    if (phase !== "building" || nextEmptySlot === -1) return

    const newSlots = [...slots]
    newSlots[nextEmptySlot] = blockId
    setSlots(newSlots)
    setAvailable((prev) => prev.filter((id) => id !== blockId))
    setWrongSlots(new Set())
  }

  // 슬롯 클릭 → 블록 제거
  const handleSlotClick = (slotIdx: number) => {
    if (phase !== "building" && phase !== "wrong") return
    const blockId = slots[slotIdx]
    if (!blockId) return

    // 해당 슬롯부터 뒤의 모든 블록 제거 (순서 유지를 위해)
    const newSlots = [...slots]
    const removed: string[] = []
    for (let i = slotIdx; i < newSlots.length; i++) {
      if (newSlots[i]) {
        removed.push(newSlots[i]!)
        newSlots[i] = null
      }
    }
    setSlots(newSlots)
    setAvailable((prev) => [...prev, ...removed])
    setWrongSlots(new Set())
    setPhase("building")
  }

  // 모든 슬롯이 채워졌는지 확인
  const allFilled = slots.every((s) => s !== null)

  // 실행 버튼
  const handleRun = () => {
    // 정답 확인
    const isCorrect = slots.every(
      (s, i) => s === CORRECT_ORDER[i].id
    )

    if (!isCorrect) {
      // 틀린 슬롯 표시
      const wrong = new Set<number>()
      slots.forEach((s, i) => {
        if (s !== CORRECT_ORDER[i].id) wrong.add(i)
      })
      setWrongSlots(wrong)
      setPhase("wrong")
      return
    }

    // 컴파일 애니메이션
    setPhase("compiling")
    setCompileProgress(0)

    const interval = setInterval(() => {
      setCompileProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          // 성공 단계로 전환
          setPhase("success")
          return 100
        }
        return prev + 5
      })
    }, 40)
  }

  // 성공 시 터미널 타이핑 효과
  useEffect(() => {
    if (phase !== "success") return

    const fullText = "Hello!"
    let idx = 0
    setTerminalText("")
    setShowLabels(false)

    terminalRef.current = setInterval(() => {
      idx++
      setTerminalText(fullText.slice(0, idx))
      if (idx >= fullText.length) {
        if (terminalRef.current) clearInterval(terminalRef.current)
        // 라벨 표시
        setTimeout(() => setShowLabels(true), 400)
      }
    }, 60)

    return () => {
      if (terminalRef.current) clearInterval(terminalRef.current)
    }
  }, [phase])

  // 리셋
  const handleReset = () => {
    setSlots(Array(CORRECT_ORDER.length).fill(null))
    setAvailable(shuffle(CORRECT_ORDER.map((b) => b.id)))
    setPhase("building")
    setWrongSlots(new Set())
    setCompileProgress(0)
    setShowLabels(false)
    setTerminalText("")
  }

  const getBlock = (id: string) =>
    CORRECT_ORDER.find((b) => b.id === id)!

  return (
    <div className="w-full space-y-4">
      {/* 안내 */}
      <p className="text-slate-500 text-xs text-center">{t.instruction}</p>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-6 space-y-4">
        {/* 코드 에디터 영역 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <span className="text-slate-400 text-xs font-mono">hello.cpp</span>
          </div>

          <div className="space-y-1.5">
            {slots.map((blockId, i) => {
              const isWrong = wrongSlots.has(i)
              const block = blockId ? getBlock(blockId) : null

              return (
                <div
                  key={i}
                  onClick={() => handleSlotClick(i)}
                  className={`relative flex items-center min-h-[2.5rem] px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${
                    blockId
                      ? isWrong
                        ? "bg-red-50 border-2 border-red-400 text-red-700 cursor-pointer hover:bg-red-100 animate-[shake_0.3s_ease-in-out]"
                        : phase === "success"
                        ? "bg-emerald-50 border-2 border-emerald-400 text-slate-800"
                        : "bg-purple-50 border-2 border-purple-300 text-slate-800 cursor-pointer hover:bg-purple-100"
                      : nextEmptySlot === i
                      ? "border-2 border-dashed border-amber-400 bg-amber-50/50"
                      : "border-2 border-dashed border-slate-300 bg-white"
                  }`}
                >
                  {/* 줄 번호 */}
                  <span className="text-slate-400 text-xs w-6 shrink-0 select-none">
                    {i + 1}
                  </span>

                  {blockId ? (
                    <>
                      <span>{block?.code}</span>
                      {isWrong && (
                        <span className="ml-auto text-red-500 text-xs">✕</span>
                      )}
                      {phase === "success" && showLabels && (
                        <span className="ml-auto text-emerald-600 text-xs animate-in fade-in duration-500">
                          ← {block?.label[lang]}
                        </span>
                      )}
                    </>
                  ) : nextEmptySlot === i ? (
                    <span className="text-amber-500/70 text-xs italic">
                      {t.slotHint} →
                    </span>
                  ) : (
                    <span className="text-slate-300 text-xs">···</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* 사용 가능한 블록 */}
        {(phase === "building" || phase === "wrong") && available.length > 0 && (
          <div>
            <p className="text-slate-500 text-xs mb-2 font-medium">
              {t.available}:
            </p>
            <div className="flex flex-wrap gap-2">
              {available.map((id) => {
                const block = getBlock(id)
                return (
                  <button
                    key={id}
                    onClick={() => handleBlockClick(id)}
                    className="px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 font-mono text-xs hover:bg-purple-50 hover:border-purple-400 hover:text-purple-700 transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
                  >
                    {block.code.trim()}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* 틀린 순서 메시지 */}
        {phase === "wrong" && (
          <p className="text-center text-red-500 text-xs font-medium animate-pulse">
            {t.wrongOrder}
          </p>
        )}

        {/* 실행 / 컴파일 / 성공 버튼 */}
        <div className="flex justify-center">
          {phase === "building" && allFilled && (
            <button
              onClick={handleRun}
              className="px-8 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-black text-sm transition-all hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30 flex items-center gap-2"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              {t.check}
            </button>
          )}

          {phase === "wrong" && (
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-sm transition-all flex items-center gap-2"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
              {t.reset}
            </button>
          )}

          {phase === "compiling" && (
            <div className="w-full max-w-xs">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-amber-600 text-sm font-bold">
                  {t.compiling}
                </span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-100"
                  style={{ width: `${compileProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* 터미널 출력 (성공 시) */}
        {phase === "success" && (
          <div className="space-y-3">
            <div className="rounded-xl bg-slate-800 border border-slate-700 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 border-b border-slate-600">
                <span className="text-slate-400 text-xs font-mono">
                  $ ./hello
                </span>
              </div>
              <div className="px-4 py-3 font-mono">
                <span className="text-emerald-400 text-sm">{terminalText}</span>
                <span className="inline-block w-2 h-4 bg-emerald-400 ml-0.5 animate-pulse" />
              </div>
            </div>

            <p className="text-center text-emerald-600 text-sm font-bold">
              {t.success}
            </p>

            <div className="flex justify-center">
              <button
                onClick={handleReset}
                className="px-5 py-2 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 font-bold text-xs transition-all"
              >
                {t.reset}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
