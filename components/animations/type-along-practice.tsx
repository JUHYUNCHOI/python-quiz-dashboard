"use client"

import React, { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Eye, EyeOff, Play, RotateCcw, CheckCircle, Sparkles } from "lucide-react"

interface TypeAlongPracticeProps {
  title: string
  description: string
  targetCode: string
  expectedOutput: string
  onComplete?: () => void
  lang?: "ko" | "en"
}

// Python 문법 하이라이팅
// Tailwind safelist (ensure these classes are not purged):
// text-gray-500 text-gray-400 text-gray-200 text-amber-300 text-cyan-300
// text-orange-300 text-violet-400 text-purple-300 text-green-300 text-sky-300 text-gray-100 font-semibold
function highlightPython(code: string): React.ReactNode[] {
  if (!code) return [<div key={0} className="text-gray-500">(코드 없음)</div>]
  const lines = code.split('\n')
  return lines.map((line, lineIdx) => {
    const parts: React.ReactNode[] = []
    let remaining = line
    let key = 0

    while (remaining.length > 0) {
      let matched = false

      // 주석
      const commentMatch = remaining.match(/^(#.*)$/)
      if (commentMatch) {
        parts.push(<span key={key++} className="text-gray-500 italic">{commentMatch[1]}</span>)
        remaining = ''
        matched = true
      }

      // 문자열 (f-string 포함)
      if (!matched) {
        const strMatch = remaining.match(/^(f?)('''[\s\S]*?'''|"""[\s\S]*?"""|'[^']*'|"[^"]*")/)
        if (strMatch) {
          const full = strMatch[0]
          if (strMatch[1] === 'f') {
            parts.push(<span key={key++} className="text-green-300">{full}</span>)
          } else {
            parts.push(<span key={key++} className="text-green-300">{full}</span>)
          }
          remaining = remaining.slice(full.length)
          matched = true
        }
      }

      // 키워드
      if (!matched) {
        const kwMatch = remaining.match(/^\b(def|return|if|elif|else|while|for|in|try|except|finally|import|from|class|break|continue|pass|True|False|None|and|or|not|print|input|int|float|str|len|range|open)\b/)
        if (kwMatch) {
          const kw = kwMatch[1]
          const builtins = ['print', 'input', 'int', 'float', 'str', 'len', 'range', 'open']
          const constants = ['True', 'False', 'None']
          if (builtins.includes(kw)) {
            parts.push(<span key={key++} className="text-cyan-300">{kw}</span>)
          } else if (constants.includes(kw)) {
            parts.push(<span key={key++} className="text-orange-300">{kw}</span>)
          } else {
            parts.push(<span key={key++} className="text-violet-400 font-semibold">{kw}</span>)
          }
          remaining = remaining.slice(kw.length)
          matched = true
        }
      }

      // 숫자
      if (!matched) {
        const numMatch = remaining.match(/^\b(\d+\.?\d*)\b/)
        if (numMatch) {
          parts.push(<span key={key++} className="text-purple-300">{numMatch[1]}</span>)
          remaining = remaining.slice(numMatch[1].length)
          matched = true
        }
      }

      // 연산자/구두점
      if (!matched) {
        const opMatch = remaining.match(/^([()\[\]{}:,=+\-*/<>!]+)/)
        if (opMatch) {
          parts.push(<span key={key++} className="text-sky-300">{opMatch[1]}</span>)
          remaining = remaining.slice(opMatch[1].length)
          matched = true
        }
      }

      // 일반 텍스트 (한 글자씩)
      if (!matched) {
        parts.push(<span key={key++} className="text-gray-100">{remaining[0]}</span>)
        remaining = remaining.slice(1)
      }
    }

    return (
      <div key={lineIdx} className="leading-[1.8] flex">
        <span className="text-gray-500 select-none w-6 text-right mr-3 text-xs leading-[1.8] flex-shrink-0">{lineIdx + 1}</span>
        <span>{parts.length > 0 ? parts : <span>&nbsp;</span>}</span>
      </div>
    )
  })
}

export function TypeAlongPractice({
  title,
  description,
  targetCode,
  expectedOutput,
  onComplete,
  lang = "ko"
}: TypeAlongPracticeProps) {
  const isEn = lang === "en"
  const [userCode, setUserCode] = useState("")
  const [showGuide, setShowGuide] = useState(true)
  const [guideTimer, setGuideTimer] = useState<NodeJS.Timeout | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState(false)
  const [phase, setPhase] = useState<"typing" | "running" | "complete">("typing")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // 코드 정규화 (공백, 줄바꿈 차이 무시)
  const normalizeCode = (code: string) => {
    if (!code) return ''
    return code
      .split('\n')
      .map(line => line.trimEnd())
      .join('\n')
      .trim()
  }

  // 타이핑 매칭 체크
  const getMatchStatus = () => {
    const target = targetCode || ''
    const typed = userCode
    
    let matchLength = 0
    for (let i = 0; i < typed.length && i < target.length; i++) {
      if (typed[i] === target[i]) {
        matchLength++
      } else {
        break
      }
    }
    
    const isFullMatch = normalizeCode(typed) === normalizeCode(target)
    const isPartialMatch = matchLength === typed.length && typed.length > 0
    
    return { matchLength, isFullMatch, isPartialMatch }
  }

  const { isFullMatch, isPartialMatch } = getMatchStatus()

  // 다음에 입력해야 할 글자 힌트
  const getNextHint = () => {
    if (!targetCode || userCode.length >= targetCode.length) return ""
    const nextChar = targetCode[userCode.length]
    if (nextChar === '\n') return '↵ (Enter)'
    if (nextChar === ' ') return '␣ (Space)'
    return `"${nextChar}"`
  }

  // 가이드 잠시 보기
  const peekGuide = () => {
    setShowGuide(true)
    if (guideTimer) clearTimeout(guideTimer)
    const timer = setTimeout(() => {
      setShowGuide(false)
    }, 3000)
    setGuideTimer(timer)
  }

  // 타이핑 완료 시 가이드 숨기기
  useEffect(() => {
    if (isFullMatch && phase === "typing") {
      setShowGuide(false)
    }
  }, [isFullMatch, phase])

  // 코드 실행 (시뮬레이션)
  const runCode = async () => {
    setIsRunning(true)
    setOutput(null)
    
    // 실행 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // 간단한 출력 시뮬레이션
    if (isFullMatch) {
      setOutput(expectedOutput)
      setIsCorrect(true)
      setPhase("complete")
      onComplete?.()
    } else {
      setOutput(isEn ? "❌ Please check your code again!" : "❌ 코드를 다시 확인해보세요!")
      setIsCorrect(false)
    }
    
    setIsRunning(false)
  }

  // 리셋
  const reset = () => {
    setUserCode("")
    setShowGuide(true)
    setOutput(null)
    setIsCorrect(false)
    setPhase("typing")
    textareaRef.current?.focus()
  }

  // 진행률 계산
  const safeTargetCode = targetCode || ''
  const progress = Math.min(100, safeTargetCode.length > 0 ? (userCode.length / safeTargetCode.length) * 100 : 0)

  // 줄 수 계산 (최소 4줄)
  const lineCount = Math.max(4, safeTargetCode.split('\n').length + 1)

  // ghost text: 아직 입력 안 한 부분을 흐리게 보여줌
  const ghostText = userCode.length < safeTargetCode.length 
    ? safeTargetCode.slice(userCode.length) 
    : ""

  return (
    <div className="bg-white rounded-2xl border-4 border-indigo-200 overflow-hidden shadow-lg">
      {/* 헤더 */}
      <div className="bg-indigo-50 px-3 py-2 md:px-4 md:py-3 border-b-2 border-indigo-100">
        <h3 className="font-bold text-indigo-700 text-base md:text-lg">{title}</h3>
        <p className="text-indigo-600 text-xs md:text-sm">{description}</p>
      </div>

      {/* 진행 바 */}
      <div className="h-1.5 md:h-2 bg-gray-200">
        <div 
          className={cn(
            "h-full transition-all duration-300",
            isFullMatch ? "bg-green-500" : isPartialMatch ? "bg-indigo-500" : "bg-red-400"
          )}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 모바일: 세로 레이아웃 / 데스크탑: 가로 레이아웃 */}
      <div className="p-3 md:p-4 space-y-3 md:space-y-4">
        
        {/* 모바일/태블릿: 가이드 토글 */}
        <div className="lg:hidden">
          {/* 가이드 보기/숨기기 버튼 */}
          <button
            onClick={() => setShowGuide(!showGuide)}
            className={cn(
              "w-full py-2 px-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all",
              showGuide 
                ? "bg-indigo-100 text-indigo-700" 
                : "bg-gray-100 text-gray-600"
            )}
          >
            {showGuide ? (
              <>
                <EyeOff className="w-4 h-4" />
                {isEn ? "Hide guide" : "가이드 숨기기"}
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                {isEn ? "Show guide (3s)" : "가이드 보기 (3초)"}
              </>
            )}
          </button>

          {/* 가이드 코드 (토글) */}
          <div className={cn(
            "transition-all duration-300 overflow-hidden",
            showGuide ? "max-h-[300px] opacity-100 mt-3" : "max-h-0 opacity-0"
          )}>
            <div className="bg-gray-800 rounded-xl p-3 font-mono text-[13px] md:text-[15px]">
              <div className="flex items-center gap-2 mb-2 text-gray-400 text-xs">
                <span>{isEn ? "📖 Type it like this" : "📖 이렇게 써보세요"}</span>
              </div>
              <div className="whitespace-pre-wrap">{highlightPython(targetCode)}</div>
            </div>
          </div>
        </div>

        {/* 데스크탑: 가로 레이아웃 */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-4">
          {/* 가이드 코드 (항상 보임) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500 font-medium flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {isEn ? "📖 Type it like this:" : "📖 이렇게 써보세요:"}
              </span>
              <button
                onClick={() => setShowGuide(!showGuide)}
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                {showGuide ? (isEn ? "Hide" : "숨기기") : (isEn ? "Show" : "보기")}
              </button>
            </div>
            <div className={cn(
              "bg-gray-800 rounded-xl p-4 font-mono text-[13px] md:text-[15px] transition-all",
              showGuide ? "opacity-100" : "opacity-20 blur-sm"
            )}>
              <div className="whitespace-pre-wrap">{highlightPython(targetCode)}</div>
            </div>
          </div>

          {/* 학생 입력 영역 */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-gray-600 font-medium">{isEn ? "✏️ Type it yourself:" : "✏️ 따라 써보세요:"}</span>
              {isFullMatch && (
                <span className="text-green-600 text-xs font-bold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> {isEn ? "Perfect!" : "완벽!"}
                </span>
              )}
            </div>
            <div className={cn(
              "rounded-xl overflow-hidden border-4 transition-colors relative",
              isFullMatch 
                ? "border-green-400 bg-green-900" 
                : isPartialMatch 
                  ? "border-indigo-300 bg-gray-900"
                  : userCode.length > 0 
                    ? "border-red-300 bg-gray-900"
                    : "border-gray-300 bg-gray-900"
            )}>
              {/* Ghost text: 남은 코드를 흐리게 표시 */}
              <div className="absolute inset-0 p-4 font-mono text-[14px] md:text-[15px] leading-[1.8] pointer-events-none whitespace-pre-wrap" aria-hidden="true">
                <span className="invisible">{userCode}</span>
                <span className="text-gray-600 opacity-40">{ghostText}</span>
              </div>
              <textarea
                ref={textareaRef}
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                className={cn(
                  "w-full p-4 font-mono text-[14px] md:text-[15px] leading-[1.8] bg-transparent outline-none resize-none relative z-10",
                  isFullMatch ? "text-green-300" : "text-yellow-300"
                )}
                placeholder=""
                spellCheck={false}
                autoCapitalize="off"
                autoCorrect="off"
                disabled={phase === "complete"}
                rows={lineCount}
              />
            </div>
          </div>
        </div>

        {/* 모바일/태블릿: 입력 영역 */}
        <div className="lg:hidden">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-600 font-medium">✏️ 따라 써보세요:</span>
            {isFullMatch && (
              <span className="text-green-600 text-xs font-bold flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> 완벽!
              </span>
            )}
          </div>
          <div className={cn(
            "rounded-xl overflow-hidden border-4 transition-colors relative",
            isFullMatch 
              ? "border-green-400 bg-green-900" 
              : isPartialMatch 
                ? "border-indigo-300 bg-gray-900"
                : userCode.length > 0 
                  ? "border-red-300 bg-gray-900"
                  : "border-gray-300 bg-gray-900"
          )}>
            {/* Ghost text: 남은 코드를 흐리게 표시 */}
            <div className="absolute inset-0 p-3 font-mono text-[14px] leading-[1.8] pointer-events-none whitespace-pre-wrap" aria-hidden="true">
              <span className="invisible">{userCode}</span>
              <span className="text-gray-600 opacity-40">{ghostText}</span>
            </div>
            <textarea
              ref={textareaRef}
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              className={cn(
                "w-full p-3 font-mono text-[14px] leading-[1.8] bg-transparent outline-none resize-none relative z-10",
                isFullMatch ? "text-green-300" : "text-yellow-300"
              )}
              placeholder=""
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              disabled={phase === "complete"}
              rows={lineCount}
            />
          </div>
        </div>

        {/* 다음 글자 힌트 (입력 시작 전 또는 중간에) */}
        {!isFullMatch && phase === "typing" && (
          <div className="flex items-center gap-2 text-xs md:text-sm">
            <span className="text-gray-400">
              {userCode.length === 0
                ? (isEn ? `👆 Check the guide above and start with ${getNextHint()}!` : `👆 위 가이드를 보고 첫 글자 ${getNextHint()} 부터 시작!`)
                : (isEn ? `Next char: ${getNextHint()}` : `다음 글자: ${getNextHint()}`)
              }
            </span>
            <span className="text-gray-300">
              ({userCode.length}/{targetCode.length})
            </span>
          </div>
        )}

        {/* 출력 결과 */}
        {output && (
          <div className={cn(
            "rounded-xl p-3 md:p-4 border-2",
            isCorrect 
              ? "bg-green-50 border-green-300" 
              : "bg-red-50 border-red-300"
          )}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs md:text-sm font-medium">
                {isCorrect ? (isEn ? "✅ Output:" : "✅ 출력 결과:") : (isEn ? "⚠️ Result:" : "⚠️ 결과:")}
              </span>
            </div>
            <pre className={cn(
              "font-mono text-xs md:text-sm whitespace-pre-wrap",
              isCorrect ? "text-green-700" : "text-red-600"
            )}>{output}</pre>
          </div>
        )}

        {/* 완료 메시지 */}
        {phase === "complete" && (
          <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-3 md:p-4 text-center animate-fadeIn">
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-indigo-500 mx-auto mb-2" />
            <p className="text-indigo-700 font-bold text-sm md:text-base">{isEn ? "🎉 Well done!" : "🎉 잘했어요!"}</p>
            <p className="text-indigo-600 text-xs md:text-sm">{isEn ? "You typed the code perfectly!" : "코드를 완벽하게 따라 썼어요!"}</p>
          </div>
        )}

        {/* 버튼들 */}
        <div className="flex gap-2 justify-center flex-wrap">
          {isFullMatch && phase === "typing" && (
            <button
              onClick={runCode}
              disabled={isRunning}
              type="button"
              className="px-4 py-2 md:px-6 md:py-2.5 bg-green-600 hover:bg-green-500 text-white font-bold text-sm md:text-base rounded-xl transition-all flex items-center gap-2 shadow-lg"
            >
              <Play className="w-4 h-4" />
              {isRunning ? (isEn ? "Running..." : "실행 중...") : (isEn ? "Run" : "실행하기")}
            </button>
          )}

          {phase === "complete" && (
            <button
              onClick={reset}
              type="button"
              className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-medium text-sm rounded-xl transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              {isEn ? "Try again" : "다시 하기"}
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
