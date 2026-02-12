"use client"

import { useState, useEffect, useRef } from "react"

export function useFocusTracker() {
  const [isFocused, setIsFocused] = useState(true)
  const [focusedTime, setFocusedTime] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [justReturnedFocus, setJustReturnedFocus] = useState(false)
  const focusTimeRef = useRef(0)
  const totalTimeRef = useRef(0)

  useEffect(() => {
    const handleFocus = () => {
      setIsFocused(true)
      setJustReturnedFocus(true)
      setTimeout(() => setJustReturnedFocus(false), 3000)
    }

    const handleBlur = () => {
      setIsFocused(false)
    }

    window.addEventListener("focus", handleFocus)
    window.addEventListener("blur", handleBlur)

    return () => {
      window.removeEventListener("focus", handleFocus)
      window.removeEventListener("blur", handleBlur)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      totalTimeRef.current += 1
      setTotalTime(totalTimeRef.current)

      if (isFocused) {
        focusTimeRef.current += 1
        setFocusedTime(focusTimeRef.current)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isFocused])

  return { isFocused, focusedTime, totalTime, justReturnedFocus }
}
