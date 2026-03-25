"use client"

import type React from "react"
import { useRef } from "react"

interface SwipeHandlers {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  minDistance?: number
}

export function useSwipe({ onSwipeLeft, onSwipeRight, minDistance = 50 }: SwipeHandlers) {
  const touchStartRef = useRef<number | null>(null)
  const touchEndRef = useRef<number | null>(null)

  const onTouchStart = (e: React.TouchEvent) => {
    // 가로 스크롤 가능한 요소(코드 블록 등) 내부 터치면 스와이프 무시
    const el = e.target as HTMLElement
    const scrollable = el.closest("[data-no-swipe], pre, code, .overflow-x-auto, .overflow-auto")
    if (scrollable) return
    touchEndRef.current = null
    touchStartRef.current = e.targetTouches[0].clientX
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartRef.current === null) return
    touchEndRef.current = e.targetTouches[0].clientX
  }

  const onTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) return
    const distance = touchStartRef.current - touchEndRef.current

    if (distance > minDistance) {
      onSwipeLeft?.()
    } else if (distance < -minDistance) {
      onSwipeRight?.()
    }
  }

  return { onTouchStart, onTouchMove, onTouchEnd }
}
