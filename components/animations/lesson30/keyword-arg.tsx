"use client"

import { useState } from "react"
import { Play, RotateCcw } from "lucide-react"

interface VisualizerProps {
  lang?: "ko" | "en"
}

export function KeywordArgVisualizer({ lang = "ko" }: VisualizerProps) {
  const [step, setStep] = useState(0)

  const t = lang === "ko" ? {
    reset: "다시", inOrder: "순서대로", shuffled: "순서 뒤죽박죽!",
    butWorks: "그래도 OK!", summary: "이름표(=) 붙이면 순서 상관없이 전달!",
  } : {
    reset: "Reset", inOrder: "In order", shuffled: "Order shuffled!",
    butWorks: "Still works!", summary: "With labels(=), order doesn't matter!",
  }

  const next = () => setStep(s => Math.min(s + 1, 2))
  const reset = () => setStep(0)

  return (
    <div className="my-6">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 space-y-4">
        <div className="font-mono text-sm md:text-base">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-pink-400 font-bold">def</span>
            <span className="text-purple-300">소개</span>
            <span className="text-slate-400">(</span>
            <span className="px-1.5 py-0.5 rounded bg-orange-500/30 text-orange-300">이름</span>
            <span className="text-slate-400">, </span>
            <span className="px-1.5 py-0.5 rounded bg-cyan-500/30 text-cyan-300">나이</span>
            <span className="text-slate-400">, </span>
            <span className="px-1.5 py-0.5 rounded bg-green-500/30 text-green-300">학교</span>
            <span className="text-slate-400">):</span>
          </div>
          <div className="pl-6 text-slate-300 mt-1">print(f&apos;{'{이름}'}, {'{나이}'}살, {'{학교}'}&apos;)</div>
        </div>

        <div className="border-t border-slate-700" />

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-1 rounded bg-slate-600 text-slate-300">{t.inOrder}</span>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="font-mono text-sm flex items-center gap-1">
              <span className="text-purple-300">소개</span><span className="text-slate-400">(</span>
              <span className="text-orange-300">&apos;철수&apos;</span><span className="text-slate-400">, </span>
              <span className="text-cyan-300">15</span><span className="text-slate-400">, </span>
              <span className="text-green-300">&apos;파이썬중&apos;</span><span className="text-slate-400">)</span>
            </div>
            {step === 0 && (<button onClick={next} className="px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-500 text-white text-xs font-bold flex items-center gap-1 transition-all"><Play className="w-3 h-3" /> 실행</button>)}
          </div>
          {step >= 1 && (
            <div className="flex items-center gap-3 pl-4 animate-fadeIn">
              <span className="text-slate-500">→</span>
              <span className="font-mono bg-green-500/20 text-green-400 px-3 py-1 rounded">&quot;철수, 15살, 파이썬중&quot;</span>
            </div>
          )}
        </div>

        {step >= 1 && (
          <>
            <div className="border-t border-slate-700" />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 rounded bg-amber-500/30 text-amber-300 font-bold">{t.shuffled}</span>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="font-mono text-sm flex items-center gap-1 flex-wrap">
                  <span className="text-purple-300">소개</span><span className="text-slate-400">(</span>
                  <span className="px-1.5 py-0.5 rounded bg-green-500/40 border border-green-500">
                    <span className="text-green-300">학교</span><span className="text-white">=</span><span className="text-yellow-300">&apos;코딩고&apos;</span>
                  </span>
                  <span className="text-slate-400">, </span>
                  <span className="px-1.5 py-0.5 rounded bg-orange-500/40 border border-orange-500">
                    <span className="text-orange-300">이름</span><span className="text-white">=</span><span className="text-yellow-300">&apos;영희&apos;</span>
                  </span>
                  <span className="text-slate-400">, </span>
                  <span className="px-1.5 py-0.5 rounded bg-cyan-500/40 border border-cyan-500">
                    <span className="text-cyan-300">나이</span><span className="text-white">=</span><span className="text-yellow-300">17</span>
                  </span>
                  <span className="text-slate-400">)</span>
                </div>
                {step === 1 && (<button onClick={next} className="px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-500 text-white text-xs font-bold flex items-center gap-1 transition-all"><Play className="w-3 h-3" /> 실행</button>)}
              </div>
              {step >= 2 && (
                <div className="flex items-center gap-3 pl-4 animate-fadeIn">
                  <span className="text-slate-500">→</span>
                  <span className="font-mono bg-green-500/20 text-green-400 px-3 py-1 rounded">&quot;영희, 17살, 코딩고&quot;</span>
                  <span className="text-xs px-2 py-1 rounded bg-green-500/30 text-green-300">{t.butWorks}</span>
                </div>
              )}
            </div>
          </>
        )}

        {step >= 2 && (
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-amber-500/20 to-green-500/20 animate-fadeIn">
            <p className="text-center font-bold text-slate-200">🏷️ {t.summary}</p>
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
        @keyframes fadeIn { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
      `}</style>
    </div>
  )
}
