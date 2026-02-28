"use client"

import React, { useState, useEffect, useRef } from "react"

// ============================================
// CoutMission: 게임 캐릭터 cout 미션
// 학생이 직접 값을 입력하고 실시간으로 터미널 출력 확인
// ============================================

interface CoutMissionProps {
  lang?: "ko" | "en"
  onComplete?: () => void
}

interface Field {
  id: string
  label: { ko: string; en: string }
  coutLabel: { ko: string; en: string }
  placeholder: { ko: string; en: string }
  type: "text" | "number"
}

const FIELDS: Field[] = [
  {
    id: "name",
    label: { ko: "이름", en: "Name" },
    coutLabel: { ko: "이름", en: "Name" },
    placeholder: { ko: "용사", en: "Hero" },
    type: "text",
  },
  {
    id: "level",
    label: { ko: "레벨", en: "Level" },
    coutLabel: { ko: "레벨", en: "Level" },
    placeholder: { ko: "5", en: "5" },
    type: "number",
  },
  {
    id: "hp",
    label: { ko: "HP", en: "HP" },
    coutLabel: { ko: "HP", en: "HP" },
    placeholder: { ko: "100", en: "100" },
    type: "number",
  },
  {
    id: "attack",
    label: { ko: "공격력", en: "Attack" },
    coutLabel: { ko: "공격력", en: "Attack" },
    placeholder: { ko: "25", en: "25" },
    type: "number",
  },
]

