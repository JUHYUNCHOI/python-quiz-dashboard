"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Play, RotateCcw, Zap } from "lucide-react"

interface VisualizerProps {
  lang?: "ko" | "en"
}

export function MultipleReturnVisualizer({ lang = "ko" }: VisualizerProps) {
  const [step, setStep] = useState(0)

  const t = lang === "ko" ? {
    reset: "다시", twoValues: "2개 반환!", received: "각각 저장됨!",
    summary: "return 값1, 값2 → 변수1, 변수2 = 함수()",
  } : {
    reset: "Reset", twoValues: "Return 2!", received: "Stored separately!",
    summary: "return val1, val2 → var1, var2 = func()",
  }

  const next = () => setStep(s => Math.min(s + 1, 2))
  const reset = () => setStep(0)

  return (
    <div className="my-6">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 space-y-4">
        <div className="font-mono text-sm md:text-base">
          <div className="flex items-center gap-1">
            <span className="text-pink-400 font-bold">def</span>
            <span className="text-purple-300">나누기</span>
            <span className="text-slate-400">(숫자, 나누는수):</span>
          </div>
          <div className="pl-6 text-slate-300 mt-1">몫 = 숫자 // 나누는수</div>
          <div className="pl-6 text-slate-300">나머지 = 숫자 % 나누는수</div>
          <div className="pl-6 flex items-center gap-1 flex-wrap mt-1">
            <span className="text-green-400 font-bold">return</span>
            <span className={cn("px-2 py-0.5 rounded transition-all", step >= 1 ? "bg-blue-500 text-white font-bold" : "text-slate-300")}>몫</span>
            <span className="text-slate-400">,</span>
            <span className={cn("px-2 py-0.5 rounded transition-all", step >= 1 ? "bg-purple-500 text-white font-bold" : "text-slate-300")}>나머지</span>
            <span className="ml-2 text-xs text-green-300">← {t.twoValues}</span>
          </div>
        </div>

        <div className="border-t border-slate-700" />

        <div className="space-y-3">
          <div className="font-mono text-sm md:text-base flex items-center gap-2 flex-wrap">
            <span className={cn("px-2 py-0.5 rounded transition-all", step >= 2 ? "bg-blue-500 text-white font-bold" : "text-slate-300")}>몫</span>
            <span className="text-slate-400">,</span>
            <span className={cn("px-2 py-0.5 rounded transition-all", step >= 2 ? "bg-purple-500 text-white font-bold" : "text-slate-300")}>나머지</span>
            <span className="text-slate-400">=</span>
            <span className="text-purple-300">나누기</span>
            <span className="text-slate-400">(</span><span className="text-yellow-300">17, 5</span><span className="text-slate-400">)</span>
            {step === 0 && (<button onClick={next} className="ml-2 px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-500 text-white text-xs font-bold flex items-center gap-1 transition-all"><Play className="w-3 h-3" /> 실행</button>)}
          </div>

          {step >= 1 && (
            <div className="flex justify-center gap-6 py-4 animate-fadeIn">
              <div className="text-center">
                <div className="w-20 h-20 rounded-xl bg-blue-500/30 border-2 border-blue-400 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-blue-300">3</span>
                </div>
                <div className="mt-2 text-xs text-blue-300">17 // 5 = 3</div>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 rounded-xl bg-purple-500/30 border-2 border-purple-400 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-purple-300">2</span>
                </div>
                <div className="mt-2 text-xs text-purple-300">17 % 5 = 2</div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="flex justify-center">
              <button onClick={next} className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold flex items-center gap-2 transition-all">
                <Zap className="w-4 h-4" /> 변수에 저장!
              </button>
            </div>
          )}

          {step >= 2 && (
            <div className="space-y-2 animate-fadeIn">
              <div className="flex items-center justify-center gap-4">
                <span className="px-3 py-1 rounded bg-blue-500 text-white font-mono font-bold">몫 = 3</span>
                <span className="px-3 py-1 rounded bg-purple-500 text-white font-mono font-bold">나머지 = 2</span>
              </div>
              <p className="text-center text-xs text-slate-400">{t.received}</p>
            </div>
          )}
        </div>

        {step >= 2 && (
          <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-center animate-fadeIn">
            <code className="text-xs md:text-sm text-slate-300">{t.summary}</code>
          </div>
        )}
      </div>

      {step >= 2 && (
        <div className="flex justify-center mt-4">
          <button onClick={reset} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-all text-sm">
            <RotateCcw className="w-4 h-4" />{t.reset}
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
      `}</style>
    </div>
  )
}
