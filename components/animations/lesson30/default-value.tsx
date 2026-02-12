"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Play, RotateCcw } from "lucide-react"

interface VisualizerProps {
  lang?: "ko" | "en"
}

export function DefaultValueVisualizer({ lang = "ko" }: VisualizerProps) {
  const [step, setStep] = useState(0)
  
  const t = lang === "ko" ? {
    reset: "다시", noMsg: "메시지 없음!", hasMsg: "메시지 있음!",
    usedDefault: "='안녕' 사용됨!", usedGiven: "'반가워' 사용됨!", summary: "안 주면 기본값, 주면 그 값!",
  } : {
    reset: "Reset", noMsg: "No message!", hasMsg: "Has message!",
    usedDefault: "='Hi' used!", usedGiven: "'Nice to meet you' used!", summary: "Not given → default, Given → that value!",
  }

  const next = () => setStep(s => Math.min(s + 1, 2))
  const reset = () => setStep(0)

  return (
    <div className="my-6">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 space-y-4">
        <div className="font-mono text-sm md:text-base">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-pink-400 font-bold">def</span>
            <span className="text-purple-300">인사</span>
            <span className="text-slate-400">(이름, 메시지</span>
            <span className={cn("px-2 py-1 rounded-lg font-bold transition-all", "bg-amber-500 text-white")}>=&apos;안녕&apos;</span>
            <span className="text-slate-400">):</span>
            <span className="ml-2 text-xs text-amber-300">← 기본값!</span>
          </div>
          <div className="pl-6 text-slate-300 mt-2">print(f&apos;{'{메시지}'}, {'{이름}'}!&apos;)</div>
        </div>

        <div className="border-t border-slate-700" />

        <div className="space-y-2">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="font-mono text-sm md:text-base flex items-center gap-1">
              <span className="text-purple-300">인사</span><span className="text-slate-400">(</span><span className="text-yellow-300">&apos;철수&apos;</span><span className="text-slate-400">)</span>
            </div>
            <span className="text-xs px-2 py-1 rounded bg-orange-500/30 text-orange-300">{t.noMsg}</span>
            {step === 0 && (<button onClick={next} className="px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-500 text-white text-xs font-bold flex items-center gap-1 transition-all"><Play className="w-3 h-3" /> 실행</button>)}
          </div>
          {step >= 1 && (
            <div className="flex items-center gap-3 pl-4 animate-fadeIn">
              <span className="text-slate-500">→</span>
              <span className="font-mono bg-green-500/20 text-green-400 px-3 py-1 rounded">&quot;<span className="text-amber-300 font-bold underline">안녕</span>, 철수!&quot;</span>
              <span className="text-xs px-2 py-1 rounded bg-amber-500/30 text-amber-300">{t.usedDefault}</span>
            </div>
          )}
        </div>

        {step >= 1 && (
          <>
            <div className="border-t border-slate-700" />
            <div className="space-y-2">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="font-mono text-sm md:text-base flex items-center gap-1">
                  <span className="text-purple-300">인사</span><span className="text-slate-400">(</span><span className="text-yellow-300">&apos;영희&apos;</span><span className="text-slate-400">, </span>
                  <span className="px-2 py-0.5 rounded bg-cyan-500 text-white font-bold">&apos;반가워&apos;</span><span className="text-slate-400">)</span>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-cyan-500/30 text-cyan-300">{t.hasMsg}</span>
                {step === 1 && (<button onClick={next} className="px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-500 text-white text-xs font-bold flex items-center gap-1 transition-all"><Play className="w-3 h-3" /> 실행</button>)}
              </div>
              {step >= 2 && (
                <div className="flex items-center gap-3 pl-4 animate-fadeIn">
                  <span className="text-slate-500">→</span>
                  <span className="font-mono bg-green-500/20 text-green-400 px-3 py-1 rounded">&quot;<span className="text-cyan-300 font-bold underline">반가워</span>, 영희!&quot;</span>
                  <span className="text-xs px-2 py-1 rounded bg-cyan-500/30 text-cyan-300">{t.usedGiven}</span>
                </div>
              )}
            </div>
          </>
        )}

        {step >= 2 && (
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-amber-500/20 to-cyan-500/20 animate-fadeIn">
            <p className="text-center font-bold text-slate-200">💡 {t.summary}</p>
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
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
      `}</style>
    </div>
  )
}
