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
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
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
