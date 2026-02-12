"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronRight, Sparkles } from "lucide-react"

interface PatternDiscoveryProps {
  onComplete?: () => void
}

export function PatternDiscovery({ onComplete }: PatternDiscoveryProps) {
  const [step, setStep] = useState(0)

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      onComplete?.()
    }
  }

  return (
    <div className="space-y-4">
      {/* Step 0: 질문 */}
      <div className="bg-indigo-50 rounded-2xl p-5 border-4 border-indigo-200">
        <p className="text-indigo-700 font-bold text-lg md:text-xl text-center">
          🔍 방금 코드에서 반복되는 부분을 찾아볼까요?
        </p>
      </div>

      {/* 코드 영역 */}
      <div className="bg-gray-900 rounded-2xl p-4 md:p-6 font-mono text-sm md:text-base">
        {/* 줄 1 */}
        <div className="flex items-center">
          <span className="text-gray-500 w-6 select-none">1</span>
          <span className="text-purple-400">print</span>
          <span className="text-white">(</span>
          <span className="text-amber-300">"</span>
          <span className={cn(
            "transition-all duration-500",
            step >= 1 ? "bg-yellow-500/40 text-yellow-200 px-1 rounded" : "text-amber-300"
          )}>생일 축하해! 행복한 하루 보내, </span>
          <span className={cn(
            "transition-all duration-500",
            step >= 2 ? "bg-green-500/40 text-green-300 px-1 rounded font-bold" : "text-amber-300"
          )}>철수</span>
          <span className="text-amber-300">!"</span>
          <span className="text-white">)</span>
        </div>

        {/* 줄 2 */}
        <div className="flex items-center mt-1">
          <span className="text-gray-500 w-6 select-none">2</span>
          <span className="text-purple-400">print</span>
          <span className="text-white">(</span>
          <span className="text-amber-300">"</span>
          <span className={cn(
            "transition-all duration-500",
            step >= 1 ? "bg-yellow-500/40 text-yellow-200 px-1 rounded" : "text-amber-300"
          )}>생일 축하해! 행복한 하루 보내, </span>
          <span className={cn(
            "transition-all duration-500",
            step >= 2 ? "bg-green-500/40 text-green-300 px-1 rounded font-bold" : "text-amber-300"
          )}>영희</span>
          <span className="text-amber-300">!"</span>
          <span className="text-white">)</span>
        </div>

        {/* 줄 3 */}
        <div className="flex items-center mt-1">
          <span className="text-gray-500 w-6 select-none">3</span>
          <span className="text-purple-400">print</span>
          <span className="text-white">(</span>
          <span className="text-amber-300">"</span>
          <span className={cn(
            "transition-all duration-500",
            step >= 1 ? "bg-yellow-500/40 text-yellow-200 px-1 rounded" : "text-amber-300"
          )}>생일 축하해! 행복한 하루 보내, </span>
          <span className={cn(
            "transition-all duration-500",
            step >= 2 ? "bg-green-500/40 text-green-300 px-1 rounded font-bold" : "text-amber-300"
          )}>민수</span>
          <span className="text-amber-300">!"</span>
          <span className="text-white">)</span>
        </div>

        {/* ... 표시 */}
        <div className="flex items-center mt-1 opacity-50">
          <span className="text-gray-500 w-6 select-none">:</span>
          <span className="text-gray-500">... (7줄 더)</span>
        </div>
      </div>

      {/* Step별 메시지 */}
      <div className="min-h-[120px]">
        {step === 0 && (
          <div className="bg-white rounded-2xl p-5 border-4 border-gray-200 animate-fadeIn">
            <p className="text-gray-600 text-center">
              👆 버튼을 눌러서 반복되는 부분을 찾아봐요!
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-yellow-50 rounded-2xl p-5 border-4 border-yellow-300 animate-fadeIn">
            <div className="flex items-center gap-3">
              <span className="text-3xl">💡</span>
              <div>
                <p className="text-yellow-700 font-bold text-lg">찾았다!</p>
                <p className="text-yellow-600">
                  <span className="bg-yellow-200 px-2 py-0.5 rounded font-mono">"생일 축하해! 행복한 하루 보내, "</span>
                  <span className="ml-2">이 부분이 계속 반복돼요!</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-green-50 rounded-2xl p-5 border-4 border-green-300 animate-fadeIn">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎯</span>
              <div>
                <p className="text-green-700 font-bold text-lg">달라지는 건?</p>
                <p className="text-green-600">
                  오직 <span className="bg-green-200 px-2 py-0.5 rounded font-bold">이름</span>뿐이에요!
                  <span className="ml-2">철수, 영희, 민수...</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-indigo-100 rounded-2xl p-5 border-4 border-indigo-300 animate-fadeIn">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-indigo-500" />
              <div>
                <p className="text-indigo-700 font-bold text-lg">그렇다면!</p>
                <p className="text-indigo-600">
                  반복되는 부분은 <strong>한 번만</strong> 쓰고,
                  <br />달라지는 <strong>이름</strong>만 바꿔 넣을 수 있다면?
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 다음 버튼 */}
      <div className="text-center">
        <button
          onClick={handleNext}
          className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          {step === 0 && "반복 찾기 👀"}
          {step === 1 && "달라지는 건? 🤔"}
          {step === 2 && "그래서? 💡"}
          {step === 3 && "해결책 보기! ✨"}
          <ChevronRight className="w-5 h-5 inline ml-1" />
        </button>
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
