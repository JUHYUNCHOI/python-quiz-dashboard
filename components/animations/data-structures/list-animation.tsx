"use client"

import { useState, useRef } from "react"
import { Plus, Minus, RefreshCw, Search, ScanSearch, Hash } from "lucide-react"
import { cn } from "@/lib/utils"
import { FOOD_ITEMS, getNextId, ProblemCard, FridgeSlot } from "./shared"
import type { LockerItem } from "./shared"

export function ListAnimation() {
  const [items, setItems] = useState<LockerItem[]>([
    { id: "1", emoji: "🥚" }, { id: "2", emoji: "🥛" }, { id: "3", emoji: "🍞" }, { id: "4", emoji: "🥚" },
  ])
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [message, setMessage] = useState<{ text: string; type: 'info' | 'warning' | 'success' | 'error' } | null>(null)
  const [mode, setMode] = useState<"normal" | "searching" | "shifting">("normal")
  const [scanIndex, setScanIndex] = useState(-1)
  const [foundIndex, setFoundIndex] = useState<number | null>(null)
  const [showProblem, setShowProblem] = useState(true)
  const [shiftingIndices, setShiftingIndices] = useState<number[]>([])
  const [shiftDirection, setShiftDirection] = useState<'left' | 'right' | null>(null)
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null)
  const [overlay, setOverlay] = useState<{ emoji: string; text: string; subtext?: string } | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const showMsg = (text: string, type: 'info' | 'warning' | 'success' | 'error') => {
    setMessage({ text, type })
  }

  const accessByIndex = (index: number) => {
    if (mode !== "normal") return
    setOpenIndex(index)
    showMsg(`⚡ #${index}번 칸 바로 열기! → "${items[index].emoji}" 발견!`, 'success')
    setTimeout(() => setOpenIndex(null), 2000)
  }

  const searchByValue = () => {
    if (mode !== "normal" || items.length < 2) return
    
    const targetIndex = items.length - 2
    const targetEmoji = items[targetIndex].emoji
    const targetName = FOOD_ITEMS.find(f => f.emoji === targetEmoji)?.name || "음식"
    
    setMode("searching")
    setScanIndex(-1)
    setFoundIndex(null)
    
    setOverlay({ emoji: targetEmoji, text: `${targetName}을 찾아볼게요!`, subtext: "0번부터 하나씩 열어봐야 해요..." })
    
    setTimeout(() => {
      setOverlay(null)
      
      setTimeout(() => {
        let currentScan = 0
        intervalRef.current = setInterval(() => {
          if (currentScan > 0) setOpenIndex(null)
          setTimeout(() => {
            setScanIndex(currentScan)
            setOpenIndex(currentScan)
            
            if (items[currentScan].emoji === targetEmoji) {
              clearInterval(intervalRef.current!)
              setFoundIndex(currentScan)
              showMsg(`✅ #${currentScan}번에서 "${targetEmoji}" 발견!`, 'success')
              
              setTimeout(() => {
                setOpenIndex(null)
                setOverlay({ emoji: "😓", text: `${currentScan + 1}개나 열어봤어요!`, subtext: "번호로 찾으니까 처음부터 하나씩..." })
                
                setTimeout(() => {
                  setOverlay(null)
                  setMode("normal")
                  setScanIndex(-1)
                  setFoundIndex(null)
                }, 2500)
              }, 1000)
            } else {
              showMsg(`🔍 #${currentScan}번 열어보는 중... "${items[currentScan].emoji}" 아니네!`, 'warning')
              currentScan++
              
              if (currentScan >= items.length) {
                clearInterval(intervalRef.current!)
                showMsg(`❌ 못 찾았어요...`, 'error')
                setTimeout(() => { setMode("normal"); setScanIndex(-1); setFoundIndex(null); setOpenIndex(null) }, 2000)
              }
            }
          }, 200)
        }, 800)
      }, 500)
    }, 2000)
  }

  const [movingIndex, setMovingIndex] = useState<number | null>(null)
  const [placeholderAt, setPlaceholderAt] = useState<number | null>(null)
  const [slidingRight, setSlidingRight] = useState(false)
  const [pendingInsert, setPendingInsert] = useState<{id: string, emoji: string} | null>(null)
  const [newItemAnimating, setNewItemAnimating] = useState(false)
  const [labelOverrides, setLabelOverrides] = useState<{[key: number]: number | string} | null>(null)
  const [shiftedIndices, setShiftedIndices] = useState<number[]>([])
  const [disableTransition, setDisableTransition] = useState(false)
  
  const insertInMiddle = () => {
    if (mode !== "normal" || items.length < 2) return
    
    const insertIndex = 1
    const newEmoji = FOOD_ITEMS[Math.floor(Math.random() * FOOD_ITEMS.length)].emoji
    const newId = getNextId()
    const originalLength = items.length
    
    setMode("shifting")
    setPendingInsert({ id: newId, emoji: newEmoji })
    setShiftedIndices([])
    
    setPlaceholderAt(originalLength)
    showMsg(`➡️ #${originalLength}번 위치에 새 빈칸 생성!`, 'warning')
    
    const indicesToMove: number[] = []
    for (let i = originalLength - 1; i >= insertIndex; i--) {
      indicesToMove.push(i)
    }
    
    const doMove = (step: number) => {
      if (step < indicesToMove.length) {
        const fromIndex = indicesToMove[step]
        
        setMovingIndex(fromIndex)
        setSlidingRight(true)
        showMsg(`📦 #${fromIndex}번 → #${fromIndex + 1}번으로 이동 중...`, 'warning')
        
        setTimeout(() => {
          setShiftedIndices(prev => [...prev, fromIndex])
          setMovingIndex(null)
          setSlidingRight(false)
          setTimeout(() => doMove(step + 1), 300)
        }, 500)
      } else {
        showMsg(`✨ 새 캐비넷이 #${insertIndex}번 자리로!`, 'warning')
        
        setNewItemAnimating(true)
        
        setTimeout(() => {
          setDisableTransition(true)
          
          setItems(prev => {
            const newItems = [...prev]
            newItems.splice(insertIndex, 0, { id: newId, emoji: newEmoji })
            return newItems
          })
          setPlaceholderAt(null)
          setShiftedIndices([])
          setNewItemAnimating(false)
          
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setDisableTransition(false)
            })
          })
          
          setTimeout(() => {
            showMsg(`🔢 인덱스 번호 업데이트!`, 'warning')
            
            setLabelOverrides({ [insertIndex]: "✨" })
            
            const doLabelUpdate = (idx: number) => {
              if (idx <= originalLength) {
                setHighlightIndex(idx)
                
                if (idx === insertIndex) {
                  showMsg(`✨ 새 캐비넷 → #${idx}번!`, 'success')
                  setTimeout(() => {
                    setLabelOverrides(prev => prev ? { ...prev, [idx]: idx } : null)
                    setTimeout(() => doLabelUpdate(idx + 1), 350)
                  }, 400)
                } else {
                  showMsg(`🔄 #${idx - 1}번 → #${idx}번으로 변경!`, 'warning')
                  setLabelOverrides(prev => prev ? { ...prev, [idx]: idx - 1 } : { [idx]: idx - 1 })
                  setTimeout(() => {
                    setLabelOverrides(prev => prev ? { ...prev, [idx]: idx } : null)
                    setTimeout(() => doLabelUpdate(idx + 1), 350)
                  }, 400)
                }
              } else {
                setLabelOverrides(null)
                setPendingInsert(null)
                setHighlightIndex(insertIndex)
                showMsg(`✅ "${newEmoji}" 삽입 완료! 총 ${originalLength + 1}개 캐비넷! (😓 ${originalLength - insertIndex}개가 밀렸어요)`, 'success')
                setMode("normal")
                setTimeout(() => setHighlightIndex(null), 1500)
              }
            }
            
            setTimeout(() => doLabelUpdate(insertIndex), 300)
          }, 100)
        }, 600)
      }
    }
    
    setTimeout(() => doMove(0), 600)
  }

  const [deletingIndex, setDeletingIndex] = useState<number | null>(null)
  const [slidingLeft, setSlidingLeft] = useState(false)
  const [emptySlotAt, setEmptySlotAt] = useState<number | null>(null)
  const [shiftedLeftIndices, setShiftedLeftIndices] = useState<number[]>([])
  const [deletedEmoji, setDeletedEmoji] = useState<string | null>(null)
  
  const removeFromMiddle = () => {
    if (mode !== "normal" || items.length < 3) return
    
    const removeIndex = 1
    const removedEmoji = items[removeIndex].emoji
    const originalLength = items.length
    
    setMode("shifting")
    setDeletedEmoji(removedEmoji)
    setShiftedLeftIndices([])
    
    setDeletingIndex(removeIndex)
    showMsg(`🗑️ #${removeIndex}번 "${removedEmoji}" 삭제!`, 'warning')
    
    setTimeout(() => {
      setItems(prev => {
        const updated = [...prev]
        updated[removeIndex] = { id: `empty-${Date.now()}`, emoji: "" }
        return updated
      })
      setEmptySlotAt(removeIndex)
      setDeletingIndex(null)
      showMsg(`📤 "${removedEmoji}" 꺼냈어요! 이제 당겨요!`, 'warning')
      
      const indicesToMove: number[] = []
      for (let i = removeIndex + 1; i < originalLength; i++) {
        indicesToMove.push(i)
      }
      
      const doMove = (step: number) => {
        if (step < indicesToMove.length) {
          const fromIndex = indicesToMove[step]
          
          setMovingIndex(fromIndex)
          setSlidingLeft(true)
          showMsg(`📦 #${fromIndex}번 → #${fromIndex - 1}번으로 이동 중...`, 'warning')
          
          setTimeout(() => {
            setShiftedLeftIndices(prev => [...prev, fromIndex])
            setMovingIndex(null)
            setSlidingLeft(false)
            setTimeout(() => doMove(step + 1), 300)
          }, 500)
        } else {
          showMsg(`✨ 이동 완료! 배열 업데이트 중...`, 'warning')
          
          setTimeout(() => {
            setDisableTransition(true)
            
            setItems(prev => prev.filter((_, idx) => idx !== removeIndex))
            setEmptySlotAt(null)
            setShiftedLeftIndices([])
            
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                setDisableTransition(false)
              })
            })
            
            setTimeout(() => {
              showMsg(`🔢 인덱스 번호 업데이트!`, 'warning')
              
              const newLength = originalLength - 1
              
              const doLabelUpdate = (idx: number) => {
                if (idx < newLength) {
                  setHighlightIndex(idx)
                  
                  showMsg(`🔄 #${idx + 1}번 → #${idx}번으로 변경!`, 'warning')
                  setLabelOverrides(prev => prev ? { ...prev, [idx]: idx + 1 } : { [idx]: idx + 1 })
                  
                  setTimeout(() => {
                    setLabelOverrides(prev => prev ? { ...prev, [idx]: idx } : null)
                    setTimeout(() => doLabelUpdate(idx + 1), 350)
                  }, 400)
                } else {
                  setLabelOverrides(null)
                  setDeletedEmoji(null)
                  setHighlightIndex(null)
                  showMsg(`✅ "${removedEmoji}" 삭제 완료! 총 ${newLength}개 캐비넷! (😓 ${originalLength - removeIndex - 1}개가 당겨졌어요)`, 'success')
                  setMode("normal")
                }
              }
              
              setTimeout(() => doLabelUpdate(removeIndex), 300)
            }, 100)
          }, 300)
        }
      }
      
      setTimeout(() => doMove(0), 400)
    }, 600)
  }

  const addToEnd = () => {
    if (mode !== "normal") return
    const newEmoji = FOOD_ITEMS[Math.floor(Math.random() * FOOD_ITEMS.length)].emoji
    const newId = getNextId()
    setItems([...items, { id: newId, emoji: newEmoji }])
    setHighlightIndex(items.length)
    showMsg(`✅ 맨 뒤에 "${newEmoji}" 추가! (간단!)`, 'success')
    setTimeout(() => setHighlightIndex(null), 1500)
  }

  const removeFromEnd = () => {
    if (mode !== "normal" || items.length === 0) return
    const removed = items[items.length - 1]
    setItems(items.slice(0, -1))
    showMsg(`✅ 맨 뒤 "${removed.emoji}" 삭제! (간단!)`, 'success')
  }

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setItems([{ id: "1", emoji: "🥚" }, { id: "2", emoji: "🥛" }, { id: "3", emoji: "🍞" }, { id: "4", emoji: "🥚" }])
    setOpenIndex(null); setMessage(null); setMode("normal"); setScanIndex(-1); setFoundIndex(null)
    setShiftingIndices([]); setShiftDirection(null); setHighlightIndex(null); setShowProblem(true)
    setMovingIndex(null); setPlaceholderAt(null); setSlidingRight(false); setPendingInsert(null)
    setNewItemAnimating(false); setLabelOverrides(null); setShiftedIndices([]); setDisableTransition(false)
    setDeletingIndex(null); setSlidingLeft(false); setEmptySlotAt(null)
    setShiftedLeftIndices([]); setDeletedEmoji(null); setOverlay(null)
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Hash className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-lg text-blue-800">List - 리스트</h3>
        </div>
        <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">냉장고 칸 🧊</span>
      </div>

      {showProblem ? (
        <ProblemCard
          problem={{
            emoji: "😱",
            title: "이렇게 하면 힘들어요!",
            subtitle: "100개면 변수도 100개?",
            code: ['egg1 = "🥚"', 'egg2 = "🥚"', 'milk = "🥛"', '... 100개 더? 😵']
          }}
          solution={{
            emoji: "✨",
            title: "리스트 하나면 끝!",
            subtitle: "몇 개든 OK!",
            code: 'fridge = ["🥚", "🥛", "🍞", "🥚"]'
          }}
          buttonColor="bg-blue-500 hover:bg-blue-600"
          onContinue={() => setShowProblem(false)}
        />
      ) : (
        <>
          {message && (
            <div className={cn(
              "px-4 py-3 rounded-xl text-base font-bold shadow-lg border-2",
              message.type === 'success' && "bg-green-100 text-green-800 border-green-400",
              message.type === 'warning' && "bg-yellow-100 text-yellow-800 border-yellow-400",
              message.type === 'error' && "bg-red-100 text-red-800 border-red-400",
              message.type === 'info' && "bg-blue-100 text-blue-800 border-blue-400"
            )}>
              {message.text}
            </div>
          )}

          <div className="bg-gradient-to-b from-slate-100 to-slate-200 rounded-xl p-4 border-4 border-slate-300 shadow-inner relative">
            {overlay && (
              <div className={cn(
                "absolute inset-0 rounded-lg z-30 flex items-center justify-center",
                overlay.emoji === "😓" ? "bg-red-500/95" : "bg-blue-500/95"
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
            
            <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200 min-h-[140px] overflow-x-auto">
              <div className="relative flex gap-2 items-end justify-start">
                {Array.from({ length: items.length + (placeholderAt !== null ? 1 : 0) }).map((_, idx) => (
                  <div key={`slot-${idx}`} className="w-20 h-28 rounded-lg border-4 border-dashed border-slate-300 bg-slate-100/50 flex-shrink-0" />
                ))}
                
                {newItemAnimating && pendingInsert && (
                  <div 
                    className="absolute z-20 animate-drop-in"
                    style={{ left: `calc(1 * (80px + 8px))` }}
                  >
                    <div className="w-20 h-28 rounded-lg border-2 shadow-lg relative bg-gradient-to-b from-slate-600 to-slate-700 border-slate-500 ring-4 ring-green-500">
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-xs font-bold text-white bg-green-500 z-10">
                        ✨
                      </div>
                      <div className="absolute top-8 bottom-2 left-1 right-1 bg-slate-800 rounded flex items-center justify-center">
                        <span className="text-3xl">{pendingInsert.emoji}</span>
                      </div>
                      <div className="absolute top-8 bottom-2 left-0 right-0 origin-left rounded-sm overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-300 via-blue-200 to-blue-300 border border-blue-400 shadow-md">
                          <div className="absolute inset-1 border border-blue-400/50 rounded-sm" />
                          <div className="absolute top-1/2 right-1.5 -translate-y-1/2 w-1.5 h-6 bg-blue-400 rounded-full shadow-inner" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="absolute inset-0 flex gap-2 items-end" style={{ justifyContent: 'inherit' }}>
                  {items.map((item, index) => {
                    const isMoving = movingIndex === index
                    const isEmpty = item.emoji === ""
                    const isBeingDeleted = deletingIndex === index
                    const shouldSlideRight = (isMoving && slidingRight) || shiftedIndices.includes(index)
                    const shouldSlideLeft = (isMoving && slidingLeft) || shiftedLeftIndices.includes(index)
                    
                    const displayLabel = labelOverrides && labelOverrides[index] !== undefined 
                      ? labelOverrides[index] 
                      : index
                    const isLabelUpdating = labelOverrides && labelOverrides[index] !== undefined && labelOverrides[index] !== index
                    
                    if (isEmpty && !isBeingDeleted) {
                      return <div key={item.id} className="w-20 h-28 flex-shrink-0" />
                    }
                    
                    return (
                      <div 
                        key={item.id}
                        className={cn(
                          "w-20 h-28 flex-shrink-0 ease-out",
                          disableTransition ? "transition-none" : "transition-all duration-500",
                          shouldSlideRight && "translate-x-[88px]",
                          shouldSlideLeft && "-translate-x-[88px]",
                          isBeingDeleted && "opacity-0 scale-50",
                          highlightIndex === index && "scale-110 z-10"
                        )}
                      >
                        {labelOverrides ? (
                          <div className="relative w-full h-full" style={{ perspective: "800px" }}>
                            <div className={cn(
                              "w-full h-full rounded-lg border-2 shadow-lg relative",
                              "bg-gradient-to-b from-slate-600 to-slate-700 border-slate-500",
                              highlightIndex === index && "ring-4 ring-blue-500 scale-110 shadow-2xl",
                              displayLabel === "✨" && "ring-4 ring-green-500"
                            )}>
                              <div className={cn(
                                "absolute top-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-xs font-bold text-white z-10 transition-all duration-300",
                                displayLabel === "✨" ? "bg-green-500" : isLabelUpdating ? "bg-orange-500" : "bg-blue-500"
                              )}>
                                {displayLabel === "✨" ? "✨" : `#${displayLabel}`}
                              </div>
                              <div className="absolute top-8 bottom-2 left-1 right-1 bg-slate-800 rounded flex items-center justify-center">
                                <span className="text-3xl">{item.emoji}</span>
                              </div>
                              <div className="absolute top-8 bottom-2 left-0 right-0 origin-left rounded-sm overflow-hidden"
                                style={{ transform: "rotateY(0deg)", backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}>
                                <div className="absolute inset-0 bg-gradient-to-b from-blue-300 via-blue-200 to-blue-300 border border-blue-400 shadow-md">
                                  <div className="absolute inset-1 border border-blue-400/50 rounded-sm" />
                                  <div className="absolute top-1/2 right-1.5 -translate-y-1/2 w-1.5 h-6 bg-blue-400 rounded-full shadow-inner" />
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <FridgeSlot
                            label={index}
                            content={item.emoji}
                            isOpen={openIndex === index}
                            isHighlighted={highlightIndex === index || (openIndex === index && mode === "normal") || isMoving}
                            isScanning={scanIndex === index && foundIndex !== index}
                            isFound={foundIndex === index}
                            onClick={() => accessByIndex(index)}
                            disabled={mode !== "normal"}
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">👆 칸 번호로 바로 열기 | 🥚 같은 거 여러 개 OK</p>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button onClick={searchByValue} disabled={mode !== "normal" || items.length < 2} 
              className="flex items-center gap-1 px-3 py-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 text-white rounded-lg text-sm font-bold shadow">
              <ScanSearch className="w-4 h-4" /> 음식 찾기
            </button>
            <button onClick={addToEnd} disabled={mode !== "normal"} 
              className="flex items-center gap-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-lg text-sm font-bold shadow">
              <Plus className="w-4 h-4" /> 뒤에 추가
            </button>
            <button onClick={insertInMiddle} disabled={mode !== "normal" || items.length < 2} 
              className="flex items-center gap-1 px-3 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white rounded-lg text-sm font-bold shadow">
              <Plus className="w-4 h-4" /> 중간 삽입
            </button>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={removeFromEnd} disabled={mode !== "normal" || items.length === 0} 
              className="flex items-center gap-1 px-3 py-2 bg-red-400 hover:bg-red-500 disabled:bg-gray-300 text-white rounded-lg text-sm font-bold shadow">
              <Minus className="w-4 h-4" /> 뒤에서 삭제
            </button>
            <button onClick={removeFromMiddle} disabled={mode !== "normal" || items.length < 3} 
              className="flex items-center gap-1 px-3 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white rounded-lg text-sm font-bold shadow">
              <Minus className="w-4 h-4" /> 중간 삭제
            </button>
            <button onClick={reset} 
              className="flex items-center gap-1 px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-bold shadow">
              <RefreshCw className="w-4 h-4" /> 리셋
            </button>
          </div>

          <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm overflow-x-auto">
            <span className="text-gray-400"># 리스트 = 순서O, 중복O, 수정O</span><br />
            <span className="text-blue-400">fridge</span><span className="text-white"> = [</span>
            <span className="text-green-400">"{items.map(i => i.emoji).join('", "')}"</span>
            <span className="text-white">]</span>
          </div>
        </>
      )}
      
      <style jsx>{`
        @keyframes drop-in {
          0% { transform: translateY(-100px) scale(0.8); opacity: 0; }
          60% { transform: translateY(10px) scale(1.05); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        .animate-drop-in { animation: drop-in 0.5s ease-out forwards; }
      `}</style>
    </div>
  )
}
