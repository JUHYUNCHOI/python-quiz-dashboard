"use client"

import { useState } from "react"
import { Plus, RefreshCw, Search, Shuffle } from "lucide-react"
import { cn } from "@/lib/utils"
import { ProblemCard } from "./shared"

export function SetAnimation() {
  const [items, setItems] = useState<string[]>(["철수", "영희", "민수"])
  const [message, setMessage] = useState("")
  const [bounceItem, setBounceItem] = useState<string | null>(null)
  const [rejectItem, setRejectItem] = useState<string | null>(null)
  const [showProblem, setShowProblem] = useState(true)
  const [overlay, setOverlay] = useState<{ emoji: string; text: string; subtext?: string } | null>(null)

  const addItem = () => {
    if (overlay) return
    const allStudents = ["철수", "영희", "민수", "지민", "수진", "현우"]
    const tryDuplicate = Math.random() > 0.5 && items.length > 0
    if (tryDuplicate) {
      const existing = items[Math.floor(Math.random() * items.length)]
      setRejectItem(existing); setBounceItem(existing)
      
      setOverlay({ emoji: "❌", text: `"${existing}" 이미 있어요!`, subtext: "집합은 중복 불가!" })
      
      setTimeout(() => {
        setOverlay(null)
        setRejectItem(null)
        setBounceItem(null)
      }, 1500)
    } else {
      const available = allStudents.filter(s => !items.includes(s))
      if (available.length > 0) {
        const newStudent = available[Math.floor(Math.random() * available.length)]
        setItems([...items, newStudent])
        setBounceItem(newStudent)
        
        setOverlay({ emoji: "✅", text: `"${newStudent}" 출석!`, subtext: "새로운 학생 추가!" })
        
        setTimeout(() => {
          setOverlay(null)
          setBounceItem(null)
        }, 1500)
      } else {
        setOverlay({ emoji: "🎉", text: "모두 출석!", subtext: "더 이상 추가할 학생이 없어요" })
        setTimeout(() => setOverlay(null), 1500)
      }
    }
  }

  const checkMembership = () => {
    if (items.length === 0 || overlay) return
    const student = items[Math.floor(Math.random() * items.length)]
    setBounceItem(student)
    
    setOverlay({ emoji: "⚡", text: `"${student}" 왔나요?`, subtext: "Yes! 바로 확인!" })
    
    setTimeout(() => {
      setOverlay(null)
      setBounceItem(null)
    }, 1500)
  }

  const reset = () => {
    setItems(["철수", "영희", "민수"]); setMessage(""); setBounceItem(null); setRejectItem(null); setShowProblem(true); setOverlay(null)
  }

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shuffle className="w-5 h-5 text-green-600" />
          <h3 className="font-bold text-lg text-green-800">Set - 집합</h3>
        </div>
        <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">출석부 ✋</span>
      </div>

      {showProblem ? (
        <ProblemCard
          problem={{
            emoji: "😱",
            title: "리스트로 출석체크하면?",
            subtitle: "중복도 되고, 찾기도 느려요!",
            code: ['attendance = ["철수", "영희", "철수"]', '# 철수가 2번 출석? 🤔', '# "민수 왔나?" → 처음부터 확인...']
          }}
          solution={{
            emoji: "✋",
            title: "집합은 중복 자동 제거!",
            subtitle: '"왔나?" 바로 확인!',
            code: 'attendance = {"철수", "영희"}  # 중복 불가!'
          }}
          buttonColor="bg-green-500 hover:bg-green-600"
          onContinue={() => setShowProblem(false)}
        />
      ) : (
        <>
          <div className="bg-green-100 border-2 border-green-300 rounded-lg px-4 py-2">
            <p className="text-sm text-green-800">✋ <strong>출석부</strong> = 중복 없이, "왔나?" 바로 확인!</p>
          </div>

          <div className="bg-gradient-to-b from-slate-100 to-slate-200 rounded-xl p-4 border-4 border-slate-300 shadow-inner relative overflow-hidden">
            {overlay && (
              <div className={cn(
                "absolute inset-0 rounded-lg z-20 flex items-center justify-center",
                overlay.emoji === "❌" ? "bg-red-500/95" : 
                overlay.emoji === "⚡" ? "bg-blue-500/95" : "bg-green-500/95"
              )}>
                <div className="text-center text-white">
                  <div className="text-6xl mb-2 animate-bounce">{overlay.emoji}</div>
                  <div className="text-2xl font-black">{overlay.text}</div>
                  {overlay.subtext && (
                    <div className="text-lg mt-1 opacity-90">{overlay.subtext}</div>
                  )}
                </div>
              </div>
            )}
            
            <div className="bg-white rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-2">📋 출석 명단</p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-2xl text-green-600 font-bold">{"{"}</span>
                {items.map((student, i) => (
                  <div key={`${student}-${i}`}
                    className={cn("px-3 py-2 rounded-full text-sm font-medium transition-all duration-300",
                      "bg-green-200 border-2 border-green-400",
                      bounceItem === student && "animate-bounce ring-2 ring-green-500 scale-110")}>
                    {student}
                  </div>
                ))}
                <span className="text-2xl text-green-600 font-bold">{"}"}</span>
                {rejectItem && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-2 rounded-full text-sm font-medium bg-red-200 border-2 border-red-400 animate-reject">
                    {rejectItem} 💥
                  </div>
                )}
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3 text-center">❌ 순서 없음 | ❌ 중복 불가 | ⚡ 멤버십 확인 빠름</p>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button onClick={addItem} className="flex items-center gap-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium">
              <Plus className="w-4 h-4" /> 출석
            </button>
            <button onClick={checkMembership} disabled={items.length === 0} className="flex items-center gap-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-lg text-sm font-medium">
              <Search className="w-4 h-4" /> 왔나?
            </button>
            <button onClick={reset} className="flex items-center gap-1 px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-medium">
              <RefreshCw className="w-4 h-4" /> 리셋
            </button>
          </div>

          <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm">
            <span className="text-gray-400"># 집합 = 중복X, 순서X</span><br />
            <span className="text-green-400">attendance</span><span className="text-white"> = {"{"}</span>
            <span className="text-yellow-400">"철수", "영희", "민수"</span><span className="text-white">{"}"}</span>
          </div>
        </>
      )}
      
      <style jsx>{`
        @keyframes reject { 0% { transform: translateX(0) translateY(-50%); opacity: 1; } 100% { transform: translateX(100px) translateY(-50%); opacity: 0; } }
        .animate-reject { animation: reject 0.8s ease-out forwards; }
      `}</style>
    </div>
  )
}
