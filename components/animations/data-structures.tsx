"use client"

import { useState, useRef } from "react"
import { Plus, Minus, RefreshCw, Lock, Key, Search, Shuffle, ScanSearch, Hash, Edit3 } from "lucide-react"
import { cn } from "@/lib/utils"

// ============================================
// 공통 타입 및 유틸
// ============================================
interface LockerItem {
  id: string
  emoji: string
}

const FOOD_ITEMS = [
  { emoji: "🥚", name: "계란" },
  { emoji: "🥛", name: "우유" },
  { emoji: "🍞", name: "빵" },
  { emoji: "🧀", name: "치즈" },
  { emoji: "🥓", name: "베이컨" },
  { emoji: "🧈", name: "버터" },
  { emoji: "🍎", name: "사과" },
  { emoji: "🍊", name: "귀맘" },
  { emoji: "🍓", name: "딸기" },
  { emoji: "🥬", name: "브로콜리" },
  { emoji: "🥕", name: "당근" },
  { emoji: "🍗", name: "닭다리" },
  { emoji: "🍔", name: "햄버거" },
  { emoji: "🍕", name: "피자" },
  { emoji: "🍦", name: "아이스크림" },
  { emoji: "🧁", name: "컵케이크" },
]

let uniqueIdCounter = 100

// ============================================
// 문제 상황 카드 컴포넌트 (재사용)
// ============================================
interface ProblemCardProps {
  problem: {
    emoji: string
    title: string
    subtitle: string
    code: string[]
  }
  solution: {
    emoji: string
    title: string
    subtitle: string
    code: string
  }
  buttonColor: string
  onContinue: () => void
}

function ProblemCard({ problem, solution, buttonColor, onContinue }: ProblemCardProps) {
  return (
    <div className="space-y-4">
      {/* 문제 상황 - 크고 눈에 띄게! */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-5 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-5xl animate-bounce">{problem.emoji}</span>
          <div>
            <p className="text-xl font-black">{problem.title}</p>
            <p className="text-red-200 text-sm">{problem.subtitle}</p>
          </div>
        </div>
        <div className="bg-gray-900 rounded-xl p-3 font-mono text-sm space-y-1">
          {problem.code.map((line, i) => (
            <div key={i} className={i === problem.code.length - 1 ? "text-yellow-300" : "text-white"}>
              {line}
            </div>
          ))}
        </div>
      </div>

      {/* 해결책 */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-5 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-5xl">{solution.emoji}</span>
          <div>
            <p className="text-xl font-black">{solution.title}</p>
            <p className="text-green-200 text-sm">{solution.subtitle}</p>
          </div>
        </div>
        <div className="bg-gray-900 rounded-xl p-3 font-mono text-sm">
          <span className="text-green-300">{solution.code}</span>
        </div>
      </div>

      <button 
        onClick={onContinue}
        className={`w-full py-4 ${buttonColor} text-white rounded-xl text-lg font-black shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]`}
      >
        👆 직접 해보기!
      </button>
    </div>
  )
}

// ============================================
// 냉장고 칸 컴포넌트
// ============================================
interface FridgeSlotProps {
  label: number
  content: string
  isOpen?: boolean
  isHighlighted?: boolean
  isScanning?: boolean
  isFound?: boolean
  isMoving?: boolean
  moveDirection?: 'left' | 'right' | null
  isEmpty?: boolean
  isPlaceholder?: boolean // 점선 빈칸만 표시
  onClick?: () => void
  disabled?: boolean
}

function FridgeSlot({ 
  label, content, isOpen = false, isHighlighted = false,
  isScanning = false, isFound = false, isMoving = false, 
  moveDirection = null, isEmpty = false, isPlaceholder = false,
  onClick, disabled = false,
}: FridgeSlotProps) {
  // 점선 빈칸 (캐비넷이 들어갈 자리)
  if (isPlaceholder) {
    return (
      <div className="relative">
        <div className="w-20 h-28 rounded-lg border-4 border-dashed border-orange-400 bg-orange-50/50 flex items-center justify-center">
          <div className="absolute top-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-xs font-bold text-white bg-orange-500">
            #{label}
          </div>
          <span className="text-orange-400 text-2xl">?</span>
        </div>
      </div>
    )
  }
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative transition-all duration-300",
        !disabled && "hover:scale-105 cursor-pointer",
        disabled && "cursor-default"
      )}
      style={{ perspective: "800px" }}
    >
      <div className={cn(
        "w-20 h-28 rounded-lg border-2 shadow-lg relative",
        "bg-gradient-to-b from-slate-600 to-slate-700 border-slate-500",
        isHighlighted && "ring-4 ring-blue-500 scale-110 shadow-2xl",
        isFound && "ring-4 ring-green-500 scale-110 shadow-2xl",
        isScanning && "ring-4 ring-yellow-400",
        isEmpty && "ring-4 ring-orange-400 animate-pulse"
      )}>
        {/* 칸 번호 */}
        <div className={cn(
          "absolute top-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-xs font-bold text-white z-10",
          isEmpty ? "bg-orange-500" : "bg-blue-500"
        )}>
          #{label}
        </div>
        
        {/* 내부 (어두운 배경 + 음식) */}
        <div className="absolute top-8 bottom-2 left-1 right-1 bg-slate-800 rounded flex items-center justify-center overflow-hidden">
          <span className={cn(
            "text-3xl transition-all duration-700",
            isOpen && isFound && "animate-bounce",
            isMoving && moveDirection === 'right' && "translate-x-20 opacity-0",
            isMoving && moveDirection === 'left' && "-translate-x-20 opacity-0"
          )}>
            {content}
          </span>
        </div>
        
        {/* 불투명 문 - 3D 회전 */}
        <div 
          className="absolute top-8 bottom-2 left-0 right-0 transition-all duration-500 origin-left rounded-sm overflow-hidden"
          style={{ 
            transform: (isOpen || isMoving) ? "rotateY(-110deg)" : "rotateY(0deg)", 
            backfaceVisibility: "hidden",
            transformStyle: "preserve-3d"
          }}
        >
          {/* 문 외부 */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-300 via-blue-200 to-blue-300 border border-blue-400 shadow-md">
            {/* 문 패널 */}
            <div className="absolute inset-1 border border-blue-400/50 rounded-sm" />
            {/* 문 손잡이 */}
            <div className="absolute top-1/2 right-1.5 -translate-y-1/2 w-1.5 h-6 bg-blue-400 rounded-full shadow-inner" />
          </div>
        </div>
      </div>
    </button>
  )
}

