"use client"

import { useState, useRef } from "react"
import { Plus, Minus, RefreshCw, Lock, ScanSearch, Edit3 } from "lucide-react"
import { cn } from "@/lib/utils"
import { ProblemCard } from "./shared"

export function TupleAnimation() {
  const [items] = useState([
    { emoji: "🔴", name: "빨강", value: 255 }, 
    { emoji: "🟠", name: "주황", value: 200 }, 
    { emoji: "🟡", name: "노랑", value: 180 }, 
    { emoji: "🟢", name: "초록", value: 128 }, 
    { emoji: "🔵", name: "파랑", value: 64 }
  ])
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [shakeIndex, setShakeIndex] = useState<number | null>(null)
  const [message, setMessage] = useState("")
  const [showProblem, setShowProblem] = useState(true)
  const [mode, setMode] = useState<"normal" | "searching">("normal")
  const [scanIndex, setScanIndex] = useState(-1)
  const [foundIndex, setFoundIndex] = useState<number | null>(null)
  const [overlay, setOverlay] = useState<{ emoji: string; text: string; subtext?: string } | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const readItem = (index: number) => {
    if (mode !== "normal") return
    setOpenIndex(index)
    setMessage(`✅ #${index}번 바로 읽기! ${items[index].emoji} ${items[index].name} = ${items[index].value}`)
    setTimeout(() => setOpenIndex(null), 2000)
  }

  const tryModify = () => {
    if (mode !== "normal") return
    const index = Math.floor(Math.random() * items.length)
    setShakeIndex(index)
    setMessage(`❌ 수정 불가! 튜플은 한 번 만들면 바꿀 수 없어요!`)
    setTimeout(() => setShakeIndex(null), 600)
  }

  const tryInsert = () => {
    if (mode !== "normal") return
    const index = 1
    setShakeIndex(index)
    setMessage(`❌ 삽입 불가! 튜플은 중간에 추가할 수 없어요!`)
    setTimeout(() => setShakeIndex(null), 600)
  }

  const tryDelete = () => {
    if (mode !== "normal") return
    const index = 1
    setShakeIndex(index)
    setMessage(`❌ 삭제 불가! 튜플은 중간에서 삭제할 수 없어요!`)
    setTimeout(() => setShakeIndex(null), 600)
  }

  const searchByValue = () => {
    if (mode !== "normal") return
    
    const targetIndex = items.length - 1
    const target = items[targetIndex]
    
    setMode("searching")
    setScanIndex(-1)
    setFoundIndex(null)
    setMessage("")
    
    setOverlay({ emoji: target.emoji, text: `${target.name}을 찾아볼게요!`, subtext: "0번부터 하나씩 확인해야 해요..." })
    
    setTimeout(() => {
      setOverlay(null)
      
      setTimeout(() => {
        let currentScan = 0
        intervalRef.current = setInterval(() => {
          if (currentScan > 0) setOpenIndex(null)
          
          setTimeout(() => {
            setScanIndex(currentScan)
            setOpenIndex(currentScan)
            
            if (currentScan === targetIndex) {
              clearInterval(intervalRef.current!)
              setFoundIndex(currentScan)
              setMessage(`✅ #${currentScan}번에서 "${target.emoji} ${target.name}" 발견!`)
              
              setTimeout(() => {
                setOpenIndex(null)
                setOverlay({ emoji: "😓", text: `${currentScan + 1}개나 확인했어요!`, subtext: "튜플도 리스트처럼 처음부터 찾아야..." })
                
                setTimeout(() => {
                  setOverlay(null)
                  setMode("normal")
                  setScanIndex(-1)
                  setFoundIndex(null)
                  setMessage("")
                }, 2500)
              }, 1000)
            } else {
              setMessage(`🔍 #${currentScan}번... "${items[currentScan].emoji} ${items[currentScan].name}"? 아니야!`)
              currentScan++
            }
          }, 150)
        }, 700)
      }, 500)
    }, 2000)
  }

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setOpenIndex(null)
    setShakeIndex(null)
    setMessage("")
    setShowProblem(true)
    setMode("normal")
    setScanIndex(-1)
    setFoundIndex(null)
    setOverlay(null)
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-purple-600" />
          <h3 className="font-bold text-lg text-purple-800">Tuple - 튜플</h3>
        </div>
        <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full">고정된 값 🔒</span>
      </div>

      {showProblem ? (
        <ProblemCard
          problem={{
            emoji: "😱",
            title: "리스트로 RGB 저장하면?",
            subtitle: "실수로 수정될 수 있어요!",
            code: ['color = [255, 128, 64]  # 주황색', 'color[0] = 0  # 실수로 수정!', '# 갑자기 다른 색이 됨 😱']
          }}
          solution={{
            emoji: "🔒",
            title: "튜플은 수정이 안 돼요!",
            subtitle: "실수로 바꿀 일이 없어요!",
            code: 'color = (255, 200, 180, 128, 64)  # 튜플!'
          }}
          buttonColor="bg-purple-500 hover:bg-purple-600"
          onContinue={() => setShowProblem(false)}
        />
      ) : (
        <>
          <div className="bg-purple-100 border-2 border-purple-300 rounded-lg px-4 py-2">
            <p className="text-sm text-purple-800">
              🔒 <strong>튜플 = 리스트랑 비슷!</strong> 순서 있고, 번호로 읽기 OK<br/>
              <span className="text-purple-600">❌ 단, 추가/삭제/수정 불가! (찾기도 리스트처럼 느림)</span>
            </p>
          </div>

          {message && (
            <div className={cn(
              "px-4 py-3 rounded-xl text-sm font-bold border-2",
              message.includes("✅") && "bg-green-100 text-green-800 border-green-400",
              message.includes("🔍") && "bg-yellow-100 text-yellow-800 border-yellow-400",
              message.includes("❌") && "bg-red-100 text-red-800 border-red-400"
            )}>
              {message.includes("❌") && <Lock className="w-4 h-4 inline mr-1" />}
              {message}
            </div>
          )}

          <div className="bg-gradient-to-b from-slate-100 to-slate-200 rounded-xl p-4 border-4 border-slate-300 shadow-inner relative">
            {overlay && (
              <div className={cn(
                "absolute inset-0 rounded-lg z-20 flex items-center justify-center",
                overlay.emoji === "😓" ? "bg-red-500/95" : "bg-purple-500/95"
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
            
            <div className="flex gap-2 flex-wrap justify-center">
              {items.map((item, index) => (
                <button 
                  key={index} 
                  onClick={() => readItem(index)}
                  disabled={mode !== "normal"}
                  className={cn(
                    "relative transition-all duration-300",
                    mode === "normal" && "hover:scale-105 cursor-pointer",
                    mode !== "normal" && "cursor-default",
                    shakeIndex === index && "animate-shake"
                  )}
                >
                  <div className={cn(
                    "w-16 h-24 rounded-lg border-2 shadow-lg relative overflow-hidden",
                    "bg-gradient-to-b from-purple-100 to-purple-200 border-purple-300",
                    openIndex === index && "ring-4 ring-green-500 scale-110",
                    scanIndex === index && foundIndex !== index && "ring-4 ring-yellow-400",
                    foundIndex === index && "ring-4 ring-green-500 scale-110"
                  )}>
                    <div className={cn(
                      "absolute top-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-xs font-bold text-white z-10",
                      foundIndex === index ? "bg-green-500" :
                      scanIndex === index ? "bg-yellow-500" : "bg-purple-500"
                    )}>
                      #{index}
                    </div>
                    
                    <div className="absolute top-7 bottom-1 left-1 right-1 bg-white/80 rounded flex flex-col items-center justify-center">
                      <span className="text-xl">{item.emoji}</span>
                      <span className="text-[10px] font-bold text-gray-600">{item.name}</span>
                      <span className="text-[10px] font-mono text-gray-500">{item.value}</span>
                    </div>
                    
                    <div 
                      className="absolute top-7 bottom-1 left-0 right-0 transition-all duration-500 origin-left bg-purple-200/70 border border-purple-300 flex items-center justify-center rounded-sm"
                      style={{ transform: openIndex === index || foundIndex === index ? "rotateY(-100deg)" : "rotateY(0deg)" }}
                    >
                      <Lock className="w-4 h-4 text-purple-500" />
                    </div>
                  </div>
                  
                  {shakeIndex === index && (
                    <div className="absolute inset-0 bg-red-500/80 rounded-lg flex items-center justify-center z-20">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-3 text-center">👆 번호로 바로 읽기 OK | 🔒 추가/삭제/수정 불가</p>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button onClick={searchByValue} disabled={mode !== "normal"}
              className="flex items-center gap-1 px-3 py-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 text-white rounded-lg text-sm font-bold shadow">
              <ScanSearch className="w-4 h-4" /> 값으로 찾기 (느림!)
            </button>
            <button onClick={tryInsert} disabled={mode !== "normal"}
              className="flex items-center gap-1 px-3 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white rounded-lg text-sm font-bold shadow">
              <Plus className="w-4 h-4" /> 중간 삽입 시도
            </button>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={tryModify} disabled={mode !== "normal"}
              className="flex items-center gap-1 px-3 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white rounded-lg text-sm font-bold shadow">
              <Edit3 className="w-4 h-4" /> 수정 시도
            </button>
            <button onClick={tryDelete} disabled={mode !== "normal"}
              className="flex items-center gap-1 px-3 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white rounded-lg text-sm font-bold shadow">
              <Minus className="w-4 h-4" /> 중간 삭제 시도
            </button>
            <button onClick={reset} 
              className="flex items-center gap-1 px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-bold shadow">
              <RefreshCw className="w-4 h-4" /> 리셋
            </button>
          </div>

          <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm">
            <span className="text-gray-400"># 튜플 = 리스트와 비슷! (순서O, 중복O)</span><br />
            <span className="text-gray-400"># 단, 수정 불가! 찾기도 리스트처럼 느림 🐢</span><br />
            <span className="text-purple-400">colors</span><span className="text-white"> = (</span>
            <span className="text-yellow-300">"{items.map(i => i.emoji).join('", "')}"</span>
            <span className="text-white">)</span>
          </div>
        </>
      )}
      
      <style jsx>{`
        @keyframes shake { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-8px); } 40% { transform: translateX(8px); } 60% { transform: translateX(-8px); } 80% { transform: translateX(8px); } }
        .animate-shake { animation: shake 0.5s ease-in-out; }
      `}</style>
    </div>
  )
}
