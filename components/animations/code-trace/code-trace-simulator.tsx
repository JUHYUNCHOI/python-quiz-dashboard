"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Play, Pause, RotateCcw, SkipForward, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

// ============ Syntax Highlight ============

const CPP_KEYWORDS = new Set(["int", "float", "double", "char", "bool", "void", "string", "if", "else", "for", "while", "do", "switch", "case", "break", "continue", "return", "class", "struct", "const", "auto", "using", "namespace", "std", "true", "false", "cout", "cin", "endl", "include", "iostream"])
const PY_KEYWORDS = new Set(["if", "elif", "else", "for", "while", "def", "class", "return", "import", "from", "in", "not", "and", "or", "True", "False", "None", "print", "range", "len", "int", "str", "float", "bool", "list", "dict", "set", "input"])

function highlightLine(line: string, language: string): React.ReactNode[] {
  const keywords = language === "cpp" ? CPP_KEYWORDS : PY_KEYWORDS
  const parts: React.ReactNode[] = []
  // 정규식: 주석, 문자열, 숫자, 단어, 연산자, 나머지
  const regex = /(\/\/.*$|#.*$|"[^"]*"|'[^']*'|\b\d+\b|[a-zA-Z_]\w*|<<|>>|>=|<=|==|!=|[{}();\[\]]|\S)/g
  let match: RegExpExecArray | null
  let lastIdx = 0

  while ((match = regex.exec(line)) !== null) {
    // 매치 전 공백
    if (match.index > lastIdx) {
      parts.push(line.slice(lastIdx, match.index))
    }
    const token = match[0]
    const key = parts.length

    if (token.startsWith("//") || token.startsWith("#")) {
      // 주석
      parts.push(<span key={key} className="text-slate-500 italic">{token}</span>)
    } else if (token.startsWith('"') || token.startsWith("'")) {
      // 문자열
      parts.push(<span key={key} className="text-emerald-400">{token}</span>)
    } else if (/^\d+$/.test(token)) {
      // 숫자
      parts.push(<span key={key} className="text-orange-300">{token}</span>)
    } else if (keywords.has(token)) {
      // 키워드
      parts.push(<span key={key} className="text-sky-400 font-semibold">{token}</span>)
    } else if (["<<", ">>", ">=", "<=", "==", "!=", "="].includes(token)) {
      // 연산자
      parts.push(<span key={key} className="text-pink-400">{token}</span>)
    } else if (["{", "}", "(", ")", ";", "[", "]"].includes(token)) {
      // 구두점
      parts.push(<span key={key} className="text-slate-400">{token}</span>)
    } else {
      // 일반 식별자
      parts.push(<span key={key} className="text-slate-100">{token}</span>)
    }
    lastIdx = match.index + token.length
  }
  // 나머지 공백
  if (lastIdx < line.length) {
    parts.push(line.slice(lastIdx))
  }
  return parts
}

// ============ 부분 강조 렌더링 ============

const PHASE_HIGHLIGHT_BG: Record<string, string> = {
  assign: "bg-blue-400/50 text-white ring-2 ring-blue-400/70 shadow-[0_0_12px_rgba(96,165,250,0.5)]",
  condition: "bg-yellow-400/50 text-white ring-2 ring-yellow-400/70 shadow-[0_0_12px_rgba(250,204,21,0.5)]",
  output: "bg-emerald-400/50 text-white ring-2 ring-emerald-400/70 shadow-[0_0_12px_rgba(52,211,153,0.5)]",
  execute: "bg-green-400/50 text-white ring-2 ring-green-400/70 shadow-[0_0_12px_rgba(74,222,128,0.5)]",
}

function renderPartialHighlight(
  line: string,
  range: [number, number],
  phase: string | undefined,
  language: string,
): React.ReactNode[] {
  const [start, end] = range
  const before = line.slice(0, start)
  const highlighted = line.slice(start, end + 1)
  const after = line.slice(end + 1)
  const hlClass = PHASE_HIGHLIGHT_BG[phase || ""] || "bg-white/30 text-white ring-2 ring-white/50"

  return [
    <span key="before" className="text-slate-500 opacity-50">{highlightLine(before, language)}</span>,
    <span key="hl" className={`${hlClass} rounded-md px-1.5 py-0.5 font-bold text-base animate-pulse`}>
      {highlighted}
    </span>,
    <span key="after" className="text-slate-500 opacity-50">{highlightLine(after, language)}</span>,
  ]
}

// ============ 타입 정의 ============

export interface TraceVariable {
  name: string
  value: string | number | boolean | null
  type?: string        // "int" | "str" | "bool" | "list" 등
  changed?: boolean    // 이번 스텝에서 변경됨
}

export interface TraceCondition {
  expression: string   // "x > 3"
  substituted: string  // "5 > 3"
  result: boolean
}

export interface TraceStep {
  line: number                  // 하이라이트할 줄 (1-based)
  variables: TraceVariable[]    // 현재 변수 상태
  output?: string               // 이 스텝에서 출력
  condition?: TraceCondition    // 조건 평가 (if/while 등)
  explanation: { ko: string; en: string }  // 이 스텝 설명
  arrow?: "enter-if" | "enter-else" | "enter-elif" | "enter-loop" | "exit-loop" | "skip" | "return"
  phase?: "condition" | "execute" | "assign" | "output" | "jump" | "end" | "skip"
  highlightRange?: [number, number]  // 줄 내 강조 범위 [start, end] (0-based, inclusive)
}

export interface CodeTracePreset {
  title: { ko: string; en: string }
  description?: { ko: string; en: string }
  language: "python" | "cpp" | "pseudo"
  code: string[]        // 코드 줄 배열
  steps: TraceStep[]    // 실행 스텝
}

interface CodeTraceSimulatorProps {
  preset: CodeTracePreset
  lang?: "ko" | "en"
  speed?: number
  compact?: boolean
}

// ============ 메인 컴포넌트 ============

export function CodeTraceSimulator({
  preset,
  lang = "ko",
  speed = 1200,
  compact = false,
}: CodeTraceSimulatorProps) {
  const [currentStep, setCurrentStep] = useState(-1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [outputs, setOutputs] = useState<string[]>([])
  const [prevVariables, setPrevVariables] = useState<Map<string, string | number | boolean | null>>(new Map())

  const t = (ko: string, en: string) => lang === "en" ? en : ko
  const totalSteps = preset.steps.length
  const step = currentStep >= 0 && currentStep < totalSteps ? preset.steps[currentStep] : null

  const goToStep = useCallback((idx: number) => {
    if (idx < 0 || idx >= totalSteps) return

    // 이전 스텝의 변수 저장 (변경 감지용)
    if (idx > 0) {
      const prevStep = preset.steps[idx - 1]
      const map = new Map<string, string | number | boolean | null>()
      prevStep.variables.forEach(v => map.set(v.name, v.value))
      setPrevVariables(map)
    } else {
      setPrevVariables(new Map())
    }

    setCurrentStep(idx)

    // 출력 누적
    const allOutputs: string[] = []
    for (let i = 0; i <= idx; i++) {
      if (preset.steps[i].output) {
        allOutputs.push(preset.steps[i].output!)
      }
    }
    setOutputs(allOutputs)
  }, [totalSteps, preset.steps])

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      goToStep(currentStep + 1)
    } else {
      setIsPlaying(false)
    }
  }, [currentStep, totalSteps, goToStep])

  useEffect(() => {
    if (!isPlaying) return
    const timer = setTimeout(nextStep, speed)
    return () => clearTimeout(timer)
  }, [isPlaying, currentStep, nextStep, speed])

  const togglePlay = () => {
    if (currentStep >= totalSteps - 1) {
      reset()
      setTimeout(() => {
        goToStep(0)
        setIsPlaying(true)
      }, 100)
    } else {
      if (!isPlaying && currentStep === -1) {
        goToStep(0)
      }
      setIsPlaying(!isPlaying)
    }
  }

  const reset = () => {
    setCurrentStep(-1)
    setOutputs([])
    setPrevVariables(new Map())
    setIsPlaying(false)
  }

  const stepForward = () => {
    if (isPlaying) return
    if (currentStep === -1) goToStep(0)
    else if (currentStep < totalSteps - 1) goToStep(currentStep + 1)
  }

  // 변수가 이번 스텝에서 변경됐는지
  const isVarChanged = (v: TraceVariable) => {
    if (v.changed !== undefined) return v.changed
    return prevVariables.has(v.name) && prevVariables.get(v.name) !== v.value
  }

  const isNewVar = (v: TraceVariable) => {
    return currentStep === 0 || !prevVariables.has(v.name)
  }

  // 최대 크기 사전 계산 (박스 크기 완전 고정용 — height로 고정)
  const fixedSizes = useMemo(() => {
    // 변수 패널: 최대 변수 개수 기준 (넉넉하게)
    const maxVars = Math.max(1, ...preset.steps.map(s => s.variables.length))
    const varHeight = maxVars * 44 + 24

    // 출력 패널: 최대 출력 줄 수 기준
    let outCount = 0, maxOut = 0
    for (const s of preset.steps) { if (s.output) outCount++; maxOut = Math.max(maxOut, outCount) }
    const outputHeight = Math.max(44, maxOut * 28 + 16)

    // 코드 패널: 코드 줄 수 기준 (고정, text-sm/base 기준 줄높이 32px)
    const codeHeight = preset.code.length * 32 + 16

    // 조건 패널: 항상 고정 (가장 큰 상태 = 조건 있을 때)
    const conditionHeight = 130

    // 설명 바: 가장 긴 설명 + arrow label 기준
    let maxLen = 0
    for (const s of preset.steps) {
      const text = lang === "en" ? s.explanation.en : s.explanation.ko
      // arrow label도 추가
      const arrowExtra = s.arrow ? 15 : 0
      maxLen = Math.max(maxLen, text.length + arrowExtra)
    }
    // 모바일 기준 약 30자/줄, 데스크톱 약 50자/줄 → 안전하게 28자/줄
    const hasArrow = preset.steps.some(s => s.arrow)
    const lines = Math.max(2, Math.ceil(maxLen / 28) + (hasArrow ? 1 : 0))
    const explanationHeight = Math.max(70, lines * 22 + 20)

    return { varHeight, outputHeight, codeHeight, conditionHeight, explanationHeight }
  }, [preset.steps, preset.code.length, lang])

  // 화살표 아이콘
  const getArrowInfo = (arrow?: string) => {
    switch (arrow) {
      case "enter-if": return { icon: "✅", label: t("참 → if 진입", "True → enter if"), color: "text-green-400" }
      case "enter-else": return { icon: "❌", label: t("거짓 → else 진입", "False → enter else"), color: "text-red-400" }
      case "enter-elif": return { icon: "✅", label: t("참 → elif 진입", "True → enter elif"), color: "text-yellow-400" }
      case "enter-loop": return { icon: "🔄", label: t("참 → 반복 진입", "True → enter loop"), color: "text-blue-400" }
      case "exit-loop": return { icon: "🚪", label: t("거짓 → 반복 종료", "False → exit loop"), color: "text-orange-400" }
      case "skip": return { icon: "⏭️", label: t("건너뜀", "Skipped"), color: "text-slate-400" }
      case "return": return { icon: "↩️", label: t("반환", "Return"), color: "text-purple-400" }
      default: return null
    }
  }

  // phase 색상
  const getPhaseColor = (phase?: string) => {
    switch (phase) {
      case "condition": return "border-l-yellow-500 bg-yellow-500/10"
      case "execute": return "border-l-green-500 bg-green-500/10"
      case "assign": return "border-l-blue-500 bg-blue-500/10"
      case "output": return "border-l-emerald-500 bg-emerald-500/10"
      case "jump": return "border-l-orange-500 bg-orange-500/10"
      case "end": return "border-l-purple-500 bg-purple-500/10"
      case "skip": return "border-l-red-500/60 bg-red-500/10"
      default: return "border-l-slate-500 bg-slate-500/10"
    }
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-3 sm:p-5 text-white overflow-hidden">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-sm sm:text-base font-bold text-slate-200">
          🔍 {lang === "en" ? preset.title.en : preset.title.ko}
        </h3>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="px-2 py-1 bg-slate-700 rounded-lg font-mono">
            {currentStep + 1} / {totalSteps}
          </span>
        </div>
      </div>

      {preset.description && (
        <p className="text-xs sm:text-sm text-slate-400 mb-3">
          {lang === "en" ? preset.description.en : preset.description.ko}
        </p>
      )}

      {/* 모바일 전용 컨트롤 — 상단 배치 (스크롤 없이 바로 조작) */}
      <div className="flex lg:hidden gap-2 mb-3">
        <button
          onClick={() => {
            setIsPlaying(false)
            if (currentStep >= totalSteps - 1) { reset(); setTimeout(() => goToStep(0), 100) }
            else if (currentStep === -1) { goToStep(0) }
            else { goToStep(currentStep + 1) }
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg"
        >
          <Play className="w-4 h-4" />
          {currentStep >= totalSteps - 1 ? t("처음부터", "Restart") : currentStep === -1 ? t("▶ 실행하기", "▶ Run") : t("▶ 한 단계", "▶ Next")}
        </button>
        {currentStep >= 0 && (
          <button onClick={reset} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm bg-slate-700 hover:bg-slate-600 text-slate-300">
            <RotateCcw className="w-3.5 h-3.5" />{t("초기화", "Reset")}
          </button>
        )}
      </div>

      {/* 메인 그리드: 코드 + 변수/조건 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 mb-3">
        {/* 코드 영역 (3/5) */}
        <div className="lg:col-span-3 bg-slate-900/80 rounded-xl overflow-hidden">
          <div className="px-3 py-2 bg-slate-700/50 text-xs text-slate-400 flex items-center gap-2">
            <span>{preset.language === "python" ? "🐍" : preset.language === "cpp" ? "⚡" : "📋"}</span>
            <span>{t("코드", "Code")}</span>
          </div>
          <div className="p-2 sm:p-3 font-mono text-sm sm:text-base overflow-x-auto" style={{ height: `${fixedSizes.codeHeight}px` }}>
            {preset.code.map((line, idx) => {
              const lineNum = idx + 1
              const isActive = step?.line === lineNum
              const isSkip = isActive && step?.arrow === "skip"
              // 이미 지나간 줄인지 (출력된 적 있는지)
              const wasVisited = currentStep >= 0 && preset.steps.slice(0, currentStep + 1).some(s => s.line === lineNum)
              // 이전에 스킵된 줄인지
              const wasSkipped = !isActive && wasVisited && currentStep >= 0 && preset.steps.slice(0, currentStep + 1).some(s => s.line === lineNum && s.arrow === "skip")

              const hasPartialHL = isActive && !isSkip && step?.highlightRange

              return (
                <div
                  key={idx}
                  className={cn(
                    "flex items-center transition-all duration-300 rounded px-2 py-0.5 -mx-1",
                    isActive && !isSkip && !hasPartialHL && "bg-yellow-500/20 shadow-[inset_3px_0_0_theme(colors.yellow.400)]",
                    hasPartialHL && step?.phase === "condition" && "bg-slate-800/60 shadow-[inset_3px_0_0_theme(colors.yellow.400/80)]",
                    hasPartialHL && step?.phase === "assign" && "bg-slate-800/60 shadow-[inset_3px_0_0_theme(colors.blue.400/80)]",
                    hasPartialHL && step?.phase === "output" && "bg-slate-800/60 shadow-[inset_3px_0_0_theme(colors.emerald.400/80)]",
                    isSkip && "bg-red-500/10 shadow-[inset_3px_0_0_theme(colors.red.400/60)]",
                    !isActive && wasSkipped && "bg-red-500/5",
                    !isActive && wasVisited && !wasSkipped && "bg-slate-700/20",
                  )}
                >
                  <span className={cn(
                    "w-6 sm:w-8 text-right mr-2 sm:mr-3 select-none flex-shrink-0 font-bold",
                    isActive && !isSkip ? "text-yellow-300" : isSkip ? "text-red-400" : "text-slate-500"
                  )}>
                    {lineNum}
                  </span>
                  <span className={cn(
                    "whitespace-pre transition-all duration-300",
                    isActive && !isSkip ? "text-white font-semibold" : isSkip ? "text-slate-500 line-through decoration-red-400/60" : ""
                  )}>
                    {isActive && step?.highlightRange
                      ? renderPartialHighlight(line, step.highlightRange, step.phase, preset.language)
                      : isActive ? line : highlightLine(line, preset.language)}
                  </span>
                  {isActive && !isSkip && (
                    <span className="ml-2 text-yellow-400 animate-pulse flex-shrink-0">◀</span>
                  )}
                  {isSkip && (
                    <span className="ml-2 text-red-400/70 animate-pulse flex-shrink-0">⏭️</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* 오른쪽: 변수 + 조건 (2/5) */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          {/* 변수 메모리 */}
          <div className="bg-slate-800/60 rounded-xl overflow-hidden">
            <div className="px-3 py-2 bg-slate-700/50 text-xs text-slate-400">
              📦 {t("변수 메모리", "Variables")}
            </div>
            <div className="p-2 sm:p-3 space-y-1.5 overflow-hidden" style={{ height: `${fixedSizes.varHeight}px` }}>
              {!step || step.variables.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-2">{t("아직 변수가 없어요", "No variables yet")}</p>
              ) : (
                step.variables.map((v, idx) => {
                  const changed = isVarChanged(v)
                  const isNew = isNewVar(v)
                  return (
                    <div
                      key={`${v.name}-${idx}`}
                      className={cn(
                        "flex items-center justify-between px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-mono text-xs sm:text-sm transition-all duration-500",
                        changed
                          ? "bg-yellow-500/20 border border-yellow-500/40 shadow-lg shadow-yellow-500/10"
                          : isNew && currentStep === 0
                            ? "bg-blue-500/15 border border-blue-500/30"
                            : "bg-slate-700/40 border border-slate-700"
                      )}
                    >
                      <div className="flex items-center gap-1.5">
                        {v.type && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-slate-600/60 rounded text-slate-400">{v.type}</span>
                        )}
                        <span className="text-purple-300 font-bold">{v.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {changed && (
                          <span className="text-yellow-400 text-xs animate-bounce">✨</span>
                        )}
                        <span className={cn(
                          "px-2 py-0.5 rounded font-bold",
                          changed ? "bg-yellow-500/30 text-yellow-200" : "bg-slate-600/40 text-emerald-300",
                          typeof v.value === "boolean" && (v.value ? "text-green-300" : "text-red-300"),
                          v.value === null && "text-slate-500 italic"
                        )}>
                          {v.value === null ? "None" : typeof v.value === "string" ? `"${v.value}"` : String(v.value)}
                        </span>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          {/* 조건 평가 — 항상 자리 유지 */}
          <div className={cn(
            "bg-slate-800/60 rounded-xl overflow-hidden transition-opacity duration-300",
            step?.condition ? "opacity-100" : "opacity-50"
          )}>
            <div className="px-3 py-2 bg-slate-700/50 text-xs text-slate-400">
              🧠 {t("조건 평가", "Condition Check")}
            </div>
            <div className="p-3 space-y-2 overflow-hidden" style={{ height: `${fixedSizes.conditionHeight}px` }}>
              {step?.condition ? (
                <>
                  <div className="text-center">
                    <span className="font-mono text-sm text-slate-300 bg-slate-700/60 px-3 py-1 rounded-lg">
                      {step.condition.expression}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <ChevronRight className="w-3 h-3 text-slate-500" />
                    <span className="font-mono text-sm text-yellow-300 bg-yellow-500/15 px-3 py-1 rounded-lg">
                      {step.condition.substituted}
                    </span>
                  </div>
                  <div className={cn(
                    "text-center py-2 rounded-xl font-bold text-base transition-all",
                    step.condition.result
                      ? "bg-green-500/20 text-green-300 border border-green-500/30"
                      : "bg-red-500/20 text-red-300 border border-red-500/30"
                  )}>
                    {step.condition.result
                      ? `✅ ${t("참 (True)", "True")}`
                      : `❌ ${t("거짓 (False)", "False")}`
                    }
                  </div>
                </>
              ) : (
                <p className="text-xs text-slate-400 text-center py-2">
                  {t("이 줄에는 조건 확인이 없어요", "No condition check on this line")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 설명 바 — 항상 자리 유지 */}
      <div
        className={cn(
          "border-l-4 rounded-r-xl px-3 sm:px-4 py-2 sm:py-3 mb-3 transition-all duration-300",
          step ? getPhaseColor(step.phase) : "border-l-slate-700 bg-slate-800/30"
        )}
        style={{ height: `${fixedSizes.explanationHeight}px` }}
      >
        {step ? (
          <div className="flex items-start gap-2">
            {step.arrow && getArrowInfo(step.arrow) && (
              <span className={cn("text-lg flex-shrink-0", getArrowInfo(step.arrow)!.color)}>
                {getArrowInfo(step.arrow)!.icon}
              </span>
            )}
            <div className="flex-1">
              <p className="text-xs sm:text-sm text-slate-200">
                {lang === "en" ? step.explanation.en : step.explanation.ko}
              </p>
              {step.arrow && getArrowInfo(step.arrow) && (
                <p className={cn("text-xs mt-0.5 font-medium", getArrowInfo(step.arrow)!.color)}>
                  {getArrowInfo(step.arrow)!.label}
                </p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-400">{t("▶ 실행하기를 눌러보세요", "Press ▶ Run to start")}</p>
        )}
      </div>

      {/* 출력 콘솔 */}
      <div className="bg-slate-800/60 rounded-xl overflow-hidden mb-3">
        <div className="px-3 py-2 bg-slate-700/50 text-xs text-slate-400">
          💬 {t("출력", "Output")}
        </div>
        <div className="p-3 font-mono text-sm overflow-hidden" style={{ height: `${fixedSizes.outputHeight}px` }}>
          {outputs.length === 0 ? (
            <span className="text-slate-400">{t("출력 대기중...", "Waiting...")}</span>
          ) : (
            outputs.map((out, idx) => (
              <div key={idx} className={cn(
                "text-green-400",
                idx === outputs.length - 1 && "animate-slide-in"
              )}>
                {out}
              </div>
            ))
          )}
        </div>
      </div>

      {/* 진행 바 */}
      <div className="mb-3">
        <div className="flex gap-0.5">
          {preset.steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setIsPlaying(false); goToStep(idx) }}
              className={cn(
                "h-1.5 sm:h-2 flex-1 rounded-full transition-all duration-300 cursor-pointer hover:opacity-80",
                idx < currentStep ? "bg-green-500/60" :
                idx === currentStep ? "bg-yellow-400" :
                "bg-slate-700"
              )}
              title={`Step ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 컨트롤 — 데스크탑에서만 표시 (모바일은 상단 버튼 사용) */}
      <div className="hidden lg:flex flex-wrap gap-2">
        {/* 메인 버튼: 다음 단계 (한 번 누르면 한 스텝) */}
        <button
          onClick={() => {
            setIsPlaying(false)
            if (currentStep >= totalSteps - 1) {
              reset()
              setTimeout(() => goToStep(0), 100)
            } else if (currentStep === -1) {
              goToStep(0)
            } else {
              goToStep(currentStep + 1)
            }
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
        >
          <Play className="w-4 h-4" />
          {currentStep >= totalSteps - 1
            ? t("처음부터", "Restart")
            : currentStep === -1
              ? t("실행하기", "Run")
              : t("다음 단계", "Next Step")
          }
        </button>
        {/* 자동 재생 */}
        {currentStep < totalSteps - 1 && (
          <button
            onClick={togglePlay}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all",
              isPlaying
                ? "bg-yellow-600 hover:bg-yellow-500 text-white"
                : "bg-slate-700 hover:bg-slate-600 text-slate-300"
            )}
          >
            {isPlaying ? (
              <><Pause className="w-4 h-4" />{t("일시정지", "Pause")}</>
            ) : (
              <><SkipForward className="w-4 h-4" />{t("자동 재생", "Auto Play")}</>
            )}
          </button>
        )}
        {currentStep >= 0 && (
          <button
            onClick={reset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm bg-slate-700 hover:bg-slate-600 text-slate-300 transition-all"
          >
            <RotateCcw className="w-4 h-4" />{t("초기화", "Reset")}
          </button>
        )}
      </div>

      {/* 완료 메시지 */}
      {currentStep >= totalSteps - 1 && (
        <div className="mt-3 p-3 sm:p-4 bg-green-500/15 border border-green-500/30 rounded-xl animate-scale-in">
          <p className="text-green-400 font-bold text-sm">
            ✅ {t("실행 완료!", "Execution Complete!")}
          </p>
          <p className="text-xs text-green-400/70 mt-1">
            {t(
              `총 ${totalSteps}단계를 거쳐 코드가 실행되었어요.`,
              `Code executed through ${totalSteps} steps.`
            )}
          </p>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slide-in { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes scale-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-slide-in { animation: slide-in 0.3s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  )
}
