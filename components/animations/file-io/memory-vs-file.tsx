"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { HardDrive, Cpu, Power, PowerOff, Save, Upload } from "lucide-react"

/**
 * 변수 vs 파일 비교 애니메이션
 * - 왼쪽: RAM (변수) - 전원 끄면 사라짐
 * - 오른쪽: 디스크 (파일) - 전원 꺼도 남아있음
 */
export function MemoryVsFileAnimation() {
  const [phase, setPhase] = useState<"running" | "off" | "restart">("running")
  const [saved, setSaved] = useState(false)

  const ramData = [
    { name: "점수", value: "100" },
    { name: "레벨", value: "5" },
    { name: "이름", value: '"용사"' },
  ]

  const fileData = [
    { name: "save.txt", value: "100,5,용사" },
  ]

  const handlePowerOff = () => {
    setPhase("off")
    setTimeout(() => setPhase("restart"), 1500)
  }

  const handleSaveAndOff = () => {
    setSaved(true)
    setTimeout(() => {
      setPhase("off")
      setTimeout(() => setPhase("restart"), 1500)
    }, 800)
  }

  const reset = () => {
    setPhase("running")
    setSaved(false)
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-4 md:p-6 border-2 border-blue-200">
      <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4">
        {/* RAM (변수) */}
        <div className={cn(
          "rounded-xl p-3 md:p-4 border-2 transition-all duration-500",
          phase === "running" ? "bg-green-50 border-green-300" : "bg-gray-100 border-gray-300"
        )}>
          <div className="flex items-center gap-2 mb-3">
            <Cpu className={cn("w-5 h-5", phase === "running" ? "text-green-600" : "text-gray-400")} />
            <span className="font-bold text-sm">RAM (변수)</span>
          </div>
          <div className="space-y-2">
            {ramData.map((item, i) => (
              <div key={i} className={cn(
                "rounded-lg px-3 py-1.5 text-xs md:text-sm font-mono transition-all duration-500",
                phase === "running" 
                  ? "bg-green-100 text-green-800" 
                  : "bg-gray-200 text-gray-400 line-through opacity-50"
              )}>
                {item.name} = {item.value}
              </div>
            ))}
          </div>
          <div className={cn(
            "mt-3 text-center text-xs font-bold py-1 rounded-lg transition-all",
            phase === "running" ? "bg-green-200 text-green-700" : "bg-red-100 text-red-600"
          )}>
            {phase === "running" ? "✅ 데이터 있음" : "💨 전부 사라짐!"}
          </div>
        </div>

        {/* 디스크 (파일) */}
        <div className={cn(
          "rounded-xl p-3 md:p-4 border-2 transition-all duration-500",
          "bg-blue-50 border-blue-300"
        )}>
          <div className="flex items-center gap-2 mb-3">
            <HardDrive className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-sm">디스크 (파일)</span>
          </div>
          <div className="space-y-2">
            {saved || phase === "restart" ? (
              fileData.map((item, i) => (
                <div key={i} className="rounded-lg px-3 py-1.5 text-xs md:text-sm font-mono bg-blue-100 text-blue-800">
                  📄 {item.name}: {item.value}
                </div>
              ))
            ) : (
              <div className="rounded-lg px-3 py-3 text-xs text-gray-400 text-center bg-gray-100">
                (비어있음)
              </div>
            )}
          </div>
          <div className={cn(
            "mt-3 text-center text-xs font-bold py-1 rounded-lg",
            saved || phase === "restart" ? "bg-blue-200 text-blue-700" : "bg-gray-100 text-gray-400"
          )}>
            {saved || phase === "restart" ? "💾 데이터 안전!" : "저장 안 됨"}
          </div>
        </div>
      </div>

      {/* 상태 표시 */}
      <div className={cn(
        "text-center py-2 rounded-xl mb-4 font-bold text-sm transition-all",
        phase === "running" ? "bg-green-100 text-green-700" :
        phase === "off" ? "bg-gray-800 text-gray-400" :
        "bg-yellow-100 text-yellow-700"
      )}>
        {phase === "running" && "🟢 프로그램 실행 중"}
        {phase === "off" && "⚫ 프로그램 종료됨..."}
        {phase === "restart" && (saved ? "🎉 파일에서 데이터 복구!" : "😢 데이터 모두 잃어버림!")}
      </div>

      {/* 버튼 */}
      <div className="flex gap-2 justify-center flex-wrap">
        {phase === "running" && !saved && (
          <>
            <button
              onClick={handlePowerOff}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-bold flex items-center gap-1.5 transition-colors"
            >
              <PowerOff className="w-4 h-4" />
              그냥 끄기
            </button>
            <button
              onClick={handleSaveAndOff}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-bold flex items-center gap-1.5 transition-colors"
            >
              <Save className="w-4 h-4" />
              저장하고 끄기
            </button>
          </>
        )}
        {phase === "running" && saved && (
          <div className="text-blue-600 font-bold text-sm animate-pulse">💾 저장 중...</div>
        )}
        {phase === "restart" && (
          <button
            onClick={reset}
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-sm font-bold flex items-center gap-1.5 transition-colors"
          >
            <Power className="w-4 h-4" />
            다시 해보기
          </button>
        )}
      </div>
    </div>
  )
}
