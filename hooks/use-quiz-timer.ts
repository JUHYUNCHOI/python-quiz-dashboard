"use client"

import { useState, useEffect } from "react"

interface UseQuizTimerOptions {
  initialTime: number
  isPaused: boolean
}

export function useQuizTimer({ initialTime, isPaused }: UseQuizTimerOptions) {
  const [timeLeft, setTimeLeft] = useState(initialTime)

  useEffect(() => {
    if (timeLeft > 0 && !isPaused) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft, isPaused])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return {
    timeLeft,
    formattedTime: formatTime(timeLeft),
    isLowTime: timeLeft < 30,
    isExpired: timeLeft <= 0,
  }
}
