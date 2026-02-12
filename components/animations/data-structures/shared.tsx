"use client"

import { cn } from "@/lib/utils"

// ============================================
// 공통 타입
// ============================================
export interface LockerItem {
  id: string
  emoji: string
}

export const FOOD_ITEMS = [
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
export function getNextId() {
  return `item-${uniqueIdCounter++}`
}

// ============================================
// 공통 오버레이 컴포넌트
// ============================================
interface OverlayProps {
  emoji: string
  text: string
  subtext?: string
  type?: 'info' | 'success' | 'warning' | 'error'
}

export function AnimationOverlay({ emoji, text, subtext, type = 'info' }: OverlayProps) {
  const bgColor = type === 'error' ? 'bg-red-500/95' 
    : type === 'success' ? 'bg-green-500/95' 
    : type === 'warning' ? 'bg-amber-500/95'
    : 'bg-blue-500/95'
  
  return (
    <div className={cn(
      "absolute inset-0 rounded-lg z-20 flex items-center justify-center",
      bgColor
    )}>
      <div className="text-center text-white px-4">
        <div className="text-5xl mb-2 animate-bounce">{emoji}</div>
        <div className="text-xl font-black">{text}</div>
        {subtext && (
          <div className="text-base mt-1 opacity-90">{subtext}</div>
        )}
      </div>
    </div>
  )
}

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

export function ProblemCard({ problem, solution, buttonColor, onContinue }: ProblemCardProps) {
  return (
    <div className="space-y-4">
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
  isPlaceholder?: boolean
  onClick?: () => void
  disabled?: boolean
}

export function FridgeSlot({ 
  label, content, isOpen = false, isHighlighted = false,
  isScanning = false, isFound = false, isMoving = false, 
  moveDirection = null, isEmpty = false, isPlaceholder = false,
  onClick, disabled = false,
}: FridgeSlotProps) {
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
        <div className={cn(
          "absolute top-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-xs font-bold text-white z-10",
          isEmpty ? "bg-orange-500" : "bg-blue-500"
        )}>
          #{label}
        </div>
        
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
        
        <div 
          className="absolute top-8 bottom-2 left-0 right-0 transition-all duration-500 origin-left rounded-sm overflow-hidden"
          style={{ 
            transform: (isOpen || isMoving) ? "rotateY(-110deg)" : "rotateY(0deg)", 
            backfaceVisibility: "hidden",
            transformStyle: "preserve-3d"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-300 via-blue-200 to-blue-300 border border-blue-400 shadow-md">
            <div className="absolute inset-1 border border-blue-400/50 rounded-sm" />
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
export function Locker({ label, content, isOpen = false, isHighlighted = false, isScanning = false, hideLabel = false, onClick, disabled = false }: {
  label: string; content: string; isOpen?: boolean; isHighlighted?: boolean; isScanning?: boolean; hideLabel?: boolean; onClick?: () => void; disabled?: boolean;
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
        isHighlighted && "ring-4 ring-green-500 scale-110 shadow-2xl",
        isScanning && "ring-4 ring-yellow-400"
      )}>
        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
          {[...Array(4)].map((_, i) => <div key={i} className="w-3 h-1 bg-slate-700 rounded-sm" />)}
        </div>
        
        <div className="absolute top-10 bottom-2 left-1 right-1 bg-slate-800 rounded-sm flex items-center justify-center">
          <span className={cn("text-4xl transition-all duration-300", isOpen && "animate-bounce")}>{content}</span>
        </div>
        
        <div 
          className="absolute top-6 bottom-2 left-0 right-0 transition-all duration-500 origin-left rounded-sm overflow-hidden"
          style={{ 
            transform: isOpen ? "rotateY(-110deg)" : "rotateY(0deg)", 
            backfaceVisibility: "hidden",
            transformStyle: "preserve-3d"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-amber-300 via-amber-200 to-amber-300 border border-amber-400 shadow-lg">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded bg-amber-500 text-white text-xs font-bold shadow-md">
              {hideLabel ? "?" : label}
            </div>
            <div className="absolute top-10 bottom-2 left-1 right-1 border-2 border-amber-400/50 rounded-sm" />
            <div className="absolute top-1/2 right-2 -translate-y-1/2 w-2 h-10 bg-amber-500 rounded-full shadow-md" />
          </div>
        </div>
      </div>
    </button>
  )
}
