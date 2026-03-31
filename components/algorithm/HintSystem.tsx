"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import type { Hint } from "@/data/algorithm/types"

interface Props {
  hints: Hint[]
}

export function HintSystem({ hints }: Props) {
  const [revealed, setRevealed] = useState(0)

  if (!hints.length) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-400">
        힌트가 없어요
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {hints.slice(0, revealed + 1).map((hint, i) => (
        <div
          key={i}
          className={cn(
            "bg-white rounded-2xl border p-4 transition-all",
            i < revealed ? "border-gray-100" : "border-orange-200 shadow-sm"
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className={cn(
              "w-5 h-5 rounded-full text-xs font-black flex items-center justify-center flex-shrink-0",
              i < revealed ? "bg-gray-100 text-gray-500" : "bg-orange-500 text-white"
            )}>
              {i + 1}
            </span>
            <p className="font-bold text-gray-800 text-sm">{hint.title}</p>
          </div>
          <div
            className="text-sm text-gray-600 leading-relaxed prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: hint.content }}
          />
        </div>
      ))}

      {revealed < hints.length - 1 ? (
        <button
          onClick={() => setRevealed(r => r + 1)}
          className="w-full py-3 rounded-2xl border-2 border-dashed border-orange-200 text-orange-500 font-bold text-sm hover:bg-orange-50 transition-colors"
        >
          💡 다음 힌트 보기 ({revealed + 1}/{hints.length})
        </button>
      ) : (
        <div className="text-center text-xs text-gray-400 py-2">
          ✅ 힌트를 모두 봤어요! 이제 코드를 확인해봐요 →
        </div>
      )}
    </div>
  )
}
