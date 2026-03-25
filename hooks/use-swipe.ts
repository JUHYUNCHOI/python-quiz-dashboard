"use client"

import type React from "react"
import { useState } from "react"

interface SwipeHandlers {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  minDistance?: number
}

export function useSwipe({ onSwipeLeft, onSwipeRight, minDistance = 50 }: SwipeHandlers) {
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const onTouchStart = (e: React.TouchEvent) => {
    // 가로 스크롤 가능한 요소(코드 블록 등) 내부 터치면 스와이프 무시
    const el = e.target as HTMLElement
    const scrollable = el.closest("[data-no-swipe], pre, code, .overflow-x-auto, .overflow-auto")
    if (scrollable) return
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd

    if (distance > minDistance) {
      onSwipeLeft?.()
    } else if (distance < -minDistance) {
      onSwipeRight?.()
    }
  }

  return { onTouchStart, onTouchMove, onTouchEnd }
}
