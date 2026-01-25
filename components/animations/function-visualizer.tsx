"use client"

import { useState } from "react"
import { Play, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface FunctionVisualizerProps {
  funcName?: string
  params?: string[]
  body?: string
  callArgs?: string[]
  output?: string
}

export function FunctionVisualizer({
  funcName = "greet",
  params = ["name"],
  body = 'print(f"Hello, {name}!")',
  callArgs = ["Tom"],
  output = "Hello, Tom!"
}: FunctionVisualizerProps) {
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const runAnimation = () => {
    setIsPlaying(true)
    setStep(1)
    
    const steps = [1, 2, 3, 4, 5]
    let i = 0
    
    const interval = setInterval(() => {
      i++
      if (i < steps.length) {
        setStep(steps[i])
      } else {
        clearInterval(interval)
        setIsPlaying(false)
      }
    }, 1200)
  }

  const reset = () => {
    setStep(0)
    setIsPlaying(false)
  }

  // 파라미터 문자열 생성
  const paramsStr = params.join(", ")
  const argsStr = callArgs.map(a => `"${a}"`).join(", ")

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white overflow-hidden">
      {/* 함수 정의 영역 */}
      <div className="mb-6">
        <p className="text-xs text-slate-400 mb-2">📦 함수 정의</p>
        <div className="bg-slate-800/50 rounded-xl p-4 font-mono text-sm md:text-base relative overflow-x-auto">
          {/* 코드 라인 */}
          <div className="flex flex-wrap items-center gap-1">
            <span 
              className={cn(
                "px-2 py-1 rounded transition-all duration-500",
                step >= 1 ? "bg-blue-500/30 text-blue-300 scale-105" : "text-slate-300"
              )}
            >
              def
            </span>
            
            <span 
              className={cn(
                "px-2 py-1 rounded transition-all duration-500",
                step >= 1 ? "bg-purple-500/30 text-purple-300 scale-105" : "text-slate-300"
              )}
            >
              {funcName}
            </span>
            
            <span className="text-slate-400">(</span>
            
            <span 
              className={cn(
                "px-2 py-1 rounded transition-all duration-500",
                step >= 2 ? "bg-orange-500/30 text-orange-300 scale-105" : "text-slate-300"
              )}
            >
              {paramsStr}
            </span>
            
            <span className="text-slate-400">):</span>
          </div>
          
          {/* 함수 바디 */}
          <div 
            className={cn(
              "ml-8 mt-2 px-2 py-1 rounded transition-all duration-500",
              step >= 3 ? "bg-green-500/20 text-green-300" : "text-slate-400"
            )}
          >
            {body}
          </div>

          {/* 라벨들 */}
          {step >= 1 && (
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-slate-700 animate-fade-in">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-blue-500"></span>
                <span className="text-xs text-slate-400">키워드 (만들기)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-purple-500"></span>
                <span className="text-xs text-slate-400">함수 이름</span>
              </div>
              {step >= 2 && (
                <div className="flex items-center gap-2 animate-fade-in">
                  <span className="w-3 h-3 rounded bg-orange-500"></span>
                  <span className="text-xs text-slate-400">파라미터 (재료)</span>
                </div>
              )}
              {step >= 3 && (
                <div className="flex items-center gap-2 animate-fade-in">
                  <span className="w-3 h-3 rounded bg-green-500"></span>
                  <span className="text-xs text-slate-400">실행 코드</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 함수 호출 영역 */}
      {step >= 4 && (
        <div className="mb-6 animate-slide-up">
          <p className="text-xs text-slate-400 mb-2">🚀 함수 호출</p>
          <div className="bg-slate-800/50 rounded-xl p-4 font-mono text-sm md:text-base">
            <div className="flex flex-wrap items-center gap-1">
              <span className="px-2 py-1 rounded bg-purple-500/30 text-purple-300">
                {funcName}
              </span>
              <span className="text-slate-400">(</span>
              <span className="px-2 py-1 rounded bg-yellow-500/30 text-yellow-300 animate-pulse">
                {argsStr}
              </span>
              <span className="text-slate-400">)</span>
            </div>
            
            {/* 값 전달 애니메이션 */}
            <div className="mt-3 flex items-center gap-2 text-xs animate-fade-in">
              <span className="px-2 py-1 rounded bg-yellow-500/30 text-yellow-300">
                "{callArgs[0]}"
              </span>
              <span className="text-slate-400 animate-bounce-x">→</span>
              <span className="px-2 py-1 rounded bg-orange-500/30 text-orange-300">
                {params[0]}
              </span>
              <span className="text-slate-500 text-xs">에 들어감!</span>
            </div>
          </div>
        </div>
      )}

      {/* 출력 결과 */}
      {step >= 5 && (
        <div className="animate-scale-in">
          <p className="text-xs text-slate-400 mb-2">✨ 결과</p>
          <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 font-mono animate-glow">
            <span className="text-green-400">{output}</span>
          </div>
        </div>
      )}

      {/* 컨트롤 버튼 */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={runAnimation}
          disabled={isPlaying}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all",
            isPlaying 
              ? "bg-slate-700 text-slate-500 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-500 text-white"
          )}
        >
          <Play className="w-4 h-4" />
          {step === 0 ? "실행하기" : "다시 실행"}
        </button>
        
        {step > 0 && (
          <button
            onClick={reset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-slate-700 hover:bg-slate-600 text-slate-300 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            초기화
          </button>
        )}
      </div>

      {/* CSS 애니메이션 */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 0px rgba(34,197,94,0); }
          50% { box-shadow: 0 0 20px rgba(34,197,94,0.3); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.4s ease-out forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }
        .animate-bounce-x {
          animation: bounce-x 1s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 1.5s ease-in-out 2;
        }
      `}</style>
    </div>
  )
}