// ============================================
// 사물함 컴포넌트 (Dict용)
// ============================================
function Locker({ label, content, isOpen = false, isHighlighted = false, onClick, disabled = false }: {
  label: string; content: string; isOpen?: boolean; isHighlighted?: boolean; onClick?: () => void; disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative transition-all duration-300",
        !disabled && "hover:scale-105 cursor-pointer",
        disabled && "cursor-default"
      )}
      style={{ perspective: "800px" }}
    >
      <div className={cn(
        "w-24 h-36 rounded-sm border-2 shadow-lg relative",
        "bg-gradient-to-b from-slate-500 to-slate-600 border-slate-400",
        isHighlighted && "ring-4 ring-green-500 scale-110 shadow-2xl"
      )}>
        {/* 통풍구 */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
          {[...Array(4)].map((_, i) => <div key={i} className="w-3 h-1 bg-slate-700 rounded-sm" />)}
        </div>
        
        {/* 내부 (어두운 배경 + 아이템) */}
        <div className="absolute top-10 bottom-2 left-1 right-1 bg-slate-800 rounded-sm flex items-center justify-center">
          <span className={cn("text-4xl transition-all duration-300", isOpen && "animate-bounce")}>{content}</span>
        </div>
        
        {/* 불투명 문 - 3D 회전 */}
        <div 
          className="absolute top-6 bottom-2 left-0 right-0 transition-all duration-500 origin-left rounded-sm overflow-hidden"
          style={{ 
            transform: isOpen ? "rotateY(-110deg)" : "rotateY(0deg)", 
            backfaceVisibility: "hidden",
            transformStyle: "preserve-3d"
          }}
        >
          {/* 문 외부 */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-300 via-amber-200 to-amber-300 border border-amber-400 shadow-lg">
            {/* 이름표 */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded bg-amber-500 text-white text-xs font-bold shadow-md">
              {label}
            </div>
            {/* 문 패널 */}
            <div className="absolute top-10 bottom-2 left-1 right-1 border-2 border-amber-400/50 rounded-sm" />
            {/* 문 손잡이 */}
            <div className="absolute top-1/2 right-2 -translate-y-1/2 w-2 h-10 bg-amber-500 rounded-full shadow-md" />
          </div>
        </div>
      </div>
    </button>
  )
}

// ============================================
// 1. List 애니메이션
// ============================================
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
    
    // 뒤에서 2번째 아이템을 찾음 (최소 3개 열어봐야 찾는 느낌)
    const targetIndex = items.length - 2
    const targetEmoji = items[targetIndex].emoji
    
    setMode("searching")
    showMsg(`🔍 "${targetEmoji}" 어디 있지? 0번부터 하나씩 열어봐야 해...`, 'warning')
    setScanIndex(-1)
    setFoundIndex(null)
    
    let currentScan = 0
    intervalRef.current = setInterval(() => {
      if (currentScan > 0) setOpenIndex(null)
      setTimeout(() => {
        setScanIndex(currentScan)
        setOpenIndex(currentScan)
        
        // 현재 스캔 위치의 이모지가 찾는 이모지와 같으면 찾음!
        if (items[currentScan].emoji === targetEmoji) {
          clearInterval(intervalRef.current!)
          setFoundIndex(currentScan)
          showMsg(`✅ 찾았다! #${currentScan}번에서 "${targetEmoji}" 발견! (${currentScan + 1}개 열어봄 😓)`, 'success')
          setTimeout(() => { setMode("normal"); setScanIndex(-1); setFoundIndex(null); setOpenIndex(null) }, 3000)
        } else {
          showMsg(`🔍 #${currentScan}번 열어보는 중... "${items[currentScan].emoji}" 아니네!`, 'warning')
          currentScan++
          
          // 마지막까지 못 찾으면 (이런 경우는 없어야 하지만 안전장치)
          if (currentScan >= items.length) {
            clearInterval(intervalRef.current!)
            showMsg(`❌ 못 찾았어요...`, 'error')
            setTimeout(() => { setMode("normal"); setScanIndex(-1); setFoundIndex(null); setOpenIndex(null) }, 2000)
          }
        }
      }, 200)
    }, 800)
  }

  // 중간 삽입 - 완전한 단계별 애니메이션
  const [movingIndex, setMovingIndex] = useState<number | null>(null) // 현재 이동 중인 캐비넷 (원래 인덱스)
  const [placeholderAt, setPlaceholderAt] = useState<number | null>(null) // 점선 빈칸 위치 (실제 배열 인덱스)
  const [slidingRight, setSlidingRight] = useState(false)
  const [pendingInsert, setPendingInsert] = useState<{id: string, emoji: string} | null>(null)
  const [newItemAnimating, setNewItemAnimating] = useState(false) // 새 캐비넷 등장 애니메이션
  const [labelOverrides, setLabelOverrides] = useState<{[key: number]: number | string} | null>(null) // 캐비넷 번호판 오버라이드
  const [shiftedIndices, setShiftedIndices] = useState<number[]>([]) // 이미 이동 완료된 캐비넷들
  const [disableTransition, setDisableTransition] = useState(false) // 트랜지션 임시 비활성화
  
  const insertInMiddle = () => {
    if (mode !== "normal" || items.length < 2) return
    
    const insertIndex = 1
    const newEmoji = FOOD_ITEMS[Math.floor(Math.random() * FOOD_ITEMS.length)].emoji
    const newId = `item-${uniqueIdCounter++}`
    const originalLength = items.length // 4개 (#0,#1,#2,#3)
    
    setMode("shifting")
    setPendingInsert({ id: newId, emoji: newEmoji })
    setShiftedIndices([]) // 초기화
    
    // 1단계: 맨 뒤에 새 빈칸 추가 (배경 슬롯이 5개로 됨)
    setPlaceholderAt(originalLength)
    showMsg(`➡️ #${originalLength}번 위치에 새 빈칸 생성!`, 'warning')
    
    // 이동 순서: #3 → #4, #2 → #3, #1 → #2 (뒤에서부터)
    const indicesToMove = [] // [3, 2, 1]
    for (let i = originalLength - 1; i >= insertIndex; i--) {
      indicesToMove.push(i)
    }
    
    // 재귀적으로 이동 실행
    const doMove = (step: number) => {
      if (step < indicesToMove.length) {
        const fromIndex = indicesToMove[step]
        
        setMovingIndex(fromIndex)
        setSlidingRight(true)
        showMsg(`📦 #${fromIndex}번 → #${fromIndex + 1}번으로 이동 중...`, 'warning')
        
        setTimeout(() => {
          // 이동 완료 - shiftedIndices에 추가하여 이동 상태 유지
          setShiftedIndices(prev => [...prev, fromIndex])
          setMovingIndex(null)
          setSlidingRight(false)
          setTimeout(() => doMove(step + 1), 300)
        }, 500)
      } else {
        // 모든 이동 애니메이션 완료 - 새 캐비넷 등장!
        showMsg(`✨ 새 캐비넷이 #${insertIndex}번 자리로!`, 'warning')
        
        // 새 캐비넷 등장 애니메이션 시작 (배열 업데이트 전에 별도 렌더링)
        setNewItemAnimating(true)
        
        setTimeout(() => {
          // 트랜지션 임시 비활성화 - 배열 업데이트 시 점프 방지
          setDisableTransition(true)
          
          // 배열 업데이트: 새 아이템 삽입
          setItems(prev => {
            const newItems = [...prev]
            newItems.splice(insertIndex, 0, { id: newId, emoji: newEmoji })
            return newItems
          })
          setPlaceholderAt(null)
          setShiftedIndices([]) // 배열 업데이트 후 초기화
          setNewItemAnimating(false)
          
          // 다음 프레임에서 트랜지션 다시 활성화
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setDisableTransition(false)
            })
          })
          
          // 인덱스 번호 업데이트 애니메이션
          setTimeout(() => {
            showMsg(`🔢 인덱스 번호 업데이트!`, 'warning')
            
            // 초기 상태: 새 캐비넷만 ✨로 설정
            // 나머지 캐비넷들은 labelOverrides에 포함하지 않아서 기본 FridgeSlot으로 렌더링
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
                  // 먼저 이전 번호로 표시 (주황색) - 이때 labelOverrides에 추가됨
                  showMsg(`🔄 #${idx - 1}번 → #${idx}번으로 변경!`, 'warning')
                  setLabelOverrides(prev => prev ? { ...prev, [idx]: idx - 1 } : null)
                  setTimeout(() => {
                    // 그 다음 새 번호로 변경 (파란색)
                    setLabelOverrides(prev => prev ? { ...prev, [idx]: idx } : null)
                    setTimeout(() => doLabelUpdate(idx + 1), 350)
                  }, 400)
                }
              } else {
                // 완료!
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

  // 중간 삭제 - 삭제 후 앞에서부터 하나씩 당김
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null)
  const [slidingLeft, setSlidingLeft] = useState(false)
  const [emptySlotAt, setEmptySlotAt] = useState<number | null>(null) // 삭제로 인한 빈 칸
  const [shiftedLeftIndices, setShiftedLeftIndices] = useState<number[]>([]) // 왼쪽으로 이동 완료된 캐비넷들
  const [deletedEmoji, setDeletedEmoji] = useState<string | null>(null) // 삭제된 이모지 저장
  
  const removeFromMiddle = () => {
    if (mode !== "normal" || items.length < 3) return
    
    const removeIndex = 1
    const removedEmoji = items[removeIndex].emoji
    const originalLength = items.length // 4개 (#0,#1,#2,#3) 또는 5개
    
    setMode("shifting")
    setDeletedEmoji(removedEmoji)
    setShiftedLeftIndices([])
    
    // 1단계: 삭제할 캐비넷 사라지는 애니메이션
    setDeletingIndex(removeIndex)
    showMsg(`🗑️ #${removeIndex}번 "${removedEmoji}" 삭제!`, 'warning')
    
    setTimeout(() => {
      // 삭제된 캐비넷을 빈 칸으로 만들기
      setItems(prev => {
        const updated = [...prev]
        updated[removeIndex] = { id: `empty-${Date.now()}`, emoji: "" }
        return updated
      })
      setEmptySlotAt(removeIndex)
      setDeletingIndex(null)
      showMsg(`📤 "${removedEmoji}" 꺼냈어요! 이제 당겨요!`, 'warning')
      
      // 2단계: 뒤 캐비넷들 순차적으로 왼쪽으로 이동
      // 이동 순서: #2 → #1, #3 → #2 (앞에서부터)
      const indicesToMove = []
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
            // 이동 완료 - shiftedLeftIndices에 추가하여 이동 상태 유지
            setShiftedLeftIndices(prev => [...prev, fromIndex])
            setMovingIndex(null)
            setSlidingLeft(false)
            setTimeout(() => doMove(step + 1), 300)
          }, 500)
        } else {
          // 모든 이동 애니메이션 완료
          showMsg(`✨ 이동 완료! 배열 업데이트 중...`, 'warning')
          
          setTimeout(() => {
            // 트랜지션 임시 비활성화
            setDisableTransition(true)
            
            // 배열 업데이트: 삭제된 위치의 아이템 제거
            setItems(prev => prev.filter((_, idx) => idx !== removeIndex))
            setEmptySlotAt(null)
            setShiftedLeftIndices([])
            
            // 다음 프레임에서 트랜지션 다시 활성화
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                setDisableTransition(false)
              })
            })
            
            // 인덱스 번호 업데이트 애니메이션
            setTimeout(() => {
              showMsg(`🔢 인덱스 번호 업데이트!`, 'warning')
              
              // 초기 상태: 삭제 위치부터 끝까지 업데이트 필요
              // 삭제 후 배열 길이는 originalLength - 1
              const newLength = originalLength - 1
              
              const doLabelUpdate = (idx: number) => {
                if (idx < newLength) {
                  setHighlightIndex(idx)
                  
                  // 이 캐비넷은 원래 idx+1번이었음
                  showMsg(`🔄 #${idx + 1}번 → #${idx}번으로 변경!`, 'warning')
                  setLabelOverrides(prev => prev ? { ...prev, [idx]: idx + 1 } : { [idx]: idx + 1 })
                  
                  setTimeout(() => {
                    setLabelOverrides(prev => prev ? { ...prev, [idx]: idx } : null)
                    setTimeout(() => doLabelUpdate(idx + 1), 350)
                  }, 400)
                } else {
                  // 완료!
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
    const newId = `item-${uniqueIdCounter++}`
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
    setShiftedLeftIndices([]); setDeletedEmoji(null)
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
          {/* 눈에 띄는 메시지 영역 */}
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

          <div className="bg-gradient-to-b from-slate-100 to-slate-200 rounded-xl p-4 border-4 border-slate-300 shadow-inner">
            <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200 min-h-[140px] overflow-x-auto">
              <div className="relative flex gap-2 items-end justify-start">
                {/* 슬롯 레이어: 점선 빈칸들 (배경) */}
                {Array.from({ length: items.length + (placeholderAt !== null ? 1 : 0) }).map((_, idx) => (
                  <div key={`slot-${idx}`} className="w-20 h-28 rounded-lg border-4 border-dashed border-slate-300 bg-slate-100/50 flex-shrink-0" />
                ))}
                
                {/* 새 캐비넷 등장 애니메이션 (배열 업데이트 전에 별도 렌더링) */}
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
                
                {/* 캐비넷 레이어: 실제 캐비넷들 (절대 위치로 오버레이) */}
                <div className="absolute inset-0 flex gap-2 items-end" style={{ justifyContent: 'inherit' }}>
                  {items.map((item, index) => {
                    const isMoving = movingIndex === index
                    const isEmpty = item.emoji === ""
                    const isBeingDeleted = deletingIndex === index
                    const shouldSlideRight = (isMoving && slidingRight) || shiftedIndices.includes(index)
                    const shouldSlideLeft = (isMoving && slidingLeft) || shiftedLeftIndices.includes(index)
                    
                    // 라벨 오버라이드
                    const displayLabel = labelOverrides && labelOverrides[index] !== undefined 
                      ? labelOverrides[index] 
                      : index
                    const isLabelUpdating = labelOverrides && labelOverrides[index] !== undefined && labelOverrides[index] !== index
                    
                    // 삭제로 인한 빈 칸은 투명하게
                    if (isEmpty && !isBeingDeleted) {
                      return (
                        <div key={item.id} className="w-20 h-28 flex-shrink-0" />
                      )
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
                        {/* 라벨 업데이트 중일 때 커스텀 라벨 */}
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

          {/* 버튼들 - 중간 삽입/삭제 추가 */}
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

// ============================================
// 2. Tuple 애니메이션
// ============================================
export function TupleAnimation() {
  const [items] = useState([{ emoji: "🔴", value: 255 }, { emoji: "🟢", value: 128 }, { emoji: "🔵", value: 64 }])
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [shakeIndex, setShakeIndex] = useState<number | null>(null)
  const [message, setMessage] = useState("")
  const [showProblem, setShowProblem] = useState(true)

  const readItem = (index: number) => {
    setOpenIndex(index)
    setMessage(`✅ 읽기 OK! ${items[index].emoji} = ${items[index].value}`)
    setTimeout(() => setOpenIndex(null), 2000)
  }

  const tryModify = () => {
    const index = Math.floor(Math.random() * items.length)
    setShakeIndex(index)
    setMessage(`❌ 수정 불가! 색상값 바뀌면 다른 색이 돼요!`)
    setTimeout(() => setShakeIndex(null), 600)
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
            code: 'color = (255, 128, 64)  # 튜플!'
          }}
          buttonColor="bg-purple-500 hover:bg-purple-600"
          onContinue={() => setShowProblem(false)}
        />
      ) : (
        <>
          <div className="bg-purple-100 border-2 border-purple-300 rounded-lg px-4 py-2">
            <p className="text-sm text-purple-800">🎨 <strong>RGB 색상</strong> = 바뀌면 안 되는 값! 읽기만 OK</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-lg shadow-lg border-2 border-gray-300"
              style={{ backgroundColor: `rgb(${items[0].value}, ${items[1].value}, ${items[2].value})` }} />
            <div className="text-sm">
              <p className="font-bold text-purple-800">현재 색상</p>
              <p className="text-gray-600 font-mono">({items[0].value}, {items[1].value}, {items[2].value})</p>
            </div>
          </div>

          <div className="bg-gradient-to-b from-slate-100 to-slate-200 rounded-xl p-4 border-4 border-slate-300 shadow-inner">
            <div className="flex gap-4 flex-wrap justify-center">
              {items.map((item, index) => (
                <button key={index} onClick={() => readItem(index)}
                  className={cn("relative transition-all duration-300 hover:scale-105", shakeIndex === index && "animate-shake")}>
                  <div className={cn(
                    "w-20 h-28 rounded border-2 shadow-lg relative overflow-hidden",
                    "bg-gradient-to-b from-purple-100 to-purple-200 border-purple-300",
                    openIndex === index && "ring-4 ring-green-500 scale-110"
                  )}>
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-xs font-bold bg-purple-500 text-white">#{index}</div>
                    <div className="absolute top-8 bottom-2 left-1 right-1 bg-white/80 rounded flex flex-col items-center justify-center">
                      <span className="text-2xl">{item.emoji}</span>
                      <span className="text-xs font-mono font-bold">{item.value}</span>
                    </div>
                    <div className="absolute top-8 bottom-2 left-0 right-0 transition-all duration-500 origin-left bg-purple-200/60 border border-purple-300 flex items-center justify-center"
                      style={{ transform: openIndex === index ? "rotateY(-100deg)" : "rotateY(0deg)" }}>
                      <Lock className="w-5 h-5 text-purple-500" />
                    </div>
                  </div>
                  {shakeIndex === index && (
                    <div className="absolute inset-0 bg-red-500/80 rounded flex items-center justify-center z-20">
                      <Lock className="w-8 h-8 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-3 text-center">👆 읽기 OK | ❌ 수정 불가</p>
          </div>

          {message && (
            <div className={cn("px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2",
              message.includes("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800")}>
              {message.includes("❌") && <Lock className="w-4 h-4" />}{message}
            </div>
          )}

          <div className="flex gap-2 flex-wrap">
            <button onClick={tryModify} className="flex items-center gap-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium">
              <Edit3 className="w-4 h-4" /> 수정 시도
            </button>
            <button onClick={() => setShowProblem(true)} className="flex items-center gap-1 px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-medium">
              <RefreshCw className="w-4 h-4" /> 리셋
            </button>
          </div>

          <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm">
            <span className="text-gray-400"># 튜플 = 순서O, 중복O, 수정X</span><br />
            <span className="text-purple-400">color</span><span className="text-white"> = (</span>
            <span className="text-red-400">255</span><span className="text-white">, </span>
            <span className="text-green-400">128</span><span className="text-white">, </span>
            <span className="text-blue-400">64</span><span className="text-white">)</span>
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

// ============================================
// 3. Dictionary 애니메이션
// ============================================
export function DictAnimation() {
  const [items] = useState([{ key: "철수", emoji: "⚽" }, { key: "영희", emoji: "🎒" }, { key: "민수", emoji: "🍱" }])
  const [openKey, setOpenKey] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [showProblem, setShowProblem] = useState(true)
  const [searchingList, setSearchingList] = useState(false)
  const [listScanIndex, setListScanIndex] = useState(-1)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const searchByKey = (key: string) => {
    setOpenKey(key)
    const item = items.find(i => i.key === key)
    if (item) setMessage(`⚡ "${key}" → 바로 열기! "${item.emoji}" (즉시!)`)
    setTimeout(() => setOpenKey(null), 2000)
  }

  const showListProblem = () => {
    setSearchingList(true); setListScanIndex(-1)
    setMessage(`🔍 리스트로 "민수" 찾기... 처음부터 확인해야 해요`)
    let idx = 0
    intervalRef.current = setInterval(() => {
      setListScanIndex(idx)
      if (idx === 0) setMessage(`🔍 #0 "철수"... 아니네!`)
      else if (idx === 1) setMessage(`🔍 #1 "영희"... 아니네!`)
      else if (idx === 2) {
        setMessage(`✅ #2 "민수" 찾았다! (3번 확인함 😓)`)
        clearInterval(intervalRef.current!)
        setTimeout(() => { setSearchingList(false); setListScanIndex(-1) }, 2000)
      }
      idx++
    }, 800)
  }

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setMessage(""); setOpenKey(null); setShowProblem(true); setSearchingList(false); setListScanIndex(-1)
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Key className="w-5 h-5 text-amber-600" />
          <h3 className="font-bold text-lg text-amber-800">Dictionary - 딕셔너리</h3>
        </div>
        <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded-full">이름표 사물함 🏷️</span>
      </div>

      {showProblem ? (
        <ProblemCard
          problem={{
            emoji: "😱",
            title: '리스트로 "민수 물건" 찾으면?',
            subtitle: "몇 번째인지 찾아봐야...",
            code: ['students = ["철수", "영희", "민수"]', 'items = ["⚽", "🎒", "🍱"]', '# "민수"가 몇 번째지? 🤔']
          }}
          solution={{
            emoji: "🏷️",
            title: "딕셔너리는 이름으로 바로!",
            subtitle: "찾을 필요 없이 즉시!",
            code: 'locker["민수"]  # → "🍱" 바로!'
          }}
          buttonColor="bg-amber-500 hover:bg-amber-600"
          onContinue={() => setShowProblem(false)}
        />
      ) : (
        <>
          <div className="bg-amber-100 border-2 border-amber-300 rounded-lg px-4 py-2">
            <p className="text-sm text-amber-800">🏫 <strong>사물함</strong> = 이름표 보고 바로 찾기!</p>
          </div>

          <div className="bg-gradient-to-b from-slate-200 to-slate-300 rounded-xl p-4 border-4 border-slate-400 shadow-inner">
            <div className="flex gap-4 flex-wrap justify-center">
              {items.map((item, idx) => (
                <div key={item.key} className="relative">
                  <Locker label={item.key} content={item.emoji} isOpen={openKey === item.key}
                    isHighlighted={openKey === item.key || listScanIndex === idx}
                    onClick={() => !searchingList && searchByKey(item.key)} disabled={searchingList} />
                  {listScanIndex === idx && (
                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">#{idx}</div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-3 text-center">👆 이름표 클릭 → 바로!</p>
          </div>

          {message && (
            <div className={cn("px-4 py-2 rounded-lg text-sm font-medium",
              message.includes("⚡") && "bg-green-100 text-green-800",
              message.includes("🔍") && "bg-yellow-100 text-yellow-800",
              message.includes("✅") && "bg-green-100 text-green-800")}>
              {message}
            </div>
          )}

          <div className="flex gap-2 flex-wrap">
            <button onClick={showListProblem} disabled={searchingList} className="flex items-center gap-1 px-3 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white rounded-lg text-sm font-medium">
              <Search className="w-4 h-4" /> 리스트로 찾기 (느림)
            </button>
            <button onClick={() => searchByKey("민수")} disabled={searchingList} className="flex items-center gap-1 px-3 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white rounded-lg text-sm font-medium">
              <Key className="w-4 h-4" /> 딕셔너리로 찾기 (빠름)
            </button>
            <button onClick={reset} className="flex items-center gap-1 px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-medium">
              <RefreshCw className="w-4 h-4" /> 리셋
            </button>
          </div>

          <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm">
            <span className="text-gray-400"># 딕셔너리 = 이름으로 바로!</span><br />
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

// ============================================
// 4. Set 애니메이션
// ============================================
export function SetAnimation() {
  const [items, setItems] = useState<string[]>(["철수", "영희", "민수"])
  const [message, setMessage] = useState("")
  const [bounceItem, setBounceItem] = useState<string | null>(null)
  const [rejectItem, setRejectItem] = useState<string | null>(null)
  const [showProblem, setShowProblem] = useState(true)

  const addItem = () => {
    const allStudents = ["철수", "영희", "민수", "지민", "수진", "현우"]
    const tryDuplicate = Math.random() > 0.5 && items.length > 0
    if (tryDuplicate) {
      const existing = items[Math.floor(Math.random() * items.length)]
      setRejectItem(existing); setBounceItem(existing)
      setMessage(`❌ "${existing}" 이미 출석! 중복 불가!`)
      setTimeout(() => { setRejectItem(null); setBounceItem(null) }, 1000)
    } else {
      const available = allStudents.filter(s => !items.includes(s))
      if (available.length > 0) {
        const newStudent = available[Math.floor(Math.random() * available.length)]
        setItems([...items, newStudent])
        setMessage(`✅ "${newStudent}" 출석!`)
      } else setMessage("⚠️ 모두 출석!")
    }
  }

  const checkMembership = () => {
    if (items.length === 0) return
    const student = items[Math.floor(Math.random() * items.length)]
    setBounceItem(student)
    setMessage(`⚡ "${student}" 왔나? → Yes! (즉시 확인!)`)
    setTimeout(() => setBounceItem(null), 1000)
  }

  const reset = () => {
    setItems(["철수", "영희", "민수"]); setMessage(""); setBounceItem(null); setRejectItem(null); setShowProblem(true)
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
            <p className="text-xs text-slate-500 mt-3 text-center">❌ 순서 없음 | ❌ 중복 불가</p>
          </div>

          {message && (
            <div className={cn("px-4 py-2 rounded-lg text-sm font-medium",
              message.includes("❌") ? "bg-red-100 text-red-800" : 
              message.includes("⚡") ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800")}>
              {message}
            </div>
          )}

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

// ============================================
// 5. 전체 비교 컴포넌트
// ============================================
export function DataStructuresComparison() {
  const [activeTab, setActiveTab] = useState<"list" | "tuple" | "dict" | "set">("list")

  const tabs = [
    { id: "list" as const, label: "List", emoji: "🧊", bgColor: "bg-blue-500", bgLight: "bg-blue-100", textColor: "text-blue-700" },
    { id: "tuple" as const, label: "Tuple", emoji: "🔒", bgColor: "bg-purple-500", bgLight: "bg-purple-100", textColor: "text-purple-700" },
    { id: "dict" as const, label: "Dict", emoji: "🏷️", bgColor: "bg-amber-500", bgLight: "bg-amber-100", textColor: "text-amber-700" },
    { id: "set" as const, label: "Set", emoji: "✋", bgColor: "bg-green-500", bgLight: "bg-green-100", textColor: "text-green-700" },
  ]

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={cn("px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200",
              activeTab === tab.id ? `${tab.bgColor} text-white shadow-lg scale-105` : `${tab.bgLight} ${tab.textColor} hover:scale-105`)}>
            {tab.emoji} {tab.label}
          </button>
        ))}
      </div>

      <div className="transition-all duration-300">
        {activeTab === "list" && <ListAnimation />}
        {activeTab === "tuple" && <TupleAnimation />}
        {activeTab === "dict" && <DictAnimation />}
        {activeTab === "set" && <SetAnimation />}
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h4 className="font-bold text-gray-800 mb-3">📊 한눈에 비교!</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-1">타입</th>
                <th className="text-center py-2 px-1">언제 쓸까?</th>
                <th className="text-center py-2 px-1">순서</th>
                <th className="text-center py-2 px-1">중복</th>
                <th className="text-center py-2 px-1">수정</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b bg-blue-50"><td className="py-2 px-1 font-bold text-blue-700">List</td><td className="text-center py-2 px-1">여러 개 저장</td><td className="text-center py-2 px-1 text-green-600">✅</td><td className="text-center py-2 px-1 text-green-600">✅</td><td className="text-center py-2 px-1 text-green-600">✅</td></tr>
              <tr className="border-b bg-purple-50"><td className="py-2 px-1 font-bold text-purple-700">Tuple</td><td className="text-center py-2 px-1">바뀌면 안 됨</td><td className="text-center py-2 px-1 text-green-600">✅</td><td className="text-center py-2 px-1 text-green-600">✅</td><td className="text-center py-2 px-1 text-red-600">❌</td></tr>
              <tr className="border-b bg-amber-50"><td className="py-2 px-1 font-bold text-amber-700">Dict</td><td className="text-center py-2 px-1">이름으로 찾기</td><td className="text-center py-2 px-1 text-gray-400">-</td><td className="text-center py-2 px-1 text-red-600">key❌</td><td className="text-center py-2 px-1 text-green-600">✅</td></tr>
              <tr className="bg-green-50"><td className="py-2 px-1 font-bold text-green-700">Set</td><td className="text-center py-2 px-1">중복 없이</td><td className="text-center py-2 px-1 text-red-600">❌</td><td className="text-center py-2 px-1 text-red-600">❌</td><td className="text-center py-2 px-1 text-green-600">✅</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