export function CoutMission({ lang = "ko", onComplete }: CoutMissionProps) {
  const [values, setValues] = useState<Record<string, string>>({
    name: "",
    level: "",
    hp: "",
    attack: "",
  })
  const [phase, setPhase] = useState<"editing" | "compiling" | "running" | "done">("editing")
  const [compileProgress, setCompileProgress] = useState(0)
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [currentLineIdx, setCurrentLineIdx] = useState(0)
  const [currentCharIdx, setCurrentCharIdx] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const t = {
    title: lang === "ko" ? "나만의 게임 캐릭터를 만들어보세요!" : "Create your own game character!",
    instruction:
      lang === "ko"
        ? "빈칸에 값을 입력하면 터미널에 실시간으로 출력됩니다!"
        : "Fill in the values and see the output in real-time!",
    compile: lang === "ko" ? "컴파일 & 실행!" : "Compile & Run!",
    compiling: lang === "ko" ? "컴파일 중..." : "Compiling...",
    running: lang === "ko" ? "실행 중..." : "Running...",
    success: lang === "ko" ? "프로그램 정상 종료 (return 0)" : "Program exited normally (return 0)",
    celebration:
      lang === "ko"
        ? "첫 C++ 프로그램 완성!"
        : "First C++ program complete!",
    tryAgain: lang === "ko" ? "다른 캐릭터 만들기" : "Create another character",
    headerLine: lang === "ko" ? "=== 캐릭터 정보 ===" : "=== Character Info ===",
  }

  const allFilled = FIELDS.every((f) => values[f.id].trim() !== "")

  // 실시간 터미널 미리보기 라인 생성
  const previewLinesActual = [
    t.headerLine,
    ...FIELDS.map((f) => {
      const v = values[f.id].trim()
      return `${f.coutLabel[lang]}: ${v || "___"}`
    }),
  ]

  const handleChange = (fieldId: string, value: string) => {
    if (phase !== "editing") return
    setValues((prev) => ({ ...prev, [fieldId]: value }))
  }

  const handleCompile = () => {
    if (!allFilled || phase !== "editing") return

    setPhase("compiling")
    setCompileProgress(0)
    setTerminalLines([])
    setCurrentLineIdx(0)
    setCurrentCharIdx(0)
    setShowCelebration(false)

    // 컴파일 프로그레스
    const compileInterval = setInterval(() => {
      setCompileProgress((prev) => {
        if (prev >= 100) {
          clearInterval(compileInterval)
          setPhase("running")
          return 100
        }
        return prev + 4
      })
    }, 30)
  }

  // 실행 단계: 터미널 타이핑 효과
  useEffect(() => {
    if (phase !== "running") return

    const finalLines = [
      t.headerLine,
      ...FIELDS.map((f) => `${f.coutLabel[lang]}: ${values[f.id].trim()}`),
    ]

    let lineIdx = 0
    let charIdx = 0
    const displayedLines: string[] = []

    typingRef.current = setInterval(() => {
      if (lineIdx >= finalLines.length) {
        if (typingRef.current) clearInterval(typingRef.current)
        setPhase("done")
        setTimeout(() => setShowCelebration(true), 300)
        if (onComplete) setTimeout(onComplete, 800)
        return
      }

      const currentLine = finalLines[lineIdx]
      charIdx++

      if (charIdx > currentLine.length) {
        displayedLines.push(currentLine)
        setTerminalLines([...displayedLines])
        setCurrentLineIdx(lineIdx + 1)
        setCurrentCharIdx(0)
        lineIdx++
        charIdx = 0
      } else {
        setTerminalLines([...displayedLines, currentLine.slice(0, charIdx)])
        setCurrentLineIdx(lineIdx)
        setCurrentCharIdx(charIdx)
      }
    }, 25)

    return () => {
      if (typingRef.current) clearInterval(typingRef.current)
    }
  }, [phase])

  const handleReset = () => {
    setValues({ name: "", level: "", hp: "", attack: "" })
    setPhase("editing")
    setCompileProgress(0)
    setTerminalLines([])
    setCurrentLineIdx(0)
    setCurrentCharIdx(0)
    setShowCelebration(false)
  }

  // cout 코드 라인 하이라이팅
  const renderCodeLine = (field: Field, idx: number) => {
    const value = values[field.id].trim()
    const isNumber = field.type === "number" && value !== ""
    const lineNum = idx + 5 // #include=1, using=2, int main=3, header cout=4

    return (
      <div key={field.id} className="flex items-center gap-0 font-mono text-[11px] sm:text-xs leading-relaxed">
        <span className="text-slate-400 w-5 sm:w-6 text-right shrink-0 select-none mr-2 text-[10px]">
          {lineNum}
        </span>
        <span className="text-slate-400">{"    "}</span>
        <span className="text-blue-600">cout</span>
        <span className="text-slate-500">{" << "}</span>
        <span className="text-amber-700">{`"${field.coutLabel[lang]}: "`}</span>
        <span className="text-slate-500">{" << "}</span>
        {/* 인라인 인풋 */}
        <input
          type="text"
          value={values[field.id]}
          onChange={(e) => handleChange(field.id, e.target.value)}
          placeholder={field.placeholder[lang]}
          disabled={phase !== "editing"}
          className={`w-16 sm:w-20 px-1.5 py-0.5 rounded text-center text-[11px] sm:text-xs font-mono border transition-all outline-none ${
            phase !== "editing"
              ? "bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed"
              : value
              ? isNumber
                ? "bg-purple-100 border-purple-400 text-purple-700"
                : "bg-emerald-100 border-emerald-400 text-emerald-700"
              : "bg-slate-100 border-amber-400/50 text-slate-700 focus:border-amber-400 focus:bg-amber-50"
          }`}
        />
        <span className="text-slate-500">{" << "}</span>
        <span className="text-cyan-600">endl</span>
        <span className="text-slate-500">;</span>
      </div>
    )
  }

  return (
    <div className="w-full space-y-3">
      <p className="text-slate-500 text-xs text-center">{t.instruction}</p>

      <div className="flex flex-col lg:flex-row gap-3">
        {/* 왼쪽: 코드 에디터 */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
          {/* 에디터 헤더 */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-100/80 border-b border-slate-200">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <span className="text-slate-400 text-[10px] font-mono">character.cpp</span>
          </div>

          {/* 코드 내용 */}
          <div className="p-3 sm:p-4 space-y-0.5 overflow-x-auto">
            {/* 고정 줄: #include, using, int main */}
            <div className="font-mono text-[11px] sm:text-xs leading-relaxed">
              <div className="flex">
                <span className="text-slate-400 w-5 sm:w-6 text-right shrink-0 select-none mr-2 text-[10px]">1</span>
                <span>
                  <span className="text-purple-600">#include</span>
                  <span className="text-slate-500">{" <"}</span>
                  <span className="text-emerald-700">iostream</span>
                  <span className="text-slate-500">{">"}</span>
                </span>
              </div>
              <div className="flex">
                <span className="text-slate-400 w-5 sm:w-6 text-right shrink-0 select-none mr-2 text-[10px]">2</span>
                <span>
                  <span className="text-purple-600">using namespace</span>
                  <span className="text-blue-600"> std</span>
                  <span className="text-slate-500">;</span>
                </span>
              </div>
              <div className="flex">
                <span className="text-slate-400 w-5 sm:w-6 text-right shrink-0 select-none mr-2 text-[10px]">3</span>
                <span>
                  <span className="text-blue-600">int</span>
                  <span className="text-amber-600"> main</span>
                  <span className="text-slate-500">() {"{"}</span>
                </span>
              </div>

              {/* 헤더 cout 줄 */}
              <div className="flex">
                <span className="text-slate-400 w-5 sm:w-6 text-right shrink-0 select-none mr-2 text-[10px]">4</span>
                <span>
                  <span className="text-slate-400">{"    "}</span>
                  <span className="text-blue-600">cout</span>
                  <span className="text-slate-500">{" << "}</span>
                  <span className="text-amber-700">{`"${t.headerLine}"`}</span>
                  <span className="text-slate-500">{" << "}</span>
                  <span className="text-cyan-600">endl</span>
                  <span className="text-slate-500">;</span>
                </span>
              </div>
            </div>

            {/* 입력 가능한 cout 줄들 */}
            {FIELDS.map((f, i) => renderCodeLine(f, i))}

            {/* return 0; } */}
            <div className="font-mono text-[11px] sm:text-xs leading-relaxed">
              <div className="flex">
                <span className="text-slate-400 w-5 sm:w-6 text-right shrink-0 select-none mr-2 text-[10px]">
                  {FIELDS.length + 5}
                </span>
                <span>
                  <span className="text-slate-400">{"    "}</span>
                  <span className="text-purple-600">return</span>
                  <span className="text-purple-600"> 0</span>
                  <span className="text-slate-500">;</span>
                </span>
              </div>
              <div className="flex">
                <span className="text-slate-400 w-5 sm:w-6 text-right shrink-0 select-none mr-2 text-[10px]">
                  {FIELDS.length + 6}
                </span>
                <span className="text-slate-500">{"}"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 터미널 미리보기 */}
        <div className="flex-1 lg:max-w-[45%] bg-slate-800 rounded-2xl overflow-hidden border border-slate-300">
          {/* 터미널 헤더 */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-700 border-b border-slate-600">
            <span className="text-emerald-400 text-[10px]">$</span>
            <span className="text-slate-400 text-[10px] font-mono">
              {phase === "editing"
                ? lang === "ko" ? "미리보기" : "Preview"
                : phase === "compiling"
                ? t.compiling
                : phase === "running"
                ? "./character"
                : "./character"}
            </span>
          </div>

          {/* 터미널 내용 */}
          <div className="p-3 sm:p-4 font-mono text-xs sm:text-sm min-h-[140px]">
            {phase === "editing" ? (
              /* 실시간 미리보기 */
              <div className="space-y-0.5">
                {previewLinesActual.map((line, i) => (
                  <div
                    key={i}
                    className={`transition-colors duration-200 ${
                      i === 0
                        ? "text-amber-400 font-bold"
                        : line.includes("___")
                        ? "text-slate-500"
                        : "text-emerald-400"
                    }`}
                  >
                    {line}
                  </div>
                ))}
              </div>
            ) : phase === "compiling" ? (
              /* 컴파일 프로그레스 */
              <div className="flex flex-col items-center justify-center h-[120px] gap-3">
                <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                <div className="w-full max-w-[200px]">
                  <div className="h-1.5 bg-slate-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-75"
                      style={{ width: `${compileProgress}%` }}
                    />
                  </div>
                </div>
                <span className="text-amber-400 text-[10px]">{t.compiling}</span>
              </div>
            ) : (
              /* 타이핑 출력 */
              <div className="space-y-0.5">
                {terminalLines.map((line, i) => (
                  <div
                    key={i}
                    className={
                      i === 0 ? "text-amber-400 font-bold" : "text-emerald-400"
                    }
                  >
                    {line}
                    {phase === "running" && i === terminalLines.length - 1 && (
                      <span className="inline-block w-1.5 h-3.5 bg-emerald-400 ml-0.5 animate-pulse" />
                    )}
                  </div>
                ))}
                {phase === "done" && (
                  <div className="mt-3 pt-2 border-t border-slate-600">
                    <span className="text-slate-400 text-[10px]">{t.success}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="flex justify-center">
        {phase === "editing" && (
          <button
            onClick={handleCompile}
            disabled={!allFilled}
            className={`px-8 py-3 rounded-full font-black text-sm transition-all flex items-center gap-2 ${
              allFilled
                ? "bg-emerald-500 hover:bg-emerald-400 text-white hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30"
                : "bg-slate-300 text-slate-400 cursor-not-allowed"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            {t.compile}
          </button>
        )}

        {phase === "done" && (
          <div className="flex flex-col items-center gap-3">
            {showCelebration && (
              <div className="text-center animate-in fade-in zoom-in duration-500">
                <div className="text-3xl mb-1">🎉</div>
                <p className="text-emerald-600 font-black text-sm">{t.celebration}</p>
              </div>
            )}
            <button
              onClick={handleReset}
              className="px-5 py-2 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 font-bold text-xs transition-all"
            >
              {t.tryAgain}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
