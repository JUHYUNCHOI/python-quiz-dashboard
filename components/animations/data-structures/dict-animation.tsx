"use client"

import { useState, useRef } from "react"
import { RefreshCw, Key, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { ProblemCard, Locker } from "./shared"

export function DictAnimation({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const isEn = lang === "en"
  const [items] = useState([
    { key: "철수", emoji: "⚽" }, 
    { key: "영희", emoji: "🎒" }, 
    { key: "민수", emoji: "🍱" },
    { key: "지민", emoji: "📚" },
    { key: "현우", emoji: "📱" }
  ])
  const [openKey, setOpenKey] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [showProblem, setShowProblem] = useState(true)
  const [searchingList, setSearchingList] = useState(false)
  const [listScanIndex, setListScanIndex] = useState(-1)
  const [foundIndex, setFoundIndex] = useState<number | null>(null)
  const [overlay, setOverlay] = useState<{ emoji: string; text: string; subtext?: string } | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const targetEmoji = "📱"
  const targetName = isEn ? "Hyunwoo's phone" : "현우의 핸드폰"
  const targetKey = "현우"
  const targetIndex = items.findIndex(i => i.key === targetKey)

  const searchByKey = (key: string) => {
    if (searchingList) return
    setMessage("")
    
    setOverlay({ emoji: targetEmoji, text: isEn ? `Let's find ${targetName}!` : `${targetName}을 찾아볼게요!`, subtext: isEn ? `"Hyunwoo" label is visible...` : `"현우" 이름표가 보이니까...` })

    setTimeout(() => {
      setOverlay(null)

      setTimeout(() => {
        setOpenKey(key)
        const item = items.find(i => i.key === key)
        if (item) {
          setMessage(isEn ? `⚡ Clicked "Hyunwoo" label! → ${item.emoji} ${targetName} found!` : `⚡ "현우" 이름표 클릭! → ${item.emoji} ${targetName} 발견!`)
        }

        setTimeout(() => {
          setOpenKey(null)
          setOverlay({ emoji: "⚡", text: isEn ? "Found in just 1 try!" : "딱 1번에 찾았다!", subtext: isEn ? "Because we have a label!" : "이름표가 있으니까 바로!" })
          
          setTimeout(() => {
            setOverlay(null)
            setMessage("")
          }, 2000)
        }, 1500)
      }, 300)
    }, 1500)
  }

  const searchWithoutLabel = () => {
    setSearchingList(true)
    setListScanIndex(-1)
    setOpenKey(null)
    setFoundIndex(null)
    setMessage("")
    
    setOverlay({ emoji: targetEmoji, text: isEn ? `Let's find ${targetName}!` : `${targetName}을 찾아볼게요!`, subtext: isEn ? "No label... starting from the beginning!" : "이름표가 없어서... 처음부터!" })

    setTimeout(() => {
      setOverlay(null)

      setTimeout(() => {
        let idx = 0
        intervalRef.current = setInterval(() => {
          if (idx > 0) {
            setOpenKey(null)
          }

          setTimeout(() => {
            setListScanIndex(idx)
            setOpenKey(items[idx].key)

            if (idx < targetIndex) {
              setMessage(isEn ? `🔍 Opening #${idx + 1}... ${items[idx].emoji}? Not ${targetName}!` : `🔍 ${idx + 1}번째 열어보는 중... ${items[idx].emoji}? ${targetName} 아니네!`)
              idx++
            } else if (idx === targetIndex) {
              setFoundIndex(idx)
              setMessage(isEn ? `✅ Found ${targetEmoji} ${targetName} at #${idx + 1}!` : `✅ ${idx + 1}번째에서 ${targetEmoji} ${targetName} 찾았다!`)
              clearInterval(intervalRef.current!)

              setTimeout(() => {
                setOpenKey(null)
                setOverlay({ emoji: "😓", text: isEn ? `Opened ${idx + 1} lockers!` : `${idx + 1}개나 열어봤어요!`, subtext: isEn ? "No label, so one by one from the start..." : "이름표가 없으니까 처음부터 하나씩..." })
                
                setTimeout(() => { 
                  setOverlay(null)
                  setSearchingList(false)
                  setListScanIndex(-1)
                  setFoundIndex(null)
                  setMessage("")
                }, 2500)
              }, 1000)
            }
          }, 100)
        }, 800)
      }, 500)
    }, 2000)
  }

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setMessage("")
    setOpenKey(null)
    setShowProblem(true)
    setSearchingList(false)
    setListScanIndex(-1)
    setFoundIndex(null)
    setOverlay(null)
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Key className="w-5 h-5 text-amber-600" />
          <h3 className="font-bold text-lg text-amber-800">{isEn ? "Dictionary" : "Dictionary - 딕셔너리"}</h3>
        </div>
        <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded-full">{isEn ? "Labeled Locker 🏷️" : "이름표 사물함 🏷️"}</span>
      </div>

      {showProblem ? (
        <ProblemCard
          problem={{
            emoji: "😱",
            title: isEn ? 'Finding "Hyunwoo\'s item" with a list?' : '리스트로 "현우 물건" 찾으면?',
            subtitle: isEn ? "Have to open one by one from the start..." : "처음부터 하나씩 열어봐야...",
            code: ['students = ["철수", "영희", "민수", "지민", "현우"]', 'items = ["⚽", "🎒", "🍱", "📚", "🎮"]', isEn ? '# What index is "Hyunwoo"? Check all 5? 🤔' : '# "현우"가 몇 번째지? 5개 다 확인? 🤔']
          }}
          solution={{
            emoji: "🏷️",
            title: isEn ? "Dictionary finds by name instantly!" : "딕셔너리는 이름으로 바로!",
            subtitle: isEn ? "Instant lookup, no matter how many!" : "몇 개든 즉시 찾기!",
            code: 'locker["현우"]  # → "🎮" 바로!'
          }}
          buttonColor="bg-amber-500 hover:bg-amber-600"
          onContinue={() => setShowProblem(false)}
          lang={lang}
        />
      ) : (
        <>
          <div className="bg-amber-100 border-2 border-amber-300 rounded-lg px-4 py-3">
            <p className="text-sm text-amber-800">
              🎯 <strong>{isEn ? `Goal: Find ${targetEmoji} ${targetName}!` : `목표: ${targetEmoji} ${targetName} 찾기!`}</strong><br/>
              <span className="text-amber-600">
                {isEn ? "🐢 Without label → open one by one from the start" : "🐢 이름표 없으면 → 처음부터 하나씩 열어봐야 해요"}<br/>
                {isEn ? '⚡ With label → click "Hyunwoo" and it opens immediately!' : '⚡ 이름표 있으면 → "현우" 클릭하면 바로!'}
              </span>
            </p>
          </div>

          <div className="bg-gradient-to-b from-slate-200 to-slate-300 rounded-xl p-4 border-4 border-slate-400 shadow-inner relative">
            {overlay && (
              <div className={cn(
                "absolute inset-0 rounded-lg z-20 flex items-center justify-center",
                overlay.emoji === "😓" ? "bg-red-500/95" : 
                overlay.emoji === "⚡" ? "bg-green-500/95" : "bg-amber-500/95"
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
            
            <div className="flex gap-3 flex-wrap justify-center">
              {items.map((item, idx) => (
                <div key={item.key} className="relative">
                  <Locker 
                    label={item.key} 
                    content={item.emoji} 
                    isOpen={openKey === item.key}
                    isHighlighted={foundIndex === idx}
                    isScanning={listScanIndex === idx && foundIndex !== idx}
                    hideLabel={searchingList}
                    onClick={() => searchByKey(item.key)} 
                    disabled={searchingList} 
                  />
                  {searchingList && listScanIndex === idx && (
                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full animate-pulse z-10">#{idx}</div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-3 text-center">
              {searchingList
                ? (isEn ? "🔍 No label... have to open one by one!" : "🔍 이름표가 없어서... 하나씩 열어봐야 해요!")
                : (isEn ? "👆 Click a label to open it immediately!" : "👆 이름표 클릭하면 바로 열 수 있어요!")}
            </p>
          </div>

          {message && (
            <div className={cn(
              "px-4 py-3 rounded-xl text-sm font-bold border-2",
              message.includes("⚡") && "bg-green-100 text-green-800 border-green-400",
              message.includes("🔍") && "bg-yellow-100 text-yellow-800 border-yellow-400",
              message.includes("🎯") && "bg-amber-100 text-amber-800 border-amber-400",
              message.includes("✅") && "bg-green-100 text-green-800 border-green-400"
            )}>
              {message}
            </div>
          )}

          <div className="flex gap-2 flex-wrap">
            <button onClick={searchWithoutLabel} disabled={searchingList || overlay !== null} className="flex items-center gap-1 px-3 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white rounded-lg text-sm font-bold shadow">
              <Search className="w-4 h-4" /> {isEn ? "Find without label 🐢" : "이름표 없이 찾기 🐢"}
            </button>
            <button onClick={() => searchByKey(targetKey)} disabled={searchingList || overlay !== null} className="flex items-center gap-1 px-3 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white rounded-lg text-sm font-bold shadow">
              <Key className="w-4 h-4" /> {isEn ? "Find with label ⚡" : "이름표로 찾기 ⚡"}
            </button>
            <button onClick={reset} className="flex items-center gap-1 px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-bold shadow">
              <RefreshCw className="w-4 h-4" /> {isEn ? "Reset" : "리셋"}
            </button>
          </div>

          <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm">
            <span className="text-gray-400">{isEn ? "# Dictionary = find by name instantly!" : "# 딕셔너리 = 이름으로 바로!"}</span><br />
            <span className="text-amber-400">locker</span><span className="text-white"> = {"{"}</span>
            <span className="text-cyan-400">"철수"</span><span className="text-white">: </span>
            <span className="text-green-400">"⚽"</span><span className="text-white">, ...</span>
            <span className="text-white">{"}"}</span>
          </div>
        </>
      )}
    </div>
  )
}
