"use client"

import { useState, useEffect, useCallback } from "react"
import { Play, Pause, RotateCcw, SkipForward } from "lucide-react"
import { cn } from "@/lib/utils"

interface ForLoopVisualizerProps {
  /** range의 끝 값 (기본: 5) */
  rangeEnd?: number
  /** range의 시작 값 (기본: 0) */
  rangeStart?: number
  /** range의 증가값 (기본: 1) */
  rangeStep?: number
  /** 반복 변수 이름 (기본: "i") */
  varName?: string
  /** 반복문 안에서 실행할 코드 템플릿 */
  bodyTemplate?: string
  /** 출력 형식 (기본: 변수 값만) */
  outputFormat?: (i: number) => string
  /** 애니메이션 속도 (ms) */
  speed?: number
  /** 제목 */
  title?: string
}

export function ForLoopVisualizer({
  rangeEnd = 5,
  rangeStart = 0,
  rangeStep = 1,
  varName = "i",
  bodyTemplate = `print(${varName})`,
  outputFormat = (i) => `${i}`,
  speed = 1000,
  title = "for 반복문 시각화"
}: ForLoopVisualizerProps) {
  const [currentIndex, setCurrentIndex] = useState(-1) // -1: 시작 전
  const [isPlaying, setIsPlaying] = useState(false)
  const [outputs, setOutputs] = useState<string[]>([])
  const [phase, setPhase] = useState<"idle" | "checking" | "executing" | "done">("idle")

  // range 값들 계산
  const rangeValues: number[] = []
  for (let i = rangeStart; i < rangeEnd; i += rangeStep) {
    rangeValues.push(i)
  }

  const totalSteps = rangeValues.length

  // 다음 스텝으로
  const nextStep = useCallback(() => {
    if (currentIndex < totalSteps - 1) {
      const nextIdx = currentIndex + 1
      setCurrentIndex(nextIdx)
      setPhase("checking")
      
      setTimeout(() => {
        setPhase("executing")
        setOutputs(prev => [...prev, outputFormat(rangeValues[nextIdx])])
      }, speed / 2)
    } else {
      setPhase("done")
      setIsPlaying(false)
    }
  }, [currentIndex, totalSteps, outputFormat, rangeValues, speed])

  // 자동 재생
  useEffect(() => {
    if (!isPlaying) return

    const timer = setTimeout(() => {
      nextStep()
    }, speed)

    return () => clearTimeout(timer)
  }, [isPlaying, currentIndex, nextStep, speed])

  // 재생/일시정지
  const togglePlay = () => {
    if (phase === "done") {
      reset()
      setTimeout(() => setIsPlaying(true), 100)
    } else {
      setIsPlaying(!isPlaying)
      if (!isPlaying && currentIndex === -1) {
        nextStep()
      }
    }
  }

  // 초기화
  const reset = () => {
    setCurrentIndex(-1)
    setOutputs([])
    setPhase("idle")
    setIsPlaying(false)
  }

  // 한 스텝 진행
  const stepForward = () => {
    if (!isPlaying && phase !== "done") {
      nextStep()
    }
  }

  // range 표시 문자열
  const rangeStr = rangeStep === 1 
    ? (rangeStart === 0 ? `range(${rangeEnd})` : `range(${rangeStart}, ${rangeEnd})`)
    : `range(${rangeStart}, ${rangeEnd}, ${rangeStep})`

  // 현재 값
  const currentValue = currentIndex >= 0 ? rangeValues[currentIndex] : null

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-4 sm:p-6 text-white overflow-hidden">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm sm:text-base font-medium text-slate-300">{title}</h3>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="hidden sm:inline">반복 횟수:</span>
          <span className="px-2 py-1 bg-slate-700 rounded-lg font-mono">
            {currentIndex + 1} / {totalSteps}
          </span>
        </div>
      </div>

      {/* 코드 영역 */}
      <div className="bg-slate-800/50 rounded-xl p-4 font-mono text-sm mb-4">
        {/* for 문 */}
        <div className="flex flex-wrap items-center gap-1 mb-2">
          <span className={cn(
            "px-2 py-1 rounded transition-all duration-300",
            phase === "checking" ? "bg-blue-500/40 text-blue-300 scale-105" : "text-blue-400"
          )}>
            for
          </span>
          
          <span className={cn(
            "px-2 py-1 rounded transition-all duration-300 font-bold",
            currentIndex >= 0 ? "bg-purple-500/40 text-purple-300" : "text-purple-400"
          )}>
            {varName}
          </span>
          
          <span className="text-slate-400">in</span>
          
          <span className={cn(
            "px-2 py-1 rounded transition-all duration-300",
            phase === "checking" ? "bg-orange-500/30 text-orange-300" : "text-orange-400"
          )}>
            {rangeStr}
          </span>
          
          <span className="text-slate-400">:</span>
        </div>

        {/* 바디 */}
        <div className={cn(
          "ml-6 px-3 py-2 rounded transition-all duration-300 border-l-2",
          phase === "executing" 
            ? "bg-green-500/20 border-green-500 text-green-300" 
            : "border-slate-600 text-slate-400"
        )}>
          {bodyTemplate.replace(new RegExp(varName, 'g'), currentValue !== null ? String(currentValue) : varName)}
        </div>
      </div>

      {/* 시각화 영역 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* range 값들 */}
        <div className="bg-slate-800/30 rounded-xl p-4">
          <p className="text-xs text-slate-400 mb-3 flex items-center gap-2">
            📦 <code className="text-orange-400">{rangeStr}</code> 가 만드는 숫자들
          </p>
          <div className="flex flex-wrap gap-2">
            {rangeValues.map((val, idx) => (
              <div
                key={idx}
                className={cn(
                  "w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center font-mono text-lg font-bold transition-all duration-300",
                  idx < currentIndex 
                    ? "bg-slate-600/50 text-slate-500 scale-90" // 지나감
                    : idx === currentIndex 
                      ? "bg-gradient-to-br from-purple-500 to-indigo-500 text-white scale-110 shadow-lg shadow-purple-500/30" // 현재
                      : "bg-slate-700/50 text-slate-400" // 대기
                )}
              >
                {val}
              </div>
            ))}
          </div>
          
          {/* 현재 i 값 표시 */}
          {currentValue !== null && (
            <div className="mt-4 flex items-center gap-2 text-sm animate-fade-in">
              <span className="text-slate-400">현재</span>
              <span className="px-2 py-1 bg-purple-500/30 rounded text-purple-300 font-mono">
                {varName} = {currentValue}
              </span>
            </div>
          )}
        </div>

        {/* 출력 영역 */}
        <div className="bg-slate-800/30 rounded-xl p-4">
          <p className="text-xs text-slate-400 mb-3">💬 출력 결과</p>
          <div className="bg-black/30 rounded-lg p-3 min-h-[100px] max-h-[150px] overflow-y-auto font-mono text-sm">
            {outputs.length === 0 ? (
              <span className="text-slate-600">출력 대기중...</span>
            ) : (
              outputs.map((output, idx) => (
                <div 
                  key={idx}
                  className={cn(
                    "text-green-400",
                    idx === outputs.length - 1 && "animate-slide-in"
                  )}
                >
                  {output}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 반복 흐름도 */}
      <div className="bg-slate-800/30 rounded-xl p-4 mb-4">
        <p className="text-xs text-slate-400 mb-3">🔄 반복 흐름</p>
        <div className="flex items-center justify-between gap-2 text-xs sm:text-sm overflow-x-auto pb-2">
          {/* 시작 */}
          <div className={cn(
            "flex-shrink-0 px-3 py-2 rounded-lg transition-all duration-300",
            phase === "idle" ? "bg-blue-500/30 text-blue-300" : "bg-slate-700/50 text-slate-500"
          )}>
            시작
          </div>
          
          <span className="text-slate-600">→</span>
          
          {/* 조건 확인 */}
          <div className={cn(
            "flex-shrink-0 px-3 py-2 rounded-lg transition-all duration-300",
            phase === "checking" ? "bg-yellow-500/30 text-yellow-300 animate-pulse" : "bg-slate-700/50 text-slate-500"
          )}>
            {varName} 가져오기
          </div>
          
          <span className="text-slate-600">→</span>
          
          {/* 실행 */}
          <div className={cn(
            "flex-shrink-0 px-3 py-2 rounded-lg transition-all duration-300",
            phase === "executing" ? "bg-green-500/30 text-green-300 animate-pulse" : "bg-slate-700/50 text-slate-500"
          )}>
            코드 실행
          </div>
          
          <span className="text-slate-600">→</span>
          
          {/* 반복/종료 */}
          <div className={cn(
            "flex-shrink-0 px-3 py-2 rounded-lg transition-all duration-300",
            phase === "done" 
              ? "bg-red-500/30 text-red-300" 
              : currentIndex >= 0 && phase !== "idle"
                ? "bg-indigo-500/30 text-indigo-300"
                : "bg-slate-700/50 text-slate-500"
          )}>
            {phase === "done" ? "종료 ✓" : "다음 반복"}
          </div>
        </div>
      </div>

      {/* 컨트롤 버튼 */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={togglePlay}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all",
            isPlaying
              ? "bg-yellow-600 hover:bg-yellow-500 text-white"
              : "bg-indigo-600 hover:bg-indigo-500 text-white"
          )}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4" />
              일시정지
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              {phase === "done" ? "다시 실행" : currentIndex === -1 ? "실행하기" : "계속"}
            </>
          )}
        </button>

        <button
          onClick={stepForward}
          disabled={isPlaying || phase === "done"}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all",
            isPlaying || phase === "done"
              ? "bg-slate-700 text-slate-500 cursor-not-allowed"
              : "bg-slate-700 hover:bg-slate-600 text-slate-300"
          )}
        >
          <SkipForward className="w-4 h-4" />
          한 단계
        </button>

        {currentIndex >= 0 && (
          <button
            onClick={reset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-slate-700 hover:bg-slate-600 text-slate-300 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            초기화
          </button>
        )}
      </div>

      {/* 완료 메시지 */}
      {phase === "done" && (
        <div className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-xl animate-scale-in">
          <p className="text-green-400 font-medium">
            ✅ 반복 완료! 총 {totalSteps}번 실행되었어요.
          </p>
          <p className="text-sm text-green-400/70 mt-1">
            {varName}가 {rangeStart}부터 {rangeEnd - 1}까지 {rangeStep}씩 증가하며 반복했어요.
          </p>
        </div>
      )}

      {/* CSS 애니메이션 */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

// 간단한 프리셋 컴포넌트들
export function BasicForLoop() {
  return (
    <ForLoopVisualizer
      rangeEnd={5}
      title="기본 for문: range(5)"
      bodyTemplate="print(i)"
      outputFormat={(i) => `${i}`}
    />
  )
}

export function ForLoopWithRange() {
  return (
    <ForLoopVisualizer
      rangeStart={1}
      rangeEnd={6}
      title="range(1, 6) - 1부터 5까지"
      bodyTemplate="print(i)"
      outputFormat={(i) => `${i}`}
    />
  )
}

export function ForLoopMultiplication() {
  return (
    <ForLoopVisualizer
      rangeStart={1}
      rangeEnd={10}
      varName="i"
      title="구구단 5단"
      bodyTemplate="print(f'5 x {i} = {5 * i}')"
      outputFormat={(i) => `5 x ${i} = ${5 * i}`}
      speed={800}
    />
  )
}

export function ForLoopEvenNumbers() {
  return (
    <ForLoopVisualizer
      rangeStart={2}
      rangeEnd={11}
      rangeStep={2}
      title="짝수만 출력: range(2, 11, 2)"
      bodyTemplate="print(i)"
      outputFormat={(i) => `${i}`}
    />
  )
}
